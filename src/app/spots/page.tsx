import { Suspense } from 'react';
import { getAllSpots } from '@/lib/spots';
import SpotsClient from '@/components/SpotsClient';

export default async function SpotsPage() {
  const spots = await getAllSpots();
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-10 text-stone-500">Loading...</div>}>
      <SpotsClient spots={spots} />
    </Suspense>
  );
}
