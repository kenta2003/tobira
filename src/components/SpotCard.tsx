import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Lock } from 'lucide-react';
import type { Spot } from '@/types';
import { cn, CATEGORY_LABELS, CATEGORY_COLORS, isInSeason } from '@/lib/utils';
import FavoriteButton from '@/components/FavoriteButton';

type Props = {
  spot: Spot;
  isFavorited?: boolean;
  backHref?: string;
};

export default function SpotCard({ spot, isFavorited = false, backHref }: Props) {
  const inSeason = isInSeason(spot.best_season, new Date().getMonth() + 1);
  const href = backHref
    ? `/spots/${spot.id}?back=${encodeURIComponent(backHref)}`
    : `/spots/${spot.id}`;
  return (
    <Link href={href} className="group block h-full">
      <div className="rounded-2xl overflow-hidden bg-white border border-stone-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-stone-100">
          {spot.image_url && (
            <Image
              src={spot.image_url}
              alt={spot.name}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {/* Premium badge — top right */}
          {spot.is_premium && (
            <div className="absolute top-3 right-3 bg-amber-400 text-stone-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Lock size={10} />
              Pro
            </div>
          )}
          {/* Favorite button */}
          <FavoriteButton spotId={spot.id} initialFavorited={isFavorited} />

          {/* Bottom-left: In Season takes priority; Pro Exclusive shown when not in season */}
          {inSeason ? (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
              🌿 In Season
            </div>
          ) : spot.is_premium ? (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-stone-900/75 backdrop-blur-sm text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full">
              ✦ Pro Exclusive
            </div>
          ) : null}

          {/* Category badge(s) */}
          <div className="absolute top-3 left-3 flex gap-1 flex-wrap max-w-[70%]">
            {spot.categories.map((cat) => (
              <span
                key={cat}
                className={cn(
                  'text-xs font-medium px-2.5 py-1 rounded-full',
                  CATEGORY_COLORS[cat]
                )}
              >
                {CATEGORY_LABELS[cat]}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-stone-900 text-base leading-snug group-hover:text-red-600 transition-colors">
              {spot.name}
            </h3>
          </div>

          <div className="flex items-center gap-1 text-xs text-stone-500 mb-2">
            <MapPin size={12} />
            <span>{spot.prefecture}</span>
          </div>

          <p className="text-sm text-stone-600 line-clamp-2 mb-3">
            {spot.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {spot.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Duration */}
          {spot.duration && (
            <div className="flex items-center gap-1 text-xs text-stone-400 mt-auto pt-3 border-t border-stone-100">
              <Clock size={11} />
              <span>{spot.duration}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
