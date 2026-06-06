'use client';

import { useEffect, useRef } from 'react';

type Props = {
  isPro: boolean;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({ isPro, className = '' }: Props) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (isPro || !adRef.current || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // no-op
    }
  }, [isPro]);

  if (isPro) return null;
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT) return null;

  return (
    <div className={`my-8 ${className}`}>
      <p className="text-xs text-stone-300 text-center mb-1">Advertisement</p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? ''}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
