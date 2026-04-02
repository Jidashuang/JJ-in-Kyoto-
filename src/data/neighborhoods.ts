import type { Neighborhood } from "@/types/neighborhood";
import { realNeighborhoods } from "@/data/real-neighborhoods";
import { realPlaces } from "@/data/real-places";

const DEFAULT_HERO_IMAGE = "/images/neighborhoods/placeholder.jpg";
const DEFAULT_INTRO =
  "A Kyoto neighborhood guide drawn from the current dataset.";

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
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
  heroImage: item.heroImage?.trim() || DEFAULT_HERO_IMAGE,
  ambiance:
    item.tags && item.tags.length > 0
      ? unique(item.tags.map((tag: string) => tag.trim()).filter(Boolean))
      : undefined,
  placeSlugs: mapPlaceSlugs(item.placeSlugs),
}));
