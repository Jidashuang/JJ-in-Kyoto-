import type { PlaceCategory, PlaceTag } from "@/data/place-taxonomy";

export type { PlaceCategory, PlaceTag };

export type PlaceTagWithTopPick = PlaceTag | "Top Pick";
export type PlaceDisplayTier = "hero" | "standard" | "minimal" | "hidden";

export type VerificationSource = 'pdf' | 'manual' | 'official'
export type VerificationStatus = 'unverified' | 'verified' | 'possibly_outdated'

export interface Verification {
  source: VerificationSource
  verifiedAt?: string
  status?: VerificationStatus
}

export interface Place {
  slug: string
  title: string
  titleJa?: string
  titleEn?: string
  category: PlaceCategory[]
  neighborhood: string
  rawNeighborhood?: string
  canonicalNeighborhoodSlug?: string
  lat?: number
  lng?: number
  address?: string
  hours?: string
  price?: string
  priceBand?: string
  reservation?: string
  warning?: string
  website?: string
  mapsUrl?: string
  tags: PlaceTagWithTopPick[]
  curatorNote?: string
  visitTime?: string
  stayLength?: string
  canonicalNeighborhood?: string
  subarea?: string
  bestFor?: string[]
  mood?: string[]
  pairWith?: string[]
  excerpt: string
  body: string
  heroImage: string
  gallery?: string[]
  featured: boolean
  topPick: boolean
  sourceFeature?: string
  sourcePages?: string
  verification?: Verification
  displayTier: PlaceDisplayTier
}
