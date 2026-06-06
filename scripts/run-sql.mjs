#!/usr/bin/env node
/**
 * SQL ファイルを Supabase（Postgres）に対して実行する。
 *
 * 前提:
 *   - .env.local に SUPABASE_DB_URL が設定されていること
 *   - SUPABASE_DB_URL は Supabase Dashboard → Settings → Database → Connection string (URI)
 *     [YOUR-PASSWORD] を実際の DB パスワードに置き換えたもの
 *
 * 使い方:
 *   node scripts/run-sql.mjs scripts/apply-factcheck-batch1.sql
 */
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env.local を読む
const envPath = resolve(__dirname, '../.env.local');
if (existsSync(envPath)) {
  const env = readFileSync(envPath, 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
}

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error('❌ SUPABASE_DB_URL が設定されていません。');
  console.error('   Supabase Dashboard → Project Settings → Database → Connection string (URI) をコピーし、');
  console.error('   [YOUR-PASSWORD] を実際の DB パスワードに置き換えて .env.local に追加してください。');
  console.error('   例: SUPABASE_DB_URL="postgresql://postgres.xxx:パスワード@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"');
  process.exit(1);
}

const sqlPath = process.argv[2];
if (!sqlPath) {
  console.error('使い方: node scripts/run-sql.mjs <SQLファイルパス>');
  console.error('例: node scripts/run-sql.mjs scripts/apply-factcheck-batch1.sql');
  process.exit(1);
}

const absPath = resolve(process.cwd(), sqlPath);
if (!existsSync(absPath)) {
  console.error('❌ ファイルが見つかりません:', absPath);
  process.exit(1);
}

const sql = readFileSync(absPath, 'utf8');

// pg は optional なので動的 import
let pg;
try {
  pg = await import('pg');
} catch (e) {
  console.error('❌ pg がインストールされていません。次のコマンドを実行してください:');
  console.error('   pnpm add -D pg');
  process.exit(1);
}

const client = new pg.default.Client({ connectionString: url });
try {
  await client.connect();
  await client.query(sql);
  console.log('✅ 実行完了:', sqlPath);
} catch (err) {
  console.error('❌ 実行エラー:', err.message);
  process.exit(1);
} finally {
  await client.end();
}
