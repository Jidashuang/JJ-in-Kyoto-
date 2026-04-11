import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { Heading } from "@/components/ui/Heading";
import { Tag, TagList } from "@/components/ui/Tag";
import { places } from "@/data/places";
import {
  getPlaceNeighborhoodBucket,
  titleCaseNeighborhood,
} from "@/lib/place-neighborhood";

export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const place = places.find((p) => p.slug === slug);
  if (!place) return { title: "Place not found" };

  return {
    title: `${place.title} | Places`,
    description: place.excerpt,
  };
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 label-xs text-muted-foreground/60">{eyebrow}</p>
      <Heading as="h2" size="sm" font="serif">
        {title}
      </Heading>
    </div>
  );
}

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-4 last:border-0">
      <p className="label-xs text-muted-foreground/60">{label}</p>
      <div className="break-words font-sans text-sm leading-relaxed text-foreground">
        {children}
      </div>
    </div>
  );
}

function resolveAreaLabel(params: {
  neighborhood: string;
  canonicalNeighborhood?: string;
  subarea?: string;
}) {
  const canonical =
    params.canonicalNeighborhood?.trim() ||
    titleCaseNeighborhood(params.neighborhood);
  const subarea = params.subarea?.trim();

  return {
    canonical,
    subarea,
    label: subarea ? `${canonical} · ${subarea}` : canonical,
  };
}

function websiteDomain(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function RelatedCard({
  slug,
  title,
  titleJa,
  category,
  excerpt,
  curatorNote,
  neighborhood,
  canonicalNeighborhood,
  subarea,
  heroImage,
}: {
  slug: string;
  title: string;
  titleJa?: string;
  category: string[];
  excerpt: string;
  curatorNote?: string;
  neighborhood: string;
  canonicalNeighborhood?: string;
  subarea?: string;
  heroImage: string;
}) {
  const area = resolveAreaLabel({ neighborhood, canonicalNeighborhood, subarea });
  const note = curatorNote?.trim() || excerpt;

  return (
    <Link
      href={`/places/${slug}`}
      className="group flex flex-col overflow-hidden border border-border bg-background transition-colors hover:border-foreground/20"
    >
      <SmartImage
        src={heroImage}
        alt={title}
        fallbackLabel={category[0]}
        className="aspect-[3/2] w-full"
        imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="flex flex-col gap-2 p-4 pb-5">
        <p className="label-xs text-muted-foreground/60">{area.label}</p>
        <TagList tags={category} variant="category" size="sm" />
        <div>
          <h3 className="font-serif text-base leading-snug text-foreground transition-opacity group-hover:opacity-70">
            {title}
          </h3>
          {titleJa && (
            <p className="mt-0.5 font-sans text-xs text-muted-foreground/60">
              {titleJa}
            </p>
          )}
        </div>
        <p className="line-clamp-2 font-sans text-xs leading-relaxed text-muted-foreground">
          {note}
        </p>
      </div>
    </Link>
  );
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = places.find((p) => p.slug === slug);
  if (!place) notFound();

  const area = resolveAreaLabel({
    neighborhood: place.neighborhood,
    canonicalNeighborhood: place.canonicalNeighborhood,
    subarea: place.subarea,
  });
  const neighborhoodHref = place.canonicalNeighborhoodSlug
    ? `/neighborhoods/${place.canonicalNeighborhoodSlug}`
    : "/neighborhoods";

  const displayBody = place.body?.trim();
  const editorialSummary = place.curatorNote?.trim() || place.excerpt?.trim();
  const galleryImages = place.gallery && place.gallery.length > 0 ? place.gallery : [];

  const quickFacts = [
    { label: "Area", value: area.label },
    place.hours ? { label: "Hours", value: place.hours } : null,
    place.price ? { label: "Price", value: place.price } : null,
    place.website
      ? { label: "Website", value: websiteDomain(place.website) }
      : null,
  ].filter((item): item is { label: string; value: string } => !!item);

  const explicitPairWith = (place.pairWith ?? [])
    .map((relatedSlug) => places.find((item) => item.slug === relatedSlug))
    .filter((item): item is (typeof places)[number] => !!item)
    .slice(0, 3);

  const placeAreaBucket = getPlaceNeighborhoodBucket(place);

  const fallbackPairWith = places
    .filter(
      (item) =>
        item.slug !== place.slug &&
        (getPlaceNeighborhoodBucket(item) === placeAreaBucket ||
          item.category.some((category) => place.category.includes(category))),
    )
    .slice(0, 3);

  const pairWithPlaces =
    explicitPairWith.length > 0 ? explicitPairWith : fallbackPairWith;

  const pairWithSet = new Set(pairWithPlaces.map((item) => item.slug));

  const moreInArea = places
    .filter(
      (item) =>
        item.slug !== place.slug &&
        !pairWithSet.has(item.slug) &&
        getPlaceNeighborhoodBucket(item) === placeAreaBucket,
    )
    .slice(0, 3);

  const moreInAreaSet = new Set(moreInArea.map((item) => item.slug));

  const relatedPlaces = places
    .filter(
      (item) =>
        item.slug !== place.slug &&
        !pairWithSet.has(item.slug) &&
        !moreInAreaSet.has(item.slug) &&
        item.category.some((category) => place.category.includes(category)),
    )
    .slice(0, 3);

  const hasPracticalDetails =
    !!place.address ||
    !!place.hours ||
    !!place.price ||
    !!place.website ||
    !!place.mapsUrl;

  const hasTagSection =
    place.tags.length > 0 ||
    (place.bestFor && place.bestFor.length > 0) ||
    (place.mood && place.mood.length > 0);

  return (
    <>
      <section className="w-full">
        <SmartImage
          src={place.heroImage || "/images/places/placeholder.jpg"}
          alt={place.title}
          fallbackLabel={place.category[0]}
          className="aspect-[16/9] w-full max-h-[620px] md:aspect-[21/9]"
          imgClassName="object-cover"
          priority
        />
      </section>

      <Container className="py-10 md:py-14 lg:py-16">
        <nav aria-label="Breadcrumb" className="mb-8 md:mb-10">
          <ol className="flex flex-wrap items-center gap-2 font-sans text-xs uppercase tracking-[0.08em]">
            <li>
              <Link
                href="/places"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Places
              </Link>
            </li>
            <li className="text-border">/</li>
            <li>
                <Link
                href={neighborhoodHref}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {area.canonical}
              </Link>
            </li>
            <li className="text-border">/</li>
            <li className="text-muted-foreground/60">{place.title}</li>
          </ol>
        </nav>

        <article className="mx-auto max-w-4xl">
          <header className="mb-10">
            <div className="mb-5 flex flex-wrap gap-2">
              <TagList tags={place.category} variant="category" size="md" />
              {place.topPick && (
                <Tag variant="label" size="md">
                  Top Pick
                </Tag>
              )}
            </div>

            <Heading as="h1" size="xl" font="serif" className="mb-2">
              {place.title}
            </Heading>

            {(place.titleJa || place.titleEn) && (
              <div className="mb-4 flex flex-col gap-1">
                {place.titleJa && (
                  <p className="font-sans text-sm tracking-wider text-muted-foreground/70">
                    {place.titleJa}
                  </p>
                )}
                {place.titleEn && (
                  <p className="font-sans text-sm text-muted-foreground/60">
                    {place.titleEn}
                  </p>
                )}
              </div>
            )}

            <p className="label-xs text-muted-foreground/70">{area.label}</p>
          </header>

          {editorialSummary && (
            <section className="mb-12 md:mb-14">
              <SectionHeading eyebrow="Editorial" title="Curator note" />
              <p className="max-w-3xl font-serif text-lg italic leading-[1.7] text-muted-foreground md:text-xl">
                {editorialSummary}
              </p>
            </section>
          )}

          {displayBody && (
            <section className="mb-12 md:mb-14">
              <SectionHeading eyebrow="Editorial" title="Why go" />
              <div className="prose-kyoto max-w-none md:max-w-3xl">
                {displayBody.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-5 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          {quickFacts.length > 0 && (
            <section className="mb-12 md:mb-14">
              <SectionHeading eyebrow="At a glance" title="Quick facts" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="border border-border px-4 py-3">
                    <p className="label-xs text-muted-foreground/60">{fact.label}</p>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-foreground">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {galleryImages.length > 0 && (
            <section className="mb-12 md:mb-14">
              <SectionHeading eyebrow="Visuals" title="Gallery" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {galleryImages.map((imageSrc, index) => (
                  <figure
                    key={`${imageSrc}-${index}`}
                    className="relative aspect-[4/3] overflow-hidden border border-border bg-stone-100"
                  >
                    <SmartImage
                      src={imageSrc}
                      alt={`${place.title} gallery image ${index + 1}`}
                      fallbackLabel={place.title}
                      className="aspect-[4/3] w-full"
                      imgClassName="object-cover"
                    />
                  </figure>
                ))}
              </div>
            </section>
          )}

          {hasTagSection && (
            <section className="mb-12 md:mb-14">
              <SectionHeading eyebrow="Vibe" title="Tags / Best for / Mood" />
              <div className="flex flex-col gap-4">
                {place.tags.length > 0 && (
                  <div>
                    <p className="mb-2 label-xs text-muted-foreground/60">Tags</p>
                    <TagList tags={place.tags} variant="default" size="md" />
                  </div>
                )}
                {place.bestFor && place.bestFor.length > 0 && (
                  <div>
                    <p className="mb-2 label-xs text-muted-foreground/60">Best for</p>
                    <TagList tags={place.bestFor} variant="outline" size="md" />
                  </div>
                )}
                {place.mood && place.mood.length > 0 && (
                  <div>
                    <p className="mb-2 label-xs text-muted-foreground/60">Mood</p>
                    <TagList tags={place.mood} variant="outline" size="md" />
                  </div>
                )}
              </div>
            </section>
          )}

          {pairWithPlaces.length > 0 && (
            <section className="mb-12 md:mb-14">
              <SectionHeading eyebrow="Pairings" title="Pair with" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pairWithPlaces.map((item) => (
                  <RelatedCard
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    titleJa={item.titleJa}
                    category={item.category}
                    excerpt={item.excerpt}
                    curatorNote={item.curatorNote}
                    neighborhood={item.neighborhood}
                    canonicalNeighborhood={item.canonicalNeighborhood}
                    subarea={item.subarea}
                    heroImage={item.heroImage}
                  />
                ))}
              </div>
            </section>
          )}

          {hasPracticalDetails && (
            <section className="mb-12 md:mb-14">
              <SectionHeading eyebrow="Practical" title="Plan your visit" />
              <div className="border border-border px-5 md:px-6">
                {place.address && <InfoRow label="Address">{place.address}</InfoRow>}
                {place.hours && <InfoRow label="Hours">{place.hours}</InfoRow>}
                {place.price && <InfoRow label="Price range">{place.price}</InfoRow>}
                {place.website && (
                  <InfoRow label="Website">
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 transition-opacity hover:opacity-60"
                    >
                      {websiteDomain(place.website)}
                    </a>
                  </InfoRow>
                )}
                {place.mapsUrl && (
                  <InfoRow label="Map">
                    <a
                      href={place.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 transition-opacity hover:opacity-60"
                    >
                      Open in Google Maps →
                    </a>
                  </InfoRow>
                )}
              </div>
            </section>
          )}

          {(place.sourceFeature || place.sourcePages || place.verification) && (
            <section className="border-t border-border pt-8">
              <p className="mb-3 label-xs text-muted-foreground/60">Source notes</p>
              <div className="flex flex-col gap-2 font-sans text-xs text-muted-foreground/70">
                {place.sourceFeature && (
                  <p>
                    Source feature: {place.sourceFeature}
                    {place.sourcePages ? ` (${place.sourcePages})` : ""}
                  </p>
                )}
                {!place.sourceFeature && place.sourcePages && (
                  <p>Source pages: {place.sourcePages}</p>
                )}
                {place.verification && (
                  <p>
                    Verification: {place.verification.status ?? "unverified"} ·
                    source: {place.verification.source}
                  </p>
                )}
              </div>
            </section>
          )}
        </article>
      </Container>

      {(moreInArea.length > 0 || relatedPlaces.length > 0) && (
        <section className="border-t border-border py-14 md:py-16">
          <Container>
            <SectionHeading eyebrow="Explore more" title="More in this area / Related places" />
            <div className="flex flex-col gap-10">
              {moreInArea.length > 0 && (
                <div>
                  <p className="mb-4 label-xs text-muted-foreground/60">
                    More in {area.canonical}
                  </p>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {moreInArea.map((item) => (
                      <RelatedCard
                        key={item.slug}
                        slug={item.slug}
                        title={item.title}
                        titleJa={item.titleJa}
                        category={item.category}
                        excerpt={item.excerpt}
                        curatorNote={item.curatorNote}
                        neighborhood={item.neighborhood}
                        canonicalNeighborhood={item.canonicalNeighborhood}
                        subarea={item.subarea}
                        heroImage={item.heroImage}
                      />
                    ))}
                  </div>
                </div>
              )}

              {relatedPlaces.length > 0 && (
                <div>
                  <p className="mb-4 label-xs text-muted-foreground/60">Related places</p>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedPlaces.map((item) => (
                      <RelatedCard
                        key={item.slug}
                        slug={item.slug}
                        title={item.title}
                        titleJa={item.titleJa}
                        category={item.category}
                        excerpt={item.excerpt}
                        curatorNote={item.curatorNote}
                        neighborhood={item.neighborhood}
                        canonicalNeighborhood={item.canonicalNeighborhood}
                        subarea={item.subarea}
                        heroImage={item.heroImage}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
