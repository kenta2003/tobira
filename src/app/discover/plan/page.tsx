import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllSpots, getSpotById } from '@/lib/spots';
import NearbySpotPicker from '@/components/NearbySpotPicker';

export const dynamic = 'force-dynamic';

type Props = { searchParams: Promise<{ anchor?: string }> };

export default async function DiscoverPlanPage({ searchParams }: Props) {
  const { anchor: anchorId } = await searchParams;

  if (!anchorId) notFound();

  const [anchor, allSpots] = await Promise.all([
    getSpotById(anchorId),
    getAllSpots(),
  ]);

  if (!anchor) notFound();

  // Nearby = same prefecture, excluding the anchor itself, up to 7
  const nearby = allSpots
    .filter(s => s.id !== anchor.id && s.prefecture === anchor.prefecture)
    .slice(0, 7);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/discover"
        className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to Find My Match
      </Link>

      <div className="mb-8">
        <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-2">Build your itinerary</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
          Plan a trip around {anchor.name}
        </h1>
        <p className="text-stone-500">
          Select spots in {anchor.prefecture} to include, then let AI build your day-by-day route.
        </p>
      </div>

      <NearbySpotPicker anchor={anchor} nearby={nearby} />
    </div>
  );
}
