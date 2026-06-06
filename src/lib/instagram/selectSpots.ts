import type { Spot } from '@/types/index'
import type { ThemeSpec } from '@/types/instagram'
import { isGoodInSeason } from '@/lib/utils'

// Month ranges for each season (for best_season string matching)
const SEASON_MONTHS: Record<string, number[]> = {
  spring: [3, 4, 5],
  summer: [6, 7, 8],
  autumn: [9, 10, 11],
  winter: [12, 1, 2],
}

/**
 * Check if a spot's best_season overlaps with given months.
 * best_season examples: "spring", "summer", "June–October", "Year-round"
 */
function isAvailableInMonths(bestSeason: string, months: number[]): boolean {
  if (!bestSeason) return true
  const lower = bestSeason.toLowerCase()
  if (lower.includes('year-round') || lower.includes('year round')) return true

  // Check season keywords
  for (const [season, seasonMonths] of Object.entries(SEASON_MONTHS)) {
    if (lower.includes(season)) {
      if (months.some(m => seasonMonths.includes(m))) return true
    }
  }

  // Check month name ranges (e.g. "June–October", "Late June–August")
  const monthNames = ['january','february','march','april','may','june',
                      'july','august','september','october','november','december']
  const foundMonths: number[] = []
  monthNames.forEach((name, idx) => {
    if (lower.includes(name)) foundMonths.push(idx + 1)
  })

  if (foundMonths.length >= 2) {
    const start = Math.min(...foundMonths)
    const end = Math.max(...foundMonths)
    return months.some(m => m >= start && m <= end)
  }
  if (foundMonths.length === 1) {
    return months.includes(foundMonths[0])
  }

  return true // can't determine, allow through
}

function scoreSpot(spot: Spot, requireCategories?: string[]): number {
  // instagram_priority is the main signal (0/1/2 × 3 = 0/3/6 pts)
  const priorityScore = (spot.instagram_priority ?? 0) * 3

  // Category exact match bonus: all of spot's categories are within requireCategories
  let exactMatchBonus = 0
  if (requireCategories && requireCategories.length > 0) {
    const allMatch = spot.categories.every(c => requireCategories.includes(c as never))
    if (allMatch) exactMatchBonus = 2
  }

  return priorityScore + exactMatchBonus
}

export function selectSpotsForTheme(spots: Spot[], theme: ThemeSpec): Spot[] {
  // --- spotIds 固定指定 ---
  if (theme.spotIds && theme.spotIds.length > 0) {
    return theme.spotIds
      .map(id => spots.find(s => s.id === id))
      .filter((s): s is Spot => s !== undefined)
  }

  let filtered = [...spots]

  // --- Phase 1: Hard filters ---

  if (theme.region) {
    filtered = filtered.filter(s => s.region === theme.region)
  }

  if (theme.category) {
    filtered = filtered.filter(s => s.categories.includes(theme.category!))
  }

  if (theme.requireCategories && theme.requireCategories.length > 0) {
    filtered = filtered.filter(s =>
      theme.requireCategories!.some(c => s.categories.includes(c as never))
    )
  }

  if (theme.excludeCategories && theme.excludeCategories.length > 0) {
    filtered = filtered.filter(s =>
      !theme.excludeCategories!.some(c => s.categories.includes(c as never))
    )
  }

  if (theme.season) {
    filtered = filtered.filter(s => isGoodInSeason(s.best_season, theme.season!))
  }

  if (theme.months && theme.months.length > 0) {
    filtered = filtered.filter(s => isAvailableInMonths(s.best_season, theme.months!))
  }

  if (theme.accessKeywords && theme.accessKeywords.length > 0) {
    const kw = theme.accessKeywords
    filtered = filtered.filter(s =>
      kw.some(k => s.access.toLowerCase().includes(k.toLowerCase()))
    )
  }

  // --- Phase 2: Score and sort ---

  return filtered
    .sort((a, b) => scoreSpot(b, theme.requireCategories) - scoreSpot(a, theme.requireCategories))
    .slice(0, theme.maxCount)
}
