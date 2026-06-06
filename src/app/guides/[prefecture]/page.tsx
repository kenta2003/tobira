import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Sparkles, Lock, ArrowLeft } from 'lucide-react';
import { getAllSpots } from '@/lib/spots';
import { CATEGORY_LABELS, PREFECTURE_MAP } from '@/lib/utils';
import { PREFECTURE_INTRO } from '@/lib/prefectures';
import { PREFECTURE_TO_REGION, REGION_META } from '@/lib/regions';
import { createClient } from '@/lib/supabase/server';
import SpotCard from '@/components/SpotCard';
import WhenToVisitSection from '@/components/WhenToVisitSection';
import AdBanner from '@/components/AdBanner';
import type { Prefecture } from '@/types';


export async function generateStaticParams() {
  return Object.keys(PREFECTURE_MAP).map((slug) => ({ prefecture: slug }));
}

type Props = { params: Promise<{ prefecture: string }>; searchParams: Promise<{ back?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { prefecture: slug } = await params;
  const prefecture = PREFECTURE_MAP[slug];
  if (!prefecture) return {};

  const allSpots = await getAllSpots();
  const spots = allSpots.filter((s) => s.prefecture === prefecture);
  const heroImage = spots[0]?.image_url;

  const regionId = PREFECTURE_TO_REGION[prefecture as Prefecture];
  const region = regionId ? REGION_META[regionId].label : prefecture;
  return {
    title: `${prefecture} Travel Guide: Hidden Gems & Local Spots`,
    description: `Discover ${spots.length} curated spots in ${prefecture}, ${region}. Authentic local experiences, hidden gems, and off-the-beaten-path destinations — beyond the tourist trail.`,
    openGraph: {
      title: `${prefecture} Travel Guide | Tobira`,
      description: `${spots.length} hidden gems in ${prefecture}, ${region} — curated by locals.`,
      ...(heroImage && {
        images: [{ url: heroImage, width: 1200, height: 630, alt: prefecture }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      ...(heroImage && { images: [heroImage] }),
    },
  };
}

export default async function PrefectureGuidePage({ params, searchParams }: Props) {
  const { prefecture: slug } = await params;
  const { back } = await searchParams;
  const backHref = back ? decodeURIComponent(back) : null;
  const prefecture = PREFECTURE_MAP[slug];
  if (!prefecture) notFound();

  const allSpots = await getAllSpots();
  const spots = allSpots.filter((s) => s.prefecture === prefecture);
  if (spots.length === 0) notFound();

  // Auth + Pro check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let isPro = false;
  if (user) {
    const { data } = await supabase.from('subscriptions').select('status').eq('user_id', user.id).single();
    isPro = data?.status === 'active';
  }

  const premiumCount = spots.filter((s) => s.is_premium).length;
  const heroSpot = spots[0];

  // Related prefectures in the same region
  const regionId = PREFECTURE_TO_REGION[prefecture];
  const relatedPrefectures = regionId
    ? REGION_META[regionId].prefectures.filter((p) => p !== prefecture)
    : [];
  const categories = [...new Set(spots.flatMap((s) => s.categories))];
  const region = regionId ? REGION_META[regionId].label : prefecture;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${prefecture} Travel Guide — Hidden Gems & Local Spots`,
    description: `${spots.length} curated spots in ${prefecture}, ${region}, Japan. Authentic local experiences beyond the tourist trail.`,
    numberOfItems: spots.length,
    itemListElement: spots.map((spot, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristAttraction',
        name: spot.name,
        description: spot.description,
        image: spot.image_url,
        url: `https://tobira-travel.com/spots/${spot.id}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: spot.address,
          addressRegion: prefecture,
          addressCountry: 'JP',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: spot.lat,
          longitude: spot.lng,
        },
      },
    })),
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
        name: prefecture,
        item: `https://tobira-travel.com/guides/${slug}`,
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
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={heroSpot.image_url}
          alt={prefecture}
          fill
          unoptimized
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-stone-900/10" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-14 w-full">
          <div className="flex items-center gap-2 text-stone-300 text-sm mb-3">
            <MapPin size={14} />
            <span>{region}, Japan</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
            {prefecture} Travel Guide
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-stone-300 text-sm">
              {spots.length} curated spots
            </span>
            <span className="text-stone-600">·</span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs bg-white/15 text-white/90 px-2.5 py-1 rounded-full"
                >
                  {CATEGORY_LABELS[cat]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-14">

        {/* Back to article */}
        {backHref && (
          <div className="mb-8">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
            >
              <ArrowLeft size={15} />
              Back to article
            </Link>
          </div>
        )}

        {/* Prefecture intro */}
        {PREFECTURE_INTRO[prefecture as Prefecture] && (
          <div className="mb-12 max-w-3xl">
            <p className="text-lg text-stone-600 leading-relaxed">
              {PREFECTURE_INTRO[prefecture as Prefecture]}
            </p>
          </div>
        )}

        {/* Premium upsell — non-Pro users only */}
        {!isPro && premiumCount > 0 && (
          <div className="flex items-center justify-between gap-4 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 mb-10">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-amber-600 shrink-0" />
              <p className="text-sm text-stone-700">
                <span className="font-semibold">{premiumCount} hidden gem{premiumCount > 1 ? 's' : ''}</span> in {prefecture} include insider locations, local tips, and full access details.
              </p>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full transition-colors whitespace-nowrap"
            >
              Unlock with Pro
            </Link>
          </div>
        )}

        {/* Spots grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Hidden Gems in {prefecture}
          </h2>
          <p className="text-stone-500 mb-8">
            Hand-picked spots off the tourist trail — all personally curated.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} backHref={`/guides/${slug}`} />
            ))}
          </div>
        </div>

        <AdBanner isPro={isPro} />

        {/* Best seasons */}
        <WhenToVisitSection spots={spots} prefecture={prefecture} />

        {/* Related prefectures in same region */}
        {relatedPrefectures.length > 0 && regionId && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-stone-900 mb-1">
              More from {REGION_META[regionId].label}
            </h2>
            <p className="text-stone-500 text-sm mb-5">Other prefectures in the same region</p>
            <div className="relative -mx-4">
              <div className="absolute right-0 top-0 bottom-3 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="flex gap-4 overflow-x-auto pb-3 px-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                {relatedPrefectures.map((pref) => {
                  const slug = Object.entries(PREFECTURE_MAP).find(([, v]) => v === pref)?.[0];
                  if (!slug) return null;
                  const prefSpots = allSpots.filter((s) => s.prefecture === pref);
                  const heroImage = prefSpots[0]?.image_url ?? '';
                  const cats = [...new Set(prefSpots.flatMap((s) => s.categories))];
                  return (
                    <Link
                      key={pref}
                      href={`/guides/${slug}`}
                      className="group relative rounded-2xl overflow-hidden flex-shrink-0 w-44 h-56 block"
                    >
                      {heroImage && (
                        <Image
                          src={heroImage}
                          alt={pref}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="176px"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="flex items-center gap-1 text-stone-300 text-xs mb-1">
                          <MapPin size={10} />
                          <span>{prefSpots.length} spots</span>
                        </div>
                        <p className="text-white text-base font-bold mb-1.5">{pref}</p>
                        <div className="flex flex-wrap gap-1">
                          {cats.slice(0, 2).map((cat) => (
                            <span
                              key={cat}
                              className="text-xs bg-white/15 text-white/90 px-2 py-0.5 rounded-full"
                            >
                              {CATEGORY_LABELS[cat]}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-stone-900 rounded-2xl p-8 text-center">
          <Sparkles className="mx-auto text-red-400 mb-3" size={28} />
          <h2 className="text-white text-2xl font-bold mb-2">
            Ready to visit {prefecture}?
          </h2>
          <p className="text-stone-400 mb-6 max-w-sm mx-auto">
            Let AI build a personalized day-by-day itinerary based on your interests and travel style.
          </p>
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            <Sparkles size={16} />
            Create a {prefecture} Itinerary
          </Link>
        </div>
      </div>
    </>
  );
}
