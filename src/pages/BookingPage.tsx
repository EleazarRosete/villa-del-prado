import { useState } from 'react';

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
    desc: "Celebrate an 18th birthday in grand style with a full beachfront or function hall setup tailored to your debutante's vision.",
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
function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`booking-faq__row ${open ? 'booking-faq__row--open' : ''}`}>
      <button
        onClick={() => setOpen(v => !v)}
        className="booking-faq__trigger"
      >
        <span className="booking-faq__question">{item.q}</span>
        <div className={`booking-faq__icon ${open ? 'booking-faq__icon--open' : ''}`}>
          <svg
            width="9" height="9" viewBox="0 0 24 24" fill="none"
            stroke={open ? 'white' : '#aaa'} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            className={`booking-faq__chevron ${open ? 'booking-faq__chevron--open' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      <div className={`booking-faq__body ${open ? 'booking-faq__body--open' : 'booking-faq__body--closed'}`}>
        <p className="booking-faq__answer">{item.a}</p>
      </div>
    </div>
  );
}

// ─── PACKAGE CARD ─────────────────────────────────────────────────────────────
function PackageCard({ pkg }: { pkg: EventPackage }) {
  return (
    <div className={`booking-pkg-card ${pkg.featured ? 'booking-pkg-card--featured' : ''}`}>
      {/* Card Header */}
      <div className={`booking-pkg-card__header ${pkg.featured ? 'booking-pkg-card__header--featured' : ''}`}>
        {pkg.featured && (
          <span className="booking-pkg-card__badge">Most Booked</span>
        )}
        <p className="booking-pkg-card__price">{pkg.price}</p>
        <p className={`booking-pkg-card__unit ${pkg.featured ? 'booking-pkg-card__unit--featured' : ''}`}>
          {pkg.unit}
        </p>
      </div>

      {/* Card Body */}
      <div className="booking-pkg-card__body">
        <p className="booking-pkg-card__name">{pkg.name}</p>
        <p className="booking-pkg-card__desc">{pkg.desc}</p>
        <ul className="booking-pkg-card__list">
          {pkg.includes.map((inc, i) => (
            <li
              key={inc}
              className={`booking-pkg-card__item ${i < pkg.includes.length - 1 ? 'booking-pkg-card__item--bordered' : ''}`}
            >
              <span className="booking-pkg-card__dot" />
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
    <div className="booking-page">

      {/* ══════════════════════════════════════════════════════
          HERO — 100vh
      ══════════════════════════════════════════════════════ */}
      <section className="booking-hero">

        {/* Background */}
        <div className="booking-hero__bg" />

        {/* Overlays */}
        <div className="booking-hero__overlay-base" />
        <div className="booking-hero__overlay-top" />
        <div className="booking-hero__overlay-bottom" />

        {/* Content */}
        <div className="booking-hero__content">

          {/* Eyebrow */}
          <div className="booking-hero__eyebrow">
            <div className="booking-hero__eyebrow-line" />
            <span className="booking-hero__eyebrow-text">Booking & Reservations</span>
            <div className="booking-hero__eyebrow-line" />
          </div>

          {/* Headline */}
          <h1 className="booking-hero__h1">
            <span className="booking-hero__line1 hero-serif">Plan Your</span>
            <span className="booking-hero__line2 hero-serif">Escape</span>
          </h1>

          {/* Subtitle */}
          <p className="booking-hero__subtitle">
            Reserve your stay, event, or special occasion at Villa Del Prado —
            where every celebration finds its perfect beachfront backdrop.
          </p>

          {/* Browse CTA */}
          <div className="booking-hero__browse">
            <span
              className="booking-hero__browse-label"
              onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Reserve
            </span>
            <div className="booking-hero__chevron-wrap">
              <svg
                className="booking-hero__chevron-icon"
                width="22" height="13" viewBox="0 0 22 13" fill="none"
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
      <section id="booking-section" className="booking-embed-section">
        <div className="booking-embed-section__inner">

          <span className="booking-section__tag">Instant Booking</span>
          <h2 className="booking-section__heading">
            Reserve Your <span>Dates.</span>
          </h2>
          <p className="booking-section__subheading">
            Pick your preferred date — we confirm within 24 hours.
          </p>

          {/* Embed Box */}
          <div className="booking-embed__box">

            {/* Header bar */}
            <div className="booking-embed__header">
              <div>
                <p className="booking-embed__header-title">Villa Del Prado — Book a Stay</p>
                <p className="booking-embed__header-sub">Powered by Calendly</p>
              </div>
              <p className="booking-embed__header-note">24hr confirmation</p>
            </div>

            {/* Body — replace inner div with Calendly iframe */}
            <div className="booking-embed__body">
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
              <div className="booking-embed__placeholder">
                <h3 className="booking-embed__placeholder-title">
                  Calendly Booking Widget
                </h3>
                <p className="booking-embed__placeholder-desc">
                  Your Calendly scheduling widget will appear here. Replace this placeholder with your actual Calendly embed code or link.
                </p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="booking-embed__cta-btn"
                >
                  Open Calendly Booking
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <div className="booking-embed__alt-contact">
                  <span className="booking-embed__alt-label">Or reach us directly:</span>
                  <a href="https://www.facebook.com/villadelpradoresort" target="_blank" rel="noopener noreferrer" className="booking-embed__alt-link">Facebook</a>
                  <a href="mailto:info@villadelpradoresort.com" className="booking-embed__alt-link">Email Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          EVENT PACKAGES
      ══════════════════════════════════════════════════════ */}
      <section className="booking-packages-section">
        <div className="booking-packages-section__inner">

          <span className="booking-section__tag">Event Packages & Rates</span>
          <h2 className="booking-section__heading">
            Celebrate in <span>Style.</span>
          </h2>
          <p className="booking-section__subheading">
            All packages include dedicated staff support and full resort access.
          </p>

          <div className="booking-packages__grid">
            {eventPackages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>

          <p className="booking-packages__footnote">
            Rates vary during peak seasons (Holy Week, Christmas, New Year, summer). Contact us for current pricing and availability.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="booking-stats-section">
        <div className="booking-stats-section__inner">

          <div className="booking-stats__header">
            <span className="booking-section__tag">Our Track Record</span>
            <h2 className="booking-section__heading">
              Trusted for Every <span>Occasion.</span>
            </h2>
          </div>

          <div className="booking-stats__grid">
            {[
              { stat: '500+',  label: 'Guests Served' },
              { stat: '100+',  label: 'Events Hosted' },
              { stat: '4.8/5', label: 'Event Rating'  },
              { stat: '500m',  label: 'Beachfront'    },
            ].map((s) => (
              <div key={s.label} className="booking-stats__tile">
                <p className="booking-stats__value">{s.stat}</p>
                <p className="booking-stats__label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="booking-faq-section">
        <div className="booking-faq-section__inner">

          <div className="booking-faq__header">
            <span className="booking-section__tag">FAQ</span>
            <h2 className="booking-section__heading">
              Questions? We Have <span>Answers.</span>
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <FaqRow key={i} item={faq} />
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT CTA
      ══════════════════════════════════════════════════════ */}
      <section className="booking-cta-section">
        <div className="booking-cta-section__inner">
          <div className="booking-cta__card">
            {/* Watermark */}
            <div className="booking-cta__watermark">EVENT</div>

            <div className="booking-cta__grid">
              <div>
                <span className="booking-cta__tag">Still Have Questions?</span>
                <h2 className="booking-cta__heading">
                  Our Team is <span>Ready.</span>
                </h2>
                <p className="booking-cta__desc">
                  From intimate beach weddings to full corporate retreats — our dedicated events team handles every detail so you can focus on celebrating.
                </p>
                <div className="booking-cta__actions">
                  <a
                    href="https://www.facebook.com/villadelpradoresort"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="booking-cta__btn"
                  >
                    Message Us
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
                  </a>
                </div>
              </div>

              <div className="booking-cta__tags-grid">
                {['Weddings', 'Debuts', 'Corporate', 'Reunions', 'Birthdays', 'Graduations', 'School Outings', 'Anniversaries'].map((tag) => (
                  <div key={tag} className="booking-cta__event-tag">{tag}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}