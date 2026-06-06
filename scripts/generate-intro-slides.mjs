#!/usr/bin/env node
/**
 * generate-intro-slides.mjs
 * DBからスポット写真を取得し、sharp でテキストを合成して
 * scripts/output/intro/ に PNG 6枚を保存する。
 * 開発サーバー不要。
 *
 * Usage:
 *   node scripts/generate-intro-slides.mjs
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
const MARGIN = 80

// ---------------------------------------------------------------------------
// Slide content
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
    body: 'Second-trip Japan travelers|First-time visitors avoiding big crowds|Travelers looking for a more local side of Japan',
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
    body: 'Because Japan travel should fit you —|not just the same list as everyone else.',
  },
  {
    id: 'slide-6',
    title: 'Start here \u2193',
    sub: 'Follow Tobira for:',
    body: 'Kyoto alternatives|second-trip Japan ideas|underrated regions|practical travel inspiration',
  },
]

// Preferred regions per slide (matching slide theme)
const SLIDE_BG_REGIONS = [
  ['hokkaido', 'tohoku', 'kyushu'],      // 1: beyond Tokyo/Kyoto/Osaka
  ['chugoku', 'shikoku', 'tohoku'],       // 2: quieter Japan
  ['chubu', 'hokuriku', 'kyushu'],        // 3: who is this for
  ['kyushu', 'hokuriku', 'okinawa'],      // 4: what you'll find
  ['hokkaido', 'okinawa', 'kinki'],       // 5: why Tobira
  ['tohoku', 'chugoku', 'kyushu'],        // 6: start here
]

// ---------------------------------------------------------------------------
// SVG overlay builder
// ---------------------------------------------------------------------------

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Wrap text into lines of at most maxChars characters */
function wrapText(text, maxChars = 24) {
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

function buildSvg({ title, sub, bodyLines, num, total }) {
  const FONT = 'Helvetica Neue, Helvetica, Arial, sans-serif'
  const parts = []

  // Gradient overlay
  parts.push(`
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#000" stop-opacity="0.5"/>
      <stop offset="45%"  stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.75"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>`)

  // TOBIRA branding (top-left)
  parts.push(`
  <text x="${MARGIN}" y="112"
    font-family="${FONT}" font-size="28" font-weight="700"
    fill="white" fill-opacity="0.7" letter-spacing="10">TOBIRA</text>`)


  // --- Content layout (vertically centered in safe zone y=180..1340) ---
  const titleLines = wrapText(title, 24)
  const TITLE_LINE_H = 88   // 68px font * 1.3
  const SUB_H        = 60   // 38px font + gap
  const BODY_LINE_H  = 64   // 34px font * ~1.9
  const BODY_GAP     = 16
  const ACCENT_H     = 60   // accent bar + margin

  const titleH = titleLines.length * TITLE_LINE_H
  const subH   = sub           ? SUB_H  : 0
  const bodyH  = bodyLines.length > 0
    ? bodyLines.length * BODY_LINE_H + (bodyLines.length - 1) * BODY_GAP
    : 0

  const gapAfterTitle = (sub || bodyLines.length) ? 32 : 0
  const gapAfterSub   = bodyLines.length > 0 && sub ? 52 : 0

  const totalH = ACCENT_H + titleH + gapAfterTitle + subH + gapAfterSub + bodyH

  const SAFE_TOP = 180, SAFE_BOT = 1340
  let y = SAFE_TOP + Math.max(0, (SAFE_BOT - SAFE_TOP - totalH) / 2)

  // Red accent line
  parts.push(`
  <rect x="${MARGIN}" y="${y}" width="48" height="3" fill="#dc2626" rx="2"/>`)
  y += ACCENT_H

  // Title
  for (const line of titleLines) {
    parts.push(`
  <text x="${MARGIN}" y="${y}"
    font-family="${FONT}" font-size="68" font-weight="800"
    fill="white">${escapeXml(line)}</text>`)
    y += TITLE_LINE_H
  }
  y += gapAfterTitle

  // Sub
  if (sub) {
    parts.push(`
  <text x="${MARGIN}" y="${y}"
    font-family="${FONT}" font-size="38" font-weight="400"
    fill="white" fill-opacity="0.65">${escapeXml(sub)}</text>`)
    y += subH + gapAfterSub
  }

  // Body lines with left red border
  if (bodyLines.length > 0) {
    const borderH = bodyLines.length * BODY_LINE_H + (bodyLines.length - 1) * BODY_GAP
    parts.push(`
  <rect x="${MARGIN}" y="${y - 6}" width="3" height="${borderH}" fill="#dc2626"/>`)
    for (let i = 0; i < bodyLines.length; i++) {
      parts.push(`
  <text x="${MARGIN + 28}" y="${y + 46}"
    font-family="${FONT}" font-size="34" font-weight="400"
    fill="white" fill-opacity="0.85">${escapeXml(bodyLines[i])}</text>`)
      y += BODY_LINE_H + (i < bodyLines.length - 1 ? BODY_GAP : 0)
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  ${parts.join('')}
</svg>`
}

// ---------------------------------------------------------------------------
// DB helpers
// ---------------------------------------------------------------------------

async function fetchBg(regions, usedIds) {
  let q = supabase
    .from('spots')
    .select('id, image_url')
    .not('image_url', 'is', null)
    .gte('instagram_priority', 1)
    .in('region', regions)
    .order('instagram_priority', { ascending: false })
    .limit(10)

  for (const id of usedIds) q = q.neq('id', id)

  const { data } = await q
  if (data && data.length > 0) return data[0]

  // Fallback: any high-priority spot not yet used
  let fb = supabase
    .from('spots')
    .select('id, image_url')
    .not('image_url', 'is', null)
    .gte('instagram_priority', 1)
    .order('instagram_priority', { ascending: false })
    .limit(10)

  for (const id of usedIds) fb = fb.neq('id', id)

  const { data: d2 } = await fb
  return d2?.[0] ?? null
}

// ---------------------------------------------------------------------------
// Render one slide
// ---------------------------------------------------------------------------

async function renderSlide(slide, num, total, imageUrl) {
  const bodyLines = slide.body ? slide.body.split('|').filter(Boolean) : []
  const svgBuf = Buffer.from(buildSvg({ title: slide.title, sub: slide.sub, bodyLines, num, total }))

  const bgRes = await fetch(imageUrl)
  if (!bgRes.ok) throw new Error(`Download failed (${bgRes.status}): ${imageUrl}`)
  const bgBuf = Buffer.from(await bgRes.arrayBuffer())

  const base = await sharp(bgBuf)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .toBuffer()

  return sharp(base)
    .composite([{ input: svgBuf, gravity: 'northwest' }])
    .png()
    .toBuffer()
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const outDir = join(__dirname, 'output', 'intro')
  mkdirSync(outDir, { recursive: true })

  console.log('\n=== Generating intro slides → scripts/output/intro/ ===\n')

  // Fetch background spots from DB
  const usedIds = []
  const spots = []
  for (let i = 0; i < SLIDES.length; i++) {
    const spot = await fetchBg(SLIDE_BG_REGIONS[i], usedIds)
    if (spot) {
      usedIds.push(spot.id)
      spots.push(spot)
      console.log(`  bg[${i + 1}] → ${spot.id}`)
    } else {
      spots.push(null)
      console.log(`  bg[${i + 1}] → not found`)
    }
  }
  console.log()

  // Render each slide
  for (let i = 0; i < SLIDES.length; i++) {
    const slide = SLIDES[i]
    const num = i + 1
    const spot = spots[i]
    const filename = `${String(num).padStart(2, '0')}-${slide.id}.png`
    const outPath = join(outDir, filename)

    process.stdout.write(`[${num}/6] ${slide.title.slice(0, 38)}... `)

    if (!spot) {
      console.log('SKIPPED (no bg image)')
      continue
    }

    try {
      const png = await renderSlide(slide, num, SLIDES.length, spot.image_url)
      writeFileSync(outPath, png)
      console.log(`saved → ${filename}`)
    } catch (err) {
      console.log(`ERROR: ${err.message}`)
    }
  }

  console.log(`\nDone! Open: open ${outDir}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
