#!/usr/bin/env node
/**
 * fetch-candidate-photos.mjs
 *
 * 写真未設定のスポットに対して Pexels + Unsplash から候補写真を自動取得する。
 * 各スポット 4〜5 枚の候補を scripts/review/{spot-id}/ に保存し、
 * manifest.json にメタデータを記録する。
 *
 * Usage:
 *   node scripts/fetch-candidate-photos.mjs
 *   node scripts/fetch-candidate-photos.mjs --limit 10      # 最初の10スポットのみ
 *   node scripts/fetch-candidate-photos.mjs --spot-id tojinbo-cliffs  # 1スポット指定
 *   node scripts/fetch-candidate-photos.mjs --region hokkaido
 *
 * Required env vars (.env.local):
 *   PEXELS_API_KEY
 *   UNSPLASH_ACCESS_KEY
 */

import { mkdir, writeFile, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../.env.local') });

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PEXELS_KEY = process.env.PEXELS_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
const FLICKR_KEY = process.env.FLICKR_API_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

// Pexels/Unsplash はオプション。未設定でも Wikimedia Commons にフォールバック
if (!PEXELS_KEY && !UNSPLASH_KEY) {
  console.log('ℹ️  PEXELS_API_KEY / UNSPLASH_ACCESS_KEY 未設定 → Wikimedia Commons のみで検索します');
}

const REVIEW_DIR = join(__dirname, 'review');
const MANIFEST_PATH = join(REVIEW_DIR, 'manifest.json');
const CANDIDATES_PER_SPOT = 5;
const REQUEST_DELAY_MS = 2500; // レートリミット対策

// ─── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getArg(name) {
  const i = args.indexOf(`--${name}`);
  if (i === -1 || !args[i + 1] || args[i + 1].startsWith('--')) return null;
  return args[i + 1];
}

const limitArg = getArg('limit');
const spotIdArg = getArg('spot-id');
const regionArg = getArg('region');
const limit = limitArg ? parseInt(limitArg, 10) : null;

// ─── Supabase ─────────────────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

let query = supabase
  .from('spots')
  .select('id, name, prefecture, region, categories, tags, description')
  .or('image_url.is.null,image_url.like.%unsplash%')
  .order('region')
  .order('name');

if (spotIdArg) {
  query = supabase.from('spots').select('id, name, prefecture, region, categories, tags, description').eq('id', spotIdArg);
} else if (regionArg) {
  query = query.eq('region', regionArg);
}

if (limit && !spotIdArg) {
  query = query.limit(limit);
}

const { data, error } = await query;

if (error) {
  console.error('Supabase error:', error.message);
  process.exit(1);
}

const spots = data ?? [];

if (spots.length === 0) {
  console.log('写真未設定のスポットが見つかりませんでした。');
  process.exit(0);
}

console.log(`\n🔍  ${spots.length}スポットの候補写真を取得します...\n`);

// ─── Load existing manifest ───────────────────────────────────────────────────

let manifest = {};
try {
  const raw = await readFile(MANIFEST_PATH, 'utf8');
  manifest = JSON.parse(raw);
} catch {
  // 新規作成
}

// ─── Flickr search (CC license, Japan content が圧倒的に多い) ─────────────────

const FLICKR_LICENSE_LABELS = { '4': 'CC BY', '5': 'CC BY-SA', '6': 'CC BY-ND', '9': 'CC0', '10': 'Public Domain' };

async function searchFlickr(queries) {
  if (!FLICKR_KEY) return [];
  // 商用利用可能なライセンスのみ (CC BY / CC BY-SA / CC BY-ND / CC0 / PD)
  const licenses = '4,5,6,9,10';
  for (const q of queries) {
    try {
      const res = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search` +
        `&api_key=${FLICKR_KEY}&text=${encodeURIComponent(q)}&license=${licenses}` +
        `&sort=relevance&content_type=1&media=photos&per_page=${CANDIDATES_PER_SPOT}` +
        `&extras=url_l,url_c,url_m,owner_name,license&format=json&nojsoncallback=1`
      );
      if (!res.ok) continue;
      const json = await res.json();
      const photos = json.photos?.photo ?? [];
      if (photos.length === 0) continue;

      return photos
        .filter((p) => p.url_l || p.url_c || p.url_m)
        .map((p) => {
          const licenseLabel = FLICKR_LICENSE_LABELS[p.license] ?? 'CC';
          return {
            source: 'flickr',
            id: p.id,
            query: q,
            downloadUrl: p.url_l || p.url_c || p.url_m,
            thumbUrl: p.url_m,
            photographer: p.ownername,
            pageUrl: `https://www.flickr.com/photos/${p.owner}/${p.id}`,
            credit: `Photo by ${p.ownername} (Flickr) / ${licenseLabel}`,
          };
        });
    } catch {
      // 次のクエリにフォールバック
    }
  }
  return [];
}

// ─── Pexels search ────────────────────────────────────────────────────────────

async function searchPexels(queries) {
  if (!PEXELS_KEY) return [];
  for (const q of queries) {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=${CANDIDATES_PER_SPOT}&orientation=landscape`,
        { headers: { Authorization: PEXELS_KEY } }
      );
      if (!res.ok) continue;
      const json = await res.json();
      if ((json.photos ?? []).length > 0) {
        return json.photos.map((p) => ({
          source: 'pexels',
          id: String(p.id),
          query: q,
          downloadUrl: p.src.large2x || p.src.large,
          thumbUrl: p.src.medium,
          photographer: p.photographer,
          pageUrl: p.url,
        }));
      }
    } catch {
      // 次のクエリにフォールバック
    }
  }
  return [];
}

// ─── Unsplash search ──────────────────────────────────────────────────────────

async function searchUnsplash(queries) {
  if (!UNSPLASH_KEY) return [];
  for (const q of queries) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=${CANDIDATES_PER_SPOT}&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
      );
      if (!res.ok) continue;
      const json = await res.json();
      const results = json.results ?? [];
      if (results.length > 0) {
        return results.map((p) => ({
          source: 'unsplash',
          id: p.id,
          query: q,
          downloadUrl: p.urls.regular,
          thumbUrl: p.urls.small,
          photographer: p.user.name,
          pageUrl: p.links.html,
        }));
      }
    } catch {
      // 次のクエリにフォールバック
    }
  }
  return [];
}

// ─── Wikimedia Commons search (no API key required) ───────────────────────────

// 商用利用NGのライセンスキーワード
const WIKIMEDIA_NC_LICENSES = ['NC', 'NonCommercial', 'by-nc'];

function isCommercialOk(licenseShortName) {
  if (!licenseShortName) return false;
  return !WIKIMEDIA_NC_LICENSES.some((kw) => licenseShortName.includes(kw));
}

async function searchWikimedia(queries) {
  for (const q of queries) {
    try {
      // Step 1: search for image files
      const searchRes = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srnamespace=6&srlimit=10&format=json&origin=*`
      );
      if (!searchRes.ok) continue;
      const searchJson = await searchRes.json();
      const hits = (searchJson.query?.search ?? []).filter((h) => /\.(jpg|jpeg|png)$/i.test(h.title));
      if (hits.length === 0) continue;

      // Step 2: get image URLs + license info
      const titles = hits.slice(0, 8).map((h) => h.title).join('|');
      const infoRes = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1200&format=json&origin=*`
      );
      if (!infoRes.ok) continue;
      const infoJson = await infoRes.json();
      const pages = Object.values(infoJson.query?.pages ?? {});

      const results = pages
        .filter((p) => {
          if (!p.imageinfo?.[0]?.url) return false;
          // 商用NGを除外
          const license = p.imageinfo[0].extmetadata?.LicenseShortName?.value ?? '';
          return isCommercialOk(license);
        })
        .slice(0, CANDIDATES_PER_SPOT)
        .map((p) => {
          const info = p.imageinfo[0];
          const artist = info.extmetadata?.Artist?.value?.replace(/<[^>]*>/g, '') ?? 'Wikimedia';
          const license = info.extmetadata?.LicenseShortName?.value ?? 'CC';
          return {
            source: 'wikimedia',
            id: String(p.pageid),
            query: q,
            downloadUrl: info.thumburl || info.url,
            thumbUrl: info.thumburl || info.url,
            photographer: artist.slice(0, 40),
            pageUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`,
            credit: `Photo by ${artist.slice(0, 40)} (Wikimedia Commons / ${license})`,
          };
        });

      if (results.length > 0) return results;
    } catch {
      // 次のクエリにフォールバック
    }
  }
  return [];
}

// ─── Prefecture Japanese names (Wikimedia 検索ヒット率向上) ──────────────────

const PREF_JA = {
  Hokkaido:'北海道', Aomori:'青森', Iwate:'岩手', Miyagi:'宮城', Akita:'秋田',
  Yamagata:'山形', Fukushima:'福島', Tokyo:'東京', Kanagawa:'神奈川', Saitama:'埼玉',
  Chiba:'千葉', Ibaraki:'茨城', Tochigi:'栃木', Gunma:'群馬', Yamanashi:'山梨',
  Niigata:'新潟', Toyama:'富山', Ishikawa:'石川', Fukui:'福井', Nagano:'長野',
  Shizuoka:'静岡', Aichi:'愛知', Gifu:'岐阜', Mie:'三重', Osaka:'大阪',
  Kyoto:'京都', Hyogo:'兵庫', Nara:'奈良', Shiga:'滋賀', Wakayama:'和歌山',
  Tottori:'鳥取', Shimane:'島根', Okayama:'岡山', Hiroshima:'広島', Yamaguchi:'山口',
  Tokushima:'徳島', Kagawa:'香川', Ehime:'愛媛', Kochi:'高知', Fukuoka:'福岡',
  Saga:'佐賀', Nagasaki:'長崎', Kumamoto:'熊本', Oita:'大分', Miyazaki:'宮崎',
  Kagoshima:'鹿児島', Okinawa:'沖縄',
};

// ─── Build search queries with fallback ───────────────────────────────────────

function buildQueries(spot) {
  const name = spot.name;
  const pref = spot.prefecture;
  const prefJa = PREF_JA[pref] ?? '';
  const tag = (spot.tags ?? [])[0] ?? '';
  const cat = (spot.categories ?? [])[0] ?? '';

  return [
    `${name} ${pref} Japan`,    // 英語・最も具体的
    `${name} Japan`,            // 英語・地名のみ
    prefJa ? `${name} ${prefJa}` : null,  // 日本語・都道府県付き（Wikimedia向け）
    prefJa ? `${prefJa} ${tag}` : null,   // 日本語・タグベース
    `${tag} Japan`,             // 英語・タグベース
    `${cat} Japan`,             // 英語・カテゴリベース
  ].filter(Boolean);
}

// ─── Download image ───────────────────────────────────────────────────────────

async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = await res.arrayBuffer();
  return Buffer.from(buffer);
}

// ─── Process each spot ────────────────────────────────────────────────────────

let processed = 0;
let skipped = 0;

for (const spot of spots) {
  const spotDir = join(REVIEW_DIR, spot.id);

  // 既に候補がある場合はスキップ
  if (manifest[spot.id]?.candidates?.length > 0) {
    console.log(`⏭️   ${spot.id} — 候補あり、スキップ`);
    skipped++;
    continue;
  }

  console.log(`📥  ${spot.id} (${spot.prefecture})`);
  await mkdir(spotDir, { recursive: true });

  const queries = buildQueries(spot);

  // Pexels + Wikimedia を並列検索
  const [pexelsResults, wikimediaResults] = await Promise.all([
    searchPexels(queries),
    searchWikimedia(queries),
  ]);

  // 結果をマージ（Pexels優先 > Wikimedia、最大5件）
  const combined = [...pexelsResults, ...wikimediaResults].slice(0, CANDIDATES_PER_SPOT);

  if (combined.length === 0) {
    console.log(`  ⚠️  候補なし → Pixtaキューに追加`);
    manifest[spot.id] = {
      spotName: spot.name,
      prefecture: spot.prefecture,
      status: 'pixta_needed',
      candidates: [],
      pixtaSuggestedQuery: `${spot.name} ${spot.prefecture}`,
    };
    await saveManifest();
    await delay(REQUEST_DELAY_MS);
    continue;
  }

  // 候補をダウンロード
  const candidates = [];
  for (let i = 0; i < combined.length; i++) {
    const c = combined[i];
    const filename = `${i + 1}.jpg`;
    const savePath = join(spotDir, filename);
    try {
      const imgBuf = await downloadImage(c.downloadUrl);
      await writeFile(savePath, imgBuf);
      candidates.push({
        number: i + 1,
        source: c.source,
        sourceId: c.id,
        query: c.query,
        photographer: c.photographer,
        pageUrl: c.pageUrl,
        credit: c.credit ?? null,
        filename,
      });
      process.stdout.write(`  ${i + 1}✓ `);
    } catch (err) {
      process.stdout.write(`  ${i + 1}✗ `);
    }
  }
  console.log();

  manifest[spot.id] = {
    spotName: spot.name,
    prefecture: spot.prefecture,
    region: spot.region,
    status: 'pending_review',
    candidates,
    pixtaSuggestedQuery: `${spot.name} ${spot.prefecture}`,
  };

  await saveManifest();
  processed++;

  await delay(REQUEST_DELAY_MS);
}

// ─── Summary ──────────────────────────────────────────────────────────────────

const needsPixta = Object.values(manifest).filter((v) => v.status === 'pixta_needed').length;
const pendingReview = Object.values(manifest).filter((v) => v.status === 'pending_review').length;

console.log(`\n${'─'.repeat(60)}`);
console.log(`✅  処理完了`);
console.log(`   候補取得: ${processed}スポット`);
console.log(`   スキップ: ${skipped}スポット`);
console.log(`   Pixtaが必要: ${needsPixta}スポット`);
console.log(`   レビュー待ち: ${pendingReview}スポット`);
console.log(`\n次のステップ:`);
console.log(`  自動選定: node scripts/auto-select-photos.mjs`);
console.log(`  手動承認: node scripts/approve-photo.mjs <spot-id> <候補番号>`);
console.log(`  一括アップロード: npm run upload-images\n`);

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function saveManifest() {
  await mkdir(REVIEW_DIR, { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
