import { getCanonicalNeighborhoodName } from "@/data/neighborhood-mapping";
import type { Place } from "@/types/place";

export function titleCaseNeighborhood(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getPlaceNeighborhoodBucket(
  place: Pick<Place, "canonicalNeighborhoodSlug" | "neighborhood">,
): string {
  if (place.canonicalNeighborhoodSlug) {
    return `canonical:${place.canonicalNeighborhoodSlug}`;
  }
  return `raw:${place.neighborhood}`;
}

export function getPlaceNeighborhoodLabel(
  place: Pick<
    Place,
    "canonicalNeighborhood" | "canonicalNeighborhoodSlug" | "neighborhood"
  >,
): string {
  return (
    place.canonicalNeighborhood?.trim() ||
    getCanonicalNeighborhoodName(place.canonicalNeighborhoodSlug) ||
    titleCaseNeighborhood(place.neighborhood)
  );
}
