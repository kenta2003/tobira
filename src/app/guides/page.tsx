import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { getAllSpots } from '@/lib/spots';
import { CATEGORY_LABELS } from '@/lib/utils';
import { REGION_META, REGION_IDS } from '@/lib/regions';
import type { Prefecture } from '@/types';

export const metadata: Metadata = {
  title: 'Japan Travel Guides — Kanto, Hokuriku, Chubu, Kansai, Tohoku, Chugoku, Shikoku & Kyushu',
  description:
    'In-depth travel guides for all 47 prefectures across Japan. Discover hidden gems, local tips, and authentic experiences beyond the tourist trail — curated by locals, not algorithms.',
  openGraph: {
    title: 'Japan Travel Guides | Tobira',
    description: 'Discover the real Japan, prefecture by prefecture.',
  },
};

// Derived from REGION_META — single source of truth
const REGIONS = REGION_IDS.map((id) => ({
  label: REGION_META[id].label,
  prefectures: REGION_META[id].prefectures.map((pref) => ({
    slug: pref.toLowerCase(),
    prefecture: pref as Prefecture,
  })),
}));

export default async function GuidesPage() {
  const allSpots = await getAllSpots();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-stone-500 text-sm font-medium tracking-widest uppercase mb-3">
          Destination Guides
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
          Explore Japan,{' '}
          <span className="text-red-600">Prefecture by Prefecture</span>
        </h1>
        <p className="text-stone-500 text-lg max-w-xl mx-auto">
          All 47 prefectures across Japan — each curated by locals, not algorithms.
        </p>
      </div>

      {/* Region sections */}
      <div className="space-y-12">
        {REGIONS.map((region) => (
          <div key={region.label}>
            <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">
              {region.label}
            </h2>
            <div className="relative -mx-4">
              <div className="absolute right-0 top-0 bottom-3 w-12 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />
            <div className="flex gap-4 overflow-x-auto pb-3 px-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              {region.prefectures.map(({ slug, prefecture }) => {
                const spots = allSpots.filter((s) => s.prefecture === prefecture);
                const heroImage = spots[0]?.image_url ?? '';
                const categories = [...new Set(spots.flatMap((s) => s.categories))];
                return (
                  <Link
                    key={slug}
                    href={`/guides/${slug}`}
                    className="group relative rounded-2xl overflow-hidden flex-shrink-0 w-52 h-64 block"
                  >
                    {heroImage && (
                      <Image
                        src={heroImage}
                        alt={prefecture}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="208px"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-1.5 text-stone-300 text-xs mb-1">
                        <MapPin size={11} />
                        <span>{spots.length} spots</span>
                      </div>
                      <h2 className="text-white text-lg font-bold mb-1.5">{prefecture}</h2>
                      <div className="flex flex-wrap gap-1">
                        {categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="text-xs bg-white/15 text-white/90 px-2 py-0.5 rounded-full"
                          >
                            {CATEGORY_LABELS[cat]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
