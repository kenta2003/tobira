import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.slug !== 'string' || typeof body.secret !== 'string') {
    return NextResponse.json({ error: 'Missing slug or secret' }, { status: 400 });
  }

  const expectedSecret = process.env.BLOG_PUBLISH_SECRET;
  if (!expectedSecret || body.secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ status: 'published', published_at: new Date().toISOString() })
    .eq('slug', body.slug)
    .eq('status', 'draft')
    .select('slug, title, status')
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? 'Draft not found or already published' },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true, slug: data.slug, title: data.title });
}
