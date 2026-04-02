import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { features } from "@/data/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Editorial themes and curated collections from across Kyoto — coffee mornings, bookstore afternoons, and the city's quieter corners.",
};

/* ─── Placeholder image ────────────────────────────────────────────────────── */
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

/* ─── Feature card — large format ─────────────────────────────────────────── */
function FeatureCardLarge({
  slug,
  title,
  subtitle,
  intro,
  placeSlugs,
}: {
  slug: string;
  title: string;
  subtitle?: string;
  intro: string;
  placeSlugs: string[];
}) {
  return (
    <Link
      href={`/features/${slug}`}
      className="group grid grid-cols-1 md:grid-cols-2 border border-border hover:border-foreground/20 transition-colors overflow-hidden"
    >
      {/* Cover */}
      <ImgPlaceholder
        className="aspect-[4/3] md:aspect-auto md:min-h-[360px] w-full transition-transform duration-500 group-hover:scale-[1.015]"
        label="Feature cover"
      />

      {/* Text */}
      <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
        {subtitle && (
          <p className="label-xs text-muted-foreground">{subtitle}</p>
        )}

        <Heading
          as="h2"
          size="lg"
          font="serif"
          className="group-hover:opacity-70 transition-opacity"
        >
          {title}
        </Heading>

        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          {intro}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <span className="font-sans text-xs tracking-[0.12em] uppercase text-foreground/50 group-hover:text-foreground transition-colors">
            Read feature
          </span>
          <span className="text-foreground/30 group-hover:text-foreground/60 transition-colors">
            →
          </span>
        </div>

        {placeSlugs.length > 0 && (
          <p className="font-sans text-xs text-muted-foreground/50 mt-auto pt-4 border-t border-border">
            {placeSlugs.length} place{placeSlugs.length !== 1 ? "s" : ""} in
            this feature
          </p>
        )}
      </div>
    </Link>
  );
}

/* ─── Feature card — compact ───────────────────────────────────────────────── */
function FeatureCardCompact({
  slug,
  title,
  subtitle,
  intro,
  placeSlugs,
}: {
  slug: string;
  title: string;
  subtitle?: string;
  intro: string;
  placeSlugs: string[];
}) {
  return (
    <Link
      href={`/features/${slug}`}
      className="group flex flex-col border border-border hover:border-foreground/20 transition-colors overflow-hidden"
    >
      {/* Cover */}
      <ImgPlaceholder
        className="aspect-[16/9] w-full transition-transform duration-500 group-hover:scale-[1.015]"
        label="Feature cover"
      />

      {/* Text */}
      <div className="flex flex-col gap-3 p-6 pb-7 flex-1">
        {subtitle && (
          <p className="label-xs text-muted-foreground">{subtitle}</p>
        )}

        <Heading
          as="h3"
          size="sm"
          font="serif"
          className="group-hover:opacity-70 transition-opacity"
        >
          {title}
        </Heading>

        <p className="font-sans text-sm leading-relaxed text-muted-foreground line-clamp-3 flex-1">
          {intro}
        </p>

        <div className="flex items-center justify-between mt-3 pt-4 border-t border-border/60">
          <span className="font-sans text-xs tracking-[0.12em] uppercase text-foreground/40 group-hover:text-foreground/70 transition-colors">
            Read →
          </span>
          {placeSlugs.length > 0 && (
            <span className="font-sans text-xs text-muted-foreground/40">
              {placeSlugs.length} place{placeSlugs.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function FeaturesPage() {
  const [hero, ...rest] = features;

  return (
    <div className="py-16 md:py-24">
      <Container>
        {/* ── Page header ────────────────────────────────────────────── */}
        <div className="mb-14 md:mb-20">
          <p className="label-xs text-muted-foreground/60 mb-4">Editorial</p>
          <div className="divider mb-6" />
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Heading as="h1" size="xl" font="serif">
              Features
            </Heading>
            <p className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed">
              Themed collections and editorial notes — the city read by subject
              rather than by map.
            </p>
          </div>
        </div>

        {/* ── Hero feature ───────────────────────────────────────────── */}
        {hero && (
          <div className="mb-10 md:mb-14">
            <FeatureCardLarge {...hero} />
          </div>
        )}

        {/* ── Secondary features grid ────────────────────────────────── */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((f) => (
              <FeatureCardCompact key={f.slug} {...f} />
            ))}
          </div>
        )}

      </Container>
    </div>
  );
}
