#!/usr/bin/env node
/**
 * ファクトチェックで見つかった修正を Supabase API（spots テーブル UPDATE）で反映する。
 * .env.local の NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を使用。
 *
 * 使い方: node scripts/apply-factcheck-via-api.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = resolve(__dirname, '../.env.local');
if (existsSync(envPath)) {
  const env = readFileSync(envPath, 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL または SUPABASE_SERVICE_ROLE_KEY が未設定です。');
  process.exit(1);
}

const supabase = createClient(url, key);

// apply-factcheck-batch1.sql + batch2 の内容を id ごとの更新にしたもの
const updates = [
  { id: 'enoshima-island', access: 'Enoshima Station on Odakyu Enoshima Line (about 60–70 min from Shinjuku)' },
  { id: 'hakone-ryokan', admission: 'Free Pass ¥5,000–6,100 (2 days, dep. Odawara/Shinjuku)', access: 'Romance Car from Shinjuku (about 75 min) or Shinkansen to Odawara (35 min)' },
  { id: 'odawara-castle', admission: '¥510 (from Mar 2026: ¥1,000)' },
  { id: 'omiya-bonsai-village', access: 'Omiya-Koen Station (Tobu Noda Line), 10 min walk to museum' },
  { id: 'hakone-open-air-museum', admission: '¥2,000 (WEB ¥1,800)', access: 'Chokoku no Mori Station on Hakone Tozan Railway (about 2hr from Shinjuku)' },
  { id: 'kamakura-great-buddha', admission: '¥200 (Great Buddha), Hase-dera ¥400', access: 'Hase Station on Enoden Line (about 5 min from Kamakura Station)' },
  { id: 'sankeien-garden', admission: '¥900' },
  { id: 'higashi-matsuyama-hike', access: 'Shinrin-koen Station (Tobu Tojo Line), then bus to south/west gate (60–70 min from Ikebukuro)' },
  { id: 'nagatoro-gorge', admission: 'Free (boat from ¥2,000 for 3km course)' },
  { id: 'omiya-bonsai-village', admission: 'Museum ¥310' }, // 2回目: admission のみ（access は上で設定済み）
  { id: 'saitama-railway-museum', admission: '¥1,600' },
  // batch2
  { id: 'nikko-kegon-falls', admission: '¥600 (elevator, adult)', access: 'Bus from Nikko Station (about 50 min to Chuzenji/Kegon Falls)' },
  { id: 'mashiko-pottery', admission: 'Museum ¥600', access: 'Bus from Utsunomiya Station (about 60 min), get off at Mashiko Togei Bijutsukan Iriguchi' },
  { id: 'nikko-toshogu', admission: '¥1,600 (adult), ¥550 (child)' },
  { id: 'sano-outlet', access: 'Direct bus from Shinjuku/Tokyo Station (about 90 min); or Sano Station (Tobu Sano Line) then local bus about 15 min' },
  { id: 'tochigi-city-canal', admission: 'Free (boat ride adult ¥1,000, child ¥700)', access: 'Tochigi Station on Tobu Nikko Line (about 2hr 35min from Asakusa)' },
  { id: 'ashikaga-flower-park', admission: '¥500–2,300 (adult, seasonal)', access: 'Ashikaga Flower Park Station on JR Ryomo Line (about 1hr 30min–2hr from Shinjuku)' },
  { id: 'nezu-shrine', admission: 'Free (azalea garden ¥300 during Tsutsuji Festival)' },
  { id: 'tsukiji-outer-market', access: '1 min walk from Tsukiji Station (Hibiya Line)' },
];

// omiya-bonsai-village は access と admission を別々に登録しているので、1回にまとめる
const byId = new Map();
for (const u of updates) {
  const id = u.id;
  if (!byId.has(id)) byId.set(id, { id });
  const row = byId.get(id);
  if (u.admission !== undefined) row.admission = u.admission;
  if (u.access !== undefined) row.access = u.access;
}
const merged = [...byId.values()];

console.log('Applying', merged.length, 'spot updates...');
let ok = 0;
let err = 0;
for (const row of merged) {
  const { id, ...fields } = row;
  const { error } = await supabase.from('spots').update(fields).eq('id', id);
  if (error) {
    console.error('❌', id, error.message);
    err++;
  } else {
    console.log('✅', id);
    ok++;
  }
}

console.log('\nMarking fact_checked_at for Kanagawa, Saitama, Tochigi, Tokyo...');
const { error: markError } = await supabase
  .from('spots')
  .update({ fact_checked_at: new Date().toISOString() })
  .in('prefecture', ['Kanagawa', 'Saitama', 'Tochigi', 'Tokyo'])
  .is('fact_checked_at', null);

if (markError) {
  console.error('❌ fact_checked_at update failed:', markError.message);
  process.exit(1);
}
console.log('✅ fact_checked_at updated.');

console.log('\nDone.', ok, 'updated,', err, 'errors.');
if (err) process.exit(1);
