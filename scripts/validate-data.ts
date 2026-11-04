/**
 * Build-time content validation. Run with `npm run validate`.
 * Errors fail the run (exit 1); warnings are informational.
 */
import { realPlaces } from "../src/data/real-places";
import { realFeatures } from "../src/data/real-features";
import { realNeighborhoods } from "../src/data/real-neighborhoods";
import { places } from "../src/data/places";
import { features } from "../src/data/features";
import { neighborhoods } from "../src/data/neighborhoods";

const errors: string[] = [];
const warnings: string[] = [];

// 1. Duplicate slugs in the raw data (places.ts silently renames them).
function dupes(values: string[]): string[] {
  const seen = new Set<string>();
  const out = new Set<string>();
  for (const v of values) (seen.has(v) ? out : seen).add(v);
  return [...out];
}
for (const s of dupes(realPlaces.map((p) => p.slug)))
  errors.push(`duplicate place slug in real-places: ${s}`);
for (const s of dupes(places.map((p) => p.slug)))
  errors.push(`duplicate resolved place slug: ${s}`);

const placeSlugs = new Set(places.map((p) => p.slug));

// 2. Dangling references.
for (const f of features)
  for (const s of f.placeSlugs)
    if (!placeSlugs.has(s)) errors.push(`feature "${f.slug}" -> unknown place "${s}"`);
for (const n of neighborhoods)
  for (const s of n.placeSlugs)
    if (!placeSlugs.has(s)) errors.push(`neighborhood "${n.slug}" -> unknown place "${s}"`);
for (const p of places)
  for (const s of p.pairWith ?? [])
    if (!placeSlugs.has(s)) errors.push(`place "${p.slug}" pairWith unknown place "${s}"`);

// 3. Placeholder copy that should never ship.
const PLACEHOLDERS = [
  "A curated Kyoto listing from the current guide.",
  "This entry collects the practical notes and editorial context for the place.",
];
for (const p of places) {
  if (PLACEHOLDERS.includes(p.excerpt)) warnings.push(`place "${p.slug}" uses placeholder excerpt`);
  if (PLACEHOLDERS.includes(p.body)) warnings.push(`place "${p.slug}" uses placeholder body`);
  if (!p.heroImage) warnings.push(`place "${p.slug}" has no hero image`);
}

// 4. Image URL hygiene.
for (const p of realPlaces)
  for (const url of [p.heroImage, ...(p.gallery ?? [])])
    if (url && url.startsWith("http://"))
      warnings.push(`place "${p.slug}" image uses insecure http: ${url}`);

// 5. Raw vs resolved counts (catches silently dropped entries).
if (realPlaces.length !== places.length)
  errors.push(`real-places (${realPlaces.length}) != places (${places.length})`);
if (realFeatures.length !== features.length)
  errors.push(`real-features (${realFeatures.length}) != features (${features.length})`);
if (realNeighborhoods.length !== neighborhoods.length)
  warnings.push(`real-neighborhoods (${realNeighborhoods.length}) != neighborhoods (${neighborhoods.length})`);

const missingHero = warnings.filter((w) => w.endsWith("has no hero image")).length;
const rest = warnings.filter((w) => !w.endsWith("has no hero image"));
for (const w of rest) console.warn(`warn  ${w}`);
if (missingHero) console.warn(`warn  ${missingHero}/${places.length} places have no hero image`);
for (const e of errors) console.error(`error ${e}`);
console.log(`\n${places.length} places, ${features.length} features, ${neighborhoods.length} neighborhoods — ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
