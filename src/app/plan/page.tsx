'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Loader2, Clock, ChevronDown, ChevronUp, MapPin, Lock, Check, Copy, Link2, Navigation } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { REGION_META, REGION_IDS } from '@/lib/regions';
import type { Spot } from '@/types';
import PlanPageHero, { type PrefillData } from '@/components/PlanPageHero';

type DayPlan = {
  day: number;
  title: string;
  spots: {
    name: string;
    description: string;
    time: string;
    tip: string;
    travel_from_previous?: string | null;
  }[];
};

type ItineraryResult = {
  title: string;
  overview: string;
  days: DayPlan[];
};

const INTEREST_OPTIONS = [
  { value: 'nature',    label: 'Nature & Hiking' },
  { value: 'onsen',     label: 'Onsen & Wellness' },
  { value: 'history',   label: 'Culture & History' },
  { value: 'food',      label: 'Food & Local Cuisine' },
  { value: 'spiritual', label: 'Spiritual & Shrines' },
  { value: 'activity',  label: 'Adventure' },
];

const PACE_OPTIONS = [
  { value: 'relaxed', label: 'Relaxed', desc: '1-2 spots/day, plenty of rest' },
  { value: 'moderate', label: 'Moderate', desc: '3-4 spots/day' },
  { value: 'packed', label: 'Packed', desc: '5+ spots/day, maximize everything' },
];

const GROUP_OPTIONS = [
  { value: 'solo', label: 'Solo', icon: '🧍' },
  { value: 'couple', label: 'Couple', icon: '👫' },
  { value: 'family', label: 'Family', icon: '👨‍👩‍👧' },
  { value: 'friends', label: 'Friends', icon: '👯' },
];

const LOADING_MESSAGES = [
  'Analyzing your preferences...',
  'Browsing local knowledge...',
  'Building your day-by-day itinerary...',
  'Adding insider tips...',
  'Optimizing your route...',
];


// Module-level store: persists across component unmount/remount during client-side navigation
let _planStore: { result: ItineraryResult; shareToken: string; expandedDay: number | null } | null = null;

export default function PlanPage() {
  const searchParams = useSearchParams();

  const [allSpots, setAllSpots] = useState<Spot[]>([]);

  useEffect(() => {
    fetch('/api/spots').then((r) => r.json()).then(setAllSpots).catch(() => {});
  }, []);

  const pinnedSpots = useMemo(() => {
    // Support ?spots=id1,id2,id3 (new multi-spot) or ?spot=id (legacy single)
    const multi = searchParams.get('spots');
    const single = searchParams.get('spot');
    const ids = multi ? multi.split(',') : single ? [single] : [];
    return ids.map(id => allSpots.find(s => s.id === id)).filter(Boolean) as Spot[];
  }, [searchParams, allSpots]);

  function findSpot(name: string) {
    const lower = name.toLowerCase();
    return allSpots.find(
      (s) =>
        s.name.toLowerCase().includes(lower) ||
        lower.includes(s.name.toLowerCase())
    );
  }

  const formRef = useRef<HTMLDivElement>(null);

  function scrollToForm(prefill?: PrefillData) {
    if (prefill) {
      setDays(prefill.days);
      setGroupType(prefill.groupType);
      setInterests(prefill.interests);
      setRegion(prefill.region);
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState<string[]>([]);
  const [pace, setPace] = useState('moderate');
  const [groupType, setGroupType] = useState('solo');
  const [region, setRegion] = useState('all');
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ItineraryResult | null>(null);
  const [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  // Save state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [savedShareToken, setSavedShareToken] = useState('');
  const [siteOrigin, setSiteOrigin] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
    setSiteOrigin(window.location.origin);
  }, []);

  // When pinned spots load, auto-select region from the first one
  useEffect(() => {
    if (pinnedSpots.length > 0) {
      setRegion(pinnedSpots[0].region);
    }
  }, [pinnedSpots]);

  // Cycle loading messages while generating
  useEffect(() => {
    if (!loading) return;
    setLoadingMsgIndex(0);
    const interval = setInterval(() => {
      setLoadingMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [loading]);

  // Persist itinerary across client-side navigation (e.g. /plan → /spots/[id] → back).
  // Module-level _planStore survives component unmount. `initialized` prevents the save
  // effect from wiping the store before the restore effect has had a chance to read it.
  const [initialized, setInitialized] = useState(false);

  // Save effect — defined first so it runs first on mount (returns early via initialized=false)
  useEffect(() => {
    if (!initialized) return;
    if (result) {
      _planStore = { result, shareToken: savedShareToken, expandedDay };
    } else {
      _planStore = null;
    }
  }, [initialized, result, savedShareToken, expandedDay]);

  // Restore effect — defined second, runs after save effect; sets initialized=true when done
  useEffect(() => {
    if (_planStore) {
      setResult(_planStore.result);
      setSavedShareToken(_planStore.shareToken);
      setExpandedDay(_planStore.expandedDay);
    }
    setInitialized(true);
  }, []);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerate = async () => {
    if (interests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    setError('');
    setErrorCode('');
    setLoading(true);
    setResult(null);
    setSavedShareToken('');

    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days, interests, pace, groupType, region, spotIds: pinnedSpots.map(s => s.id) }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.code) setErrorCode(data.code);
        throw new Error(data.error ?? 'Failed to generate itinerary');
      }

      const data: ItineraryResult = await res.json();
      setResult(data);
      setExpandedDay(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    setSaveLoading(true);
    try {
      const res = await fetch('/api/user/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: result.title, overview: result.overview, days: result.days }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to save');
      setSavedShareToken(data.shareToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save itinerary.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCopy = () => {
    const url = `${siteOrigin}/trip/${savedShareToken}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {/* LP — 結果が出るまで表示 */}
      {!result && <PlanPageHero onStart={scrollToForm} />}

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-medium px-4 py-2 rounded-full mb-4">
          <Sparkles size={15} />
          AI Trip Planner
        </div>
        <h1 className="text-4xl font-bold text-stone-900 mb-3">
          Build Your Japan Itinerary
        </h1>
        <p className="text-stone-500 text-lg">
          Tell us what you love. Get a day-by-day plan built around you.
        </p>
      </div>

      {/* Pinned Spots Banner */}
      {pinnedSpots.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-medium text-red-500 mb-2 flex items-center gap-1">
            <MapPin size={11} />
            Building itinerary around {pinnedSpots.length === 1 ? 'this spot' : `these ${pinnedSpots.length} spots`}
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {pinnedSpots.map(spot => (
              <div key={spot.id} className="flex items-center gap-3 bg-white border border-stone-200 rounded-2xl p-3 min-w-[220px] shrink-0">
                <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0">
                  <Image src={spot.image_url} alt={spot.name} fill unoptimized className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 text-sm truncate">{spot.name}</p>
                  <p className="text-xs text-stone-400 truncate">{spot.prefecture}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      <div ref={formRef} className="bg-white rounded-2xl border border-stone-200 p-8 space-y-8 mb-8">
        {/* Days */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-3">
            How many days?
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={7}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="flex-1 accent-red-600"
            />
            <span className="text-stone-900 font-bold text-xl w-12 text-center">
              {days}
            </span>
          </div>
          <p className="text-stone-400 text-xs mt-1">
            {days === 1 ? '1 day' : `${days} days`}
          </p>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-3">
            What do you love? (select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleInterest(opt.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  interests.includes(opt.value)
                    ? 'bg-red-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pace */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-3">
            Travel pace
          </label>
          <div className="grid grid-cols-3 gap-3">
            {PACE_OPTIONS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPace(p.value)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  pace === p.value
                    ? 'border-red-500 bg-red-50'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <p
                  className={`font-semibold text-sm ${
                    pace === p.value ? 'text-red-600' : 'text-stone-800'
                  }`}
                >
                  {p.label}
                </p>
                <p className="text-stone-400 text-xs mt-0.5">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Group type */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-3">
            Who&apos;s travelling?
          </label>
          <div className="grid grid-cols-4 gap-3">
            {GROUP_OPTIONS.map((g) => (
              <button
                key={g.value}
                onClick={() => setGroupType(g.value)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  groupType === g.value
                    ? 'border-red-500 bg-red-50'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <p className="text-xl mb-1">{g.icon}</p>
                <p className={`font-semibold text-xs ${groupType === g.value ? 'text-red-600' : 'text-stone-800'}`}>
                  {g.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-3">
            Focus area
          </label>
          <div className="flex flex-wrap gap-2">
            {[{ value: 'all', label: 'All of Japan' }, ...REGION_IDS.map((id) => ({ value: id, label: REGION_META[id].label }))].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRegion(opt.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  region === opt.value
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          errorCode === 'upgrade_required' ? (
            <div className="bg-stone-900 text-white rounded-xl p-5 text-center">
              <Lock size={20} className="mx-auto mb-2 text-red-400" />
              <p className="text-sm mb-4">{error}</p>
              <Link
                href="/pricing"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                Upgrade to Pro — $4.99/mo
              </Link>
            </div>
          ) : errorCode === 'auth_required' ? (
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-center">
              <p className="text-stone-600 text-sm mb-4">{error}</p>
              <Link
                href="/login?next=/plan"
                className="inline-block bg-stone-900 hover:bg-stone-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
              {error}
            </p>
          )
        )}

        {/* Free plan notice */}
        {isLoggedIn ? (
          <p className="text-stone-400 text-xs text-center">
            Free accounts include 1 AI plan per month.{' '}
            <Link href="/pricing" className="underline hover:text-stone-600 transition-colors">
              Upgrade to Pro
            </Link>{' '}
            for unlimited.
          </p>
        ) : (
          <p className="text-stone-400 text-xs text-center">
            <Link href="/login?next=/plan" className="underline hover:text-stone-600 transition-colors font-medium text-stone-500">
              Sign in
            </Link>{' '}
            to generate your itinerary. Free accounts get 1 plan per month.
          </p>
        )}

        {/* Submit */}
        {isLoggedIn ? (
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors text-base"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>{LOADING_MESSAGES[loadingMsgIndex]}</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate My Itinerary</span>
              </>
            )}
          </button>
        ) : (
          <Link
            href="/login?next=/plan"
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition-colors text-base"
          >
            <Sparkles size={18} />
            <span>Sign in to Generate</span>
          </Link>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-stone-900 mb-2">{result.title}</h2>
            <p className="text-stone-600 leading-relaxed mb-5">{result.overview}</p>

            {/* Share section */}
            {savedShareToken ? (
              <div className="bg-white rounded-xl border border-red-100 p-4">
                <p className="text-xs font-medium text-stone-500 mb-2">
                  Share this trip with your travel companions
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-600 truncate font-mono">
                    {`${siteOrigin}/trip/${savedShareToken}`}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shrink-0"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy link'}
                  </button>
                </div>
              </div>
            ) : isLoggedIn ? (
              <button
                onClick={handleSave}
                disabled={saveLoading}
                className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                {saveLoading ? <Loader2 size={16} className="animate-spin" /> : <Link2 size={16} />}
                {saveLoading ? 'Saving...' : 'Save & Share Trip'}
              </button>
            ) : (
              <Link
                href="/login?next=/plan"
                className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                <Link2 size={16} />
                Sign in to save & share this trip
              </Link>
            )}
          </div>

          {result.days.map((day, i) => (
            <div
              key={day.day}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
            >
              <button
                onClick={() => setExpandedDay(expandedDay === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
              >
                <span className="block">
                  <span className="block text-stone-400 text-xs font-medium mb-0.5">
                    Day {day.day}
                  </span>
                  <span className="block font-semibold text-stone-900">{day.title}</span>
                </span>
                {expandedDay === i ? (
                  <ChevronUp size={18} className="text-stone-400 shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-stone-400 shrink-0" />
                )}
              </button>

              {expandedDay === i && (
                <div className="px-5 pb-5 space-y-4 border-t border-stone-100">
                  {day.spots.map((s, j) => {
                    const spotData = findSpot(s.name);
                    return (
                      <div key={j} className="pt-4">
                        {/* Travel from previous spot / overnight area */}
                        {s.travel_from_previous && (
                          <div className="flex items-center gap-2 mb-4 ml-11">
                            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-full px-3 py-1 text-xs text-stone-500">
                              <Navigation size={11} className="text-stone-400" />
                              {s.travel_from_previous}
                            </div>
                          </div>
                        )}
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
                                <p className="text-stone-600 text-sm mb-2">
                                  {s.description}
                                </p>
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
              )}
            </div>
          ))}

          <div className="text-center pt-4">
            <button
              onClick={handleGenerate}
              className="text-sm text-stone-500 hover:text-stone-800 underline underline-offset-2 transition-colors"
            >
              Regenerate with different options
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
