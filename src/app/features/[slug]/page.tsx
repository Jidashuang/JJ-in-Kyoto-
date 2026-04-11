import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { CompactEditorialCard } from "@/components/ui/EditorialCards";
import { Heading } from "@/components/ui/Heading";
import { TagList } from "@/components/ui/Tag";
import { features } from "@/data/features";
import { neighborhoods } from "@/data/neighborhoods";
import { places } from "@/data/places";
import { selectPlacesForSurface } from "@/lib/place-display-selectors";
import type { Place } from "@/types/place";

export function generateStaticParams() {
  return features.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = features.find((item) => item.slug === slug);
  if (!feature) return {};

  return {
    title: feature.title,
    description: feature.intro,
  };
}

function inferBestTime(feature: {
  kind?: "route" | "collection" | "essay";
  tags?: string[];
}): string | undefined {
  const tags = feature.tags ?? [];

  if (tags.includes("Morning")) {
    return "morning to early noon";
  }

  if (tags.includes("Station") || tags.includes("Practical")) {
    return "before departure or just after arrival";
  }

  if (feature.kind === "route" && (tags.includes("Walk") || tags.includes("Scenic"))) {
    return "late morning through golden hour";
  }

  return undefined;
}

function buildSequenceHint(index: number, place: Place): string {
  if (index === 0) {
    return "Set your baseline stop before deciding pace.";
  }
  if (index === 1) {
    return "Shift into the core mood of this feature here.";
  }
  if (index === 2) {
    if (place.category.includes("Temple") || place.category.includes("Garden")) {
      return "Use this as the slower midpoint before deciding your finish.";
    }
    return "Use this as the optional extension point.";
  }
  if (index === 3) {
    return "Only continue if energy and timing still fit.";
  }
  return `Flexible stop ${index + 1} depending on distance and appetite.`;
}

function buildLeadFraming(input: {
  kind?: "route" | "collection" | "essay";
  strongCount: number;
  totalCount: number;
}): string {
  const { kind, strongCount, totalCount } = input;

  if (kind === "route") {
    if (strongCount >= 4) {
      return "Read this as a route spine: anchor stops first, then decide whether to extend.";
    }
    if (strongCount >= 2) {
      return "Read this as a selective route: keep anchor stops fixed, treat others as optional.";
    }
    return "Read this as a short route note: anchor options are limited, so keep the plan concise.";
  }

  if (kind === "essay") {
    return strongCount >= 2
      ? "Read this as an editorial argument first, then pick only the strongest matching places."
      : "Read this mainly as context: place anchors are intentionally minimal here.";
  }

  if (strongCount >= 3) {
    return `Read this as a curated collection: ${strongCount} stronger places lead the theme.`;
  }

  if (totalCount > strongCount) {
    return "Read this as a concise collection: use strong anchors first, then optional supporting notes.";
  }

  return "Read this as a short curated list, not a full itinerary.";
}

function InlinePlaceCard({
  slug,
  title,
  titleJa,
  category,
  neighborhoodName,
  neighborhoodSlug,
  excerpt,
  tags,
  heroImage,
  displayTier,
}: {
  slug: string;
  title: string;
  titleJa?: string;
  category: string[];
  neighborhoodName: string;
  neighborhoodSlug?: string;
  excerpt: string;
  tags: string[];
  heroImage: string;
  displayTier: Place["displayTier"];
}) {
  const heroTier = displayTier === "hero";

  return (
    <Link
      href={`/places/${slug}`}
      className={`group flex flex-col sm:flex-row gap-0 border transition-colors overflow-hidden ${
        heroTier
          ? "border-foreground/25 bg-card hover:border-foreground/35"
          : "border-border/85 bg-background/92 hover:border-foreground/20"
      }`}
    >
      <SmartImage
        src={heroImage}
        alt={title}
        fallbackLabel={category[0]}
        className={`aspect-[3/2] sm:aspect-auto sm:shrink-0 ${heroTier ? "sm:w-44" : "sm:w-36"}`}
        imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

      <div className={`flex flex-col justify-center gap-2.5 ${heroTier ? "p-6" : "p-5"}`}>
        <p className="label-xs text-accent/80">{heroTier ? "Hero pick" : "Standard pick"}</p>
        <div className="editorial-rule max-w-16" />

        <div className="flex items-center gap-2 flex-wrap">
          <TagList tags={category} variant="category" size="sm" />
          <span className="text-border">·</span>
          {neighborhoodSlug ? (
            <span className="label-xs text-muted-foreground underline underline-offset-4">
              {neighborhoodName}
            </span>
          ) : (
            <span className="label-xs text-muted-foreground">{neighborhoodName}</span>
          )}
        </div>

        <div>
          <h3 className="font-serif text-lg leading-snug text-foreground group-hover:opacity-70 transition-opacity">
            {title}
          </h3>
          {titleJa && <p className="font-sans text-xs text-muted-foreground/55 mt-0.5">{titleJa}</p>}
        </div>

        <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {excerpt}
        </p>

        {tags.length > 0 && (
          <TagList tags={tags.slice(0, 3)} variant="default" size="sm" className="mt-1" />
        )}
      </div>
    </Link>
  );
}

function MinimalPlaceRow({
  slug,
  title,
  titleJa,
  neighborhoodName,
  neighborhoodSlug,
  excerpt,
}: {
  slug: string;
  title: string;
  titleJa?: string;
  neighborhoodName: string;
  neighborhoodSlug?: string;
  excerpt: string;
}) {
  return (
    <Link
      href={`/places/${slug}`}
      className="group border border-border/70 bg-[color-mix(in_oklab,var(--background)_90%,var(--muted))] p-4 transition-colors hover:border-foreground/20"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-serif text-base text-foreground transition-opacity group-hover:opacity-75">
            {title}
          </p>
          {titleJa && <p className="mt-0.5 font-sans text-xs text-muted-foreground/55">{titleJa}</p>}
        </div>
        {neighborhoodSlug ? (
          <span className="label-xs text-muted-foreground underline underline-offset-4 shrink-0">
            {neighborhoodName}
          </span>
        ) : (
          <span className="label-xs text-muted-foreground shrink-0">{neighborhoodName}</span>
        )}
      </div>
      <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
    </Link>
  );
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = features.find((item) => item.slug === slug);
  if (!feature) notFound();

  const placeBySlug = new Map(places.map((place) => [place.slug, place]));
  const featurePlaces = feature.placeSlugs
    .map((placeSlug) => placeBySlug.get(placeSlug))
    .filter((place): place is Place => Boolean(place));

  const featureVisiblePlaces = selectPlacesForSurface(featurePlaces, "all_places");
  const featureStrongPlaces = selectPlacesForSurface(featurePlaces, "feature_lead");
  const featureMinimalPlaces = featureVisiblePlaces.filter((place) => place.displayTier === "minimal");

  const conciseMode = featureStrongPlaces.length < 3;
  const leadFraming = buildLeadFraming({
    kind: feature.kind,
    strongCount: featureStrongPlaces.length,
    totalCount: featureVisiblePlaces.length,
  });

  const neighborhoodBySlug = new Map(
    neighborhoods.map((neighborhood) => [neighborhood.slug, neighborhood]),
  );

  const relatedNeighborhoods = Array.from(
    featureVisiblePlaces
      .reduce(
        (acc, place) => {
          const neighborhoodSlug = place.canonicalNeighborhoodSlug;
          if (!neighborhoodSlug) return acc;
          const current = acc.get(neighborhoodSlug) ?? 0;
          acc.set(neighborhoodSlug, current + 1);
          return acc;
        },
        new Map<string, number>(),
      )
      .entries(),
  )
    .map(([neighborhoodSlug, count]) => ({
      neighborhoodSlug,
      count,
      neighborhood: neighborhoodBySlug.get(neighborhoodSlug),
    }))
    .filter((item) => Boolean(item.neighborhood))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const sequencePlaces = feature.kind === "route" ? featureStrongPlaces.slice(0, 5) : [];
  const bestTime = inferBestTime(feature);

  const otherFeatures = features
    .filter((item) => item.slug !== slug)
    .map((item) => {
      const strongCount = selectPlacesForSurface(
        item.placeSlugs
          .map((placeSlug) => placeBySlug.get(placeSlug))
          .filter((place): place is Place => Boolean(place)),
        "feature_lead",
      ).length;

      return {
        feature: item,
        strongCount,
      };
    })
    .sort((a, b) => b.strongCount - a.strongCount)
    .slice(0, 3);

  return (
    <article>
      <SmartImage
        src={feature.coverImage}
        alt={feature.title}
        fallbackLabel="Selected feature"
        className="aspect-[21/9] w-full max-h-[60svh]"
        imgClassName="object-cover"
        priority
      />

      <div className="section-paper border-b border-border py-12 md:py-16">
        <Container size="narrow">
          <nav className="mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link
              href="/features"
              className="font-sans text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <span className="text-border">/</span>
            <span className="font-sans text-xs tracking-[0.12em] uppercase text-muted-foreground/50 truncate">
              {feature.title}
            </span>
          </nav>

          <p className="editorial-kicker mb-3 text-accent/85">
            {feature.kind === "route" ? "Route" : feature.kind === "essay" ? "Essay" : "Collection"}
            {feature.subtitle ? ` · ${feature.subtitle}` : ""}
          </p>
          <div className="editorial-rule mb-7 max-w-36" />

          <Heading as="h1" size="xl" font="serif" className="mb-6 max-w-3xl text-balance">
            {feature.title}
          </Heading>

          <p className="font-sans text-[1.02rem] leading-[1.85] text-muted-foreground max-w-2xl">
            {feature.intro}
          </p>
          <p className="editorial-standfirst mt-8 max-w-2xl">
            Treat this page as a composed reading order, not a checklist.
          </p>

          <div className="mt-7 max-w-2xl border-l-2 border-accent/40 pl-4">
            <p className="label-xs text-muted-foreground/60 mb-2">Editorial framing</p>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">{leadFraming}</p>
          </div>

          {featureVisiblePlaces.length > 0 && (
            <p className="mt-8 font-sans text-xs text-muted-foreground/50">
              {featureStrongPlaces.length} strong place
              {featureStrongPlaces.length !== 1 ? "s" : ""}
              {featureMinimalPlaces.length > 0
                ? ` · ${featureMinimalPlaces.length} supporting minimal`
                : ""}
            </p>
          )}
        </Container>
      </div>

      <section className="section-warm border-b border-border py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
            <div>
              <div className="mb-6">
                <p className="editorial-kicker mb-3">Why this feature</p>
                <div className="editorial-rule mb-5 max-w-40" />
                <Heading as="h2" size="md" font="serif">
                  Point of view
                </Heading>
              </div>

              {feature.body ? (
                <div className="prose-kyoto space-y-5 text-muted-foreground max-w-2xl">
                  {feature.body
                    .split("\n\n")
                    .filter(Boolean)
                    .slice(0, conciseMode ? 1 : undefined)
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              ) : (
                <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  Use this as a curated entry point, then choose stops based on distance and
                  appetite.
                </p>
              )}

              {conciseMode && featureMinimalPlaces.length > 0 && (
                <p className="mt-5 font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  Anchor coverage is intentionally short here. Use stronger stops first, then add
                  supporting entries only if they fit your route.
                </p>
              )}
            </div>

            <aside className="note-panel h-fit p-7 flex flex-col gap-5">
              <div>
                <p className="editorial-kicker mb-2 text-current/70">How to use this page</p>
                <p className="font-sans text-sm leading-relaxed text-current/80">
                  {feature.kind === "route"
                    ? "Follow the anchor order loosely, and skip stops that do not fit distance or pace."
                    : "Treat this as a curated pool. Choose 2-3 anchor places rather than covering everything."}
                </p>
              </div>

              {bestTime && (
                <div>
                  <p className="editorial-kicker mb-2 text-current/70">Best time</p>
                  <p className="font-sans text-sm leading-relaxed text-current/80">{bestTime}</p>
                </div>
              )}

              {sequencePlaces.length >= 3 && (
                <div>
                  <p className="editorial-kicker mb-2 text-current/70">Suggested sequence</p>
                  <div className="flex flex-col gap-2">
                    {sequencePlaces.map((place, index) => (
                      <div key={place.slug} className="border border-current/25 bg-background/70 p-3">
                        <p className="font-sans text-xs text-muted-foreground/60 mb-1">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="font-serif text-sm text-foreground mb-1">{place.title}</p>
                        <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                          {buildSequenceHint(index, place)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>

      {featureVisiblePlaces.length > 0 ? (
        <section className="py-16 md:py-20">
          <Container>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="editorial-kicker mb-3">Places in this feature</p>
                <div className="editorial-rule mb-5 max-w-40" />
                <Heading as="h2" size="md" font="serif">
                  {feature.kind === "route" ? "Anchor route stops" : "Anchor places"}
                </Heading>
              </div>
              <Link
                href="/places"
                className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                All places →
              </Link>
            </div>

            {featureStrongPlaces.length > 0 ? (
              <div className="flex flex-col gap-5 max-w-3xl">
                {featureStrongPlaces.map((place, index) => {
                  const linkedNeighborhood = place.canonicalNeighborhoodSlug
                    ? neighborhoodBySlug.get(place.canonicalNeighborhoodSlug)
                    : undefined;

                  return (
                    <div key={place.slug} className="flex gap-4">
                      <span
                        className="font-serif text-4xl text-muted-foreground/20 leading-none mt-1 w-8 shrink-0 select-none"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="flex-1">
                        <InlinePlaceCard
                          slug={place.slug}
                          title={place.title}
                          titleJa={place.titleJa}
                          category={place.category}
                          neighborhoodName={
                            linkedNeighborhood?.name ?? place.canonicalNeighborhood ?? place.neighborhood
                          }
                          neighborhoodSlug={linkedNeighborhood?.slug}
                          excerpt={place.excerpt}
                          tags={place.tags}
                          heroImage={place.heroImage}
                          displayTier={place.displayTier}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="max-w-3xl border border-border/70 bg-muted/15 p-5">
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  No hero or standard anchors are available yet, so this page stays concise.
                </p>
              </div>
            )}

            {featureMinimalPlaces.length > 0 && (
              <div className="mt-10 max-w-3xl">
                <div className="mb-4">
                  <p className="editorial-kicker mb-2">Also noted</p>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    Supporting entries with lower display confidence.
                  </p>
                </div>
                <div className="reference-shelf flex flex-col gap-3 p-4">
                  {featureMinimalPlaces.map((place) => {
                    const linkedNeighborhood = place.canonicalNeighborhoodSlug
                      ? neighborhoodBySlug.get(place.canonicalNeighborhoodSlug)
                      : undefined;

                    return (
                      <MinimalPlaceRow
                        key={place.slug}
                        slug={place.slug}
                        title={place.title}
                        titleJa={place.titleJa}
                        neighborhoodName={
                          linkedNeighborhood?.name ?? place.canonicalNeighborhood ?? place.neighborhood
                        }
                        neighborhoodSlug={linkedNeighborhood?.slug}
                        excerpt={place.excerpt}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </Container>
        </section>
      ) : (
        <section className="py-16 md:py-20">
          <Container size="narrow">
            <div className="border border-border p-8 flex flex-col gap-3">
              <p className="label-xs text-muted-foreground/50">No places are linked to this feature yet.</p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Check the place index for nearby entries and continue browsing by category.
              </p>
            </div>
          </Container>
        </section>
      )}

      <section className="section-tint border-t border-border py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <div className="mb-6">
                <p className="editorial-kicker mb-3">Related neighborhoods</p>
                <div className="editorial-rule mb-5 max-w-40" />
                <Heading as="h2" size="md" font="serif">
                  Area context
                </Heading>
              </div>

              {relatedNeighborhoods.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {relatedNeighborhoods.map((item) => (
                    <Link
                      key={item.neighborhood!.slug}
                      href={`/neighborhoods/${item.neighborhood!.slug}`}
                      className="group border border-border bg-background p-4 hover:border-foreground/20 transition-colors"
                    >
                      <p className="font-serif text-lg text-foreground group-hover:opacity-70 transition-opacity">
                        {item.neighborhood!.name}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground/55 mt-2">
                        {item.count} place{item.count !== 1 ? "s" : ""} from this feature
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Neighborhood links will appear once places with area matches are available.
                </p>
              )}
            </div>

            {otherFeatures.length > 0 && (
              <div>
                <div className="mb-6">
                  <p className="editorial-kicker mb-3">More features</p>
                  <div className="editorial-rule mb-5 max-w-32" />
                  <Heading as="h2" size="md" font="serif">
                    Continue exploring
                  </Heading>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {otherFeatures.map((item) => (
                    <CompactEditorialCard
                      key={item.feature.slug}
                      href={`/features/${item.feature.slug}`}
                      title={item.feature.title}
                      excerpt={item.feature.intro}
                      image={item.feature.coverImage}
                      eyebrow={`${item.feature.kind === "route"
                        ? "Route"
                        : item.feature.kind === "essay"
                          ? "Essay"
                          : "Collection"} · ${item.strongCount} strong`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </article>
  );
}
