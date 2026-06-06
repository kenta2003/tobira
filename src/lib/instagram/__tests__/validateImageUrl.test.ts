import { describe, it, expect } from 'vitest'
import { validateImageUrl } from '../validateImageUrl'

describe('validateImageUrl', () => {
  it('Supabase Storage URL (https) → true', () => {
    expect(validateImageUrl('https://abc.supabase.co/storage/v1/object/public/spots/img.jpg')).toBe(true)
  })

  it('images.unsplash.com (https) → true', () => {
    expect(validateImageUrl('https://images.unsplash.com/photo-123?auto=format')).toBe(true)
  })

  it('plus.unsplash.com (https) → true', () => {
    expect(validateImageUrl('https://plus.unsplash.com/photo-456')).toBe(true)
  })

  it('http:// → false', () => {
    expect(validateImageUrl('http://images.unsplash.com/photo-123')).toBe(false)
  })

  it('relative URL → false', () => {
    expect(validateImageUrl('/images/spot.jpg')).toBe(false)
  })

  it('data: URI → false', () => {
    expect(validateImageUrl('data:image/png;base64,abc')).toBe(false)
  })

  it('localhost → false', () => {
    expect(validateImageUrl('https://localhost:3000/img.jpg')).toBe(false)
  })

  it('127.0.0.1 → false', () => {
    expect(validateImageUrl('https://127.0.0.1/img.jpg')).toBe(false)
  })

  it('empty string → false', () => {
    expect(validateImageUrl('')).toBe(false)
  })

  it('unknown domain (https) → false', () => {
    expect(validateImageUrl('https://example.com/image.jpg')).toBe(false)
  })
})
