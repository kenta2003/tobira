import { describe, it, expect } from 'vitest'
import { selectSpotsForTheme } from '../selectSpots'
import type { Spot } from '@/types/index'
import type { ThemeSpec } from '@/types/instagram'

const base: Spot = {
  id: '1',
  name: 'Test Spot',
  prefecture: 'Hokkaido',
  region: 'hokkaido',
  categories: ['nature'],
  description: 'desc',
  address: 'addr',
  lat: 43.0,
  lng: 141.0,
  image_url: 'https://images.unsplash.com/photo-1',
  tags: [],
  is_premium: false,
  highlights: ['h1', 'h2', 'h3'],
  best_season: 'summer',
  access: 'train',
}

const makeSpot = (overrides: Partial<Spot>): Spot => ({ ...base, ...overrides })

const theme = (overrides: Partial<ThemeSpec>): ThemeSpec => ({
  theme_key: 'test',
  theme_title_ja: 'テスト',
  theme_title_en: 'Test',
  tagline: 'Test tagline.',
  type: 'regional',
  maxCount: 5,
  ...overrides,
})

describe('selectSpotsForTheme', () => {
  it('region フィルタが効く', () => {
    const spots = [
      makeSpot({ id: '1', region: 'hokkaido' }),
      makeSpot({ id: '2', region: 'tohoku' }),
    ]
    const result = selectSpotsForTheme(spots, theme({ region: 'hokkaido' }))
    expect(result.every(s => s.region === 'hokkaido')).toBe(true)
    expect(result).toHaveLength(1)
  })

  it('category フィルタが効く', () => {
    const spots = [
      makeSpot({ id: '1', categories: ['nature'] }),
      makeSpot({ id: '2', categories: ['onsen'] }),
    ]
    const result = selectSpotsForTheme(spots, theme({ type: 'category', category: 'onsen' }))
    expect(result.every(s => s.categories.includes('onsen'))).toBe(true)
    expect(result).toHaveLength(1)
  })

  it('season フィルタが効く', () => {
    const spots = [
      makeSpot({ id: '1', best_season: 'march-may' }),
      makeSpot({ id: '2', best_season: 'december-february' }),
    ]
    const result = selectSpotsForTheme(spots, theme({ type: 'seasonal', season: 'spring' }))
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('accessKeywords で car-free スポットを抽出できる', () => {
    const spots = [
      makeSpot({ id: '1', access: 'JR線で20分' }),
      makeSpot({ id: '2', access: '車で30分' }),
    ]
    const result = selectSpotsForTheme(spots, theme({ type: 'access', accessKeywords: ['JR', 'train', '電車'] }))
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('maxCount を超えない', () => {
    const spots = Array.from({ length: 10 }, (_, i) => makeSpot({ id: String(i) }))
    const result = selectSpotsForTheme(spots, theme({ maxCount: 3 }))
    expect(result.length).toBeLessThanOrEqual(3)
  })

  it('instagram_priority が高いスポットを優先する', () => {
    const spots = [
      makeSpot({ id: 'low', instagram_priority: 0 }),
      makeSpot({ id: 'high', instagram_priority: 2 }),
    ]
    const result = selectSpotsForTheme(spots, theme({ maxCount: 1 }))
    expect(result[0].id).toBe('high')
  })

  it('requireCategories に一致しないスポットを除外する', () => {
    const spots = [
      makeSpot({ id: '1', categories: ['nature'] }),
      makeSpot({ id: '2', categories: ['activity'] }),
    ]
    const result = selectSpotsForTheme(spots, theme({ requireCategories: ['nature'] }))
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('excludeCategories に一致するスポットを除外する', () => {
    const spots = [
      makeSpot({ id: '1', categories: ['nature'] }),
      makeSpot({ id: '2', categories: ['activity'] }),
    ]
    const result = selectSpotsForTheme(spots, theme({ excludeCategories: ['activity'] }))
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('完全一致カテゴリのスポットにボーナスを与える', () => {
    const spots = [
      makeSpot({ id: 'exact', categories: ['nature'] }),
      makeSpot({ id: 'mixed', categories: ['nature', 'activity'] }),
    ]
    const result = selectSpotsForTheme(spots, theme({ requireCategories: ['nature'], maxCount: 2 }))
    expect(result[0].id).toBe('exact')
  })

  it('入力配列を変更しない', () => {
    const spots = [makeSpot({ id: '1' }), makeSpot({ id: '2' })]
    const original = [...spots]
    selectSpotsForTheme(spots, theme({}))
    expect(spots).toEqual(original)
  })
})
