import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-10 py-14">

        {/* Main row: Brand | Nav Links | Contact | Social */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-0 justify-between">

          {/* Brand — far left */}
          <div className="lg:w-56 flex-shrink-0">
            <p className="text-[10px] tracking-[0.25em] uppercase text-stone-500 mb-1">Beach Resort</p>
            <div className="text-2xl font-bold tracking-tight leading-tight uppercase text-white">
              Beach Resort
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-3">
            {[
              { label: 'Accommodations', to: '/accommodations' },
              { label: 'Amenities', to: '/amenities' },
              { label: 'Photo Gallery', to: '/gallery' },
              { label: 'Book a Stay', to: '/booking' },
            ].map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-[11px] tracking-[0.18em] uppercase text-stone-300 hover:text-white transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-stone-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-[11px] tracking-[0.15em] uppercase text-stone-300">
                Batangas, Philippines
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 flex-shrink-0 text-stone-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              <a href="tel:+63000000000" className="text-[11px] tracking-[0.15em] uppercase text-stone-300 hover:text-white transition-colors">
                +63 (0) 968-282-3420
              </a>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 flex-shrink-0 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              <a href="mailto:ele.rosete@gmail.com" className="text-[11px] tracking-[0.15em] uppercase text-stone-300 hover:text-white transition-colors">
                ele.rosete@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 flex-shrink-0 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span className="text-[11px] tracking-[0.15em] uppercase text-stone-300">
                Check-in: 2PM · Check-out: 12NN
              </span>
            </div>
          </div>

          {/* Social Icons — far right */}
          <div className="flex gap-3 lg:items-start">
            {[
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/eleazar.rosete.2024/',
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                ),
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/dsgnbyzar/',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                ),
              },
              {
                label: 'TikTok',
                href: '#',
                icon: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
                  </svg>
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 border border-stone-600 flex items-center justify-center text-stone-400 hover:border-white hover:text-white transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-700 mt-12 pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500">
            All Rights Reserved by Demo Beach Resort 2025
          </p>
          <div className="flex gap-8 text-[10px] tracking-[0.2em] uppercase text-stone-500">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}