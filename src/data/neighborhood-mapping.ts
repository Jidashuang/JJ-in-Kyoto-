export const CANONICAL_NEIGHBORHOOD_NAME_BY_SLUG = {
  "karasuma-and-downtown": "Karasuma & Downtown",
  "gion-and-higashiyama": "Gion & Higashiyama",
  "kamo-river-and-demachiyanagi": "Kamo River & Demachiyanagi",
  "okazaki-and-marutamachi": "Okazaki & Marutamachi",
  "nishijin-and-north-kyoto": "Nishijin & North Kyoto",
  "kyoto-station-and-south": "Kyoto Station & South",
} as const;

export type CanonicalNeighborhoodSlug =
  keyof typeof CANONICAL_NEIGHBORHOOD_NAME_BY_SLUG;

export const CANONICAL_NEIGHBORHOOD_SLUGS = Object.keys(
  CANONICAL_NEIGHBORHOOD_NAME_BY_SLUG,
) as CanonicalNeighborhoodSlug[];

const RAW_NEIGHBORHOOD_TO_CANONICAL_SLUG: Partial<
  Record<string, CanonicalNeighborhoodSlug>
> = {
  karasuma: "karasuma-and-downtown",
  "karasuma-oike": "karasuma-and-downtown",
  teramachi: "karasuma-and-downtown",
  sakaimachi: "karasuma-and-downtown",
  rokkaku: "karasuma-and-downtown",
  demachiyanagi: "kamo-river-and-demachiyanagi",
  imadegawa: "kamo-river-and-demachiyanagi",
  gion: "gion-and-higashiyama",
  higashiyama: "gion-and-higashiyama",
  okazaki: "okazaki-and-marutamachi",
  marutamachi: "okazaki-and-marutamachi",
  murasakino: "nishijin-and-north-kyoto",
  kuramaguchi: "nishijin-and-north-kyoto",
  kamigamo: "nishijin-and-north-kyoto",
  shichijo: "kyoto-station-and-south",
};

// TODO(content): These labels can point to multiple neighborhood pages depending
// on the exact street/block context. Keep safe fallback until editorial review.
export const AMBIGUOUS_RAW_NEIGHBORHOODS = new Set([
  "kawaramachi",
  "nakagyo",
  "sanjo",
]);

export type NeighborhoodMappingStatus = "mapped" | "ambiguous" | "missing";

export function normalizeNeighborhoodValue(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function inspectCanonicalNeighborhoodMapping(rawNeighborhood?: string): {
  normalizedNeighborhood?: string;
  canonicalNeighborhoodSlug?: CanonicalNeighborhoodSlug;
  status: NeighborhoodMappingStatus;
} {
  if (!rawNeighborhood?.trim()) {
    return { status: "missing" };
  }

  const normalizedNeighborhood = normalizeNeighborhoodValue(rawNeighborhood);
  if (AMBIGUOUS_RAW_NEIGHBORHOODS.has(normalizedNeighborhood)) {
    return {
      normalizedNeighborhood,
      status: "ambiguous",
    };
  }

  const canonicalNeighborhoodSlug =
    RAW_NEIGHBORHOOD_TO_CANONICAL_SLUG[normalizedNeighborhood];
  return {
    normalizedNeighborhood,
    canonicalNeighborhoodSlug,
    status: canonicalNeighborhoodSlug ? "mapped" : "missing",
  };
}

export function resolveCanonicalNeighborhoodSlug(
  rawNeighborhood?: string,
): CanonicalNeighborhoodSlug | undefined {
  return inspectCanonicalNeighborhoodMapping(rawNeighborhood)
    .canonicalNeighborhoodSlug;
}

export function resolveLegacyCanonicalNeighborhoodSlug(
  value?: string,
): CanonicalNeighborhoodSlug | undefined {
  if (!value?.trim()) return undefined;
  const normalized = normalizeNeighborhoodValue(value);
  if (CANONICAL_NEIGHBORHOOD_SLUGS.includes(normalized as CanonicalNeighborhoodSlug)) {
    return normalized as CanonicalNeighborhoodSlug;
  }
  return undefined;
}

export function getCanonicalNeighborhoodName(
  slug?: string,
): string | undefined {
  if (!slug) return undefined;
  if (slug in CANONICAL_NEIGHBORHOOD_NAME_BY_SLUG) {
    return CANONICAL_NEIGHBORHOOD_NAME_BY_SLUG[slug as CanonicalNeighborhoodSlug];
  }
  return undefined;
}
