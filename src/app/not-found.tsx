import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-5xl font-bold text-stone-200 mb-4">404</p>
      <h1 className="text-2xl font-semibold text-stone-800 mb-2">Page not found</h1>
      <p className="text-stone-500 mb-8 max-w-sm">
        This page doesn&apos;t exist or may have been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/spots"
          className="border border-stone-200 hover:border-stone-300 text-stone-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          Explore spots
        </Link>
      </div>
    </div>
  );
}
