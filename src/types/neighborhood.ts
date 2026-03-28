export interface Neighborhood {
  slug: string
  name: string
  nameJa?: string
  intro: string
  heroImage?: string
  /** Short mood words, e.g. ["Riverside", "Local", "Quiet"] */
  ambiance?: string[]
  /** Prose description of a suggested half-day route */
  halfDayRoute?: string
  placeSlugs: string[]
}
