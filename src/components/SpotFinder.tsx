'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Sparkles, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import type { Spot } from '@/types';
import { isGoodInSeason, getDurationBucket } from '@/lib/utils';
import SpotCard from '@/components/SpotCard';
import SpotEmailGate from '@/components/SpotEmailGate';
import { createClient } from '@/lib/supabase/client';

// ─── Question definitions ──────────────────────────────────────────────────────

type OptionDef = {
  id: string;
  label: string;
  subtitle?: string;
  emoji: string;
  filter: (s: Spot) => boolean;
};

type QuestionDef = {
  id: string;
  text: string;
  options: OptionDef[];
  // Only include in pool if this condition holds based on prior answers
  condition?: (answers: Record<string, string>) => boolean;
};

const QUESTIONS: QuestionDef[] = [
  {
    id: 'vibe',
    text: 'What draws you to Japan?',
    options: [
      { id: 'nature', label: 'Nature & adventure', emoji: '🌿', filter: s => s.categories.some(c => ['nature', 'activity'].includes(c)) },
      { id: 'history', label: 'History & culture', emoji: '🏯', filter: s => s.categories.some(c => ['history', 'spiritual'].includes(c)) },
      { id: 'food', label: 'Food & local life', emoji: '🍜', filter: s => s.categories.includes('food') },
      { id: 'onsen', label: 'Onsen & wellness', emoji: '♨️', filter: s => s.categories.includes('onsen') },
    ],
  },
  {
    id: 'season',
    text: 'When are you visiting?',
    options: [
      { id: 'spring', label: 'Spring', emoji: '🌸', filter: s => isGoodInSeason(s.best_season, 'spring') },
      { id: 'summer', label: 'Summer', emoji: '☀️', filter: s => isGoodInSeason(s.best_season, 'summer') },
      { id: 'autumn', label: 'Autumn', emoji: '🍂', filter: s => isGoodInSeason(s.best_season, 'autumn') },
      { id: 'winter', label: 'Winter', emoji: '❄️', filter: s => isGoodInSeason(s.best_season, 'winter') },
    ],
  },
  {
    id: 'region',
    text: 'Any part of Japan in mind?',
    // Only ask after at least 2 answers — let vibe & season go first
    condition: (a) => Object.keys(a).length >= 2,
    options: [
      { id: 'north', label: 'Wild North', subtitle: 'Hokkaido · Sapporo · Tohoku', emoji: '❄️', filter: s => ['hokkaido', 'tohoku'].includes(s.region) },
      { id: 'central', label: 'Tokyo & Mt. Fuji', subtitle: 'Kanto · Chubu · Japanese Alps', emoji: '🗻', filter: s => ['kanto', 'chubu', 'hokuriku'].includes(s.region) },
      { id: 'west', label: 'Kyoto & Osaka', subtitle: 'Kansai · Hiroshima · Shikoku', emoji: '⛩️', filter: s => ['kinki', 'chugoku', 'shikoku'].includes(s.region) },
      { id: 'south', label: 'Volcanoes & Tropics', subtitle: 'Kyushu · Okinawa islands', emoji: '🌺', filter: s => ['kyushu', 'okinawa'].includes(s.region) },
      { id: 'anywhere', label: 'No preference', subtitle: 'Show me the best matches', emoji: '🤷', filter: () => true },
    ],
  },
  {
    id: 'duration',
    text: "What's your travel style?",
    options: [
      { id: 'short', label: 'Cram in as much as possible', emoji: '⚡', filter: s => getDurationBucket(s.duration) === 'short' },
      { id: 'medium', label: 'Mix of sightseeing and slow time', emoji: '🕐', filter: s => getDurationBucket(s.duration) === 'medium' },
      { id: 'long', label: 'Slow down and go deep', emoji: '🌅', filter: s => getDurationBucket(s.duration) === 'long' },
      { id: 'any_duration', label: 'Not sure yet', emoji: '🤷', filter: () => true },
    ],
  },
  {
    id: 'nature_type',
    text: 'What kind of nature?',
    condition: a => a.vibe === 'nature',
    options: [
      { id: 'mountain', label: 'Mountains & highlands', emoji: '🏔️', filter: s => s.tags.some(t => /mountain|peak|alp|highland|summit|ski/i.test(t)) || ['chubu', 'tohoku', 'hokkaido'].includes(s.region) },
      { id: 'coast', label: 'Coast & islands', emoji: '🏝️', filter: s => s.tags.some(t => /coast|beach|island|sea|coral|bay/i.test(t)) || ['Okinawa', 'Nagasaki', 'Kagoshima', 'Miyazaki', 'Kochi'].includes(s.prefecture) },
      { id: 'volcanic', label: 'Volcanic & dramatic', emoji: '🌋', filter: s => s.tags.some(t => /volcano|caldera|lava|volcanic|crater/i.test(t)) },
      { id: 'forest', label: 'Ancient forests', emoji: '🌳', filter: s => s.tags.some(t => /forest|cedar|bamboo|grove|woodland/i.test(t)) },
    ],
  },
  {
    id: 'history_type',
    text: 'What era calls to you?',
    condition: a => a.vibe === 'history',
    options: [
      { id: 'ancient', label: 'Ancient shrines & temples', emoji: '🛕', filter: s => s.categories.includes('spiritual') || s.tags.some(t => /ancient|shrine|temple|century|shinto|buddhist/i.test(t)) },
      { id: 'samurai', label: 'Samurai & castles', emoji: '⚔️', filter: s => s.tags.some(t => /samurai|castle|feudal|daimyo|shogun|warrior/i.test(t)) },
      { id: 'traditional', label: 'Traditional crafts & arts', emoji: '🎎', filter: s => s.tags.some(t => /craft|art|traditional|folk|pottery|weaving|textile/i.test(t)) },
      { id: 'heritage', label: 'World Heritage sites', emoji: '🏛️', filter: s => s.tags.some(t => /unesco|heritage|world heritage/i.test(t)) },
    ],
  },
  {
    id: 'crowd',
    text: 'Your ideal crowd level?',
    options: [
      { id: 'hidden', label: 'Hidden gems only', emoji: '🗺️', filter: s => s.is_premium || s.tags.some(t => /hidden|secret|remote|local|off.beaten/i.test(t)) },
      { id: 'any', label: "Whatever's best", emoji: '✨', filter: () => true },
      { id: 'iconic', label: 'Iconic landmarks', emoji: '📸', filter: s => s.tags.some(t => /unesco|iconic|famous|landmark|must.see/i.test(t)) || !s.is_premium },
    ],
  },
  {
    id: 'atmosphere',
    text: 'Your perfect moment feels like…',
    options: [
      { id: 'serene', label: 'Complete tranquility', emoji: '🕯️', filter: s => s.categories.some(c => ['spiritual', 'onsen'].includes(c)) || getDurationBucket(s.duration) === 'long' },
      { id: 'wow', label: '"I had no idea this existed"', emoji: '🤩', filter: s => s.tags.some(t => /unique|rare|unusual|only|surprising|unexpected/i.test(t)) || s.is_premium },
      { id: 'cultural', label: 'Steeped in culture', emoji: '🎌', filter: s => s.categories.some(c => ['history', 'spiritual', 'food'].includes(c)) },
      { id: 'wild', label: 'Raw & wild', emoji: '🌊', filter: s => s.categories.some(c => ['nature', 'activity'].includes(c)) },
    ],
  },
];

// ─── Match profile: generate a short sentence from answers ───────────────────

const VIBE_LABELS: Record<string, string> = {
  nature: 'nature & adventure',
  history: 'history & culture',
  food: 'food & local life',
  onsen: 'onsen & wellness',
};
const ATMOSPHERE_LABELS: Record<string, string> = {
  serene: 'tranquil, unhurried places',
  wow: 'surprising off-the-beaten-path finds',
  cultural: 'culturally immersive experiences',
  wild: 'raw, wild landscapes',
};

function generateMatchProfile(answers: Record<string, string>): string {
  const traits: string[] = [];
  if (answers.vibe && VIBE_LABELS[answers.vibe]) traits.push(VIBE_LABELS[answers.vibe]);
  if (answers.atmosphere && ATMOSPHERE_LABELS[answers.atmosphere]) traits.push(ATMOSPHERE_LABELS[answers.atmosphere]);
  if (answers.crowd === 'hidden' && !traits.some(t => t.includes('off-the-beaten'))) traits.push('hidden gems');
  return traits.slice(0, 2).join(' and ');
}

// ─── Scoring: pick the question that splits the pool most evenly ───────────────

function getNextQuestion(
  pool: Spot[],
  askedIds: string[],
  answers: Record<string, string>,
): QuestionDef | null {
  const available = QUESTIONS.filter(q => {
    if (askedIds.includes(q.id)) return false;
    if (q.condition && !q.condition(answers)) return false;
    return true;
  });
  if (available.length === 0 || pool.length === 0) return null;

  let bestQ = available[0];
  let bestScore = -Infinity;

  for (const q of available) {
    const total = pool.length;
    const counts = q.options.map(opt => pool.filter(opt.filter).length);
    // Skip if every option returns the same count (useless split)
    if (counts.every(c => c === counts[0])) continue;
    // Score = how close to equal distribution (Herfindahl-style)
    const ideal = total / q.options.length;
    const deviation = counts.reduce((sum, c) => sum + Math.abs(c - ideal), 0);
    const score = 1 - deviation / (total * (q.options.length - 1));
    if (score > bestScore) {
      bestScore = score;
      bestQ = q;
    }
  }

  return bestQ;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SpotFinder({ spots }: { spots: Spot[] }) {
  const [pool, setPool] = useState<Spot[]>(spots);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<{ askedIds: string[]; pool: Spot[]; answers: Record<string, string> }[]>([]);
  const [done, setDone] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [unlockedEmail, setUnlockedEmail] = useState('');

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
  }, []);

  const currentQ = useMemo(() => {
    if (done) return null;
    return getNextQuestion(pool, askedIds, answers);
  }, [pool, askedIds, answers, done]);

  function handleAnswer(q: QuestionDef, opt: OptionDef) {
    // Save undo state
    setHistory(h => [...h, { askedIds, pool, answers }]);

    const newPool = (opt.id === 'any' || opt.id === 'anywhere' || opt.id === 'any_duration') ? pool : pool.filter(opt.filter);
    const filtered = newPool.length > 0 ? newPool : pool; // fallback if 0 results
    const newAsked = [...askedIds, q.id];
    const newAnswers = { ...answers, [q.id]: opt.id };

    setPool(filtered);
    setAskedIds(newAsked);
    setAnswers(newAnswers);

    // Stop when pool is small enough or no more useful questions
    if (filtered.length <= 10 || !getNextQuestion(filtered, newAsked, newAnswers)) {
      setDone(true);
    }
  }

  function handleUndo() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setPool(prev.pool);
    setAskedIds(prev.askedIds);
    setAnswers(prev.answers);
    setHistory(h => h.slice(0, -1));
    setDone(false);
  }

  function restart() {
    setPool(spots);
    setAskedIds([]);
    setAnswers({});
    setHistory([]);
    setDone(false);
    setShowAll(false);
    setEmailUnlocked(false);
    setUnlockedEmail('');
  }

  // ── Results ──
  if (done) {
    const showGate = !isLoggedIn && !emailUnlocked;
    const remainingCount = Math.max(0, pool.length - 2);
    const visibleSpots = (showGate && pool.length > 2) ? pool.slice(0, 2) : (showAll ? pool : pool.slice(0, 3));
    const matchProfile = generateMatchProfile(answers);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDone(false)}
              className="flex items-center gap-1.5 text-sm border border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-800 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft size={13} />
              Keep refining
            </button>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-stone-500 text-sm">
              <span className="font-semibold text-stone-800">{pool.length}</span> spot{pool.length !== 1 ? 's' : ''} match your vibe
            </p>
            <button onClick={restart} className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-600 transition-colors">
              <RotateCcw size={13} />
              Start over
            </button>
          </div>
        </div>

        {matchProfile && (
          <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1 flex items-center gap-1">
              <Sparkles size={11} /> Your match profile
            </p>
            <p className="text-sm text-stone-700">
              Based on your answers, you seem to enjoy{' '}
              <strong className="text-stone-900">{matchProfile}</strong>.{' '}
              Here are our top picks for you.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleSpots.map(s => (
            <div key={s.id} className="flex flex-col">
              <div className="flex-1">
                <SpotCard spot={s} />
              </div>
              <Link
                href={`/discover/plan?anchor=${s.id}`}
                className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100 rounded-xl py-2 transition-colors"
              >
                <Sparkles size={12} />
                Plan around this
                <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>

        {showGate && (
          <SpotEmailGate
            answers={answers}
            remainingCount={remainingCount}
            matchedSpotIds={pool.map(s => s.id)}
            onUnlock={(email) => { setEmailUnlocked(true); setUnlockedEmail(email); }}
          />
        )}

        {/* Post-unlock: nudge to create account */}
        {emailUnlocked && !isLoggedIn && (
          <div className="flex items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
            <p className="text-sm text-emerald-800">
              <span className="font-semibold">Results unlocked!</span> Create a free account to save these spots and plan your trip.
            </p>
            <Link
              href={`/signup?email=${encodeURIComponent(unlockedEmail)}`}
              className="shrink-0 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full transition-colors"
            >
              Create account →
            </Link>
          </div>
        )}

        {!showGate && pool.length > 3 && (
          <button
            onClick={() => setShowAll(v => !v)}
            className="w-full flex items-center justify-center gap-1.5 text-sm text-stone-600 border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 rounded-xl py-2.5 transition-colors"
          >
            {showAll ? (
              <><ChevronUp size={14} /> Show less</>
            ) : (
              <><ChevronDown size={14} /> Show all {pool.length} matches</>
            )}
          </button>
        )}
      </div>
    );
  }

  // ── Question ──
  if (!currentQ) return null;

  return (
    <div className="space-y-5">
      {/* Header: Back + pool counter + See matches */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-2">
          {history.length > 0 && (
            <button
              onClick={handleUndo}
              className="flex items-center gap-1.5 text-stone-600 hover:text-stone-800 border border-stone-200 hover:border-stone-400 px-3 py-1.5 rounded-lg text-xs transition-colors"
            >
              <ArrowLeft size={12} />
              Back
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDone(true)}
            className="text-red-600 hover:text-red-700 text-xs font-medium transition-colors"
          >
            See {pool.length} matches →
          </button>
          <span className="text-stone-400 text-xs tabular-nums">{pool.length} spots left</span>
        </div>
      </div>

      {/* Question */}
      <div>
        <p className="text-xs text-stone-400 font-medium uppercase tracking-wide mb-1">
          Question {askedIds.length + 1}
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-5">{currentQ.text}</h3>

        <div className="grid grid-cols-2 gap-3">
          {currentQ.options.map(opt => (
            <button
              key={opt.id}
              onClick={() => handleAnswer(currentQ, opt)}
              className="group flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white hover:border-red-300 hover:bg-red-50 hover:shadow-sm transition-all text-center"
            >
              <span className="text-2xl sm:text-3xl">{opt.emoji}</span>
              <span className="text-sm font-medium text-stone-700 group-hover:text-red-700 transition-colors leading-snug">
                {opt.label}
              </span>
              {opt.subtitle && (
                <span className="text-xs text-stone-400 group-hover:text-red-400 transition-colors leading-tight">
                  {opt.subtitle}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Previous answers */}
      {askedIds.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {askedIds.map(qId => {
            const q = QUESTIONS.find(q => q.id === qId);
            const optId = answers[qId];
            const opt = q?.options.find(o => o.id === optId);
            if (!opt) return null;
            return (
              <span key={qId} className="text-xs bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full flex items-center gap-1">
                {opt.emoji} {opt.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
