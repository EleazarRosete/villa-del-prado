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
// function NavBtn({ dir, onClick, disabled }: { dir: 'prev' | 'next'; onClick: () => void; disabled: boolean }) {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`gallery-nav-btn${disabled ? ' gallery-nav-btn--disabled' : ''}`}
//       onMouseEnter={e => {
//         if (!disabled) e.currentTarget.classList.add('gallery-nav-btn--hovered');
//       }}
//       onMouseLeave={e => {
//         e.currentTarget.classList.remove('gallery-nav-btn--hovered');
//       }}
//     >
//       <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//         stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
//         {dir === 'next' ? (
//           <>
//             <line x1="4" y1="12" x2="20" y2="12" />
//             <polyline points="13 5 20 12 13 19" />
//           </>
//         ) : (
//           <>
//             <line x1="20" y1="12" x2="4" y2="12" />
//             <polyline points="11 5 4 12 11 19" />
//           </>
//         )}
//       </svg>
//     </button>
//   );
// }

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
    <div onClick={onClose} className="gallery-lightbox-backdrop">
      <div onClick={e => e.stopPropagation()} className="gallery-lightbox-inner">

        {/* Image */}
        <div className="gallery-lightbox__img-wrap">
          <img key={item.img} src={item.img} alt={item.label} className="gallery-lightbox__img" />

          {/* Close */}
          <button onClick={onClose} className="gallery-lightbox__close" aria-label="Close">
            <IconX className="w-4 h-4" />
          </button>

          {/* Counter badge */}
          <div className="gallery-lightbox__counter">{index + 1} / {total}</div>

          {/* Side nav arrows — visible on tablet+ overlaid on image */}
          <button
            onClick={e => { e.stopPropagation(); onPrev(); }}
            className={`gallery-lightbox__side-btn gallery-lightbox__side-btn--prev${index === 0 ? ' gallery-lightbox__side-btn--hidden' : ''}`}
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="square">
              <line x1="20" y1="12" x2="4" y2="12" /><polyline points="11 5 4 12 11 19" />
            </svg>
          </button>
          <button
            onClick={e => { e.stopPropagation(); onNext(); }}
            className={`gallery-lightbox__side-btn gallery-lightbox__side-btn--next${index === total - 1 ? ' gallery-lightbox__side-btn--hidden' : ''}`}
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="square">
              <line x1="4" y1="12" x2="20" y2="12" /><polyline points="13 5 20 12 13 19" />
            </svg>
          </button>
        </div>

        {/* Footer: meta + nav buttons */}
        <div className="gallery-lightbox__footer">
          <div className="gallery-lightbox__meta">
            <p className="gallery-lightbox__meta-category">{item.category}</p>
            <p className="gallery-lightbox__meta-label">{item.label}</p>
          </div>

          <div className="gallery-lightbox__footer-right">
            <div className="gallery-lightbox__location">
              <IconMapPin className="w-3 h-3" />
              Demo Beach Resort · Batangas
            </div>
            {/* Bottom nav — visible on mobile only */}
            {/* <div className="gallery-lightbox__nav">
              <NavBtn dir="prev" onClick={onPrev} disabled={index === 0} />
              <NavBtn dir="next" onClick={onNext} disabled={index === total - 1} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY CELL ─────────────────────────────────────────────────────────────
function GalleryCell({ item, index, onClick, alwaysShowLabel = false }: {
  item: GalleryItem;
  index: number;
  onClick: (item: GalleryItem) => void;
  alwaysShowLabel?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || alwaysShowLabel;

  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="gallery-cell"
      style={{
        flex: `${item.weight} 1 ${Math.round(item.weight * 120)}px`,
        animationDelay: `${index * 0.03}s`,
      }}
    >
      <img
        src={item.img}
        alt={item.label}
        loading="lazy"
        className={`gallery-cell__img${hovered ? ' gallery-cell__img--hovered' : ''}`}
      />
      <div className="gallery-cell__vignette" />
      <div className={`gallery-cell__overlay${active ? ' gallery-cell__overlay--visible' : ''}`} />
      <div className={`gallery-cell__label${active ? ' gallery-cell__label--visible' : ''}`}>
        <p className="gallery-cell__label-category">{item.category}</p>
        <p className="gallery-cell__label-name">{item.label}</p>
      </div>
    </div>
  );
}

// ─── FLEX MASONRY GRID ────────────────────────────────────────────────────────
function FlexMasonryGrid({ items, onItemClick }: {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}) {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>(() => {
    if (window.innerWidth < 640) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
  });

  useEffect(() => {
    let prev = breakpoint;
    const update = () => {
      const next =
        window.innerWidth < 640 ? 'mobile' :
        window.innerWidth < 1024 ? 'tablet' : 'desktop';
      if (next !== prev) {
        prev = next;
        setBreakpoint(next);
        // Prevent stale scroll position leaving a gap when page height shrinks
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Mobile: single column, label always visible
  if (breakpoint === 'mobile') {
    return (
      <div className="gallery-masonry gallery-masonry--mobile">
        {items.map((item, i) => (
          <div key={item.label} className="gallery-masonry__row gallery-masonry__row--mobile">
            <GalleryCell item={item} index={i} onClick={onItemClick} alwaysShowLabel />
          </div>
        ))}
      </div>
    );
  }

  // Tablet: 2-col rows; Desktop: alternating 3/2
  const rowSizes = breakpoint === 'tablet' ? [2, 2] : [3, 2];
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
    <div className="gallery-masonry">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="gallery-masonry__row">
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

  // Fix the DevTools mobile→desktop resize gap: keep --gallery-vh in sync with
  // the real window.innerHeight so the hero always fills exactly one viewport.
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--gallery-vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  const scrollToGrid = () => {
    document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openLightbox  = (item: GalleryItem) => setLightboxIndex(galleryItems.indexOf(item));
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i));
  const goNext = () => setLightboxIndex(i => (i !== null && i < galleryItems.length - 1 ? i + 1 : i));

  return (
    <div className="gallery-page">

      {/* ═══ HERO ═══ */}
      <section className="gallery-hero grain">
        <div className="gallery-hero__bg-wrap">
          <img
            src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80&auto=format"
            alt="Demo Beach Resort"
            className="gallery-hero__img"
          />
          <div className="gallery-hero__overlay-base" />
          <div className="gallery-hero__overlay-top" />
          <div className="gallery-hero__overlay-bottom" />
        </div>

        <div className="gallery-hero__content">
          <p className="gallery-hero__eyebrow">— Photography Collection —</p>
          <h1 className="gallery-hero__h1">
            <span className="gallery-hero__line1">Moments</span>
            <span className="gallery-hero__line2">Worth Keeping</span>
          </h1>
          <div className="gallery-hero__divider" />
          <p className="gallery-hero__body">
            Every frame is a memory. Browse our curated collection of resort life, celebrations, and natural beauty.
          </p>
        </div>

        {/* Browse + bobbing chevron */}
        <button onClick={scrollToGrid} className="gallery-hero__scroll-btn">
          <span className="gallery-hero__scroll-label">Browse</span>
          <div className="gallery-hero__chevron-bob">
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

        <div className="gallery-hero__photo-count">
          <p className="gallery-hero__photo-count-text">{galleryItems.length} photos</p>
        </div>
      </section>

      {/* ═══ GALLERY SECTION ═══ */}
      <div id="gallery-grid">

        {/* Header — uses amenities-bottom-cta__heading for "Gallery" text */}
        <div className="gallery-section-header">
          <div className="gallery-section-header__title-row">
            <IconCamera className="gallery-section-header__icon" />
            <h2 className="amenities-bottom-cta__heading">Gallery</h2>
          </div>
          {[0, 2].map(mt => (
            <svg key={mt} viewBox="0 0 260 14" className="gallery-section-header__wave" style={{ marginTop: mt }}>
              <path d="M2 9 Q35 3 65 9 Q95 15 125 9 Q155 3 185 9 Q215 15 258 8" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          ))}
        </div>

        {/* Flex masonry grid */}
        <div className="gallery-grid-wrap">
          {galleryItems.length === 0 ? (
            <div className="gallery-empty">
              <IconImage className="gallery-empty__icon" />
              <p className="gallery-empty__text">No photos in this category</p>
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
  );
}