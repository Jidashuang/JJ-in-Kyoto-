import { realPlaces } from "@/data/real-places";
import {
  CANONICAL_NEIGHBORHOOD_SLUGS,
  getCanonicalNeighborhoodName,
  inspectCanonicalNeighborhoodMapping,
  resolveLegacyCanonicalNeighborhoodSlug,
  type CanonicalNeighborhoodSlug,
  type NeighborhoodMappingStatus,
} from "@/data/neighborhood-mapping";
import type { RealPlace } from "@/types/place-real";

export type PlaceNeighborhoodMappingStatus = NeighborhoodMappingStatus;

export type PlaceNeighborhoodNormalizationRecord = {
  slug: string;
  title: string;
  rawNeighborhood?: string;
  normalizedNeighborhood?: string;
  canonicalNeighborhoodSlug?: CanonicalNeighborhoodSlug;
  canonicalNeighborhood?: string;
  status: PlaceNeighborhoodMappingStatus;
};

export function resolvePlaceCanonicalNeighborhood(
  place: Pick<RealPlace, "neighborhood" | "canonicalNeighborhood">,
): {
  canonicalNeighborhoodSlug?: CanonicalNeighborhoodSlug;
  normalizedNeighborhood?: string;
  status: PlaceNeighborhoodMappingStatus;
} {
  const rawResult = inspectCanonicalNeighborhoodMapping(place.neighborhood);
  const legacyCanonicalNeighborhoodSlug = resolveLegacyCanonicalNeighborhoodSlug(
    place.canonicalNeighborhood?.trim(),
  );
  const canonicalNeighborhoodSlug =
    rawResult.canonicalNeighborhoodSlug ?? legacyCanonicalNeighborhoodSlug;

  return {
    canonicalNeighborhoodSlug,
    normalizedNeighborhood: rawResult.normalizedNeighborhood,
    status:
      canonicalNeighborhoodSlug !== undefined
        ? "mapped"
        : rawResult.status === "ambiguous"
          ? "ambiguous"
          : "missing",
  };
}

export const placeNeighborhoodNormalization: PlaceNeighborhoodNormalizationRecord[] =
  realPlaces.map((place) => {
    const resolution = resolvePlaceCanonicalNeighborhood(place);
    return {
      slug: place.slug,
      title: place.title,
      rawNeighborhood: place.neighborhood?.trim() || undefined,
      normalizedNeighborhood: resolution.normalizedNeighborhood,
      canonicalNeighborhoodSlug: resolution.canonicalNeighborhoodSlug,
      canonicalNeighborhood:
        place.canonicalNeighborhood?.trim() ||
        getCanonicalNeighborhoodName(resolution.canonicalNeighborhoodSlug),
      status: resolution.status,
    };
  });

export const canonicalNeighborhoodByPlaceSlug = new Map<
  string,
  CanonicalNeighborhoodSlug
>(
  placeNeighborhoodNormalization
    .filter(
      (
        item,
      ): item is PlaceNeighborhoodNormalizationRecord & {
        canonicalNeighborhoodSlug: CanonicalNeighborhoodSlug;
      } => Boolean(item.canonicalNeighborhoodSlug),
    )
    .map((item) => [item.slug, item.canonicalNeighborhoodSlug]),
);

export const placesMissingCanonicalNeighborhood =
  placeNeighborhoodNormalization.filter((item) => item.status === "missing");

export const ambiguousCanonicalNeighborhoodCases =
  placeNeighborhoodNormalization.filter((item) => item.status === "ambiguous");

export const neighborhoodCoverageSummary = (() => {
  const countsByCanonical = Object.fromEntries(
    CANONICAL_NEIGHBORHOOD_SLUGS.map((slug) => [slug, 0]),
  ) as Record<CanonicalNeighborhoodSlug, number>;

  for (const item of placeNeighborhoodNormalization) {
    if (!item.canonicalNeighborhoodSlug) continue;
    countsByCanonical[item.canonicalNeighborhoodSlug] += 1;
  }

  return {
    total: placeNeighborhoodNormalization.length,
    mapped: placeNeighborhoodNormalization.filter((item) => item.status === "mapped")
      .length,
    missing: placesMissingCanonicalNeighborhood.length,
    ambiguous: ambiguousCanonicalNeighborhoodCases.length,
    byCanonicalNeighborhood: countsByCanonical,
  };
})();
