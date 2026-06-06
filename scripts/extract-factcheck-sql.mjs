#!/usr/bin/env node
/**
 * ファクトチェック報告書の「## SQL更新候補」表から UPDATE 文を生成する。
 * 対象フィールド: admission, access, opening_hours, tips（4項目まとめて対応）。
 *
 * 使い方:
 *   node scripts/extract-factcheck-sql.mjs scripts/spot-factcheck-report-okinawa.md
 *   node scripts/extract-factcheck-sql.mjs scripts/spot-factcheck-report-okinawa.md >> scripts/apply-factcheck-okinawa.sql
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const reportPath = process.argv[2];
if (!reportPath) {
  console.error('Usage: node extract-factcheck-sql.mjs <path-to-spot-factcheck-report-*.md>');
  process.exit(1);
}

const path = resolve(process.cwd(), reportPath);
let content;
try {
  content = readFileSync(path, 'utf8');
} catch (e) {
  console.error('File not found:', path);
  process.exit(1);
}

const ALLOWED_FIELDS = ['admission', 'access', 'opening_hours', 'tips'];

function escapeSql(s) {
  return (s || '').replace(/'/g, "''").trim();
}

const idx = content.indexOf('## SQL更新候補');
if (idx === -1) {
  console.error('No "## SQL更新候補" section found.');
  process.exit(1);
}

const block = content.slice(idx);
const lines = block.split('\n');
const updates = [];

for (const line of lines) {
  const m = line.match(/^\|\s*([a-z0-9-]+)\s*\|\s*(admission|access|opening_hours|tips)\s*\|\s*([^|]+)\|$/);
  if (m) {
    const [, id, field, value] = m;
    if (!ALLOWED_FIELDS.includes(field)) continue;
    const val = escapeSql(value);
    updates.push({ id, field, value: val });
  }
}

for (const { id, field, value } of updates) {
  console.log(`UPDATE spots SET ${field} = '${value}' WHERE id = '${id}';`);
}
