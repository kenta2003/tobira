import { describe, it, expect } from 'vitest'
import { generateHashtags } from '../generateHashtags'
import type { ThemeSpec } from '@/types/instagram'

const baseTheme: ThemeSpec = {
  theme_key: 'tohoku-nature',
  theme_title_ja: '東北の自然スポット5選',
  theme_title_en: 'Top 5 Nature Spots in Tohoku',
  type: 'regional',
  region: 'tohoku',
  maxCount: 5,
}

describe('generateHashtags', () => {
  it('#tobira を常に含む', () => {
    const tags = generateHashtags(baseTheme)
    expect(tags).toContain('#tobira')
  })

  it('#japan を常に含む', () => {
    const tags = generateHashtags(baseTheme)
    expect(tags).toContain('#japan')
  })

  it('#visitjapan を常に含む', () => {
    const tags = generateHashtags(baseTheme)
    expect(tags).toContain('#visitjapan')
  })

  it('region タグを含む', () => {
    const tags = generateHashtags(baseTheme)
    expect(tags).toContain('#tohoku')
  })

  it('category タグを含む', () => {
    const theme: ThemeSpec = { ...baseTheme, type: 'category', category: 'onsen' }
    const tags = generateHashtags(theme)
    expect(tags).toContain('#onsen')
  })

  it('30タグ以内', () => {
    const tags = generateHashtags(baseTheme)
    expect(tags.length).toBeLessThanOrEqual(30)
  })

  it('重複なし', () => {
    const tags = generateHashtags(baseTheme)
    const unique = [...new Set(tags)]
    expect(tags).toEqual(unique)
  })

  it('全て # で始まる', () => {
    const tags = generateHashtags(baseTheme)
    expect(tags.every(t => t.startsWith('#'))).toBe(true)
  })

  it('スペースなし', () => {
    const tags = generateHashtags(baseTheme)
    expect(tags.every(t => !t.includes(' '))).toBe(true)
  })
})
