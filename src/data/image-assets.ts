// Fallback image helpers for places that don't have a heroImage or gallery set.
// Currently returns undefined for all indices since no local fallback images are stored
// in /public/images/. Add mappings here when local images are available.

export function placeHeroImage(_index: number): string | undefined {
  return undefined;
}

export function placeGalleryImage(_index: number): string | null | undefined {
  return undefined;
}
