#!/usr/bin/env node
/**
 * auto-select-photos.mjs
 *
 * Claude Vision (claude-haiku-4-5) を使って candidates から最適な写真を自動選定する。
 * スポットの説明・タグ・カテゴリをコンテキストとして渡し、関連性・構図・品質で評価。
 *
 * コンフィデンスによる振り分け:
 *   high   → scripts/images/{spot-id}.jpg に自動コピー（アップロード準備完了）
 *   medium → scripts/review/needs-check/{spot-id}/ に移動（理由テキスト付き）
 *   low    → Pixtaキューに追加（manifest で pixta_needed に変更）
 *
 * Usage:
 *   node scripts/auto-select-photos.mjs
 *   node scripts/auto-select-photos.mjs --limit 10
 *   node scripts/auto-select-photos.mjs --spot-id tojinbo-cliffs
 *   node scripts/auto-select-photos.mjs --dry-run  # 実際にはコピーせず結果のみ表示
 *
 * Required env vars (.env.local):
 *   ANTHROPIC_API_KEY
 */

import { readFile, writeFile, copyFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../.env.local') });

// ─── Config ───────────────────────────────────────────────────────────────────

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY が .env.local にありません');
  process.exit(1);
}
if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const REVIEW_DIR = join(__dirname, 'review');
const IMAGES_DIR = join(__dirname, 'images');
const NEEDS_CHECK_DIR = join(REVIEW_DIR, 'needs-check');
const MANIFEST_PATH = join(REVIEW_DIR, 'manifest.json');
const MODEL = 'claude-haiku-4-5-20251001';

// ─── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getArg(name) {
  const i = args.indexOf(`--${name}`);
  if (i === -1 || !args[i + 1] || args[i + 1].startsWith('--')) return null;
  return args[i + 1];
}

const limitArg = getArg('limit');
const spotIdArg = getArg('spot-id');
const dryRun = args.includes('--dry-run');
const limit = limitArg ? parseInt(limitArg, 10) : null;

// ─── Load manifest ────────────────────────────────────────────────────────────

let manifest;
try {
  const raw = await readFile(MANIFEST_PATH, 'utf8');
  manifest = JSON.parse(raw);
} catch {
  console.error('manifest.json が見つかりません。先に fetch-candidate-photos.mjs を実行してください。');
  process.exit(1);
}

// 処理対象: pending_review のエントリのみ
let entries = Object.entries(manifest)
  .filter(([, v]) => v.status === 'pending_review' && (v.candidates ?? []).length > 0);

if (spotIdArg) {
  entries = entries.filter(([id]) => id === spotIdArg);
}
if (limit) {
  entries = entries.slice(0, limit);
}

if (entries.length === 0) {
  console.log('選定待ちの候補がありません。fetch-candidate-photos.mjs を先に実行してください。');
  process.exit(0);
}

// ─── Fetch spot details from DB ───────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const spotIds = entries.map(([id]) => id);
const { data: spotsData } = await supabase
  .from('spots')
  .select('id, name, description, categories, tags, highlights, prefecture')
  .in('id', spotIds);

const spotsMap = Object.fromEntries((spotsData ?? []).map((s) => [s.id, s]));

// ─── Anthropic client ─────────────────────────────────────────────────────────

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// ─── Process each spot ────────────────────────────────────────────────────────

console.log(`\n🤖  ${entries.length}スポットを Claude Vision で自動選定します...\n`);
if (dryRun) console.log('⚠️  --dry-run モード: ファイルは移動しません\n');

const results = { high: 0, medium: 0, low: 0, error: 0 };

for (const [spotId, entry] of entries) {
  const spot = spotsMap[spotId];
  const candidates = entry.candidates;

  process.stdout.write(`  ${spotId} ... `);

  // Load candidate images as base64
  const imageContents = [];
  for (const c of candidates) {
    try {
      const imgPath = join(REVIEW_DIR, spotId, c.filename);
      const buf = await readFile(imgPath);
      imageContents.push({
        number: c.number,
        source: c.source,
        photographer: c.photographer,
        base64: buf.toString('base64'),
      });
    } catch {
      // 画像ファイルが見つからない場合はスキップ
    }
  }

  if (imageContents.length === 0) {
    console.log('画像ファイルなし → スキップ');
    results.error++;
    continue;
  }

  // Build Claude Vision prompt
  const spotContext = spot
    ? `スポット名: ${spot.name}
都道府県: ${spot.prefecture}
カテゴリ: ${(spot.categories ?? []).join(', ')}
タグ: ${(spot.tags ?? []).join(', ')}
説明: ${(spot.description ?? '').slice(0, 200)}
ハイライト: ${(spot.highlights ?? []).slice(0, 3).join(' / ')}`
    : `スポットID: ${spotId}\n都道府県: ${entry.prefecture}`;

  const contentBlocks = [
    {
      type: 'text',
      text: `以下は日本の旅行ガイドサービス用スポットの情報です。
${spotContext}

候補写真が${imageContents.length}枚あります。ヒーロー画像（カード・バナー用）として最も適切な1枚を選んでください。

評価基準:
1. 関連性: このスポットまたは同種の場所を示しているか
2. 構図・品質: 横長で明るく、シャープな写真か
3. 日本らしさ: 日本の雰囲気・文化が感じられるか
4. 汎用性: テキストを重ねても読みやすい構図か

以下のJSON形式のみで回答してください（他のテキスト不可）:
{"selected": <番号>, "confidence": "high|medium|low", "reason": "<日本語で50文字以内の理由>", "rejected": [{"number": <番号>, "reason": "<短い理由>"}]}`
    },
  ];

  // Add images
  for (const img of imageContents) {
    contentBlocks.push({
      type: 'text',
      text: `候補 ${img.number} (${img.source} / ${img.photographer}):`,
    });
    contentBlocks.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: 'image/jpeg',
        data: img.base64,
      },
    });
  }

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 256,
      messages: [{ role: 'user', content: contentBlocks }],
    });

    const text = response.content[0]?.text ?? '';
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON not found in response');

    const result = JSON.parse(jsonMatch[0]);
    const { selected, confidence, reason } = result;

    console.log(`[${confidence.toUpperCase()}] 候補${selected} — ${reason}`);

    // Update manifest
    manifest[spotId] = {
      ...entry,
      aiSelected: selected,
      aiConfidence: confidence,
      aiReason: reason,
      status: confidence === 'low' ? 'pixta_needed' : `ai_${confidence}`,
    };

    if (!dryRun) {
      const srcPath = join(REVIEW_DIR, spotId, `${selected}.jpg`);

      if (confidence === 'high') {
        // Auto-approve: copy to images/
        await mkdir(IMAGES_DIR, { recursive: true });
        await copyFile(srcPath, join(IMAGES_DIR, `${spotId}.jpg`));
        manifest[spotId].status = 'approved_auto';
        results.high++;
      } else if (confidence === 'medium') {
        // Needs human check
        const checkDir = join(NEEDS_CHECK_DIR, spotId);
        await mkdir(checkDir, { recursive: true });
        // Copy all candidates for review
        for (const c of candidates) {
          const src = join(REVIEW_DIR, spotId, c.filename);
          try { await copyFile(src, join(checkDir, c.filename)); } catch { /* ok */ }
        }
        await writeFile(join(checkDir, 'ai-note.txt'), `AI選定: 候補${selected} (${confidence})\n理由: ${reason}\n\n承認コマンド:\nnode scripts/approve-photo.mjs ${spotId} ${selected} --upload\n`);
        results.medium++;
      } else {
        // Low confidence → Pixta queue
        results.low++;
      }
    } else {
      if (confidence === 'high') results.high++;
      else if (confidence === 'medium') results.medium++;
      else results.low++;
    }

    await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  } catch (err) {
    console.log(`エラー: ${err.message}`);
    results.error++;
  }

  // Rate limit
  await new Promise((r) => setTimeout(r, 500));
}

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n${'─'.repeat(60)}`);
console.log(`🤖  AI選定完了`);
console.log(`   ✅ 自動承認 (high):      ${results.high}スポット → scripts/images/ に追加済み`);
console.log(`   ⚠️  要確認 (medium):     ${results.medium}スポット → scripts/review/needs-check/`);
console.log(`   🔴 Pixta必要 (low):     ${results.low}スポット`);
if (results.error > 0) console.log(`   ❌ エラー:              ${results.error}スポット`);

console.log(`\n次のステップ:`);
if (results.high > 0) {
  console.log(`  一括アップロード: npm run upload-images`);
}
if (results.medium > 0) {
  console.log(`  要確認スポット: Finder で scripts/review/needs-check/ を確認`);
  console.log(`  承認後: node scripts/approve-photo.mjs <spot-id> <番号> --upload`);
}
if (results.low > 0) {
  console.log(`  Pixtaキュー: node scripts/list-unimaged-spots.mjs でPixta必要スポットを確認`);
}
console.log();
