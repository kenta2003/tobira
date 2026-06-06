import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'AI Trip Planner',
  description:
    'Build a personalized Japan itinerary powered by AI. Tell us your interests and get a day-by-day plan across any region.',
  openGraph: {
    title: 'AI Trip Planner',
    description:
      'Build a personalized Japan itinerary powered by AI. Tell us your interests and get a day-by-day plan across any region.',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
  },
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
