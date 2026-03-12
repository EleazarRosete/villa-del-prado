import { useState, useEffect } from 'react';

// ─── TYPES ────────────────────────────────────────────────────────────────────
type GalleryItem = {
  label: string;
  category: string;
  img: string;
  /** Controls flex-grow weight — larger = wider cell within its row */
  weight: number;
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const galleryItems: GalleryItem[] = [
  { label: 'White Sand Beach',   category: 'Beach',      weight: 2,   img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85' },
  { label: 'Sunrise at Villa',   category: 'Landscape',  weight: 1.2, img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85' },
  { label: 'Swimming Pool',      category: 'Pool',       weight: 1,   img: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1200&q=85' },
  { label: 'Coconut Palms',      category: 'Landscape',  weight: 1.5, img: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=1200&q=85' },
  { label: 'Kayaking Tour',      category: 'Activities', weight: 1,   img: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1200&q=85' },
  { label: 'Villa Rooms',        category: 'Rooms',      weight: 2,   img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85' },
  { label: 'Jet Ski Fun',        category: 'Activities', weight: 1.2, img: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&q=85' },
  { label: 'Beachside Bonfire',  category: 'Events',     weight: 1,   img: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&q=85' },
  { label: 'Resort Dining',      category: 'Dining',     weight: 1.5, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85' },
  { label: 'Beach Wedding',      category: 'Events',     weight: 2,   img: 'https://images.unsplash.com/photo-1525772764200-be829a350797?w=1200&q=85' },
  { label: 'Ocean Waves',        category: 'Beach',      weight: 1.2, img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=85' },
  { label: 'Beach Bar',          category: 'Dining',     weight: 1,   img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=85' },
  { label: 'Family on Beach',    category: 'Activities', weight: 1.5, img: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=85' },
  { label: 'Golden Hour',        category: 'Landscape',  weight: 2,   img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85' },
  { label: 'Poolside Lounge',    category: 'Pool',       weight: 1.2, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85' },
  { label: 'Night Celebration',  category: 'Events',     weight: 1,   img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=85' },
];


// ─── ICONS ────────────────────────────────────────────────────────────────────
const IconCamera = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const IconX = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconMapPin = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);

const IconImage = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);


// ─── NAV BUTTON ───────────────────────────────────────────────────────────────
function NavBtn({ dir, onClick, disabled }: { dir: 'prev' | 'next'; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 44,
        height: 44,
        borderRadius: 0,
        border: '1.5px solid rgba(255,255,255,0.55)',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.2 : 1,
        transition: 'background 0.2s ease, border-color 0.2s ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.9)';
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.55)';
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        {dir === 'next' ? (
          <>
            <line x1="4" y1="12" x2="20" y2="12" />
            <polyline points="13 5 20 12 13 19" />
          </>
        ) : (
          <>
            <line x1="20" y1="12" x2="4" y2="12" />
            <polyline points="11 5 4 12 11 19" />
          </>
        )}
      </svg>
    </button>
  );
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({
  item,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(6,6,6,0.96)', backdropFilter: 'blur(20px)', animation: 'lbFadeIn .2s ease both' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full flex flex-col"
        style={{ maxWidth: 900, maxHeight: '90vh', animation: 'lbPop .32s cubic-bezier(.16,1,.3,1) both' }}
      >
        {/* Image */}
        <div className="relative overflow-hidden flex-1" style={{ maxHeight: '75vh' }}>
          <img
            key={item.img}
            src={item.img}
            alt={item.label}
            className="w-full h-full object-cover block"
            style={{ maxHeight: '75vh', animation: 'lbPop .28s cubic-bezier(.16,1,.3,1) both' }}
          />
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-white transition-opacity hover:opacity-70"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 0 }}
          >
            <IconX className="w-4 h-4" />
          </button>
          {/* Counter badge */}
          <div
            className="absolute top-4 left-4"
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.45)',
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(8px)',
              padding: '5px 10px',
              borderRadius: 0,
            }}
          >
            {index + 1} / {total}
          </div>
        </div>

        {/* Footer: meta + nav buttons */}
        <div
          className="flex items-center justify-between px-5 py-4 gap-4"
          style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Meta */}
          <div className="min-w-0">
            <p className="text-white/40 text-[9px] font-bold tracking-[0.22em] uppercase mb-1">{item.category}</p>
            <p className="text-white text-lg font-bold tracking-tight leading-none truncate">{item.label}</p>
          </div>

          {/* Right side: location + nav */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-white/30 text-[11px] font-medium tracking-wide">
              <IconMapPin className="w-3 h-3" />
              Villa Del Prado · Sariaya, Quezon
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <NavBtn dir="prev" onClick={onPrev} disabled={index === 0} />
              <NavBtn dir="next" onClick={onNext} disabled={index === total - 1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY CELL ─────────────────────────────────────────────────────────────
function GalleryCell({ item, index, onClick }: {
  item: GalleryItem;
  index: number;
  onClick: (item: GalleryItem) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden cursor-pointer bg-stone-900"
      style={{
        flex: `${item.weight} 1 ${Math.round(item.weight * 120)}px`,
        minWidth: 0,
        animationDelay: `${index * 0.03}s`,
        animation: 'cellIn 0.7s cubic-bezier(.16,1,.3,1) both',
        borderRadius: 0,
      }}
    >
      <img
        src={item.img}
        alt={item.label}
        loading="lazy"
        className="w-full h-full object-cover block"
        style={{
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.8s cubic-bezier(.16,1,.3,1)',
        }}
      />

      {/* Permanent bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 45%, transparent 100%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Label */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(.16,1,.3,1)',
        }}
      >
        <p className="text-white/50 text-[8px] font-bold tracking-[0.22em] uppercase mb-1">{item.category}</p>
        <p className="text-white text-[13px] font-bold leading-tight tracking-tight">{item.label}</p>
      </div>
    </div>
  );
}

// ─── FLEX MASONRY GRID ────────────────────────────────────────────────────────
function FlexMasonryGrid({ items, onItemClick }: {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}) {
  const rowSizes = [3, 2];
  const rows: GalleryItem[][] = [];
  let cursor = 0;
  let sizeIdx = 0;
  while (cursor < items.length) {
    const size = rowSizes[sizeIdx % rowSizes.length];
    rows.push(items.slice(cursor, cursor + size));
    cursor += size;
    sizeIdx++;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            height: 'clamp(150px, 22vw, 340px)',
          }}
        >
          {row.map((item, colIdx) => (
            <GalleryCell
              key={`${item.label}-${rowIdx}-${colIdx}`}
              item={item}
              index={rowIdx * 3 + colIdx}
              onClick={onItemClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollToGrid = () => {
    document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openLightbox  = (item: GalleryItem) => setLightboxIndex(galleryItems.indexOf(item));
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i));
  const goNext = () => setLightboxIndex(i => (i !== null && i < galleryItems.length - 1 ? i + 1 : i));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { font-family: 'Montserrat', sans-serif; }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }

        @keyframes cellIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lbPop {
          from { opacity: 0; transform: scale(0.95) translateY(16px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes kenBurns {
          0%   { transform: scale(1.08); }
          100% { transform: scale(1.0); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes chevronBob {
          0%, 100% { transform: translateY(0px); opacity: 0.55; }
          50%       { transform: translateY(9px); opacity: 0.85; }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .hero-img        { animation: kenBurns 14s ease-out forwards; }
        .hero-eyebrow    { animation: heroFadeIn 1s ease 0.3s both; }
        .hero-line1      { animation: heroFadeUp 1s cubic-bezier(.16,1,.3,1) 0.5s both; }
        .hero-line2      { animation: heroFadeUp 1s cubic-bezier(.16,1,.3,1) 0.7s both; }
        .hero-divider    { animation: lineGrow 0.8s cubic-bezier(.16,1,.3,1) 0.9s both; transform-origin: left; }
        .hero-body       { animation: heroFadeUp 0.8s cubic-bezier(.16,1,.3,1) 1.05s both; }
        .hero-scroll     { animation: heroFadeIn 1s ease 1.4s both; }
        .chevron-bob     { animation: chevronBob 2.4s cubic-bezier(0.45, 0, 0.55, 1) 1.6s infinite; }

        .grain::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
      `}</style>

      <div className="bg-[#f2f2f7] min-h-screen">

        {/* ═══ HERO ═══ */}
        <section className="relative w-full grain" style={{ height: '100svh', minHeight: 600 }}>
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80&auto=format"
              alt="Villa Del Prado Beach"
              className="hero-img w-full h-full object-cover"
            />
            {/* ── Matched to Amenities/Accommodations dark overlay ── */}
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.38)' }} />
            <div className="absolute inset-x-0 top-0" style={{ height: '50%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)' }} />
            <div className="absolute inset-x-0 bottom-0" style={{ height: '35%', background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)' }} />
          </div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
            <p className="hero-eyebrow text-white/50 text-[9px] font-bold tracking-[0.35em] uppercase mb-6">
              — Photography Collection —
            </p>
            <h1 className="text-white leading-[0.9] tracking-[-0.04em]" style={{ fontWeight: 900, fontSize: 'clamp(52px, 10vw, 110px)' }}>
              <span className="hero-line1 block">Moments</span>
              <span className="hero-line2 block font-[300] italic" style={{ opacity: 0.75 }}>Worth Keeping</span>
            </h1>
            <div className="hero-divider my-8 h-px w-24 bg-white/30 origin-left" />
            <p className="hero-body text-white/90 text-sm font-light tracking-wide max-w-xs leading-relaxed">
              Every frame is a memory. Browse our curated collection of resort life, celebrations, and natural beauty.
            </p>
          </div>

          {/* Browse + bobbing chevron */}
          <button
            onClick={scrollToGrid}
            className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/35 hover:text-white/70 transition-colors"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase" style={{ marginBottom: '1vh' }}>Browse</span>
            <div className="chevron-bob">
              <svg
                width="22" height="13" viewBox="0 0 22 13"
                fill="none" xmlns="http://www.w3.org/2000/svg"
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
          </button>

          <div className="hero-eyebrow absolute bottom-10 left-8 md:left-14 z-20">
            <p className="text-white/25 text-[9px] font-bold tracking-[0.2em] uppercase">{galleryItems.length} photos</p>
          </div>
        </section>

        {/* ═══ GALLERY SECTION ═══ */}
        <div id="gallery-grid">

          {/* Header */}
          <div className="flex flex-col items-center justify-center px-6 md:px-10 pt-10 pb-6">
            <div className="flex items-center gap-2 text-black/70 text-[20px] font-semibold tracking-[0.25em] uppercase">
              <IconCamera className="w-12 h-10" />
              Gallery
            </div>
            {[0, 2].map(mt => (
              <svg key={mt} viewBox="0 0 260 14" style={{ width: 'clamp(160px,24vw,260px)', display: 'block', marginTop: mt, opacity: 0.45 }}>
                <path d="M2 9 Q35 3 65 9 Q95 15 125 9 Q155 3 185 9 Q215 15 258 8" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ))}
          </div>

          {/* Flex masonry grid */}
          <div className="px-4 md:px-8 pb-16">
            {galleryItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-stone-400 gap-4">
                <IconImage className="w-12 h-12 opacity-30" />
                <p className="text-sm font-semibold tracking-wide">No photos in this category</p>
              </div>
            ) : (
              <FlexMasonryGrid items={galleryItems} onItemClick={openLightbox} />
            )}
          </div>
        </div>

        {lightboxIndex !== null && (
          <Lightbox
            item={galleryItems[lightboxIndex]}
            index={lightboxIndex}
            total={galleryItems.length}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </div>
    </>
  );
}