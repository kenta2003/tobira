'use client';

import dynamic from 'next/dynamic';
import type { Prefecture } from '@/types';

const JapanRegionMap = dynamic(() => import('./JapanRegionMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 lg:h-[480px] bg-stone-100 rounded-2xl animate-pulse flex items-center justify-center text-stone-400 text-sm">
      Loading map…
    </div>
  ),
});

type Props = {
  spotCountByPrefecture: Partial<Record<Prefecture, number>>;
};

export default function JapanRegionMapWrapper({ spotCountByPrefecture }: Props) {
  return <JapanRegionMap spotCountByPrefecture={spotCountByPrefecture} />;
}
