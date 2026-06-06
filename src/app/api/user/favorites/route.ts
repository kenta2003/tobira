import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isValidUUID } from '@/lib/validation';
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit';

// GET /api/user/favorites — returns string[] of favorited spot_ids
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json([], { status: 200 });
  }

  const adminClient = createAdminClient();
  const { data, error } = await adminClient
    .from('favorites')
    .select('spot_id')
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json([], { status: 200 });
  }

  return NextResponse.json((data ?? []).map((r) => r.spot_id));
}

// POST /api/user/favorites — toggle favorite for { spotId }
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Rate limiting: 5 requests per minute per user/IP
  const rateLimitKey = getRateLimitKey(user?.id || null, req);
  const rateLimitError = await checkRateLimit(rateLimitKey, 5, 60);
  if (rateLimitError) return rateLimitError;

  if (!user) {
    return NextResponse.json({ error: 'Sign in to save favorites.' }, { status: 401 });
  }

  const { spotId } = await req.json();
  if (!spotId) {
    return NextResponse.json({ error: 'Missing spotId.' }, { status: 400 });
  }

  // Validate spotId is a valid UUID
  if (!isValidUUID(spotId)) {
    return NextResponse.json({ error: 'Invalid spotId format.' }, { status: 400 });
  }

  const adminClient = createAdminClient();

  // Check if already favorited
  const { data: existing } = await adminClient
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('spot_id', spotId)
    .single();

  if (existing) {
    // Remove favorite
    await adminClient
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('spot_id', spotId);
    return NextResponse.json({ favorited: false });
  } else {
    // Add favorite
    await adminClient
      .from('favorites')
      .insert({ user_id: user.id, spot_id: spotId });
    return NextResponse.json({ favorited: true });
  }
}
