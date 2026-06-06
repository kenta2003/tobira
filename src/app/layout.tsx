import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const OG_IMAGE = 'https://tobira-travel.com/og.jpg';

export const metadata: Metadata = {
  metadataBase: new URL('https://tobira-travel.com'),
  title: {
    default: 'Tobira — Beyond Tokyo | Discover Real Japan',
    template: '%s | Tobira',
  },
  description:
    "Go beyond Tokyo. Tobira guides you to Japan's most authentic experiences across all 47 prefectures — from Hokkaido to Okinawa. Curated by locals, powered by AI.",
  openGraph: {
    title: 'Tobira — Beyond Tokyo | Discover Real Japan',
    description:
      "Go beyond Tokyo. Japan's authentic travel guide covering all 47 prefectures — curated by locals, powered by AI.",
    type: 'website',
    url: 'https://tobira-travel.com',
    siteName: 'Tobira',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Western Japan travel guide — Tobira' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tobira — Beyond Tokyo | Discover Real Japan',
    description:
      "Go beyond Tokyo. Japan's authentic travel guide covering all 47 prefectures — curated by locals, powered by AI.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tobira',
  alternateName: 'tobira beyond tokyo',
  url: 'https://tobira-travel.com',
  description: 'Hand-curated Japan travel guide covering all 47 prefectures — curated by locals, powered by AI.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://tobira-travel.com/spots?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let isPro = false;
  if (user) {
    const { data } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', user.id)
      .single();
    isPro = data?.status === 'active';
  }

  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased bg-stone-50 font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {!isPro && process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
