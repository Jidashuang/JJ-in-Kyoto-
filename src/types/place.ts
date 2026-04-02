export type PlaceCategory =
  | 'Cafe'
  | 'Sweets'
  | 'Bakery'
  | 'Bookstore'
  | 'Antique'
  | 'Lifestyle'
  | 'Restaurant'
  | 'Japanese'
  | 'Chinese'
  | 'Western'
  | 'Walk'
  | 'Scenic Spot'

export type PlaceTag =
  | 'Top Pick'
  | 'Morning'
  | 'Quiet'
  | 'Classic'
  | 'Casual'
  | 'Local Favorite'
  | 'Design Lover'
  | 'Solo Friendly'

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
  address?: string
  hours?: string
  price?: string
  website?: string
  mapsUrl?: string
  tags: PlaceTag[]
  excerpt: string
  body: string
  heroImage: string
  gallery?: string[]
  featured: boolean
  topPick: boolean
  sourceFeature?: string
  sourcePages?: string
  verification?: Verification
}
