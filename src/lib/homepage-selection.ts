import auditData from "../../data/research/place_status_audit.json";
import { getPlaceNeighborhoodBucket } from "@/lib/place-neighborhood";
import { selectPlacesForSurface } from "@/lib/place-display-selectors";
import type { Place } from "@/types/place";

type PlaceAuditStatus =
  | "ready_to_publish"
  | "usable_but_needs_image"
  | "needs_manual_review"
  | "hold_back_for_now";

type HeroImageLevel = "ok" | "needs_review" | "missing" | "broken_local_path";
type NeighborhoodQualityLevel = "mapped" | "ambiguous" | "missing";

type AuditRecord = {
  slug: string;
  status?: PlaceAuditStatus;
  checks?: {
    heroImage?: {
      level?: HeroImageLevel;
    };
    neighborhood?: {
      level?: NeighborhoodQualityLevel;
    };
  };
};

type AuditData = {
  records?: AuditRecord[];
};

export type HomepageSectionKey =
  | "lead_surfaces_hero"
  | "editorial_supporting_standard";

export type HomepageSectionSizing = {
  section: HomepageSectionKey;
  desired: number;
  actual: number;
  shrunk: boolean;
  reason?: string;
};

export type HomepagePlaceSelection = {
  heroLead?: Place;
  editorialLead?: Place;
  supportingPicks: Place[];
  sectionSizing: HomepageSectionSizing[];
};

const auditRecords = ((auditData as AuditData).records ?? []).filter(
  (record): record is AuditRecord => typeof record.slug === "string",
);

const auditBySlug = new Map(auditRecords.map((record) => [record.slug, record]));

function scoreHeroImage(level?: HeroImageLevel): number {
  switch (level) {
    case "ok":
      return 3;
    case "needs_review":
      return 1;
    case "missing":
      return 0;
    case "broken_local_path":
      return -1;
    default:
      return 0;
  }
}

function scoreNeighborhoodQuality(level?: NeighborhoodQualityLevel): number {
  switch (level) {
    case "mapped":
      return 2;
    case "ambiguous":
      return 1;
    case "missing":
      return 0;
    default:
      return 0;
  }
}

function scoreStatus(status?: PlaceAuditStatus): number {
  switch (status) {
    case "ready_to_publish":
      return 3;
    case "usable_but_needs_image":
      return 1;
    case "needs_manual_review":
      return 0;
    case "hold_back_for_now":
      return -2;
    default:
      return 0;
  }
}

function isLeadQualityStrong(place: Place): boolean {
  const audit = auditBySlug.get(place.slug);
  return (
    audit?.status === "ready_to_publish" &&
    audit.checks?.heroImage?.level === "ok" &&
    audit.checks?.neighborhood?.level === "mapped"
  );
}

function isSupportingQualityStrong(place: Place): boolean {
  const audit = auditBySlug.get(place.slug);
  const heroImageLevel = audit?.checks?.heroImage?.level;
  const neighborhoodLevel = audit?.checks?.neighborhood?.level;

  return (
    (audit?.status === "ready_to_publish" ||
      audit?.status === "usable_but_needs_image") &&
    heroImageLevel !== "missing" &&
    heroImageLevel !== "broken_local_path" &&
    neighborhoodLevel !== "missing"
  );
}

function heroSortScore(place: Place): number {
  const audit = auditBySlug.get(place.slug);
  const heroImageLevel = audit?.checks?.heroImage?.level;
  const neighborhoodLevel = audit?.checks?.neighborhood?.level;

  return (
    scoreHeroImage(heroImageLevel) * 3 +
    scoreNeighborhoodQuality(neighborhoodLevel) * 2 +
    scoreStatus(audit?.status) +
    (place.topPick ? 2 : 0) +
    (place.canonicalNeighborhoodSlug ? 1 : 0)
  );
}

function supportingSortScore(place: Place): number {
  const audit = auditBySlug.get(place.slug);
  const heroImageLevel = audit?.checks?.heroImage?.level;
  const neighborhoodLevel = audit?.checks?.neighborhood?.level;

  return (
    scoreStatus(audit?.status) * 3 +
    scoreHeroImage(heroImageLevel) * 2 +
    scoreNeighborhoodQuality(neighborhoodLevel) * 2 +
    (place.topPick ? 1 : 0)
  );
}

function sortByScore(
  input: Place[],
  score: (place: Place) => number,
): Place[] {
  return [...input].sort((a, b) => {
    const scoreDiff = score(b) - score(a);
    if (scoreDiff !== 0) return scoreDiff;
    return a.title.localeCompare(b.title);
  });
}

function pickDiverseByNeighborhood(params: {
  candidates: Place[];
  desiredCount: number;
  seedNeighborhoodBuckets?: string[];
}): Place[] {
  const { candidates, desiredCount, seedNeighborhoodBuckets = [] } = params;
  if (desiredCount <= 0 || candidates.length === 0) return [];

  const usedNeighborhoodBuckets = new Set(seedNeighborhoodBuckets);
  const selected: Place[] = [];
  const usedSlugs = new Set<string>();

  while (selected.length < desiredCount) {
    const remaining = candidates.filter((place) => !usedSlugs.has(place.slug));
    if (remaining.length === 0) break;

    const uncovered = remaining.find(
      (place) => !usedNeighborhoodBuckets.has(getPlaceNeighborhoodBucket(place)),
    );
    const next = uncovered ?? remaining[0];
    selected.push(next);
    usedSlugs.add(next.slug);
    usedNeighborhoodBuckets.add(getPlaceNeighborhoodBucket(next));
  }

  return selected;
}

const DESIRED_HERO_LEADS = 2;
const DESIRED_SUPPORTING_PICKS = 4;

export function selectHomepagePlaces(allPlaces: Place[]): HomepagePlaceSelection {
  const heroCandidates = sortByScore(
    selectPlacesForSurface(allPlaces, "homepage_editorial").filter(
      isLeadQualityStrong,
    ),
    heroSortScore,
  );
  const standardCandidates = sortByScore(
    selectPlacesForSurface(allPlaces, "homepage_secondary").filter(
      isSupportingQualityStrong,
    ),
    supportingSortScore,
  );

  const heroLeads = pickDiverseByNeighborhood({
    candidates: heroCandidates,
    desiredCount: DESIRED_HERO_LEADS,
  });

  const supportingPicks = pickDiverseByNeighborhood({
    candidates: standardCandidates,
    desiredCount: DESIRED_SUPPORTING_PICKS,
    seedNeighborhoodBuckets: heroLeads.map((place) =>
      getPlaceNeighborhoodBucket(place),
    ),
  });

  const sectionSizing: HomepageSectionSizing[] = [
    {
      section: "lead_surfaces_hero",
      desired: DESIRED_HERO_LEADS,
      actual: heroLeads.length,
      shrunk: heroLeads.length < DESIRED_HERO_LEADS,
      reason:
        heroLeads.length < DESIRED_HERO_LEADS
          ? "Hero-tier places are limited, so lead surfaces intentionally shrink."
          : undefined,
    },
    {
      section: "editorial_supporting_standard",
      desired: DESIRED_SUPPORTING_PICKS,
      actual: supportingPicks.length,
      shrunk: supportingPicks.length < DESIRED_SUPPORTING_PICKS,
      reason:
        supportingPicks.length < DESIRED_SUPPORTING_PICKS
          ? "Standard-tier places are limited, so supporting cards intentionally shrink."
          : undefined,
    },
  ];

  return {
    heroLead: heroLeads[0],
    editorialLead: heroLeads[1],
    supportingPicks,
    sectionSizing,
  };
}
