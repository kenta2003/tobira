'use client';

import dynamic from 'next/dynamic';

const JapanContextMap = dynamic(() => import('./JapanContextMap'), { ssr: false });

type Props = {
  prefecture: string;
};

export default function JapanContextMapWrapper({ prefecture }: Props) {
  return (
    <div className="w-full sm:w-[340px] sm:shrink-0" style={{ height: 320 }}>
      <JapanContextMap prefecture={prefecture} />
    </div>
  );
}
