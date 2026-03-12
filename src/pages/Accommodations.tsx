import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ─── BRAND ───────────────────────────────────────────────────────────────────
const P  = '#0077a8';
const PD = '#005f8a';
const PL = '#e0f2fa';
const PG = 'rgba(0,119,168,0.25)';

// ─── ENTRANCE RATES ───────────────────────────────────────────────────────────
const entranceRates = [
  { label: 'Adults',                  dayTour: 'Php 130', overnight: 'Php 150' },
  { label: 'Children (below 4.5 ft)', dayTour: 'Php 110', overnight: 'Php 130' },
  { label: 'Senior / PWD',            dayTour: 'Php 104', overnight: 'Php 120' },
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
    dayTourRate: 'From Php 104',
    overnightRate: 'From Php 120',
    capacity: 'All guests',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    tag: 'Gate Fee',
    desc: 'Admission rates for Villa Del Prado Beach Resort. All guests must pay the entrance fee in addition to accommodation.',
    amenities: ['Pool Access', 'Beach Access', 'Resort Grounds', 'Parking'],
  },
  // ── Huts ──────────────────────────────────────────────────────────────────
  {
    id: 'hut-fiberglass',
    category: 'Huts',
    name: 'Fiberglass Hut',
    dayTourRate: 'Php 1,000',
    overnightRate: 'Php 1,300',
    capacity: '8–16 persons',
    img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    tag: 'Hut',
    desc: 'Sturdy fiberglass huts perfect for larger groups, with ample shade and easy beach access.',
    amenities: ['Beach Nearby', 'Fan-cooled', 'Communal Area', 'Outdoor Seating'],
  },
  {
    id: 'hut-native-behind',
    category: 'Huts',
    name: 'Native Hut Behind Fiberglass Huts',
    dayTourRate: 'Php 1,300',
    overnightRate: 'Php 1,600',
    capacity: '6–12 persons',
    img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    tag: 'Hut',
    desc: 'Authentic nipa hut nestled behind the fiberglass huts, offering a more private and shaded retreat.',
    amenities: ['Natural Ventilation', 'Hammock Area', 'Shaded', 'Communal Space'],
  },
  {
    id: 'hut-native-duplex',
    category: 'Huts',
    name: 'Native Hut Near Duplex',
    dayTourRate: 'Php 1,300',
    overnightRate: 'Php 1,600',
    capacity: '6–12 persons',
    img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    tag: 'Hut',
    desc: 'Traditional native hut conveniently located near the duplex rooms, blending rustic charm with easy resort access.',
    amenities: ['Natural Ventilation', 'Shaded Porch', 'Resort Views', 'Communal Area'],
  },
  {
    id: 'hut-papag-beach',
    category: 'Huts',
    name: 'Native Hut Papag Beach Front',
    dayTourRate: 'Php 1,700',
    overnightRate: 'Php 2,000',
    capacity: '6–12 persons',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    tag: 'Beach Front',
    popular: true,
    desc: 'Prime beachfront nipa hut with direct sand access and unobstructed sea views — the most sought-after hut.',
    amenities: ['Beachfront', 'Sea View', 'Natural Ventilation', 'Hammock Area', 'Private Porch'],
  },
  {
    id: 'hut-papag-pool',
    category: 'Huts',
    name: 'Native Hut Papag Poolside',
    dayTourRate: 'Php 1,700',
    overnightRate: 'Php 2,000',
    capacity: '6–12 persons',
    img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    tag: 'Poolside',
    desc: 'Charming nipa hut right beside the pool, ideal for families who want quick dips between relaxing in the hut.',
    amenities: ['Pool Access', 'Natural Ventilation', 'Shaded Porch', 'Resort Views'],
  },
  // ── Rooms ──────────────────────────────────────────────────────────────────
  {
    id: 'room-standard-fan',
    category: 'Rooms',
    name: 'Standard Room Fan',
    dayTourRate: 'Php 2,200',
    overnightRate: 'Php 2,700',
    capacity: '2–4 persons',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tag: 'Standard',
    popular: true,
    desc: 'Comfortable fan-cooled standard room — great value for couples or small groups looking for a cozy stay.',
    amenities: ['Fan-cooled', 'Private Bathroom', 'Wi-Fi', 'Housekeeping'],
  },
  {
    id: 'room-standard-ac',
    category: 'Rooms',
    name: 'Standard Room Air-Conditioned',
    dayTourRate: 'Php 2,600',
    overnightRate: 'Php 3,100',
    capacity: '2–4 persons',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tag: 'Standard',
    desc: 'Air-conditioned standard room for a cool, restful night after a day on the beach.',
    amenities: ['Air-Conditioned', 'Private Bathroom', 'Wi-Fi', 'Housekeeping'],
  },
  {
    id: 'room-duplex-fan',
    category: 'Rooms',
    name: 'Duplex Room Fan',
    dayTourRate: 'Php 3,500',
    overnightRate: 'Php 4,000',
    capacity: '4–10 persons',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    tag: 'Duplex',
    desc: 'Spacious fan-cooled duplex room ideal for large families or groups wanting more space.',
    amenities: ['Fan-cooled', 'Multiple Beds', 'Private Bathroom', 'Balcony'],
  },
  {
    id: 'room-duplex-ac-a',
    category: 'Rooms',
    name: 'Duplex Room Air-Conditioned "A"',
    dayTourRate: 'Php 4,500',
    overnightRate: 'Php 5,000',
    capacity: '4–10 persons',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    tag: 'Duplex',
    desc: 'Premium air-conditioned duplex room variant A — cool, roomy, and perfect for extended stays.',
    amenities: ['Air-Conditioned', 'Multiple Beds', 'Private Bathroom', 'Balcony', 'Resort View'],
  },
  {
    id: 'room-duplex-ac-b',
    category: 'Rooms',
    name: 'Duplex Room Air-Conditioned "B"',
    dayTourRate: 'Php 4,800',
    overnightRate: 'Php 5,300',
    capacity: '4–10 persons',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    tag: 'Duplex',
    desc: 'Top-tier duplex room variant B with premium fittings and extra space for large groups.',
    amenities: ['Air-Conditioned', 'Multiple Beds', 'Private Bathroom', 'Balcony', 'Garden View'],
  },
  {
    id: 'room-villa-double',
    category: 'Villas',
    name: 'Resort Villas Double',
    dayTourRate: 'Php 4,000',
    overnightRate: 'Php 4,500',
    capacity: '4–8 persons',
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    tag: 'Villa',
    desc: 'Elegant resort villa with double bed configuration — refined comfort in a lush resort setting.',
    amenities: ['Air-Conditioned', 'Double Bed', 'Private Bathroom', 'Balcony', 'Villa Views'],
  },
  {
    id: 'room-villa-king',
    category: 'Villas',
    name: 'Resort Villas King',
    dayTourRate: 'Php 4,000',
    overnightRate: 'Php 4,500',
    capacity: '4–8 persons',
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    tag: 'Villa',
    desc: 'Elegant resort villa with a king bed — ideal for couples seeking a premium, private retreat.',
    amenities: ['Air-Conditioned', 'King Bed', 'Private Bathroom', 'Balcony', 'Villa Views'],
  },
  {
    id: 'room-family',
    category: 'Rooms',
    name: 'Family Room',
    dayTourRate: 'Php 7,000',
    overnightRate: 'Php 7,500',
    capacity: '4–8 persons',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tag: 'Best Value',
    desc: 'Spacious family room with modern comforts and ample sleeping space — perfect for the whole family.',
    amenities: ['Air-Conditioned', 'Multiple Beds', 'Family Bathroom', 'Living Area', 'Garden View'],
  },
  {
    id: 'room-dormitory',
    category: 'Rooms',
    name: 'Dormitory',
    dayTourRate: 'Php 8,500',
    overnightRate: 'Php 9,000',
    capacity: '8–16 persons',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    tag: 'Group',
    desc: 'Large dormitory-style accommodation for big groups — the most cost-effective option for parties and events.',
    amenities: ['Air-Conditioned', 'Bunk Beds', 'Shared Bathroom', 'Group Space'],
  },
  // ── Hall ───────────────────────────────────────────────────────────────────
  {
    id: 'hall-whole-lower',
    category: 'Events',
    name: 'Hall Whole Floor – Lower Level',
    dayTourRate: 'Php 18,000',
    overnightRate: 'Php 23,000',
    capacity: '100–150 persons',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    tag: 'Full Hall',
    desc: 'Full lower-level function hall for grand celebrations — weddings, debuts, reunions, and corporate events.',
    amenities: ['Up to 150 pax', 'Sound System', 'Air-Conditioned', 'Catering Available', 'Stage Setup', 'Parking'],
  },
  {
    id: 'hall-whole-upper',
    category: 'Events',
    name: 'Hall Whole Floor – Upper Level',
    dayTourRate: 'Php 18,000',
    overnightRate: 'Php 23,000',
    capacity: '100–150 persons',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    tag: 'Full Hall',
    desc: 'Full upper-level function hall with elevated views — a stunning backdrop for your special event.',
    amenities: ['Up to 150 pax', 'Sound System', 'Air-Conditioned', 'Catering Available', 'Upper Level View'],
  },
  {
    id: 'hall-half-lower',
    category: 'Events',
    name: 'Hall Half Floor – Lower Level',
    dayTourRate: 'Php 10,000',
    overnightRate: 'Php 13,000',
    capacity: '50–80 persons',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    tag: 'Half Hall',
    desc: 'Half of the lower-level function hall for mid-size gatherings — ideal for intimate celebrations.',
    amenities: ['Up to 80 pax', 'Sound System', 'Air-Conditioned', 'Catering Available', 'Flexible Layout'],
  },
  {
    id: 'hall-quarter-lower',
    category: 'Events',
    name: 'Hall 1/4 Floor – Lower Level',
    dayTourRate: 'Php 7,000',
    overnightRate: 'Php 9,000',
    capacity: '20–50 persons',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    tag: 'Quarter Hall',
    desc: 'Quarter section of the lower-level hall — perfect for small gatherings, meetings, or intimate parties.',
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
    <div className="flex items-center justify-center gap-0 p-1" style={{ background: 'rgba(0,0,0,0.06)', display: 'inline-flex' }}>
      <button
        onClick={() => onChange(false)}
        className="text-[10px] font-extrabold tracking-[.14em] uppercase px-5 py-2 transition-all duration-300"
        style={{
          background: !isOvernight ? P : 'transparent',
          color: !isOvernight ? 'white' : 'rgba(0,0,0,.45)',
          boxShadow: !isOvernight ? `0 2px 12px ${PG}` : 'none',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 0,
        }}
      >
        ☀ Day Tour
      </button>
      <button
        onClick={() => onChange(true)}
        className="text-[10px] font-extrabold tracking-[.14em] uppercase px-5 py-2 transition-all duration-300"
        style={{
          background: isOvernight ? P : 'transparent',
          color: isOvernight ? 'white' : 'rgba(0,0,0,.45)',
          boxShadow: isOvernight ? `0 2px 12px ${PG}` : 'none',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 0,
        }}
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
    <div onClick={onClose} className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', animation: 'fadeIn .25s ease' }}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-full sm:max-w-[560px] overflow-hidden flex flex-col"
        style={{ borderRadius: 0, maxHeight: '92vh', boxShadow: '0 -8px 60px rgba(0,0,0,.25)', animation: 'modalPop .35s cubic-bezier(.16,1,.3,1) both' }}>

        {/* Image */}
        <div className="relative flex-shrink-0" style={{ height: 200 }}>
          <img src={card.img} alt={card.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.7), transparent 55%)' }} />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-lg"
            style={{ background: 'rgba(255,255,255,.9)', color: '#444', border: 'none', cursor: 'pointer', fontWeight: 700, borderRadius: 0 }}>×</button>
          <span className="absolute top-3 left-3 text-white text-[8px] font-black tracking-[.2em] uppercase px-3 py-1.5" style={{ background: P, borderRadius: 0 }}>{card.tag}</span>
          {/* Tour type badge */}
          <span className="absolute bottom-12 left-4 text-white text-[8px] font-extrabold tracking-[.14em] uppercase px-2.5 py-1"
            style={{ background: isOvernight ? 'rgba(0,0,0,0.55)' : 'rgba(255,165,0,0.8)', backdropFilter: 'blur(4px)', borderRadius: 0 }}>
            {isOvernight ? '🌙 Overnight' : '☀ Day Tour'}
          </span>
          <h3 className="absolute bottom-3 left-4 text-white font-black text-xl m-0 pr-4">{card.name}</h3>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-5">
          <p className="text-xs leading-relaxed m-0" style={{ color: 'rgba(0,0,0,.45)', fontWeight: 300 }}>{card.desc}</p>

          {/* Entrance rates table */}
          {isEntrance && (
            <div>
              <div className="text-[9px] font-extrabold tracking-[.18em] uppercase mb-3" style={{ color: P }}>
                {isOvernight ? 'Overnight' : 'Day Tour'} Rates
              </div>
              <div className="overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr style={{ background: P }}>
                      <th className="text-left px-4 py-2.5 text-white text-[9px] font-extrabold tracking-[.12em] uppercase">Guest Type</th>
                      <th className="text-right px-4 py-2.5 text-white text-[9px] font-extrabold tracking-[.12em] uppercase">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entranceRates.map((r, i) => (
                      <tr key={r.label} style={{ background: i % 2 === 0 ? 'white' : '#f9f8f6', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <td className="px-4 py-3 text-xs font-medium text-neutral-700">{r.label}</td>
                        <td className="px-4 py-3 text-right font-black text-xs transition-all duration-300" style={{ color: P }}>
                          {isOvernight ? r.overnight : r.dayTour}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] mt-2 m-0" style={{ color: 'rgba(0,0,0,.35)', fontStyle: 'italic' }}>
                * Entrance fee is required in addition to accommodation.
              </p>
            </div>
          )}

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {card.amenities.map((a) => (
              <span key={a} className="text-[10px] font-medium px-3 py-1.5" style={{ background: '#f5f3ee', color: 'rgba(0,0,0,.55)', borderRadius: 0 }}>{a}</span>
            ))}
          </div>

          {/* Rate + CTA */}
          {!isEntrance && (
            <div className="flex items-center justify-between pt-4 flex-wrap gap-3" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <div>
                <div className="text-[9px] font-bold tracking-[.12em] uppercase mb-0.5" style={{ color: 'rgba(0,0,0,.35)' }}>
                  {isOvernight ? 'Overnight' : 'Day Tour'} Rate
                </div>
                <span className="font-black text-[28px] transition-all duration-300" style={{ color: P }}>{displayRate}</span>
                <span className="text-xs ml-1.5" style={{ color: 'rgba(0,0,0,.35)' }}>/ {rateLabel}</span>
                <div className="text-[10px] mt-0.5" style={{ color: 'rgba(0,0,0,.35)' }}>👥 {card.capacity}</div>
              </div>
              <Link to="/booking" onClick={onClose}
                className="inline-flex items-center text-white text-[10px] font-black tracking-[.18em] uppercase px-7 py-3"
                style={{ background: `linear-gradient(to bottom right, ${P}, ${PD})`, boxShadow: `0 4px 18px ${PG}`, borderRadius: 0 }}>
                Book Now ✦
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
    <div onClick={onSelect}
      className="accom-card overflow-hidden cursor-pointer bg-white"
      style={{ boxShadow: '0 3px 18px rgba(0,0,0,.07)', borderRadius: 0, ...(card.popular ? { outline: `2px solid ${P}` } : {}) }}>
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        <img src={card.img} alt={card.name} className="accom-img w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-3 left-3 text-white text-[8px] font-extrabold tracking-[.15em] uppercase px-2.5 py-1" style={{ background: P, borderRadius: 0 }}>{card.tag}</span>
        {card.popular && <span className="absolute top-3 right-3 bg-amber-400 text-white text-[7px] font-extrabold tracking-[.12em] uppercase px-2 py-1" style={{ borderRadius: 0 }}>Popular</span>}
        {isEntrance && (
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
            <div className="flex gap-2">
              {entranceRates.map((r) => (
                <div key={r.label} className="flex-1 text-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', borderRadius: 0, padding: '6px 4px' }}>
                  <div className="text-white font-black text-xs leading-none transition-all duration-300">
                    {isOvernight ? r.overnight : r.dayTour}
                  </div>
                  <div className="text-white/60 text-[8px] font-medium mt-0.5 leading-tight">{r.label.replace(' (below 4.5 ft)', '')}</div>
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
              <div className="font-black text-base leading-none transition-all duration-300" style={{ color: P }}>{displayRate}</div>
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
          <span className="text-[8px] font-extrabold tracking-[.15em] uppercase px-3 py-1.5" style={{ background: PL, color: P, borderRadius: 0 }}>Details →</span>
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
    <section className="py-20 px-5 sm:px-8 lg:px-[10%]" style={{ background: '#edeae3' }}>
      <div className="max-w-4xl mx-auto">
        <div className="sr text-center mb-10">
          <span className="inline-block text-[9px] font-extrabold tracking-[.2em] uppercase px-4 py-1.5 mb-3" style={{ background: PL, color: P, borderRadius: 0 }}>
            Good to Know
          </span>
          <h2 className="font-black tracking-tight text-neutral-900 m-0 mt-1" style={{ fontSize: 'clamp(26px, 5vw, 48px)', fontFamily: "'Montserrat', sans-serif" }}>
            Resort <span style={{ color: P }}>Policies.</span>
          </h2>
          <p className="text-neutral-400 text-xs font-light mt-2 m-0">Hover or tap each policy to see details.</p>
        </div>

        <div className="sr sr-d1" ref={containerRef}>
          <div className="flex" style={{ borderRadius: 0, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,.08)' }}>
            {policies.map((p, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={p.title}
                  className="flex flex-col items-center justify-center text-center cursor-pointer select-none transition-colors duration-200"
                  style={{
                    flex: '1 1 0', minWidth: 0,
                    background: isOpen ? '#c8c3b8' : 'white',
                    borderRight: i < policies.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                    padding: '18px 8px 14px',
                  }}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  onMouseEnter={() => setOpenIndex(i)}
                  onMouseLeave={() => setOpenIndex(null)}
                >
                  <span className="mb-2 transition-colors duration-200" style={{ color: isOpen ? P : 'rgba(0,0,0,.38)' }}>{p.icon}</span>
                  <span className="text-[8px] font-bold text-neutral-700 leading-tight px-1">{p.title}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="mt-1.5" style={{ color: isOpen ? P : 'rgba(0,0,0,.2)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              );
            })}
          </div>

          <div
            style={{
              background: 'white',
              borderRadius: 0,
              maxHeight: openIndex !== null ? 100 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.28s ease',
              boxShadow: openIndex !== null ? '0 8px 24px rgba(0,0,0,.08)' : 'none',
            }}
          >
            {policies.map((p, i) => (
              <div
                key={p.title}
                style={{
                  display: openIndex === i ? 'block' : 'none',
                  padding: '12px 24px 14px',
                  borderTop: `2px solid ${P}44`,
                }}
              >
                <p className="m-0 leading-relaxed" style={{ fontSize: '11px', fontWeight: 300, color: '#444', letterSpacing: '.01em' }}>
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
  const lat = 13.8484124;
  const lng = 121.4862107;
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd37b21eb4484f%3A0x460e574fb19ac4f3!2sVilla%20Del%20Prado%20Pool%20and%20Beach%20Resort!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph`;

  const directions = [
    {
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
      from: 'Via SLEX',
      time: '2.5–3 hrs',
      desc: 'SLEX → Lucena Exit → Sariaya → coastal road to Talaan Aplaya.',
    },
    {
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="22" height="13" rx="2"/><path d="M5 16v2"/><path d="M19 16v2"/><path d="M1 10h22"/></svg>,
      from: 'Bus from Manila',
      time: '3–4 hrs',
      desc: 'JAM or Lucena-bound bus. Alight at Sariaya terminal, then tricycle to resort.',
    },
    {
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
      from: 'From Lucena City',
      time: '~30 mins',
      desc: 'Jeepney or van from Lucena Grand Terminal to Sariaya, then tricycle.',
    },
  ];

  return (
    <section id="location" className="py-20 px-5 sm:px-8 lg:px-[10%]" style={{ background: '#f5f3ee' }}>
      <div className="max-w-7xl mx-auto">
        <div className="sr mb-8">
          <span className="inline-block text-[9px] font-extrabold tracking-[.2em] uppercase px-4 py-1.5 mb-3" style={{ background: PL, color: P, borderRadius: 0 }}>How to Get Here</span>
          <h2 className="font-black tracking-tight leading-tight text-neutral-900 m-0" style={{ fontSize: 'clamp(26px, 5vw, 54px)', fontFamily: "'Montserrat', sans-serif" }}>
            Find <span style={{ color: P }}>Villa Del Prado.</span>
          </h2>
          <p className="text-neutral-400 text-sm font-light mt-1 m-0">Sariaya, Quezon Province — a few hours south of Manila.</p>
        </div>

        <div className="sr overflow-hidden mb-5" style={{ borderRadius: 0, boxShadow: '0 12px 48px rgba(0,0,0,.12)' }}>
          <div className="flex items-center justify-between gap-3 px-5 py-3 bg-white" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-2.5 min-w-0">
              <span style={{ color: P, flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                </svg>
              </span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-neutral-800 truncate">Villa Del Prado Pool and Beach Resort</div>
                <div className="text-[10px] text-neutral-400 font-medium">Sitio Kanluran, Brgy. Talaan Aplaya, Sariaya, Quezon</div>
              </div>
            </div>
            <a href={`https://www.google.com/maps/place/Villa+Del+Prado+Pool+and+Beach+Resort/@${lat},${lng},17z`}
              target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-1.5 text-[9px] font-extrabold tracking-[.12em] uppercase px-3 py-1.5 transition-opacity hover:opacity-70"
              style={{ background: PL, color: P, borderRadius: 0 }}>
              Open Maps
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
          </div>
          <iframe title="Villa Del Prado Location" src={mapSrc} width="100%" height="380" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>

        <div className="sr sr-d1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 flex flex-col justify-between" style={{ borderRadius: 0, boxShadow: '0 3px 14px rgba(0,0,0,.06)' }}>
            <div className="w-8 h-8 flex items-center justify-center mb-3" style={{ background: `linear-gradient(135deg, ${P}, ${PD})`, borderRadius: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <div className="text-[9px] font-extrabold tracking-[.18em] uppercase mb-1" style={{ color: P }}>Address</div>
              <p className="text-[11px] text-neutral-500 font-light leading-relaxed m-0">
                Sitio Kanluran<br/>Brgy. Talaan Aplaya<br/>Sariaya, 4322 Quezon
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

          {directions.map((d, i) => (
            <div key={i} className="bg-white p-5 flex flex-col gap-3" style={{ borderRadius: 0, boxShadow: '0 3px 14px rgba(0,0,0,.05)' }}>
              <div className="flex items-start justify-between gap-2">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: '#edeae3', color: P, borderRadius: 0 }}>{d.icon}</div>
                <span className="text-[8px] font-extrabold tracking-[.12em] uppercase px-2 py-1" style={{ background: PL, color: P, borderRadius: 0 }}>{d.time}</span>
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
    <div className="w-full overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif", background: '#f5f3ee' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600;1,700&family=Dancing+Script:wght@700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes modalPop { from { opacity:0; transform:scale(.93) translateY(18px); } to { opacity:1; transform:none; } }
        @keyframes kenBurns { 0% { transform:scale(1.06); } 100% { transform:scale(1.0); } }

        .sr { opacity:0; transform:translateY(20px); transition:opacity .7s ease, transform .7s ease; }
        .sr.in-view { opacity:1; transform:none; }
        .sr-d1 { transition-delay:.08s; }
        .sr-d2 { transition-delay:.18s; }

        .accom-card { transition: transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s ease; }
        .accom-card:hover { transform:translateY(-6px); box-shadow:0 24px 56px rgba(0,0,0,.13) !important; }
        .accom-card:hover .accom-img { transform:scale(1.07); }
        .accom-img { transition:transform .6s ease; }

        .filter-btn { transition: background .2s ease, color .2s ease, box-shadow .2s ease; }
        table { border-collapse: collapse; }
        td, th { font-family: 'Montserrat', sans-serif; }

        .price-animate { transition: all 0.3s cubic-bezier(.16,1,.3,1); }

        /* Force Montserrat everywhere except Dancing Script elements */
        body, h1, h2, h3, h4, h5, h6, p, span, div, button, a, input, select, textarea {
          font-family: 'Montserrat', sans-serif !important;
        }
        .dancing-script {
          font-family: 'Dancing Script', cursive !important;
        }
        .hero-serif {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
        }
        @keyframes heroLine { from { width: 0; opacity: 0; } to { width: 60px; opacity: 1; } }
        @keyframes heroBrowse { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform: none; } }
        @keyframes chevronBob {
          0%, 100% { transform: translateY(0px); opacity: 0.55; }
          50%       { transform: translateY(9px); opacity: 0.85; }
        }
        .hero-browse-line { animation: heroBrowse 1s ease 1.2s both; }
        .scroll-indicator { animation: heroBrowse 1s ease 1.4s both; }
        .chevron-bob { animation: chevronBob 2.4s cubic-bezier(0.45, 0, 0.55, 1) 1.6s infinite; }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden w-full" style={{ height: '100vh', minHeight: 600, paddingTop: 70 }}>
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80&auto=format')", animation: 'kenBurns 18s ease-out forwards' }} />
        {/* Multi-layer dark overlay for depth */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.38)' }} />
        <div className="absolute inset-x-0 top-0" style={{ height: '50%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)' }} />
        <div className="absolute inset-x-0 bottom-0" style={{ height: '35%', background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)' }} />

        {/* Content — centered */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

          {/* Eyebrow label — like "PHOTOGRAPHY COLLECTION —" in reference */}
          <div className="flex items-center gap-3 mb-6" style={{ animation: 'fadeUp .6s cubic-bezier(.16,1,.3,1) .1s both' }}>
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.45)' }} />
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.60)',
            }}>
              Accommodations Collection
            </span>
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.45)' }} />
          </div>

          {/* Main headline — serif display like "Moments" in reference */}
          <h1 className="m-0 leading-none" style={{ animation: 'fadeUp .9s cubic-bezier(.16,1,.3,1) .25s both' }}>
            {/* Line 1: upright serif, large — mirrors "Moments" */}
            <span className="hero-serif block" style={{
              fontSize: 'clamp(64px, 11vw, 130px)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 0.88,
              letterSpacing: '-0.01em',
            }}>
              Where
            </span>
            {/* Line 2: italic serif, slightly larger — mirrors "Worth Keeping" */}
            <span className="hero-serif block" style={{
              fontSize: 'clamp(58px, 10.5vw, 124px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'white',
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
            }}>
              You'll Stay
            </span>
          </h1>

          {/* Subtitle body copy — like reference body text */}
          <p className="mt-6 mb-0" style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'clamp(12px, 1.5vw, 14px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.60)',
            maxWidth: 340,
            lineHeight: 1.7,
            letterSpacing: '0.02em',
            animation: 'fadeUp .8s cubic-bezier(.16,1,.3,1) .55s both',
          }}>
            Every stay is a memory. Browse our curated collection of huts, rooms,
            villas, and event halls at Villa Del Prado.
          </p>

          {/* Browse CTA — label + bouncing chevron */}
          <div className="hero-browse-line flex flex-col items-center" style={{ marginTop: '6vh' }}>
            <Link to="#rooms"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
              }}
              onClick={(e) => { e.preventDefault(); document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Browse
            </Link>
            {/* Chevron-down with bob animation — spaced further from label */}
            <div className="scroll-indicator" style={{ marginTop: '1vh' }}>
              <svg
                className="chevron-bob"
                width="22" height="13" viewBox="0 0 22 13" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
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
        </div>
      </section>

      {/* ═══ ACCOMMODATIONS SECTION ═══ */}
      <section id="rooms" className="py-20 px-5 sm:px-8 lg:px-[10%]" style={{ background: '#f5f3ee' }}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="sr flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-block text-[9px] font-extrabold tracking-[.2em] uppercase px-4 py-1.5 mb-3" style={{ background: PL, color: P, borderRadius: 0 }}>Where You'll Stay</span>
              <h2 className="font-black tracking-tight leading-tight text-neutral-900 m-0" style={{ fontSize: 'clamp(26px, 5vw, 54px)', fontFamily: "'Montserrat', sans-serif" }}>
                Our <span style={{ color: P }}>Accommodations.</span>
              </h2>
            </div>
            <Link to="/booking" className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-[.15em] uppercase flex-shrink-0 group hover:-translate-y-0.5 transition-all" style={{ color: P }}>
              Book a Room
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>

          {/* Tour Type Toggle + Filter Row */}
          <div className="sr flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            {/* Day Tour / Overnight Toggle */}
            <div className="flex flex-col items-center sm:items-start gap-1">
              <span className="text-[9px] font-extrabold tracking-[.15em] uppercase mb-1" style={{ color: 'rgba(0,0,0,.35)' }}>Select Visit Type</span>
              <TourTypeToggle isOvernight={isOvernight} onChange={setIsOvernight} />
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {filterButtons.map((btn) => {
                const active = effectiveCategory === btn;
                return (
                  <button
                    key={btn}
                    onClick={() => setActiveCategory(btn)}
                    className="filter-btn text-[10px] font-extrabold tracking-[.15em] uppercase px-5 py-2.5"
                    style={{
                      background: active ? P : 'white',
                      color: active ? 'white' : 'rgba(0,0,0,.5)',
                      border: `1.5px solid ${active ? P : 'rgba(0,0,0,.12)'}`,
                      boxShadow: active ? `0 4px 14px ${PG}` : 'none',
                      cursor: 'pointer',
                      borderRadius: 0,
                      fontFamily: "'Montserrat', sans-serif",
                    }}
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
      <section className="py-20 px-5 sm:px-8 text-center" style={{ background: '#f5f3ee' }}>
        <div className="max-w-xl mx-auto">
          <div className="sr">
            {/* Dancing Script kept only for this phrase */}
            <h2 className="dancing-script text-neutral-900 m-0 mb-3"
              style={{ fontSize: 'clamp(34px, 6vw, 66px)', fontWeight: 700 }}>
              Found Your Perfect Room?
            </h2>
            <div className="w-px h-8 mx-auto mb-5" style={{ background: 'rgba(0,0,0,0.15)' }} />
            <p className="text-neutral-400 text-sm font-light leading-relaxed mb-8 m-0">
              Book directly and secure your stay. A 50% deposit confirms your reservation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/booking" className="inline-flex items-center text-white text-[11px] font-extrabold tracking-[.15em] uppercase px-10 py-4 hover:-translate-y-0.5 transition-all"
                style={{ background: `linear-gradient(to bottom right, ${P}, ${PD})`, boxShadow: `0 4px 24px ${PG}`, borderRadius: 0 }}>Reserve Now ✨</Link>
              <a href="https://www.facebook.com/villadelpradoresort" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[.15em] uppercase px-8 py-4 border transition-all hover:opacity-70"
                style={{ borderColor: `${P}40`, color: P, borderRadius: 0 }}>
                Message Us
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center py-6" style={{ background: '#f5f3ee', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <p className="text-[9px] text-neutral-300 font-bold tracking-[.18em] uppercase m-0">
          © 2025 Villa Del Prado Beach Resort · Sariaya, Quezon
        </p>
      </div>
    </div>
  );
}