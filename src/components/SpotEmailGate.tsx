'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';

function getPersonalitySummary(answers: Record<string, string>): string {
  const { vibe, nature_type, history_type, atmosphere } = answers;
  if (vibe === 'nature') {
    if (nature_type === 'mountain') return 'mountain escapes and highland scenery';
    if (nature_type === 'coast')    return 'coastal scenery and island life';
    if (nature_type === 'volcanic') return 'dramatic volcanic landscapes';
    if (nature_type === 'forest')   return 'ancient forests and quiet nature walks';
    if (atmosphere === 'wild')      return 'raw, adventure-driven landscapes';
    return 'scenic nature and the great outdoors';
  }
  if (vibe === 'history') {
    if (history_type === 'ancient')     return 'ancient shrines, temples, and spiritual sites';
    if (history_type === 'samurai')     return 'samurai history and castle towns';
    if (history_type === 'traditional') return 'traditional crafts and Japanese arts';
    return "Japan's rich history and cultural heritage";
  }
  if (vibe === 'onsen') return 'onsen, wellness, and restorative travel';
  if (vibe === 'food')  return 'local food culture and everyday Japanese life';
  return 'authentic, off-the-beaten-path Japan';
}

interface Props {
  answers: Record<string, string>;
  remainingCount: number;
  matchedSpotIds: string[];
  onUnlock: (email: string) => void;
}

export default function SpotEmailGate({ answers, remainingCount, matchedSpotIds, onUnlock }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const personality = getPersonalitySummary(answers);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), answers, matchedSpotIds }),
      });
      if (!res.ok) throw new Error('Failed');
      onUnlock(email.trim()); // component unmounts here — no state updates after this
    } catch {
      setLoading(false); // only reset on error (component stays mounted)
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
      {/* Top bar */}
      <div className="bg-stone-900 px-6 py-4 flex items-center gap-2">
        <Lock size={14} className="text-stone-400" />
        <p className="text-sm text-stone-300 font-medium">
          {remainingCount > 0 ? (
            <><span className="font-semibold text-white">{remainingCount} more match{remainingCount !== 1 ? 'es' : ''}</span> waiting for you</>
          ) : (
            <span className="font-semibold text-white">Save your results to your inbox</span>
          )}
        </p>
      </div>

      <div className="px-6 py-6">
        {/* Personality summary */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1.5">
            <Sparkles size={11} className="inline mr-1" />
            Your match profile
          </p>
          <p className="text-stone-700 text-sm leading-relaxed">
            Based on your answers, you seem to enjoy{' '}
            <span className="font-semibold text-stone-900">{personality}</span>.
          </p>
        </div>

        {/* Email CTA */}
        <p className="text-stone-900 font-semibold text-base mb-1">
          {remainingCount > 0 ? 'Save your full results' : 'Save these results'}
        </p>
        <p className="text-stone-500 text-sm mb-4">
          {remainingCount > 0
            ? `We'll email you all ${remainingCount + 2} matches so you can revisit them when planning.`
            : "We'll email you these matches so you can revisit them when planning your trip."}
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 text-sm border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300 placeholder:text-stone-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
          >
            {loading ? 'Sending…' : (
              <>Send my results <ArrowRight size={13} /></>
            )}
          </button>
        </form>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

        <p className="text-stone-400 text-xs mt-3">
          Already have an account?{' '}
          <Link href="/login" className="text-stone-600 underline hover:text-stone-800 transition-colors">
            Log in →
          </Link>
        </p>
      </div>
    </div>
  );
}
