'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

// All 47 prefecture slugs (== name.toLowerCase())
const PREFECTURE_SLUGS = new Set([
  'hokkaido',
  'aomori', 'iwate', 'miyagi', 'akita', 'yamagata', 'fukushima',
  'tokyo', 'kanagawa', 'saitama', 'chiba', 'ibaraki', 'tochigi', 'gunma', 'yamanashi',
  'niigata', 'toyama', 'fukui',
  'aichi', 'shizuoka', 'nagano', 'ishikawa', 'gifu',
  'osaka', 'kyoto', 'nara', 'hyogo', 'shiga', 'wakayama', 'mie',
  'hiroshima', 'yamaguchi', 'okayama', 'tottori', 'shimane',
  'ehime', 'kochi', 'tokushima', 'kagawa',
  'fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima', 'okinawa',
]);

export default function HomeSearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const slug = q.toLowerCase();
    if (PREFECTURE_SLUGS.has(slug)) {
      router.push(`/guides/${slug}`);
    } else {
      router.push(`/spots?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto mb-8">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
        size={18}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search spots or prefecture, e.g. Kyoto, onsen, castle…"
        className="w-full pl-11 pr-28 py-4 rounded-full bg-white/95 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-red-400/50 shadow-lg text-sm"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-full text-sm transition-colors"
      >
        Search
      </button>
    </form>
  );
}
