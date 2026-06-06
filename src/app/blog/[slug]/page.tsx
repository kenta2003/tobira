import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, Sparkles, ChevronRight, MapPin, Train } from 'lucide-react';
import { getArticle, getAllArticles, getRelatedArticles, getPrefectureArticles, getFallbackCoverImageUrlFromSections } from '@/lib/articles';
import type { SpotQuery } from '@/lib/articles';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Spot } from '@/types';
import QuickFacts from '@/components/blog/QuickFacts';
import CharacterSection from '@/components/blog/CharacterSection';
import ArticleSpotMapWrapper from '@/components/blog/ArticleSpotMapWrapper';
import JapanContextMapWrapper from '@/components/blog/JapanContextMapWrapper';
import HowToGetThere from '@/components/blog/HowToGetThere';

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  // OG画像: coverImage があればそれを使用、なければセクション内の最初のスポット画像を使用
  let imageUrl = article.coverImage;
  if (!imageUrl && article.sections?.length) {
    const adminClient = createAdminClient();
    imageUrl = await getFallbackCoverImageUrlFromSections(article.sections, adminClient);
  }
  // フォールバック
  imageUrl = imageUrl || 'https://tobira-travel.com/og.jpg';

  return {
    title: `${article.title} | Tobira Japan`,
    description: article.description,
    alternates: {
      canonical: `https://tobira-travel.com/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: article.title,
      }],
      type: 'article',
      publishedTime: article.publishedAt,
      url: `https://tobira-travel.com/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const [related, prefectureArticles] = await Promise.all([
    getRelatedArticles(slug, 2),
    getPrefectureArticles(slug),
  ]);

  // spot_ids（手動指定）と spot_query（自動取得）をまとめて解決する
  const supabase = createAdminClient();

  // 都道府県記事のサムネイル（coverImage がない場合はブログ一覧と同じロジックで先頭スポット画像）
  const prefThumbnails: Record<string, string> = {};
  await Promise.all(
    prefectureArticles
      .filter((a) => !a.coverImage)
      .map(async (a) => {
        const url = await getFallbackCoverImageUrlFromSections(a.sections, supabase);
        if (url) prefThumbnails[a.slug] = url;
      })
  );

  // 1) spot_ids: 全セクションの ID を一括取得
  const allSpotIds = article.sections.flatMap(s => s.spot_ids ?? []);
  const spotMap: Record<string, Spot> = {};
  if (allSpotIds.length > 0) {
    const { data } = await supabase
      .from('spots')
      .select('id, name, prefecture, image_url, region, categories, best_season, lat, lng')
      .in('id', allSpotIds);
    for (const s of data ?? []) spotMap[s.id] = s as Spot;
  }

  // 2) spot_query: セクションごとに DB クエリを実行してキャッシュ
  //    キー = JSON.stringify(query) でメモ化して重複クエリを避ける
  const queryCache: Record<string, Spot[]> = {};
  async function resolveQuery(q: SpotQuery): Promise<Spot[]> {
    const key = JSON.stringify(q);
    if (queryCache[key]) return queryCache[key];
    let builder = supabase
      .from('spots')
      .select('id, name, prefecture, image_url, region, categories, best_season, lat, lng');
    if (q.address_contains) builder = builder.ilike('address', `%${q.address_contains}%`);
    if (q.prefecture)       builder = builder.eq('prefecture', q.prefecture);
    if (q.categories?.length) builder = builder.contains('categories', q.categories);
    builder = builder.order('image_url', { ascending: false, nullsFirst: false }).limit(q.limit ?? 3);
    const { data } = await builder;
    queryCache[key] = (data ?? []) as Spot[];
    return queryCache[key];
  }

  // セクションごとの表示 spot リスト（spot_ids 優先、なければ spot_query）
  const sectionSpots: Spot[][] = await Promise.all(
    article.sections.map(async s => {
      if (s.spot_ids?.length) {
        return s.spot_ids.map(id => spotMap[id]).filter(Boolean) as Spot[];
      }
      if (s.spot_query) {
        return resolveQuery(s.spot_query);
      }
      return [];
    })
  );

  // 都道府県記事用：全セクションのスポットをフラットにしてスポットマップ用に集約
  const allSectionSpots = sectionSpots.flat();
  const uniqueSpots = allSectionSpots.filter(
    (s, i, arr) => s.lat && s.lng && arr.findIndex((x) => x.id === s.id) === i
  );
  // 最も多い都道府県 = ハイライト対象
  const prefectureFreq: Record<string, number> = {};
  for (const s of allSectionSpots) prefectureFreq[s.prefecture] = (prefectureFreq[s.prefecture] ?? 0) + 1;
  const articlePrefecture = Object.entries(prefectureFreq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';

  const heroImage = article.coverImage ?? sectionSpots[0]?.[0]?.image_url;

  // JSON-LD Schema
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: heroImage || 'https://tobira-travel.com/og.jpg',
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Tobira',
      url: 'https://tobira-travel.com',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://tobira-travel.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://tobira-travel.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://tobira-travel.com/blog/${slug}`,
      },
    ],
  };

  if (article.articleType === 'prefecture') {
    return (
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {/* HERO — full-bleed */}
        {heroImage && (
          <section className="relative h-[55vh] min-h-[360px] flex items-end overflow-hidden">
            <Image
              src={heroImage}
              alt={article.title}
              fill
              unoptimized
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-transparent" />
            <div className="relative z-10 max-w-3xl mx-auto px-4 pb-12 w-full">
              <nav className="flex items-center gap-1.5 text-xs text-stone-300 mb-4">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={12} />
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight size={12} />
                <span className="text-white line-clamp-1">{article.title}</span>
              </nav>
              <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-3">
                {article.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-stone-300">
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </time>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {article.readMinutes} min read
                </span>
              </div>
            </div>
          </section>
        )}

        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* QUICK FACTS + Japan context map */}
          {(article.quickFacts || articlePrefecture) && (
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10">
              {articlePrefecture && (
                <JapanContextMapWrapper prefecture={articlePrefecture} />
              )}
              <div className="w-full sm:flex-1">
                {article.quickFacts && <QuickFacts facts={article.quickFacts} />}
              </div>
            </div>
          )}

          {/* CHARACTER */}
          {article.character && (
            <div className="mb-12">
              <CharacterSection text={article.character} />
            </div>
          )}

          {/* Intro */}
          {article.intro && (
            <p className="text-stone-600 text-lg leading-relaxed mb-10">
              {article.intro}
            </p>
          )}

          {/* Table of Contents */}
          {article.sections.filter(s => s.heading).length > 2 && (
            <nav className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-10">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Contents</p>
              <ol className="space-y-2">
                {article.sections.filter(s => s.heading).map((s, i) => (
                  <li key={i} className="flex items-baseline gap-2">
                    <span className="text-[10px] font-mono text-stone-300 w-4 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <a href={`#section-${i}`} className="text-sm text-stone-600 hover:text-red-600 transition-colors leading-snug">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Sections */}
          {article.sections.length > 0 && (
            <div className="mb-12 space-y-12">
              {article.sections.map((section, i) => (
                <section key={i} id={`section-${i}`} className="scroll-mt-20">
                  <h2 className="text-xl font-bold text-stone-900 mb-3">{section.heading}</h2>
                  {((section.best_season ?? sectionSpots[i][0]?.best_season) || section.travel_time) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(section.best_season ?? sectionSpots[i][0]?.best_season) && (
                        <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">
                          <Calendar size={10} />
                          {section.best_season ?? sectionSpots[i][0]?.best_season}
                        </span>
                      )}
                      {section.travel_time && (
                        <span className="inline-flex items-center gap-1 text-xs bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-full">
                          <Train size={10} />
                          {section.travel_time}
                        </span>
                      )}
                    </div>
                  )}
                  {(section.image ?? sectionSpots[i][0]?.image_url) && (
                    <div className="relative h-52 sm:h-64 rounded-xl overflow-hidden bg-stone-100 mb-4">
                      <Image
                        src={(section.image ?? sectionSpots[i][0]?.image_url)!}
                        alt={section.heading}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </div>
                  )}
                  {section.body.split('\n').filter(Boolean).map((para, j) => (
                    <p key={j} className="text-stone-600 leading-relaxed mb-3 text-justify hyphens-auto">{para}</p>
                  ))}
                  {sectionSpots[i].length > 0 && (
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {sectionSpots[i].map(spot => (
                        <Link
                          key={spot.id}
                          href={`/spots/${spot.id}?back=${encodeURIComponent(`/blog/${slug}#section-${i}`)}`}
                          className="group relative rounded-xl overflow-hidden bg-stone-100 aspect-[4/3] block"
                        >
                          {spot.image_url && (
                            <Image
                              src={spot.image_url}
                              alt={spot.name}
                              fill
                              unoptimized
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="220px"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-2.5">
                            <p className="text-white text-xs font-semibold leading-tight line-clamp-2">{spot.name}</p>
                            <p className="text-white/60 text-[10px] flex items-center gap-0.5 mt-0.5">
                              <MapPin size={9} />
                              {spot.prefecture}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {section.section_link && (
                    <Link
                      href={`${section.section_link.href}?back=${encodeURIComponent(`/blog/${slug}#section-${i}`)}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors mt-4"
                    >
                      {section.section_link.text}
                      <ArrowRight size={13} />
                    </Link>
                  )}
                </section>
              ))}
            </div>
          )}

          {/* SPOT MAP */}
          {uniqueSpots.length > 0 && (
            <div className="mb-12">
              <h2 className="text-base font-semibold text-stone-900 mb-3">Where are these spots?</h2>
              <ArticleSpotMapWrapper spots={uniqueSpots} slug={slug} />
            </div>
          )}

          {/* HOW TO GET THERE */}
          {article.howToGetThere && (
            <div className="mb-12">
              <HowToGetThere text={article.howToGetThere} />
            </div>
          )}

          {/* CTA */}
          <div className="bg-stone-900 rounded-2xl p-8 mb-12">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
              <Sparkles size={11} className="inline mr-1" />
              Find your Japan
            </p>
            <h2 className="text-xl font-bold text-white mb-3">{article.ctaHeading}</h2>
            <p className="text-stone-400 text-sm mb-5 leading-relaxed">{article.ctaBody}</p>
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              <Sparkles size={15} />
              Find match spots
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Other prefecture guides */}
          {prefectureArticles.length > 0 && (
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-4">More Prefecture Guides</h3>
              <div className="relative -mx-4">
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />
                <div className="flex gap-3 overflow-x-auto pb-2 px-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                  {prefectureArticles.map((pref) => {
                    const thumb = pref.coverImage ?? prefThumbnails[pref.slug];
                    return (
                      <Link
                        key={pref.slug}
                        href={`/blog/${pref.slug}`}
                        className="group relative rounded-2xl overflow-hidden flex-shrink-0 w-44 h-52 block bg-stone-200"
                      >
                        {thumb && (
                          <Image
                            src={thumb}
                            alt={pref.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="176px"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white text-sm font-semibold leading-snug line-clamp-2">{pref.title}</p>
                          <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
                            <Clock size={9} />
                            {pref.readMinutes} min read
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Related articles */}
          {related.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-4">More from the blog</h3>
              <div className="space-y-px rounded-2xl border border-stone-200 overflow-hidden">
                {related.map((rel, i) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className={`group flex items-center justify-between gap-4 bg-white hover:bg-stone-50 transition-colors px-5 py-4 ${
                      i < related.length - 1 ? 'border-b border-stone-100' : ''
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900 group-hover:text-red-600 transition-colors text-sm leading-snug">
                        {rel.title}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                        <Clock size={10} />
                        {rel.readMinutes} min read
                      </p>
                    </div>
                    <ArrowRight size={14} className="shrink-0 text-stone-300 group-hover:text-red-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Cover image: article.coverImage → fallback to first section's first spot */}
      {heroImage && (
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-stone-100 mb-10">
          <Image
            src={heroImage}
            alt={article.title}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-stone-400 mb-8">
        <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/blog" className="hover:text-stone-600 transition-colors">Blog</Link>
        <ChevronRight size={12} />
        <span className="text-stone-600 line-clamp-1">{article.title}</span>
      </nav>

      {/* Article header */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 leading-tight mb-4">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-stone-400">
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </time>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {article.readMinutes} min read
          </span>
        </div>
      </header>

      {/* Intro */}
      {article.intro && (
        <p className="text-stone-600 text-lg leading-relaxed mb-10 border-l-2 border-red-200 pl-4">
          {article.intro}
        </p>
      )}

      {/* Table of Contents */}
      {article.sections.filter(s => s.heading).length > 2 && (
        <nav className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-10">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Contents</p>
          <ol className="space-y-2">
            {article.sections.filter(s => s.heading).map((s, i) => (
              <li key={i} className="flex items-baseline gap-2">
                <span className="text-[10px] font-mono text-stone-300 w-4 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <a href={`#section-${i}`} className="text-sm text-stone-600 hover:text-red-600 transition-colors leading-snug">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Sections */}
      {article.sections.length > 0 && (
        <div className="mb-12 space-y-12">
          {article.sections.map((section, i) => (
            <section key={i} id={`section-${i}`} className="scroll-mt-20">
              <h2 className="text-xl font-bold text-stone-900 mb-3">{section.heading}</h2>

              {/* セクション情報バッジ（spots DB + 記事データから自動取得） */}
              {((section.best_season ?? sectionSpots[i][0]?.best_season) || section.travel_time) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {(section.best_season ?? sectionSpots[i][0]?.best_season) && (
                    <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">
                      <Calendar size={10} />
                      {section.best_season ?? sectionSpots[i][0]?.best_season}
                    </span>
                  )}
                  {section.travel_time && (
                    <span className="inline-flex items-center gap-1 text-xs bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-full">
                      <Train size={10} />
                      {section.travel_time}
                    </span>
                  )}
                </div>
              )}

              {/* セクション画像: 手動指定 > spot_query の1枚目 > なし */}
              {(section.image ?? sectionSpots[i][0]?.image_url) && (
                <div className="relative h-52 sm:h-64 rounded-xl overflow-hidden bg-stone-100 mb-4">
                  <Image
                    src={(section.image ?? sectionSpots[i][0]?.image_url)!}
                    alt={section.heading}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
              )}

              {/* 本文 */}
              {section.body.split('\n').filter(Boolean).map((para, j) => (
                <p key={j} className="text-stone-600 leading-relaxed mb-3">{para}</p>
              ))}

              {/* Spot カード（spot_ids / spot_query どちらでも表示） */}
              {sectionSpots[i].length > 0 && (
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {sectionSpots[i].map(spot => (
                    <Link
                      key={spot.id}
                      href={`/spots/${spot.id}?back=${encodeURIComponent(`/blog/${slug}#section-${i}`)}`}
                      className="group relative rounded-xl overflow-hidden bg-stone-100 aspect-[4/3] block"
                    >
                      {spot.image_url && (
                        <Image
                          src={spot.image_url}
                          alt={spot.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="220px"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2.5">
                        <p className="text-white text-xs font-semibold leading-tight line-clamp-2">{spot.name}</p>
                        <p className="text-white/60 text-[10px] flex items-center gap-0.5 mt-0.5">
                          <MapPin size={9} />
                          {spot.prefecture}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* セクションリンク（スポットカードの下） */}
              {section.section_link && (
                <Link
                  href={`${section.section_link.href}?back=${encodeURIComponent(`/blog/${slug}#section-${i}`)}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors mt-4"
                >
                  {section.section_link.text}
                  <ArrowRight size={13} />
                </Link>
              )}
            </section>
          ))}
        </div>
      )}

      {/* CTA block */}
      <div className="bg-stone-900 rounded-2xl p-8 mb-12">
        <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
          <Sparkles size={11} className="inline mr-1" />
          Find your Japan
        </p>
        <h2 className="text-xl font-bold text-white mb-3">{article.ctaHeading}</h2>
        <p className="text-stone-400 text-sm mb-5 leading-relaxed">{article.ctaBody}</p>
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
        >
          <Sparkles size={15} />
          Find match spots
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-4">More from the blog</h3>
          <div className="space-y-px rounded-2xl border border-stone-200 overflow-hidden">
            {related.map((rel, i) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className={`group flex items-center justify-between gap-4 bg-white hover:bg-stone-50 transition-colors px-5 py-4 ${
                  i < related.length - 1 ? 'border-b border-stone-100' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-900 group-hover:text-red-600 transition-colors text-sm leading-snug">
                    {rel.title}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                    <Clock size={10} />
                    {rel.readMinutes} min read
                  </p>
                </div>
                <ArrowRight size={14} className="shrink-0 text-stone-300 group-hover:text-red-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
