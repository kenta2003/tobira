'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Sparkles, Clock, Lock } from 'lucide-react';
import type { Spot } from '@/types';
import { CATEGORY_LABELS } from '@/lib/utils';

const CATEGORY_COLORS: Record<string, string> = {
  nature: 'bg-emerald-100 text-emerald-700',
  history: 'bg-amber-100 text-amber-700',
  onsen: 'bg-blue-100 text-blue-700',
  food: 'bg-orange-100 text-orange-700',
  activity: 'bg-purple-100 text-purple-700',
  spiritual: 'bg-rose-100 text-rose-700',
};

interface Props {
  onStart: () => void;
  totalSpots: number;
  sampleSpots: Spot[];
}

export default function DiscoverPageHero({ onStart, totalSpots, sampleSpots }: Props) {
  return (
    <div className="space-y-16 mb-12">

      {/* ── Section 1: Hero ──────────────────────────────────── */}
      <div className="text-center pt-8">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-4">✦ Find Your Match</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-5 leading-tight">
          {totalSpots}+ spots.<br />
          <span className="text-red-600">Which ones are yours?</span>
        </h1>
        <p className="text-stone-500 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Answer a few questions about how you travel —
          we&apos;ll narrow the whole database down to your perfect matches.
        </p>

        {/* 3 steps */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 mb-10 max-w-xl mx-auto">
          {[
            { n: '1', label: 'Answer a few questions' },
            { n: '2', label: 'See your matched spots' },
            { n: '3', label: 'Plan your itinerary' },
          ].map((step, i) => (
            <div key={step.n} className="flex sm:flex-1 items-center gap-2 sm:gap-0">
              <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:flex-1 sm:gap-1">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {step.n}
                </div>
                <p className="text-sm text-stone-600 font-medium sm:text-center">{step.label}</p>
              </div>
              {i < 2 && (
                <ArrowRight size={14} className="text-stone-300 shrink-0 mx-2 hidden sm:block" />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
        >
          <Sparkles size={18} />
          Start matching
          <ArrowRight size={16} />
        </button>

        <p className="text-stone-400 text-xs mt-4">Free · No account required</p>
      </div>

      {/* ── Section 2: Sample results ────────────────────────── */}
      {sampleSpots.length > 0 && (
        <div>
          <div className="text-center mb-6">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-2">Example output</p>
            <h2 className="text-2xl font-bold text-stone-900">This is what your results look like</h2>
          </div>

          {/* Mock result header */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-stone-500 text-sm">
              <span className="font-semibold text-stone-800">7</span> spots match your vibe
            </p>
            <span className="text-xs bg-stone-100 text-stone-400 px-2.5 py-1 rounded-full">Sample</span>
          </div>

          {/* Mock match profile */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1 flex items-center gap-1">
              <Sparkles size={11} /> Your match profile
            </p>
            <p className="text-sm text-stone-700">
              Based on your answers, you seem to enjoy{' '}
              <strong className="text-stone-900">nature & adventure and raw, wild landscapes</strong>.{' '}
              Here are our top picks for you.
            </p>
          </div>

          {/* Cards — mirrors actual SpotFinder results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pointer-events-none select-none">
            {sampleSpots.slice(0, 2).map((spot) => (
              <div key={spot.id} className="flex flex-col">
                {/* Card */}
                <div className="flex-1 rounded-2xl overflow-hidden bg-white border border-stone-200 flex flex-col">
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-stone-100">
                  {spot.image_url && (
                    <Image
                      src={spot.image_url}
                      alt={spot.name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  )}
                  {/* Category badges */}
                  <div className="absolute top-3 left-3 flex gap-1 flex-wrap max-w-[70%]">
                    {spot.categories.slice(0, 2).map(cat => (
                      <span key={cat} className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[cat] ?? 'bg-stone-100 text-stone-600'}`}>
                        {CATEGORY_LABELS[cat] ?? cat}
                      </span>
                    ))}
                  </div>
                  {/* Pro badge */}
                  {spot.is_premium && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-stone-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Lock size={10} /> Pro
                    </div>
                  )}
                  {/* In Season */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    🌿 In Season
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="font-semibold text-stone-900 text-base leading-snug mb-1">{spot.name}</p>
                  <p className="flex items-center gap-1 text-xs text-stone-500 mb-2">
                    <MapPin size={12} />{spot.prefecture}
                  </p>
                  <p className="text-sm text-stone-600 line-clamp-2 mb-3">{spot.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {spot.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  {spot.duration && (
                    <div className="flex items-center gap-1 text-xs text-stone-400 mt-auto pt-3 border-t border-stone-100">
                      <Clock size={11} />{spot.duration}
                    </div>
                  )}
                </div>
                </div>{/* /Card */}

              {/* Plan CTA — カードの外、実際の結果と同じ位置 */}
              <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-red-600 border border-red-200 bg-red-50 rounded-xl py-2">
                <Sparkles size={12} />
                Plan around this
                <ArrowRight size={12} />
              </div>
              </div>
            ))}
          </div>

          {/* Mock email gate footer */}
          <div className="mt-4 bg-stone-900 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Lock size={14} className="text-stone-400 shrink-0" />
              <p className="text-sm text-white font-medium">
                <span className="font-bold">5 more matches</span> waiting for you
              </p>
            </div>
            <span className="shrink-0 text-xs bg-red-600 text-white font-semibold px-4 py-2 rounded-full">
              See all results
            </span>
          </div>

          <p className="text-center text-xs text-stone-400 mt-3">
            Your actual results are tailored to your answers.
          </p>
        </div>
      )}

      {/* ── Section 3: Pro strip ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center shrink-0">
            <Lock size={15} className="text-amber-300" />
          </div>
          <ul className="text-xs text-stone-600 space-y-0.5">
            <li>✓ 40+ hidden gem spots unlocked</li>
            <li>✓ Unlimited AI trip plans</li>
            <li>✓ Insider tips &amp; highlights on every spot</li>
          </ul>
        </div>
        <Link
          href="/pricing"
          className="shrink-0 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-full transition-colors flex items-center gap-1.5"
        >
          See Pro — $4.99/mo
          <ArrowRight size={12} />
        </Link>
      </div>

    </div>
  );
}
