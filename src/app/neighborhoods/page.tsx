import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { neighborhoods } from "@/data/neighborhoods";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description:
    "Kyoto by district — explore the character of each area before you arrive.",
};

export default function NeighborhoodsPage() {
  return (
    <>
      {/* ── Page header ──────────────────────────────────────────────── */}
      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="label-xs mb-5 text-muted-foreground/70">By Area</p>
            <Heading as="h1" size="xl" font="serif" className="mb-5">
              Neighborhoods
            </Heading>
            <p className="font-sans text-base leading-relaxed text-muted-foreground max-w-lg">
              Kyoto rewards a slower approach. Each district has its own
              character — understanding where you are changes what you find
              there.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Neighborhood grid ────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 border border-border">
            {neighborhoods.map((n) => (
              <Link
                key={n.slug}
                href={`/neighborhoods/${n.slug}`}
                className="group flex flex-col gap-5 bg-background p-8 md:p-10 transition-colors hover:bg-muted/40"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Heading
                      as="h2"
                      size="md"
                      font="serif"
                      className="group-hover:opacity-60 transition-opacity"
                    >
                      {n.name}
                    </Heading>
                    {n.nameJa && (
                      <p className="font-sans text-xs text-muted-foreground/50 mt-1 tracking-wider">
                        {n.nameJa}
                      </p>
                    )}
                  </div>
                  <span className="font-sans text-sm text-muted-foreground/30 mt-1 shrink-0 group-hover:text-foreground group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </div>

                {/* Intro */}
                <p className="font-sans text-sm leading-relaxed text-muted-foreground line-clamp-4">
                  {n.intro}
                </p>

                {/* Ambiance tags */}
                {n.ambiance && n.ambiance.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-auto pt-2 border-t border-border/60">
                    {n.ambiance.map((word) => (
                      <span
                        key={word}
                        className="label-xs text-muted-foreground/60"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                )}

                {/* Place count */}
                {n.placeSlugs.length > 0 && (
                  <p className="font-sans text-[0.65rem] text-muted-foreground/40 tracking-wide">
                    {n.placeSlugs.length} place
                    {n.placeSlugs.length !== 1 ? "s" : ""} listed
                  </p>
                )}
              </Link>
            ))}

            {/* Placeholder card — "More coming" */}
            <div className="flex flex-col items-center justify-center gap-3 bg-muted/20 p-8 md:p-10 min-h-[220px]">
              <p className="label-xs text-muted-foreground/40 text-center">
                More districts being added
              </p>
              <p className="font-sans text-xs text-muted-foreground/30 text-center max-w-[160px] leading-relaxed">
                Higashiyama, Kitayama, and Kamogawa next
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contextual note ──────────────────────────────────────────── */}
      <section className="border-t border-border py-14">
        <Container size="narrow">
          <div className="flex flex-col gap-4 text-center">
            <p className="label-xs text-muted-foreground/50">How to use this</p>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              Each neighborhood page includes an introduction to the area&apos;s
              character, a curated list of places, and a suggested half-day
              route. Use it as orientation — not instruction.
            </p>
            <div className="flex justify-center gap-6 mt-2">
              <Link
                href="/places"
                className="font-sans text-xs tracking-[0.12em] uppercase text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Browse all places
              </Link>
              <Link
                href="/map"
                className="font-sans text-xs tracking-[0.12em] uppercase text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                View on map
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
