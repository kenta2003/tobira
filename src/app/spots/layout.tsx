import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Spots',
  description:
    'Browse hidden gems across all 47 prefectures of Japan — active volcanoes, sacred shrines, secret onsen towns, and more.',
  openGraph: {
    title: 'Explore Japan Spots',
    description:
      'Browse hidden gems across all 47 prefectures of Japan — active volcanoes, sacred shrines, secret onsen towns, and more.',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
  },
};

export default function SpotsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
