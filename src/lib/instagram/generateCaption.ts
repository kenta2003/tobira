import type { Spot } from '@/types/index'
import type { ThemeSpec } from '@/types/instagram'

const MAX_CAPTION_LENGTH = 2200

export function generateThemeCaption(theme: ThemeSpec, spots: Spot[]): string {
  const spotList = spots
    .map((s, i) => {
      const highlight = s.highlights[0] ?? ''
      return `${i + 1}. ${s.name}\n   📍 ${s.prefecture}${highlight ? ` — ${highlight}` : ''}`
    })
    .join('\n')

  const lines = [
    theme.tagline,
    '',
    `✨ ${theme.theme_title_en}`,
    '',
    spotList,
    '',
    'Full guide in bio 👇 @tobira_japan_beyond_tokyo',
  ]

  return lines.join('\n').slice(0, MAX_CAPTION_LENGTH)
}
