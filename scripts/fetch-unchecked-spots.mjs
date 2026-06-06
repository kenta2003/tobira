#!/usr/bin/env node
/**
 * 未チェック（fact_checked_at IS NULL）のスポットを地域別に取得する。
 * 出力は japan-tourism-fact-checker エージェントに渡す用のJSON。
 * 取得項目: admission, access, opening_hours, tips を含む（ファクトチェックは4項目まとめて実施）。
 *
 * 使い方: node scripts/fetch-unchecked-spots.mjs <region>
 * 環境変数: .env.local を読むか、NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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

const REGIONS = {
  kanto: ['Kanagawa', 'Saitama', 'Tochigi', 'Tokyo'],
  hokuriku: ['Niigata', 'Toyama', 'Ishikawa', 'Fukui'],
  chubu: ['Aichi', 'Shizuoka', 'Nagano', 'Gifu', 'Mie', 'Yamanashi'],
  kansai: ['Osaka', 'Kyoto', 'Hyogo', 'Nara', 'Shiga', 'Wakayama'],
  chugoku: ['Hiroshima', 'Okayama', 'Tottori', 'Shimane', 'Yamaguchi'],
  shikoku: ['Kagawa', 'Ehime', 'Kochi', 'Tokushima'],
  kyushu: ['Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima'],
  okinawa: ['Okinawa'],
  hokkaido: ['Hokkaido'],
};
const regionArg = process.argv[2];
const PREFECTURES = REGIONS[regionArg] ?? REGIONS.kanto;
const COLS = 'id, name, prefecture, address, access, admission, opening_hours, tips, best_season, website_url, description';

const { data, error } = await supabase
  .from('spots')
  .select(COLS)
  .in('prefecture', PREFECTURES)
  .is('fact_checked_at', null)
  .order('prefecture')
  .order('name');

if (error) {
  console.error('Supabase error:', error.message);
  if (error.message.includes('fact_checked_at')) {
    console.error('ヒント: spots テーブルに fact_checked_at (timestamptz) カラムを追加してください。');
  }
  process.exit(1);
}

const spots = data ?? [];
const out = (['hokuriku', 'chubu', 'kansai', 'chugoku', 'shikoku', 'kyushu', 'okinawa', 'hokkaido'].includes(regionArg)) ? regionArg : process.argv[3] ?? process.argv[2];
if (out === 'batch1') {
  const b1 = spots.filter(s => s.prefecture === 'Kanagawa' || s.prefecture === 'Saitama');
  fs.writeFileSync(resolve(__dirname, 'factcheck-batch1.json'), JSON.stringify(b1, null, 2));
  console.error(`Batch1 (Kanagawa+Saitama): ${b1.length} 件保存`);
} else if (out === 'batch2') {
  const b2 = spots.filter(s => s.prefecture === 'Tochigi' || s.prefecture === 'Tokyo');
  fs.writeFileSync(resolve(__dirname, 'factcheck-batch2.json'), JSON.stringify(b2, null, 2));
  console.error(`Batch2 (Tochigi+Tokyo): ${b2.length} 件保存`);
} else if (out === 'hokuriku' || regionArg === 'hokuriku') {
  fs.writeFileSync(resolve(__dirname, 'factcheck-hokuriku.json'), JSON.stringify(spots, null, 2));
  console.error(`北陸: ${spots.length} 件 → factcheck-hokuriku.json`);
  console.log(JSON.stringify(spots, null, 2));
} else if (out === 'chubu' || regionArg === 'chubu') {
  fs.writeFileSync(resolve(__dirname, 'factcheck-chubu.json'), JSON.stringify(spots, null, 2));
  console.error(`中部: ${spots.length} 件 → factcheck-chubu.json`);
  console.log(JSON.stringify(spots, null, 2));
} else if (out === 'kansai' || regionArg === 'kansai') {
  fs.writeFileSync(resolve(__dirname, 'factcheck-kansai.json'), JSON.stringify(spots, null, 2));
  console.error(`関西: ${spots.length} 件 → factcheck-kansai.json`);
  console.log(JSON.stringify(spots, null, 2));
} else if (out === 'chugoku' || regionArg === 'chugoku') {
  fs.writeFileSync(resolve(__dirname, 'factcheck-chugoku.json'), JSON.stringify(spots, null, 2));
  console.error(`中国: ${spots.length} 件 → factcheck-chugoku.json`);
  console.log(JSON.stringify(spots, null, 2));
} else if (out === 'shikoku' || regionArg === 'shikoku') {
  fs.writeFileSync(resolve(__dirname, 'factcheck-shikoku.json'), JSON.stringify(spots, null, 2));
  console.error(`四国: ${spots.length} 件 → factcheck-shikoku.json`);
  console.log(JSON.stringify(spots, null, 2));
} else if (out === 'kyushu' || regionArg === 'kyushu') {
  fs.writeFileSync(resolve(__dirname, 'factcheck-kyushu.json'), JSON.stringify(spots, null, 2));
  console.error(`九州: ${spots.length} 件 → factcheck-kyushu.json`);
  console.log(JSON.stringify(spots, null, 2));
} else if (out === 'okinawa' || regionArg === 'okinawa') {
  fs.writeFileSync(resolve(__dirname, 'factcheck-okinawa.json'), JSON.stringify(spots, null, 2));
  console.error(`沖縄: ${spots.length} 件 → factcheck-okinawa.json`);
  console.log(JSON.stringify(spots, null, 2));
} else if (out === 'hokkaido' || regionArg === 'hokkaido') {
  fs.writeFileSync(resolve(__dirname, 'factcheck-hokkaido.json'), JSON.stringify(spots, null, 2));
  console.error(`北海道: ${spots.length} 件 → factcheck-hokkaido.json`);
  console.log(JSON.stringify(spots, null, 2));
} else {
  console.log(JSON.stringify(spots, null, 2));
}
console.error(`# 取得件数: ${spots.length}`);
