import { NextRequest, NextResponse } from 'next/server'
import { checkInstagramAdmin } from '@/lib/instagram/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { publishCarousel } from '@/lib/instagram/instagramClient'
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit'
import type { SlideData } from '@/types/instagram'

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

  // Fetch draft
  const { data: draft, error: fetchError } = await supabase
    .from('instagram_drafts')
    .select('*')
    .eq('id', body.id)
    .single()

  if (fetchError || !draft) {
    return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
  }

  if (draft.status !== 'approved') {
    return NextResponse.json(
      { error: `Draft must be approved before publishing (current: ${draft.status})` },
      { status: 422 }
    )
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  if (!token || !userId) {
    return NextResponse.json({ error: 'Instagram credentials not configured' }, { status: 500 })
  }

  try {
    const hashtags = (draft.hashtags as string[] ?? [])
      .map(t => t.startsWith('#') ? t : `#${t}`)
      .join(' ')
    const fullCaption = hashtags ? `${draft.caption}\n\n${hashtags}` : draft.caption

    const { ig_media_id, ig_permalink } = await publishCarousel(
      userId,
      token,
      fullCaption,
      draft.slide_data as SlideData[],
    )

    await supabase
      .from('instagram_drafts')
      .update({
        status: 'published',
        ig_media_id,
        ig_permalink,
        published_at: new Date().toISOString(),
      })
      .eq('id', body.id)

    return NextResponse.json({ ok: true, ig_media_id, ig_permalink })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Publish failed'

    await supabase
      .from('instagram_drafts')
      .update({
        status: 'failed',
        error_message: message,
        retry_count: (draft.retry_count ?? 0) + 1,
      })
      .eq('id', body.id)

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
