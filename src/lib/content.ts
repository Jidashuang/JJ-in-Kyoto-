import type { Place, PlaceCategory, PlaceTag } from '@/types/place'
import type { Feature } from '@/types/feature'
import type { Neighborhood } from '@/types/neighborhood'
import { places } from '@/data/places'
import { features } from '@/data/features'
import { neighborhoods } from '@/data/neighborhoods'

// ─── Places ───────────────────────────────────────────────────────────────────

/** Returns every place in the data layer. */
export function getAllPlaces(): Place[] {
  return places
}

/** Returns places marked as featured (featured: true). */
export function getFeaturedPlaces(): Place[] {
  return places.filter((p) => p.featured)
}

/** Returns places marked as top picks (topPick: true). */
export function getTopPicks(): Place[] {
  return places.filter((p) => p.topPick)
}

/** Looks up a single place by its slug. Returns undefined if not found. */
export function getPlaceBySlug(slug: string): Place | undefined {
  return places.find((p) => p.slug === slug)
}

// ─── Features ─────────────────────────────────────────────────────────────────

/** Returns every feature in the data layer. */
export function getAllFeatures(): Feature[] {
  return features
}

/** Looks up a single feature by its slug. Returns undefined if not found. */
export function getFeatureBySlug(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug)
}

/**
 * Resolves the placeSlugs array on a feature into full Place objects.
 * Slugs that have no matching place are silently dropped.
 */
export function getPlacesForFeature(featureSlug: string): Place[] {
  const feature = getFeatureBySlug(featureSlug)
  if (!feature) return []
  return feature.placeSlugs
    .map((slug) => getPlaceBySlug(slug))
    .filter((p): p is Place => p !== undefined)
}

// ─── Neighborhoods ────────────────────────────────────────────────────────────

/** Returns every neighborhood in the data layer. */
export function getAllNeighborhoods(): Neighborhood[] {
  return neighborhoods
}

/** Looks up a single neighborhood by its slug. Returns undefined if not found. */
export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug)
}

/**
 * Convenience helper for display — returns the neighborhood's human-readable
 * name for a given slug, falling back to the raw slug if not found.
 */
export function getNeighborhoodName(slug: string): string {
  return getNeighborhoodBySlug(slug)?.name ?? slug
}

/**
 * Resolves the placeSlugs array on a neighborhood into full Place objects.
 * Slugs that have no matching place are silently dropped.
 */
export function getPlacesForNeighborhood(neighborhoodSlug: string): Place[] {
  const neighborhood = getNeighborhoodBySlug(neighborhoodSlug)
  if (!neighborhood) return []
  return neighborhood.placeSlugs
    .map((slug) => getPlaceBySlug(slug))
    .filter((p): p is Place => p !== undefined)
}

// ─── Filtering ────────────────────────────────────────────────────────────────

export interface PlaceFilter {
  /** Filter to places that include this category. */
  category?: PlaceCategory
  /** Filter to places in this neighborhood slug. */
  neighborhood?: string
  /** Filter to places that include this tag. */
  tag?: PlaceTag
}

/**
 * Filters places by any combination of category, neighborhood, and tag.
 * All provided criteria must match (AND logic).
 *
 * @example
 * filterPlaces({ category: 'Cafe', neighborhood: 'nishijin' })
 */
export function filterPlaces({ category, neighborhood, tag }: PlaceFilter): Place[] {
  return places.filter((p) => {
    if (category !== undefined && !p.category.includes(category)) return false
    if (neighborhood !== undefined && p.neighborhood !== neighborhood) return false
    if (tag !== undefined && !p.tags.includes(tag)) return false
    return true
  })
}

/** Shorthand: filter places by a single category. */
export function filterPlacesByCategory(category: PlaceCategory): Place[] {
  return filterPlaces({ category })
}

/** Shorthand: filter places by neighborhood slug. */
export function filterPlacesByNeighborhood(neighborhoodSlug: string): Place[] {
  return filterPlaces({ neighborhood: neighborhoodSlug })
}

/** Shorthand: filter places by a single tag. */
export function filterPlacesByTag(tag: PlaceTag): Place[] {
  return filterPlaces({ tag })
}

// ─── Taxonomy helpers ─────────────────────────────────────────────────────────

/**
 * Returns every PlaceCategory that appears on at least one place in the
 * current data set, sorted alphabetically. Useful for building filter UIs.
 */
export function getUsedCategories(): PlaceCategory[] {
  const seen = new Set<PlaceCategory>()
  for (const p of places) {
    for (const c of p.category) {
      seen.add(c)
    }
  }
  return Array.from(seen).sort()
}

/**
 * Returns every PlaceTag that appears on at least one place in the current
 * data set, sorted alphabetically. Useful for building filter UIs.
 */
export function getUsedTags(): PlaceTag[] {
  const seen = new Set<PlaceTag>()
  for (const p of places) {
    for (const t of p.tags) {
      seen.add(t)
    }
  }
  return Array.from(seen).sort()
}
