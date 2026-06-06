#!/usr/bin/env node
/**
 * batch-import.mjs
 *
 * フォルダ内の複数写真をインタラクティブにスポットへ割り当て・一括アップロード。
 * Pixtaでまとめてダウンロードした後に使う。
 *
 * Usage:
 *   node scripts/batch-import.mjs ~/Downloads/
 *   node scripts/batch-import.mjs ~/Downloads/pixta_*.jpg   # glob も可（シェルで展開）
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { execSync } from 'child_process';
import * as readline from 'readline';
import sharp from 'sharp';
import { readdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MANIFEST_PATH = join(__dirname, 'review', 'manifest.json');
const BUCKET = 'spot-images';
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;
const VALID_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

// ─── Collect files ────────────────────────────────────────────────────────────

const rawArgs = process.argv.slice(2);
if (rawArgs.length === 0) {
  console.error('Usage: node scripts/batch-import.mjs <フォルダ or ファイル...>');
  console.error('例:    node scripts/batch-import.mjs ~/Downloads/');
  process.exit(1);
}

function expandHome(p) {
  return p.startsWith('~') ? join(process.env.HOME ?? '', p.slice(1)) : p;
}

let files = [];
for (const arg of rawArgs) {
  const p = expandHome(arg);
  try {
    // フォルダなら中の画像ファイルを全列挙
    const stat = (await import('fs')).statSync(p);
    if (stat.isDirectory()) {
      const entries = readdirSync(p)
        .filter((f) => VALID_EXTS.has(extname(f).toLowerCase()))
        .map((f) => join(p, f))
        .sort();
      files.push(...entries);
    } else if (VALID_EXTS.has(extname(p).toLowerCase())) {
      files.push(p);
    }
  } catch {
    console.error(`ファイルが見つかりません: ${p}`);
  }
}

if (files.length === 0) {
  console.error('有効な画像ファイルが見つかりませんでした。');
  process.exit(1);
}

// ─── Fetch Pixta-needed spots from DB + manifest ──────────────────────────────

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const { data: allUnimaged } = await supabase
  .from('spots')
  .select('id, name, prefecture, region')
  .or('image_url.is.null,image_url.like.%unsplash%')
  .order('region')
  .order('name');

// Pixtaキューのスポットを優先表示（manifest から）
let pixtaSet = new Set();
try {
  const raw = await readFile(MANIFEST_PATH, 'utf8');
  const mf = JSON.parse(raw);
  pixtaSet = new Set(Object.entries(mf).filter(([, v]) => v.status === 'pixta_needed').map(([id]) => id));
} catch { /* ok */ }

// Pixtaキュー → その他 の順に並べる
const spots = [
  ...(allUnimaged ?? []).filter((s) => pixtaSet.has(s.id)),
  ...(allUnimaged ?? []).filter((s) => !pixtaSet.has(s.id)),
];

if (spots.length === 0) {
  console.log('写真が必要なスポットがありません。');
  process.exit(0);
}

// ─── Terminal setup ───────────────────────────────────────────────────────────

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

function print(msg) { process.stdout.write(msg); }
function println(msg = '') { console.log(msg); }
function clearLine() { process.stdout.write('\r\x1b[K'); }

// ─── Upload ───────────────────────────────────────────────────────────────────

async function uploadFile(spotId, filePath) {
  const { data: spot } = await supabase
    .from('spots').select('id, prefecture').eq('id', spotId).single();
  if (!spot) throw new Error('Spot not found');

  const original = await readFile(filePath);
  const compressed = await sharp(original)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, progressive: true })
    .toBuffer();

  const storagePath = `${spot.prefecture.toLowerCase()}/${spotId}.jpg`;
  const { error: uploadErr } = await supabase.storage
    .from(BUCKET).upload(storagePath, compressed, { contentType: 'image/jpeg', upsert: true });
  if (uploadErr) throw uploadErr;

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
  const { error: updateErr } = await supabase
    .from('spots').update({ image_url: publicUrl, is_published: true }).eq('id', spotId);
  if (updateErr) throw updateErr;

  return publicUrl;
}

// ─── Main loop ────────────────────────────────────────────────────────────────

println(`\n📦  ${files.length}枚の写真を ${spots.length}スポットに割り当てます`);
println();
println('操作: [番号] スポット選択  [o] Finderで開く  [s] スキップ  [q] 終了');
println('─'.repeat(60));

let done = 0;
let skipped = 0;
// 割り当て済みスポットIDを追跡（同じスポットに2枚割り当てを防ぐ）
const assigned = new Set();

for (let fi = 0; fi < files.length; fi++) {
  const filePath = files[fi];
  const fileName = basename(filePath);

  // 残りの未割り当てスポット
  const remaining = spots.filter((s) => !assigned.has(s.id));
  if (remaining.length === 0) {
    println('\n全スポットへの割り当てが完了しました。');
    break;
  }

  println();
  println(`📷  [${fi + 1}/${files.length}] ${fileName}`);
  println();

  // スポット一覧（最大15件表示）
  const display = remaining.slice(0, 15);
  for (let i = 0; i < display.length; i++) {
    const s = display[i];
    const pixta = pixtaSet.has(s.id) ? ' 🔴' : '';
    println(`  [${String(i + 1).padStart(2)}] ${s.id.padEnd(36)} ${s.prefecture}${pixta}`);
  }
  if (remaining.length > 15) {
    println(`  ... 他 ${remaining.length - 15}件`);
  }
  println();

  const answer = await waitForKey(filePath, display.length);

  if (answer === 'q') {
    println('\n中断しました。');
    break;
  }

  if (answer === 's') {
    println(`  → スキップ`);
    skipped++;
    continue;
  }

  const idx = parseInt(answer, 10) - 1;
  const spot = display[idx];

  print(`  → ${spot.id} にアップロード中...`);
  try {
    await uploadFile(spot.id, filePath);
    clearLine();
    println(`  ✅  ${spot.name} (${spot.prefecture}) — 完了`);
    assigned.add(spot.id);

    // manifest 更新
    try {
      const raw = await readFile(MANIFEST_PATH, 'utf8');
      const mf = JSON.parse(raw);
      if (mf[spot.id]) {
        mf[spot.id].status = 'uploaded';
        await writeFile(MANIFEST_PATH, JSON.stringify(mf, null, 2));
      }
    } catch { /* ok */ }

    done++;
  } catch (err) {
    clearLine();
    println(`  ❌  エラー: ${err.message}`);
  }
}

// ─── Summary ──────────────────────────────────────────────────────────────────

if (process.stdin.isTTY) process.stdin.setRawMode(false);

println();
println('─'.repeat(60));
println(`完了: ${done}枚アップロード / ${skipped}枚スキップ`);
println();
process.exit(0);

// ─── Key input ────────────────────────────────────────────────────────────────

function waitForKey(filePath, maxNum) {
  return new Promise((resolve) => {
    print(`  > `);

    // 2桁入力対応
    let buf = '';
    let timer = null;

    function commit() {
      clearTimeout(timer);
      const num = parseInt(buf, 10);
      buf = '';
      if (!isNaN(num) && num >= 1 && num <= maxNum) {
        clearLine();
        process.stdin.removeListener('keypress', onKeypress);
        resolve(String(num));
      } else {
        print(`  > `);
      }
    }

    function onKeypress(_, key) {
      if (!key) return;
      if (key.ctrl && key.name === 'c') {
        process.stdin.removeListener('keypress', onKeypress);
        if (process.stdin.isTTY) process.stdin.setRawMode(false);
        println('\n中断しました。');
        process.exit(0);
      }

      const ch = key.name ?? key.sequence;

      if (ch === 'q' && buf === '') {
        clearLine();
        process.stdin.removeListener('keypress', onKeypress);
        resolve('q');
        return;
      }
      if (ch === 's' && buf === '') {
        clearLine();
        process.stdin.removeListener('keypress', onKeypress);
        resolve('s');
        return;
      }
      if (ch === 'o' && buf === '') {
        try { execSync(`open "${filePath}"`); } catch { /* ok */ }
        return;
      }
      if (ch === 'return' || ch === 'enter') {
        if (buf.length > 0) commit();
        return;
      }
      if (/^\d$/.test(ch)) {
        buf += ch;
        print(ch);
        clearTimeout(timer);
        // 1桁の場合は即確定、2桁の可能性があれば少し待つ
        timer = setTimeout(commit, 600);
        return;
      }
      if (ch === 'backspace' && buf.length > 0) {
        buf = buf.slice(0, -1);
        process.stdout.write('\b \b');
        return;
      }
    }

    process.stdin.on('keypress', onKeypress);
  });
}
