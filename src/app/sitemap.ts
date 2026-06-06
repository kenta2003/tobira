import { getAllSpots } from '@/lib/spots';
import { getAllArticles } from '@/lib/articles';
import { PREFECTURE_MAP } from '@/lib/utils';
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://tobira-travel.com';
const now = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [spots, articles] = await Promise.all([getAllSpots(), getAllArticles()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                      changeFrequency: 'weekly',  priority: 1.0,  lastModified: now },
    { url: `${BASE_URL}/spots`,           changeFrequency: 'weekly',  priority: 0.9,  lastModified: now },
    { url: `${BASE_URL}/guides`,          changeFrequency: 'weekly',  priority: 0.9,  lastModified: now },
    { url: `${BASE_URL}/discover`,        changeFrequency: 'monthly', priority: 0.9,  lastModified: now },
    { url: `${BASE_URL}/blog`,            changeFrequency: 'weekly',  priority: 0.8,  lastModified: now },
    { url: `${BASE_URL}/plan`,            changeFrequency: 'monthly', priority: 0.8,  lastModified: now },
    { url: `${BASE_URL}/pricing`,         changeFrequency: 'monthly', priority: 0.7,  lastModified: now },
    { url: `${BASE_URL}/about`,           changeFrequency: 'monthly', priority: 0.5,  lastModified: now },
    { url: `${BASE_URL}/contact`,         changeFrequency: 'monthly', priority: 0.4,  lastModified: now },
    { url: `${BASE_URL}/privacy`,         changeFrequency: 'yearly',  priority: 0.3,  lastModified: now },
    { url: `${BASE_URL}/terms`,           changeFrequency: 'yearly',  priority: 0.3,  lastModified: now },
    { url: `${BASE_URL}/tokushoho`,       changeFrequency: 'yearly',  priority: 0.3,  lastModified: now },
  ];

  const spotRoutes: MetadataRoute.Sitemap = spots.map((spot) => ({
    url: `${BASE_URL}/spots/${spot.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: now,
  }));

  const guideRoutes: MetadataRoute.Sitemap = Object.keys(PREFECTURE_MAP).map((slug) => ({
    url: `${BASE_URL}/guides/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
    lastModified: now,
  }));

  const blogRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
  }));

  return [...staticRoutes, ...spotRoutes, ...guideRoutes, ...blogRoutes];
}
