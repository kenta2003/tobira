'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { isGoodInSeason } from '@/lib/utils';
import type { Spot } from '@/types';

const SEASONS = [
  { key: 'spring', label: '🌸 Spring', months: 'Mar – May' },
  { key: 'summer', label: '☀️ Summer', months: 'Jun – Aug' },
  { key: 'autumn', label: '🍂 Autumn', months: 'Sep – Nov' },
  { key: 'winter', label: '❄️ Winter', months: 'Dec – Feb' },
] as const;

function SeasonCard({ seasonKey, label, months, spots }: {
  seasonKey: string;
  label: string;
  months: string;
  spots: Spot[];
}) {
  const [expanded, setExpanded] = useState(false);

  const all = spots.filter((s) => isGoodInSeason(s.best_season, seasonKey as 'spring' | 'summer' | 'autumn' | 'winter'));
  const sorted = [
    ...all.filter((s) => !s.best_season.toLowerCase().includes('year')),
    ...all.filter((s) =>  s.best_season.toLowerCase().includes('year')),
  ];

  const visible = expanded ? sorted : sorted.slice(0, 3);
  const extra   = sorted.length - 3;

  if (sorted.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-stone-100 flex items-center justify-between">
        <div>
          <span className="font-bold text-stone-900">{label}</span>
          <span className="ml-2 text-xs text-stone-400 font-normal">{months}</span>
        </div>
        {sorted.length > 3 ? (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs text-stone-500 hover:text-red-600 transition-colors font-medium"
          >
            {sorted.length} spots
          </button>
        ) : (
          <span className="text-xs text-stone-400">
            {sorted.length} spot{sorted.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Spot rows */}
      <div className="divide-y divide-stone-100">
        {visible.map((s) => (
          <Link
            key={s.id}
            href={`/spots/${s.id}`}
            className="flex items-center gap-4 px-5 py-3 hover:bg-stone-50 transition-colors group"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
              <Image
                src={s.image_url}
                alt={s.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-stone-900 group-hover:text-red-600 transition-colors truncate">
                {s.name}
              </p>
              {s.tags?.[0] && (
                <p className="text-xs text-stone-400 mt-0.5 truncate">{s.tags[0]}</p>
              )}
            </div>
            <ArrowRight size={14} className="text-stone-300 group-hover:text-red-400 shrink-0 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Expand / collapse toggle */}
      {extra > 0 && (
        <div className="border-t border-stone-100">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-medium text-stone-500 hover:text-red-600 hover:bg-stone-50 transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp size={13} />
                Show less
              </>
            ) : (
              <>
                <ChevronDown size={13} />
                +{extra} more spot{extra !== 1 ? 's' : ''} this season
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default function WhenToVisitSection({ spots, prefecture }: { spots: Spot[]; prefecture: string }) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-stone-900 mb-2">
        When to Visit {prefecture}
      </h2>
      <p className="text-stone-500 mb-8">
        Peak spots by season — ordered by best match.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {SEASONS.map(({ key, label, months }) => (
          <SeasonCard
            key={key}
            seasonKey={key}
            label={label}
            months={months}
            spots={spots}
          />
        ))}
      </div>
    </div>
  );
}
