import type { ThemeSpec, SlideData } from '@/types/instagram'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAllSpots } from '@/lib/spots'
import { selectSpotsForTheme } from './selectSpots'
import { validateImageUrl } from './validateImageUrl'
import { generateCarouselSlides } from './generateSlides'
import { generateThemeCaption } from './generateCaption'
import { generateHashtags } from './generateHashtags'

const MIN_SLIDES = 2
const TEMPLATE_ID = 'carousel-v1'
const TEMPLATE_VERSION = '1.0'

/** Returns start of the current ISO week (Monday 00:00:00 UTC) */
function getWeekStart(): string {
  const now = new Date()
  const dayOfWeek = now.getUTCDay()
  const diffToMonday = (dayOfWeek + 6) % 7
  const monday = new Date(now)
  monday.setUTCDate(now.getUTCDate() - diffToMonday)
  monday.setUTCHours(0, 0, 0, 0)
  return monday.toISOString()
}

/**
 * Fetches an OG image from our own endpoint and uploads it to Supabase Storage.
 * Returns the public URL of the uploaded image.
 */
async function uploadSlideImage(ogUrl: string, storagePath: string): Promise<string> {
  const supabase = createAdminClient()

  const res = await fetch(ogUrl)
  if (!res.ok) throw new Error(`Failed to fetch slide image (${res.status}): ${ogUrl}`)
  const buffer = await res.arrayBuffer()

  const { error } = await supabase.storage
    .from('spot-images')
    .upload(storagePath, buffer, {
      contentType: 'image/png',
      upsert: true,
    })
  if (error) throw new Error(`Storage upload failed [${storagePath}]: ${error.message}`)

  const { data } = supabase.storage.from('spot-images').getPublicUrl(storagePath)
  return data.publicUrl
}

export async function buildDraft(theme: ThemeSpec): Promise<string> {
  const supabase = createAdminClient()

  // Duplicate check: same theme_key this week
  const weekStart = getWeekStart()
  const { data: existing } = await supabase
    .from('instagram_drafts')
    .select('id')
    .gte('created_at', weekStart)
    .eq('theme_key', theme.theme_key)
    .maybeSingle()

  if (existing) {
    throw new Error(`Draft for theme "${theme.theme_key}" already exists this week`)
  }

  // Fetch and select spots
  const allSpots = await getAllSpots()
  const selectedSpots = selectSpotsForTheme(allSpots, theme)

  // Generate OG-based slide URLs (all slides use our templates)
  const rawSlides = generateCarouselSlides(selectedSpots, theme.theme_title_en, theme.tagline)

  // Upload each slide to Supabase Storage → get static URLs for Instagram
  const uploadedSlides: SlideData[] = []
  const renderedAssetUrls: string[] = []
  const version = Date.now().toString()

  for (const slide of rawSlides) {
    const isSpotSlide = slide.spot_id !== 'cover'
    // Skip validation for OG-generated URLs (they're our own endpoints)
    if (isSpotSlide) {
      // Quick sanity: the underlying spot image must have a valid host
      const urlObj = new URL(slide.image_url)
      const imgParam = urlObj.searchParams.get('img') ?? ''
      if (imgParam && !validateImageUrl(imgParam)) {
        console.warn(`[draftBuilder] Skipping slide with invalid spot image: ${imgParam}`)
        continue
      }
    }

    const storagePath = `instagram-assets/${theme.theme_key}/${version}-${slide.spot_id}.png`
    try {
      const staticUrl = await uploadSlideImage(slide.image_url, storagePath)
      uploadedSlides.push({ ...slide, image_url: staticUrl })
      renderedAssetUrls.push(staticUrl)
    } catch (err) {
      console.warn(`[draftBuilder] Slide upload failed for ${slide.spot_id}:`, err)
    }
  }

  if (uploadedSlides.length < MIN_SLIDES) {
    throw new Error(
      `Not enough valid slides for theme "${theme.theme_key}": got ${uploadedSlides.length}, need at least ${MIN_SLIDES}`
    )
  }

  const caption = generateThemeCaption(theme, selectedSpots)
  const hashtags = generateHashtags(theme)
  const spotIds = uploadedSlides.map(s => s.spot_id)

  const { data, error } = await supabase
    .from('instagram_drafts')
    .insert({
      theme_type: theme.type,
      theme_key: theme.theme_key,
      theme_title_ja: theme.theme_title_ja,
      theme_title_en: theme.theme_title_en,
      content_type: 'carousel',
      spot_ids: spotIds,
      slide_data: uploadedSlides,
      caption,
      hashtags,
      status: 'draft',
      rendered_asset_urls: renderedAssetUrls,
      template_id: TEMPLATE_ID,
      template_version: TEMPLATE_VERSION,
    })
    .select('id')

  if (error) throw new Error(`Supabase insert failed: ${error.message}`)

  return (data as Array<{ id: string }>)[0].id
}
