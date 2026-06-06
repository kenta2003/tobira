#!/usr/bin/env node
/**
 * review-photos.mjs
 *
 * 候補写真をインタラクティブに確認・承認する CLI ツール。
 * manifest.json の pending_review エントリを順番に表示し、
 * キー1つで承認・スキップ・Finder表示ができる。
 *
 * Usage:
 *   node scripts/review-photos.mjs
 *   node scripts/review-photos.mjs --upload   # 承認と同時にアップロード
 */

import { readFile, writeFile, copyFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { execSync } from 'child_process';
import * as readline from 'readline';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const REVIEW_DIR = join(__dirname, 'review');
const IMAGES_DIR = join(__dirname, 'images');
const MANIFEST_PATH = join(REVIEW_DIR, 'manifest.json');
const BUCKET = 'spot-images';
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;

const uploadMode = process.argv.includes('--upload');

// ─── Load manifest ────────────────────────────────────────────────────────────

let manifest;
try {
  const raw = await readFile(MANIFEST_PATH, 'utf8');
  manifest = JSON.parse(raw);
} catch {
  console.error('manifest.json が見つかりません。先に npm run fetch-candidates を実行してください。');
  process.exit(1);
}

const pending = Object.entries(manifest).filter(
  ([, v]) => v.status === 'pending_review' && (v.candidates ?? []).length > 0
);

if (pending.length === 0) {
  console.log('\nレビュー待ちの候補がありません。\n');
  process.exit(0);
}

// ─── Supabase (upload mode) ───────────────────────────────────────────────────

let supabase;
if (uploadMode) {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('--upload モードには NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY が必要です');
    process.exit(1);
  }
  supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
}

// ─── Terminal setup ───────────────────────────────────────────────────────────

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

function clearLine() {
  process.stdout.write('\r\x1b[K');
}

function print(msg) {
  process.stdout.write(msg);
}

function println(msg = '') {
  console.log(msg);
}

// ─── Upload helper ────────────────────────────────────────────────────────────

async function uploadSpot(spotId, srcPath, credit) {
  const { data: spot } = await supabase
    .from('spots')
    .select('id, prefecture')
    .eq('id', spotId)
    .single();
  if (!spot) throw new Error('Spot not found in DB');

  const original = await readFile(srcPath);
  const compressed = await sharp(original)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, progressive: true })
    .toBuffer();

  const storagePath = `${spot.prefecture.toLowerCase()}/${spotId}.jpg`;
  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, compressed, { contentType: 'image/jpeg', upsert: true });
  if (uploadErr) throw uploadErr;

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
  const { error: updateErr } = await supabase
    .from('spots')
    .update({ image_url: publicUrl, photo_credit: credit ?? null, is_published: true })
    .eq('id', spotId);
  if (updateErr) throw updateErr;

  return publicUrl;
}

// ─── Main review loop ─────────────────────────────────────────────────────────

let approved = 0;
let skipped = 0;
let pixtaQueued = 0;

println(`\n📷  レビュー待ち: ${pending.length}件`);
if (uploadMode) println('🚀  承認と同時にアップロードします');
println();
println('操作: [1-5] 承認  [s] スキップ  [p] Pixtaキュー  [o] Finderで開く  [q] 終了');
println('─'.repeat(55));

for (let i = 0; i < pending.length; i++) {
  const [spotId, entry] = pending[i];
  const candidates = entry.candidates;

  println();
  println(`[${i + 1}/${pending.length}] ${entry.spotName}  (${entry.prefecture})`);

  // 候補一覧を表示
  for (const c of candidates) {
    println(`  [${c.number}] ${c.source.padEnd(9)} ${c.photographer.slice(0, 30)}`);
  }
  println();

  const answer = await waitForKey(spotId, candidates.length);

  if (answer === 'q') {
    println('\n中断しました。');
    break;
  }

  if (answer === 's') {
    println(`  → スキップ`);
    skipped++;
    continue;
  }

  if (answer === 'p') {
    manifest[spotId] = {
      ...entry,
      status: 'pixta_needed',
      pixtaSuggestedQuery: entry.pixtaSuggestedQuery ?? `${entry.spotName} ${entry.prefecture}`,
    };
    await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    println(`  🔴 Pixtaキューに追加 (検索: ${manifest[spotId].pixtaSuggestedQuery})`);
    pixtaQueued++;
    continue;
  }

  // 承認
  const num = parseInt(answer, 10);
  const candidate = candidates.find((c) => c.number === num);
  const srcPath = join(REVIEW_DIR, spotId, candidate.filename);
  await mkdir(IMAGES_DIR, { recursive: true });
  const destPath = join(IMAGES_DIR, `${spotId}.jpg`);
  await copyFile(srcPath, destPath);

  manifest[spotId] = { ...entry, status: 'approved', approvedCandidate: num };

  if (uploadMode) {
    try {
      print(`  → アップロード中...`);
      await uploadSpot(spotId, destPath, candidate.credit ?? null);
      clearLine();
      println(`  ✅ 承認・アップロード完了 (候補${num} / ${candidate.source})`);
      manifest[spotId].status = 'uploaded';
    } catch (err) {
      clearLine();
      println(`  ✅ 承認済み (アップロードエラー: ${err.message})`);
    }
  } else {
    println(`  ✅ 承認 (候補${num} / ${candidate.source})`);
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  approved++;
}

// ─── Summary ──────────────────────────────────────────────────────────────────

if (process.stdin.isTTY) process.stdin.setRawMode(false);

println();
println('─'.repeat(55));
println(`完了: 承認 ${approved}件 / スキップ ${skipped}件 / Pixtaキュー ${pixtaQueued}件`);

if (approved > 0 && !uploadMode) {
  println();
  println('アップロード:  npm run upload-images');
}
if (pixtaQueued > 0) {
  println();
  println(`Pixtaキュー確認:  npm run list-unimaged`);
  println(`インポート:       node scripts/import-photo.mjs <spot-id> ~/Downloads/pixta_xxxxx.jpg`);
}
println();
process.exit(0);

// ─── Key input helper ─────────────────────────────────────────────────────────

function waitForKey(spotId, maxNum) {
  return new Promise((resolve) => {
    print(`  > `);

    function onKeypress(_, key) {
      if (!key) return;

      // Ctrl+C
      if (key.ctrl && key.name === 'c') {
        process.stdin.removeListener('keypress', onKeypress);
        if (process.stdin.isTTY) process.stdin.setRawMode(false);
        println('\n中断しました。');
        process.exit(0);
      }

      const ch = key.name ?? key.sequence;

      if (ch === 'q') {
        clearLine();
        process.stdin.removeListener('keypress', onKeypress);
        resolve('q');
        return;
      }

      if (ch === 's') {
        clearLine();
        process.stdin.removeListener('keypress', onKeypress);
        resolve('s');
        return;
      }

      if (ch === 'p') {
        clearLine();
        process.stdin.removeListener('keypress', onKeypress);
        resolve('p');
        return;
      }

      if (ch === 'o') {
        clearLine();
        try {
          execSync(`open "${join(REVIEW_DIR, spotId)}"`);
        } catch { /* ok */ }
        print(`  > `);
        return;
      }

      const num = parseInt(ch, 10);
      if (!isNaN(num) && num >= 1 && num <= maxNum) {
        clearLine();
        process.stdin.removeListener('keypress', onKeypress);
        resolve(String(num));
        return;
      }
    }

    process.stdin.on('keypress', onKeypress);
  });
}
