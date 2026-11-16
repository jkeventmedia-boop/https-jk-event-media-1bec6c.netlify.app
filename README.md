# JK Event Media

Website for **JK Event Media**, an event photography, video, editing and graphic design studio based in Bouaké (Gbêkê region, Côte d’Ivoire). Tagline: *« Vis ta cérémonie en temps réel. »*

The site is a single French-language landing page that presents the studio, its four service areas, a photo showcase, the real-time content offer, client types, the Basic / Impact / Premium packages with indicative prices, the five-step booking process, and a quote request form.

## Tech

- [TanStack Start](https://tanstack.com/start) + React 19, Tailwind CSS v4
- Netlify Forms for quote requests (form name `demande-devis`)
- Netlify Image CDN for responsive WebP delivery of the photos in `public/img/`
- Google Fonts: Bricolage Grotesque, Instrument Serif, Manrope

## Run locally

```bash
pnpm install
netlify dev        # or: pnpm dev (form submissions only work on Netlify / netlify dev)
```

## Editing content

All copy (services, packages, prices, steps, client types, gallery captions) lives in `src/data/site.ts`.
Showcase photos are AI-generated placeholders in `public/img/` — replace them with real JK Event Media photos using the same file names.

## Next steps

- Add public contact details (phone / WhatsApp, e-mail, social links) once confirmed.
- Replace the placeholder photos with real work.
- Detail exactly what each package includes (duration, number of photos, video format, delivery time).
- Set up e-mail notifications for new quote requests in the Netlify dashboard (Forms → Notifications).
