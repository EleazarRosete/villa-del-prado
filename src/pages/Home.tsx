import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

// ─── TYPES ─────────────────────────────────────────────────────────────────
interface Room { name: string; tag: string; tagBg: string; tagText: string; desc: string; price: string; beds: string; guests: string; img: string; }
interface GalleryItem { img: string; label: string; }

// ─── SLIDES ─────────────────────────────────────────────────────────────────
const SLIDES = [
  { img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80&auto=format', thumb: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=240&q=70', label: 'Nipa Cabanas', sub: 'Beachfront Huts', accent: '#fcd34d' },
  { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=240&q=70', label: 'White Sand Beach', sub: 'Sariaya, Quezon', accent: '#5eead4' },
  { img: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1920&q=80&auto=format', thumb: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=240&q=70', label: 'Resort Pool', sub: 'With Water Slide', accent: '#93c5fd' },
  { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=240&q=70', label: 'White Sand Beach', sub: 'Sariaya, Quezon', accent: '#5eead4' },
  { img: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=1920&q=80&auto=format', thumb: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=240&q=70', label: 'Water Sports', sub: 'Kayak · Jet Ski', accent: '#6ee7b7' },
  { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=240&q=70', label: 'Sunrise Views', sub: 'Golden Hour', accent: '#fca5a5' },
];

const N = SLIDES.length;
const mod = (n: number) => ((n % N) + N) % N;

// ─── BRAND COLORS ──────────────────────────────────────────────────────────
const BRAND = {
  primary: '#0077a8',
  primaryDark: '#005f8a',
  primaryLight: '#e0f2fa',
  primaryGlow: 'rgba(0,119,168,0.25)',
};

// ─── DATA ───────────────────────────────────────────────────────────────────
const ROOMS: Room[] = [
  { name: 'Nipa Hut Cabana', tag: 'Beachfront', tagBg: 'bg-sky-100', tagText: 'text-sky-700', desc: 'Authentic Filipino nipa hut on the shore with bamboo interiors and sea breeze.', price: '₱2,500', beds: '1 King Bed', guests: 'Up to 2 guests', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80' },
  { name: 'Standard Room', tag: 'Most Popular', tagBg: 'bg-sky-100', tagText: 'text-sky-700', desc: 'Air-conditioned room with private bathroom and lush garden views.', price: '₱1,800', beds: '1 Queen Bed', guests: 'Up to 2 guests', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80' },
  { name: 'Deluxe Room', tag: 'Sea View', tagBg: 'bg-blue-100', tagText: 'text-blue-700', desc: 'Ocean-facing balcony with premium linens and Sariaya coastline views.', price: '₱2,200', beds: '1 King Bed', guests: 'Up to 2 guests', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80' },
  { name: 'Family Suite', tag: 'Best Value', tagBg: 'bg-amber-100', tagText: 'text-amber-700', desc: 'Spacious suite with extra beds, open-plan layout and private terrace.', price: '₱3,200', beds: '2 Beds', guests: 'Up to 5 guests', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80' },
];

const GALLERY: GalleryItem[] = [
  { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=85', label: 'White Sand Beach' },
  { img: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1400&q=85', label: 'Resort Pool' },
  { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85', label: 'Sunrise Views' },
  { img: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=1400&q=85', label: 'Water Sports' },
  { img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=85', label: 'Fresh Dining' },
  { img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1400&q=85', label: 'Beachfront Huts' },
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

// ─── ROOM MODAL ──────────────────────────────────────────────────────────────
function RoomModal({ room, onClose }: { room: Room | null; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = room ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [room]);
  if (!room) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9998,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      padding: 0, animation: 'fadeIn .25s ease',
    }}>
      <style>{`
        @media (min-width: 600px) {
          .room-modal-wrap { max-width: 580px !important; margin: 24px !important; align-self: center !important; }
          .room-modal-img  { height: 260px !important; }
        }
        @media (min-width: 1024px) {
          .room-modal-wrap { max-width: 640px !important; }
          .room-modal-img  { height: 300px !important; }
        }
      `}</style>

      <div onClick={e => e.stopPropagation()} className="room-modal-wrap" style={{
        background: 'white', width: '100%', overflow: 'hidden',
        boxShadow: '0 -8px 60px rgba(0,0,0,.25)',
        animation: 'modalPop .35s cubic-bezier(.16,1,.3,1) both',
        maxHeight: '92vh', display: 'flex', flexDirection: 'column',
      }}>
        {/* Image */}
        <div className="room-modal-img" style={{ position: 'relative', height: 210, flexShrink: 0 }}>
          <img src={room.img} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 60%)' }} />
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 14, width: 34, height: 34,
            background: 'rgba(255,255,255,.9)', border: 'none', cursor: 'pointer',
            fontSize: 18, color: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,.15)',
          }}>×</button>
          <span style={{
            position: 'absolute', top: 14, left: 14,
            background: BRAND.primary, color: 'white',
            fontSize: 8, fontWeight: 900, letterSpacing: '.2em', textTransform: 'uppercase',
            padding: '5px 12px',
          }}>{room.tag}</span>
          <h3 style={{
            position: 'absolute', bottom: 14, left: 18, color: 'white', margin: 0,
            fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 800, lineHeight: 1.1,
          }}>{room.name}</h3>
        </div>

        {/* Content */}
        <div style={{ padding: 'clamp(18px,4vw,28px)', overflowY: 'auto', flexGrow: 1 }}>
          <p style={{ fontSize: 'clamp(12px,1.3vw,14px)', color: 'rgba(0,0,0,.48)', lineHeight: 1.75, fontWeight: 300, margin: '0 0 18px' }}>{room.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {[['🛏️', room.beds], ['👥', room.guests], ['❄️', 'Air conditioned']].map(([icon, text]) => (
              <div key={text as string} style={{
                display: 'flex', alignItems: 'center', gap: 7, background: '#f5f3ee',
                padding: '7px 14px', fontSize: 'clamp(11px,1.2vw,13px)', color: 'rgba(0,0,0,.6)', fontWeight: 500,
              }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 18, borderTop: '1px solid rgba(0,0,0,.08)', flexWrap: 'wrap', gap: 12,
          }}>
            <div>
              <span style={{ fontSize: 'clamp(22px,4vw,30px)', fontWeight: 900, color: BRAND.primary }}>{room.price}</span>
              <span style={{ fontSize: 12, color: 'rgba(0,0,0,.35)', marginLeft: 5 }}>/ night</span>
            </div>
            {/* Book Now — transparent bg, blue border, blue text; hover = light blue fill */}
            <Link to="/booking" onClick={onClose} className="btn-outline" style={{ fontSize: 10 }}>
              Book Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RING CAROUSEL ───────────────────────────────────────────────────────────
function RingCarousel({ active, onNext, accent, isMobile }: { active: number; onNext: () => void; accent: string; isMobile: boolean; }) {
  const nextIdx = mod(active + 1);
  const slide = SLIDES[active];
  const nextSlide = SLIDES[nextIdx];

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-3 w-full">
        <div key={`label-${active}`} className="text-center" style={{ animation: 'labelFadeUp .5s cubic-bezier(.16,1,.3,1) both' }}>
          <div className="text-[10px] font-extrabold tracking-widest uppercase" style={{ color: accent }}>{slide.label}</div>
          <div className="text-white/45 text-[8px] font-medium tracking-wider">{slide.sub}</div>
        </div>
        <div className="flex gap-2 items-center">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => onNext()} className="border-0 p-0 cursor-pointer transition-all duration-400"
              style={{ width: i === active ? 20 : 6, height: 6, background: i === active ? accent : 'rgba(255,255,255,.3)' }} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="w-24 h-[2px] overflow-hidden bg-white/10">
          <div key={`prog-${active}`} className="h-full" style={{ background: accent, animation: 'fillBar 5s linear both' }} />
        </div>
        <div className="flex gap-5">
          {[['500m', 'Beach'], ['20+', 'Rooms'], ['10+', 'Activities'], ['4.8★', 'Rating']].map(([num, lbl]) => (
            <div key={lbl} className="flex flex-col gap-0.5 items-center">
              <span className="text-white font-black leading-none text-sm">{num}</span>
              <span className="text-white/55 text-[7px] font-bold tracking-widest uppercase">{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 select-none" style={{ width: 240 }}>
      <div key={`label-${active}`} className="flex flex-col gap-0.5" style={{ animation: 'labelFadeUp .5s cubic-bezier(.16,1,.3,1) both' }}>
        <span className="text-[10px] font-extrabold tracking-widest uppercase leading-tight" style={{ color: accent, transition: 'color .6s ease' }}>{slide.label}</span>
        <span className="text-white/50 text-[8px] font-medium tracking-wider">{slide.sub}</span>
      </div>
      <div className="flex items-end gap-2.5">
        <div className="relative overflow-hidden flex-shrink-0" style={{ width: 130, height: 92, boxShadow: `0 10px 36px rgba(0,0,0,.55), 0 0 0 1.5px ${accent}55`, transition: 'box-shadow .6s ease' }}>
          <img key={`active-${active}`} src={slide.thumb} alt={slide.label} className="w-full h-full object-cover" style={{ animation: 'activeReveal .55s cubic-bezier(.16,1,.3,1) both' }} />
          <div key={`prog-${active}`} className="absolute bottom-0 left-0 h-[2.5px]" style={{ background: accent, animation: 'fillBar 5s linear both' }} />
        </div>
        <button onClick={onNext} className="relative overflow-hidden flex-shrink-0 cursor-pointer border-0 p-0 group"
          style={{ width: 96, height: 68, opacity: 0.5, transition: 'opacity .35s ease', boxShadow: '0 4px 18px rgba(0,0,0,.4)' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.78')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
          aria-label={`Next: ${nextSlide.label}`}>
          <img key={`next-${nextIdx}`} src={nextSlide.thumb} alt={nextSlide.label} className="w-full h-full object-cover" style={{ animation: 'thumbSlideIn .5s cubic-bezier(.16,1,.3,1) both' }} />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors" />
          <div className="absolute bottom-1 right-1 text-[7px] font-bold tracking-wider uppercase" style={{ color: 'rgba(255,255,255,.5)' }}>next →</div>
        </button>
      </div>
      <div className="flex items-center gap-4 pt-1.5" style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}>
        {[['500m', 'Beach'], ['20+', 'Rooms'], ['10+', 'Activities'], ['4.8★', 'Rating']].map(([num, lbl]) => (
          <div key={lbl} className="flex flex-col gap-0.5">
            <span className="text-white font-black leading-none" style={{ fontSize: 14 }}>{num}</span>
            <span className="text-white/55 text-[7px] font-bold tracking-widest uppercase">{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── GALLERY CAROUSEL ────────────────────────────────────────────────────────
function GalleryCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [displayIdx, setDisplayIdx] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const G = GALLERY.length;

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => { setAnimating(true); setDirection('next'); }, 5000);
  }, []);

  useEffect(() => {
    if (!animating) return;
    const t = setTimeout(() => {
      setCurrent(p => {
        const next = direction === 'next' ? (p + 1) % G : (p - 1 + G) % G;
        setDisplayIdx(next);
        return next;
      });
      setAnimating(false);
    }, 600);
    return () => clearTimeout(t);
  }, [animating, direction, G]);

  useEffect(() => { startAuto(); return () => { if (autoRef.current) clearInterval(autoRef.current); }; }, [startAuto]);

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (animating) return;
    setDirection(dir); setAnimating(true); startAuto();
  }, [animating, startAuto]);

  const goTo = useCallback((idx: number) => {
    if (animating || idx === current) return;
    setDirection(idx > current ? 'next' : 'prev');
    setAnimating(true);
    setDisplayIdx(idx);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 600);
    startAuto();
  }, [animating, current, startAuto]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) navigate(dx < 0 ? 'next' : 'prev');
    touchStartX.current = null; touchStartY.current = null;
  };

  const prevIdx = (current - 1 + G) % G;
  const nextIdx = (current + 1) % G;
  const pendingIdx = direction === 'next' ? nextIdx : prevIdx;

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>

      {/* Main stage — increased height by ~30vh */}
      <div style={{
        position: 'relative', width: '100%', overflow: 'hidden',
        height: 'clamp(520px, 82vw, 860px)', perspective: '1400px', background: '#0a0f1a',
      }}>
        {/* BG crossfade layers */}
        {GALLERY.map((item, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: i === displayIdx ? 1 : 0,
            transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
            zIndex: 0, filter: 'brightness(0.32) saturate(0.6)', transform: 'scale(1.04)',
          }} />
        ))}

        {/* Atmospheric overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: `radial-gradient(ellipse 70% 80% at 50% 110%, ${BRAND.primary}22 0%, transparent 65%), radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.6) 100%)`,
        }} />

        {/* Counter + label */}
        <div key={`lbl-${current}`} style={{
          position: 'absolute', top: 22, left: 26, zIndex: 10,
          animation: 'galLabelUp .45s cubic-bezier(.16,1,.3,1) both', pointerEvents: 'none',
        }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.28em', textTransform: 'uppercase', color: `${BRAND.primary}cc`, marginBottom: 5 }}>
            {String(current + 1).padStart(2, '0')} <span style={{ color: 'rgba(255,255,255,.15)' }}>/</span> {String(G).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.75)' }}>
            {GALLERY[current].label}
          </div>
        </div>

        {/* Three-card wheel */}
        <div style={{ position: 'absolute', inset: '6% 4%', zIndex: 5 }}>
          {/* PREV */}
          <div onClick={() => navigate('prev')} style={{
            position: 'absolute', width: '30%', height: '80%', top: '9%', left: '-20%',
            overflow: 'hidden', cursor: 'pointer',
            transform: animating && direction === 'next' ? 'translateX(-30%) rotateY(-42deg) scale(0.78)' : 'translateX(0%) rotateY(-22deg) scale(0.9)',
            opacity: animating && direction === 'next' ? 0 : 0.6,
            zIndex: 2, boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s ease',
          }}>
            <img src={GALLERY[prevIdx].img} alt={GALLERY[prevIdx].label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,10,20,0.35)' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${BRAND.primary}18, transparent 60%)` }} />
          </div>

          {/* NEXT */}
          <div onClick={() => navigate('next')} style={{
            position: 'absolute', width: '30%', height: '80%', top: '9%', right: '-20%', left: 'auto',
            overflow: 'hidden', cursor: 'pointer',
            transform: animating && direction === 'prev' ? 'translateX(30%) rotateY(42deg) scale(0.78)' : 'translateX(0%) rotateY(22deg) scale(0.9)',
            opacity: animating && direction === 'prev' ? 0 : 0.6,
            zIndex: 2, boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s ease',
          }}>
            <img src={GALLERY[nextIdx].img} alt={GALLERY[nextIdx].label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,10,20,0.35)' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to left, ${BRAND.primary}18, transparent 60%)` }} />
          </div>

          {/* CENTER */}
          <div style={{
            position: 'absolute', width: '80%', height: '100%', top: 0, left: '50%',
            transform: animating
              ? direction === 'next' ? 'translateX(-50%) rotateY(-8deg) scale(0.95)' : 'translateX(-50%) rotateY(8deg) scale(0.95)'
              : 'translateX(-50%) rotateY(0deg) scale(1)',
            opacity: 1, zIndex: 3, overflow: 'hidden',
            boxShadow: `0 28px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), 0 0 40px ${BRAND.primary}22`,
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.6s ease',
          }}>
            <img src={animating ? GALLERY[pendingIdx].img : GALLERY[current].img}
              alt={animating ? GALLERY[pendingIdx].label : GALLERY[current].label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(to bottom, transparent, rgba(0,8,20,0.85))' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, transparent, ${BRAND.primary}, transparent)`, opacity: 0.7 }} />
            <div key={`center-lbl-${current}`} style={{
              position: 'absolute', bottom: 20, left: 20, right: 20,
              animation: animating ? 'none' : 'galLabelUp .4s cubic-bezier(.16,1,.3,1) both',
            }}>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.22em', textTransform: 'uppercase', color: `${BRAND.primary}dd`, marginBottom: 4 }}>Villa Del Prado</div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.92)' }}>
                {animating ? GALLERY[pendingIdx].label : GALLERY[current].label}
              </div>
            </div>
          </div>
        </div>

    
        {/* Swipe hint — arrow updated */}
        <div style={{
          position: 'absolute', bottom: 16, right: 20, zIndex: 9,
          fontSize: 8, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase',
          color: `${BRAND.primary}88`, pointerEvents: 'none',
        }}>Swipe →</div>
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {GALLERY.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === current ? 24 : 6, height: 5,
              background: i === current ? `linear-gradient(to right, ${BRAND.primary}, ${BRAND.primaryDark})` : 'rgba(0,0,0,.12)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.45s cubic-bezier(0.25,1,0.5,1)',
              boxShadow: i === current ? `0 2px 8px ${BRAND.primaryGlow}` : 'none',
            }} />
          ))}
        </div>
        {/* View All Photos — consistent arrow → */}
        <Link to="/gallery" className="btn-outline" style={{ fontSize: 9 }}>
          View All Photos →
        </Link>
      </div>
    </div>
  );
}

// ─── AMENITIES EXPAND CARDS ──────────────────────────────────────────────────
const AM_CARDS = [
  { id: 'water', label: 'Beach & Water', headline: 'Where the\nSea Begins.', desc: 'Immerse yourself in 500m of pristine white sand, a resort pool with water slide, kiddie pool, kayaking, jet ski rentals, and guided boat tours along the Sariaya coastline.', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85' },
  { id: 'sports', label: 'Sports & Rec', headline: 'Play Hard.\nRest Easy.', desc: 'Stay active with beach volleyball, basketball, fishing with local guides, scenic jogging paths, guided sunrise spots, and bike rentals to explore the resort grounds.', img: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=900&q=85' },
  { id: 'dining', label: 'Dining & Nights', headline: 'Flavors by\nthe Shore.', desc: 'Savor Filipino and international cuisine at our beachside restaurant, sip cocktails at the beach bar, enjoy weekend live music, videoke nights, and open-air BBQ sessions.', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=85' },
  { id: 'events', label: 'Events', headline: 'Every\nOccasion.', desc: 'From intimate beachfront weddings and elegant debut celebrations to corporate team buildings and family reunions — every event is crafted with care and coastal charm.', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=85' },
];

function AmenitiesSection() {
  const [expanded, setExpanded] = useState<string | null>('water');

  return (
    <section style={{ background: '#edeae3', padding: 'clamp(48px,8vw,80px) 0' }}>
      <style>{`
        @media (max-width: 767px) {
          .am-grid { flex-direction: column !important; height: auto !important; }
          .am-card { flex: none !important; width: 100% !important; height: 220px !important; align-self: auto !important; margin: 0 !important; }
          .am-card.open { height: 320px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .am-grid { height: clamp(340px,55vw,480px) !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 5%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 'clamp(32px,5vw,56px)' }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(0,0,0,.3)', marginBottom: 10 }}>— Villa Del Prado</p>
            <h2 style={{ fontSize: 'clamp(28px, 5.5vw, 60px)', fontWeight: 900, color: '#111', lineHeight: .95, letterSpacing: '-1px', margin: 0 }}>
              Life at<br /><span style={{ color: BRAND.primary }}>the Resort.</span>
            </h2>
          </div>
          <div style={{ maxWidth: 280, paddingTop: 4 }}>
            <p style={{ fontSize: 13, color: 'rgba(0,0,0,.45)', fontWeight: 300, lineHeight: 1.75, marginBottom: 20 }}>
              From sunrise swims to candlelit dinners — every moment at Villa Del Prado is designed to be remembered.
            </p>
            {/* Arrow → consistent with rest of site */}
            <Link to="/amenities" className="btn-outline">View All Amenities →</Link>
          </div>
        </div>

        <div className="am-grid" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', height: 'clamp(380px, 58vw, 640px)' }}>
          {AM_CARDS.map((card, idx) => {
            const isOpen = expanded === card.id;
            const isTop = idx % 2 === 0;
            return (
              <div key={card.id} onClick={() => setExpanded(card.id)}
                className={`am-card${isOpen ? ' open' : ''}`}
                style={{
                  position: 'relative', overflow: 'hidden', cursor: 'pointer',
                  flex: isOpen ? '3.4' : '1', minWidth: 0,
                  alignSelf: isTop ? 'flex-start' : 'flex-end',
                  height: '90%', marginTop: isTop ? '5%' : 0, marginBottom: isTop ? 0 : '5%',
                  transition: 'flex 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
                }}>
                <img src={card.img} alt={card.label} style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1), filter 0.7s ease',
                  transform: isOpen ? 'scale(1.05)' : 'scale(1.0)',
                  filter: isOpen ? 'brightness(.55)' : 'brightness(.42) saturate(.75)',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: isOpen
                    ? 'linear-gradient(to top, rgba(0,0,0,.88) 0%, rgba(0,0,0,.25) 55%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 60%)',
                  transition: 'background 0.7s ease',
                }} />
                {/* Collapsed state */}
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  justifyContent: 'flex-end', alignItems: 'center', padding: '0 0 24px 0', gap: 12,
                  opacity: isOpen ? 0 : 1, transition: 'opacity 0.4s ease',
                  pointerEvents: isOpen ? 'none' : 'auto',
                }}>
                  <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', fontSize: 9, fontWeight: 800, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>{card.label}</span>
                  {/* + icon kept as requested */}
                  <div style={{ width: 28, height: 28, border: '1px solid rgba(255,255,255,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.7)', fontSize: 16, fontWeight: 300, flexShrink: 0 }}>+</div>
                </div>
                {/* Expanded content */}
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: 'clamp(16px, 2.5vw, 36px)',
                  opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.55s ease 0.2s, transform 0.55s cubic-bezier(0.25,1,0.5,1) 0.2s',
                  pointerEvents: isOpen ? 'auto' : 'none',
                }}>
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', marginBottom: 10 }}>{card.label}</span>
                  <h3 style={{ fontSize: 'clamp(18px, 3vw, 38px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-.5px', marginBottom: 10, whiteSpace: 'pre-line' }}>{card.headline}</h3>
                  <p style={{ fontSize: 'clamp(11px,1.1vw,13px)', color: 'rgba(255,255,255,.5)', fontWeight: 300, lineHeight: 1.75, maxWidth: 340 }}>{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── GUEST STORIES DATA ──────────────────────────────────────────────────────
const GUEST_REVIEWS = [
  { name: 'Maria Santos',       date: 'July 20, 2025',  platform: 'Booking.com', avatar: 'MS', avatarBg: '#0077a8', quote: "The most relaxing beach trip we've ever had! Kids absolutely loved the pool slide and the beach was pristine. Staff were very helpful with instructions and incredibly responsive to any questions. Would wholeheartedly recommend to everyone!", rating: 5 },
  { name: 'John Reyes',         date: 'May 27, 2025',   platform: 'Booking.com', avatar: 'JR', avatarBg: '#005f8a', quote: "Absolutely Wonderful! 🌟 The Villa was exactly what my family and I had all hoped for — a spacious, well-equipped house set in beautiful grounds. Couldn't have been more perfect for our group getaway!", rating: 5 },
  { name: 'Megan Cruz',         date: 'May 18, 2025',   platform: 'Booking.com', avatar: 'MC', avatarBg: '#0099cc', quote: "I booked Villa Del Prado for my sister's bachelorette party with a group of 18 guests, and it was absolutely perfect for us. The house, garden, and beachfront made every moment magical.", rating: 5 },
  { name: 'Georgia Lim',        date: 'May 5, 2025',    platform: 'Booking.com', avatar: 'GL', avatarBg: '#004f72', quote: "Dan was a super host and was there if I needed anything, and incredibly helpful in the run up to the trip. We used Dan's recommendation of the Luxury Private Chef which was amazing. The house itself was stunning.", rating: 5 },
  { name: 'Ana Reyes',          date: 'April 12, 2025', platform: 'Booking.com', avatar: 'AR', avatarBg: '#0077a8', quote: "Perfect venue for our company team building! Great facilities, amazing beach, and outstanding food. Our whole team had a blast and we're already planning our return trip next year.", rating: 5 },
  { name: 'Carlo Mendoza',      date: 'March 28, 2025', platform: 'Booking.com', avatar: 'CM', avatarBg: '#005f8a', quote: "We celebrated our anniversary here and it was absolutely magical. Woke up to the sound of waves every morning. The nipa hut cabana was so cozy and the sunsets were breathtaking. 10/10 experience!", rating: 5 },
  { name: 'Lisa Tan',           date: 'March 14, 2025', platform: 'Booking.com', avatar: 'LT', avatarBg: '#0099cc', quote: "Brought our whole barkada for a long weekend and everyone loved it. The pool with the water slide was a highlight — even the adults couldn't stop going on it. Clean, beautiful, and great value!", rating: 5 },
  { name: 'Rico dela Cruz',     date: 'Feb 22, 2025',   platform: 'Booking.com', avatar: 'RC', avatarBg: '#004f72', quote: "Fantastic resort just a few hours from Manila. The beachfront location is stunning and the staff made every request feel effortless. We'll definitely be coming back every summer from now on.", rating: 5 },
  { name: 'Patrice Villanueva', date: 'Feb 8, 2025',    platform: 'Booking.com', avatar: 'PV', avatarBg: '#0077a8', quote: "Hosted our family reunion here and it was beyond expectations. The family suite comfortably fit everyone, the food was amazing, and having the beach right at our doorstep made it truly special.", rating: 5 },
  { name: 'Jenna Bautista',     date: 'Jan 19, 2025',   platform: 'Booking.com', avatar: 'JB', avatarBg: '#005f8a', quote: "Such a hidden gem in Quezon! The resort has a really authentic Filipino vibe with the nipa huts but with all the modern comforts you need. The sunrise views from our balcony were absolutely unforgettable.", rating: 5 },
];

// ─── ARROW BUTTON (guest stories) ────────────────────────────────────────────
function ArrowBtn({ dir, disabled, onClick }: { dir: 'prev' | 'next'; disabled: boolean; onClick: () => void }) {
  const isPrev = dir === 'prev';
  return (
    <button onClick={onClick} disabled={disabled} style={{
      position: 'absolute',
      [isPrev ? 'left' : 'right']: 14,
      top: '50%', transform: 'translateY(-50%)',
      zIndex: 10, width: 44, height: 44,
      border: `1.5px solid ${disabled ? 'rgba(0,0,0,.13)' : BRAND.primary}`,
      background: disabled ? 'rgba(245,243,238,0.85)' : 'white',
      color: disabled ? 'rgba(0,0,0,.2)' : BRAND.primary,
      fontSize: 16, cursor: disabled ? 'default' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
      boxShadow: disabled ? 'none' : `0 4px 18px ${BRAND.primaryGlow}`,
      transition: 'all .22s ease', backdropFilter: 'blur(8px)',
    }}
      onMouseEnter={e => { if (!disabled) { const el = e.currentTarget as HTMLElement; el.style.background = BRAND.primary; el.style.color = 'white'; }}}
      onMouseLeave={e => { if (!disabled) { const el = e.currentTarget as HTMLElement; el.style.background = 'white'; el.style.color = BRAND.primary; }}}
    >{isPrev ? '←' : '→'}</button>
  );
}

// ─── GUEST STORIES SECTION ───────────────────────────────────────────────────
function GuestStoriesSection() {
  const [page, setPage] = useState(0);
  const [activeReview, setActiveReview] = useState<typeof GUEST_REVIEWS[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCards(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const VISIBLE = visibleCards;
  const TOTAL_PAGES = Math.ceil(GUEST_REVIEWS.length / VISIBLE);
  const clampedPage = Math.min(page, TOTAL_PAGES - 1);
  const prev = () => setPage(p => Math.max(0, p - 1));
  const next = () => setPage(p => Math.min(TOTAL_PAGES - 1, p + 1));

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) { if (dx < 0) next(); else prev(); }
    touchStartX.current = null;
  };

  useEffect(() => {
    if (!activeReview) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveReview(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeReview]);

  return (
    <section style={{ background: '#f5f3ee', padding: 'clamp(48px,8vw,72px) 0 clamp(48px,8vw,80px)' }}>
      <div style={{ maxWidth: 1380, margin: '0 auto', padding: '0 5%' }}>
        {/* Header */}
        <div className="sr" style={{ marginBottom: 'clamp(24px,4vw,40px)' }}>
          <h2 style={{
            fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
            fontSize: 'clamp(36px, 6vw, 74px)',
            fontWeight: 700, color: '#1a1a1a', margin: 0, lineHeight: 1.05,
          }}>Guest Stories</h2>
          <svg viewBox="0 0 260 14" style={{ width: 'clamp(140px,22vw,260px)', display: 'block', marginTop: 5, opacity: 0.28 }}>
            <path d="M2 9 Q35 3 65 9 Q95 15 125 9 Q155 3 185 9 Q215 15 258 7" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Slider */}
        <div className="sr" style={{ position: 'relative' }} ref={containerRef}>
          <ArrowBtn dir="prev" disabled={clampedPage === 0} onClick={prev} />
          <ArrowBtn dir="next" disabled={clampedPage >= TOTAL_PAGES - 1} onClick={next} />
          <div style={{ overflow: 'hidden', padding: '12px clamp(48px,5vw,68px)' }}
            onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div style={{
              display: 'flex', gap: 14,
              transform: `translateX(calc(-${clampedPage * 100}% - ${clampedPage * 14 * VISIBLE / VISIBLE}px))`,
              transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)', willChange: 'transform',
            }}>
              {GUEST_REVIEWS.map((t, i) => (
                <div key={i} className="review-card" onClick={() => setActiveReview(t)} style={{
                  flexShrink: 0,
                  width: `calc((100% - ${14 * (VISIBLE - 1)}px) / ${VISIBLE})`,
                  background: 'white', padding: 'clamp(16px,2vw,22px)',
                  boxShadow: '0 3px 18px rgba(0,0,0,.07)', border: '1px solid rgba(0,0,0,.05)',
                  display: 'flex', flexDirection: 'column', gap: 11, cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 38, height: 38, flexShrink: 0,
                      background: `linear-gradient(135deg, ${t.avatarBg}, ${BRAND.primaryDark})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 800, fontSize: 10,
                    }}>{t.avatar}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="12" cy="12" r="10" fill={BRAND.primary} opacity=".18"/>
                          <path d="M8 12l2.5 2.5L16 9" stroke={BRAND.primary} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div style={{ fontSize: 9, color: 'rgba(0,0,0,.32)', fontWeight: 600 }}>
                        {t.date} · <span style={{ color: BRAND.primary }}>{t.platform}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array(t.rating).fill(0).map((_, si) => <span key={si} style={{ color: '#f59e0b', fontSize: 13 }}>★</span>)}
                  </div>
                  <div style={{ fontSize: 12, color: '#444', lineHeight: 1.7, fontWeight: 300, flexGrow: 1 }}>
                    <span style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{t.quote}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: BRAND.primary, marginTop: 4, display: 'inline-block' }}>Read more</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots only — Book Now button removed */}
        <div style={{ marginTop: 28, padding: '0 clamp(48px,5vw,68px)' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {Array(TOTAL_PAGES).fill(0).map((_, i) => (
              <button key={i} onClick={() => setPage(i)} style={{
                width: i === clampedPage ? 22 : 6, height: 6,
                background: i === clampedPage ? `linear-gradient(to right, ${BRAND.primary}, ${BRAND.primaryDark})` : 'rgba(0,0,0,.15)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.4s cubic-bezier(0.25,1,0.5,1)',
                boxShadow: i === clampedPage ? `0 2px 8px ${BRAND.primaryGlow}` : 'none',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {activeReview && (
        <div onClick={() => setActiveReview(null)} style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px', animation: 'fadeIn .2s ease',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'white', padding: 'clamp(24px,4vw,36px)',
            maxWidth: 480, width: '100%', maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 24px 64px rgba(0,0,0,.22)',
            animation: 'modalPop .3s cubic-bezier(.16,1,.3,1) both', position: 'relative',
          }}>
            <button onClick={() => setActiveReview(null)} style={{
              position: 'absolute', top: 14, right: 14, width: 30, height: 30,
              background: '#f5f3ee', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#555',
            }}>×</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 48, height: 48, flexShrink: 0,
                background: `linear-gradient(135deg, ${activeReview.avatarBg}, ${BRAND.primaryDark})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: 12,
              }}>{activeReview.avatar}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{activeReview.name}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill={BRAND.primary} opacity=".18"/>
                    <path d="M8 12l2.5 2.5L16 9" stroke={BRAND.primary} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: 10, color: 'rgba(0,0,0,.35)', fontWeight: 600 }}>
                  {activeReview.date} · <span style={{ color: BRAND.primary }}>{activeReview.platform}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
              {Array(activeReview.rating).fill(0).map((_, si) => <span key={si} style={{ color: '#f59e0b', fontSize: 16 }}>★</span>)}
            </div>
            <p style={{ fontSize: 14, color: '#333', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>"{activeReview.quote}"</p>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── SCROLL TO TOP ───────────────────────────────────────────────────────────
function ScrollToTop({ scrollY, modalOpen }: { scrollY: number; modalOpen: boolean }) {
  const visible = scrollY > 300 && !modalOpen;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="scroll-top-btn"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none', transform: visible ? 'none' : 'translateY(12px)' }}
      aria-label="Scroll to top">
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'swimFloat 1.8s ease-in-out infinite' }}>
        <circle cx="5" cy="5" r="2.2" fill={BRAND.primary} />
        <line x1="5" y1="7.2" x2="11" y2="13" stroke={BRAND.primary} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="5" y1="7.2" x2="2" y2="3" stroke={BRAND.primary} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7.5" y1="10" x2="10" y2="9" stroke={BRAND.primary} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="11" y1="13" x2="15" y2="17" stroke={BRAND.primary} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="11" y1="13" x2="16" y2="15" stroke={BRAND.primary} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase', color: BRAND.primary, lineHeight: 1 }}>Top</span>
    </button>
  );
}

// ─── OFFER MODAL ─────────────────────────────────────────────────────────────
function OfferModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(7px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(12px,3vw,24px)', animation: 'fadeIn .3s ease',
    }}>
      <style>{`
        @media (max-width: 600px) {
          .offer-grid { grid-template-columns: 1fr !important; }
          .offer-img-panel { min-height: 180px !important; max-height: 220px !important; }
        }
      `}</style>
      <div onClick={e => e.stopPropagation()} className="offer-grid" style={{
        background: '#f5f3ee', maxWidth: 620, width: '100%',
        maxHeight: '92vh', overflowY: 'auto',
        boxShadow: '0 32px 80px rgba(0,0,0,.28)',
        animation: 'modalPop .4s cubic-bezier(.16,1,.3,1) both',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
      }}>
        <div className="offer-img-panel" style={{ position: 'relative', minHeight: 340 }}>
          <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=85" alt="Off Season Offer"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 'inherit' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', top: 16, left: 16, background: BRAND.primary, color: 'white', fontSize: 8, fontWeight: 900, letterSpacing: '.18em', textTransform: 'uppercase', padding: '5px 12px' }}>Limited Offer</div>
          <div style={{ position: 'absolute', bottom: 18, left: 18 }}>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', marginBottom: 4 }}>Off-Peak Special</div>
            <div style={{ fontSize: 'clamp(18px,3vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>Save Up to<br /><span style={{ color: '#fcd34d' }}>10% Off</span></div>
          </div>
        </div>
        <div style={{ padding: 'clamp(20px,3vw,32px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
            <button onClick={onClose} style={{ width: 28, height: 28, background: 'rgba(0,0,0,.08)', border: 'none', cursor: 'pointer', fontSize: 15, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.22em', textTransform: 'uppercase', color: BRAND.primary, marginBottom: 10 }}>Exclusive Deal</div>
          <h2 style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive", fontSize: 'clamp(22px,4vw,34px)', fontWeight: 700, color: '#1a1a1a', margin: '0 0 14px', lineHeight: 1.1 }}>Explore the<br />Off Season</h2>
          <div style={{ width: 36, height: 2, background: BRAND.primary, marginBottom: 14 }} />
          <p style={{ fontSize: 12, color: 'rgba(0,0,0,.5)', lineHeight: 1.8, fontWeight: 300, margin: '0 0 8px' }}>
            Book off-peak dates and enjoy <strong style={{ color: '#1a1a1a', fontWeight: 600 }}>10% off your entire stay</strong> — serene, uncrowded, and just as beautiful.
          </p>
          <p style={{ fontSize: 11, color: 'rgba(0,0,0,.35)', lineHeight: 1.7, fontWeight: 300, margin: '0 0 24px', flexGrow: 1 }}>Valid Jan–Mar and select weekdays. Discount applied at checkout.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/booking" onClick={onClose} className="btn-primary" style={{ justifyContent: 'center' }}>Book Now & Save →</Link>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 10, color: 'rgba(0,0,0,.3)', fontWeight: 600, padding: '4px 0', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              No thanks, I'll pay full price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────
const CTA_ITEMS = [
  { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80', heading: 'Reserve Now', sub: 'Book directly and get our best available rates — no hidden fees, instant confirmation.', href: '/booking', isExternal: false },
  { img: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=900&q=80', heading: 'Message on Facebook', sub: 'Have questions? Chat with us directly — we usually reply within the hour.', href: 'https://www.facebook.com/villadelpradoresort', isExternal: true },
  { img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80', heading: 'Explore the Off Season', sub: 'Enjoy discounted rates on off-peak dates — peaceful, uncrowded, and just as beautiful.', href: '/booking', isExternal: false },
];

function CtaSection({ onOpenOffer }: { onOpenOffer: () => void }) {
  const [hovered, setHovered] = useState(0);
  const handleClick = (i: number, item: typeof CTA_ITEMS[0]) => {
    if (i === 2) { onOpenOffer(); return; }
    if (item.isExternal) window.open(item.href, '_blank');
  };

  return (
    <section style={{ background: '#f5f3ee' }}>
      <style>{`
        @media (max-width: 767px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .cta-img-col { display: none !important; }
          .cta-item-row { padding: 20px 0 !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .cta-grid { gap: 36px !important; }
          .cta-img-col img { height: clamp(300px,45vw,440px) !important; }
        }
      `}</style>

      <div style={{ textAlign: 'center', paddingTop: 'clamp(48px,7vw,72px)', paddingBottom: 'clamp(24px,3vw,32px)' }}>
        <h2 style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive", fontSize: 'clamp(32px, 5.5vw, 68px)', fontWeight: 700, color: '#1a1a1a', margin: '0 0 10px', lineHeight: 1.05 }}>Ready to Escape?</h2>
        <div style={{ width: 1, height: 32, background: 'rgba(0,0,0,.18)', margin: '0 auto' }} />
      </div>

      <div className="cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1280, margin: '0 auto', padding: '0 5% clamp(48px,7vw,80px)', gap: 'clamp(32px,5vw,64px)', alignItems: 'start' }}>
        <div className="cta-img-col" style={{ position: 'relative', overflow: 'hidden' }}>
          {CTA_ITEMS.map((item, i) => (
            <img key={i} src={item.img} alt={item.heading} style={{
              width: '100%', height: 'clamp(280px,40vw,560px)', objectFit: 'cover', display: 'block',
              position: i === 0 ? 'relative' : 'absolute', top: 0, left: 0,
              opacity: hovered === i ? 1 : 0,
              transition: 'opacity 0.55s cubic-bezier(0.4,0,0.2,1)',
            }} />
          ))}
          <div style={{ position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center center', fontSize: 8, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(0,0,0,.3)', whiteSpace: 'nowrap' }}>Villa Del Prado · Sariaya</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {CTA_ITEMS.map((item, i) => (
            <div key={i}>
              <div style={{ height: 1, background: 'rgba(0,0,0,.12)', marginBottom: 'clamp(18px,2.5vw,28px)' }} />
              <div className="cta-item-row"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(0)}
                style={{ marginBottom: 'clamp(18px,2.5vw,28px)', cursor: 'pointer', padding: '4px 0' }}
                onClick={() => handleClick(i, item)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  {i === 0 ? (
                    <Link to="/booking" style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontSize: 'clamp(18px, 2.2vw, 28px)', fontWeight: 400, margin: 0, letterSpacing: '-.2px', transition: 'color .2s ease', color: hovered === i ? BRAND.primary : '#1a1a1a' }}>{item.heading}</h3>
                    </Link>
                  ) : (
                    <h3 style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontSize: 'clamp(18px, 2.2vw, 28px)', fontWeight: 400, color: hovered === i ? BRAND.primary : '#1a1a1a', margin: 0, letterSpacing: '-.2px', transition: 'color .2s ease' }}>{item.heading}</h3>
                  )}
                  <span style={{ fontSize: 16, color: hovered === i ? BRAND.primary : 'rgba(0,0,0,.25)', transition: 'all .25s ease', transform: hovered === i ? 'translateX(4px)' : 'none', display: 'inline-block', flexShrink: 0, marginLeft: 12 }}>→</span>
                </div>
                <p style={{ fontSize: 'clamp(11px,1.1vw,12px)', color: 'rgba(0,0,0,.45)', lineHeight: 1.75, fontWeight: 300, margin: 0, maxWidth: 420 }}>{item.sub}</p>
              </div>
            </div>
          ))}
          <div style={{ height: 1, background: 'rgba(0,0,0,.12)' }} />
        </div>
      </div>
    </section>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [active, setActive] = useState(0);
  const [prevBg, setPrevBg] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [offerOpen, setOfferOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [heroTextReady, setHeroTextReady] = useState(false);
  useScrollReveal();

  useEffect(() => {
    if (sessionStorage.getItem('offerSeen')) return;
    const t = setTimeout(() => { setOfferOpen(true); sessionStorage.setItem('offerSeen', '1'); }, 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroTextReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const advance = useCallback(() => {
    setActive((cur) => {
      setPrevBg(cur);
      const next = mod(cur + 1);
      setTimeout(() => setPrevBg(null), 1600);
      return next;
    });
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(advance, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [advance]);

  const handleNext = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPrevBg(active);
    const next = mod(active + 1);
    setActive(next);
    setTimeout(() => setPrevBg(null), 1600);
    intervalRef.current = setInterval(advance, 5000);
  }, [active, advance]);

  const slide = SLIDES[active];

  return (
    <div className="w-full overflow-x-hidden" style={{ background: '#f5f3ee' }}>
      <ScrollToTop scrollY={scrollY} modalOpen={offerOpen || !!selectedRoom} />
      <OfferModal open={offerOpen} onClose={() => setOfferOpen(false)} />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden grain-overlay w-full" style={{ height: '100vh', minHeight: 560 }}>
        {SLIDES.map((s, i) => (
          <div key={i} className={`bg-layer ${i === active ? 'entering' : i === prevBg ? 'exiting' : 'dormant'}`}
            style={{ backgroundImage: `url(${s.img})` }} />
        ))}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/65 via-black/25 to-black/80" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 z-[1] pointer-events-none transition-all duration-[1200ms]"
          style={{ background: `radial-gradient(ellipse 50% 60% at 85% 30%, ${slide.accent}20, transparent 65%)` }} />

        {/* Mobile */}
        <div className="md:hidden relative z-[5] flex flex-col h-full px-6" style={{ paddingTop: '22vh', paddingBottom: '12vh' }}>
          {heroTextReady && (
            <>
              <div className="h-once-eyebrow flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 flex-shrink-0" style={{ background: BRAND.primary, animation: 'pulseDot 2.2s ease-in-out infinite' }} />
                <span className="text-white/50 text-[9px] tracking-[.22em] uppercase font-semibold">Sariaya, Quezon · Philippines</span>
              </div>
              <div className="overflow-hidden mb-1">
                <h1 className="h-once-line1 m-0 text-white font-black tracking-tight" style={{ fontSize: 'clamp(40px, 10vw, 64px)', lineHeight: .9 }}>The Beach</h1>
              </div>
              <div className="overflow-hidden mb-5">
                <h1 className="h-once-line2 m-0 font-black tracking-tight" style={{ fontSize: 'clamp(40px, 10vw, 64px)', lineHeight: .9, WebkitTextStroke: '2px rgba(255,255,255,.85)', color: 'transparent' }}>You Deserve.</h1>
              </div>
              <div className="h-once-rule mb-4 transition-all duration-700" style={{ width: 32, height: 3, background: slide.accent }} />
              <p className="h-once-body text-white/55 font-light leading-relaxed mb-7 text-sm" style={{ maxWidth: 320, lineHeight: 1.75 }}>
                500m of private white sand beach, crystal-clear waters, just hours from Manila.
              </p>
              <div className="h-once-cta flex gap-3 mb-auto">
                <Link to="/booking" className="btn-primary cta-primary">Reserve Now</Link>
                <Link to="https://www.facebook.com/villadelpradoresort" className="btn-ghost">Message Us <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg></Link>
              </div>
            </>
          )}
          <div className="mt-auto pt-4">
            <RingCarousel active={active} onNext={handleNext} accent={slide.accent} isMobile={true} />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex relative z-[5] h-full items-stretch w-full"
          style={{ paddingTop: '20vh', paddingLeft: '8%', paddingRight: '5%', paddingBottom: 0 }}>
          <div className="flex-1 flex flex-col justify-start min-w-0">
            {heroTextReady && (
              <>
                <div className="h-once-eyebrow flex items-center gap-2.5 mb-6">
                  <span className="w-1.5 h-1.5 flex-shrink-0" style={{ background: BRAND.primary, animation: 'pulseDot 2.2s ease-in-out infinite' }} />
                  <span className="text-white/50 text-[9px] tracking-[.25em] uppercase font-semibold">Sariaya, Quezon · Philippines</span>
                </div>
                <div className="overflow-hidden mb-1">
                  <h1 className="h-once-line1 m-0 text-white font-black tracking-tight" style={{ fontSize: 'clamp(44px, 7vw, 112px)', lineHeight: .88 }}>The Beach</h1>
                </div>
                <div className="overflow-hidden mb-5">
                  <h1 className="h-once-line2 m-0 font-black tracking-tight" style={{ fontSize: 'clamp(44px, 7vw, 112px)', lineHeight: .88, WebkitTextStroke: '2.5px rgba(255,255,255,.85)', color: 'transparent' }}>You Deserve.</h1>
                </div>
                <div className="h-once-rule mb-5 transition-all duration-700" style={{ width: 40, height: 3, background: slide.accent }} />
                <p className="h-once-body text-white/55 font-light leading-relaxed mb-8" style={{ fontSize: 'clamp(13px, 1.3vw, 16px)', maxWidth: 380, lineHeight: 1.8 }}>
                  500m of private white sand beach, crystal-clear waters, and resort amenities — just hours from Manila.
                </p>
                <div className="h-once-cta flex flex-wrap gap-3 items-center">
                  <Link to="/booking" className="btn-primary cta-primary">Reserve Now</Link>
                  <Link to="https://www.facebook.com/villadelpradoresort" className="btn-ghost">Message Us                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg></Link>
                </div>
              </>
            )}
          </div>
          <div className="flex items-end justify-end flex-shrink-0 pb-[10vh]" style={{ width: 260 }}>
            <RingCarousel active={active} onNext={handleNext} accent={slide.accent} isMobile={false} />
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center gap-2 transition-opacity duration-300"
          style={{ bottom: 0, opacity: Math.max(0, 1 - scrollY / 240) }}>
          <div className="scroll-line" />
          <span className="text-white/25 text-[7px] font-bold tracking-[.3em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="overflow-hidden py-4 w-full" style={{ background: '#f5f3ee', marginTop: 40, marginBottom: -40 }}>
        <div className="mq-track">
          {Array(4).fill([
            { label: 'Beach Resort', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 8c0 4-4 8-8 8"/><path d="M12 16c-4 0-8-4-8-8"/><line x1="12" y1="3" x2="12" y2="8"/><path d="M12 8v8"/></svg> },
            { label: 'Sariaya, Quezon', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
            { label: 'Pool & Slide', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 16c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/><circle cx="12" cy="6" r="2"/><path d="M12 8v3l3 2"/></svg> },
            { label: 'Water Sports', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l4-8 4 4 4-6 4 10"/><path d="M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/></svg> },
            { label: 'Sunrise Views', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M2 12h2M19.07 4.93l-1.41 1.41"/><path d="M12 7a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5z"/><path d="M2 17h20"/></svg> },
            { label: 'Weddings & Events', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
          ]).flat().map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 mr-8 font-semibold text-[10px] tracking-[.18em] uppercase flex-shrink-0" style={{ color: '#111' }}>
              <span className="flex-shrink-0">{item.icon}</span>
              {item.label}
              <span className="w-1 h-1 ml-1 flex-shrink-0" style={{ background: '#ccc' }} />
            </span>
          ))}
        </div>
      </div>

      {/* ═══ ABOUT ═══ */}
      <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-[10%]" style={{ background: '#f5f3ee' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="sr relative w-full" style={{ height: 320, minHeight: 260 }}>
            <div className="absolute inset-0" style={{ right: '10%', bottom: '10%' }}>
              <div className="w-full h-full overflow-hidden shadow-xl sm:shadow-2xl">
                <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=700&q=80" alt="Nipa Hut Villa Del Prado Sariaya Quezon" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 overflow-hidden shadow-lg sm:shadow-xl" style={{ width: '42%', height: '42%', border: '3px solid #f5f3ee' }}>
              <img src="https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=400&q=80" alt="Swimming pool Villa Del Prado" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute z-10 text-white px-3 py-2 shadow-lg" style={{ bottom: '41%', left: 6, background: `linear-gradient(to bottom right, ${BRAND.primary}, ${BRAND.primaryDark})` }}>
              <div className="text-white/60 text-[7px] tracking-widest uppercase font-bold">Est.</div>
              <div className="font-black text-lg leading-none">Sariaya</div>
            </div>
          </div>
          <div className="sr sr-d2">
            <span className="section-tag mb-4">About the Resort</span>
            <h2 className="text-neutral-900 font-black tracking-tight leading-tight mb-4" style={{ fontSize: 'clamp(26px, 4vw, 52px)' }}>
              Quezon's Most<br /><span style={{ color: BRAND.primary }}>Beloved Escape.</span>
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-4 text-sm font-light">
              Nestled along the shores of <strong className="text-neutral-700 font-semibold">Sariaya, Quezon Province</strong>, Villa Del Prado Beach Resort blends authentic Filipino hospitality with full resort amenities.
            </p>
            <p className="text-neutral-400 leading-relaxed mb-7 text-sm font-light">
              From <strong className="text-neutral-700 font-semibold">nipa hut cabanas</strong> on the water's edge to air-conditioned deluxe rooms with sea views — every corner is crafted for comfort.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/accommodations" className="btn-primary">See Rooms & Rates</Link>
              <Link to="/gallery" className="btn-outline">View Gallery →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACCOMMODATIONS ═══ */}
      <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-[10%]" style={{ background: '#edeae3' }}>
        <div className="max-w-7xl mx-auto">
          <div className="sr flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <span className="section-tag mb-3">Where You'll Stay</span>
              <h2 className="text-neutral-900 font-black tracking-tight leading-tight" style={{ fontSize: 'clamp(26px, 5vw, 54px)' }}>
                Our <span style={{ color: BRAND.primary }}>Accommodations.</span>
              </h2>
              <p className="text-neutral-400 mt-2 text-xs font-light">Tap any room to explore details and pricing.</p>
            </div>
            {/* View All — bordered button matching reference */}
            <Link to="/accommodations" className="btn-outline" style={{ fontSize: 10 }}>
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {ROOMS.map((room, i) => (
              <div key={room.name}
                className={`room-card sr sr-d${Math.min(i + 1, 4)} overflow-hidden cursor-pointer`}
                style={{ boxShadow: '0 2px 16px rgba(0,0,0,.06)', background: '#fff' }}
                onClick={() => setSelectedRoom(room)}>
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <img src={room.img} alt={`${room.name} at Villa Del Prado`} className="room-img w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 left-3 ${room.tagBg} ${room.tagText} text-[8px] font-extrabold tracking-[.15em] uppercase px-2.5 py-1`}>{room.tag}</span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-neutral-900 font-bold mb-1.5 text-sm">{room.name}</h3>
                  <p className="text-neutral-400 text-[11px] leading-relaxed mb-4 line-clamp-2 font-light">{room.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-black text-xl" style={{ color: BRAND.primary }}>{room.price}</span>
                      <span className="text-neutral-300 text-[10px] ml-1">/ night</span>
                    </div>
                    {/* Details — + icon as requested */}
                    <span className="section-tag">Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />

      {/* ═══ AMENITIES ═══ */}
      <AmenitiesSection />





      {/* ═══ GALLERY ═══ */}
      <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-[10%]" style={{ background: '#f5f3ee' }}>
        <div className="max-w-7xl mx-auto">
          <div className="sr text-center mb-10 sm:mb-12">
            <span className="section-tag mb-3">Photo Gallery</span>
            <h2 className="text-neutral-900 font-black tracking-tight leading-tight" style={{ fontSize: 'clamp(26px, 5vw, 54px)' }}>
              A Glimpse of <span style={{ color: BRAND.primary }}>Paradise.</span>
            </h2>
          </div>
          <div className="sr">
            <GalleryCarousel />
          </div>
        </div>
      </section>






      {/* ═══ GUEST STORIES ═══ */}
      <GuestStoriesSection />

      {/* ═══ CTA ═══ */}
      <CtaSection onOpenOffer={() => setOfferOpen(true)} />
    </div>
  );
}