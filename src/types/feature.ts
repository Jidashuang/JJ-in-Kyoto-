export interface Feature {
  slug: string
  title: string
  subtitle?: string
  intro: string
  coverImage: string
  body?: string
  kind?: "route" | "collection" | "essay"
  tags?: string[]
  placeSlugs: string[]
}
