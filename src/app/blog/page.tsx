import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { getAllArticles, getFallbackCoverImageUrlFromSections } from '@/lib/articles';
import { createAdminClient } from '@/lib/supabase/admin';

export const metadata: Metadata = {
  title: 'Japan Travel Blog | Tobira',
  description: 'Tips, guides, and hidden gems for independent travellers exploring Japan beyond the tourist trail.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const articles = await getAllArticles();

  // coverImage がない記事は最初のセクションのスポット画像をフォールバックとして取得
  const supabase = createAdminClient();
  const thumbnails: Record<string, string> = {};
  await Promise.all(
    articles
      .filter(a => !a.coverImage)
      .map(async (a) => {
        const url = await getFallbackCoverImageUrlFromSections(a.sections, supabase);
        if (url) thumbnails[a.slug] = url;
      })
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-2">Blog</p>
        <h1 className="text-3xl font-bold text-stone-900 mb-3">The Tobira Blog</h1>
        <p className="text-stone-500 text-lg leading-relaxed">
          Tips &amp; guides for independent travellers exploring Japan beyond the tourist trail.
        </p>
      </div>

      {/* Article list */}
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all"
          >
            {/* Cover image */}
            {(article.coverImage ?? thumbnails[article.slug]) && (
              <div className="relative h-44 bg-stone-100 overflow-hidden">
                <Image
                  src={(article.coverImage ?? thumbnails[article.slug])!}
                  alt={article.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            )}
            <div className="px-6 py-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-stone-900 group-hover:text-red-600 transition-colors mb-1 leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
                <span className="flex items-center gap-1 text-xs text-stone-400 mt-2">
                  <Clock size={11} />
                  {article.readMinutes} min read
                </span>
              </div>
              <ArrowRight size={16} className="shrink-0 text-stone-300 group-hover:text-red-400 transition-colors mt-1" />
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 bg-stone-900 rounded-2xl p-8 text-center">
        <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">Find your Japan</p>
        <h2 className="text-xl font-bold text-white mb-3">Not sure where to go?</h2>
        <p className="text-stone-400 text-sm mb-5 leading-relaxed">
          Answer a few questions about your travel style and we&apos;ll match you with the spots that fit.
        </p>
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
        >
          <Sparkles size={15} />
          Find match spots
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
