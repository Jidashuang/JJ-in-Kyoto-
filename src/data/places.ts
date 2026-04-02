import type { Place } from "@/types/place";
import { realPlaces } from "@/data/real-places";
import { PLACE_CATEGORIES, PLACE_TAGS } from "@/data/place-taxonomy";
import { placeGalleryImage, placeHeroImage } from "@/data/image-assets";

const DEFAULT_NEIGHBORHOOD = "kyoto";
const DEFAULT_EXCERPT =
  "A curated Kyoto listing from the current guide.";
const DEFAULT_BODY =
  "This entry collects the practical notes and editorial context for the place.";

function normalizeNeighborhood(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

export const places: Place[] = realPlaces.map((item, index) => {
  const category = mapCategories(item.category);
  const slug = normalizeSlug(item.slug || item.title || "");
  const resolvedSlug =
    slug.length > 0 ? slug : normalizeSlug(item.title) || "place";
  const title = item.title?.trim() || slugToTitle(resolvedSlug);
  const neighborhood = item.neighborhood?.trim() || DEFAULT_NEIGHBORHOOD;

  const tags = mapTags(item.tags ?? [], item.topPick, category);

  return {
    slug: resolvedSlug,
    title,
    titleJa: item.titleJa,
    titleEn: item.titleEn,
    category,
    neighborhood,
    address: item.address,
    hours: item.hours,
    website: item.website,
    mapsUrl: item.mapsUrl,
    tags,
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
  };
});

for (const place of places) {
  place.neighborhood = normalizeNeighborhood(
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
