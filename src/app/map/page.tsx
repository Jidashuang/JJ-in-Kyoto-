import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { TagList } from "@/components/ui/Tag";
import { neighborhoods } from "@/data/neighborhoods";
import { places } from "@/data/places";

export const metadata: Metadata = {
  title: "Half-day Routes",
  description:
    "Half-day Kyoto routes drawn from each neighborhood — anchor stops, walkable in three hours, with notes on who each route suits and when to go.",
};

/**
 * Half-day routes page.
 *
 * Each neighborhood already carries the data we need (hook, anchorPlaceSlugs,
 * halfDayRoute prose, bestFor, whenToGo). This page composes them into 15
 * editorial cards — one route per neighborhood, anchor places shown as a
 * numbered sequence, the halfDayRoute paragraph as prose underneath.
 *
 * Routes complement /features (themed essays across multiple neighborhoods)
 * and /neighborhoods (full per-area pages with deeper context).
 */

type AnchorEntry = {
  slug: string;
  title: string;
  category: string;
  oneLiner: string;
};

function buildAnchorEntries(slugs: string[]): AnchorEntry[] {
  // Resolve anchor place slugs into a small display object.
  // Falls through any slug that isn't in the place dataset rather than
  // crashing — mismatches are reported at build time by tsc when types change.
  const out: AnchorEntry[] = [];
  for (const slug of slugs) {
    const place = places.find((p) => p.slug === slug);
    if (!place) continue;
    out.push({
      slug: place.slug,
      title: place.title,
      category: place.category[0] ?? "Place",
      // essence is the cleanest one-liner when present; otherwise fall back
      // to the first sentence of body (which is the argument-led opener we
      // wrote for the Why go section). excerpt is last because it is often
      // the generic default fallback string from the data factory.
      oneLiner: pickOneLiner(place.essence, place.body, place.excerpt),
    });
  }
  return out;
}

function pickOneLiner(
  essence: string | undefined,
  body: string,
  excerpt: string,
): string {
  const trimmedEssence = essence?.trim();
  if (trimmedEssence) return trimmedEssence;

  const trimmedBody = body?.trim();
  if (trimmedBody) {
    // Take the first sentence of body — our body openers are designed as
    // standalone arguments and read well as a one-liner.
    const firstSentence = trimmedBody.split(/(?<=[.!?])\s/, 1)[0];
    if (firstSentence && firstSentence.length > 0) return firstSentence;
  }

  return excerpt.trim();
}

const STEP_LABELS = ["Morning", "Midday", "Afternoon", "Later"];

export default function MapPage() {
  const routeCards = neighborhoods
    .map((neighborhood) => {
      const anchorSlugs = neighborhood.anchorPlaceSlugs ?? [];
      const fallbackSlugs = anchorSlugs.length === 0 ? neighborhood.placeSlugs.slice(0, 3) : anchorSlugs;
      const anchors = buildAnchorEntries(fallbackSlugs).slice(0, 4);
      return { neighborhood, anchors };
    })
    .filter((card) => card.anchors.length > 0);

  return (
    <>
      {/* Hero ─────────────────────────────────────────────────────────── */}
      <section className="section-paper border-b border-border py-16 md:py-24">
        <Container>
          <div className="max-w-4xl">
            <p className="editorial-kicker mb-4">Half-day routes</p>
            <div className="editorial-rule mb-8 max-w-56" />
            <Heading as="h1" size="xl" font="serif" className="text-balance">
              Fifteen neighborhoods,
              <br />
              fifteen half-days.
            </Heading>
            <p className="mt-7 max-w-2xl font-sans text-base leading-[1.6] tracking-[0.18px] text-muted-foreground">
              Each route opens with one neighborhood and two or three anchor places,
              walkable in roughly three hours. Pace stays slow on purpose — these
              are arguments for one careful loop, not optimised checklists.
            </p>
            <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground/80">
              Pair with{" "}
              <Link
                href="/features"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Routes
              </Link>{" "}
              for themed sequences across multiple areas, or{" "}
              <Link
                href="/neighborhoods"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Neighborhoods
              </Link>{" "}
              for the full per-area page.
            </p>
          </div>
        </Container>
      </section>

      {/* Route grid ────────────────────────────────────────────────────── */}
      <section className="border-b border-border py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {routeCards.map(({ neighborhood, anchors }, index) => {
              const tone = index % 2 === 0 ? "paper" : "warm";
              const cardClass =
                tone === "paper"
                  ? "border border-border bg-background"
                  : "border border-border bg-[#f5f2ef]/60";

              return (
                <article
                  key={neighborhood.slug}
                  className={`${cardClass} flex flex-col gap-7 p-7 md:p-9`}
                >
                  <header className="flex flex-col gap-3">
                    <p className="editorial-kicker">
                      Half-day · {neighborhood.name}
                    </p>
                    <Heading
                      as="h2"
                      size="md"
                      font="serif"
                      className="text-balance leading-[1.18]"
                    >
                      {neighborhood.hook ?? `${neighborhood.name} in three hours.`}
                    </Heading>
                  </header>

                  {/* Numbered anchor sequence */}
                  <ol className="flex flex-col gap-5 border-l border-border/60 pl-5">
                    {anchors.map((anchor, stepIndex) => (
                      <li key={anchor.slug} className="flex flex-col gap-1.5">
                        <p className="label-xs text-muted-foreground/70">
                          {STEP_LABELS[stepIndex] ?? `Stop ${stepIndex + 1}`} · {anchor.category}
                        </p>
                        <Link
                          href={`/places/${anchor.slug}`}
                          className="font-serif text-[1.35rem] leading-[1.2] text-foreground transition-opacity hover:opacity-70"
                        >
                          {anchor.title}
                        </Link>
                        <p className="font-sans text-sm leading-[1.55] text-muted-foreground">
                          {anchor.oneLiner}
                        </p>
                      </li>
                    ))}
                  </ol>

                  {/* halfDayRoute prose */}
                  {neighborhood.halfDayRoute && (
                    <aside className="border-l-2 border-foreground/15 pl-5">
                      <p className="mb-2 label-xs text-muted-foreground/65">
                        How to walk it
                      </p>
                      <p className="font-sans text-[0.94rem] leading-[1.65] tracking-[0.14px] text-foreground/85">
                        {neighborhood.halfDayRoute}
                      </p>
                    </aside>
                  )}

                  {/* Footer: best for / when / link */}
                  <div className="mt-auto flex flex-col gap-4 border-t border-border/70 pt-5">
                    {neighborhood.bestFor && neighborhood.bestFor.length > 0 && (
                      <div>
                        <p className="mb-2 label-xs text-muted-foreground/65">Best for</p>
                        <p className="font-sans text-sm leading-[1.5] text-muted-foreground">
                          {neighborhood.bestFor[0]}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      {neighborhood.whenToGo && (
                        <p className="font-sans text-xs italic text-muted-foreground/65">
                          {neighborhood.whenToGo}
                        </p>
                      )}
                      <Link
                        href={`/neighborhoods/${neighborhood.slug}`}
                        className="font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Open the full area →
                      </Link>
                    </div>

                    {neighborhood.ambiance && neighborhood.ambiance.length > 0 && (
                      <TagList
                        tags={neighborhood.ambiance.slice(0, 3)}
                        variant="outline"
                        size="sm"
                      />
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-14 text-center font-sans text-xs text-muted-foreground/45">
            {routeCards.length} routes · curated from the current data set · last reviewed from source material
          </p>
        </Container>
      </section>
    </>
  );
}
