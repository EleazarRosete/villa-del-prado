import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ─── ENTRANCE RATES ───────────────────────────────────────────────────────────
const entranceRates = [
  { label: 'Adults',                  dayTour: 'Php 300', overnight: 'Php 600' },
  { label: 'Children (below 4.5 ft)', dayTour: 'Php 200', overnight: 'Php 500' },
  { label: 'Senior / PWD',            dayTour: 'Php 100', overnight: 'Php 400 ' },
];

// ─── ALL CARDS ────────────────────────────────────────────────────────────────
type Card = {
  id: string;
  category: 'Entrance' | 'Huts' | 'Rooms' | 'Villas' | 'Events';
  name: string;
  dayTourRate: string;
  overnightRate: string;
  capacity: string;
  img: string;
  tag: string;
  popular?: boolean;
  desc: string;
  amenities: string[];
};

const cards: Card[] = [
  // ── Entrance ──────────────────────────────────────────────────────────────
  {
    id: 'entrance',
    category: 'Entrance',
    name: 'Entrance Fee',
    dayTourRate: 'From Php 125',
    overnightRate: 'From Php 145',
    capacity: 'All guests',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    tag: 'Gate Fee',
    desc: 'Begin your escape at Demo Beach Resort. All guests are welcomed with access to our pristine shores, lush resort grounds, and world-class facilities upon entry.',
    amenities: ['Pool Access', 'Beach Access', 'Resort Grounds', 'Parking'],
  },
  // ── Huts ──────────────────────────────────────────────────────────────────
  {
    id: 'hut-fiberglass',
    category: 'Huts',
    name: 'Coastal Cabana',
    dayTourRate: 'Php 1,200',
    overnightRate: 'Php 1,560',
    capacity: '8–16 persons',
    img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    tag: 'Hut',
    desc: 'A refined open-air retreat crafted for larger parties, our fiberglass huts offer generous shade, seamless beach access, and a relaxed yet elevated seaside ambiance.',
    amenities: ['Beach Nearby', 'Fan-cooled', 'Communal Area', 'Outdoor Seating'],
  },
  {
    id: 'hut-native-behind',
    category: 'Huts',
    name: 'Garden Nipa Retreat',
    dayTourRate: 'Php 1,560',
    overnightRate: 'Php 1,920',
    capacity: '6–12 persons',
    img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    tag: 'Hut',
    desc: 'Tucked discreetly behind the fiberglass huts, this authentic nipa retreat envelops guests in natural tranquility — a secluded sanctuary where privacy meets timeless Filipino craftsmanship.',
    amenities: ['Natural Ventilation', 'Hammock Area', 'Shaded', 'Communal Space'],
  },
  {
    id: 'hut-native-duplex',
    category: 'Huts',
    name: 'Veranda Nipa Cottage',
    dayTourRate: 'Php 1,560',
    overnightRate: 'Php 1,920',
    capacity: '6–12 persons',
    img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    tag: 'Hut',
    desc: 'This elegantly positioned native hut marries rustic charm with convenience, offering sweeping resort views and effortless access to our premium duplex wing.',
    amenities: ['Natural Ventilation', 'Shaded Porch', 'Resort Views', 'Communal Area'],
  },
  {
    id: 'hut-papag-beach',
    category: 'Huts',
    name: 'Shoreline Papag Sanctuary',
    dayTourRate: 'Php 2,040',
    overnightRate: 'Php 2,400',
    capacity: '6–12 persons',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    tag: 'Beach Front',
    popular: true,
    desc: 'Our most coveted hut, perched directly on the sand with unobstructed panoramic sea views. Fall asleep to the rhythm of the waves and wake up to a private slice of paradise.',
    amenities: ['Beachfront', 'Sea View', 'Natural Ventilation', 'Hammock Area', 'Private Porch'],
  },
  {
    id: 'hut-papag-pool',
    category: 'Huts',
    name: 'Lagoon Papag Retreat',
    dayTourRate: 'Php 2,040',
    overnightRate: 'Php 2,400',
    capacity: '6–12 persons',
    img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    tag: 'Poolside',
    desc: 'Gracefully situated at the pool\'s edge, this nipa hut invites effortless leisure — savour a cool breeze from your shaded porch before stepping straight into crystal-clear waters.',
    amenities: ['Pool Access', 'Natural Ventilation', 'Shaded Porch', 'Resort Views'],
  },
  // ── Rooms ──────────────────────────────────────────────────────────────────
  {
    id: 'room-standard-fan',
    category: 'Rooms',
    name: 'Breeze Standard Room',
    dayTourRate: 'Php 2,640',
    overnightRate: 'Php 3,240',
    capacity: '2–4 persons',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tag: 'Standard',
    popular: true,
    desc: 'Thoughtfully appointed and naturally ventilated, our Standard Fan Room offers a serene haven for couples and intimate groups — understated elegance at exceptional value.',
    amenities: ['Fan-cooled', 'Private Bathroom', 'Wi-Fi', 'Housekeeping'],
  },
  {
    id: 'room-standard-ac',
    category: 'Rooms',
    name: 'Comfort Standard Room',
    dayTourRate: 'Php 3,120',
    overnightRate: 'Php 3,720',
    capacity: '2–4 persons',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tag: 'Standard',
    desc: 'Drift into restful sleep in our climate-controlled Standard Room, where cool comfort and refined furnishings create the perfect retreat after a sun-drenched day by the sea.',
    amenities: ['Air-Conditioned', 'Private Bathroom', 'Wi-Fi', 'Housekeeping'],
  },
  {
    id: 'room-duplex-fan',
    category: 'Rooms',
    name: 'Seawind Duplex Suite',
    dayTourRate: 'Php 4,200',
    overnightRate: 'Php 4,800',
    capacity: '4–10 persons',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    tag: 'Duplex',
    desc: 'Expansive and graciously ventilated, our Duplex Fan Room is crafted for discerning families and groups who value generous space, a private balcony, and an unhurried coastal lifestyle.',
    amenities: ['Fan-cooled', 'Multiple Beds', 'Private Bathroom', 'Balcony'],
  },
  {
    id: 'room-duplex-ac-a',
    category: 'Rooms',
    name: 'Grand Duplex Suite "A"',
    dayTourRate: 'Php 5,400',
    overnightRate: 'Php 6,000',
    capacity: '4–10 persons',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    tag: 'Duplex',
    desc: 'A premium air-conditioned sanctuary for larger groups, Duplex A combines generous proportions, resort-view balcony access, and cool comfort — an indulgent base for an unforgettable stay.',
    amenities: ['Air-Conditioned', 'Multiple Beds', 'Private Bathroom', 'Balcony', 'Resort View'],
  },
  {
    id: 'room-duplex-ac-b',
    category: 'Rooms',
    name: 'Grand Duplex Suite "B"',
    dayTourRate: 'Php 5,760',
    overnightRate: 'Php 6,360',
    capacity: '4–10 persons',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    tag: 'Duplex',
    desc: 'The pinnacle of our duplex collection, Variant B offers lavish space, premium fittings, and serene garden vistas — an exquisite retreat for groups who refuse to compromise on luxury.',
    amenities: ['Air-Conditioned', 'Multiple Beds', 'Private Bathroom', 'Balcony', 'Garden View'],
  },
  {
    id: 'room-villa-double',
    category: 'Villas',
    name: 'Palmera Villa – Double',
    dayTourRate: 'Php 4,800',
    overnightRate: 'Php 5,400',
    capacity: '4–8 persons',
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    tag: 'Villa',
    desc: 'Nestled within verdant resort grounds, our Double Villa exudes refined sophistication — a beautifully appointed escape where lush surroundings and curated comforts converge in perfect harmony.',
    amenities: ['Air-Conditioned', 'Double Bed', 'Private Bathroom', 'Balcony', 'Villa Views'],
  },
  {
    id: 'room-villa-king',
    category: 'Villas',
    name: 'Palmera Villa – King',
    dayTourRate: 'Php 4,800',
    overnightRate: 'Php 5,400',
    capacity: '4–8 persons',
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    tag: 'Villa',
    desc: 'Indulge in the ultimate couples\' retreat. Our King Villa offers a sumptuous king bed, private balcony, and an atmosphere of intimate elegance — where every detail is designed to enchant.',
    amenities: ['Air-Conditioned', 'King Bed', 'Private Bathroom', 'Balcony', 'Villa Views'],
  },
  {
    id: 'room-family',
    category: 'Rooms',
    name: 'Sanctuary Family Suite',
    dayTourRate: 'Php 8,400',
    overnightRate: 'Php 9,000',
    capacity: '4–8 persons',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tag: 'Best Value',
    desc: 'Thoughtfully designed for the entire family, this expansive room blends modern luxury with warm, welcoming interiors — generous sleeping quarters, a private living area, and serene garden views await.',
    amenities: ['Air-Conditioned', 'Multiple Beds', 'Family Bathroom', 'Living Area', 'Garden View'],
  },
  {
    id: 'room-dormitory',
    category: 'Rooms',
    name: 'The Grand Lodge',
    dayTourRate: 'Php 10,200',
    overnightRate: 'Php 10,800',
    capacity: '8–16 persons',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tag: 'Group',
    desc: 'Our air-conditioned dormitory is a masterclass in collective luxury — an impressively appointed group accommodation that delivers premium comfort and unbeatable value for celebrations and large gatherings.',
    amenities: ['Air-Conditioned', 'Bunk Beds', 'Shared Bathroom', 'Group Space'],
  },
  // ── Hall ───────────────────────────────────────────────────────────────────
  {
    id: 'hall-whole-lower',
    category: 'Events',
    name: 'The Grand Ballroom – Lower Level',
    dayTourRate: 'Php 21,600',
    overnightRate: 'Php 27,600',
    capacity: '100–150 persons',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    tag: 'Full Hall',
    desc: 'Command the entire lower-level function hall for your grandest occasions. From lavish weddings to prestigious corporate galas, this full-floor venue sets an unrivalled stage for memories that endure.',
    amenities: ['Up to 150 pax', 'Sound System', 'Air-Conditioned', 'Catering Available', 'Stage Setup', 'Parking'],
  },
  {
    id: 'hall-whole-upper',
    category: 'Events',
    name: 'The Grand Ballroom – Upper Level',
    dayTourRate: 'Php 21,600',
    overnightRate: 'Php 27,600',
    capacity: '100–150 persons',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    tag: 'Full Hall',
    desc: 'Elevated in every sense, the upper-level function hall offers sweeping resort panoramas as the backdrop to your most cherished celebrations — an extraordinary venue for an extraordinary event.',
    amenities: ['Up to 150 pax', 'Sound System', 'Air-Conditioned', 'Catering Available', 'Upper Level View'],
  },
  {
    id: 'hall-half-lower',
    category: 'Events',
    name: 'The Prestige Hall – Lower Level',
    dayTourRate: 'Php 12,000',
    overnightRate: 'Php 15,600',
    capacity: '50–80 persons',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    tag: 'Half Hall',
    desc: 'An intimate yet impressively appointed half-floor venue for mid-size soirées and milestone gatherings — where every guest feels celebrated in an atmosphere of understated refinement.',
    amenities: ['Up to 80 pax', 'Sound System', 'Air-Conditioned', 'Catering Available', 'Flexible Layout'],
  },
  {
    id: 'hall-quarter-lower',
    category: 'Events',
    name: 'The Intimate Salon – Lower Level',
    dayTourRate: 'Php 8,400',
    overnightRate: 'Php 10,800',
    capacity: '20–50 persons',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    tag: 'Quarter Hall',
    desc: 'Perfectly scaled for exclusive private dining, executive meetings, or intimate gatherings, our quarter-floor venue delivers a polished, air-conditioned setting with bespoke catering arrangements.',
    amenities: ['Up to 50 pax', 'Air-Conditioned', 'Catering Available', 'Flexible Setup'],
  },
];

// ─── POLICIES ─────────────────────────────────────────────────────────────────
const policies = [
  {
    title: 'Check-in / Out',
    desc: 'Check-in at 2:00 PM · Check-out at 12:00 NN. Early check-in subject to availability.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Pet Policy',
    desc: 'Pets are not allowed inside the resort premises at any time.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="1.5"/><circle cx="15" cy="7" r="1.5"/>
        <circle cx="6" cy="11" r="1.5"/><circle cx="18" cy="11" r="1.5"/>
        <path d="M12 20c-4 0-7-3-7-6 0-1 .5-2 1.5-2.5S9 11 9 11h6s1.5.5 2.5 1 1.5 1.5 1.5 2.5c0 3-3 6-7 6z"/>
      </svg>
    ),
  },
  {
    title: 'Parking',
    desc: 'Free on-site parking available for all registered guests throughout their stay.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
      </svg>
    ),
  },
  {
    title: 'Payments',
    desc: 'Cash, GCash, and bank transfer accepted. A 50% deposit is required to confirm your booking.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    title: 'Smoking',
    desc: 'Smoking is permitted only in designated outdoor areas. Not allowed inside rooms.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 12H2v4h16"/><path d="M22 12v4"/>
        <path d="M18 8c0-2.5-2-2.5-2-5"/><path d="M22 8c0-2.5-2-2.5-2-5"/>
      </svg>
    ),
  },
  {
    title: 'Reservations',
    desc: '50% deposit required to confirm booking. Remaining balance is due upon check-in.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
];

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.06 }
    );
    document.querySelectorAll('.sr').forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  });
}

// ─── TOUR TYPE TOGGLE ─────────────────────────────────────────────────────────
function TourTypeToggle({ isOvernight, onChange }: { isOvernight: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="accom-toggle">
      <button
        onClick={() => onChange(false)}
        className={`accom-toggle__btn ${!isOvernight ? 'accom-toggle__btn--active' : ''}`}
      >
        ☀ Day Tour
      </button>
      <button
        onClick={() => onChange(true)}
        className={`accom-toggle__btn ${isOvernight ? 'accom-toggle__btn--active' : ''}`}
      >
        🌙 Overnight
      </button>
    </div>
  );
}

// ─── CARD MODAL ───────────────────────────────────────────────────────────────
function CardModal({ card, onClose, isOvernight }: { card: Card | null; onClose: () => void; isOvernight: boolean }) {
  useEffect(() => {
    document.body.style.overflow = card ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [card]);
  useEffect(() => {
    if (!card) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [card, onClose]);

  if (!card) return null;

  const isEntrance = card.category === 'Entrance';
  const displayRate = isOvernight ? card.overnightRate : card.dayTourRate;
  const rateLabel = isOvernight ? 'night' : 'day';

  return (
    <div onClick={onClose} className="accom-modal-backdrop">
      <div onClick={(e) => e.stopPropagation()} className="accom-modal">

        {/* Image */}
        <div className="accom-modal__img-wrap">
          <img src={card.img} alt={card.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.7), transparent 55%)' }} />
          <button onClick={onClose} className="accom-modal__close">×</button>
          <span className="absolute top-3 left-3 accom-tag">{card.tag}</span>
          <span className={`absolute bottom-12 left-4 ${isOvernight ? 'accom-tag--tour-night' : 'accom-tag--tour-day'}`}>
            {isOvernight ? '🌙 Overnight' : '☀ Day Tour'}
          </span>
          <h3 className="absolute bottom-3 left-4 text-white font-black text-xl m-0 pr-4">{card.name}</h3>
        </div>

        {/* Body */}
        <div className="accom-modal__body">
          <p className="text-xs leading-relaxed m-0 font-light" style={{ color: 'rgba(0,0,0,.45)' }}>{card.desc}</p>

          {/* Entrance rates table */}
          {isEntrance && (
            <div>
              <div className="text-[9px] font-extrabold tracking-[.18em] uppercase mb-3" style={{ color: 'var(--brand-primary)' }}>
                {isOvernight ? 'Overnight' : 'Day Tour'} Rates
              </div>
              <div className="overflow-hidden">
                <table className="w-full border-collapse accom-modal__table">
                  <thead>
                    <tr>
                      <th>Guest Type</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entranceRates.map((r, i) => (
                      <tr key={r.label} style={{ background: i % 2 === 0 ? 'white' : '#f9f8f6', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <td>{r.label}</td>
                        <td>{isOvernight ? r.overnight : r.dayTour}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] mt-2 m-0 italic" style={{ color: 'rgba(0,0,0,.35)' }}>
                * Entrance fee is required in addition to accommodation.
              </p>
            </div>
          )}

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {card.amenities.map((a) => (
              <span key={a} className="accom-amenity">{a}</span>
            ))}
          </div>

          {/* Rate + CTA */}
          {!isEntrance && (
            <div className="accom-modal__rate-divider flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="accom-modal__rate-label">
                  {isOvernight ? 'Overnight' : 'Day Tour'} Rate
                </div>
                <span className="accom-modal__rate-value">{displayRate}</span>
                <span className="accom-modal__rate-unit">/ {rateLabel}</span>
                <div className="accom-modal__rate-capacity">👥 {card.capacity}</div>
              </div>
              <Link to="/booking" onClick={onClose} className="accom-modal__book-btn">
                Book Now →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ACCOMMODATION CARD ───────────────────────────────────────────────────────
function AccomCard({ card, onSelect, isOvernight }: { card: Card; onSelect: () => void; isOvernight: boolean }) {
  const isEntrance = card.category === 'Entrance';
  const displayRate = isOvernight ? card.overnightRate : card.dayTourRate;

  return (
    <div
      onClick={onSelect}
      className={`accom-card ${card.popular ? 'accom-card--popular' : ''}`}
    >
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        <img src={card.img} alt={card.name} className="accom-img w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-3 left-3 accom-tag">{card.tag}</span>
        {card.popular && (
          <span className="absolute top-3 right-3 accom-tag--popular">Popular</span>
        )}
        {isEntrance && (
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
            <div className="flex gap-2">
              {entranceRates.map((r) => (
                <div key={r.label} className="accom-rate-tile">
                  <div className="text-white font-black text-xs leading-none">
                    {isOvernight ? r.overnight : r.dayTour}
                  </div>
                  <div className="text-white/60 text-[8px] font-medium mt-0.5 leading-tight">
                    {r.label.replace(' (below 4.5 ft)', '')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-neutral-900 font-bold text-[13px] m-0 leading-tight">{card.name}</h3>
          {!isEntrance && (
            <div className="text-right flex-shrink-0">
              <div className="font-black text-base leading-none" style={{ color: 'var(--brand-primary)' }}>{displayRate}</div>
              <div className="text-[9px] text-neutral-300 font-medium mt-0.5">/ {isOvernight ? 'night' : 'day'}</div>
            </div>
          )}
        </div>
        <p className="text-[11px] text-neutral-400 leading-relaxed mb-3 font-light m-0 line-clamp-2">{card.desc}</p>
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-medium">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>{card.capacity}</span>
          </div>
          <span className="accom-tag--details">Details</span>
        </div>
      </div>
    </div>
  );
}

// ─── POLICIES SECTION ─────────────────────────────────────────────────────────
function PoliciesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpenIndex(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <section className="accom-section accom-section--muted">
      <div className="max-w-4xl mx-auto">
        <div className="sr text-center mb-10">
          <span className="accom-section__tag">Good to Know</span>
          <h2 className="accom-section__heading mt-1">
            Resort <span>Policies.</span>
          </h2>
          <p className="text-neutral-400 text-xs font-light mt-2 m-0">Hover or tap each policy to see details.</p>
        </div>

        <div className="sr sr-d1" ref={containerRef}>
          <div className="accom-policy-bar">
            {policies.map((p, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={p.title}
                  className={`accom-policy-item ${isOpen ? 'accom-policy-item--open' : 'accom-policy-item--closed'}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  onMouseEnter={() => setOpenIndex(i)}
                  onMouseLeave={() => setOpenIndex(null)}
                >
                  <span className={`accom-policy-icon ${isOpen ? 'accom-policy-icon--open' : 'accom-policy-icon--closed'}`}>
                    {p.icon}
                  </span>
                  <span className="text-[8px] font-bold text-neutral-700 leading-tight px-1">{p.title}</span>
                  <svg
                    width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className={`accom-policy-chevron ${isOpen ? 'accom-policy-chevron--open' : 'accom-policy-chevron--closed'}`}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              );
            })}
          </div>

          <div className={`accom-policy-drawer ${openIndex !== null ? 'accom-policy-drawer--open' : 'accom-policy-drawer--closed'}`}>
            {policies.map((p, i) => (
              <div
                key={p.title}
                className="accom-policy-drawer__content"
                style={{ display: openIndex === i ? 'block' : 'none' }}
              >
                <p className="m-0 leading-relaxed text-[11px] font-light" style={{ color: '#444', letterSpacing: '.01em' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── LOCATION SECTION ────────────────────────────────────────────────────────
function LocationSection() {
  const lat = 12.8797;
  const lng = 121.7740;

  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=5&output=embed`;

  const directions = [
    {
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
      from: 'Via SLEX',
      time: '2.5–3 hrs',
      desc: 'SLEX → Destination A Exit → Destination B → Destination C.',
    },
    {
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="22" height="13" rx="2"/><path d="M5 16v2"/><path d="M19 16v2"/><path d="M1 10h22"/></svg>,
      from: 'Bus from Manila',
      time: '3–4 hrs',
      desc: 'Terminal bus. Alight at Destination A terminal, then tricycle to resort.',
    },
    {
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
      from: 'From Destination A',
      time: '~30 mins',
      desc: 'Jeepney or van from Destination A to Destination B, then tricycle.',
    },
  ];

  return (
    <section id="location" className="accom-section">
      <div className="max-w-7xl mx-auto">
        <div className="sr mb-8">
          <span className="accom-section__tag">How to Get Here</span>
          <h2 className="accom-section__heading">
            Find <span>Demo Beach Resort.</span>
          </h2>
          <p className="text-neutral-400 text-sm font-light mt-1 m-0">Batangas — a few hours south of Manila.</p>
        </div>

        <div className="sr accom-location__map-wrap">
          <div className="accom-location__map-header">
            <div className="flex items-center gap-2.5 min-w-0">
              <span style={{ color: 'var(--brand-primary)', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                </svg>
              </span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-neutral-800 truncate">Demo Pool and Beach Resort</div>
                <div className="text-[10px] text-neutral-400 font-medium">Philippines</div>
              </div>
            </div>
          </div>
          <iframe
            title="Demo Beach Resort Location"
            src={mapSrc}
            width="100%"
            height="380"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="sr sr-d1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Address card */}
          <div className="accom-location__address-card">
            <div className="accom-location__address-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <div className="accom-section__tag" style={{ fontSize: '9px', letterSpacing: '0.18em', marginBottom: '0.25rem' }}>Address</div>
              <p className="text-[11px] text-neutral-500 font-light leading-relaxed m-0">
                Purok 1<br/>Brgy. Demo<br/>Batangas
              </p>
              <div className="flex flex-col gap-1 mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                {[
                  { icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.42 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, text: '+63 XXX XXX XXXX' },
                  { icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: 'info@villadelprado.ph' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
                    <span style={{ color: 'rgba(0,0,0,.28)', flexShrink: 0 }}>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Direction cards */}
          {directions.map((d, i) => (
            <div key={i} className="accom-location__dir-card">
              <div className="flex items-start justify-between gap-2">
                <div className="accom-location__dir-icon">{d.icon}</div>
                <span className="accom-location__time-badge">{d.time}</span>
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-800 mb-1">{d.from}</div>
                <p className="text-[10px] text-neutral-400 font-light leading-relaxed m-0">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Accommodations() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Huts');
  const [isOvernight, setIsOvernight] = useState<boolean>(true);

  useScrollReveal();

  const filterButtons = ['Huts', 'Rooms', 'Villas', 'Hall'];

  const effectiveCategory = activeCategory === 'All' ? 'Huts' : activeCategory;
  const categoryKey = effectiveCategory === 'Hall' ? 'Events' : effectiveCategory;

  const entranceCard = cards.find((c) => c.category === 'Entrance')!;
  const restCards = cards.filter((c) => c.category !== 'Entrance');

  const visibleCards: Card[] = [entranceCard, ...restCards.filter((c) => c.category === categoryKey)];

  return (
    <div className="w-full overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="accom-hero">
        <div className="accom-hero__bg" />
        <div className="accom-hero__overlay-base" />
        <div className="accom-hero__overlay-top" />
        <div className="accom-hero__overlay-bottom" />

        <div className="accom-hero__content">
          <div className="accom-hero__eyebrow">
            <div className="accom-hero__eyebrow-line" />
            <span className="accom-hero__eyebrow-text">Accommodations Collection</span>
            <div className="accom-hero__eyebrow-line" />
          </div>

          <h1 className="accom-hero__h1">
            <span className="accom-hero__line1">Where</span>
            <span className="accom-hero__line2">You'll Stay</span>
          </h1>

          <p className="accom-hero__subtitle">
            Every stay is a memory. Browse our curated collection of huts, rooms,
            villas, and event halls at Demo Beach Resort.
          </p>

          <div className="accom-hero__browse">
            <a
              href="#rooms"
              className="accom-hero__browse-label"
              onClick={(e) => { e.preventDefault(); document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Browse
            </a>
            <svg
              className="accom-hero__chevron"
              width="22" height="13" viewBox="0 0 22 13" fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline
                points="1,1 11,11 21,1"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══ ACCOMMODATIONS SECTION ═══ */}
      <section id="rooms" className="accom-section">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="sr flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="accom-section__tag">Where You'll Stay</span>
              <h2 className="accom-section__heading">
                Our <span>Accommodations.</span>
              </h2>
            </div>
            <Link
              to="/booking"
              className="accom-book-link flex-shrink-0"
            >
              Book a Room
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>

          {/* Tour Type Toggle + Filter Row */}
          <div className="sr flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-[9px] font-extrabold tracking-[.15em] uppercase mb-1" style={{ color: 'rgba(0,0,0,.35)' }}>
                Select Visit Type
              </span>
              <TourTypeToggle isOvernight={isOvernight} onChange={setIsOvernight} />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {filterButtons.map((btn) => {
                const active = effectiveCategory === btn;
                return (
                  <button
                    key={btn}
                    onClick={() => setActiveCategory(btn)}
                    className={`accom-filter-btn ${active ? 'accom-filter-btn--active' : ''}`}
                  >
                    {btn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards grid */}
          <div className="sr grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleCards.map((card) => (
              <AccomCard key={card.id} card={card} onSelect={() => setSelectedCard(card)} isOvernight={isOvernight} />
            ))}
          </div>
        </div>
      </section>

      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} isOvernight={isOvernight} />

      {/* ═══ LOCATION ═══ */}
      <LocationSection />

      {/* ═══ POLICIES ═══ */}
      <PoliciesSection />

      {/* ═══ CTA ═══ */}
      <section className="accom-section py-20 text-center">
        <div className="max-w-xl mx-auto">
          <div className="sr">
            <h2 className="accom-cta__heading">Found Your Perfect Room?</h2>
            <div className="accom-cta__divider" />
            <p className="text-neutral-400 text-sm font-light leading-relaxed mb-8 m-0">
              Book directly and secure your stay. A 50% deposit confirms your reservation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/booking" className="accom-cta__book-btn">Reserve Now</Link>
              <a
                href="https://www.facebook.com/eleazar.rosete.2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="accom-cta__msg-btn"
              >
                Message Us
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}