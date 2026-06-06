import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// GET /api/trips/[shareToken] — public read (no auth required)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shareToken: string }> }
) {
  const { shareToken } = await params;
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('saved_trips')
    .select('id, title, overview, days, created_at')
    .eq('share_token', shareToken)
    .eq('is_public', true)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Trip not found.' }, { status: 404 });
  }

  return NextResponse.json(data);
}
