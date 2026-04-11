export interface Neighborhood {
  slug: string
  name: string
  nameJa?: string
  intro: string
  lat?: number
  lng?: number
  hook?: string
  heroImage?: string
  /** Short mood words, e.g. ["Riverside", "Local", "Quiet"] */
  ambiance?: string[]
  /** Who this area works best for */
  bestFor?: string[]
  /** Timing guidance when available */
  whenToGo?: string
  /** Prose description of a suggested half-day route */
  halfDayRoute?: string
  /** Curated anchor places that best represent this area */
  anchorPlaceSlugs?: string[]
  placeSlugs: string[]
}
