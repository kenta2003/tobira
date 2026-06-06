import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAllSpots } from '@/lib/spots';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { REGION_META } from '@/lib/regions';
import { UUID_RE } from '@/lib/validation';
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit';
import type { Region } from '@/types';

export const maxDuration = 60;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured. Add GEMINI_API_KEY to .env.local' },
      { status: 500 }
    );
  }

  // Auth check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Sign in to use the AI planner.', code: 'auth_required' },
      { status: 401 }
    );
  }

  // Rate limiting: 10 requests per hour per user
  const rateLimitKey = getRateLimitKey(user.id, req);
  const rateLimitError = await checkRateLimit(rateLimitKey, 10, 3600);
  if (rateLimitError) return rateLimitError;

  // Check subscription
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .single();

  const isPro = sub?.status === 'active';
  const adminClient = createAdminClient();
  const period = new Date().toISOString().slice(0, 7); // 'YYYY-MM'

  let currentCount = 0;
  if (!isPro) {
    const { data: usageRow } = await adminClient
      .from('plan_uses')
      .select('count')
      .eq('user_id', user.id)
      .eq('period', period)
      .single();

    currentCount = usageRow?.count ?? 0;

    if (currentCount >= 1) {
      return NextResponse.json(
        {
          error: "You've used your free AI plan for this month. Upgrade to Pro for unlimited itineraries.",
          code: 'upgrade_required',
        },
        { status: 403 }
      );
    }
  }

  const body = await req.json();

  // --- Input validation (prompt injection / DoS prevention) ---
  const VALID_INTERESTS = ['nature', 'history', 'onsen', 'food', 'activity', 'spiritual'];
  const VALID_PACES     = ['relaxed', 'moderate', 'packed'];
  const VALID_GROUPS    = ['solo', 'couple', 'family', 'friends'];
  const VALID_REGIONS   = ['all', 'hokkaido', 'tohoku', 'kanto', 'hokuriku', 'chubu', 'kinki', 'chugoku', 'shikoku', 'kyushu', 'okinawa'];

  const days      = Number(body.days);
  const interests = Array.isArray(body.interests) ? body.interests : [];
  const pace      = body.pace;
  const groupType = body.groupType ?? 'solo';
  const region    = body.region ?? 'all';
  const spotId    = body.spotId;
  const spotIds   = Array.isArray(body.spotIds) ? body.spotIds.slice(0, 10) : [];

  if (!Number.isInteger(days) || days < 1 || days > 14) {
    return NextResponse.json({ error: 'days must be an integer between 1 and 14.' }, { status: 400 });
  }
  if (!interests.every((i: unknown) => typeof i === 'string' && VALID_INTERESTS.includes(i))) {
    return NextResponse.json({ error: 'Invalid interests value.' }, { status: 400 });
  }
  if (!VALID_PACES.includes(pace)) {
    return NextResponse.json({ error: 'Invalid pace value.' }, { status: 400 });
  }
  if (!VALID_GROUPS.includes(groupType)) {
    return NextResponse.json({ error: 'Invalid groupType value.' }, { status: 400 });
  }
  if (!VALID_REGIONS.includes(region)) {
    return NextResponse.json({ error: 'Invalid region value.' }, { status: 400 });
  }
  if (spotId !== undefined && (typeof spotId !== 'string' || !UUID_RE.test(spotId))) {
    return NextResponse.json({ error: 'Invalid spotId.' }, { status: 400 });
  }
  if (!spotIds.every((id: unknown) => typeof id === 'string' && UUID_RE.test(id))) {
    return NextResponse.json({ error: 'Invalid spotIds.' }, { status: 400 });
  }
  // --- End validation ---

  const spots = await getAllSpots();

  // Support single spotId (legacy) or spotIds[] (new multi-spot flow)
  const anchorIds: string[] = spotIds?.length
    ? spotIds
    : spotId
    ? [spotId]
    : [];
  const anchorSpots = anchorIds
    .map((id: string) => spots.find((s) => s.id === id))
    .filter(Boolean) as typeof spots;

  // Filter relevant spots for context — keep payload small to stay within timeout
  const relevantSpots = spots
    .filter((s) => region === 'all' || s.region === (region as Region))
    .map((s) => ({
      name: s.name,
      prefecture: s.prefecture,
      area: s.address.split(',').slice(-2).join(',').trim(), // city/region hint
      lat: s.lat,
      lng: s.lng,
      categories: s.categories.join('/'),
      desc: s.description.slice(0, 80),
      duration: s.duration,
    }));

  const anchorSection = anchorSpots.length > 0
    ? `
IMPORTANT: The traveler specifically wants to visit the following spots. You MUST include ALL of them in the itinerary:
${anchorSpots.map(s => `- "${s.name}" (${s.prefecture}): ${s.description.slice(0, 100)}`).join('\n')}
`
    : '';

  const focusLabel = region === 'all'
    ? 'All of Japan'
    : REGION_META[region as Region]?.label ?? region;

  const prompt = `You are a Japan travel expert helping a foreign tourist plan an authentic trip.
${anchorSection}
Available spots in our curated database:
${JSON.stringify(relevantSpots, null, 2)}

Create a ${days}-day itinerary for a traveler with these preferences:
- Interests: ${interests.join(', ')}
- Travel pace: ${pace}
- Group type: ${groupType ?? 'solo'}
- Focus area: ${focusLabel}

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "title": "Creative trip title",
  "overview": "2-3 sentence overview of this trip",
  "days": [
    {
      "day": 1,
      "title": "Day theme title",
      "spots": [
        {
          "name": "Spot name",
          "description": "Why visit and what to do (2 sentences)",
          "time": "Suggested time (e.g. '9:00 AM - 12:00 PM')",
          "tip": "Insider tip locals know but tourists miss",
          "travel_from_previous": "How to get here. Rules by position: (1) First spot of Day 1: null. (2) First spot of Day 2+: travel from accommodation near the LAST spot of the previous day (e.g. 'From hotel near Kumamoto Castle, 15 min by tram'). (3) All other spots: travel from the previous spot in the same day (e.g. '20 min by bus', 'Walk 10 min')."
        }
      ]
    }
  ]
}

Rules:
- Use spots from the database when possible, but you may add real Japan spots not in the list
- CRITICAL: Inter-day continuity — the LAST spot of Day N defines the overnight area. Day N+1 MUST start geographically close to that area. NEVER start a new day in a location far from where the previous day ended
- CRITICAL: Group geographically close spots on the same day — use the lat/lng coordinates to avoid inefficient backtracking
- Order spots within each day to minimize total travel time (nearest-neighbor routing)
- Match the pace: relaxed=1-2 spots/day, moderate=3-4, packed=5+
- travel_from_previous must be realistic (include transport mode: walk/bus/train/car, and estimated time)
- If spots are far apart, note the express train or highway bus option
- Tailor recommendations to the group type (solo=freedom/solo-friendly cafes, couple=romantic/scenic, family=kid-friendly/accessible, friends=social/nightlife/adventures)
- Start with the most iconic spot of the trip on day 1
- Include at least one meal recommendation per day (as a spot entry)
- Tips should be genuinely useful and specific (best time to arrive, what to order, hidden details)`;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);

    // Track usage for free users
    if (!isPro) {
      await adminClient
        .from('plan_uses')
        .upsert({ user_id: user.id, period, count: currentCount + 1 }, { onConflict: 'user_id,period' });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('AI plan error:', err);
    return NextResponse.json(
      { error: 'Failed to generate itinerary. Please try again.' },
      { status: 500 }
    );
  }
}
