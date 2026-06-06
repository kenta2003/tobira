#!/usr/bin/env node
/**
 * 全スポットの opening_hours / tips を取得し、地域別 JSON に保存する。
 * 用途: opening_hours と tips のファクトチェック用。
 * 使い方: node scripts/fetch-all-spots-hours-tips.mjs [region]
 *   region 省略時は全地域を取得して scripts/factcheck-hours-tips-<region>.json に保存。
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync, writeFileSync } from 'fs';
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
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, key);

const COLS = 'id, name, prefecture, address, website_url, opening_hours, tips';

// 全県 → 地域（fetch-unchecked の REGIONS と合わせる + 東北）
const REGION_BY_PREF = {
  Hokkaido: 'hokkaido',
  Aomori: 'tohoku', Iwate: 'tohoku', Miyagi: 'tohoku', Akita: 'tohoku', Yamagata: 'tohoku', Fukushima: 'tohoku',
  Ibaraki: 'kanto', Tochigi: 'kanto', Gunma: 'kanto', Saitama: 'kanto', Chiba: 'kanto', Tokyo: 'kanto', Kanagawa: 'kanto',
  Niigata: 'hokuriku', Toyama: 'hokuriku', Ishikawa: 'hokuriku', Fukui: 'hokuriku',
  Yamanashi: 'chubu', Nagano: 'chubu', Shizuoka: 'chubu', Aichi: 'chubu', Gifu: 'chubu', Mie: 'chubu',
  Osaka: 'kansai', Kyoto: 'kansai', Hyogo: 'kansai', Nara: 'kansai', Shiga: 'kansai', Wakayama: 'kansai',
  Tottori: 'chugoku', Shimane: 'chugoku', Okayama: 'chugoku', Hiroshima: 'chugoku', Yamaguchi: 'chugoku',
  Tokushima: 'shikoku', Kagawa: 'shikoku', Ehime: 'shikoku', Kochi: 'shikoku',
  Fukuoka: 'kyushu', Saga: 'kyushu', Nagasaki: 'kyushu', Kumamoto: 'kyushu', Oita: 'kyushu', Miyazaki: 'kyushu', Kagoshima: 'kyushu',
  Okinawa: 'okinawa',
};

async function fetchAll() {
  const PAGE_SIZE = 1000;
  let all = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('spots')
      .select(COLS)
      .order('prefecture')
      .order('name')
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    if (!data?.length) break;
    all = all.concat(data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return all;
}

const regionArg = process.argv[2];
let spots = await fetchAll();

if (regionArg) {
  const prefs = Object.entries(REGION_BY_PREF).filter(([, r]) => r === regionArg).map(([p]) => p);
  spots = prefs.length ? spots.filter((s) => prefs.includes(s.prefecture)) : spots.filter((s) => (REGION_BY_PREF[s.prefecture] || 'other') === regionArg);
}

const byRegion = {};
for (const s of spots) {
  const r = REGION_BY_PREF[s.prefecture] || 'other';
  if (!byRegion[r]) byRegion[r] = [];
  byRegion[r].push(s);
}

const dir = resolve(__dirname);
for (const [region, list] of Object.entries(byRegion)) {
  if (regionArg && region !== regionArg) continue;
  const path = resolve(dir, `factcheck-hours-tips-${region}.json`);
  writeFileSync(path, JSON.stringify(list, null, 2));
  console.error(`${region}: ${list.length} 件 → ${path}`);
}

console.error(`# 合計: ${spots.length} 件`);
if (!regionArg) {
  console.log(JSON.stringify(spots, null, 2));
} else {
  const list = byRegion[regionArg] || [];
  console.log(JSON.stringify(list, null, 2));
}
