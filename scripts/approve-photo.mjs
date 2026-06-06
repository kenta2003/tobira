#!/usr/bin/env node
/**
 * approve-photo.mjs
 *
 * fetch-candidate-photos.mjs が取得した候補の中から1枚を選んで承認する。
 * 選んだ候補を scripts/images/{spot-id}.jpg にコピーしアップロードキューに追加。
 *
 * Usage:
 *   node scripts/approve-photo.mjs <spot-id> <候補番号>
 *   node scripts/approve-photo.mjs tojinbo-cliffs 2
 *
 *   # --upload フラグ付きで即座にアップロードまで実行
 *   node scripts/approve-photo.mjs tojinbo-cliffs 2 --upload
 *
 *   # --list でスポットの候補一覧を表示
 *   node scripts/approve-photo.mjs tojinbo-cliffs --list
 */

import { copyFile, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
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

// ─── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const spotId = args[0];
const listMode = args.includes('--list');
const candidateNum = listMode ? null : parseInt(args[1], 10);
const uploadNow = args.includes('--upload');

if (!spotId) {
  console.error('Usage: node scripts/approve-photo.mjs <spot-id> <候補番号> [--upload]');
  console.error('       node scripts/approve-photo.mjs <spot-id> --list');
  process.exit(1);
}

// ─── Load manifest ────────────────────────────────────────────────────────────

let manifest;
try {
  const raw = await readFile(MANIFEST_PATH, 'utf8');
  manifest = JSON.parse(raw);
} catch {
  console.error(`manifest.json が見つかりません。先に fetch-candidate-photos.mjs を実行してください。`);
  process.exit(1);
}

const entry = manifest[spotId];
if (!entry) {
  console.error(`"${spotId}" が manifest.json に見つかりません。`);
  process.exit(1);
}

// ─── --list mode ──────────────────────────────────────────────────────────────

if (listMode) {
  console.log(`\n📷  ${entry.spotName} (${entry.prefecture}) の候補写真:\n`);
  if (!entry.candidates?.length) {
    console.log('  候補なし。Pixtaで手動取得が必要です。');
    console.log(`  推奨検索クエリ: ${entry.pixtaSuggestedQuery}`);
  } else {
    for (const c of entry.candidates) {
      console.log(`  [${c.number}] ${c.source.padEnd(8)} | ${c.photographer.padEnd(24)} | ${c.pageUrl}`);
    }
    console.log(`\n  承認: node scripts/approve-photo.mjs ${spotId} <番号>`);
  }
  console.log();
  process.exit(0);
}

// ─── Validate candidate number ────────────────────────────────────────────────

if (!candidateNum || isNaN(candidateNum)) {
  console.error('候補番号を指定してください（例: 2）');
  process.exit(1);
}

const candidate = entry.candidates?.find((c) => c.number === candidateNum);
if (!candidate) {
  console.error(`候補 ${candidateNum} が見つかりません。--list で確認してください。`);
  process.exit(1);
}

// ─── Copy to images/ ──────────────────────────────────────────────────────────

const srcPath = join(REVIEW_DIR, spotId, candidate.filename);
await mkdir(IMAGES_DIR, { recursive: true });
const destPath = join(IMAGES_DIR, `${spotId}.jpg`);

await copyFile(srcPath, destPath);
console.log(`\n✅  ${entry.spotName}: 候補 ${candidateNum} を承認 (${candidate.source} / ${candidate.photographer})`);

// Update manifest status
manifest[spotId] = {
  ...entry,
  status: 'approved',
  approvedCandidate: candidateNum,
};
await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

// ─── Optional immediate upload ────────────────────────────────────────────────

if (uploadNow) {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('Missing Supabase env vars for upload.');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const { data: spot, error: dbErr } = await supabase
    .from('spots')
    .select('id, prefecture')
    .eq('id', spotId)
    .single();

  if (dbErr || !spot) {
    console.error(`DB からスポット情報を取得できませんでした: ${dbErr?.message}`);
    process.exit(1);
  }

  const original = await readFile(destPath);
  const originalSize = original.length;

  const compressed = await sharp(original)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, progressive: true })
    .toBuffer();

  const prefecture = spot.prefecture.toLowerCase();
  const storagePath = `${prefecture}/${spotId}.jpg`;

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, compressed, { contentType: 'image/jpeg', upsert: true });

  if (uploadErr) {
    console.error(`アップロードエラー: ${uploadErr.message}`);
    process.exit(1);
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
  const { error: updateErr } = await supabase
    .from('spots')
    .update({ image_url: publicUrl, is_published: true })
    .eq('id', spotId);

  if (updateErr) {
    console.error(`DB更新エラー: ${updateErr.message}`);
    process.exit(1);
  }

  const ratio = Math.round((1 - compressed.length / originalSize) * 100);
  console.log(`🚀  アップロード完了! ${formatBytes(originalSize)} → ${formatBytes(compressed.length)} (-${ratio}%)`);
  console.log(`    URL: ${publicUrl}`);

  manifest[spotId].status = 'uploaded';
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
} else {
  console.log(`\n💡  scripts/images/${spotId}.jpg に保存しました。`);
  console.log(`    まとめてアップロード: npm run upload-images`);
  console.log(`    今すぐアップロード: node scripts/approve-photo.mjs ${spotId} ${candidateNum} --upload\n`);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}
