import { useState } from 'react';

// ─── BRAND ───────────────────────────────────────────────────────────────────
const P  = '#0077a8';
const PD = '#005f8a';
const PL = '#e0f2fa';
const PG = 'rgba(0,119,168,0.25)';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface EventPackage {
  name: string;
  price: string;
  unit: string;
  desc: string;
  includes: string[];
  featured?: boolean;
}

interface FaqItem {
  q: string;
  a: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const eventPackages: EventPackage[] = [
  {
    name: 'Beach Wedding',
    price: '₱15,000',
    unit: 'Starting Rate',
    desc: 'Exchange vows on our 500-meter private shoreline with the sound of waves as your soundtrack. Full coordination included.',
    includes: [
      'Beachfront ceremony setup',
      'Floral arrangement package',
      'Sound system & microphone',
      'Catering for up to 50 guests',
      'Dedicated event coordinator',
      'Overnight room for the couple',
    ],
  },
  {
    name: 'Debut Party',
    price: '₱12,000',
    unit: 'Starting Rate',
    desc: 'Celebrate an 18th birthday in grand style with a full beachfront or function hall setup tailored to your debutante\'s vision.',
    includes: [
      'Venue for up to 100 guests',
      'Custom venue dressing & lights',
      'Sound system & DJ coordination',
      'Buffet catering (Filipino cuisine)',
      'Photo & video spots setup',
      'Dedicated event team',
    ],
    featured: true,
  },
  {
    name: 'Birthday & Reunion',
    price: '₱8,000',
    unit: 'Starting Rate',
    desc: 'From milestone adult birthdays to full family reunions — intimate beachside setups or grand function hall arrangements available.',
    includes: [
      'Indoor or outdoor venue',
      'Custom decoration setup',
      'Catering packages available',
      'Beach & pool access for guests',
      'Group accommodation rates',
      'Activity coordination',
    ],
  },
  {
    name: 'Corporate Retreat',
    price: '₱10,000',
    unit: 'Starting Rate',
    desc: 'Host your next team-building session, company seminar, or corporate outing with full facilities and tailored activity programs.',
    includes: [
      'Air-conditioned function hall',
      'Projector & AV equipment',
      'Team-building activity options',
      'Catering & coffee breaks',
      'Beach outing after sessions',
      'Group accommodation rates',
    ],
  },
];

const faqs: FaqItem[] = [
  {
    q: 'How do I make a reservation?',
    a: 'Book directly through our Calendly booking system above, or message us on Facebook. A 50% deposit is required to confirm.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Cancellations made 7 or more days before check-in receive a full refund. Within 7 days, deposits are non-refundable but can be rescheduled.',
  },
  {
    q: 'Is there parking available?',
    a: 'Yes. Free on-site parking is available for all registered guests and event attendees.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept cash, GCash (QR payment), and bank transfers. Credit cards are not currently available.',
  },
  {
    q: 'Are outside food and drinks allowed?',
    a: 'No outside food or drinks are allowed. We have a full restaurant and bar with great food and drinks at reasonable prices.',
  },
  {
    q: 'How far is Villa Del Prado from Manila?',
    a: 'We are about 3 to 4 hours from Manila via the SLEX/STAR Tollway to Sariaya, Quezon. Detailed directions are available on request.',
  },
];

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqRow({ item }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: 'white',
        border: `1px solid ${open ? P + '33' : 'rgba(0,0,0,0.07)'}`,
        marginBottom: 2,
        transition: 'border-color .2s ease',
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between text-left"
        style={{ padding: '18px 20px', background: 'transparent', border: 'none', cursor: 'pointer', gap: 16 }}
      >
        <span className="font-bold text-neutral-900" style={{ fontSize: 12, flex: 1 }}>
          {item.q}
        </span>
        <div
          style={{
            width: 20,
            height: 20,
            background: open ? P : '#efefed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background .2s ease',
          }}
        >
          <svg
            width="9" height="9" viewBox="0 0 24 24" fill="none"
            stroke={open ? 'white' : '#aaa'} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s ease' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: 'hidden',
          transition: 'max-height .35s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <p
          className="font-light text-neutral-500 leading-relaxed"
          style={{ padding: '0 20px 18px', fontSize: 12, borderTop: `1px solid ${P}1a` }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

// ─── PACKAGE CARD ─────────────────────────────────────────────────────────────
function PackageCard({ pkg }: { pkg: EventPackage; index: number }) {
  return (
    <div
      style={{
        background: '#f5f3ee',
        border: pkg.featured ? `2px solid ${P}` : '1px solid rgba(0,0,0,0.07)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow .3s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* Card Header */}
      <div
        style={{
          padding: '28px 24px 20px',
          background: pkg.featured ? P : PL,
          position: 'relative',
        }}
      >
        {pkg.featured && (
          <span
            className="font-extrabold uppercase"
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'white',
              color: P,
              fontSize: 8,
              letterSpacing: '0.12em',
              padding: '5px 10px',
            }}
          >
            Most Booked
          </span>
        )}
        <p
          className="font-black leading-none"
          style={{ fontSize: 'clamp(22px,4vw,30px)', color: pkg.featured ? 'white' : P, marginBottom: 4 }}
        >
          {pkg.price}
        </p>
        <p
          className="font-semibold uppercase"
          style={{ fontSize: 10, color: pkg.featured ? 'rgba(255,255,255,0.65)' : P, opacity: pkg.featured ? 1 : 0.7, letterSpacing: '0.08em' }}
        >
          {pkg.unit}
        </p>
      </div>

      {/* Card Body */}
      <div style={{ padding: '20px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p
          className="font-black uppercase"
          style={{ fontSize: 12, letterSpacing: '0.1em', color: '#111', marginBottom: 8 }}
        >
          {pkg.name}
        </p>
        <p
          className="font-light leading-relaxed text-neutral-500"
          style={{ fontSize: 11, marginBottom: 18, flex: 1 }}
        >
          {pkg.desc}
        </p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pkg.includes.map((inc, i) => (
            <li
              key={inc}
              className="flex items-start font-medium text-neutral-600"
              style={{
                fontSize: 11,
                padding: '5px 0',
                gap: 8,
                borderBottom: i < pkg.includes.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
              }}
            >
              <span
                style={{ width: 4, height: 4, background: P, flexShrink: 0, marginTop: 5, display: 'block' }}
              />
              {inc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function BookingPage() {
  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif", background: '#f5f3ee' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600;1,700&family=Dancing+Script:wght@700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes kenBurns { 0% { transform:scale(1.06); } 100% { transform:scale(1.0); } }
        @keyframes chevronBob {
          0%, 100% { transform: translateY(0px); opacity: 0.55; }
          50%       { transform: translateY(9px); opacity: 0.85; }
        }

        .hero-serif     { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        .dancing-script { font-family: 'Dancing Script', cursive !important; }

        body, h1, h2, h3, h4, h5, h6, p, span, div, button, a, input, select, textarea {
          font-family: 'Montserrat', sans-serif !important;
        }
        .hero-serif     { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        .dancing-script { font-family: 'Dancing Script', cursive !important; }

        .hero-browse-line { animation: fadeUp 1s ease 1.2s both; }
        .scroll-indicator { animation: fadeUp 1s ease 1.4s both; }
        .chevron-bob { animation: chevronBob 2.4s cubic-bezier(0.45, 0, 0.55, 1) 1.6s infinite; }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO — 100vh
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden w-full" style={{ height: '100vh', minHeight: 600, paddingTop: 70 }}>

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80&auto=format')",
            animation: 'kenBurns 18s ease-out forwards',
          }}
        />

        {/* Overlays */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.38)' }} />
        <div className="absolute inset-x-0 top-0"    style={{ height: '50%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)' }} />
        <div className="absolute inset-x-0 bottom-0" style={{ height: '35%', background: 'linear-gradient(to top,    rgba(0,0,0,0.45) 0%, transparent 100%)' }} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-6"
            style={{ animation: 'fadeUp .6s cubic-bezier(.16,1,.3,1) .1s both' }}
          >
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.45)' }} />
            <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.60)' }}>
              Booking & Reservations
            </span>
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.45)' }} />
          </div>

          {/* Headline */}
          <h1 className="m-0 leading-none" style={{ animation: 'fadeUp .9s cubic-bezier(.16,1,.3,1) .25s both' }}>
            <span className="hero-serif block" style={{ fontSize: 'clamp(64px, 11vw, 130px)', fontWeight: 700, color: 'white', lineHeight: 0.88, letterSpacing: '-0.01em' }}>
              Plan Your
            </span>
            <span className="hero-serif block" style={{ fontSize: 'clamp(58px, 10.5vw, 124px)', fontWeight: 300, fontStyle: 'italic', color: 'white', lineHeight: 1.0, letterSpacing: '-0.015em' }}>
              Escape
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-6 mb-0"
            style={{
              fontSize: 'clamp(12px, 1.5vw, 14px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.60)',
              maxWidth: 380,
              lineHeight: 1.7,
              letterSpacing: '0.02em',
              animation: 'fadeUp .8s cubic-bezier(.16,1,.3,1) .55s both',
            }}
          >
            Reserve your stay, event, or special occasion at Villa Del Prado —
            where every celebration finds its perfect beachfront backdrop.
          </p>

          {/* Browse CTA */}
          <div className="hero-browse-line flex flex-col items-center" style={{ marginTop: '6vh' }}>
            <span
              onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', cursor: 'pointer' }}
            >
              Reserve
            </span>
            <div className="scroll-indicator" style={{ marginTop: '1vh' }}>
              <svg
                className="chevron-bob"
                width="22" height="13" viewBox="0 0 22 13" fill="none"
                style={{ display: 'block', cursor: 'pointer' }}
                onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <polyline points="1,1 11,11 21,1" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BOOKING EMBED
      ══════════════════════════════════════════════════════ */}
      <section id="booking-section" className="py-14 sm:py-20" style={{ background: '#f5f3ee' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-[8%]">

          <span
            className="inline-block font-extrabold uppercase px-4 py-1.5 mb-3"
            style={{ fontSize: 9, letterSpacing: '0.2em', background: PL, color: P }}
          >
            Instant Booking
          </span>
          <h2 className="font-black tracking-tight leading-tight text-neutral-900 m-0" style={{ fontSize: 'clamp(24px, 5vw, 52px)' }}>
            Reserve Your <span style={{ color: P }}>Dates.</span>
          </h2>
          <p className="text-neutral-400 font-light mt-2 mb-8" style={{ fontSize: 12 }}>
            Pick your preferred date — we confirm within 24 hours.
          </p>

          {/* Embed Box */}
          <div style={{ background: 'white', border: `1.5px solid ${P}22`, overflow: 'hidden' }}>

            {/* Header bar */}
            <div
              className="flex items-center justify-between"
              style={{ background: `linear-gradient(to right, ${P}, ${PD})`, padding: '20px 28px' }}
            >
              <div>
                <p className="font-bold text-white m-0" style={{ fontSize: 13 }}>Villa Del Prado — Book a Stay</p>
                <p className="font-light m-0" style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Powered by Calendly</p>
              </div>
              <p className="m-0" style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>24hr confirmation</p>
            </div>

            {/* Body — replace inner div with Calendly iframe */}
            <div className="flex items-center justify-center" style={{ minHeight: 460, padding: '48px 24px', background: 'white' }}>
              {/*
                Replace this block with:
                <iframe
                  src="https://calendly.com/YOUR_CALENDLY_LINK"
                  width="100%"
                  height="630"
                  frameBorder="0"
                  title="Book at Villa Del Prado"
                />
              */}
              <div className="text-center" style={{ maxWidth: 420 }}>
                <h3 className="font-black text-neutral-900 mb-2" style={{ fontSize: 16 }}>
                  Calendly Booking Widget
                </h3>
                <p className="font-light text-neutral-400 leading-relaxed mb-7" style={{ fontSize: 12 }}>
                  Your Calendly scheduling widget will appear here. Replace this placeholder with your actual Calendly embed code or link.
                </p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-extrabold uppercase"
                  style={{ fontSize: 10, letterSpacing: '0.15em', padding: '14px 28px', background: `linear-gradient(to bottom right, ${P}, ${PD})`, boxShadow: `0 4px 18px ${PG}`, textDecoration: 'none' }}
                >
                  Open Calendly Booking
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6" style={{ borderTop: '1px solid #f0ede8' }}>
                  <span className="font-light text-neutral-400" style={{ fontSize: 11 }}>Or reach us directly:</span>
                  <a href="https://www.facebook.com/villadelpradoresort" target="_blank" rel="noopener noreferrer" className="font-bold" style={{ fontSize: 11, color: P, textDecoration: 'none', letterSpacing: '0.05em' }}>Facebook</a>
                  <a href="mailto:info@villadelpradoresort.com" className="font-bold" style={{ fontSize: 11, color: P, textDecoration: 'none', letterSpacing: '0.05em' }}>Email Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          EVENT PACKAGES
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[8%]">

          <span
            className="inline-block font-extrabold uppercase px-4 py-1.5 mb-3"
            style={{ fontSize: 9, letterSpacing: '0.2em', background: PL, color: P }}
          >
            Event Packages & Rates
          </span>
          <h2 className="font-black tracking-tight leading-tight text-neutral-900 m-0" style={{ fontSize: 'clamp(24px, 5vw, 52px)' }}>
            Celebrate in <span style={{ color: P }}>Style.</span>
          </h2>
          <p className="text-neutral-400 font-light mt-2 mb-10" style={{ fontSize: 12 }}>
            All packages include dedicated staff support and full resort access.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventPackages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>

          <p className="text-center font-light text-neutral-400 mt-8" style={{ fontSize: 10 }}>
            Rates vary during peak seasons (Holy Week, Christmas, New Year, summer). Contact us for current pricing and availability.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20" style={{ background: '#f5f3ee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[8%]">

          <div className="text-center mb-10">
            <span
              className="inline-block font-extrabold uppercase px-4 py-1.5 mb-3"
              style={{ fontSize: 9, letterSpacing: '0.2em', background: PL, color: P }}
            >
              Our Track Record
            </span>
            <h2 className="font-black tracking-tight text-neutral-900 m-0" style={{ fontSize: 'clamp(20px, 4vw, 42px)' }}>
              Trusted for Every <span style={{ color: P }}>Occasion.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { stat: '500+',  label: 'Guests Served' },
              { stat: '100+',  label: 'Events Hosted' },
              { stat: '4.8/5', label: 'Event Rating'  },
              { stat: '500m',  label: 'Beachfront'    },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white text-center"
                style={{ padding: '28px 12px', border: '1px solid rgba(0,0,0,0.07)' }}
              >
                <p className="font-black leading-none m-0 mb-2" style={{ fontSize: 'clamp(22px, 4vw, 32px)', color: P }}>
                  {s.stat}
                </p>
                <p className="font-bold uppercase text-neutral-400 m-0" style={{ fontSize: 9, letterSpacing: '0.12em' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20" style={{ background: 'white' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-10">
            <span
              className="inline-block font-extrabold uppercase px-4 py-1.5 mb-3"
              style={{ fontSize: 9, letterSpacing: '0.2em', background: PL, color: P }}
            >
              FAQ
            </span>
            <h2 className="font-black tracking-tight text-neutral-900 m-0" style={{ fontSize: 'clamp(20px, 4vw, 42px)' }}>
              Questions? We Have <span style={{ color: P }}>Answers.</span>
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <FaqRow key={i} item={faq} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-[8%]" style={{ background: '#f5f3ee' }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="p-7 sm:p-12 md:p-14 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${PL} 0%, #d0eaf8 100%)` }}
          >
            {/* Watermark */}
            <div
              className="absolute right-6 top-4 font-black leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(60px, 14vw, 130px)', color: 'rgba(0,119,168,0.05)', letterSpacing: '-0.04em' }}
            >
              EVENT
            </div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center relative z-10">
              <div>
                <span
                  className="inline-block font-extrabold uppercase px-4 py-1.5 mb-4"
                  style={{ fontSize: 9, letterSpacing: '0.2em', background: 'white', color: P }}
                >
                  Still Have Questions?
                </span>
                <h2 className="font-black tracking-tight text-neutral-900 m-0 mb-3 leading-tight" style={{ fontSize: 'clamp(20px, 4vw, 40px)' }}>
                  Our Team is <span style={{ color: P }}>Ready.</span>
                </h2>
                <p className="text-neutral-500 font-light leading-relaxed mb-7" style={{ fontSize: 13 }}>
                  From intimate beach weddings to full corporate retreats — our dedicated events team handles every detail so you can focus on celebrating.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.facebook.com/villadelpradoresort"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-extrabold uppercase"
                    style={{ fontSize: 10, letterSpacing: '0.15em', padding: '14px 24px', background: `linear-gradient(to bottom right, ${P}, ${PD})`, boxShadow: `0 4px 18px ${PG}`, textDecoration: 'none', minHeight: 48 }}
                  >
                    Message on Facebook
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['Weddings', 'Debuts', 'Corporate', 'Reunions', 'Birthdays', 'Graduations', 'School Outings', 'Anniversaries'].map((tag) => (
                  <div
                    key={tag}
                    className="bg-white flex items-center justify-center font-extrabold uppercase"
                    style={{ fontSize: 9, letterSpacing: '0.12em', color: P, padding: '16px 8px', textAlign: 'center' }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}