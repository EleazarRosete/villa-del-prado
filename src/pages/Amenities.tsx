import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
      { name: 'Private Beach Access', highlight: '500m of White Sand', desc: 'Step directly onto our exclusive 500-meter stretch of fine white sand beach. Reserved solely for Demo Beach Resort guests, the shoreline offers calm, clean waters perfect for swimming, wading, or simply basking in the sun.', tags: ['Exclusive', 'All-Day Access', 'Clean Waters'] },
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
      { name: 'Fishing', highlight: 'With Local Expert Guides', desc: "Experience traditional Filipino fishing alongside our knowledgeable local guides. Whether you're a seasoned angler or first-timer, the waters off Batangas offer a rewarding and authentic fishing experience.", tags: ['Local Guides', 'All Experience Levels', 'Catch Available'] },
      { name: 'Beach Jogging', highlight: 'Scenic Morning Shoreline Runs', desc: 'Start your day with an invigorating jog along our 500-meter private shoreline. The compact sand and cool morning breeze make for an ideal running environment as the sun rises over the bay.', tags: ['Morning Recommended', 'Scenic Route', 'Free'] },
      { name: 'Sunrise Watching', highlight: 'Guided Spots with Coffee Service', desc: "Wake up early for one of nature's most spectacular shows. Our staff can direct you to the best viewing spots on property, and we offer early-morning coffee service so you can enjoy the spectacle in comfort.", tags: ['Coffee Service', 'Best Spot Guidance', 'Free'] },
      { name: 'Bike Rental', highlight: 'Explore the Resort & Surrounds', desc: 'Rent a bicycle and cruise around the resort grounds or venture out to explore the quiet coastal roads of Batangas Bay Walk. A relaxed and eco-friendly way to discover the area at your own pace.', tags: ['Hourly Rental', 'Helmets Included', 'Resort & Nearby Area'] },
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
      { name: 'Night Market', highlight: 'Weekend Local Food Stalls', desc: 'On select weekends, Demo Beach Resort hosts a vibrant night market featuring local vendors selling street food, grilled specialties, and artisanal products from Batangas and nearby communities.', tags: ['Weekends Only', 'Local Vendors', 'Street Food'] },
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
      { name: 'Family Reunions', highlight: 'Spacious Venues for Large Groups', desc: 'Bring the whole family together at Demo Beach Resort. Our expansive grounds, function halls, and outdoor areas can accommodate large family gatherings with space for games, dining, and creating lasting memories.', tags: ['Large Group Capacity', 'Indoor & Outdoor', 'Custom Packages'] },
      { name: 'Birthday Celebrations', highlight: 'Package Deals for All Ages', desc: "From children's beach parties to milestone adult birthdays, our team crafts personalized celebration packages. Choose from intimate beachside setups or grand function hall arrangements complete with decorations.", tags: ['All Ages', 'Custom Decoration', 'Catering Packages'] },
      { name: 'Corporate Events', highlight: 'Team Buildings & Seminars', desc: 'Host your next corporate retreat, team-building activity, or company seminar at Demo Beach Resort. Our facilities include air-conditioned function halls, presentation equipment, and tailored corporate packages.', tags: ['Function Hall', 'AV Equipment', 'Team Building Activities'] },
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
      className={`amenity-card${open ? ' amenity-card--open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: isTouchDevice ? 'pointer' : 'default' }}
    >
      {/* Header — always visible */}
      <div className="amenity-card__header">
        <div className="amenity-card__top-row">
          <span className={`amenity-card__index amenity-card__index--${open ? 'open' : 'closed'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Square toggle indicator */}
          <div className={`amenity-card__toggle amenity-card__toggle--${open ? 'open' : 'closed'}`}>
            <svg
              width="9" height="9" viewBox="0 0 24 24" fill="none"
              stroke={open ? 'white' : '#aaa'} strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              className={`amenity-card__toggle-icon amenity-card__toggle-icon--${open ? 'open' : 'closed'}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        <p className="amenity-card__highlight">{item.highlight}</p>
        <h4 className="amenity-card__name">{item.name}</h4>
      </div>

      {/* Expanded body */}
      <div className={`amenity-card__body amenity-card__body--${open ? 'open' : 'closed'}`}>
        <div className="amenity-card__body-inner">
          <p className="amenity-card__desc">{item.desc}</p>
          <div className="amenity-card__tags">
            {item.tags.map((tag) => (
              <span key={tag} className="amenity-card__tag">{tag}</span>
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
    <div className="amenities-filter">
      <div ref={scrollRef} className="amenities-filter__scroll">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              data-id={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`amenities-filter__btn${isActive ? ' amenities-filter__btn--active' : ''}`}
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
    <div className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          HERO — 100vh, editorial serif typography
      ══════════════════════════════════════════════════════ */}
      <section className="amenities-hero">

        {/* Background */}
        <div className="amenities-hero__bg" />

        {/* Layered overlays */}
        <div className="amenities-hero__overlay-base" />
        <div className="amenities-hero__overlay-top" />
        <div className="amenities-hero__overlay-bottom" />

        {/* Content */}
        <div className="amenities-hero__content">

          {/* Eyebrow */}
          <div className="amenities-hero__eyebrow">
            <div className="amenities-hero__eyebrow-line" />
            <span className="amenities-hero__eyebrow-text">Amenities Collection</span>
            <div className="amenities-hero__eyebrow-line" />
          </div>

          {/* Main headline — reusing accom-hero line classes for consistent design */}
          <h1 className="amenities-hero__h1">
            <span className="accom-hero__line1 hero-serif">Life</span>
            <span className="accom-hero__line2 hero-serif">By the Sea</span>
          </h1>

          {/* Subtitle */}
          <p className="amenities-hero__subtitle">
            Discover world-class beach resort amenities in Batangas —
            from private white-sand shores and water sports to beachside dining
            and full event facilities.
          </p>

          {/* Browse CTA + bobbing chevron */}
          <div className="amenities-hero__browse">
            <span
              className="amenities-hero__browse-label"
              onClick={() => document.getElementById('amenities-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse
            </span>

            <div className="amenities-hero__chevron-wrap">
              <svg
                className="amenities-hero__chevron-icon"
                width="22" height="13" viewBox="0 0 22 13"
                fill="none" xmlns="http://www.w3.org/2000/svg"
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
      <section id="amenities-section" className="amenities-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[8%]">

          {/* Section label + heading */}
          <div className="sr mb-8 sm:mb-10">
            <span className="amenities-section__tag">What's Included</span>
            <h2 className="amenities-section__heading">
              Resort <span>Amenities.</span>
            </h2>
            <p className="amenities-section__hint">
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
          <div key={activeCat.id + '-header'} className="sr amenities-cat-header">
            <div className="flex-1 min-w-0">
              <h3 className="amenities-cat-header__title">{activeCat.category}</h3>
              <p className="amenities-cat-header__tagline">{activeCat.tagline}</p>
            </div>
            <span className="amenities-cat-header__count">
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
      <section className="amenities-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[8%]">
          <div className="sr mb-8 sm:mb-10 text-center">
            <span className="amenities-section__tag">Full Overview</span>
            <h2 className="amenities-section__heading">
              Everything at a <span>Glance.</span>
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
                className="amenities-overview__cat-btn"
              >
                <p className="amenities-overview__cat-label">{cat.category}</p>
                <ul className="list-none m-0 p-0 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item.name} className="amenities-overview__item">
                      <span className="amenities-overview__dot" />
                      <span className="amenities-overview__item-name">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS CTA ── */}
      <section className="amenities-events-cta">
        <div className="max-w-6xl mx-auto">
          <div className="sr amenities-events-cta__inner">
            <div className="amenities-events-cta__bg-text">EVENT</div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center relative z-10">
              <div>
                <span className="amenities-events-cta__tag">Group &amp; Corporate</span>
                <h2 className="amenities-events-cta__heading">
                  Planning an <span>Event?</span>
                </h2>
                <p className="amenities-events-cta__desc">
                  From intimate beach weddings to full corporate retreats — our dedicated events team handles every detail so you can focus on celebrating.
                </p>
                <div className="amenities-events-cta__event-tags">
                  {['Weddings', 'Debuts', 'Corporate', 'Reunions', 'Birthdays', 'Graduations'].map((tag) => (
                    <span key={tag} className="amenities-events-cta__event-tag">{tag}</span>
                  ))}
                </div>
                <Link to="/booking" className="amenities-events-cta__btn">
                  Inquire About Events
                  {/* <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg> */}
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { stat: '500+',  label: 'Guests Served' },
                  { stat: '100+',  label: 'Events Hosted' },
                  { stat: '4.8/5', label: 'Event Rating'  },
                  { stat: '500m',  label: 'Beachfront'    },
                ].map((s) => (
                  <div key={s.label} className="amenities-events-cta__stat-tile">
                    <p className="amenities-events-cta__stat-value">{s.stat}</p>
                    <p className="amenities-events-cta__stat-label">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="amenities-bottom-cta">
        <div className="max-w-lg mx-auto">
          <div className="sr">
            <h2 className="amenities-bottom-cta__heading">Ready for Your Beach Adventure?</h2>
            <div className="amenities-bottom-cta__divider" />
            <p className="amenities-bottom-cta__desc">
              Book your stay and enjoy all these amenities. A 50% deposit secures your reservation.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link to="/booking" className="amenities-bottom-cta__reserve-btn">
                Reserve Now
              </Link>
              <a
                href="https://www.facebook.com/eleazar.rosete.2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="amenities-bottom-cta__msg-btn"
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