import type { Category, Region } from './index'

export type ThemeType = 'regional' | 'seasonal' | 'monthly' | 'category' | 'access'

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export type ThemeSpec = {
  theme_key: string
  theme_title_ja: string
  theme_title_en: string
  tagline: string
  type: ThemeType
  region?: Region
  category?: Category
  season?: Season
  months?: number[]             // 月次テーマ用 e.g. [4] = 4月, [3,4,5] = 春
  accessKeywords?: string[]
  requireCategories?: Category[] // ハード除外: いずれか1つを持たないと弾く
  excludeCategories?: Category[] // ハード除外: 該当カテゴリを持っていたら弾く
  spotIds?: string[]             // 固定スポット指定（指定した場合は他フィルターを無視）
  maxCount: number
}

export type SlideData = {
  spot_id: string
  image_url: string
  slide_caption: string
  order: number
}

export type DraftStatus = 'draft' | 'approved' | 'published' | 'failed'

export type InstagramDraft = {
  id: string
  created_at: string
  updated_at: string

  theme_type: ThemeType
  theme_key: string
  theme_title_ja: string
  theme_title_en: string

  content_type: 'carousel' | 'story_draft'

  spot_ids: string[]
  slide_data: SlideData[]

  caption: string
  hashtags: string[]

  status: DraftStatus
  error_message?: string | null
  retry_count: number

  ig_media_id?: string | null
  ig_permalink?: string | null
  published_at?: string | null

  insights_fetched_at?: string | null
  likes_count?: number | null
  comments_count?: number | null
  reach?: number | null
  impressions?: number | null

  scheduled_for?: string | null
  approved_by?: string | null
  approved_at?: string | null

  rendered_asset_urls?: string[] | null
  template_id?: string | null
  template_version?: string | null
}

export type PublishResult = {
  ig_media_id: string
  ig_permalink: string
}

export type InsightsResult = {
  likes_count: number
  comments_count: number
  reach: number
  impressions: number
} | null
