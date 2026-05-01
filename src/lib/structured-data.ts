/**
 * JSON-LD structured data builders.
 *
 * These are plain functions returning typed-loose schema.org objects. They are
 * rendered into <script type="application/ld+json"> by the StructuredData
 * component so search engines can extract entities.
 *
 * Conventions:
 *   - Always omit fields when their value is missing (don't emit empty strings
 *     or undefined — keeps output clean and avoids triggering rich-result
 *     warnings for partial data).
 *   - Absolute URLs everywhere. Relative paths become absolute via siteUrl.
 *   - Locale stays English; the guide is published in English.
 */

import type { Feature } from "@/types/feature";
import type { Neighborhood } from "@/types/neighborhood";
import type { Place } from "@/types/place";
import { siteUrl } from "@/lib/site";

const SITE_NAME = "Kyoto by JJ";
const SITE_DESCRIPTION =
  "An edited guide to Kyoto's quieter places — coffee, books, old shops, and rooms worth lingering in.";

// JSON-LD allows arbitrarily nested objects with arbitrary string keys plus a
// few well-known camelCased ones. We type loosely and rely on the builder
// functions to keep things sane.
export type JsonLd = Record<string, unknown>;

function absUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = siteUrl.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

function compact<T extends JsonLd>(obj: T): T {
  // Strip undefined values so the rendered JSON-LD doesn't contain
  // `"key": undefined` — which JSON.stringify drops anyway, but keeping the
  // object clean makes the function output easier to read in tests too.
  const out: JsonLd = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out as T;
}

/* ─── Site-wide ──────────────────────────────────────────────────────────── */

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "Kyoto Annai",
    url: siteUrl,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absUrl("/icon.png"),
      },
    },
  };
}

/* ─── Breadcrumbs ────────────────────────────────────────────────────────── */

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; url: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absUrl(item.url),
    })),
  };
}

/* ─── Place ──────────────────────────────────────────────────────────────── */

export function placeJsonLd(place: Place): JsonLd {
  const alternateNames = [place.titleJa, place.titleEn].filter(
    (value): value is string => typeof value === "string" && value.length > 0,
  );

  const address = place.address
    ? compact({
        "@type": "PostalAddress",
        streetAddress: place.address,
        addressLocality: "Kyoto",
        addressRegion: "Kyoto",
        addressCountry: "JP",
      })
    : undefined;

  const geo =
    typeof place.lat === "number" && typeof place.lng === "number"
      ? {
          "@type": "GeoCoordinates",
          latitude: place.lat,
          longitude: place.lng,
        }
      : undefined;

  const containedInName =
    place.canonicalNeighborhood ?? place.canonicalNeighborhoodSlug ?? "Kyoto";

  return compact({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: place.title,
    alternateName: alternateNames.length > 0 ? alternateNames : undefined,
    description: place.excerpt,
    url: absUrl(`/places/${place.slug}`),
    image: place.heroImage ? absUrl(place.heroImage) : undefined,
    address,
    geo,
    sameAs: place.website ? [place.website] : undefined,
    hasMap: place.mapsUrl,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: containedInName,
    },
    keywords: place.tags.filter((t) => t !== "Top Pick").join(", ") || undefined,
  });
}

/* ─── Feature ────────────────────────────────────────────────────────────── */

export function featureJsonLd(feature: Feature, places: Place[]): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: feature.title,
    alternativeHeadline: feature.subtitle,
    description: feature.intro,
    image: feature.coverImage ? absUrl(feature.coverImage) : undefined,
    url: absUrl(`/features/${feature.slug}`),
    inLanguage: "en",
    keywords:
      feature.tags && feature.tags.length > 0 ? feature.tags.join(", ") : undefined,
    author: { "@type": "Person", name: "JJ" },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: places.length,
      itemListElement: places.map((place, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absUrl(`/places/${place.slug}`),
        name: place.title,
      })),
    },
  });
}

/* ─── Neighborhood ───────────────────────────────────────────────────────── */

export function neighborhoodJsonLd(
  neighborhood: Neighborhood,
  places: Place[],
): JsonLd {
  const geo =
    typeof neighborhood.lat === "number" && typeof neighborhood.lng === "number"
      ? {
          "@type": "GeoCoordinates",
          latitude: neighborhood.lat,
          longitude: neighborhood.lng,
        }
      : undefined;

  return compact({
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: neighborhood.name,
    alternateName: neighborhood.nameJa,
    description: neighborhood.intro,
    url: absUrl(`/neighborhoods/${neighborhood.slug}`),
    image: neighborhood.heroImage ? absUrl(neighborhood.heroImage) : undefined,
    geo,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Kyoto",
    },
    includesAttraction: places.map((place) => ({
      "@type": "TouristAttraction",
      name: place.title,
      url: absUrl(`/places/${place.slug}`),
    })),
    keywords:
      neighborhood.ambiance && neighborhood.ambiance.length > 0
        ? neighborhood.ambiance.join(", ")
        : undefined,
  });
}
