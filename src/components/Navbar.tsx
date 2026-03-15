import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/accommodations', label: 'Accommodations' },
  { path: '/amenities', label: 'Amenities' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/booking', label: 'Book Now', cta: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(id);
  }, [location.pathname]);

  const solid = scrolled || !isHome || menuOpen;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center md:pt-4 pointer-events-none font-[Montserrat]">
      {/* Import Montserrat via a style tag — minimal, just the @import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');`}</style>

      {/* Pill container */}
      <div
        className={[
          'pointer-events-auto transition-all duration-300',
          'w-full md:w-4/5',
          'rounded-none   ',
          solid
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border border-white/70'
            : 'bg-transparent border border-transparent',
          menuOpen ? '' : '',
        ].join(' ')}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3.5">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div
              className={[
                'w-9 h-9 flex items-center justify-center text-xs font-medium tracking-wide flex-shrink-0 transition-all duration-300',
                solid
                  ? 'bg-gradient-to-br from-[#0077a8] to-[#005f8a] text-white'
                  : 'bg-white/20 text-white border border-white/40 backdrop-blur-sm',
              ].join(' ')}
            >
              BR
            </div>
            <div>
<div
  className={[
    'font-montserrat text-[0.6rem] font-semibold tracking-wider leading-snug uppercase transition-colors duration-300',
    solid
      ? 'text-[#0a3d62] hover:text-[#1e90ff]' // premium deep blue with subtle hover
      : 'text-white',
  ].join(' ')}
  style={{
    letterSpacing: '0.13em', // increased for a more premium, airy feel
  }}
>
  Demo Beach Resort
</div>
              <div
                className={[
                  'text-[0.6rem] font-light tracking-[0.18em] uppercase transition-colors duration-300',
                  solid ? 'text-slate-400' : 'text-white/65',
                ].join(' ')}
              >
                Beach Resort
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.cta ? (
                <Link
                  key={link.path}
                  to={link.path}
                  className={[
                    'text-[0.8rem] font-medium tracking-widest uppercase px-6 py-2.5 transition-all duration-300 no-underline',
                    scrolled || !isHome
                      ? 'bg-gradient-to-br from-[#0077a8] to-[#005f8a] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-white/15 text-white border border-white/35 backdrop-blur-sm hover:bg-white/90 hover:text-[#005f8a] hover:border-transparent',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={[
                    'relative text-[0.8125rem] font-normal tracking-wide transition-colors duration-200 no-underline',
                    'after:absolute after:bottom-[-3px] after:left-0 after:h-px after:bg-current after:opacity-50 after:transition-all after:duration-300',
                    location.pathname === link.path
                      ? 'after:w-full'
                      : 'after:w-0 hover:after:w-full',
                    scrolled || !isHome ? 'text-slate-500' : 'text-white',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden flex flex-col gap-[5px] p-1.5 bg-transparent border-none cursor-pointer"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={[
                  'block h-[1.5px] w-[22px] transition-all duration-300',
                  solid ? 'bg-slate-500' : 'bg-white',
                  menuOpen && i === 0 ? 'rotate-45 translate-x-[4.5px] translate-y-[4.5px]' : '',
                  menuOpen && i === 2 ? '-rotate-45 translate-x-[4.5px] -translate-y-[4.5px]' : '',
                  menuOpen && i === 1 ? 'opacity-0' : 'opacity-100',
                ].join(' ')}
              />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={[
            'lg:hidden overflow-hidden transition-all duration-300',
            menuOpen ? 'max-h-96 opacity-100 border-t border-slate-200/40' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <div className="flex flex-col gap-1 px-6 pt-3 pb-5">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="no-underline">
                {link.cta ? (
                  <div className="text-[0.8rem] font-medium tracking-widest uppercase text-center px-6 py-3 mt-2 bg-gradient-to-br from-[#0077a8] to-[#005f8a] text-white shadow-md">
                    {link.label}
                  </div>
                ) : (
                  <div
                    className={[
                      'text-sm py-2.5 border-b border-slate-200/50 transition-colors duration-200',
                      location.pathname === link.path
                        ? 'text-[#0077a8] font-medium'
                        : 'text-slate-500 font-normal',
                    ].join(' ')}
                  >
                    {link.label}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}