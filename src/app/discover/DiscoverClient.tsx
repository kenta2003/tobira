'use client';

import { useRef, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import type { Spot } from '@/types';
import DiscoverPageHero from '@/components/DiscoverPageHero';
import SpotFinder from '@/components/SpotFinder';

export default function DiscoverClient({ spots }: { spots: Spot[] }) {
  const finderRef = useRef<HTMLDivElement>(null);

  // 高千穂・屋久島を優先し、画像ありスポットを2件サンプルとして使用
  const sampleSpots = useMemo(() => {
    const withImage = spots.filter(s => s.image_url);
    const preferred = withImage.filter(s =>
      s.name.toLowerCase().includes('takachiho') ||
      s.name.toLowerCase().includes('高千穂') ||
      s.prefecture === 'Miyazaki' ||
      s.name.toLowerCase().includes('yakushima') ||
      s.name.toLowerCase().includes('屋久島') ||
      s.prefecture === 'Kagoshima'
    );
    const picked = preferred.slice(0, 2);
    // 足りない場合は他スポットで補完（カテゴリ重複なし）
    if (picked.length < 2) {
      const seen = new Set(picked.map(s => s.categories[0]));
      for (const s of withImage) {
        if (picked.length >= 2) break;
        if (!picked.find(p => p.id === s.id) && !seen.has(s.categories[0])) {
          seen.add(s.categories[0]);
          picked.push(s);
        }
      }
    }
    return picked;
  }, [spots]);

  function handleStart() {
    finderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <DiscoverPageHero onStart={handleStart} totalSpots={spots.length} sampleSpots={sampleSpots} />
      <div ref={finderRef} className="scroll-mt-20">
        <div className="bg-white border border-stone-200 rounded-2xl shadow-md p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={14} className="text-red-500" />
            <span className="text-xs font-semibold text-red-600 uppercase tracking-widest">Start your quiz</span>
          </div>
          <SpotFinder spots={spots} />
        </div>
      </div>
    </>
  );
}
