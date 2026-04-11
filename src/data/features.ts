import type { Feature } from "@/types/feature";
import { realFeatures } from "@/data/real-features";
import { places } from "@/data/places";

const DEFAULT_INTRO =
  "An editorial Kyoto feature drawn from the current guide.";
const DEFAULT_BODY =
  "This page gathers the linked places and notes for the feature.";
const DEFAULT_COVER_IMAGE = "/images/features/placeholder.jpg";

function normalizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

const placeSlugSet = new Set(places.map((p) => p.slug));

function inferFeatureKind(input: {
  slug: string;
  title: string;
  tags?: string[];
  intro: string;
  body?: string;
}): Feature["kind"] {
  const lowerSlug = input.slug.toLowerCase();
  const lowerTitle = input.title.toLowerCase();
  const lowerIntro = input.intro.toLowerCase();
  const lowerBody = (input.body ?? "").toLowerCase();
  const tags = (input.tags ?? []).map((tag) => tag.toLowerCase());

  const isRoute =
    lowerSlug.includes("day") ||
    lowerTitle.includes("day") ||
    tags.includes("walk") ||
    lowerIntro.includes("route") ||
    lowerBody.includes("route");

  if (isRoute) return "route";

  const isEssay =
    tags.includes("culture") && !tags.includes("takeout") && !tags.includes("bakery");
  if (isEssay) return "essay";

  return "collection";
}

function resolveFeaturePlaceSlugs(inputSlugs: string[]): string[] {
  const resolved = inputSlugs
    .map((slug) => normalizeSlug(slug))
    .filter((slug) => placeSlugSet.has(slug));

  return unique(resolved);
}

export const features: Feature[] = realFeatures.map((item) => {
  const slug = normalizeSlug(item.slug || item.title || "");
  const resolvedSlug = slug.length > 0 ? slug : "feature";
  const title = item.title?.trim() || "Untitled Feature";
  const intro = item.intro?.trim() || DEFAULT_INTRO;
  const body = item.body?.trim() || DEFAULT_BODY;
  const coverImage = item.coverImage || DEFAULT_COVER_IMAGE;
  const placeSlugs = resolveFeaturePlaceSlugs(item.placeSlugs ?? []);
  const tags =
    item.tags && item.tags.length > 0
      ? unique(item.tags.map((tag) => tag.trim()).filter(Boolean))
      : undefined;

  return {
    slug: resolvedSlug,
    title,
    subtitle: item.subtitle,
    intro,
    coverImage,
    body,
    kind: inferFeatureKind({
      slug: resolvedSlug,
      title,
      tags,
      intro,
      body,
    }),
    tags,
    placeSlugs,
  };
});
