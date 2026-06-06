'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Check, ExternalLink } from 'lucide-react';
import type { Spot } from '@/types';
import { CATEGORY_LABELS } from '@/lib/utils';

// Module-level store: preserves selection across /spots/[id] navigation and back
type PickerStore = { anchorId: string; selectedIds: string[] };
let _store: PickerStore | null = null;

interface Props {
  anchor: Spot;
  nearby: Spot[];
}

export default function NearbySpotPicker({ anchor, nearby }: Props) {
  const router = useRouter();

  // Restore selection from store if we're returning to the same anchor
  const [selected, setSelected] = useState<Set<string>>(() => {
    if (_store && _store.anchorId === anchor.id) {
      return new Set(_store.selectedIds);
    }
    return new Set([anchor.id]);
  });

  // Persist selection to store whenever it changes
  useEffect(() => {
    _store = { anchorId: anchor.id, selectedIds: Array.from(selected) };
  }, [anchor.id, selected]);

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleBuild() {
    // anchor always first, then selected nearby spots in their original order
    const nearbySelected = nearby.filter(s => selected.has(s.id)).map(s => s.id);
    const ids = [anchor.id, ...nearbySelected];
    router.push(`/plan?spots=${ids.join(',')}`);
  }

  const selectedCount = selected.size;

  // ?back= param so the spot detail page can navigate back here
  const backParam = encodeURIComponent(`/discover/plan?anchor=${anchor.id}`);

  function spotHref(spotId: string) {
    return `/spots/${spotId}?back=${backParam}`;
  }

  return (
    <div className="space-y-6">
      {/* Anchor spot — always included */}
      <div>
        <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-3">Your chosen spot</p>
        <div className="flex items-center gap-4 bg-white border-2 border-red-400 rounded-2xl p-4">
          <Link href={spotHref(anchor.id)} className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 block hover:opacity-90 transition-opacity">
            <Image src={anchor.image_url} alt={anchor.name} fill unoptimized className="object-cover" />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-stone-900 truncate">{anchor.name}</p>
            <p className="text-xs text-stone-500">{anchor.prefecture}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {anchor.categories.slice(0, 2).map(c => (
                <span key={c} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">{CATEGORY_LABELS[c]}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <Check size={13} className="text-white" />
            </div>
            <Link
              href={spotHref(anchor.id)}
              className="text-xs text-stone-400 hover:text-red-600 transition-colors flex items-center gap-0.5"
            >
              View <ExternalLink size={10} />
            </Link>
          </div>
        </div>
      </div>

      {/* Nearby spots */}
      {nearby.length > 0 && (
        <div>
          <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-3">
            Add nearby spots in {anchor.prefecture}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nearby.map(spot => {
              const isSelected = selected.has(spot.id);
              return (
                <div
                  key={spot.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-red-300 bg-red-50'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  {/* Thumbnail → spot detail (with back param) */}
                  <Link href={spotHref(spot.id)} className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 hover:opacity-90 transition-opacity">
                    <Image src={spot.image_url} alt={spot.name} fill unoptimized className="object-cover" />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isSelected ? 'text-red-700' : 'text-stone-800'}`}>
                      {spot.name}
                    </p>
                    <p className="text-xs text-stone-400 truncate">{spot.categories.map(c => CATEGORY_LABELS[c]).join(' · ')}</p>
                    <Link
                      href={spotHref(spot.id)}
                      className="text-xs text-stone-400 hover:text-red-600 transition-colors flex items-center gap-0.5 mt-0.5"
                    >
                      View details <ExternalLink size={10} />
                    </Link>
                  </div>

                  {/* Checkbox */}
                  <button
                    onClick={() => toggle(spot.id)}
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-red-500 bg-red-500' : 'border-stone-300 hover:border-red-300'
                    }`}
                  >
                    {isSelected && <Check size={12} className="text-white" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Build button */}
      <div className="pt-2">
        <button
          onClick={handleBuild}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors"
        >
          <Sparkles size={15} />
          Build itinerary with {selectedCount} spot{selectedCount !== 1 ? 's' : ''}
          <ArrowRight size={15} />
        </button>
        <p className="text-center text-xs text-stone-400 mt-2">
          You can adjust days, pace, and interests on the next page
        </p>
      </div>
    </div>
  );
}
