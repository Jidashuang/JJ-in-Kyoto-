# Content and Map Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove visible "work in progress" signals from the site, expand the content taxonomy so real data renders correctly, and replace the `/map` placeholder with a usable data-driven map index.

**Architecture:** Keep the current static, local-data architecture. First widen the place category/tag unions and UI filter options so the real dataset is no longer filtered away. Then replace explicit placeholder copy with neutral editorial copy in the data layer and pages. Finally, turn `/map` into a structured browsing page that groups the existing places by neighborhood and highlights a few featured entries, without pretending to be a geographic map before coordinate data exists.

**Tech Stack:** Next.js App Router, TypeScript, local data modules under `src/data/*`, existing shared UI components.

---

### Task 1: Expand content taxonomy so real places render fully

**Files:**
- Modify: `src/types/place.ts`
- Modify: `src/app/places/PlacesClientPage.tsx`
- Modify: `src/data/places.ts`

- [ ] **Step 1: Update the failing assumptions in the taxonomy**

Add the missing real-world category and tag values used by `src/data/real-places.ts` so they are accepted by the type system and visible in filters.

- [ ] **Step 2: Run the focused checks**

Run: `npm run lint`

Expected: pass with the expanded unions and filter option list.

- [ ] **Step 3: Commit the taxonomy fix**

```bash
git add src/types/place.ts src/app/places/PlacesClientPage.tsx src/data/places.ts
git commit -m "fix: expand place taxonomy for real dataset"
```

### Task 2: Remove visible "coming soon" language from content pages

**Files:**
- Modify: `src/data/features.ts`
- Modify: `src/data/neighborhoods.ts`
- Modify: `src/data/places.ts`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/features/page.tsx`
- Modify: `src/app/neighborhoods/page.tsx`
- Modify: `src/app/features/[slug]/page.tsx`
- Modify: `src/app/neighborhoods/[slug]/page.tsx`

- [ ] **Step 1: Replace placeholder/default editorial copy**

Swap any "more detail later" style defaults for neutral, finished-sounding copy that does not advertise unfinished work.

- [ ] **Step 2: Remove page-level placeholder callouts**

Update the features, neighborhoods, map, and about pages so they no longer explicitly say the content is waiting to be added.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: pass after copy updates.

- [ ] **Step 4: Commit the copy cleanup**

```bash
git add src/data/features.ts src/data/neighborhoods.ts src/data/places.ts src/app/about/page.tsx src/app/features/page.tsx src/app/neighborhoods/page.tsx src/app/features/[slug]/page.tsx src/app/neighborhoods/[slug]/page.tsx
git commit -m "refactor: remove unfinished content copy"
```

### Task 3: Turn `/map` into a usable browsing page

**Files:**
- Modify: `src/app/map/page.tsx`

- [ ] **Step 1: Replace the placeholder state with data-driven sections**

Use the existing neighborhood and place datasets to show a browsable map index: key neighborhoods, featured places, and quick links back to detail pages.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: pass with the new map page content.

- [ ] **Step 3: Commit the map page**

```bash
git add src/app/map/page.tsx
git commit -m "feat: replace map placeholder with browsing view"
```

