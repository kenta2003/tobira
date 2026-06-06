import type { Spot } from '@/types/index'
import type { SlideData } from '@/types/instagram'

const MAX_SPOT_SLIDES = 9 // 1 cover + up to 9 spot slides = 10 total (Instagram limit)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

function toInstagramAspectRatio(url: string, cacheBust?: string): string {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('unsplash.com')) {
      parsed.searchParams.set('w', '1080')
      parsed.searchParams.set('h', '1440')
      parsed.searchParams.set('fit', 'crop')
      parsed.searchParams.set('auto', 'format')
    } else if (parsed.hostname.includes('supabase.co')) {
      parsed.searchParams.set('width', '1080')
      parsed.searchParams.set('height', '1440')
      parsed.searchParams.set('resize', 'cover')
      // Bust Supabase CDN cache so updated photos are always fetched fresh
      if (cacheBust) parsed.searchParams.set('t', cacheBust)
    }
    return parsed.toString()
  } catch {
    return url
  }
}

export function generateCarouselSlides(spots: Spot[], themeTitle?: string, tagline?: string): SlideData[] {
  const cacheBust = Date.now().toString()
  const spotSlides = spots.slice(0, MAX_SPOT_SLIDES).map((spot, index) => {
    const highlight = spot.highlights[0] ?? ''
    const bgUrl = toInstagramAspectRatio(spot.image_url, cacheBust)
    const params = new URLSearchParams({
      img: bgUrl,
      name: spot.name,
      prefecture: spot.prefecture,
      ...(highlight ? { highlight } : {}),
      index: String(index + 1),
    })
    return {
      spot_id: spot.id,
      image_url: `${SITE_URL}/api/og/instagram-spot?${params.toString()}`,
      slide_caption: buildSlideCaption(spot),
      order: index + 1,
    }
  })

  if (!themeTitle) return spotSlides.map((s, i) => ({ ...s, order: i }))

  const bgUrl = spots[0]?.image_url ? toInstagramAspectRatio(spots[0].image_url, cacheBust) : ''
  const coverParams = new URLSearchParams({
    title: themeTitle,
    ...(tagline ? { tagline } : {}),
    ...(bgUrl ? { bg: bgUrl } : {}),
  })
  const cover: SlideData = {
    spot_id: 'cover',
    image_url: `${SITE_URL}/api/og/instagram-cover?${coverParams.toString()}`,
    slide_caption: themeTitle,
    order: 0,
  }

  return [cover, ...spotSlides]
}

function buildSlideCaption(spot: Spot): string {
  const lines: string[] = [
    `${spot.name} — ${spot.prefecture}`,
    spot.highlights[0] ?? spot.description.slice(0, 100),
  ]

  if (spot.best_season) {
    lines.push(`Best season: ${spot.best_season}`)
  }

  return lines.join('\n').slice(0, 500)
}
