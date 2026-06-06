'use client';

import dynamic from 'next/dynamic';
import type { Spot } from '@/types';

const ArticleSpotMap = dynamic(() => import('./ArticleSpotMap'), { ssr: false });

type Props = {
  spots: Pick<Spot, 'id' | 'name' | 'prefecture' | 'lat' | 'lng'>[];
  slug: string;
};

export default function ArticleSpotMapWrapper({ spots, slug }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border border-stone-200 isolate" style={{ height: 580 }}>
      <ArticleSpotMap key={slug} spots={spots} slug={slug} />
    </div>
  );
}
