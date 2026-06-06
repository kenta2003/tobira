'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type Props = {
  isLoggedIn: boolean;
  isPro: boolean;
};

export default function PricingCTA({ isLoggedIn, isPro }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async () => {
    if (!isLoggedIn) {
      router.push('/login?next=/pricing');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  };

  const handleManage = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/customer-portal', { method: 'POST' });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  };

  if (isPro) {
    return (
      <div className="space-y-3">
        <div className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white font-semibold py-3.5 rounded-xl text-base cursor-default">
          ✓ Active — Tobira Pro
        </div>
        <button
          onClick={handleManage}
          disabled={loading}
          className="w-full text-sm text-stone-500 hover:text-stone-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          Manage or cancel subscription
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors text-base"
    >
      {loading && <Loader2 size={18} className="animate-spin" />}
      {isLoggedIn ? 'Subscribe — $4.99 / month' : 'Sign in to subscribe'}
    </button>
  );
}
