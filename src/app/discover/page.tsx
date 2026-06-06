import type { Metadata } from 'next';
import { getAllSpots } from '@/lib/spots';
import DiscoverClient from './DiscoverClient';

export const metadata: Metadata = {
  title: 'Find Your Perfect Japan Spot',
  description: 'Answer a few questions and discover the Japan experiences that match your travel style — from hidden onsen to ancient temples.',
  openGraph: {
    title: 'Find Your Perfect Japan Spot',
    description: 'Answer a few questions and discover the Japan experiences that match your travel style.',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
  },
};

export default async function DiscoverPage() {
  const spots = await getAllSpots();

  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-16">
        <DiscoverClient spots={spots} />
      </div>
    </main>
  );
}
