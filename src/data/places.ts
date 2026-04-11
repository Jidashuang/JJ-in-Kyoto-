import type { Place } from "@/types/place";
import { realPlaces } from "@/data/real-places";
import { PLACE_CATEGORIES, PLACE_TAGS } from "@/data/place-taxonomy";
import { placeGalleryImage, placeHeroImage } from "@/data/image-assets";
import { getPlaceDisplayTier } from "@/lib/place-display-tier";
import {
  normalizeNeighborhoodValue,
  getCanonicalNeighborhoodName,
} from "@/data/neighborhood-mapping";
import {
  canonicalNeighborhoodByPlaceSlug,
  resolvePlaceCanonicalNeighborhood,
} from "@/data/place-neighborhood-normalization";

const DEFAULT_NEIGHBORHOOD = "kyoto";
const DEFAULT_EXCERPT =
  "A curated Kyoto listing from the current guide.";
const DEFAULT_BODY =
  "This entry collects the practical notes and editorial context for the place.";

const CATEGORY_WHITELIST = new Set<string>(PLACE_CATEGORIES);
const TAG_WHITELIST = new Set<string>(PLACE_TAGS);

function normalizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fallbackTagFromCategory(
  category: Place["category"][number][],
): Place["tags"][number] {
  if (
    category.includes("Sight") ||
    category.includes("Temple") ||
    category.includes("Garden") ||
    category.includes("Museum") ||
    category.includes("Onsen")
  ) {
    return "Scenic";
  }
  if (category.includes("Cafe") || category.includes("Bakery")) return "Quiet";
  if (
    category.includes("Books") ||
    category.includes("Records") ||
    category.includes("Art") ||
    category.includes("Craft") ||
    category.includes("Design") ||
    category.includes("Lifestyle") ||
    category.includes("Vintage") ||
    category.includes("Fashion")
  ) {
    return "Design Lover";
  }
  if (category.includes("Stay") || category.includes("Sento")) return "Practical";
  return "Local Favorite";
}

function mapCategories(input: string[]): Place["category"] {
  const mapped = input.filter(
    (value): value is Place["category"][number] => CATEGORY_WHITELIST.has(value),
  );

  if (mapped.length > 0) return mapped;

  return ["Cafe"];
}

function mapTags(
  input: string[],
  topPick: boolean,
  category: Place["category"],
): Place["tags"] {
  const mapped = input.filter(
    (value): value is Place["tags"][number] => TAG_WHITELIST.has(value),
  );

  if (topPick && !mapped.includes("Top Pick")) {
    mapped.unshift("Top Pick");
  }

  if (mapped.length > 0) return mapped;

  return [fallbackTagFromCategory(category)];
}

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function normalizeStringList(values?: string[]): string[] | undefined {
  if (!values || values.length === 0) return undefined;
  const normalized = values.map((value) => value.trim()).filter(Boolean);
  return normalized.length > 0 ? unique(normalized) : undefined;
}

function normalizeCoordinate(value?: number): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return value;
}

export const places: Place[] = realPlaces.map((item, index) => {
  const category = mapCategories(item.category);
  const slug = normalizeSlug(item.slug || item.title || "");
  const resolvedSlug =
    slug.length > 0 ? slug : normalizeSlug(item.title) || "place";
  const title = item.title?.trim() || slugToTitle(resolvedSlug);
  const rawNeighborhood = item.neighborhood?.trim();
  const canonicalNeighborhoodSlug =
    canonicalNeighborhoodByPlaceSlug.get(item.slug) ??
    resolvePlaceCanonicalNeighborhood(item).canonicalNeighborhoodSlug;
  const neighborhood = normalizeNeighborhoodValue(
    rawNeighborhood || DEFAULT_NEIGHBORHOOD,
  );

  const tags = mapTags(item.tags ?? [], item.topPick, category);

  return {
    slug: resolvedSlug,
    title,
    titleJa: item.titleJa,
    titleEn: item.titleEn,
    category,
    neighborhood,
    rawNeighborhood,
    canonicalNeighborhoodSlug,
    lat: normalizeCoordinate(item.lat),
    lng: normalizeCoordinate(item.lng),
    address: item.address,
    hours: item.hours,
    price: item.price,
    priceBand: item.priceBand?.trim() || undefined,
    reservation: item.reservation?.trim() || undefined,
    warning: item.warning?.trim() || undefined,
    website: item.website,
    mapsUrl: item.mapsUrl,
    tags,
    curatorNote: item.curatorNote?.trim() || undefined,
    visitTime: item.visitTime?.trim() || undefined,
    stayLength: item.stayLength?.trim() || undefined,
    canonicalNeighborhood:
      item.canonicalNeighborhood?.trim() ||
      getCanonicalNeighborhoodName(canonicalNeighborhoodSlug),
    subarea: item.subarea?.trim() || undefined,
    bestFor: normalizeStringList(item.bestFor),
    mood: normalizeStringList(item.mood),
    pairWith:
      normalizeStringList(item.pairWith)?.map((relatedSlug) =>
        normalizeSlug(relatedSlug),
      ).filter(Boolean) || undefined,
    excerpt: item.excerpt?.trim() || DEFAULT_EXCERPT,
    body: item.body?.trim() || DEFAULT_BODY,
    heroImage: item.heroImage || placeHeroImage(index),
    gallery:
      item.gallery && item.gallery.length > 0
        ? item.gallery
        : index < 45 && placeGalleryImage(index)
          ? [placeGalleryImage(index)!]
          : undefined,
    featured: item.featured,
    topPick: item.topPick,
    sourceFeature: item.sourceFeature,
    sourcePages: item.sourcePages,
    displayTier: getPlaceDisplayTier({
      slug: resolvedSlug,
      topPick: item.topPick,
    }),
  };
});

for (const place of places) {
  place.neighborhood = normalizeNeighborhoodValue(
    place.neighborhood || DEFAULT_NEIGHBORHOOD,
  );
}

// Ensure stable unique slugs if upstream data contains collisions
{
  const seen = new Map<string, number>();
  for (const place of places) {
    const count = seen.get(place.slug) ?? 0;
    if (count > 0) {
      place.slug = `${place.slug}-${count + 1}`;
    }
    seen.set(place.slug, count + 1);
  }
}

// Keep "Top Pick" tag in sync with topPick flag after potential dedupe edits
for (const place of places) {
  if (place.topPick && !place.tags.includes("Top Pick")) {
    place.tags = unique(["Top Pick", ...place.tags]);
  }
}
