# AGENTS.md — JK Event Media

Single-page marketing site (French) for an event media studio in Bouaké, Côte d’Ivoire. No database, no accounts, no payments.

## Architecture

- `src/routes/index.tsx` → renders `src/components/MarketingPage.tsx` (all sections: hero, services, gallery, live content, clients, packages, process, quote form, footer).
- `src/components/QuoteForm.tsx` — controlled quote form, POSTs URL-encoded data to `/__forms.html` (required for SSR apps; `/` would hit the SSR function).
- `public/__forms.html` — static Netlify Forms registration for `demande-devis`. **Keep its fields in sync with QuoteForm** (name, phone, email, event-type, event-date, location, package, message, subject, bot-field).
- `src/data/site.ts` — single source of truth for all copy, prices (FCFA), services, steps and gallery entries.
- `src/routes/__root.tsx` — `<html lang="fr">`, metadata, Google Fonts links.
- `src/styles.css` — Tailwind v4 `@theme` tokens (ink / cream / ember / live colors, display/serif/sans fonts) plus custom effects: film grain, pulsing live dot, viewfinder brackets, marquee, scroll reveal.

## Conventions

- Images are always served through the Netlify Image CDN via the `cdn(src, w)` helper in MarketingPage (`/.netlify/images?url=…&w=…&fm=webp`). Never link `/img/*.png` directly — originals are ~1.8 MB.
- Elements with class `reveal` start hidden and are revealed by an IntersectionObserver in `useReveal()`; reduced-motion users see them immediately.
- Browser-only logic (timecode, observers) lives in `useEffect`, never in render.
- All user-facing text is French.

## Non-obvious decisions

- Content comes from the company's presentation document. That document notes contact details and exact package contents are not finalised, so the site uses the quote form as the only contact channel and labels prices as indicative.
- The photos in `public/img/` are AI-generated stand-ins; swap for real work with the same file names.
- TypeScript stays on 6 because the Netlify TanStack adapter relies on compiler APIs removed in TS 7.
