# Kyoto by JJ

A curated city guide to Kyoto’s quieter pleasures — coffee, books, old shops, and somewhere to sit.  
Built with an editorial, magazine-inspired aesthetic using Next.js App Router and static-first rendering.

---

## Overview

This project is a content-first Kyoto travel guide with:

- statically generated pages for speed and reliability
- typed local data for places, features, and neighborhoods
- SEO basics (metadata, Open Graph, sitemap, robots)
- Vercel-ready deployment defaults

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui primitives
- **Fonts**: `next/font` (Cormorant Garamond + Inter)

---

## Project Architecture

```Kyoto annai/kyoto-guide/README.md#L1-200
kyoto-guide/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # global layout + site metadata
│   │   ├── page.tsx                   # homepage
│   │   ├── about/page.tsx
│   │   ├── places/page.tsx
│   │   ├── places/[slug]/page.tsx
│   │   ├── features/page.tsx
│   │   ├── features/[slug]/page.tsx
│   │   ├── neighborhoods/page.tsx
│   │   ├── neighborhoods/[slug]/page.tsx
│   │   ├── map/page.tsx
│   │   ├── sitemap.ts                 # dynamic sitemap.xml
│   │   ├── robots.ts                  # dynamic robots.txt
│   │   └── favicon.ico
│   ├── components/
│   │   ├── layout/                    # Header/Footer/Container
│   │   └── ui/                        # reusable typography + cards + tags
│   ├── data/
│   │   ├── places.ts
│   │   ├── features.ts
│   │   └── neighborhoods.ts
│   ├── lib/
│   │   ├── content.ts                 # typed content selectors/helpers
│   │   └── utils.ts
│   └── types/                         # shared TS interfaces
├── public/
│   ├── favicon.ico
│   ├── icon.png
│   ├── apple-icon.png
│   └── og-image.png
├── next.config.ts
├── tsconfig.json
└── package.json
```

### Rendering Strategy

- Dynamic route segments (`[slug]`) use `generateStaticParams`.
- Content comes from local typed data (`src/data/*`).
- Pages are pre-rendered at build time where possible.

---

## SEO and Metadata

The app includes baseline technical SEO:

- global `metadata` in `src/app/layout.tsx`
- canonical base URL via `metadataBase`
- Open Graph + Twitter card metadata
- robots directives
- `sitemap.xml` from `src/app/sitemap.ts`
- `robots.txt` from `src/app/robots.ts`
- favicon + icon declarations

### Important: Set your production domain

Set `NEXT_PUBLIC_SITE_URL` in Vercel before release, for example:

```bash
NEXT_PUBLIC_SITE_URL=https://jjinkyoto.com
```

The app falls back to `https://kyoto-guide.vercel.app` until the custom domain is ready.

---

## Local Development

### Prerequisites

- Node.js 18.17+ (Node 20+ recommended)
- npm

### Install

```Kyoto annai/kyoto-guide/README.md#L1-10
npm install
```

### Run dev server

```Kyoto annai/kyoto-guide/README.md#L1-10
npm run dev
```

Open `http://localhost:3000`.

### Production build (must pass before deploy)

```Kyoto annai/kyoto-guide/README.md#L1-10
npm run build
npm run start
```

### Lint

```Kyoto annai/kyoto-guide/README.md#L1-10
npm run lint
```

---

## Content Management

Main content files:

- `src/data/places.ts`
- `src/data/features.ts`
- `src/data/neighborhoods.ts`

When adding entries:

1. Use unique slugs.
2. Keep cross-references valid (`placeSlugs`, `sourceFeature`, etc.).
3. Add corresponding imagery in `public/` when available.
4. Keep copy concise and editorial.

---

## Route and Type Safety Checklist

Before deployment, verify:

- every slug referenced in one dataset exists in its target dataset
- `generateStaticParams` returns all route params for dynamic pages
- `generateMetadata` handles missing content safely
- no broken links between `/places`, `/features`, `/neighborhoods`

---

## Vercel Deployment Guide

### 1) Push repository

Push the project to GitHub/GitLab/Bitbucket.

### 2) Import to Vercel

- Create a new project in Vercel
- Import repository
- Framework preset should auto-detect as **Next.js**

### 3) Build settings

Defaults are usually correct:

- **Build Command**: `next build` (or `npm run build`)
- **Output**: managed by Next.js
- **Install Command**: `npm install`

### 4) Environment variables

No required secrets for current static/local-data architecture.  
If you add external APIs later, define vars in Vercel Project Settings and avoid hardcoding credentials.

### 5) Domain + SEO consistency

- Attach your production domain in Vercel.
- Update `siteUrl` references in metadata/sitemap/robots to match final domain.
- Redeploy.

### 6) Post-deploy checks

After deployment, validate:

- `/sitemap.xml` resolves
- `/robots.txt` resolves
- social preview appears for homepage share
- favicon appears in browser tabs
- all primary routes render without runtime errors

---

## Recommended Next Improvements

- Add per-page Open Graph images for dynamic detail pages
- Add JSON-LD structured data (`WebSite`, `TravelGuide`, `BreadcrumbList`)
- Add analytics + search console verification metadata
- Add content pipeline (MDX/CMS) if editorial volume grows

---

## License

Private project. Update license terms if publishing publicly.
