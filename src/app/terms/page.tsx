import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Tobira — the rules for using our travel guide.',
};


export default function TermsPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <p className="text-stone-400 text-sm font-medium tracking-widest uppercase mb-4">
          tobira beyond tokyo
        </p>
        <h1 className="text-4xl font-bold text-stone-900 mb-2">Terms of Service</h1>
        <p className="text-stone-500 mb-12">Last updated: February 2026</p>

        <div className="space-y-10 text-stone-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              1. Acceptance of terms
            </h2>
            <p>
              By accessing or using Tobira (&ldquo;the Service&rdquo;) at tobira-travel.com,
              you agree to be bound by these Terms of Service. The Service is operated by{' '}
              <strong>tobira beyond tokyo</strong>, an independent project. If you do not
              agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              2. Description of the Service
            </h2>
            <p>
              Tobira is a travel guide platform offering curated information about
              destinations in Japan, along with an AI-powered trip planning tool.
              The Service includes a free tier and a paid Pro subscription.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              3. Accounts
            </h2>
            <p>
              You must create an account to access certain features. You are responsible
              for maintaining the confidentiality of your account credentials and for all
              activity that occurs under your account. You must be at least 18 years old
              to create an account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              4. Subscription and billing
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Pro plan:</strong> $4.99 per month, billed monthly via Stripe.
              </li>
              <li>
                <strong>Auto-renewal:</strong> Your subscription renews automatically
                at the end of each billing period unless cancelled.
              </li>
              <li>
                <strong>Cancellation:</strong> You may cancel your subscription at any
                time from your account settings. Cancellation takes effect at the end of
                your current billing period — you retain access to Pro features until
                that date.
              </li>
              <li>
                <strong>Refunds:</strong> We do not offer refunds for partial billing
                periods. If you believe you were charged in error, please contact us
                within 14 days at{' '}
                <a
                  href="mailto:contact@tobira-travel.com"
                  className="text-red-600 hover:underline"
                >
                  contact@tobira-travel.com
                </a>
                .
              </li>
              <li>
                <strong>Price changes:</strong> We will give at least 30 days&apos; notice
                before changing the subscription price.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              5. Acceptable use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Use the Service for any illegal purpose</li>
              <li>
                Scrape, copy, or redistribute the Service&apos;s content without
                written permission
              </li>
              <li>
                Share your account credentials or Pro subscription access with others
              </li>
              <li>Attempt to circumvent any access controls or rate limits</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              6. Content accuracy
            </h2>
            <p>
              We make every effort to ensure the accuracy of travel information on
              Tobira. However, travel conditions, opening hours, prices, and
              accessibility can change without notice. We recommend verifying
              important details directly with venues before visiting.
            </p>
            <p className="mt-3">
              AI-generated itineraries are suggestions only. Always exercise your own
              judgment when planning travel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              7. Intellectual property
            </h2>
            <p>
              All content on Tobira — including text, images, and data — is the
              property of tobira beyond tokyo or its licensors and is protected by
              copyright. You may not reproduce or redistribute any content without
              prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              8. Disclaimer of warranties
            </h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; without warranties of any kind,
              express or implied. We do not warrant that the Service will be
              uninterrupted, error-free, or that any defects will be corrected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              9. Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, tobira beyond tokyo shall not be
              liable for any indirect, incidental, special, or consequential damages
              arising from your use of the Service, including any travel decisions made
              based on information provided.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">
              10. Changes to terms
            </h2>
            <p>
              We may update these Terms of Service at any time. We will notify you of
              material changes by updating the &ldquo;Last updated&rdquo; date above.
              Continued use of the Service after changes constitutes acceptance of the
              new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">11. Contact</h2>
            <p>
              For questions about these terms, please contact us at{' '}
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

        <div className="mt-16 pt-8 border-t border-stone-200 text-sm text-stone-400">
          See also:{' '}
          <Link href="/privacy" className="text-red-600 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
