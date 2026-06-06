/**
 * check-urls.mjs
 *
 * Usage: npm run check-urls
 *
 * Fetches all spots with a website_url and checks each one with a HEAD request.
 * Reports broken URLs (non-2xx, timeout, DNS failure, etc.)
 */

import { config } from 'dotenv';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TIMEOUT_MS = 8000;

async function checkUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    clearTimeout(timer);
    return { ok: res.ok, status: res.status };
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') return { ok: false, status: 'TIMEOUT' };
    return { ok: false, status: err.cause?.code ?? err.message ?? 'ERROR' };
  }
}

function pad(str, len) {
  return String(str ?? '').padEnd(len, ' ');
}

async function main() {
  const { data: spots, error } = await supabase
    .from('spots')
    .select('id, name, prefecture, website_url')
    .not('website_url', 'is', null)
    .order('prefecture');

  if (error) {
    console.error('❌  DB error:', error.message);
    process.exit(1);
  }

  const withUrl = spots.filter((s) => s.website_url?.trim());
  console.log(`\n🔍  Checking ${withUrl.length} URLs...\n`);

  const broken = [];

  for (const spot of withUrl) {
    const { ok, status } = await checkUrl(spot.website_url);
    if (ok) {
      console.log(`✅  ${pad(spot.id, 35)} ${status}`);
    } else {
      console.log(`❌  ${pad(spot.id, 35)} ${status}  — ${spot.website_url}`);
      broken.push({ ...spot, status });
    }
  }

  console.log(`\n${'─'.repeat(70)}`);

  if (broken.length === 0) {
    console.log('✅  All URLs are accessible.\n');
  } else {
    console.log(`\n⚠️  ${broken.length} broken URL${broken.length !== 1 ? 's' : ''}:\n`);
    for (const s of broken) {
      console.log(`  ${pad(s.prefecture, 12)} ${pad(s.id, 35)} [${s.status}]`);
      console.log(`  ${s.website_url}\n`);
    }
  }
}

main();
