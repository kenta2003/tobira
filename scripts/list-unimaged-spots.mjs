#!/usr/bin/env node
/**
 * list-unimaged-spots.mjs
 *
 * 写真がまだないスポット（image_url が null または Unsplash プレースホルダー）を
 * Supabase から取得して一覧表示する。Pixta 検索の作業キューとして使う。
 *
 * Usage:
 *   node scripts/list-unimaged-spots.mjs
 *   node scripts/list-unimaged-spots.mjs --region hokkaido
 *   node scripts/list-unimaged-spots.mjs --json   # JSON出力（他スクリプトとのパイプ用）
 */

import { createClient } from '@supabase/supabase-js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ─── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const regionArg = args[args.indexOf('--region') + 1] ?? null;
const jsonMode = args.includes('--json');

// ─── Query ────────────────────────────────────────────────────────────────────

let query = supabase
  .from('spots')
  .select('id, name, prefecture, region, categories, tags, is_premium')
  .or('image_url.is.null,image_url.like.%unsplash%')
  .order('region')
  .order('prefecture')
  .order('name');

if (regionArg) {
  query = query.eq('region', regionArg);
}

const { data, error } = await query;

if (error) {
  console.error('Supabase error:', error.message);
  process.exit(1);
}

const spots = data ?? [];

// ─── Output ───────────────────────────────────────────────────────────────────

if (jsonMode) {
  console.log(JSON.stringify(spots, null, 2));
  process.exit(0);
}

if (spots.length === 0) {
  console.log('全スポットに写真があります！');
  process.exit(0);
}

// Group by region for readability
const byRegion = {};
for (const s of spots) {
  const r = s.region ?? 'unknown';
  (byRegion[r] ??= []).push(s);
}

// Pixtaキュー情報を manifest から読み込む
let pixtaSet = new Set();
try {
  const { readFileSync } = await import('fs');
  const { join: j, dirname: d } = await import('path');
  const { fileURLToPath: f } = await import('url');
  const dir = d(f(import.meta.url));
  const raw = readFileSync(j(dir, 'review', 'manifest.json'), 'utf8');
  const mf = JSON.parse(raw);
  pixtaSet = new Set(Object.entries(mf).filter(([, v]) => v.status === 'pixta_needed').map(([id]) => id));
} catch { /* manifest なければ無視 */ }

console.log(`\n📷  写真未設定スポット: ${spots.length}件${pixtaSet.size > 0 ? ` (うちPixtaキュー: ${pixtaSet.size}件)` : ''}\n`);

for (const [region, list] of Object.entries(byRegion)) {
  console.log(`── ${region.toUpperCase()} (${list.length}件) ${'─'.repeat(40)}`);
  for (const s of list) {
    const premium = s.is_premium ? ' ⭐' : '';
    const pixta = pixtaSet.has(s.id) ? ' 🔴Pixta' : '';
    const tags = (s.tags ?? []).slice(0, 3).join(', ');
    const cats = (s.categories ?? []).slice(0, 2).join('/');
    console.log(
      `  ${s.id.padEnd(36)} [${s.prefecture.padEnd(12)}] ${cats.padEnd(20)} ${tags}${premium}${pixta}`
    );
  }
  console.log();
}

console.log('💡 ヒント: --json フラグでJSON出力できます（他スクリプトへのパイプ用）');
console.log(`   npm run fetch-candidates → npm run review-photos -- --upload\n`);
