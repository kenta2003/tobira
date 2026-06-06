import { NextRequest, NextResponse } from 'next/server'
import { checkInstagramAdmin } from '@/lib/instagram/auth'
import { buildDraft } from '@/lib/instagram/draftBuilder'
import { getThemeByKey, THEMES } from '@/lib/instagram/themes'
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const authError = await checkInstagramAdmin(req)
  if (authError) return authError

  // Rate limiting: 10 requests per hour per IP
  const rateLimitKey = getRateLimitKey(null, req)
  const rateLimitError = await checkRateLimit(rateLimitKey, 10, 3600)
  if (rateLimitError) return rateLimitError

  const body = await req.json().catch(() => null) as { theme_key?: string } | null
  if (!body?.theme_key) {
    return NextResponse.json(
      { error: 'Missing theme_key', available: THEMES.map(t => t.theme_key) },
      { status: 400 }
    )
  }

  const theme = getThemeByKey(body.theme_key)
  if (!theme) {
    return NextResponse.json(
      { error: `Unknown theme_key: ${body.theme_key}`, available: THEMES.map(t => t.theme_key) },
      { status: 400 }
    )
  }

  try {
    const id = await buildDraft(theme)
    return NextResponse.json({ ok: true, id })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 422 })
  }
}
