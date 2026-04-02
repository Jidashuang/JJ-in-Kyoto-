import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Tag, TagList } from "@/components/ui/Tag";
import { places } from "@/data/places";

/* ─── Static params ─────────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return places.map((p) => ({ slug: p.slug }));
}

/* ─── Metadata ──────────────────────────────────────────────────────────────── */
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

/* ─── Small UI helpers ─────────────────────────────────────────────────────── */
function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6">
      <p className="label-xs text-muted-foreground/60 mb-2">{eyebrow}</p>
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
    <div className="flex flex-col gap-1 py-4 border-b border-border last:border-0">
      <p className="label-xs text-muted-foreground/60">{label}</p>
      <div className="font-sans text-sm text-foreground leading-relaxed break-words">
        {children}
      </div>
    </div>
  );
}

function ImgPlaceholder({
  className = "",
  label = "",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`img-placeholder bg-stone-100 ${className}`}
      aria-hidden="true"
    >
      {label && (
        <span className="label-xs text-stone-400 text-center px-4">
          {label}
        </span>
      )}
    </div>
  );
}

function RelatedCard({
  slug,
  title,
  titleJa,
  category,
  excerpt,
}: {
  slug: string;
  title: string;
  titleJa?: string;
  category: string[];
  excerpt: string;
}) {
  return (
    <Link
      href={`/places/${slug}`}
      className="group flex flex-col overflow-hidden border border-border bg-background hover:border-foreground/20 transition-colors"
    >
      <ImgPlaceholder
        className="aspect-[3/2] w-full transition-transform duration-500 group-hover:scale-[1.03]"
        label={category[0]}
      />
      <div className="p-4 pb-5 flex flex-col gap-2">
        <TagList tags={category} variant="category" size="sm" />
        <div>
          <h3 className="font-serif text-base leading-snug text-foreground group-hover:opacity-70 transition-opacity">
            {title}
          </h3>
          {titleJa && (
            <p className="font-sans text-xs text-muted-foreground/60 mt-0.5">
              {titleJa}
            </p>
          )}
        </div>
        <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}

function titleCaseNeighborhood(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = places.find((p) => p.slug === slug);
  if (!place) notFound();

  const hasInfo =
    place.address ||
    place.hours ||
    place.price ||
    place.website ||
    place.mapsUrl;

  const related = places
    .filter(
      (p) =>
        p.slug !== place.slug &&
        (p.neighborhood === place.neighborhood ||
          p.category.some((c) => place.category.includes(c))),
    )
    .slice(0, 3);

  return (
    <>
      {/* ── Hero placeholder ────────────────────────────────────────── */}
      <section className="w-full">
        <ImgPlaceholder
          className="aspect-[16/9] md:aspect-[21/9] w-full max-h-[620px]"
          label={place.category[0]}
        />
      </section>

      <Container className="py-10 md:py-14 lg:py-16">
        {/* ── Back / breadcrumb navigation ───────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-8 md:mb-10">
          <ol className="flex flex-wrap items-center gap-2 font-sans text-xs tracking-[0.08em] uppercase">
            <li>
              <Link
                href="/places"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Places
              </Link>
            </li>
            <li className="text-border">/</li>
            <li>
              <Link
                href={`/neighborhoods/${place.neighborhood}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {titleCaseNeighborhood(place.neighborhood)}
              </Link>
            </li>
            <li className="text-border">/</li>
            <li className="text-muted-foreground/60">{place.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
          {/* ── Main column ─────────────────────────────────────── */}
          <article>
            {/* Title block */}
            <header className="mb-10">
              <div className="flex flex-wrap gap-2 mb-5">
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
                <div className="flex flex-col gap-1 mb-6">
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

              <p className="font-serif text-lg md:text-xl italic leading-[1.7] text-muted-foreground max-w-3xl">
                {place.excerpt}
              </p>
            </header>

            {/* Detail info section (main) */}
            {hasInfo && (
              <section className="mb-12 md:mb-14">
                <SectionHeading
                  eyebrow="Details"
                  title="Practical information"
                />
                <div className="border border-border px-5 md:px-6">
                  {place.address && (
                    <InfoRow label="Address">{place.address}</InfoRow>
                  )}
                  {place.hours && (
                    <InfoRow label="Hours">{place.hours}</InfoRow>
                  )}
                  {place.price && (
                    <InfoRow label="Price range">{place.price}</InfoRow>
                  )}
                  {place.website && (
                    <InfoRow label="Website">
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:opacity-60 transition-opacity"
                      >
                        {place.website.replace(/^https?:\/\//, "")}
                      </a>
                    </InfoRow>
                  )}
                  {place.mapsUrl && (
                    <InfoRow label="Map">
                      <a
                        href={place.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:opacity-60 transition-opacity"
                      >
                        Open in Google Maps →
                      </a>
                    </InfoRow>
                  )}
                </div>
              </section>
            )}

            {/* Long-form body section */}
            <section className="mb-12 md:mb-14">
              <SectionHeading eyebrow="Editorial" title="Why go" />
              <div className="prose-kyoto max-w-none md:max-w-3xl">
                {place.body.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-5 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Tags */}
            {place.tags.length > 0 && (
              <section className="mb-12 md:mb-14">
                <SectionHeading eyebrow="Quick read" title="Tags" />
                <TagList tags={place.tags} variant="default" size="md" />
              </section>
            )}

            {/* Gallery section */}
            <section className="mb-12 md:mb-14">
              <SectionHeading eyebrow="Visuals" title="Gallery" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["View 1", "View 2", "View 3"].map((label) => (
                  <ImgPlaceholder
                    key={label}
                    className="aspect-[4/3] border border-border"
                    label={label}
                  />
                ))}
              </div>
            </section>

            {/* Source/verification from mock data model */}
            {(place.sourceFeature ||
              place.sourcePages ||
              place.verification) && (
              <section className="border-t border-border pt-8">
                <p className="label-xs text-muted-foreground/60 mb-3">
                  Source notes
                </p>
                <div className="flex flex-col gap-2 font-sans text-xs text-muted-foreground/70">
                  {place.sourceFeature && (
                    <p>
                      Source feature:{" "}
                      <Link
                        href={`/features/${place.sourceFeature}`}
                        className="underline underline-offset-4 hover:text-foreground transition-colors"
                      >
                        {place.sourceFeature}
                      </Link>
                      {place.sourcePages ? ` (${place.sourcePages})` : ""}
                    </p>
                  )}
                  {place.verification && (
                    <p>
                      Verification: {place.verification.status ?? "unverified"}{" "}
                      · source: {place.verification.source}
                    </p>
                  )}
                </div>
              </section>
            )}
          </article>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="lg:pt-1">
            <div className="lg:sticky lg:top-[84px] border border-border p-5 md:p-6">
              <p className="label-xs text-muted-foreground/60 mb-3">Navigate</p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/places"
                  className="font-sans text-sm underline underline-offset-4 hover:opacity-60 transition-opacity"
                >
                  ← Back to all places
                </Link>
                <Link
                  href={`/neighborhoods/${place.neighborhood}`}
                  className="font-sans text-sm underline underline-offset-4 hover:opacity-60 transition-opacity"
                >
                  More in {titleCaseNeighborhood(place.neighborhood)}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* ── Related places section ───────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-border py-14 md:py-16">
          <Container>
            <SectionHeading eyebrow="More" title="Related places" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <RelatedCard
                  key={item.slug}
                  slug={item.slug}
                  title={item.title}
                  titleJa={item.titleJa}
                  category={item.category}
                  excerpt={item.excerpt}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
