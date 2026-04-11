import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import {
  CompactEditorialCard,
  LeadEditorialCard,
  StandardEditorialCard,
  TextNoteCard,
} from "@/components/ui/EditorialCards";
import { features } from "@/data/features";
import { neighborhoods } from "@/data/neighborhoods";
import { places } from "@/data/places";
import { countPlacesByDisplayTier } from "@/lib/place-display-selectors";
import type { Feature } from "@/types/feature";
import type { Place } from "@/types/place";

export const metadata: Metadata = {
  title: "Features",
  description: "Kyoto routes, collections, and essays with a point of view.",
};

type RankedFeature = {
  feature: Feature;
  heroCount: number;
  standardCount: number;
  minimalCount: number;
  strongCount: number;
  visibleCount: number;
  score: number;
};

function kindLabel(kind?: Feature["kind"]): string {
  if (kind === "route") return "Route";
  if (kind === "essay") return "Essay";
  return "Collection";
}

function featureNeighborhoodNames(placeSlugs: string[]) {
  const placeMap = new Map(places.map((place) => [place.slug, place]));
  const neighborhoodMap = new Map(
    neighborhoods.map((neighborhood) => [neighborhood.slug, neighborhood.name]),
  );

  const names: string[] = [];
  for (const placeSlug of placeSlugs) {
    const place = placeMap.get(placeSlug);
    const neighborhoodSlug = place?.canonicalNeighborhoodSlug;
    if (!place || !neighborhoodSlug) continue;
    const name = neighborhoodMap.get(neighborhoodSlug);
    if (!name) continue;
    if (!names.includes(name)) names.push(name);
  }

  return names;
}

function rankFeatureByStrength(
  feature: Feature,
  placeBySlug: Map<string, Place>,
): RankedFeature {
  const resolvedPlaces = feature.placeSlugs
    .map((placeSlug) => placeBySlug.get(placeSlug))
    .filter((place): place is Place => Boolean(place));

  const counts = countPlacesByDisplayTier(resolvedPlaces);
  const strongCount = counts.hero + counts.standard;
  const visibleCount = strongCount + counts.minimal;

  return {
    feature,
    heroCount: counts.hero,
    standardCount: counts.standard,
    minimalCount: counts.minimal,
    strongCount,
    visibleCount,
    score: counts.hero * 5 + counts.standard * 3 + counts.minimal,
  };
}

export default function FeaturesPage() {
  const placeBySlug = new Map(places.map((place) => [place.slug, place]));

  const rankedFeatures = features
    .map((feature) => rankFeatureByStrength(feature, placeBySlug))
    .sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      if (a.strongCount !== b.strongCount) return b.strongCount - a.strongCount;
      if (a.heroCount !== b.heroCount) return b.heroCount - a.heroCount;
      return b.visibleCount - a.visibleCount;
    });

  const routeFeatures = rankedFeatures.filter((item) => item.feature.kind === "route");
  const editorialFeatures = rankedFeatures.filter((item) => item.feature.kind !== "route");

  const strongFeatures = rankedFeatures.filter((item) => item.strongCount >= 2);
  const conciseFeatures = rankedFeatures.filter((item) => item.strongCount < 2);

  const hero = strongFeatures[0] ?? rankedFeatures[0];
  const heroSlug = hero?.feature.slug;

  const remainingStrong = strongFeatures.filter((item) => item.feature.slug !== heroSlug);
  const primaryStrong = remainingStrong.slice(0, 5);
  const compactFeatures = [
    ...remainingStrong.slice(5),
    ...conciseFeatures.filter((item) => item.feature.slug !== heroSlug),
  ];

  return (
    <>
      <section className="section-paper border-b border-border py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="max-w-4xl">
              <p className="editorial-kicker mb-4">Routes & editorial</p>
              <div className="editorial-rule mb-8 max-w-56" />
              <Heading as="h1" size="xl" font="serif" className="text-balance">
                Features that frame
                <br />
                how to move through Kyoto.
              </Heading>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
                Organized by point of view: routes for walking sequences, collections for mood,
                and occasional essays for context.
              </p>
            </div>

            <TextNoteCard
              title="Current mix"
              body={`${strongFeatures.length} stronger features (2+ hero/standard places), plus ${conciseFeatures.length} concise features when the source set is lighter.`}
              tone="ink"
            />
          </div>

          {hero && (
            <div className="mt-12">
              <LeadEditorialCard
                href={`/features/${hero.feature.slug}`}
                title={hero.feature.title}
                excerpt={hero.feature.intro}
                image={hero.feature.coverImage}
                eyebrow={`Primary ${kindLabel(hero.feature.kind)} · ${hero.strongCount} strong places`}
                footer={
                  hero.minimalCount > 0
                    ? `${hero.heroCount} hero · ${hero.standardCount} standard · ${hero.minimalCount} minimal`
                    : `${hero.heroCount} hero · ${hero.standardCount} standard`
                }
              />
            </div>
          )}
        </Container>
      </section>

      {primaryStrong.length > 0 && (
        <section className="section-warm border-b border-border py-14 md:py-20">
          <Container>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="editorial-kicker mb-3">Prioritized features</p>
                <div className="editorial-rule mb-6 max-w-48" />
                <Heading as="h2" size="md" font="serif">
                  Start with the strongest editorial sets.
                </Heading>
              </div>
              <Link
                href="/neighborhoods"
                className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                Pair with neighborhoods →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {primaryStrong.map((item, index) => {
                const feature = item.feature;
                const areas = featureNeighborhoodNames(feature.placeSlugs);
                const eyebrow =
                  areas.length > 0
                    ? `${kindLabel(feature.kind)} · ${areas.slice(0, 2).join(" · ")}`
                    : kindLabel(feature.kind);
                const footer =
                  item.minimalCount > 0
                    ? `${item.strongCount} strong · ${item.minimalCount} minimal`
                    : `${item.strongCount} strong places`;

                if (index === 0) {
                  return (
                    <div key={feature.slug} className="md:col-span-2">
                      <LeadEditorialCard
                        href={`/features/${feature.slug}`}
                        title={feature.title}
                        excerpt={feature.intro}
                        image={feature.coverImage}
                        eyebrow={eyebrow}
                        footer={footer}
                      />
                    </div>
                  );
                }

                return (
                  <StandardEditorialCard
                    key={feature.slug}
                    href={`/features/${feature.slug}`}
                    title={feature.title}
                    excerpt={feature.intro}
                    image={feature.coverImage}
                    eyebrow={eyebrow}
                    footer={footer}
                  />
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {compactFeatures.length > 0 && (
        <section className="border-b border-border py-14 md:py-16">
          <Container>
            <div className="mb-8">
              <p className="editorial-kicker mb-3">Concise reads</p>
              <div className="editorial-rule mb-6 max-w-52" />
              <Heading as="h2" size="md" font="serif" className="text-balance">
                Keep these short and selective.
              </Heading>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
                {compactFeatures.slice(0, 4).map((item) => (
                  <StandardEditorialCard
                    key={item.feature.slug}
                    href={`/features/${item.feature.slug}`}
                    title={item.feature.title}
                    excerpt={item.feature.intro}
                    image={item.feature.coverImage}
                    eyebrow={`${kindLabel(item.feature.kind)} · ${item.strongCount} strong`}
                    footer={
                      item.minimalCount > 0
                        ? `${item.minimalCount} supporting minimal places`
                        : "Focused curation"
                    }
                    tone="warm"
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 lg:col-span-4">
                <TextNoteCard
                  title="How to read this page"
                  body={
                    routeFeatures.length > editorialFeatures.length
                      ? "Route-heavy set right now: pick one strong route first, then add one concise theme."
                      : "Theme-heavy set right now: pick one strong collection first, then one route if timing allows."
                  }
                  tone="ink"
                />

                {compactFeatures.slice(4, 8).map((item) => (
                  <CompactEditorialCard
                    key={item.feature.slug}
                    href={`/features/${item.feature.slug}`}
                    title={item.feature.title}
                    excerpt={item.feature.intro}
                    image={item.feature.coverImage}
                    eyebrow={`${kindLabel(item.feature.kind)} · ${item.strongCount} strong`}
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
