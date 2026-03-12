import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ─── BRAND ───────────────────────────────────────────────────────────────────
const P  = '#0077a8';
const PD = '#005f8a';
const PL = '#e0f2fa';
const PG = 'rgba(0,119,168,0.25)';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface AmenityItem {
  name: string;
  highlight: string;
  desc: string;
  tags: string[];
}

interface AmenityCategory {
  id: string;
  category: string;
  tagline: string;
  items: AmenityItem[];
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const amenityCategories: AmenityCategory[] = [
  {
    id: 'water',
    category: 'Water & Beach',
    tagline: 'Where every day starts with salt air and sunshine',
    items: [
      { name: 'Private Beach Access', highlight: '500m of White Sand', desc: 'Step directly onto our exclusive 500-meter stretch of fine white sand beach. Reserved solely for Villa Del Prado guests, the shoreline offers calm, clean waters perfect for swimming, wading, or simply basking in the sun.', tags: ['Exclusive', 'All-Day Access', 'Clean Waters'] },
      { name: 'Swimming Pool & Water Slide', highlight: 'Main Pool with Thrilling Slide', desc: 'Our large main swimming pool is the heart of resort activity. Cool off between beach sessions, race down the water slide, or lounge on the pool deck with a cold drink in hand. Suitable for all ages.', tags: ['All Ages', 'Water Slide', 'Pool Deck'] },
      { name: 'Kiddie Pool', highlight: 'Safe & Shallow for Little Ones', desc: 'Designed specifically for toddlers and young children, our kiddie pool offers a safe, supervised environment with shallow water depth and gentle features so the youngest guests can splash freely.', tags: ['Toddler Safe', 'Supervised', 'Shallow Depth'] },
      { name: 'Kayaking', highlight: 'Explore the Coastline', desc: 'Paddle at your own pace along the scenic shoreline aboard our single and double kayaks. Equipment and basic orientation provided. Ideal for a peaceful morning adventure or an energetic afternoon on the water.', tags: ['Equipment Provided', 'Single & Double', 'Self-Guided'] },
      { name: 'Boat Rides', highlight: 'Guided Tours of Local Waters', desc: 'Join one of our guided boat tours to discover the beauty of Tayabas Bay. Our experienced boatmen navigate the local waterways and can point out scenic spots, fishing areas, and nearby natural attractions.', tags: ['Guided', 'Scenic Route', 'Group-Friendly'] },
      { name: 'Jet Ski', highlight: 'High-Speed Open Water Thrills', desc: 'Feel the rush of speeding across open water on our jet skis. Available for individual or tandem rides with safety briefings provided. One of the most popular activities for thrill-seeking guests.', tags: ['Safety Briefing', 'Solo & Tandem', 'Popular'] },
    ],
  },
  {
    id: 'sports',
    category: 'Sports & Recreation',
    tagline: 'Stay active under the tropical sun',
    items: [
      { name: 'Beach Volleyball', highlight: 'Court Set Up on the Sand', desc: "Challenge friends or join an impromptu match on our dedicated beach volleyball court. Set directly on the sand for authentic beach play, it's a favorite for both casual rallies and competitive games.", tags: ['Sand Court', 'Equipment Provided', 'All Skill Levels'] },
      { name: 'Basketball Court', highlight: 'Full Outdoor Court', desc: 'Our full-sized outdoor basketball court is available throughout the day for pick-up games, free throws, or organized team competitions. Great for groups looking to burn energy between swim sessions.', tags: ['Full Court', 'Outdoor', 'Day & Evening'] },
      { name: 'Fishing', highlight: 'With Local Expert Guides', desc: "Experience traditional Filipino fishing alongside our knowledgeable local guides. Whether you're a seasoned angler or first-timer, the waters off Sariaya offer a rewarding and authentic fishing experience.", tags: ['Local Guides', 'All Experience Levels', 'Catch Available'] },
      { name: 'Beach Jogging', highlight: 'Scenic Morning Shoreline Runs', desc: 'Start your day with an invigorating jog along our 500-meter private shoreline. The compact sand and cool morning breeze make for an ideal running environment as the sun rises over the bay.', tags: ['Morning Recommended', 'Scenic Route', 'Free'] },
      { name: 'Sunrise Watching', highlight: 'Guided Spots with Coffee Service', desc: "Wake up early for one of nature's most spectacular shows. Our staff can direct you to the best viewing spots on property, and we offer early-morning coffee service so you can enjoy the spectacle in comfort.", tags: ['Coffee Service', 'Best Spot Guidance', 'Free'] },
      { name: 'Bike Rental', highlight: 'Explore the Resort & Surrounds', desc: 'Rent a bicycle and cruise around the resort grounds or venture out to explore the quiet coastal roads of Sariaya. A relaxed and eco-friendly way to discover the area at your own pace.', tags: ['Hourly Rental', 'Helmets Included', 'Resort & Nearby Area'] },
    ],
  },
  {
    id: 'dining',
    category: 'Dining & Entertainment',
    tagline: 'Flavors, music, and memories by the sea',
    items: [
      { name: 'Resort Restaurant', highlight: 'Filipino & International Cuisine', desc: 'Open all day from early breakfast to late dinner, our resort restaurant serves a curated menu of Filipino classics and international favorites. Fresh ingredients, generous portions, and beachside atmosphere make every meal memorable.', tags: ['All-Day Dining', 'Filipino & International', 'Breakfast Packages'] },
      { name: 'Beach Bar', highlight: 'Cocktails & Drinks Beachside', desc: 'Sip on refreshing fresh juices, classic cocktails, cold beers, and specialty drinks without leaving the beach. Our open-air beach bar is the perfect spot to unwind as the afternoon sun dips toward the horizon.', tags: ['Open Air', 'Fresh Juices', 'Cocktails & Beer'] },
      { name: 'Videoke / KTV Night', highlight: 'Private KTV Room Available', desc: 'Gather your group for an unforgettable evening of song in our dedicated KTV room. With an extensive song library spanning OPM, pop, and classic hits, videoke nights are a beloved Filipino tradition done right.', tags: ['Private Room', 'OPM & International', 'Bookable by Groups'] },
      { name: 'Beachside BBQ', highlight: 'Grill Your Own or Use Our Package', desc: 'Nothing beats the smell of grilled seafood by the ocean. Choose from our BBQ packages or grill your own fresh catch. We provide the setup, charcoal, and tools — you bring the appetite.', tags: ['BBQ Packages', 'Grill Your Own Catch', 'Evening Sessions'] },
      { name: 'Night Market', highlight: 'Weekend Local Food Stalls', desc: 'On select weekends, Villa Del Prado hosts a vibrant night market featuring local vendors selling street food, grilled specialties, and artisanal products from Sariaya and nearby communities.', tags: ['Weekends Only', 'Local Vendors', 'Street Food'] },
      { name: 'Live Music', highlight: 'Weekend Performances', desc: 'Enjoy live acoustic performances by talented local artists every weekend evening. From mellow folk to upbeat OPM covers, the music sets the perfect mood for a relaxed beachside night.', tags: ['Weekends', 'Local Artists', 'OPM & Acoustic'] },
    ],
  },
  {
    id: 'events',
    category: 'Events & Functions',
    tagline: 'Your celebration deserves a stunning backdrop',
    items: [
      { name: 'Beach Weddings', highlight: 'The Ocean as Your Backdrop', desc: 'Exchange vows with the sound of waves and the sea breeze as your witness. Our events team coordinates every detail — from floral arrangements to catering — so your beach wedding is as seamless as it is stunning.', tags: ['Full Coordination', 'Catering Available', 'Photography Spots'] },
      { name: 'Debut Parties', highlight: 'Unforgettable 18th Celebrations', desc: 'Celebrate 18 years in style with a debut package that includes venue dressing, catering options, sound system, and dedicated event staff. Our beachfront and function hall venues set the stage for a magical milestone.', tags: ['Venue Dressing', 'Sound System', 'Full Coordination'] },
      { name: 'Family Reunions', highlight: 'Spacious Venues for Large Groups', desc: 'Bring the whole family together at Villa Del Prado. Our expansive grounds, function halls, and outdoor areas can accommodate large family gatherings with space for games, dining, and creating lasting memories.', tags: ['Large Group Capacity', 'Indoor & Outdoor', 'Custom Packages'] },
      { name: 'Birthday Celebrations', highlight: 'Package Deals for All Ages', desc: "From children's beach parties to milestone adult birthdays, our team crafts personalized celebration packages. Choose from intimate beachside setups or grand function hall arrangements complete with decorations.", tags: ['All Ages', 'Custom Decoration', 'Catering Packages'] },
      { name: 'Corporate Events', highlight: 'Team Buildings & Seminars', desc: 'Host your next corporate retreat, team-building activity, or company seminar at Villa Del Prado. Our facilities include air-conditioned function halls, presentation equipment, and tailored corporate packages.', tags: ['Function Hall', 'AV Equipment', 'Team Building Activities'] },
      { name: 'School Outings', highlight: 'Educational Field Trips', desc: 'Provide students with an enriching outdoor experience combining beach activities, water sports, and nature appreciation. We offer supervised group rates and structured activity programs for school organizations.', tags: ['Group Rates', 'Supervised Activities', 'Program Available'] },
    ],
  },
];

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.05 }
    );
    document.querySelectorAll('.sr').forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  });
}

// ─── AMENITY CARD ─────────────────────────────────────────────────────────────
function AmenityCard({ item, index }: { item: AmenityItem; index: number }) {
  const [open, setOpen] = useState(false);
  const [isTouchDevice] = useState(() => window.matchMedia('(hover: none)').matches);

  const handleMouseEnter = () => { if (!isTouchDevice) setOpen(true); };
  const handleMouseLeave = () => { if (!isTouchDevice) setOpen(false); };
  const handleClick      = () => setOpen(v => !v);

  return (
    <div
      className="bg-white overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        borderRadius: 0,
        boxShadow: open
          ? `0 16px 48px rgba(0,0,0,.11), 0 0 0 2px ${P}`
          : '0 2px 16px rgba(0,0,0,.06)',
        transition: 'all .35s cubic-bezier(.16,1,.3,1)',
        transform: open ? 'translateY(-2px)' : 'none',
        cursor: isTouchDevice ? 'pointer' : 'default',
      }}
    >
      {/* Header — always visible */}
      <div
        className="w-full text-left p-5"
        style={{ display: 'block', minHeight: 80 }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <span
            className="font-black leading-none flex-shrink-0 select-none tabular-nums"
            style={{
              fontSize: 12,
              letterSpacing: '0.06em',
              color: open ? P : 'rgba(0,0,0,0.15)',
              transition: 'color .3s ease',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Square toggle indicator */}
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 0,
              background: open ? P : '#efefed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background .25s ease',
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
        </div>

        <p
          className="font-extrabold uppercase m-0 mb-1.5"
          style={{ fontSize: 8, letterSpacing: '0.18em', color: P }}
        >
          {item.highlight}
        </p>
        <h4 className="font-bold text-neutral-900 leading-snug m-0" style={{ fontSize: 14 }}>
          {item.name}
        </h4>
      </div>

      {/* Expanded body */}
      <div
        style={{
          maxHeight: open ? 320 : 0,
          overflow: 'hidden',
          transition: 'max-height .38s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <div className="px-5 pb-5" style={{ borderTop: `1px solid ${P}1a` }}>
          <p className="text-neutral-500 font-light leading-relaxed mt-4 mb-4 m-0" style={{ fontSize: 12 }}>
            {item.desc}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="font-extrabold uppercase px-2.5 py-1"
                style={{ fontSize: 8, letterSpacing: '0.1em', background: PL, color: P, borderRadius: 0 }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CATEGORY FILTER ─────────────────────────────────────────────────────────
function CategoryFilter({
  categories,
  active,
  onSelect,
}: {
  categories: AmenityCategory[];
  active: string;
  onSelect: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!btn) return;
    const offset = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
    container.scrollTo({ left: offset, behavior: 'smooth' });
  }, [active]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 20, background: 'linear-gradient(to right, #f5f3ee, transparent)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 20, background: 'linear-gradient(to left, #f5f3ee, transparent)', pointerEvents: 'none', zIndex: 2 }} />
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', paddingBottom: 2 }}
      >
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              data-id={cat.id}
              onClick={() => onSelect(cat.id)}
              className="flex-shrink-0"
              style={{
                background: isActive ? P : 'white',
                color: isActive ? 'white' : 'rgba(0,0,0,.5)',
                border: `1.5px solid ${isActive ? P : 'rgba(0,0,0,.1)'}`,
                boxShadow: 'none',
                cursor: 'pointer',
                borderRadius: 0,
                padding: '10px 20px',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                transition: 'all .2s ease',
                WebkitTapHighlightColor: 'transparent',
                minHeight: 44,
              }}
            >
              {cat.category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Amenities() {
  const [activeSection, setActiveSection] = useState('water');
  useScrollReveal();

  const activeCat = amenityCategories.find((c) => c.id === activeSection)!;

  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif", background: '#f5f3ee' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600;1,700&family=Dancing+Script:wght@700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes kenBurns { 0%  { transform:scale(1.06); } 100% { transform:scale(1.0); } }
        @keyframes chevronBob {
          0%, 100% { transform: translateY(0px); opacity: 0.55; }
          50%       { transform: translateY(9px); opacity: 0.85; }
        }

        .sr { opacity:0; transform:translateY(20px); transition:opacity .7s ease, transform .7s ease; }
        .sr.in-view { opacity:1; transform:none; }
        .sr-d1 { transition-delay:.08s; }
        .overflow-x-auto::-webkit-scrollbar { display: none; }

        .hero-serif    { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        .dancing-script { font-family: 'Dancing Script', cursive !important; }

        /* Force Montserrat everywhere except overridden classes */
        body, h1, h2, h3, h4, h5, h6, p, span, div, button, a, input, select, textarea {
          font-family: 'Montserrat', sans-serif !important;
        }
        .hero-serif    { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        .dancing-script { font-family: 'Dancing Script', cursive !important; }

        .hero-browse-line { animation: fadeUp 1s ease 1.2s both; }
        .scroll-indicator { animation: fadeUp 1s ease 1.4s both; }
        .chevron-bob { animation: chevronBob 2.4s cubic-bezier(0.45, 0, 0.55, 1) 1.6s infinite; }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO — 100vh, editorial serif typography
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden w-full" style={{ height: '100vh', minHeight: 600, paddingTop: 90 }}>

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80&auto=format')",
            animation: 'kenBurns 18s ease-out forwards',
          }}
        />

        {/* Layered overlays */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.38)' }} />
        <div className="absolute inset-x-0 top-0"    style={{ height: '50%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)' }} />
        <div className="absolute inset-x-0 bottom-0" style={{ height: '35%', background: 'linear-gradient(to top,    rgba(0,0,0,0.45) 0%, transparent 100%)' }} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

          {/* Eyebrow — "— AMENITIES COLLECTION —" */}
          <div
            className="flex items-center gap-3 mb-6"
            style={{ animation: 'fadeUp .6s cubic-bezier(.16,1,.3,1) .1s both' }}
          >
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.45)' }} />
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.60)',
            }}>
              Amenities Collection
            </span>
            <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.45)' }} />
          </div>

          {/* Main headline — serif display */}
          <h1 className="m-0 leading-none" style={{ animation: 'fadeUp .9s cubic-bezier(.16,1,.3,1) .25s both' }}>
            {/* Line 1: upright bold serif */}
            <span className="hero-serif block" style={{
              fontSize: 'clamp(64px, 11vw, 130px)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 0.88,
              letterSpacing: '-0.01em',
            }}>
              Life
            </span>
            {/* Line 2: italic light serif */}
            <span className="hero-serif block" style={{
              fontSize: 'clamp(58px, 10.5vw, 124px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'white',
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
            }}>
              By the Sea
            </span>
          </h1>

          {/* SEO-copywritten subtitle phrase — centered */}
          <p
            className="mt-6 mb-0"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(12px, 1.5vw, 14px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.60)',
              maxWidth: 380,
              lineHeight: 1.7,
              letterSpacing: '0.02em',
              animation: 'fadeUp .8s cubic-bezier(.16,1,.3,1) .55s both',
            }}
          >
            Discover world-class beach resort amenities in Sariaya, Quezon —
            from private white-sand shores and water sports to beachside dining
            and full event facilities.
          </p>

          {/* Browse CTA + bobbing chevron */}
          <div className="hero-browse-line flex flex-col items-center" style={{ marginTop: '6vh' }}>
            <span
              onClick={() => document.getElementById('amenities-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                cursor: 'pointer',
              }}
            >
              Browse
            </span>

            {/* Chevron-down with smooth bob */}
            <div className="scroll-indicator" style={{ marginTop: '1vh' }}>
              <svg
                className="chevron-bob"
                width="22" height="13" viewBox="0 0 22 13"
                fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block', cursor: 'pointer' }}
                onClick={() => document.getElementById('amenities-section')?.scrollIntoView({ behavior: 'smooth' })}
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

      {/* ══════════════════════════════════════════════════════
          AMENITIES SECTION
      ══════════════════════════════════════════════════════ */}
      <section id="amenities-section" className="py-14 sm:py-20" style={{ background: '#f5f3ee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[8%]">

          {/* Section label + heading */}
          <div className="sr mb-8 sm:mb-10">
            <span
              className="inline-block font-extrabold uppercase px-4 py-1.5 mb-3"
              style={{ fontSize: 9, letterSpacing: '0.2em', background: PL, color: P, borderRadius: 0 }}
            >
              What's Included
            </span>
            <h2 className="font-black tracking-tight leading-tight text-neutral-900 m-0" style={{ fontSize: 'clamp(24px, 5vw, 52px)' }}>
              Resort <span style={{ color: P }}>Amenities.</span>
            </h2>
            <p className="text-neutral-400 font-light mt-2 m-0" style={{ fontSize: 12 }}>
              Select a category. Hover a card to explore — or tap on mobile.
            </p>
          </div>

          {/* Scrollable category tabs */}
          <div className="sr mb-8">
            <CategoryFilter
              categories={amenityCategories}
              active={activeSection}
              onSelect={setActiveSection}
            />
          </div>

          {/* Active category header */}
          <div
            key={activeCat.id + '-header'}
            className="sr flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 mb-6 pb-5"
            style={{ borderBottom: `1px solid ${P}22` }}
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-neutral-900 m-0 mb-0.5" style={{ fontSize: 'clamp(18px, 3vw, 24px)' }}>
                {activeCat.category}
              </h3>
              <p className="text-neutral-400 font-light italic m-0" style={{ fontSize: 12 }}>
                {activeCat.tagline}
              </p>
            </div>
            <span
              className="font-extrabold uppercase px-4 py-2 self-start sm:self-auto flex-shrink-0"
              style={{ fontSize: 9, letterSpacing: '0.18em', background: PL, color: P, borderRadius: 0 }}
            >
              {activeCat.items.length} Activities
            </span>
          </div>

          {/* Cards grid */}
          <div
            key={activeCat.id + '-grid'}
            className="sr sr-d1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {activeCat.items.map((item, i) => (
              <AmenityCard key={item.name} item={item} index={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ── FULL OVERVIEW ── */}
      <section className="py-14 sm:py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[8%]">
          <div className="sr mb-8 sm:mb-10 text-center">
            <span
              className="inline-block font-extrabold uppercase px-4 py-1.5 mb-3"
              style={{ fontSize: 9, letterSpacing: '0.2em', background: PL, color: P, borderRadius: 0 }}
            >
              Full Overview
            </span>
            <h2 className="font-black tracking-tight text-neutral-900 m-0" style={{ fontSize: 'clamp(20px, 4vw, 42px)' }}>
              Everything at a <span style={{ color: P }}>Glance.</span>
            </h2>
          </div>

          <div className="sr sr-d1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {amenityCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveSection(cat.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left p-5"
                style={{
                  background: PL,
                  border: `1px solid ${P}1a`,
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'box-shadow .2s ease',
                  borderRadius: 0,
                }}
              >
                <p
                  className="font-extrabold uppercase m-0 mb-3 pb-3"
                  style={{ fontSize: 8, letterSpacing: '0.2em', color: P, borderBottom: `1px solid ${P}2a` }}
                >
                  {cat.category}
                </p>
                <ul className="list-none m-0 p-0 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item.name} className="flex items-center gap-2">
                      <span style={{ width: 4, height: 4, borderRadius: 0, background: P, flexShrink: 0, display: 'block' }} />
                      <span className="font-medium text-neutral-700" style={{ fontSize: 11 }}>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS CTA ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-[8%]" style={{ background: '#f5f3ee' }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="sr p-7 sm:p-12 md:p-14 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${PL} 0%, #d0eaf8 100%)`, borderRadius: 0 }}
          >
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
                  style={{ fontSize: 9, letterSpacing: '0.2em', background: 'white', color: P, borderRadius: 0 }}
                >
                  Group & Corporate
                </span>
                <h2 className="font-black tracking-tight text-neutral-900 m-0 mb-3 leading-tight" style={{ fontSize: 'clamp(20px, 4vw, 40px)' }}>
                  Planning an <span style={{ color: P }}>Event?</span>
                </h2>
                <p className="text-neutral-500 font-light leading-relaxed mb-5 m-0" style={{ fontSize: 13 }}>
                  From intimate beach weddings to full corporate retreats — our dedicated events team handles every detail so you can focus on celebrating.
                </p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {['Weddings', 'Debuts', 'Corporate', 'Reunions', 'Birthdays', 'Graduations'].map((tag) => (
                    <span
                      key={tag}
                      className="font-extrabold uppercase px-3 py-1.5"
                      style={{ fontSize: 9, letterSpacing: '0.12em', background: 'white', color: P, boxShadow: '0 2px 8px rgba(0,0,0,.06)', borderRadius: 0 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 text-white font-extrabold uppercase transition-all hover:-translate-y-0.5"
                  style={{ fontSize: 10, letterSpacing: '0.15em', padding: '14px 28px', background: `linear-gradient(to bottom right, ${P}, ${PD})`, boxShadow: `0 4px 18px ${PG}`, minHeight: 48, borderRadius: 0 }}
                >
                  Inquire About Events
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { stat: '500+',   label: 'Guests Served' },
                  { stat: '100+',   label: 'Events Hosted' },
                  { stat: '4.8/5',  label: 'Event Rating'  },
                  { stat: '500m',   label: 'Beachfront'    },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white text-center"
                    style={{ padding: '20px 12px', boxShadow: '0 3px 14px rgba(0,0,0,.06)', borderRadius: 0 }}
                  >
                    <p className="font-black leading-none m-0 mb-1" style={{ fontSize: 'clamp(18px, 4vw, 26px)', color: P }}>
                      {s.stat}
                    </p>
                    <p className="font-bold uppercase text-neutral-400 m-0" style={{ fontSize: 9, letterSpacing: '0.1em' }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 text-center" style={{ background: '#f5f3ee' }}>
        <div className="max-w-lg mx-auto">
          <div className="sr">
            <h2
              className="dancing-script text-neutral-900 m-0 mb-3"
              style={{ fontSize: 'clamp(30px, 7vw, 62px)', fontWeight: 700, lineHeight: 1.15 }}
            >
              Ready for Your Beach Adventure?
            </h2>
            <div className="mx-auto mb-4" style={{ width: 1, height: 24, background: 'rgba(0,0,0,0.12)' }} />
            <p className="text-neutral-400 font-light leading-relaxed mb-8 m-0" style={{ fontSize: 13 }}>
              Book your stay and enjoy all these amenities. A 50% deposit secures your reservation.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center text-white font-extrabold uppercase transition-all hover:-translate-y-0.5"
                style={{ fontSize: 11, letterSpacing: '0.15em', padding: '16px 32px', background: `linear-gradient(to bottom right, ${P}, ${PD})`, boxShadow: `0 4px 24px ${PG}`, minHeight: 52, borderRadius: 0 }}
              >
                Reserve Now
              </Link>
              <a
                href="https://www.facebook.com/villadelpradoresort"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-extrabold uppercase border transition-all hover:opacity-70"
                style={{ fontSize: 11, letterSpacing: '0.15em', padding: '16px 32px', borderColor: `${P}40`, color: P, minHeight: 52, borderRadius: 0 }}
              >
                Message Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center py-5" style={{ background: '#f5f3ee', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <p className="font-bold uppercase text-neutral-300 m-0" style={{ fontSize: 9, letterSpacing: '0.18em' }}>
          © 2025 Villa Del Prado Beach Resort · Sariaya, Quezon
        </p>
      </div>
    </div>
  );
}