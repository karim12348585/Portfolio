# Karim Souissi — AI Engineer Portfolio

My personal portfolio — a premium, dark-mode-first site built to feel like an AI
SaaS product rather than a generic developer template. I designed and built it
with an emerald/teal design system, an animated neural-network background,
per-project engineering case studies, and a fully typed content layer.

🔗 **Live:** _coming soon_

## Stack

React 18 · TypeScript · Vite · TailwindCSS · Framer Motion · React Router ·
Lucide Icons.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle → dist/
npm run preview  # serve the production build
```

## Architecture

I kept all content out of the components so the site is easy to maintain — every
piece of personal data lives in `src/data/`:

- `profile.ts` — name, tagline, socials, stats
- `projects.ts` — featured projects + full case studies
- `experience.ts` — internships
- `skills.ts` — skill categories with hover metadata
- `certifications.ts`, `education.ts`

## Design notes

A few implementation decisions I made along the way:

- **Content is data-driven.** Components read from `src/data/`, so updating the
  site never means touching JSX.
- **Theming** runs on CSS variables in `src/index.css` (`:root` for dark,
  `.light` for light), with the emerald/teal accent shared across both.
- **Motion** is intentionally restrained — subtle scroll reveals and micro
  interactions, all of which respect `prefers-reduced-motion`.
- **Performance:** curated icon imports and route-level code splitting keep the
  initial bundle small (~124 KB gzipped).

## Project structure

```
src/
  components/   reusable UI + primitives (ui/)
  sections/     home-page sections
  pages/        Home, ProjectDetail, NotFound
  layout/       Navbar, Footer, RootLayout, PageTransition
  hooks/        theme, scroll, reduced-motion, active-section
  utils/        cn, mailto, scroll
  data/         typed content
  types/        shared types
  constants/    nav + filters
```

---

Built by [Karim Souissi](https://github.com/karim12348585).
