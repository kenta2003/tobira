import { describe, it, expect } from 'vitest'
import { generateCarouselSlides } from '../generateSlides'
import type { Spot } from '@/types/index'

const makeSpot = (overrides: Partial<Spot> = {}): Spot => ({
  id: '1',
  name: 'Spot Name',
  prefecture: 'Kyoto',
  region: 'kinki',
  categories: ['history'],
  description: 'desc',
  address: 'addr',
  lat: 35.0,
  lng: 135.7,
  image_url: 'https://images.unsplash.com/photo-1',
  tags: [],
  is_premium: false,
  highlights: ['h1'],
  best_season: 'spring',
  access: 'train',
  ...overrides,
})

describe('generateCarouselSlides', () => {
  it('スポット数と同数のスライドを返す', () => {
    const spots = [makeSpot({ id: '1' }), makeSpot({ id: '2' }), makeSpot({ id: '3' })]
    const slides = generateCarouselSlides(spots)
    expect(slides).toHaveLength(3)
  })

  it('order が 0-indexed', () => {
    const spots = [makeSpot({ id: '1' }), makeSpot({ id: '2' })]
    const slides = generateCarouselSlides(spots)
    expect(slides[0].order).toBe(0)
    expect(slides[1].order).toBe(1)
  })

  it('各スライドに spot_id, image_url, slide_caption, order を持つ', () => {
    const spots = [makeSpot()]
    const slides = generateCarouselSlides(spots)
    expect(slides[0]).toMatchObject({
      spot_id: expect.any(String),
      image_url: expect.any(String),
      slide_caption: expect.any(String),
      order: 0,
    })
  })

  it('slide_caption にスポット名が含まれる', () => {
    const spots = [makeSpot({ name: 'Fushimi Inari' })]
    const slides = generateCarouselSlides(spots)
    expect(slides[0].slide_caption).toContain('Fushimi Inari')
  })

  it('slide_caption に都道府県が含まれる', () => {
    const spots = [makeSpot({ prefecture: 'Kyoto' })]
    const slides = generateCarouselSlides(spots)
    expect(slides[0].slide_caption).toContain('Kyoto')
  })

  it('slide_caption が 500文字以内', () => {
    const spots = [makeSpot()]
    const slides = generateCarouselSlides(spots)
    expect(slides[0].slide_caption.length).toBeLessThanOrEqual(500)
  })

  it('最大10枚に収まる', () => {
    const spots = Array.from({ length: 15 }, (_, i) => makeSpot({ id: String(i) }))
    const slides = generateCarouselSlides(spots)
    expect(slides.length).toBeLessThanOrEqual(10)
  })
})
