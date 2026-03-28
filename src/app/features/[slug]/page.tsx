import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { TagList } from "@/components/ui/Tag";
import { features } from "@/data/features";
import { places } from "@/data/places";

/* ─── Static params ──────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = features.find((f) => f.slug === slug);
  if (!feature) return {};

  return {
    title: feature.title,
    description: feature.intro,
  };
}

/* ─── Placeholder image ──────────────────────────────────────────────────── */
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
        <span className="label-xs text-stone-400 text-center px-4">{label}</span>
      )}
    </div>
  );
}

/* ─── Inline place card ──────────────────────────────────────────────────── */
function InlinePlaceCard({
  slug,
  title,
  titleJa,
  category,
  neighborhood,
  excerpt,
  tags,
}: {
  slug: string;
  title: string;
  titleJa?: string;
  category: string[];
  neighborhood: string;
  excerpt: string;
  tags: string[];
}) {
  return (
    <Link
      href={`/places/${slug}`}
      className="group flex flex-col sm:flex-row gap-0 border border-border hover:border-foreground/20 transition-colors overflow-hidden"
    >
      {/* Thumbnail */}
      <ImgPlaceholder
        className="aspect-[3/2] sm:aspect-auto sm:w-40 sm:shrink-0 transition-transform duration-500 group-hover:scale-[1.02]"
        label={category[0]}
      />

      {/* Text */}
      <div className="flex flex-col justify-center gap-2.5 p-5">
        {/* Category + area */}
        <div className="flex items-center gap-2 flex-wrap">
          <TagList tags={category} variant="category" size="sm" />
          <span className="text-border">·</span>
          <span className="label-xs text-muted-foreground">{neighborhood}</span>
        </div>

        {/* Name */}
        <div>
          <h3 className="font-serif text-lg leading-snug text-foreground group-hover:opacity-70 transition-opacity">
            {title}
          </h3>
          {titleJa && (
            <p className="font-sans text-xs text-muted-foreground/55 mt-0.5">
              {titleJa}
            </p>
          )}
        </div>

        {/* Excerpt */}
        <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {excerpt}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <TagList
            tags={tags.slice(0, 3)}
            variant="default"
            size="sm"
            className="mt-1"
          />
        )}
      </div>
    </Link>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = features.find((f) => f.slug === slug);
  if (!feature) notFound();

  const featurePlaces = places.filter((p) =>
    feature.placeSlugs.includes(p.slug)
  );

  // Other features for "related" strip
  const otherFeatures = features.filter((f) => f.slug !== slug).slice(0, 3);

  return (
    <article>
      {/* ── Hero / cover image ─────────────────────────────────────── */}
      <div className="w-full">
        <ImgPlaceholder
          className="aspect-[21/9] w-full max-h-[60svh]"
          label="Feature cover"
        />
      </div>

      {/* ── Feature header ────────────────────────────────────────── */}
      <div className="border-b border-border py-12 md:py-16">
        <Container size="narrow">
          {/* Breadcrumb */}
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

          {/* Label */}
          {feature.subtitle && (
            <p className="label-xs text-accent mb-5">{feature.subtitle}</p>
          )}

          {/* Title */}
          <Heading as="h1" size="xl" font="serif" className="mb-6 max-w-lg">
            {feature.title}
          </Heading>

          {/* Accent rule */}
          <div className="h-px w-12 bg-accent mb-7" />

          {/* Intro paragraph */}
          <p className="font-sans text-lg leading-[1.8] text-muted-foreground max-w-lg">
            {feature.intro}
          </p>

          {/* Place count badge */}
          {featurePlaces.length > 0 && (
            <p className="mt-8 font-sans text-xs text-muted-foreground/50">
              {featurePlaces.length} place
              {featurePlaces.length !== 1 ? "s" : ""} in this feature
            </p>
          )}
        </Container>
      </div>

      {/* ── Feature body copy ─────────────────────────────────────── */}
      {feature.body ? (
        <div className="border-b border-border py-12 md:py-16">
          <Container size="narrow">
            <div className="prose-kyoto space-y-5 text-muted-foreground max-w-xl">
              {feature.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Container>
        </div>
      ) : (
        /* If no long-form body yet, show a placeholder note */
        <div className="border-b border-border py-10">
          <Container size="narrow">
            <p className="font-sans text-sm text-muted-foreground/40 italic">
              Extended editorial copy for this feature is being written. The
              places below represent the full selection.
            </p>
          </Container>
        </div>
      )}

      {/* ── Places in this feature ────────────────────────────────── */}
      {featurePlaces.length > 0 && (
        <section className="py-16 md:py-20">
          <Container>
            {/* Section header */}
            <div className="mb-10">
              <p className="label-xs text-muted-foreground/60 mb-3">
                In this feature
              </p>
              <div className="divider mb-6" />
              <Heading as="h2" size="md" font="serif">
                Places
              </Heading>
            </div>

            {/* Place list */}
            <div className="flex flex-col gap-5 max-w-2xl">
              {featurePlaces.map((place, i) => (
                <div key={place.slug} className="flex gap-4">
                  {/* Index number */}
                  <span
                    className="font-serif text-4xl text-muted-foreground/20 leading-none mt-1 w-8 shrink-0 select-none"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <InlinePlaceCard {...place} />
                  </div>
                </div>
              ))}
            </div>

            {/* Link to all places */}
            <div className="mt-12 pt-10 border-t border-border">
              <Link
                href="/places"
                className="font-sans text-xs tracking-[0.14em] uppercase text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Browse all places →
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Empty state — no places matched */}
      {featurePlaces.length === 0 && (
        <section className="py-16">
          <Container size="narrow">
            <div className="border border-border p-8 flex flex-col gap-3">
              <p className="label-xs text-muted-foreground/50">
                Places coming soon
              </p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                The places for this feature are being finalised. Check back
                shortly or{" "}
                <Link
                  href="/places"
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  browse all places
                </Link>{" "}
                in the meantime.
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* ── More features ─────────────────────────────────────────── */}
      {otherFeatures.length > 0 && (
        <section className="border-t border-border bg-muted/20 py-16 md:py-20">
          <Container>
            <div className="mb-10">
              <p className="label-xs text-muted-foreground/60 mb-3">
                Continue reading
              </p>
              <div className="divider mb-6" />
              <Heading as="h2" size="md" font="serif">
                More Features
              </Heading>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {otherFeatures.map((f) => (
                <Link
                  key={f.slug}
                  href={`/features/${f.slug}`}
                  className="group flex flex-col gap-0 border border-border hover:border-foreground/20 transition-colors overflow-hidden bg-background"
                >
                  <ImgPlaceholder
                    className="aspect-[16/9] w-full transition-transform duration-500 group-hover:scale-[1.015]"
                    label="Feature cover"
                  />
                  <div className="flex flex-col gap-2 p-5">
                    {f.subtitle && (
                      <p className="label-xs text-muted-foreground">
                        {f.subtitle}
                      </p>
                    )}
                    <h3 className="font-serif text-lg leading-snug text-foreground group-hover:opacity-70 transition-opacity">
                      {f.title}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {f.intro}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
