export const revalidate = 3600;

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, MapPin, Compass, Clock } from 'lucide-react';
import { getAllSpots } from '@/lib/spots';
import { getAllArticles } from '@/lib/articles';
import { createAdminClient } from '@/lib/supabase/admin';
import SpotCard from '@/components/SpotCard';
import HomeSearchBar from '@/components/HomeSearchBar';
import type { Prefecture } from '@/types';
import JapanRegionMapWrapper from '@/components/JapanRegionMapWrapper';

const FEATURES = [
  {
    icon: Compass,
    title: 'Curated by Locals',
    description:
      "Every spot is hand-picked by someone who has been there — not scraped from TripAdvisor or trained on influencer content.",
  },
  {
    icon: Sparkles,
    title: 'AI Itinerary Builder',
    description:
      "Tell us your dates, interests and pace. Get a day-by-day plan built around your actual travel style.",
  },
  {
    icon: MapPin,
    title: 'Off the Beaten Path',
    description:
      'No Fushimi Inari queues. No Shibuya Crossing selfies. Just Japan as it actually is.',
  },
];

export default async function HomePage() {
  const supabase = createAdminClient();
  const [spots, allArticles] = await Promise.all([getAllSpots(), getAllArticles()]);
  const recentArticles = allArticles.slice(0, 3);

  // coverImage がない記事はスポット画像をフォールバックとして取得
  const articleThumbnails: Record<string, string> = {};
  await Promise.all(
    recentArticles
      .filter((a) => !a.coverImage)
      .map(async (a) => {
        const firstQuery = a.sections.find((s) => s.spot_query)?.spot_query;
        if (!firstQuery) return;
        let builder = supabase.from('spots').select('image_url');
        if (firstQuery.address_contains) builder = builder.ilike('address', `%${firstQuery.address_contains}%`);
        if (firstQuery.prefecture) builder = builder.eq('prefecture', firstQuery.prefecture);
        if (firstQuery.categories?.length) builder = builder.contains('categories', firstQuery.categories);
        builder = builder.order('image_url', { ascending: false, nullsFirst: false }).limit(1);
        const { data } = await builder;
        if (data?.[0]?.image_url) articleThumbnails[a.slug] = data[0].image_url;
      })
  );

  // Pick 1 non-premium spot from each of 3 geographically diverse regions (north / central / south)
  const FEATURED_REGIONS = ['hokkaido', 'kinki', 'kyushu'] as const;
  const featuredSpots = FEATURED_REGIONS
    .map((region) => spots.find((s) => s.region === region && !s.is_premium) ?? spots.find((s) => s.region === region))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const spotCountByPrefecture = Object.fromEntries(
    spots.reduce((acc, s) => {
      acc.set(s.prefecture, (acc.get(s.prefecture) ?? 0) + 1);
      return acc;
    }, new Map<Prefecture, number>()),
  ) as Partial<Record<Prefecture, number>>;

  const prefectureCount = new Set(spots.map((s) => s.prefecture)).size;



  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <Image
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&auto=format&fit=crop"
          alt="Japanese landscape"
          fill
          unoptimized
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-transparent to-stone-900/60" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-stone-300 text-sm font-medium tracking-widest uppercase mb-4">
            扉 · tobira
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
            Beyond Tokyo.
            <br />
            <span className="text-red-400">Real Japan.</span>
          </h1>
          <p className="text-stone-300 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Hand-curated guides to Japan&apos;s most authentic experiences —
            from Hokkaido&apos;s wild frontiers and Tohoku&apos;s snow onsen
            to Kyushu&apos;s volcanoes and Okinawa&apos;s coral reefs.
          </p>

          {/* Search */}
          <HomeSearchBar />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
            >
              <Sparkles size={18} />
              Find My Match
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-colors border border-white/20 text-base"
            >
              <MapPin size={18} />
              Browse by Region
            </Link>
          </div>
          <p className="text-stone-500 text-sm mt-5">
            <Link href="/plan" className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors">
              Plan a Trip →
            </Link>
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
            <span className="text-stone-400 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              {spots.length}+ hand-picked spots
            </span>
            <span className="text-stone-400 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              {prefectureCount} prefectures
            </span>
            <span className="text-stone-400 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              Updated monthly
            </span>
          </div>
        </div>
      </section>

      {/* ─── Featured Spots ───────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-widest mb-3">
                ✦ Editor&apos;s Picks
              </span>
              <h2 className="text-3xl font-bold text-stone-900 mb-2">
                Must-See Spots
              </h2>
              <p className="text-stone-500">
                Chosen for uniqueness, accessibility, and the &quot;I
                can&apos;t believe this is real&quot; factor.
              </p>
            </div>
            <Link
              href="/spots"
              className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors shrink-0 ml-4"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} backHref="/" />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white font-medium px-8 py-3.5 rounded-full transition-colors"
            >
              <Sparkles size={16} />
              Find spots like these
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Find Your Match CTA ──────────────────────────────── */}
      <section className="bg-stone-50 border-y border-stone-100">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 uppercase tracking-widest mb-4">
            <Sparkles size={13} />
            Find Your Match
          </span>
          <h2 className="text-3xl font-bold text-stone-900 mb-3">
            Not sure where to go?
          </h2>
          <p className="text-stone-500 max-w-md mx-auto mb-10">
            Answer a few questions about how you travel — we&apos;ll narrow {spots.length}+ spots down to your perfect matches.
          </p>

          {/* Decorative quiz preview */}
          <div className="grid grid-cols-2 gap-3 mb-8 pointer-events-none select-none opacity-60">
            {[
              { emoji: '🌿', label: 'Nature & adventure' },
              { emoji: '🏯', label: 'History & culture' },
              { emoji: '🍜', label: 'Food & local life' },
              { emoji: '♨️', label: 'Onsen & wellness' },
            ].map((opt) => (
              <div
                key={opt.label}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-stone-200 bg-white text-center"
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="text-sm font-medium text-stone-700">{opt.label}</span>
              </div>
            ))}
          </div>

          <Link
            href="/discover"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
          >
            <Sparkles size={18} />
            Find My Match
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── Explore by Region — Interactive Map ─────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 mb-3">
            Where in Japan?
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            Click any region to explore hand-picked spots —
            from Hokkaido&apos;s frozen north to Okinawa&apos;s coral reefs.
          </p>
        </div>

        <JapanRegionMapWrapper spotCountByPrefecture={spotCountByPrefecture} />
      </section>

      {/* ─── Features ─────────────────────────────────────────── */}
      <section className="bg-stone-50 border-y border-stone-100">
        <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-stone-900 mb-3">
            Not just another travel app
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            Built by someone who lives here, not an algorithm trained on
            influencer content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="border border-stone-100 rounded-2xl p-8 hover:shadow-md hover:border-stone-200 transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50 text-red-600 mb-5">
                <f.icon size={22} />
              </div>
              <h3 className="font-semibold text-stone-900 text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ─── Pricing ──────────────────────────────────────────── */}
      <section id="pricing" className="bg-stone-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Simple Pricing</h2>
          <p className="text-stone-400 mb-12">
            Start free. Go Pro when you&apos;re planning your trip.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="rounded-2xl border border-stone-700 p-8 text-left flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <p className="text-stone-400 text-sm font-medium">Free</p>
                <span className="text-xs bg-stone-800 text-stone-400 px-2.5 py-0.5 rounded-full">No card required</span>
              </div>
              <p className="text-3xl font-bold mb-4">$0</p>
              <ul className="text-stone-400 text-sm space-y-2 mb-8 flex-1">
                <li>✓ All regions — full spot browsing</li>
                <li>✓ More prefectures & spots added regularly</li>
                <li>✓ 1 AI itinerary plan</li>
              </ul>
              <Link
                href="/spots"
                className="block text-center border border-stone-600 text-stone-300 py-2.5 rounded-full text-sm hover:bg-stone-800 transition-colors"
              >
                Start Free
              </Link>
            </div>

            <div className="rounded-2xl bg-red-600 ring-2 ring-red-400 ring-offset-2 ring-offset-stone-900 p-8 text-left relative flex flex-col">
              <div className="absolute top-4 right-4 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                Most Popular
              </div>
              <p className="text-red-200 text-sm font-medium mb-1">Pro</p>
              <p className="text-3xl font-bold mb-4">
                $4.99
                <span className="text-red-200 text-base font-normal">/mo</span>
              </p>
              <ul className="text-red-100 text-sm space-y-2 mb-8 flex-1">
                <li>✓ All premium spots unlocked</li>
                <li>✓ Insider tips & hidden highlights</li>
                <li>✓ Unlimited AI trip plans</li>
                <li>✓ New premium spots added monthly</li>
              </ul>
              <Link
                href="/pricing"
                className="block text-center bg-white text-red-600 py-2.5 rounded-full text-sm font-semibold hover:bg-red-50 transition-colors"
              >
                Get Pro — $4.99/mo
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
            <p className="text-stone-500 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Payments secured by Stripe. Cancel anytime.
            </p>
            <span className="hidden sm:block text-stone-700">·</span>
            <Link href="/tokushoho" className="text-stone-600 underline hover:text-stone-400 transition-colors">
              特定商取引法に基づく表記
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Blog ─────────────────────────────────────────────── */}
      <section className="bg-stone-50 border-t border-stone-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-widest mb-3">
                ✦ From the Blog
              </span>
              <h2 className="text-3xl font-bold text-stone-900 mb-2">
                Tips &amp; Guides
              </h2>
              <p className="text-stone-500">
                In-depth guides for independent travellers going beyond the tourist trail.
              </p>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors shrink-0 ml-4"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all flex flex-col"
              >
                {(article.coverImage ?? articleThumbnails[article.slug]) && (
                  <div className="relative h-44 bg-stone-100 overflow-hidden shrink-0">
                    <Image
                      src={(article.coverImage ?? articleThumbnails[article.slug])!}
                      alt={article.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="px-5 py-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-stone-900 group-hover:text-red-600 transition-colors leading-snug mb-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed flex-1">
                    {article.description}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-stone-400 mt-3">
                    <Clock size={11} />
                    {article.readMinutes} min read
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Integrated CTA */}
          <div className="mt-14 text-center">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-3">Ready to explore?</p>
            <h2 className="text-2xl font-bold text-stone-900 mb-3">
              Your Japan trip starts here.
            </h2>
            <p className="text-stone-500 text-sm mb-7 max-w-sm mx-auto leading-relaxed">
              No queues. No crowds. Just the Japan most visitors never find.
            </p>
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              <Sparkles size={16} />
              Find My Match
            </Link>
            <div className="mt-4">
              <Link href="/guides" className="text-sm text-stone-400 hover:text-stone-600 transition-colors flex items-center justify-center gap-1">
                Browse by Region <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
