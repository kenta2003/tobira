/**
 * upload-spot-images.mjs
 *
 * Usage:
 *   1. Place images named {spot-id}.jpg (or .jpeg / .png) in scripts/images/
 *   2. Run: npm run upload-images
 *
 * What it does:
 *   - Compresses each image with sharp (quality 82, max 1200px wide)
 *   - Looks up the spot's prefecture from Supabase
 *   - Uploads to Storage: spot-images/{prefecture}/{spot-id}.jpg
 *   - Updates spots.image_url in the database
 */

import { readdir, readFile } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

// ─── Load env ────────────────────────────────────────────────────────────────

const __dirname = fileURLToPath(new URL('.', import.meta.url));
config({ path: join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ─── Config ───────────────────────────────────────────────────────────────────

const INPUT_DIR   = join(__dirname, 'images');
const BUCKET      = 'spot-images';
const MAX_WIDTH   = 1200;
const JPEG_QUALITY = 82;
const VALID_EXTS  = new Set(['.jpg', '.jpeg', '.png', '.webp']);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function pad(str, len) {
  return String(str).padEnd(len, ' ');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // 1. List files in scripts/images/
  let files;
  try {
    files = await readdir(INPUT_DIR);
  } catch {
    console.error(`❌  Folder not found: ${INPUT_DIR}`);
    process.exit(1);
  }

  const imageFiles = files.filter((f) => VALID_EXTS.has(extname(f).toLowerCase()));

  if (imageFiles.length === 0) {
    console.log('⚠️  No images found in scripts/images/');
    console.log('   Place files named {spot-id}.jpg in that folder and try again.');
    process.exit(0);
  }

  console.log(`\n📁  Found ${imageFiles.length} image${imageFiles.length !== 1 ? 's' : ''} in scripts/images/\n`);

  let success = 0;
  let skipped = 0;
  let errors  = 0;

  for (const filename of imageFiles) {
    const spotId = basename(filename, extname(filename));
    const filePath = join(INPUT_DIR, filename);

    // 2. Look up spot in DB
    const { data: spot, error: dbErr } = await supabase
      .from('spots')
      .select('id, prefecture')
      .eq('id', spotId)
      .single();

    if (dbErr || !spot) {
      console.log(`⚠️  ${pad(spotId, 30)} spot not found in DB — skipped`);
      skipped++;
      continue;
    }

    const prefecture = spot.prefecture.toLowerCase();

    try {
      // 3. Read & compress
      const original = await readFile(filePath);
      const originalSize = original.length;

      const compressed = await sharp(original)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toBuffer();

      const storagePath = `${prefecture}/${spotId}.jpg`;

      // 4. Upload to Supabase Storage
      const { error: uploadErr } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, compressed, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (uploadErr) throw uploadErr;

      // 5. Build public URL
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;

      // 6. Update image_url in spots table
      const { error: updateErr } = await supabase
        .from('spots')
        .update({ image_url: publicUrl })
        .eq('id', spotId);

      if (updateErr) throw updateErr;

      const ratio = Math.round((1 - compressed.length / originalSize) * 100);
      console.log(
        `✅  ${pad(spotId, 30)} ${pad(spot.prefecture, 12)} ` +
        `${pad(formatBytes(originalSize), 8)} → ${pad(formatBytes(compressed.length), 8)} ` +
        `(-${ratio}%)`
      );
      success++;

    } catch (err) {
      console.log(`❌  ${pad(spotId, 30)} ERROR: ${err.message ?? err}`);
      errors++;
    }
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`✅  Done: ${success} uploaded, ${skipped} skipped, ${errors} error${errors !== 1 ? 's' : ''}\n`);

  if (errors > 0) process.exit(1);
}

main();
