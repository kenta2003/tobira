import { NextRequest, NextResponse } from 'next/server'
import { checkInstagramAdmin } from '@/lib/instagram/auth'
import { getAllSpots } from '@/lib/spots'
import { selectSpotsForTheme } from '@/lib/instagram/selectSpots'
import { getThemeByKey } from '@/lib/instagram/themes'
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const authError = await checkInstagramAdmin(req)
  if (authError) return authError

  // Rate limiting: 10 requests per hour per IP
  const rateLimitKey = getRateLimitKey(null, req)
  const rateLimitError = await checkRateLimit(rateLimitKey, 10, 3600)
  if (rateLimitError) return rateLimitError

  const body = await req.json().catch(() => null) as { theme_key?: string } | null
  if (!body?.theme_key) return NextResponse.json({ error: 'Missing theme_key' }, { status: 400 })

  const theme = getThemeByKey(body.theme_key)
  if (!theme) return NextResponse.json({ error: 'Theme not found' }, { status: 404 })

  const allSpots = await getAllSpots()
  const selectedSpots = selectSpotsForTheme(allSpots, theme)

  return NextResponse.json({
    theme_key: theme.theme_key,
    theme_title_ja: theme.theme_title_ja,
    theme_title_en: theme.theme_title_en,
    tagline: theme.tagline,
    spots: selectedSpots.map(s => ({
      id: s.id,
      name: s.name,
      prefecture: s.prefecture,
      categories: s.categories,
      highlights: s.highlights[0] ?? '',
      image_url: s.image_url,
    })),
  })
}
