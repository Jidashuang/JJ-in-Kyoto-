import type { Neighborhood } from "@/types/neighborhood";
import { realNeighborhoods } from "@/data/real-neighborhoods";
import { realPlaces } from "@/data/real-places";

const DEFAULT_HERO_IMAGE = "/images/neighborhoods/placeholder.jpg";
const DEFAULT_INTRO =
  "A Kyoto neighborhood guide drawn from the current dataset.";

const BEST_FOR_LABELS: Record<string, string> = {
  Central: "first-time Kyoto days with flexible plans",
  Walkable: "wandering on foot between multiple stops",
  Classic: "classic Kyoto cafés, diners, and long-running shops",
  Historic: "traditional Kyoto streets, temples, and old-city atmosphere",
  Scenic: "riverside walks and slower outdoor time",
  Calm: "quieter pacing and fewer crowded blocks",
  Culture: "museum-and-cafe combinations",
  Local: "everyday local Kyoto over checklist tourism",
  "Everyday Kyoto": "daily-life Kyoto neighborhoods",
  Practical: "arrival/departure-day planning",
  Transit: "station-based half-days and quick pivots",
  Takeout: "food to pick up and carry into a walk",
};

function mapBestFor(tags: string[] | undefined): string[] | undefined {
  if (!tags || tags.length === 0) return undefined;
  const mapped = tags
    .map((tag) => BEST_FOR_LABELS[tag])
    .filter((value): value is string => Boolean(value));
  if (mapped.length === 0) return undefined;
  return unique(mapped).slice(0, 3);
}

function inferWhenToGo(tags: string[] | undefined): string | undefined {
  if (!tags || tags.length === 0) return undefined;
  if (tags.includes("Transit") || tags.includes("Practical")) {
    return "early morning or late afternoon around train timing";
  }
  if (tags.includes("Scenic") || tags.includes("Walk")) {
    return "late morning through golden hour";
  }
  if (tags.includes("Historic") || tags.includes("Classic")) {
    return "weekday mornings before peak crowds";
  }
  if (tags.includes("Calm") || tags.includes("Local")) {
    return "weekday afternoons at a slower pace";
  }
  return undefined;
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function normalizeStringList(values?: string[]): string[] | undefined {
  if (!values || values.length === 0) return undefined;
  const normalized = values.map((value) => value.trim()).filter(Boolean);
  if (normalized.length === 0) return undefined;
  return unique(normalized);
}

function normalizeCoordinate(value?: number): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return value;
}

function normalizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Build a canonical set of valid place slugs from the existing real places dataset
// so neighborhood->places mapping remains correct even if upstream formatting varies.
const validRealPlaceSlugs = new Set<string>(
  realPlaces
    .map((p) => normalizeSlug(p.slug || p.title || ""))
    .filter((slug) => slug.length > 0),
);

function mapPlaceSlugs(input: string[] | undefined): string[] {
  if (!input || input.length === 0) return [];

  const mapped = input
    .map((slug) => normalizeSlug(slug))
    .filter((slug) => slug.length > 0 && validRealPlaceSlugs.has(slug));

  return unique(mapped);
}

export const neighborhoods: Neighborhood[] = realNeighborhoods.map((item) => ({
  slug: normalizeSlug(item.slug || item.name || ""),
  name: item.name?.trim() || "Kyoto Neighborhood",
  intro: item.intro?.trim() || DEFAULT_INTRO,
  lat: normalizeCoordinate(item.lat),
  lng: normalizeCoordinate(item.lng),
  hook: item.hook?.trim() || undefined,
  heroImage: item.heroImage?.trim() || DEFAULT_HERO_IMAGE,
  bestFor: normalizeStringList(item.bestFor) ?? mapBestFor(item.tags),
  whenToGo: item.whenToGo?.trim() || inferWhenToGo(item.tags),
  ambiance:
    item.tags && item.tags.length > 0
      ? unique(item.tags.map((tag: string) => tag.trim()).filter(Boolean))
      : undefined,
  halfDayRoute: item.halfDayRoute?.trim() || undefined,
  anchorPlaceSlugs: (() => {
    const anchors = mapPlaceSlugs(item.anchorPlaceSlugs);
    return anchors.length > 0 ? anchors : undefined;
  })(),
  placeSlugs: mapPlaceSlugs(item.placeSlugs),
}));
