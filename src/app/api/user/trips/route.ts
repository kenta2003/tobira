import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit';

// POST /api/user/trips — save a generated itinerary
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Sign in to save itineraries.' }, { status: 401 });
  }

  // Rate limiting: 3 requests per hour per user
  const rateLimitKey = getRateLimitKey(user.id, req);
  const rateLimitError = await checkRateLimit(rateLimitKey, 3, 3600);
  if (rateLimitError) return rateLimitError;

  const { title, overview, days } = await req.json();

  // Comprehensive input validation
  if (!title || typeof title !== 'string' || title.length === 0 || title.length > 200) {
    return NextResponse.json({ error: 'Title must be a string between 1 and 200 characters.' }, { status: 400 });
  }

  if (overview !== undefined && (typeof overview !== 'string' || overview.length > 1000)) {
    return NextResponse.json({ error: 'Overview must be a string up to 1000 characters.' }, { status: 400 });
  }

  if (!Array.isArray(days) || days.length === 0 || days.length > 30) {
    return NextResponse.json({ error: 'Days must be an array with 1-30 items.' }, { status: 400 });
  }

  // Validate each day has required structure
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    if (typeof day !== 'object' || day === null) {
      return NextResponse.json({ error: `Day ${i + 1} must be an object.` }, { status: 400 });
    }
    if (typeof day.day !== 'number' || day.day < 1) {
      return NextResponse.json({ error: `Day ${i + 1} must have a valid day number.` }, { status: 400 });
    }
    if (typeof day.title !== 'string' || day.title.length === 0) {
      return NextResponse.json({ error: `Day ${i + 1} must have a title.` }, { status: 400 });
    }
    if (!Array.isArray(day.spots)) {
      return NextResponse.json({ error: `Day ${i + 1} must have a spots array.` }, { status: 400 });
    }
  }

  // Generate share token in app code (avoid DB-level base64url dependency)
  const shareToken = randomBytes(16).toString('hex');

  const adminClient = createAdminClient();
  const { data, error } = await adminClient
    .from('saved_trips')
    .insert({ user_id: user.id, title, overview, days, share_token: shareToken, is_public: true })
    .select('id, share_token')
    .single();

  if (error) {
    console.error('Save trip error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id, shareToken: data.share_token });
}

// GET /api/user/trips — list saved trips for the current user
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const adminClient = createAdminClient();
  const { data, error } = await adminClient
    .from('saved_trips')
    .select('id, title, overview, share_token, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch trips.' }, { status: 500 });
  }

  return NextResponse.json(data);
}
