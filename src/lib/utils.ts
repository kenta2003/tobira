import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Prefecture } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY_LABELS: Record<string, string> = {
  nature: 'Nature',
  history: 'History',
  onsen: 'Onsen',
  food: 'Food',
  activity: 'Activity',
  spiritual: 'Spiritual',
};

export const CATEGORY_COLORS: Record<string, string> = {
  nature: 'bg-emerald-100 text-emerald-700',
  history: 'bg-amber-100 text-amber-700',
  onsen: 'bg-blue-100 text-blue-700',
  food: 'bg-orange-100 text-orange-700',
  activity: 'bg-purple-100 text-purple-700',
  spiritual: 'bg-rose-100 text-rose-700',
};

export const PREFECTURE_LABELS: Record<string, string> = {
  Fukuoka: 'Fukuoka',
  Saga: 'Saga',
  Nagasaki: 'Nagasaki',
  Kumamoto: 'Kumamoto',
  Oita: 'Oita',
  Miyazaki: 'Miyazaki',
  Kagoshima: 'Kagoshima',
  Okinawa: 'Okinawa',
  Hiroshima: 'Hiroshima',
  Yamaguchi: 'Yamaguchi',
  Okayama: 'Okayama',
  Tottori: 'Tottori',
  Shimane: 'Shimane',
  Ehime: 'Ehime',
  Kochi: 'Kochi',
  Tokushima: 'Tokushima',
  Kagawa: 'Kagawa',
  Hokkaido: 'Hokkaido',
  Aomori: 'Aomori',
  Iwate: 'Iwate',
  Miyagi: 'Miyagi',
  Akita: 'Akita',
  Yamagata: 'Yamagata',
  Fukushima: 'Fukushima',
  Osaka: 'Osaka',
  Kyoto: 'Kyoto',
  Nara: 'Nara',
  Hyogo: 'Hyogo',
  Shiga: 'Shiga',
  Wakayama: 'Wakayama',
  Mie: 'Mie',
  Aichi: 'Aichi',
  Shizuoka: 'Shizuoka',
  Nagano: 'Nagano',
  Ishikawa: 'Ishikawa',
  Gifu: 'Gifu',
  Tokyo: 'Tokyo',
  Kanagawa: 'Kanagawa',
  Saitama: 'Saitama',
  Chiba: 'Chiba',
  Ibaraki: 'Ibaraki',
  Tochigi: 'Tochigi',
  Gunma: 'Gunma',
  Yamanashi: 'Yamanashi',
  Niigata: 'Niigata',
  Toyama: 'Toyama',
  Fukui: 'Fukui',
};

/** slug (lowercase) → Prefecture name。guides と sitemap で共用 */
export const PREFECTURE_MAP: Record<string, Prefecture> = Object.fromEntries(
  Object.keys(PREFECTURE_LABELS).map((name) => [name.toLowerCase(), name as Prefecture])
);

// ─── Season utilities ─────────────────────────────────────────────────────────

const MONTH_MAP: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  jan: 1, feb: 2, mar: 3, apr: 4, jun: 6, jul: 7, aug: 8,
  sep: 9, oct: 10, nov: 11, dec: 12,
};

function monthInRange(month: number, start: number, end: number): boolean {
  if (start <= end) return month >= start && month <= end;
  // Wrap-around range e.g. Nov(11)–Mar(3)
  return month >= start || month <= end;
}

function extractRanges(text: string): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  // Split on "or" and commas, then look for "month–month" or standalone months
  const parts = text.split(/,|\bor\b/);
  for (const part of parts) {
    const p = part.trim().toLowerCase();
    // Range: "march–may", "oct-nov", "november–march"
    const rangeM = p.match(/([a-z]+)[–\-]([a-z]+)/);
    if (rangeM) {
      const s = MONTH_MAP[rangeM[1]];
      const e = MONTH_MAP[rangeM[2]];
      if (s && e) { ranges.push([s, e]); continue; }
    }
    // Single month: "february (plum blossoms)" → "february"
    const singleM = p.match(/^([a-z]+)/);
    if (singleM) {
      const m = MONTH_MAP[singleM[1]];
      if (m) ranges.push([m, m]);
    }
  }
  return ranges;
}

/** Returns true if the given month (1–12) falls within the spot's best season. */
export function isInSeason(bestSeason: string, month: number): boolean {
  const s = bestSeason.toLowerCase();
  if (s.includes('year-round') || s.includes('year round')) return true;
  return extractRanges(s).some(([start, end]) => monthInRange(month, start, end));
}

const SEASON_MONTHS: Record<string, number[]> = {
  spring: [3, 4, 5],
  summer: [6, 7, 8],
  autumn: [9, 10, 11],
  winter: [12, 1, 2],
};

/** Returns true if best_season overlaps with the given season at all. */
export function isGoodInSeason(bestSeason: string, season: 'spring' | 'summer' | 'autumn' | 'winter'): boolean {
  return SEASON_MONTHS[season].some((m) => isInSeason(bestSeason, m));
}

// ─── Duration utilities ───────────────────────────────────────────────────────

export type DurationBucket = 'short' | 'medium' | 'long';

/**
 * Buckets a free-form duration string.
 * short  = under 2 h   (e.g. "30–45 min", "1 hour", "1–2 hours")
 * medium = 2–4 h       (e.g. "2–3 hours", "Half day")
 * long   = 4 h+        (e.g. "Full day", "Full day or overnight")
 */
export function getDurationBucket(duration?: string): DurationBucket | null {
  if (!duration) return null;
  const d = duration.toLowerCase();
  if (d.includes('full day')) return 'long';
  if (d.includes('half day')) return 'medium';
  // Pure minutes → always short
  if (/\d+.*min/.test(d) && !d.includes('hour')) return 'short';
  // Extract first numeric value (may be hours)
  const match = d.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  return num < 2 ? 'short' : num < 4 ? 'medium' : 'long';
}
