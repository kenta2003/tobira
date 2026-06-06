#!/usr/bin/env node
/**
 * import-photo.mjs
 *
 * Pixtaでダウンロードした写真を1コマンドでインポート・アップロードする。
 * リネーム → 圧縮 → Supabase Storage → image_url 更新 まで一括処理。
 *
 * Usage:
 *   node scripts/import-photo.mjs <spot-id> <file-path>
 *
 * Example:
 *   node scripts/import-photo.mjs tojinbo-cliffs ~/Downloads/pixta_12345678.jpg
 */

import { readFile, copyFile, mkdir } from 'fs/promises';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../.env.local') });

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'spot-images';
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

// ─── CLI args ─────────────────────────────────────────────────────────────────

const [spotId, rawPath] = process.argv.slice(2);

if (!spotId || !rawPath) {
  console.error('Usage: node scripts/import-photo.mjs <spot-id> <file-path>');
  console.error('Example: node scripts/import-photo.mjs tojinbo-cliffs ~/Downloads/pixta_12345.jpg');
  process.exit(1);
}

// Expand ~ to home directory
const filePath = rawPath.startsWith('~')
  ? join(process.env.HOME ?? '', rawPath.slice(1))
  : rawPath;

const VALID_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const ext = extname(filePath).toLowerCase();
if (!VALID_EXTS.has(ext)) {
  console.error(`Unsupported file type: ${ext}. Use jpg, png, or webp.`);
  process.exit(1);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

console.log(`\n📷  Importing photo for spot: ${spotId}`);
console.log(`    Source: ${filePath}\n`);

// 1. Verify spot exists in DB
const { data: spot, error: dbErr } = await supabase
  .from('spots')
  .select('id, name, prefecture')
  .eq('id', spotId)
  .single();

if (dbErr || !spot) {
  console.error(`❌  Spot "${spotId}" not found in database.`);
  console.error('    Run: node scripts/list-unimaged-spots.mjs to see valid spot IDs');
  process.exit(1);
}

console.log(`✓  Spot found: ${spot.name} (${spot.prefecture})`);

// 2. Read source file
let original;
try {
  original = await readFile(filePath);
} catch {
  console.error(`❌  File not found: ${filePath}`);
  process.exit(1);
}

const originalSize = original.length;
console.log(`✓  Read file: ${formatBytes(originalSize)}`);

// 3. Copy to scripts/images/ for record-keeping
const imagesDir = join(__dirname, 'images');
await mkdir(imagesDir, { recursive: true });
const stagingPath = join(imagesDir, `${spotId}.jpg`);
await copyFile(filePath, stagingPath);

// 4. Compress with sharp
const compressed = await sharp(original)
  .resize({ width: MAX_WIDTH, withoutEnlargement: true })
  .jpeg({ quality: JPEG_QUALITY, progressive: true })
  .toBuffer();

const ratio = Math.round((1 - compressed.length / originalSize) * 100);
console.log(`✓  Compressed: ${formatBytes(originalSize)} → ${formatBytes(compressed.length)} (-${ratio}%)`);

// 5. Upload to Supabase Storage
const prefecture = spot.prefecture.toLowerCase();
const storagePath = `${prefecture}/${spotId}.jpg`;

const { error: uploadErr } = await supabase.storage
  .from(BUCKET)
  .upload(storagePath, compressed, {
    contentType: 'image/jpeg',
    upsert: true,
  });

if (uploadErr) {
  console.error(`❌  Upload failed: ${uploadErr.message}`);
  process.exit(1);
}

console.log(`✓  Uploaded to: spot-images/${storagePath}`);

// 6. Update image_url in DB
const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
const { error: updateErr } = await supabase
  .from('spots')
  .update({ image_url: publicUrl, is_published: true })
  .eq('id', spotId);

if (updateErr) {
  console.error(`❌  DB update failed: ${updateErr.message}`);
  process.exit(1);
}

console.log(`\n✅  Done! ${spot.name} の写真をアップロードしました。`);
console.log(`    URL: ${publicUrl}\n`);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}
