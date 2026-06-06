import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { publishCarousel } from '@/lib/instagram/instagramClient'
import type { SlideData } from '@/types/instagram'

// Vercel Cron が呼び出す GET エンドポイント。
// Authorization: Bearer {CRON_SECRET} で保護。
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    return NextResponse.json(
      { error: 'CRON_SECRET not configured. Set it in environment variables.' },
      { status: 500 }
    )
  }

  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  if (!token || !userId) {
    return NextResponse.json({ error: 'Instagram credentials not configured' }, { status: 500 })
  }

  const supabase = createAdminClient()

  // 承認済み かつ scheduled_for が現在時刻以前のドラフトを取得
  const { data: drafts, error } = await supabase
    .from('instagram_drafts')
    .select('*')
    .eq('status', 'approved')
    .not('scheduled_for', 'is', null)
    .lte('scheduled_for', new Date().toISOString())

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!drafts || drafts.length === 0) {
    return NextResponse.json({ ok: true, published: 0 })
  }

  const results: Array<{ id: string; ok: boolean; error?: string }> = []

  for (const draft of drafts) {
    try {
      const hashtags = (draft.hashtags as string[] ?? [])
        .map((t: string) => t.startsWith('#') ? t : `#${t}`)
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
        .eq('id', draft.id)

      results.push({ id: draft.id, ok: true })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Publish failed'

      await supabase
        .from('instagram_drafts')
        .update({
          status: 'failed',
          error_message: message,
          retry_count: (draft.retry_count ?? 0) + 1,
        })
        .eq('id', draft.id)

      results.push({ id: draft.id, ok: false, error: message })
    }
  }

  return NextResponse.json({ ok: true, published: results.filter(r => r.ok).length, results })
}
