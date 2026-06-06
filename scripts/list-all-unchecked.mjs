#!/usr/bin/env node
/**
 * fact_checked_at IS NULL のスポットを全件取得し、県別件数と一覧を出力する。
 * 使い方: node scripts/list-all-unchecked.mjs
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
  .select('id, name, prefecture')
  .is('fact_checked_at', null)
  .order('prefecture')
  .order('name');

if (error) {
  console.error(error);
  process.exit(1);
}

const list = data || [];
const byPref = {};
list.forEach((s) => {
  byPref[s.prefecture] = (byPref[s.prefecture] || []).concat(s);
});

console.log('=== 未チェック件数（県別） ===');
Object.keys(byPref)
  .sort()
  .forEach((p) => console.log(`${p}: ${byPref[p].length} 件`));
console.log('');
console.log(`合計: ${list.length} 件`);
console.log('');
console.log('=== 未チェック一覧（id | name | prefecture） ===');
list.forEach((s) => console.log(`${s.id} | ${s.name} | ${s.prefecture}`));
