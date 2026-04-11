import type { Place, PlaceDisplayTier } from "@/types/place";

export type PlaceDisplaySurface =
  | "homepage_editorial"
  | "homepage_secondary"
  | "neighborhood_anchor"
  | "feature_lead"
  | "all_places";

const surfaceAllowedTiers: Record<PlaceDisplaySurface, PlaceDisplayTier[]> = {
  homepage_editorial: ["hero"],
  homepage_secondary: ["standard"],
  neighborhood_anchor: ["hero", "standard"],
  feature_lead: ["hero", "standard"],
  all_places: ["hero", "standard", "minimal"],
};

export function placeVisibleOnSurface(
  place: Pick<Place, "displayTier">,
  surface: PlaceDisplaySurface,
): boolean {
  return surfaceAllowedTiers[surface].includes(place.displayTier);
}

export function selectPlacesForSurface<T extends Pick<Place, "displayTier">>(
  inputPlaces: T[],
  surface: PlaceDisplaySurface,
): T[] {
  return inputPlaces.filter((place) => placeVisibleOnSurface(place, surface));
}

export function countPlacesByDisplayTier(
  inputPlaces: Array<Pick<Place, "displayTier">>,
): Record<PlaceDisplayTier, number> {
  const counts: Record<PlaceDisplayTier, number> = {
    hero: 0,
    standard: 0,
    minimal: 0,
    hidden: 0,
  };

  for (const place of inputPlaces) {
    counts[place.displayTier] += 1;
  }

  return counts;
}
