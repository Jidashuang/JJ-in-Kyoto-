# Kyoto by JJ

A curated city guide to Kyoto’s quieter pleasures — coffee, books, old shops, and somewhere to sit.  
Built with an editorial, magazine-inspired aesthetic using Next.js App Router and static-first rendering.

---

## Deployment Readiness (Verified)

This project has been checked for staging deployment on Vercel with the following verified outcomes:

- ✅ `npm run build` passes successfully
- ✅ `npm run lint` runs cleanly
- ✅ Static generation completes for all current routes
- ✅ No required environment variables are currently used by app code
- ✅ Sitemap and robots routes are present (`/sitemap.xml`, `/robots.txt`)

### Notes from verification

- The production build previously failed due to broken type imports in:
  - `src/data/real-features.ts`
  - `src/data/real-neighborhoods.ts`
- These import paths were corrected to use the existing typed modules under `src/types`, and the build now passes.

---

## Overview

This project is a content-first Kyoto travel guide with:

- statically generated pages for speed and reliability
- typed local data for places, features, and neighborhoods
- SEO basics (metadata, Open Graph, sitemap, robots)
- Vercel-ready deployment defaults

## Local Image Assets

Image content is wired to the numbered files in `public/images/` and falls back
to the editorial placeholder panels when a file is missing.

- `public/images/1.jpg` to `public/images/10.jpg` map to feature covers
- `public/images/11.jpg` to `public/images/16.jpg` map to neighborhood covers
- `public/images/17.jpg` to `public/images/119.jpg` map to place hero images
- `public/images/120.jpg` onward is used for place gallery images

The data layer assigns these images automatically, so you only need to replace
the numbered files if you want to swap in different photos later.

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

```kyoto-guide/README.md#L1-40
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
│   │   ├── layout/
│   │   └── ui/
│   ├── data/
│   │   ├── places.ts
│   │   ├── features.ts
│   │   ├── real-features.ts
│   │   ├── neighborhoods.ts
│   │   └── real-neighborhoods.ts
│   ├── lib/
│   └── types/
├── public/
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Local Development

### Prerequisites

- Node.js 20+ recommended
- npm

### Install

```kyoto-guide/README.md#L1-2
npm install
```

### Run dev server

```kyoto-guide/README.md#L1-2
npm run dev
```

Open `http://localhost:3000`.

### Validate before deploy

```kyoto-guide/README.md#L1-3
npm run lint
npm run build
npm run start
```

---

## Environment Variables

## Current status

No required environment variables are used by current application code for build/runtime.

- No active `process.env.*` usage was found in app source
- The project is currently local-data/static-first

## If you add env vars later

- Put public values in `NEXT_PUBLIC_*`
- Keep secrets server-side only (do not expose in client bundles)
- Add all new keys in Vercel project settings per environment (Preview/Production)

---

## SEO / Metadata Production Checklist

The app includes metadata and crawler files, but verify production consistency:

- `src/app/layout.tsx` defines `metadataBase`, Open Graph, Twitter metadata
- `src/app/sitemap.ts` defines sitemap URLs
- `src/app/robots.ts` defines robots host/sitemap

### Important before staging/prod cutover

Update the canonical site URL constant if your final domain is different from current value:

```kyoto-guide/src/app/layout.tsx#L1-8
const siteUrl = "https://kyoto-guide.vercel.app";
```

Also keep this URL aligned in:

- `src/app/sitemap.ts`
- `src/app/robots.ts`

---

## Vercel Staging Deployment Steps (Verified-Friendly)

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel, create a new project and import the repo.
3. Framework should auto-detect as **Next.js**.
4. Keep default build settings:
   - Install: `npm install`
   - Build: `npm run build`
   - Output: Next.js managed
5. Configure environment variables (none required currently).
6. Deploy to Preview (staging).
7. Run post-deploy smoke checks:
   - `/`
   - `/places`
   - `/features`
   - `/neighborhoods`
   - `/sitemap.xml`
   - `/robots.txt`
8. Verify metadata in page source and social preview behavior.

---

## Remaining Blockers Before Staging Deployment

### Must-fix blockers

None currently identified for staging deployment.

### Warnings / quality risks (non-blocking but recommended)

1. **Workspace root warning during build**  
   Next.js warns about multiple lockfiles and inferred root outside this app directory.  
   Recommended cleanup:
   - remove unrelated lockfiles above project root if not needed, or
   - explicitly set Turbopack root in Next config for consistency in CI.

2. **Canonical URL consistency**  
   Ensure `siteUrl` values match your staging/prod domain strategy to avoid mixed canonical/sitemap host values.

3. **Asset completeness**  
   Confirm `public/og-image.png` and icons are final assets for staging review.

---

## Post-Deploy Staging QA Checklist

- [ ] All primary routes load without runtime errors
- [ ] Dynamic detail pages render (`places/[slug]`, `features/[slug]`, `neighborhoods/[slug]`)
- [ ] `sitemap.xml` returns expected URLs
- [ ] `robots.txt` returns expected host/sitemap directives
- [ ] Metadata title/description/Open Graph are present
- [ ] Mobile and desktop layouts look correct
- [ ] No console errors on key pages

---

## License

Private project. Update license terms if publishing publicly.
