#!/usr/bin/env node
/**
 * create-intro-draft.mjs
 *
 * 「What is Tobira?」自己紹介カルーセルのドラフトを1回だけ作成するスクリプト。
 *
 * 前提:
 *   - 開発サーバーが起動している（または BASE_URL に本番URLを設定）
 *   - .env.local に NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY がある
 *
 * Usage:
 *   node scripts/create-intro-draft.mjs
 *   BASE_URL=https://tobira.travel node scripts/create-intro-draft.mjs
 */

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '../.env.local') })

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const THEME_KEY = 'intro-what-is-tobira'
const BUCKET = 'spot-images'
const TOTAL = '6'

// ---------------------------------------------------------------------------
// Slide → DB query: each entry defines which regions/categories to prefer
// for the background photo. Falls back to any high-priority spot if no match.
// ---------------------------------------------------------------------------
const SLIDE_BG_CRITERIA = [
  { regions: ['hokkaido', 'tohoku', 'kyushu'],          label: 'slide 1 cover' },
  { regions: ['chugoku', 'shikoku', 'tohoku'],           label: 'slide 2 quieter' },
  { regions: ['chubu', 'hokuriku', 'kyushu'],            label: 'slide 3 who' },
  { regions: ['kyushu', 'hokuriku', 'okinawa'],          label: 'slide 4 what' },
  { regions: ['hokkaido', 'okinawa', 'kinki'],           label: 'slide 5 why' },
  { regions: ['tohoku', 'chugoku', 'kyushu'],            label: 'slide 6 start' },
]

/**
 * Fetch one background image URL from the spots table.
 * Prefers spots in `regions` with instagram_priority >= 1.
 * Falls back to any spot with an image if nothing matches.
 */
async function fetchBg(regions, usedIds, label) {
  // Try preferred regions first
  const { data } = await supabase
    .from('spots')
    .select('id, image_url')
    .not('image_url', 'is', null)
    .gte('instagram_priority', 1)
    .in('region', regions)
    .not('id', 'in', `(${usedIds.length ? usedIds.join(',') : 'none'})`)
    .order('instagram_priority', { ascending: false })
    .limit(10)

  if (data && data.length > 0) {
    const pick = data[0]
    console.log(`  [bg] ${label} → ${pick.id} (${pick.image_url.slice(0, 60)}...)`)
    return { id: pick.id, url: pick.image_url }
  }

  // Fallback: any spot with an image not yet used
  const { data: fallback } = await supabase
    .from('spots')
    .select('id, image_url')
    .not('image_url', 'is', null)
    .gte('instagram_priority', 1)
    .not('id', 'in', `(${usedIds.length ? usedIds.join(',') : 'none'})`)
    .order('instagram_priority', { ascending: false })
    .limit(1)

  if (fallback && fallback.length > 0) {
    const pick = fallback[0]
    console.log(`  [bg] ${label} (fallback) → ${pick.id}`)
    return { id: pick.id, url: pick.image_url }
  }

  return { id: null, url: null }
}

// ---------------------------------------------------------------------------
// Slide definitions (bg will be filled in at runtime from DB)
// ---------------------------------------------------------------------------
const SLIDES = [
  {
    id: 'slide-1',
    title: 'Japan beyond Tokyo, Kyoto & Osaka',
    sub: 'Welcome to Tobira',
    body: 'Curated local travel ideas across Japan',
  },
  {
    id: 'slide-2',
    title: 'We help you discover',
    sub: 'a quieter, more local side of Japan.',
    body: 'Not just the usual stops.|Not just the same crowded itineraries.',
  },
  {
    id: 'slide-3',
    title: 'Who is this for?',
    sub: '',
    body: 'Travelers planning a second trip to Japan|First-time visitors who want to avoid the biggest crowds|People looking for places that feel more local, scenic, and memorable',
  },
  {
    id: 'slide-4',
    title: "What you'll find here",
    sub: '',
    body: 'Hidden gems across 47 prefectures|Quieter alternatives to famous destinations|No-car-friendly travel ideas|Regional guides and smarter itineraries',
  },
  {
    id: 'slide-5',
    title: 'Why Tobira?',
    sub: '',
    body: 'We curate Japan with a local point of view —|honest, practical, and beyond the usual "Top 10" lists.',
  },
  {
    id: 'slide-6',
    title: 'Start here \u2193',
    sub: 'Follow for:',
    body: 'Kyoto alternatives|second-trip Japan ideas|underrated regions|practical travel inspiration',
  },
]

const CAPTION = `Welcome to Tobira — your guide to Japan beyond Tokyo, Kyoto & Osaka.

We share quieter destinations, local picks, and smarter travel ideas across all 47 prefectures.

If you're planning a second trip to Japan, or just want something beyond the usual itinerary, you're in the right place.

Follow for hidden gems, regional guides, and no-car-friendly travel ideas.`

const HASHTAGS = [
  'japantravel',
  'hiddenjapan',
  'secondtriptojapan',
  'traveljapan',
  'japanhiddengems',
  'visitjapan',
  'japantrip',
  'japanitinerary',
  'japanguide',
  'ruraljapan',
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Download an image URL and return a base64 data URL.
 * This avoids the edge function making outbound HTTP requests.
 */
async function toDataUrl(imageUrl) {
  const res = await fetch(imageUrl)
  if (!res.ok) throw new Error(`Failed to download bg image (${res.status}): ${imageUrl}`)
  const buffer = await res.arrayBuffer()
  const mime = res.headers.get('content-type') || 'image/jpeg'
  return `data:${mime};base64,${Buffer.from(buffer).toString('base64')}`
}

/** Build the OG URL for a slide */
async function buildOgUrl(slide, index) {
  const url = new URL(`${BASE_URL}/api/og/instagram-intro`)
  if (slide.title) url.searchParams.set('title', slide.title)
  if (slide.sub) url.searchParams.set('sub', slide.sub)
  if (slide.body) url.searchParams.set('body', slide.body)
  if (slide.bg) {
    // Convert to data URL so the edge function doesn't need outbound HTTP
    const dataUrl = await toDataUrl(slide.bg)
    url.searchParams.set('bg', dataUrl)
  }
  url.searchParams.set('num', String(index))
  url.searchParams.set('total', TOTAL)
  return url.toString()
}

/** Fetch an OG image and upload it to Supabase Storage, return public URL */
async function uploadSlide(ogUrl, storagePath) {
  console.log(`  Fetching: ${ogUrl.slice(0, 80)}...`)
  const res = await fetch(ogUrl)
  if (!res.ok) {
    throw new Error(`OG fetch failed (${res.status}): ${ogUrl}`)
  }
  const buffer = await res.arrayBuffer()

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, { contentType: 'image/png', upsert: true })

  if (error) throw new Error(`Storage upload failed [${storagePath}]: ${error.message}`)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)
  return data.publicUrl
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\n=== Creating intro draft: "${THEME_KEY}" ===`)
  console.log(`BASE_URL: ${BASE_URL}\n`)

  // Fetch background photos from DB
  console.log('Fetching background photos from DB...')
  const usedSpotIds = []
  for (let i = 0; i < SLIDES.length; i++) {
    const { regions, label } = SLIDE_BG_CRITERIA[i]
    const { id, url } = await fetchBg(regions, usedSpotIds, label)
    if (url) {
      SLIDES[i].bg = url
      if (id) usedSpotIds.push(id)
    } else {
      console.warn(`  [bg] No image found for ${label} — slide will use dark gradient`)
    }
  }
  console.log()

  // Check for existing draft
  const { data: existing } = await supabase
    .from('instagram_drafts')
    .select('id, status')
    .eq('theme_key', THEME_KEY)
    .maybeSingle()

  if (existing) {
    console.error(`Draft already exists: id=${existing.id} status=${existing.status}`)
    console.error('Delete it first with:')
    console.error(`  DELETE FROM instagram_drafts WHERE theme_key = '${THEME_KEY}';`)
    process.exit(1)
  }

  const version = Date.now().toString()
  const slideData = []
  const renderedAssetUrls = []

  for (let i = 0; i < SLIDES.length; i++) {
    const slide = SLIDES[i]
    const slideNum = i + 1
    const ogUrl = await buildOgUrl(slide, slideNum)
    const storagePath = `instagram-assets/${THEME_KEY}/${version}-${slide.id}.png`

    console.log(`[${slideNum}/${SLIDES.length}] ${slide.title.slice(0, 40)}`)
    try {
      const publicUrl = await uploadSlide(ogUrl, storagePath)
      console.log(`  Uploaded: ${publicUrl.slice(0, 80)}...\n`)
      slideData.push({
        spot_id: slide.id,
        image_url: publicUrl,
        slide_caption: slide.title,
        order: i,
      })
      renderedAssetUrls.push(publicUrl)
    } catch (err) {
      console.error(`  ERROR on slide ${slideNum}:`, err.message)
      process.exit(1)
    }
  }

  // Insert draft
  console.log('Inserting draft into instagram_drafts...')
  const { data, error } = await supabase
    .from('instagram_drafts')
    .insert({
      theme_key: THEME_KEY,
      theme_type: 'category',
      theme_title_ja: 'What is Tobira?',
      theme_title_en: 'What is Tobira?',
      content_type: 'carousel',
      spot_ids: SLIDES.map(s => s.id),
      slide_data: slideData,
      caption: CAPTION,
      hashtags: HASHTAGS,
      status: 'draft',
      rendered_asset_urls: renderedAssetUrls,
      template_id: 'carousel-v1',
      template_version: '1.0',
    })
    .select('id')

  if (error) {
    console.error('Supabase insert failed:', error.message)
    process.exit(1)
  }

  const draftId = data[0].id
  console.log(`\n✓ Draft created successfully!`)
  console.log(`  ID: ${draftId}`)
  console.log(`\nNext steps:`)
  console.log(`  1. Open Admin UI → find "What is Tobira?" in draft list`)
  console.log(`  2. Preview slides, edit caption if needed`)
  console.log(`  3. Click 承認 → Instagram に投稿`)
}

main().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
