#!/usr/bin/env node
/**
 * generate-no-car-carousel.mjs
 * "5 Stunning Spots You Can Reach Without a Car" カルーセルを生成する。
 * sharp で PNG を合成 → Supabase Storage にアップロード → instagram_drafts に INSERT。
 *
 * Usage:
 *   node scripts/generate-no-car-carousel.mjs
 */

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync, writeFileSync } from 'fs'
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '../.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const W = 1080
const H = 1440
const BUCKET = 'spot-images'
const THEME_KEY = 'no-car-5spots'

// ---------------------------------------------------------------------------
// Curated spot data
// ---------------------------------------------------------------------------
const SPOTS = [
  {
    id: 'ginzan-onsen',
    name: 'Ginzan Onsen',
    prefecture: 'Yamagata',
    access: 'Bus from Oishida Station · 40 min',
    highlight: 'Lantern-lit ryokan lining a snow-covered stream — one of Japan\'s most iconic winter scenes',
    imageUrl: 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/yamagata/ginzan-onsen.jpg',
  },
  {
    id: 'hitachi-seaside-park',
    name: 'Hitachi Seaside Park',
    prefecture: 'Ibaraki',
    access: 'Bus from Katsuta Station · 15 min',
    highlight: '4.5 million nemophila flowers blanket the hills in May — one of Asia\'s great flower spectacles',
    imageUrl: 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/ibaraki/hitachi-seaside-park.jpg',
  },
  {
    id: 'jigokudani-monkey-park',
    name: 'Jigokudani Monkey Park',
    prefecture: 'Nagano',
    access: 'Bus from Yudanaka Station + 35 min walk',
    highlight: 'Wild snow monkeys bathe in a thermal spring — entirely on their own terms',
    imageUrl: 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/nagano/jigokudani-monkey-park.jpg',
  },
  {
    id: 'beppu-hells',
    name: 'Beppu Jigoku Tour',
    prefecture: 'Oita',
    access: 'Bus from Beppu Station · 20 min',
    highlight: 'Eight volcanic hell springs, each a different colour — cobalt blue to blood red',
    imageUrl: 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/oita/beppu-hells.jpg',
  },
  {
    id: 'kabira-bay',
    name: 'Kabira Bay',
    prefecture: 'Okinawa',
    access: 'Bus from Ishigaki city · 35 min',
    highlight: 'Glass-bottom boat tours over living coral — swimming prohibited to preserve the clarity',
    imageUrl: 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/okinawa/kabira-bay.jpg',
  },
]

const CAPTION = `Japan's most scenic spots — no car needed.

Here are 5 destinations across Japan that are genuinely easy to reach by train and bus:

1. Ginzan Onsen, Yamagata — Bus from Oishida Station (40 min)
2. Hitachi Seaside Park, Ibaraki — Bus from Katsuta Station (15 min)
3. Jigokudani Monkey Park, Nagano — Bus from Yudanaka Station + 35 min walk
4. Beppu Jigoku Tour, Oita — Bus from Beppu Station (20 min)
5. Kabira Bay, Okinawa — Bus from Ishigaki city (35 min)

Save this for your next Japan trip.

Follow @tobira.travel for more no-car-friendly travel ideas across all 47 prefectures.`

const HASHTAGS = [
  'japantravel',
  'japantrip',
  'visitjapan',
  'japanhiddengems',
  'hiddenjapan',
  'nocarjapan',
  'japanbytrain',
  'publictransportjapan',
  'ginzanonsen',
  'hitachiseapark',
  'snowmonkeys',
  'beppuhells',
  'kabirabay',
  'secondtriptojapan',
  'traveljapan',
]

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function wrapText(text, maxChars) {
  const words = text.split(' ')
  const lines = []
  let current = ''
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = candidate
    }
  }
  if (current) lines.push(current)
  return lines
}

/** Cover slide: centered layout with "5 spots" headline */
function buildCoverSvg() {
  const FONT = 'Helvetica Neue, Helvetica, Arial, sans-serif'
  const parts = []

  parts.push(`
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#000" stop-opacity="0.45"/>
      <stop offset="50%"  stop-color="#000" stop-opacity="0.58"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.72"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>`)

  // TOBIRA branding
  parts.push(`
  <text x="80" y="112"
    font-family="${FONT}" font-size="28" font-weight="700"
    fill="white" fill-opacity="0.7" letter-spacing="10">TOBIRA</text>`)

  // Centered content
  // Accent line at y=580
  parts.push(`
  <rect x="80" y="580" width="48" height="3" fill="#dc2626" rx="2"/>`)

  // "5 Stunning Spots" (large)
  parts.push(`
  <text x="80" y="680"
    font-family="${FONT}" font-size="82" font-weight="800"
    fill="white">5 Stunning Spots</text>`)

  // "You Can Reach" (line 2)
  parts.push(`
  <text x="80" y="778"
    font-family="${FONT}" font-size="72" font-weight="800"
    fill="white">You Can Reach</text>`)

  // "Without a Car" (line 3, red accent)
  parts.push(`
  <text x="80" y="870"
    font-family="${FONT}" font-size="72" font-weight="800"
    fill="#dc2626">Without a Car</text>`)

  // Subtext
  parts.push(`
  <text x="80" y="960"
    font-family="${FONT}" font-size="36" font-weight="400"
    fill="white" fill-opacity="0.65">Japan's most scenic spots — no car needed.</text>`)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${parts.join('')}</svg>`
}

/** Spot slide: bottom-aligned content, matches instagram-spot design */
function buildSpotSvg(spot, index) {
  const FONT = 'Helvetica Neue, Helvetica, Arial, sans-serif'
  const parts = []

  // Gradient overlay (dark at bottom)
  parts.push(`
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#000" stop-opacity="0.02"/>
      <stop offset="35%"  stop-color="#000" stop-opacity="0.05"/>
      <stop offset="65%"  stop-color="#000" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.82"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>`)

  // Slide number badge (top-right circle)
  parts.push(`
  <circle cx="988" cy="80" r="32"
    fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <text x="988" y="92"
    font-family="${FONT}" font-size="28" font-weight="700"
    fill="white" text-anchor="middle">${index}</text>`)

  // Access pill (top-left, below TOBIRA-style)
  parts.push(`
  <rect x="64" y="54" width="3" height="44" fill="#dc2626" rx="1"/>
  <text x="80" y="84"
    font-family="${FONT}" font-size="26" font-weight="500"
    fill="white" fill-opacity="0.8">${escapeXml(spot.access)}</text>`)

  // Bottom content block — work from y=1100 downward
  // Prefecture
  parts.push(`
  <text x="64" y="1165"
    font-family="${FONT}" font-size="30" font-weight="400"
    fill="white" fill-opacity="0.75">&#128205; ${escapeXml(spot.prefecture)}</text>`)

  // Spot name (68px, bold)
  const nameLines = wrapText(spot.name, 22)
  let nameY = 1250
  for (const line of nameLines) {
    parts.push(`
  <text x="64" y="${nameY}"
    font-family="${FONT}" font-size="68" font-weight="800"
    fill="white">${escapeXml(line)}</text>`)
    nameY += 82
  }

  // Highlight (28px, with red left border)
  const hlLines = wrapText(spot.highlight, 48).slice(0, 2)
  const hlStartY = nameY + 8
  const hlHeight = hlLines.length * 44
  parts.push(`
  <rect x="64" y="${hlStartY - 6}" width="3" height="${hlHeight}" fill="#dc2626"/>`)
  let hlY = hlStartY + 28
  for (const line of hlLines) {
    parts.push(`
  <text x="84" y="${hlY}"
    font-family="${FONT}" font-size="28" font-weight="400"
    fill="white" fill-opacity="0.75">${escapeXml(line)}</text>`)
    hlY += 44
  }

  // TOBIRA mark
  const tobiraY = Math.min(hlY + 24, 1410)
  parts.push(`
  <text x="64" y="${tobiraY}"
    font-family="${FONT}" font-size="22" font-weight="700"
    fill="white" fill-opacity="0.35" letter-spacing="5">TOBIRA</text>`)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${parts.join('')}</svg>`
}

// ---------------------------------------------------------------------------
// Image rendering
// ---------------------------------------------------------------------------

async function downloadImage(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function renderWithBg(imageUrl, svgString) {
  const bgBuf = await downloadImage(imageUrl)
  const base = await sharp(bgBuf)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .toBuffer()
  return sharp(base)
    .composite([{ input: Buffer.from(svgString), gravity: 'northwest' }])
    .png()
    .toBuffer()
}

async function uploadPng(pngBuffer, storagePath) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, pngBuffer, { contentType: 'image/png', upsert: true })
  if (error) throw new Error(`Upload failed [${storagePath}]: ${error.message}`)
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)
  return data.publicUrl
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // Check for existing draft
  const { data: existing } = await supabase
    .from('instagram_drafts')
    .select('id, status')
    .eq('theme_key', THEME_KEY)
    .maybeSingle()

  if (existing) {
    console.error(`Draft already exists: id=${existing.id} status=${existing.status}`)
    console.error(`Delete it first: DELETE FROM instagram_drafts WHERE theme_key = '${THEME_KEY}';`)
    process.exit(1)
  }

  const outDir = join(__dirname, 'output', THEME_KEY)
  mkdirSync(outDir, { recursive: true })

  const version = Date.now().toString()
  const slideData = []
  const renderedAssetUrls = []

  console.log(`\n=== Generating "${THEME_KEY}" carousel ===\n`)

  // Slide 1: Cover
  {
    process.stdout.write('[1/6] Cover slide... ')
    const svg = buildCoverSvg()
    const png = await renderWithBg(SPOTS[0].imageUrl, svg)
    const filename = `01-cover.png`
    writeFileSync(join(outDir, filename), png)
    const storagePath = `instagram-assets/${THEME_KEY}/${version}-cover.png`
    const publicUrl = await uploadPng(png, storagePath)
    slideData.push({ spot_id: 'cover', image_url: publicUrl, slide_caption: '5 Stunning Spots You Can Reach Without a Car', order: 0 })
    renderedAssetUrls.push(publicUrl)
    console.log(`done → ${filename}`)
  }

  // Slides 2-6: Spots
  for (let i = 0; i < SPOTS.length; i++) {
    const spot = SPOTS[i]
    const slideNum = i + 2
    process.stdout.write(`[${slideNum}/6] ${spot.name}... `)
    const svg = buildSpotSvg(spot, i + 1)
    const png = await renderWithBg(spot.imageUrl, svg)
    const filename = `${String(slideNum).padStart(2, '0')}-${spot.id}.png`
    writeFileSync(join(outDir, filename), png)
    const storagePath = `instagram-assets/${THEME_KEY}/${version}-${spot.id}.png`
    const publicUrl = await uploadPng(png, storagePath)
    slideData.push({ spot_id: spot.id, image_url: publicUrl, slide_caption: spot.name, order: i + 1 })
    renderedAssetUrls.push(publicUrl)
    console.log(`done → ${filename}`)
  }

  // Insert draft
  console.log('\nInserting draft into instagram_drafts...')
  const { data, error } = await supabase
    .from('instagram_drafts')
    .insert({
      theme_key: THEME_KEY,
      theme_type: 'category',
      theme_title_ja: '車なしで行ける絶景5選',
      theme_title_en: '5 Stunning Spots You Can Reach Without a Car',
      content_type: 'carousel',
      spot_ids: SPOTS.map(s => s.id),
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
    console.error('Insert failed:', error.message)
    process.exit(1)
  }

  console.log(`\n✓ Done! Draft ID: ${data[0].id}`)
  console.log(`  Local PNG: open ${outDir}`)
  console.log(`  Admin UI: http://localhost:3001/admin/instagram?secret=YOUR_SECRET`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
