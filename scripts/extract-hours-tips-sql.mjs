#!/usr/bin/env node
/**
 * spot-factcheck-hours-tips-*.md の「## SQL更新候補」表をパースし、
 * UPDATE 文を標準出力する。実行すると apply-factcheck-hours-tips.sql 用の行が得られる。
 */
import { readFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = resolve(__dirname);
const files = readdirSync(dir).filter((f) => f.startsWith('spot-factcheck-hours-tips-') && f.endsWith('.md'));

function escapeSql(s) {
  return (s || '').replace(/'/g, "''").trim();
}

const updates = [];
for (const file of files.sort()) {
  const content = readFileSync(resolve(dir, file), 'utf8');
  const idx = content.indexOf('## SQL更新候補');
  if (idx === -1) continue;
  const block = content.slice(idx);
  const lines = block.split('\n');
  for (const line of lines) {
    const m = line.match(/^\|\s*([a-z0-9-]+)\s*\|\s*(opening_hours|tips)\s*\|\s*([^|]+)\|$/);
    if (m) {
      const [, id, field, value] = m;
      const val = escapeSql(value);
      updates.push({ id, field, value: val });
    }
  }
}

const seen = new Set();
for (const { id, field, value } of updates) {
  const key = `${id}:${field}`;
  if (seen.has(key)) continue;
  seen.add(key);
  console.log(`UPDATE spots SET ${field} = '${value}' WHERE id = '${id}';`);
}
