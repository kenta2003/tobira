import Link from 'next/link';

// TODO: Replace '#' with actual SNS URLs once accounts are created
const SNS_LINKS = [
  { label: 'Instagram', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )},
  { label: 'X', href: '#', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )},
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="text-white font-bold text-xl mb-1">tobira</p>
            <p className="text-stone-500 text-sm">扉 · beyond tokyo</p>
            <p className="text-stone-500 text-sm mt-3 max-w-xs">
              Discover the real Japan — authentic, unhurried, unforgettable.
            </p>
            <div className="flex gap-3 mt-4">
              {SNS_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="text-stone-500 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <p className="text-stone-300 font-medium mb-1">Explore</p>
              <Link href="/spots" className="hover:text-white transition-colors">
                All Spots
              </Link>
              <Link href="/guides" className="hover:text-white transition-colors">
                All Guides
              </Link>
              <Link
                href="/guides/tokyo"
                className="hover:text-white transition-colors"
              >
                Tokyo
              </Link>
              <Link
                href="/guides/kyoto"
                className="hover:text-white transition-colors"
              >
                Kyoto
              </Link>
              <Link
                href="/guides/osaka"
                className="hover:text-white transition-colors"
              >
                Osaka
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-stone-300 font-medium mb-1">Product</p>
              <Link href="/plan" className="hover:text-white transition-colors">
                AI Trip Planner
              </Link>
              <Link href="/pricing" className="hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-stone-300 font-medium mb-1">Info</p>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/tokushoho" className="hover:text-white transition-colors">
                特定商取引法
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 text-xs text-stone-600 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Tobira. All rights reserved.</p>
          <p>Made with ❤ in Japan</p>
        </div>
      </div>
    </footer>
  );
}
