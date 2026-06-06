import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ThemeSpec } from '@/types/instagram'
import type { Spot } from '@/types/index'

// Mock Supabase admin client
const mockInsert = vi.fn()
const mockSelect = vi.fn()
const mockFrom = vi.fn()
const mockUpload = vi.fn()
const mockGetPublicUrl = vi.fn()

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: () => ({
    from: mockFrom,
    storage: {
      from: () => ({
        upload: mockUpload,
        getPublicUrl: mockGetPublicUrl,
      }),
    },
  }),
}))

// Mock getAllSpots
vi.mock('@/lib/spots', () => ({
  getAllSpots: vi.fn(),
}))

import { buildDraft } from '../draftBuilder'
import { getAllSpots } from '@/lib/spots'

const theme: ThemeSpec = {
  theme_key: 'test-theme',
  theme_title_ja: 'テストテーマ',
  theme_title_en: 'Test Theme',
  tagline: 'For those who want to explore.',
  type: 'regional',
  region: 'hokkaido',
  maxCount: 3,
}

const makeSpot = (id: string): Spot => ({
  id,
  name: `Spot ${id}`,
  prefecture: 'Hokkaido',
  region: 'hokkaido',
  categories: ['nature'],
  description: 'desc',
  address: 'addr',
  lat: 43.0,
  lng: 141.0,
  image_url: `https://images.unsplash.com/photo-${id}`,
  tags: [],
  is_premium: false,
  highlights: ['h1', 'h2', 'h3'],
  best_season: 'summer',
  access: 'train',
})

beforeEach(() => {
  vi.clearAllMocks()

  // Default: no existing draft for this week
  mockSelect.mockResolvedValue({ data: null, error: null })
  mockInsert.mockResolvedValue({ data: [{ id: 'new-draft-id' }], error: null })
  mockFrom.mockReturnValue({
    select: () => ({ gte: () => ({ eq: () => ({ maybeSingle: () => mockSelect() }) }) }),
    insert: () => ({ select: () => mockInsert() }),
  })

  // Mock storage: upload succeeds, getPublicUrl returns a static URL
  mockUpload.mockResolvedValue({ error: null })
  mockGetPublicUrl.mockReturnValue({ data: { publicUrl: 'https://example.supabase.co/storage/v1/object/public/spot-images/instagram-assets/test-theme/cover.png' } })

  // Mock fetch for OG image generation
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
  }))
})

describe('buildDraft', () => {
  it('draft status で INSERT する', async () => {
    vi.mocked(getAllSpots).mockResolvedValue([makeSpot('1'), makeSpot('2'), makeSpot('3')])

    await buildDraft(theme)

    expect(mockFrom).toHaveBeenCalledWith('instagram_drafts')
  })

  it('スライドが2枚未満ならエラーを throw する', async () => {
    vi.mocked(getAllSpots).mockResolvedValue([
      { ...makeSpot('1'), image_url: 'http://invalid.com/img.jpg' },
    ])

    // All uploads fail
    mockUpload.mockResolvedValue({ error: { message: 'upload failed' } })

    await expect(buildDraft(theme)).rejects.toThrow()
  })

  it('同一 theme_key が同週内に存在する場合は重複挿入しない', async () => {
    vi.mocked(getAllSpots).mockResolvedValue([makeSpot('1'), makeSpot('2'), makeSpot('3')])

    mockSelect.mockResolvedValue({ data: { id: 'existing' }, error: null })
    mockFrom.mockReturnValue({
      select: () => ({ gte: () => ({ eq: () => ({ maybeSingle: () => mockSelect() }) }) }),
      insert: () => ({ select: () => mockInsert() }),
    })

    await expect(buildDraft(theme)).rejects.toThrow(/already exists/)
    expect(mockInsert).not.toHaveBeenCalled()
  })
})
