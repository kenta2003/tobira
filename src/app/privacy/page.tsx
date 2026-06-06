import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Tobira — how we collect, use, and protect your data.',
};


export default function PrivacyPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <p className="text-stone-400 text-sm font-medium tracking-widest uppercase mb-4">
          tobira beyond tokyo
        </p>
        <h1 className="text-4xl font-bold text-stone-900 mb-2">Privacy Policy</h1>
        <p className="text-stone-500 mb-12">Last updated: February 2026</p>

        <div className="space-y-10 text-stone-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">1. Who we are</h2>
            <p>
              This service is operated by <strong>tobira beyond tokyo</strong>, an
              independent project. When this policy says &ldquo;we&rdquo;,
              &ldquo;us&rdquo;, or &ldquo;our&rdquo;, it refers to tobira beyond tokyo.
            </p>
            <p className="mt-3">
              Contact:{' '}
              <a
                href="mailto:contact@tobira-travel.com"
                className="text-red-600 hover:underline"
              >
                contact@tobira-travel.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              2. What data we collect
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Account data:</strong> email address and password (stored
                securely via Supabase Auth) when you create an account.
              </li>
              <li>
                <strong>Payment data:</strong> subscription and billing information
                processed by Stripe. We never store your full card number — Stripe
                handles all payment data under its own{' '}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Usage data:</strong> pages visited, spots saved, and trip plans
                generated, collected via Google Analytics.
              </li>
              <li>
                <strong>AI input data:</strong> travel preferences and dates you provide
                to the AI Trip Planner. This data is processed by Google&apos;s Generative
                AI API and is subject to{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Contact submissions:</strong> name, email, and message content
                when you use the Contact form.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              3. How we use your data
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain the service</li>
              <li>To process your subscription via Stripe</li>
              <li>To generate AI trip itineraries based on your input</li>
              <li>To respond to your contact messages</li>
              <li>
                To understand how the site is used and improve it (Google Analytics,
                with IP anonymization enabled)
              </li>
            </ul>
            <p className="mt-3">
              We do not sell your personal data to third parties. We do not send
              marketing emails without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              4. Third-party services
            </h2>
            <p>We use the following third-party services, each with their own privacy policies:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong>Supabase</strong> — database and authentication (
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  Privacy Policy
                </a>
                )
              </li>
              <li>
                <strong>Stripe</strong> — payment processing (
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  Privacy Policy
                </a>
                )
              </li>
              <li>
                <strong>Google Analytics</strong> — usage analytics (
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  Privacy Policy
                </a>
                )
              </li>
              <li>
                <strong>Google Generative AI</strong> — AI trip planning (
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  Privacy Policy
                </a>
                )
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">5. Cookies</h2>
            <p>
              We use cookies and similar technologies to keep you logged in and to
              collect anonymous analytics data. By using this site, you consent to the
              use of essential cookies. You can disable non-essential cookies through
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              6. Data retention
            </h2>
            <p>
              We retain your account data for as long as your account is active. If you
              delete your account, we will delete your personal data within 30 days,
              except where we are legally required to retain it (e.g., billing records).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">7. Your rights</h2>
            <p>
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at{' '}
              <a
                href="mailto:contact@tobira-travel.com"
                className="text-red-600 hover:underline"
              >
                contact@tobira-travel.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              8. Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              significant changes by updating the &ldquo;Last updated&rdquo; date at the
              top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">9. Contact</h2>
            <p>
              For any privacy-related questions, please contact us at{' '}
              <a
                href="mailto:contact@tobira-travel.com"
                className="text-red-600 hover:underline"
              >
                contact@tobira-travel.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
