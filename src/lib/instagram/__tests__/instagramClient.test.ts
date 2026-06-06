import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { publishCarousel, publishStory, fetchInsights } from '../instagramClient'
import type { SlideData } from '@/types/instagram'

const USER_ID = 'test-user-id'
const TOKEN = 'test-token'
const MEDIA_ID = 'media-123'

const slides: SlideData[] = [
  { spot_id: 's1', image_url: 'https://images.unsplash.com/photo-1', slide_caption: 'cap1', order: 0 },
  { spot_id: 's2', image_url: 'https://images.unsplash.com/photo-2', slide_caption: 'cap2', order: 1 },
]

beforeEach(() => {
  vi.unstubAllGlobals()
  // Make setTimeout resolve immediately so publish tests don't wait 5s
  vi.stubGlobal('setTimeout', (fn: () => void) => { fn(); return 0 })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('publishCarousel', () => {
  it('各スライドのコンテナ作成 → カルーセルコンテナ → media_publish の順で呼ぶ', async () => {
    const calls: string[] = []
    let callCount = 0

    vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
      calls.push(url)
      callCount++
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: `container-${callCount}`, ig_id: 'permalink-1' }),
      })
    }))

    await publishCarousel(USER_ID, TOKEN, 'caption', slides)

    // slide containers + carousel container + publish + permalink = slides.length + 3 calls
    expect(calls.length).toBe(slides.length + 3)
    expect(calls[0]).toContain(`/${USER_ID}/media`)
    expect(calls[slides.length]).toContain(`/${USER_ID}/media`)
    expect(calls[slides.length + 1]).toContain(`/${USER_ID}/media_publish`)
  })

  it('{ ig_media_id, ig_permalink } を返す', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: MEDIA_ID }),
    }))

    const result = await publishCarousel(USER_ID, TOKEN, 'caption', slides)
    expect(result).toHaveProperty('ig_media_id')
    expect(result).toHaveProperty('ig_permalink')
  })

  it('API エラー時に Error を throw する', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: { message: 'bad request' } }),
    }))

    await expect(publishCarousel(USER_ID, TOKEN, 'caption', slides)).rejects.toThrow()
  })
})

describe('publishStory', () => {
  it('story コンテナ作成 → media_publish を呼ぶ', async () => {
    const calls: string[] = []
    vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
      calls.push(url)
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 'story-container' }),
      })
    }))

    await publishStory(USER_ID, TOKEN, 'https://images.unsplash.com/photo-1')
    expect(calls.length).toBe(3) // container + publish + permalink
    expect(calls[0]).toContain(`/${USER_ID}/media`)
    expect(calls[1]).toContain(`/${USER_ID}/media_publish`)
  })
})

describe('fetchInsights', () => {
  it('insights エンドポイントを呼ぶ', async () => {
    const calls: string[] = []
    vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
      calls.push(url)
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          data: [
            { name: 'likes', values: [{ value: 42 }] },
            { name: 'comments', values: [{ value: 3 }] },
            { name: 'reach', values: [{ value: 100 }] },
            { name: 'impressions', values: [{ value: 200 }] },
          ]
        }),
      })
    }))

    const publishedAt = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString()
    await fetchInsights(MEDIA_ID, TOKEN, publishedAt)
    expect(calls[0]).toContain(`/${MEDIA_ID}/insights`)
  })

  it('24h未満なら null を返す', async () => {
    const publishedAt = new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    const result = await fetchInsights(MEDIA_ID, TOKEN, publishedAt)
    expect(result).toBeNull()
  })
})
