export type RealNeighborhood = {
  slug: string
  name: string
  intro: string
  lat?: number
  lng?: number
  hook?: string
  heroImage?: string
  anchorPlaceSlugs?: string[]
  bestFor?: string[]
  whenToGo?: string
  halfDayRoute?: string
  placeSlugs: string[]
  tags?: string[]
  featured?: boolean
  sourcePages?: string
}
