#!/usr/bin/env node
/**
 * generate-kyoto-alt-carousel.mjs
 * "5 Quieter Alternatives to Kyoto" カルーセルを生成する。
 *
 * Usage:
 *   node scripts/generate-kyoto-alt-carousel.mjs
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
const THEME_KEY = 'kyoto-alternatives-5spots'

// ---------------------------------------------------------------------------
// スポットデータ（ブログ記事 kyoto-alternatives-without-crowds を参考）
// ---------------------------------------------------------------------------
const SPOTS = [
  {
    id: 'kenroku-en-garden',
    name: 'Kanazawa',
    prefecture: 'Ishikawa',
    access: '大阪から特急2.5時間 / 東京から新幹線2.5時間',
    accessEn: '2.5 hrs from Osaka · 2.5 hrs from Tokyo by Shinkansen',
    highlight: 'Same geisha culture as Kyoto — with none of the tour groups',
    imageUrl: 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/ishikawa/kenroku-en-garden.jpg',
  },
  {
    id: 'kakunodate-samurai-district',
    name: 'Kakunodate',
    prefecture: 'Akita',
    access: '東京から新幹線2.5時間',
    accessEn: '2.5 hrs from Tokyo by Shinkansen',
    highlight: '2,000 weeping cherry trees lining original samurai residences',
    imageUrl: 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/akita/kakunodate-samurai-district.jpg',
  },
  {
    id: 'hikone-castle',
    name: 'Hikone',
    prefecture: 'Shiga',
    access: '京都から電車30分',
    accessEn: '30 min from Kyoto by train — easy add-on',
    highlight: 'One of five National Treasure castles — original 1622 keep, never reconstructed',
    imageUrl: 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/shiga/hikone-castle.jpg',
  },
  {
    id: 'kurashiki-bikan',
    name: 'Kurashiki',
    prefecture: 'Okayama',
    access: '大阪から新幹線1時間',
    accessEn: '1 hr from Osaka by Shinkansen',
    highlight: 'Preserved Edo merchant canal — white-walled kura reflected in dark water',
    imageUrl: 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/okayama/kurashiki-bikan.jpg',
  },
  {
    id: 'matsue-castle',
    name: 'Matsue',
    prefecture: 'Shimane',
    access: '大阪から特急3時間',
    accessEn: '3 hrs from Osaka by limited express',
    highlight: 'A moody castle on dark water — Lafcadio Hearn\'s favourite city in Japan',
    imageUrl: 'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/spot-images/shimane/matsue-castle.jpg',
  },
]

const CAPTION = `Kyoto is worth it. It's also worth knowing there are quieter options.

These 5 destinations have the same cultural depth — ancient castles, preserved streets, and living craft traditions — with far fewer crowds:

1. Kanazawa (Ishikawa) — geisha district + samurai quarters, 2.5 hrs from Osaka
2. Kakunodate (Akita) — samurai streets lined with 2,000 weeping cherry trees
3. Hikone (Shiga) — National Treasure castle, just 30 min from Kyoto by train
4. Kurashiki (Okayama) — preserved Edo canal district, 1 hr from Osaka
5. Matsue (Shimane) — castle town on dark water, one of Japan's most atmospheric cities

Save this for your Japan itinerary.

Follow for more alternatives to the usual Japan route.`

const HASHTAGS = [
  'japantravel',
  'kyotoalternatives',
  'hiddenjapan',
  'visitjapan',
  'japantrip',
  'kanazawa',
  'kakunodate',
  'hikone',
  'kurashiki',
  'matsue',
  'secondtriptojapan',
  'japanhiddengems',
  'traveljapan',
  'japanculture',
  'japanitinerary',
]

// ---------------------------------------------------------------------------
// SVG ユーティリティ
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

// ---------------------------------------------------------------------------
// 表紙スライド
// ---------------------------------------------------------------------------

function buildCoverSvg() {
  const FONT = 'Helvetica Neue, Helvetica, Arial, sans-serif'
  const parts = []

  parts.push(`
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#000" stop-opacity="0.5"/>
      <stop offset="50%"  stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.78"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>`)

  // TOBIRA ブランド
  parts.push(`
  <text x="80" y="112"
    font-family="${FONT}" font-size="28" font-weight="700"
    fill="white" fill-opacity="0.7" letter-spacing="10">TOBIRA</text>`)

  // アクセントライン
  parts.push(`
  <rect x="80" y="560" width="48" height="3" fill="#dc2626" rx="2"/>`)

  // メインタイトル
  parts.push(`
  <text x="80" y="660"
    font-family="${FONT}" font-size="80" font-weight="800"
    fill="white">5 Quieter</text>`)
  parts.push(`
  <text x="80" y="754"
    font-family="${FONT}" font-size="80" font-weight="800"
    fill="white">Alternatives</text>`)
  parts.push(`
  <text x="80" y="848"
    font-family="${FONT}" font-size="80" font-weight="800"
    fill="white">to Kyoto</text>`)

  // サブテキスト
  parts.push(`
  <text x="80" y="940"
    font-family="${FONT}" font-size="36" font-weight="400"
    fill="white" fill-opacity="0.65">Same culture, far fewer crowds.</text>`)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${parts.join('')}</svg>`
}

// ---------------------------------------------------------------------------
// スポットスライド
// ---------------------------------------------------------------------------

function buildSpotSvg(spot, index) {
  const FONT = 'Helvetica Neue, Helvetica, Arial, sans-serif'
  const parts = []

  // グラデーションオーバーレイ（下側を暗く）
  parts.push(`
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#000" stop-opacity="0.02"/>
      <stop offset="35%"  stop-color="#000" stop-opacity="0.05"/>
      <stop offset="65%"  stop-color="#000" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>`)

  // スライド番号バッジ（右上）
  parts.push(`
  <circle cx="988" cy="80" r="32"
    fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <text x="988" y="92"
    font-family="${FONT}" font-size="28" font-weight="700"
    fill="white" text-anchor="middle">${index}</text>`)

  // アクセス情報（左上）
  parts.push(`
  <rect x="64" y="54" width="3" height="44" fill="#dc2626" rx="1"/>
  <text x="80" y="84"
    font-family="${FONT}" font-size="26" font-weight="500"
    fill="white" fill-opacity="0.8">${escapeXml(spot.accessEn)}</text>`)

  // 都道府県
  parts.push(`
  <text x="64" y="1165"
    font-family="${FONT}" font-size="30" font-weight="400"
    fill="white" fill-opacity="0.75">&#128205; ${escapeXml(spot.prefecture)}</text>`)

  // スポット名（都市名）
  const nameLines = wrapText(spot.name, 22)
  let nameY = 1250
  for (const line of nameLines) {
    parts.push(`
  <text x="64" y="${nameY}"
    font-family="${FONT}" font-size="72" font-weight="800"
    fill="white">${escapeXml(line)}</text>`)
    nameY += 86
  }

  // ハイライト（赤い左ボーダー付き）
  const hlLines = wrapText(spot.highlight, 46).slice(0, 2)
  const hlStartY = nameY + 8
  const hlHeight = hlLines.length * 44
  parts.push(`
  <rect x="64" y="${hlStartY - 6}" width="3" height="${hlHeight}" fill="#dc2626"/>`)
  let hlY = hlStartY + 30
  for (const line of hlLines) {
    parts.push(`
  <text x="84" y="${hlY}"
    font-family="${FONT}" font-size="28" font-weight="400"
    fill="white" fill-opacity="0.78">${escapeXml(line)}</text>`)
    hlY += 44
  }

  // TOBIRA マーク
  const tobiraY = Math.min(hlY + 20, 1412)
  parts.push(`
  <text x="64" y="${tobiraY}"
    font-family="${FONT}" font-size="22" font-weight="700"
    fill="white" fill-opacity="0.35" letter-spacing="5">TOBIRA</text>`)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${parts.join('')}</svg>`
}

// ---------------------------------------------------------------------------
// 画像処理
// ---------------------------------------------------------------------------

async function downloadImage(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`ダウンロード失敗 (${res.status}): ${url}`)
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
  if (error) throw new Error(`アップロード失敗 [${storagePath}]: ${error.message}`)
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)
  return data.publicUrl
}

// ---------------------------------------------------------------------------
// メイン
// ---------------------------------------------------------------------------

async function main() {
  const { data: existing } = await supabase
    .from('instagram_drafts')
    .select('id, status')
    .eq('theme_key', THEME_KEY)
    .maybeSingle()

  if (existing) {
    console.error(`ドラフト既存: id=${existing.id} status=${existing.status}`)
    console.error(`削除してから実行: DELETE FROM instagram_drafts WHERE theme_key = '${THEME_KEY}';`)
    process.exit(1)
  }

  const outDir = join(__dirname, 'output', THEME_KEY)
  mkdirSync(outDir, { recursive: true })

  const version = Date.now().toString()
  const slideData = []
  const renderedAssetUrls = []

  console.log(`\n=== "${THEME_KEY}" カルーセル生成 ===\n`)

  // スライド1: 表紙
  {
    process.stdout.write('[1/6] 表紙... ')
    const svg = buildCoverSvg()
    const png = await renderWithBg(SPOTS[0].imageUrl, svg)
    writeFileSync(join(outDir, '01-cover.png'), png)
    const storagePath = `instagram-assets/${THEME_KEY}/${version}-cover.png`
    const publicUrl = await uploadPng(png, storagePath)
    slideData.push({ spot_id: 'cover', image_url: publicUrl, slide_caption: '5 Quieter Alternatives to Kyoto', order: 0 })
    renderedAssetUrls.push(publicUrl)
    console.log('完了')
  }

  // スライド2〜6: 各スポット
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
    console.log('完了')
  }

  // ドラフト挿入
  console.log('\ninstagram_drafts に挿入中...')
  const { data, error } = await supabase
    .from('instagram_drafts')
    .insert({
      theme_key: THEME_KEY,
      theme_type: 'category',
      theme_title_ja: '京都の代わりに行ける場所5選',
      theme_title_en: '5 Quieter Alternatives to Kyoto',
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
    console.error('挿入失敗:', error.message)
    process.exit(1)
  }

  console.log(`\n✓ 完了! Draft ID: ${data[0].id}`)
  console.log(`  PNG保存先: open ${outDir}`)
  console.log(`  管理画面で日時設定して承認してください`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
