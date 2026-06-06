'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Navigation, Sparkles, Check, X } from 'lucide-react';

export interface PrefillData {
  days: number;
  interests: string[];
  groupType: string;
  region: string;
}

// ── Section 1: Hero ───────────────────────────────────────────────────────────

function HeroSection({ onStart }: { onStart: (prefill?: PrefillData) => void }) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4 leading-tight">
        Your Japan trip,<br />
        <span className="text-red-600">planned in minutes.</span>
      </h1>
      <p className="text-stone-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
        Tell us your interests, pace, and how many days — we&apos;ll build a
        day-by-day route with local tips and hidden spots.
      </p>

      {/* Input → Output flow */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-sm">
        {/* Inputs */}
        <div className="flex flex-col gap-2 text-left">
          {['Interests & travel style', 'Trip duration & pace', 'Region of Japan'].map((item) => (
            <div key={item} className="flex items-center gap-2 bg-stone-100 rounded-xl px-4 py-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
              <span className="text-stone-600 font-medium">{item}</span>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white shrink-0">
          <ArrowRight size={18} />
        </div>

        {/* Outputs */}
        <div className="flex flex-col gap-2 text-left">
          {[
            { icon: '🗓️', label: 'Day-by-day itinerary' },
            { icon: '💡', label: 'Local insider tips' },
            { icon: '🗺️', label: 'Hidden spots & routes' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              <span className="text-base leading-none">{item.icon}</span>
              <span className="text-stone-700 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart()}
        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
      >
        <Sparkles size={18} />
        Start planning
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

// ── Section 2: Sample Output ──────────────────────────────────────────────────

const SAMPLE_DAY = {
  title: "Aomori: Castles, Culture & Local Flavours",
  spots: [
    {
      name: "Hirosaki Castle Park",
      time: "09:00–11:30",
      description: "One of Japan's best-preserved feudal castles, surrounded by 2,600 cherry trees. The grounds are stunning even outside blossom season.",
      tip: "Enter via the north gate to avoid the main tour groups — it's quieter and the moat view is better.",
      travel: null,
    },
    {
      name: "Nebuta Museum Wa-Rasse",
      time: "13:00–15:00",
      description: "Massive illuminated floats from the famous Nebuta Festival, displayed year-round with surprisingly good context on the history and craft.",
      tip: "Visit on a weekday morning — crowds thin out significantly after tour buses leave around noon.",
      travel: "30 min by local bus from Hirosaki",
    },
  ],
};

function SampleOutputSection() {
  return (
    <div className="mb-16">
      <div className="text-center mb-6">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-2">Example output</p>
        <h2 className="text-2xl font-bold text-stone-900">Here&apos;s what you&apos;ll get</h2>
      </div>

      <div className="relative bg-white rounded-2xl border border-stone-200 overflow-hidden">
        {/* Sample badge */}
        <div className="absolute top-3 right-3 z-10 bg-stone-900/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
          Sample
        </div>

        {/* Day header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <div>
            <span className="block text-stone-400 text-xs font-medium mb-0.5">Day 1</span>
            <span className="block font-semibold text-stone-900">{SAMPLE_DAY.title}</span>
          </div>
        </div>

        {/* Spots */}
        <div className="px-5 pb-5 space-y-4">
          {SAMPLE_DAY.spots.map((s, j) => (
            <div key={j} className="pt-4">
              {s.travel && (
                <div className="flex items-center gap-2 mb-4 ml-11">
                  <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-full px-3 py-1 text-xs text-stone-500">
                    <Navigation size={11} className="text-stone-400" />
                    {s.travel}
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {j + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-semibold text-stone-900">{s.name}</span>
                    <span className="flex items-center gap-1 text-xs text-stone-400">
                      <Clock size={11} />
                      {s.time}
                    </span>
                  </div>
                  <p className="text-stone-600 text-sm mb-2">{s.description}</p>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
                    <span className="font-medium">Local tip:</span> {s.tip}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-400">Your actual plan will be tailored to your interests, pace, and dates.</p>
        </div>
      </div>
    </div>
  );
}

// ── Section 3: Use Cases ──────────────────────────────────────────────────────

const USE_CASES: { emoji: string; title: string; tags: string[]; prefill: PrefillData }[] = [
  {
    emoji: '♨️',
    title: 'Solo Onsen Retreat',
    tags: ['5 days', 'Solo', 'Onsen & Wellness', 'Tohoku'],
    prefill: { days: 5, groupType: 'solo', interests: ['onsen'], region: 'tohoku' },
  },
  {
    emoji: '🏯',
    title: 'Culture & Food Weekend',
    tags: ['3 days', 'Couple', 'Culture & Food', 'Kansai'],
    prefill: { days: 3, groupType: 'couple', interests: ['history', 'food'], region: 'kinki' },
  },
  {
    emoji: '🌋',
    title: 'Family Adventure',
    tags: ['7 days', 'Family', 'Nature & Adventure', 'Kyushu'],
    prefill: { days: 7, groupType: 'family', interests: ['nature', 'activity'], region: 'kyushu' },
  },
];

function UseCasesSection({ onStart }: { onStart: (prefill?: PrefillData) => void }) {
  return (
    <div className="mb-16">
      <div className="text-center mb-6">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-2">Inspiration</p>
        <h2 className="text-2xl font-bold text-stone-900">What kind of trip are you planning?</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {USE_CASES.map((uc) => (
          <button
            key={uc.title}
            onClick={() => onStart(uc.prefill)}
            className="group text-left bg-white border border-stone-200 rounded-2xl p-5 hover:border-red-300 hover:shadow-sm transition-all"
          >
            <span className="text-3xl mb-3 block">{uc.emoji}</span>
            <p className="font-semibold text-stone-900 mb-3 group-hover:text-red-600 transition-colors">
              {uc.title}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {uc.tags.map((tag) => (
                <span key={tag} className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs font-medium text-red-600 group-hover:text-red-700 flex items-center gap-1 transition-colors">
              Plan this <ArrowRight size={12} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Section 4: Free vs Pro ────────────────────────────────────────────────────

const COMPARISON_ROWS = [
  { label: 'AI itinerary plans', free: '1 / month', pro: 'Unlimited' },
  { label: 'Standard spots', free: true, pro: true },
  { label: 'Premium hidden spots', free: false, pro: true },
  { label: 'Full insider tips', free: false, pro: true },
  { label: 'Save & share trips', free: true, pro: true },
];

function FreePro() {
  return (
    <div className="mb-16">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-stone-900 mb-1">How far does free take you?</h2>
        <p className="text-stone-500 text-sm">Start free — upgrade when you&apos;re ready to go deep.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 border-b border-stone-100">
          <div className="p-4" />
          <div className="p-4 text-center border-l border-stone-100 bg-stone-50">
            <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Free</p>
            <p className="font-bold text-stone-900 text-lg mt-0.5">$0</p>
          </div>
          <div className="p-4 text-center bg-stone-900 border-l border-stone-800">
            <p className="text-xs font-medium text-red-400 uppercase tracking-wide">Pro</p>
            <p className="font-bold text-white text-lg mt-0.5">$4.99<span className="text-stone-400 text-sm font-normal">/mo</span></p>
          </div>
        </div>

        {/* Rows */}
        {COMPARISON_ROWS.map((row, i) => (
          <div key={row.label} className={`grid grid-cols-3 ${i < COMPARISON_ROWS.length - 1 ? 'border-b border-stone-100' : ''}`}>
            <div className="px-4 py-3 text-sm text-stone-700 font-medium">{row.label}</div>
            <div className="px-4 py-3 text-center border-l border-stone-100 bg-stone-50">
              {typeof row.free === 'boolean' ? (
                row.free
                  ? <Check size={15} className="text-emerald-500 mx-auto" />
                  : <X size={15} className="text-red-400 mx-auto" />
              ) : (
                <span className="text-xs text-stone-600 font-medium">{row.free}</span>
              )}
            </div>
            <div className="px-4 py-3 text-center bg-stone-900 border-l border-stone-800">
              {typeof row.pro === 'boolean' ? (
                row.pro
                  ? <Check size={15} className="text-emerald-400 mx-auto" />
                  : <X size={15} className="text-stone-500 mx-auto" />
              ) : (
                <span className="text-xs text-white font-medium">{row.pro}</span>
              )}
            </div>
          </div>
        ))}

        {/* CTA row */}
        <div className="grid grid-cols-3 border-t border-stone-100">
          <div className="p-4" />
          <div className="p-4 border-l border-stone-100" />
          <div className="p-4 bg-stone-900 border-l border-stone-800 flex flex-col items-center gap-1">
            <Link
              href="/pricing"
              className="text-xs font-semibold bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors whitespace-nowrap"
            >
              Get Pro — $4.99/mo
            </Link>
            <span className="text-xs text-stone-500">Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PlanPageHero({ onStart }: { onStart: (prefill?: PrefillData) => void }) {
  return (
    <div className="mb-8">
      <HeroSection onStart={onStart} />
      <SampleOutputSection />
      <UseCasesSection onStart={onStart} />
      <FreePro />
    </div>
  );
}
