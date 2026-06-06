'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, LogIn, LogOut, User, Settings, ChevronDown, Heart, Map } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  async function handleManageBilling() {
    try {
      const res = await fetch('/api/customer-portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // no-op
    }
  }

  async function fetchProStatus(userId: string) {
    const supabase = createClient();
    const { data } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', userId)
      .single();
    setIsPro(data?.status === 'active');
  }

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
      if (data.user) fetchProStatus(data.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserEmail(session?.user?.email ?? null);
      if (session?.user) {
        fetchProStatus(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setIsPro(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // ドロップダウン外クリックで閉じる
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icon.svg" alt="tobira" width={36} height={36} className="-mt-2" />
          <span className="text-2xl font-bold tracking-tight text-stone-900">
            tobira
          </span>
          <span className="text-xs text-stone-400 font-medium hidden sm:block">
            · beyond tokyo
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <Link href="/discover" className="hover:text-stone-900 transition-colors">
            Find My Match
          </Link>
          <Link href="/guides" className="hover:text-stone-900 transition-colors">
            By Prefecture
          </Link>
          <Link href="/plan" className="hover:text-stone-900 transition-colors">
            Plan a Trip
          </Link>
          <Link href="/blog" className="hover:text-stone-900 transition-colors">
            Blog
          </Link>
          {userEmail ? (
            <>
              {/* Quick-access links */}
              <div className="flex items-center gap-1">
                <Link
                  href="/favorites"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-stone-500 hover:text-red-500 hover:bg-red-50 transition-colors text-xs font-medium"
                >
                  <Heart size={14} />
                  Saved
                </Link>
                <Link
                  href="/trips"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors text-xs font-medium"
                >
                  <Map size={14} />
                  Trips
                </Link>
              </div>

              {/* Try Pro CTA — logged-in non-Pro only */}
              {!isPro && (
                <Link
                  href="/pricing"
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                >
                  ✦ Try Pro
                </Link>
              )}

              {/* User dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center">
                    <User size={14} className="text-stone-500" />
                  </div>
                  {isPro && (
                    <span className="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      Pro
                    </span>
                  )}
                  <ChevronDown size={13} className={`text-stone-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-lg py-1 z-50">
                    {isPro && (
                      <button
                        onClick={() => { setDropdownOpen(false); handleManageBilling(); }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                      >
                        <Settings size={14} className="text-stone-400" />
                        Manage Plan
                      </button>
                    )}
                    <button
                      onClick={() => { setDropdownOpen(false); handleSignOut(); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      <LogOut size={14} className="text-stone-400" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              <LogIn size={15} />
              Log In
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-stone-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-white border-t border-stone-200 px-4 py-4 flex flex-col gap-4 text-sm font-medium text-stone-700">
          <Link href="/discover" onClick={() => setOpen(false)}>
            Find My Match
          </Link>
          <Link href="/guides" onClick={() => setOpen(false)}>
            By Prefecture
          </Link>
          <Link href="/plan" onClick={() => setOpen(false)}>
            Plan a Trip
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)}>
            Blog
          </Link>
          {userEmail ? (
            <>
              {/* Try Pro banner — logged-in non-Pro only */}
              {!isPro && (
                <Link
                  href="/pricing"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-4 py-2.5 rounded-xl"
                >
                  <span>✦ Upgrade to Pro</span>
                  <span className="text-red-400">→</span>
                </Link>
              )}
              {isPro && (
                <span className="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full self-start">
                  Pro
                </span>
              )}
              <Link href="/trips" onClick={() => setOpen(false)} className="flex items-center gap-1.5 text-stone-700">
                <Map size={15} />
                My Trips
              </Link>
              <Link href="/favorites" onClick={() => setOpen(false)} className="flex items-center gap-1.5 text-stone-700">
                <Heart size={15} />
                Saved Spots
              </Link>
              {isPro && (
                <button
                  onClick={() => { setOpen(false); handleManageBilling(); }}
                  className="flex items-center gap-1.5 text-stone-700"
                >
                  <Settings size={15} />
                  Manage Plan
                </button>
              )}
              <form onSubmit={(e) => { e.preventDefault(); handleSignOut(); }}>
                <button type="submit" className="flex items-center gap-1.5 text-stone-700">
                  <LogOut size={15} />
                  Log out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 bg-red-600 text-white px-4 py-2 rounded-full text-center justify-center"
              onClick={() => setOpen(false)}
            >
              <LogIn size={15} />
              Log In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
