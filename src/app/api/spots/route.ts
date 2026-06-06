import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAllSpots } from '@/lib/spots';

// GET /api/spots — returns spots, filtered by subscription level
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get all spots
  const allSpots = await getAllSpots();

  // If not authenticated, return only free spots
  if (!user) {
    return NextResponse.json(allSpots.filter((s) => !s.is_premium));
  }

  // Check subscription status
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .single();

  const isPro = sub?.status === 'active';

  // If pro user, return all spots; if free, exclude premium spots
  const spots = isPro ? allSpots : allSpots.filter((s) => !s.is_premium);

  return NextResponse.json(spots);
}
