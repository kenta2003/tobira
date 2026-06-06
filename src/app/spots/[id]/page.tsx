import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Calendar,
  Ticket,
  Train,
  ArrowLeft,
  Lock,
  Sparkles,
  ExternalLink,
  DoorOpen,
  Lightbulb,
} from 'lucide-react';
import { getAllSpots, getSpotById } from '@/lib/spots';
import { REGION_META } from '@/lib/regions';
import SpotCard from '@/components/SpotCard';
import FavoriteButton from '@/components/FavoriteButton';
import SpotMapWrapper from '@/components/maps/SpotMapWrapper';
import AdBanner from '@/components/AdBanner';
import { CATEGORY_LABELS, CATEGORY_COLORS, cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function generateStaticParams() {
  const allSpots = await getAllSpots();
  return allSpots.map((s) => ({ id: s.id }));
}

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ back?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const spot = await getSpotById(id);
  if (!spot) return {};
  return {
    title: `${spot.name} — ${spot.prefecture}, Japan`,
    description: spot.description,
    openGraph: {
      title: `${spot.name} — ${spot.prefecture}, Japan`,
      description: spot.description,
      images: [{ url: spot.image_url, width: 1200, height: 630, alt: spot.name }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: spot.name,
      description: spot.description,
      images: [spot.image_url],
    },
  };
}

export default async function SpotDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { back } = await searchParams;

  // Validate back parameter to prevent open redirect
  const isValidBackUrl = (url: string): boolean => {
    if (!url) return false;
    // Only allow relative URLs starting with single /
    if (!url.startsWith('/') || url.startsWith('//')) return false;
    // Basic check for invalid characters
    return /^\/[^?#]*$/.test(url);
  };

  const backHref = back && isValidBackUrl(decodeURIComponent(back)) ? decodeURIComponent(back) : null;

  // Fetch spot and auth in parallel
  const supabase = await createClient();
  const [spot, { data: { user } }] = await Promise.all([
    getSpotById(id),
    supabase.auth.getUser(),
  ]);

  if (!spot) notFound();

  const adminClient = createAdminClient();

  // Subscription check + related spots + favorites in parallel
  const [subResult, allSpots, favResult] = await Promise.all([
    user
      ? supabase.from('subscriptions').select('status').eq('user_id', user.id).single()
      : Promise.resolve({ data: null }),
    getAllSpots(),
    user
      ? adminClient.from('favorites').select('spot_id').eq('user_id', user.id)
      : Promise.resolve({ data: [] }),
  ]);

  const isPro = subResult.data?.status === 'active';
  const favIds = new Set((favResult.data ?? []).map((r) => r.spot_id));
  const isFavorited = favIds.has(spot.id);
  const samePrefecture = allSpots.filter((s) => s.id !== spot.id && s.prefecture === spot.prefecture);
  const related = samePrefecture.length >= 3
    ? samePrefecture.slice(0, 3)
    : [
        ...samePrefecture,
        ...allSpots
          .filter((s) => s.id !== spot.id && s.region === spot.region && s.prefecture !== spot.prefecture)
          .slice(0, 3 - samePrefecture.length),
      ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: spot.name,
    description: spot.description,
    image: spot.image_url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: spot.address,
      addressRegion: spot.prefecture,
      addressCountry: 'JP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: spot.lat,
      longitude: spot.lng,
    },
    url: `https://tobira-travel.com/spots/${spot.id}`,
    ...(spot.website_url && { sameAs: spot.website_url }),
    ...(spot.admission && {
      isAccessibleForFree: spot.admission.toLowerCase() === 'free',
    }),
    touristType: spot.categories,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://tobira-travel.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://tobira-travel.com/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: spot.prefecture,
        item: `https://tobira-travel.com/guides/${spot.prefecture.toLowerCase()}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: spot.name,
        item: `https://tobira-travel.com/spots/${spot.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back */}
      <Link
        href={backHref ?? `/guides/${spot.prefecture.toLowerCase()}`}
        className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        {backHref
          ? backHref.startsWith('/blog/') ? 'Back to article' : 'Back to spot picker'
          : `Back to ${spot.prefecture} Guide`}
      </Link>

      {/* Hero Image */}
      <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden mb-8">
        <Image
          src={spot.image_url}
          alt={spot.name}
          fill
          unoptimized
          className="object-cover"
          priority
        />
        {spot.is_premium && !isPro && (
          <div className="absolute top-4 right-4 bg-stone-900/80 text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Lock size={13} />
            Pro Spot
          </div>
        )}
        {spot.photo_credit && (
          <div className="absolute bottom-2 right-3 text-white/60 text-[11px]">
            {spot.photo_credit}
          </div>
        )}
        <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap max-w-[60%]">
          {spot.categories.map((cat) => (
            <span
              key={cat}
              className={cn(
                'text-sm font-medium px-3 py-1.5 rounded-full',
                CATEGORY_COLORS[cat]
              )}
            >
              {CATEGORY_LABELS[cat]}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-stone-500 text-sm mb-2">
          <MapPin size={14} />
          <span>{spot.prefecture}, {REGION_META[spot.region]?.label ?? spot.region}</span>
        </div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
            {spot.name}
          </h1>
          <FavoriteButton spotId={spot.id} initialFavorited={isFavorited} className="shrink-0 mt-1" />
        </div>
        <p className="text-stone-600 text-lg leading-relaxed">
          {spot.description}
        </p>
      </div>

      {/* Info Grid */}
      <div className="relative mb-10">
        {spot.is_premium && !isPro ? (
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="bg-stone-100 rounded-xl p-4 border border-stone-200 h-[72px]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-3 h-3 rounded bg-stone-300" />
                    <div className="w-12 h-2.5 rounded bg-stone-300" />
                  </div>
                  <div className="w-20 h-3 rounded bg-stone-300" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                href={`/pricing`}
                className="bg-white/90 border border-stone-200 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm hover:bg-white transition-colors"
              >
                <Lock size={13} className="text-stone-500" />
                <span className="text-xs font-medium text-stone-600">Upgrade to Pro to view details</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {spot.duration && (
              <div className="bg-white rounded-xl p-4 border border-stone-200">
                <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                  <Clock size={13} />
                  Duration
                </div>
                <p className="text-stone-800 text-sm font-medium">{spot.duration}</p>
              </div>
            )}
            {spot.admission && (
              <div className="bg-white rounded-xl p-4 border border-stone-200">
                <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                  <Ticket size={13} />
                  Admission
                </div>
                <p className="text-stone-800 text-sm font-medium">{spot.admission}</p>
              </div>
            )}
            {spot.opening_hours && (
              <div className="bg-white rounded-xl p-4 border border-stone-200">
                <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                  <DoorOpen size={13} />
                  Hours
                </div>
                <p className="text-stone-800 text-sm font-medium">{spot.opening_hours}</p>
              </div>
            )}
            <div className="bg-white rounded-xl p-4 border border-stone-200">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                <Calendar size={13} />
                Best Season
              </div>
              <p className="text-stone-800 text-sm font-medium">{spot.best_season}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-stone-200">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                <Train size={13} />
                Access
              </div>
              <p className="text-stone-800 text-sm font-medium">{spot.access}</p>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-stone-900 mb-3 flex items-center gap-2">
          <MapPin size={16} className="text-red-500" />
          Location
        </h2>
        {spot.is_premium && !isPro ? (
          <div className="h-64 sm:h-80 rounded-xl border border-stone-200 bg-stone-100 flex flex-col items-center justify-center gap-3">
            <Lock size={22} className="text-stone-400" />
            <p className="text-stone-500 text-sm font-medium">Location available to Pro members</p>
            <Link
              href="/pricing"
              className="bg-stone-900 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-stone-700 transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>
        ) : (
          <div className="relative isolate h-64 sm:h-80 rounded-xl overflow-hidden border border-stone-200">
            <SpotMapWrapper spot={spot} />
          </div>
        )}
      </div>

      {/* Official Website */}
      {spot.website_url && (
        <div className="mb-8">
          <a
            href={spot.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-red-600 border border-stone-200 hover:border-red-200 bg-white px-4 py-2 rounded-full transition-colors"
          >
            <ExternalLink size={14} />
            Official Website
          </a>
        </div>
      )}

      {/* Premium gate */}
      {spot.is_premium && !isPro ? (
        <div className="bg-stone-900 rounded-2xl p-8 mb-10 text-center">
          <Lock className="mx-auto text-stone-400 mb-3" size={28} />
          <h2 className="text-white text-xl font-semibold mb-2">
            Pro Spot
          </h2>
          <p className="text-stone-400 mb-6 max-w-sm mx-auto">
            Upgrade to Pro to access local tips, secret timing, and insider highlights for this spot.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Upgrade to Pro — $4.99/mo
          </Link>
        </div>
      ) : (
        /* Highlights */
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-stone-900 mb-4">
            Why Visit
          </h2>
          <ul className="space-y-3">
            {spot.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-stone-700">{h}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Local Tips */}
      {spot.tips && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-stone-900 mb-3 flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-500" />
            Local Tips
          </h2>
          <p className="text-stone-700 leading-relaxed">{spot.tips}</p>
        </div>
      )}

      {/* Tags */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-2">
          {spot.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-stone-100 text-stone-600 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* AI Plan CTA */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-stone-900 mb-1 flex items-center gap-2">
            <Sparkles size={16} className="text-red-500" />
            Add to your AI itinerary
          </h3>
          <p className="text-stone-500 text-sm">
            Let AI build a multi-day trip around this spot.
          </p>
        </div>
        <Link
          href={`/plan?spot=${spot.id}`}
          className="shrink-0 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          Plan a Trip
        </Link>
      </div>

      <AdBanner isPro={isPro} />

      {/* Related Spots */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-stone-900 mb-6">
            {samePrefecture.length >= 3
              ? `More in ${spot.prefecture}`
              : `More in ${REGION_META[spot.region]?.label ?? spot.region}`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((s) => (
              <SpotCard key={s.id} spot={s} isFavorited={favIds.has(s.id)} backHref={`/spots/${spot.id}`} />
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
