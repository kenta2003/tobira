import { NextRequest, NextResponse } from 'next/server'
import { checkInstagramAdmin } from '@/lib/instagram/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchInsights } from '@/lib/instagram/instagramClient'
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const authError = await checkInstagramAdmin(req)
  if (authError) return authError

  // Rate limiting: 10 requests per hour per IP
  const rateLimitKey = getRateLimitKey(null, req)
  const rateLimitError = await checkRateLimit(rateLimitKey, 10, 3600)
  if (rateLimitError) return rateLimitError

  const body = await req.json().catch(() => null) as { id?: string } | null
  if (!body?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const supabase = createAdminClient()

  const { data: draft, error } = await supabase
    .from('instagram_drafts')
    .select('ig_media_id, published_at, status')
    .eq('id', body.id)
    .single()

  if (error || !draft) return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
  if (draft.status !== 'published') {
    return NextResponse.json({ error: 'Draft is not published yet' }, { status: 422 })
  }
  if (!draft.ig_media_id || !draft.published_at) {
    return NextResponse.json({ error: 'Missing ig_media_id or published_at' }, { status: 422 })
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return NextResponse.json({ error: 'Instagram token not configured' }, { status: 500 })

  const insights = await fetchInsights(draft.ig_media_id, token, draft.published_at)
  if (!insights) {
    return NextResponse.json({ ok: false, message: 'Not yet 24h since publish, skipping' })
  }

  await supabase
    .from('instagram_drafts')
    .update({
      ...insights,
      insights_fetched_at: new Date().toISOString(),
    })
    .eq('id', body.id)

  return NextResponse.json({ ok: true, insights })
}
