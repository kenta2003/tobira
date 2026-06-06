import { describe, it, expect } from 'vitest'
import { generateThemeCaption } from '../generateCaption'
import type { Spot } from '@/types/index'
import type { ThemeSpec } from '@/types/instagram'

const makeSpot = (overrides: Partial<Spot> = {}): Spot => ({
  id: '1',
  name: 'Test Spot',
  prefecture: 'Tokyo',
  region: 'kanto',
  categories: ['nature'],
  description: 'desc',
  address: 'addr',
  lat: 35.0,
  lng: 139.0,
  image_url: 'https://images.unsplash.com/photo-1',
  tags: [],
  is_premium: false,
  highlights: ['h1'],
  best_season: 'spring',
  access: 'train',
  ...overrides,
})

const theme: ThemeSpec = {
  theme_key: 'kanto-nature',
  theme_title_ja: '関東の自然スポット5選',
  theme_title_en: 'Top 5 Nature Spots in Kanto',
  tagline: 'The Kanto spots most itineraries skip.',
  type: 'regional',
  region: 'kanto',
  maxCount: 5,
}

describe('generateThemeCaption', () => {
  const spots = [
    makeSpot({ id: '1', name: 'Spot A' }),
    makeSpot({ id: '2', name: 'Spot B' }),
    makeSpot({ id: '3', name: 'Spot C' }),
  ]

  it('theme_title_en を含む', () => {
    const caption = generateThemeCaption(theme, spots)
    expect(caption).toContain(theme.theme_title_en)
  })

  it('スポット名を列挙する', () => {
    const caption = generateThemeCaption(theme, spots)
    expect(caption).toContain('Spot A')
    expect(caption).toContain('Spot B')
    expect(caption).toContain('Spot C')
  })

  it('CTA を含む', () => {
    const caption = generateThemeCaption(theme, spots)
    expect(caption).toContain('tobira')
  })

  it('2200文字以内', () => {
    const caption = generateThemeCaption(theme, spots)
    expect(caption.length).toBeLessThanOrEqual(2200)
  })

  it('ハッシュタグ (#) を含まない', () => {
    const caption = generateThemeCaption(theme, spots)
    expect(caption).not.toContain('#')
  })
})
