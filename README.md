# Villa Del Prado Beach Resort — Website

A premium, multi-page React + TypeScript + Vite website for Villa Del Prado Beach Resort in Sariaya, Quezon Province, Philippines.

## Tech Stack
- **React 18** + **TypeScript**
- **Vite** (bundler/dev server)
- **Tailwind CSS 3** (styling)
- **React Router DOM** (routing)

## Pages
1. **Home** (`/`) — Hero, highlights, room preview, gallery strip, testimonials, CTA
2. **Accommodations** (`/accommodations`) — All room types with pricing & amenities
3. **Amenities** (`/amenities`) — Full grid of activities by category
4. **Gallery** (`/gallery`) — Filterable photo gallery + resort story
5. **Booking** (`/booking`) — Calendly embed + packages + FAQ

## Getting Started

```bash
npm install
npm run dev      # Start dev server → http://localhost:5173
npm run build    # Build for production → /dist
npm run preview  # Preview production build
```

## Calendly Integration

In `src/pages/BookingPage.tsx`, replace the placeholder div with:

```tsx
<iframe
  src="https://calendly.com/YOUR_CALENDLY_USERNAME/YOUR_EVENT_TYPE"
  width="100%"
  height="630"
  frameBorder="0"
  title="Book at Villa Del Prado"
/>
```

## Design System

### Colors (tailwind.config.js)
- `ocean-*` — Primary blue-ocean palette
- `sand-*` — Warm sand tones
- `palm-*` — Tropical green
- `coral-*` — Accent coral/orange

### Fonts (Google Fonts)
- **Cormorant Garamond** — Display/headings (elegant serif)
- **DM Sans** — Body text (clean, modern sans)
- **Playfair Display** — Accent text

## Deployment
Ready for Vercel, Netlify, or any static hosting:
```bash
npm run build
# Upload /dist folder
```

## Customization
- Replace emoji placeholders in gallery/room cards with real resort images
- Update `href="https://www.facebook.com/villadelpradoresort"` links
- Add real Calendly link in BookingPage.tsx
- Update contact info in Footer.tsx
- Adjust pricing in Accommodations.tsx and BookingPage.tsx
