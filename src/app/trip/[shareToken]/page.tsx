import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ChevronDown } from 'lucide-react';
import { getAllSpots } from '@/lib/spots';
import PrintButton from '@/components/PrintButton';

type DaySpot = {
  name: string;
  description: string;
  time: string;
  tip: string;
};

type DayPlan = {
  day: number;
  title: string;
  spots: DaySpot[];
};

type SavedTrip = {
  id: string;
  title: string;
  overview: string;
  days: DayPlan[];
  created_at: string;
};

async function getTrip(shareToken: string): Promise<SavedTrip | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/trips/${shareToken}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shareToken: string }>;
}) {
  const { shareToken } = await params;
  const [trip, allSpots] = await Promise.all([
    getTrip(shareToken),
    getAllSpots(),
  ]);
  if (!trip) return { title: 'Trip not found — tobira' };

  // Find first spot image matching day 1 spot 1
  const firstSpotName = trip.days[0]?.spots[0]?.name ?? '';
  const matchedSpot = allSpots.find((s) => {
    const lower = firstSpotName.toLowerCase();
    return (
      s.name.toLowerCase().includes(lower) ||
      lower.includes(s.name.toLowerCase())
    );
  });

  const ogImageUrl = new URL('https://tobira-travel.com/api/og/trip');
  ogImageUrl.searchParams.set('title', trip.title);
  ogImageUrl.searchParams.set('days', String(trip.days.length));
  if (matchedSpot?.image_url) {
    ogImageUrl.searchParams.set('image', matchedSpot.image_url);
  }

  return {
    title: `${trip.title} — tobira`,
    description: trip.overview,
    robots: { index: false, follow: false },
    openGraph: {
      title: trip.title,
      description: trip.overview,
      siteName: 'tobira',
      images: [{ url: ogImageUrl.toString(), width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: trip.title,
      description: trip.overview,
      images: [ogImageUrl.toString()],
    },
  };
}

export default async function SharedTripPage({
  params,
}: {
  params: Promise<{ shareToken: string }>;
}) {
  const { shareToken } = await params;
  const [trip, allSpots] = await Promise.all([
    getTrip(shareToken),
    getAllSpots(),
  ]);

  if (!trip) notFound();

  function findSpot(name: string) {
    const lower = name.toLowerCase();
    return allSpots.find(
      (s) =>
        s.name.toLowerCase().includes(lower) ||
        lower.includes(s.name.toLowerCase())
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4 print:hidden">
          <Link href="/" className="text-sm text-stone-400 hover:text-stone-600 transition-colors">
            ← tobira
          </Link>
          <PrintButton />
        </div>
        {/* Print-only tobira branding */}
        <p className="hidden print:block text-xs text-stone-400 mb-4">tobira-travel.com</p>
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-stone-900 mb-2">{trip.title}</h1>
          <p className="text-stone-600 leading-relaxed">{trip.overview}</p>
        </div>
      </div>

      {/* Days */}
      <div className="space-y-4">
        {trip.days.map((day, i) => (
          <details key={day.day} open={i === 0} className="group bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-stone-50 transition-colors list-none">
              <span className="block">
                <span className="block text-stone-400 text-xs font-medium mb-0.5">Day {day.day}</span>
                <span className="block font-semibold text-stone-900">{day.title}</span>
              </span>
              <ChevronDown size={18} className="text-stone-400 shrink-0 group-open:rotate-180 transition-transform" />
            </summary>

            <div className="px-5 pb-5 space-y-4 border-t border-stone-100">
              {day.spots.map((s, j) => {
                const spotData = findSpot(s.name);
                return (
                  <div key={j} className="pt-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {j + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                              {spotData ? (
                                <Link
                                  href={`/spots/${spotData.id}`}
                                  className="font-semibold text-stone-900 hover:text-red-600 transition-colors"
                                >
                                  {s.name}
                                </Link>
                              ) : (
                                <span className="font-semibold text-stone-900">{s.name}</span>
                              )}
                              <span className="flex items-center gap-1 text-xs text-stone-400">
                                <Clock size={11} />
                                {s.time}
                              </span>
                            </div>
                            <p className="text-stone-600 text-sm mb-2">{s.description}</p>
                            <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
                              <span className="font-medium">Local tip:</span>{' '}
                              {s.tip}
                            </div>
                          </div>
                          {spotData && (
                            <Link href={`/spots/${spotData.id}`} className="shrink-0">
                              <div className="relative w-20 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src={spotData.image_url}
                                  alt={spotData.name}
                                  fill
                                  unoptimized
                                  className="object-cover"
                                />
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </details>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 text-center print:hidden">
        <p className="text-stone-500 text-sm mb-4">Want to build your own Japan itinerary?</p>
        <Link
          href="/plan"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Create My Japan Trip
        </Link>
      </div>
    </div>
  );
}
