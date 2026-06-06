import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://www.google.com https://*.google.com https://*.googleapis.com https://*.googlesyndication.com https://*.doubleclick.net https://www.googletagmanager.com https://ep2.adtrafficquality.google; connect-src 'self' https://*.supabase.co https://www.google.com https://*.google.com https://*.googleapis.com https://*.googlesyndication.com https://*.doubleclick.net https://*.adtrafficquality.google https://www.googletagmanager.com; frame-src https://www.google.com https://*.google.com https://*.googleapis.com https://*.googlesyndication.com https://*.doubleclick.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
