#!/usr/bin/env node
/**
 * spots テーブルのカラム存在確認（Supabase から1件取得してキーを表示）。
 * opening_hours / tips の有無を確認する用。
 * 使い方: node scripts/check-spots-columns.mjs
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
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, key);

const { data, error } = await supabase
  .from('spots')
  .select('*')
  .limit(1)
  .single();

if (error) {
  console.error('Error:', error.message);
  if (error.message.includes('opening_hours') || error.message.includes('tips')) {
    console.error('→ そのカラムがテーブルに存在しない可能性があります。');
  }
  process.exit(1);
}

const keys = Object.keys(data).sort();
console.log('spots のカラム（1件取得したキー）:\n');
keys.forEach((k) => {
  const val = data[k];
  const preview = val === null ? 'NULL' : typeof val === 'string' && val.length > 40 ? val.slice(0, 40) + '…' : String(val);
  console.log(`  ${k}: ${preview}`);
});

const hasHours = keys.includes('opening_hours');
const hasTips = keys.includes('tips');
console.log('\n--- 確認結果 ---');
console.log('  opening_hours:', hasHours ? '✅ あり' : '❌ なし');
console.log('  tips:         ', hasTips ? '✅ あり' : '❌ なし');
