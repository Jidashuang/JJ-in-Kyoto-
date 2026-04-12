import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { TextNoteCard } from "@/components/ui/EditorialCards";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Kyoto by JJ — a concise editorial guide built from repeated visits, careful curation, and quiet places worth returning to.",
};

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl space-y-4 font-sans text-sm leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="section-paper border-b border-border py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div className="max-w-4xl">
              <p className="editorial-kicker mb-4">About</p>
              <div className="editorial-rule mb-8 max-w-56" />
              <Heading as="h1" size="xl" font="serif" className="max-w-3xl text-balance">
                A calm, personal Kyoto guide built from repeat visits.
              </Heading>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
                This project is intentionally selective. The point is to offer orientation and
                curation, not a complete directory.
              </p>
            </div>

            <TextNoteCard
              title="Editorial principle"
              body="If a place does not hold up across multiple visits, it usually stays out."
              tone="ink"
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-14 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <article>
              <p className="editorial-kicker mb-3">Project story</p>
              <Heading as="h2" size="md" font="serif" className="mb-5">
                From private notes to a public guide
              </Heading>
              <Prose>
                <p>
                  This began as personal notes: places worth returning to, routes that worked,
                  and details easy to forget.
                </p>
                <p>
                  Over time it became a small editorial index. The aim is to stay useful,
                  selective, and clear.
                </p>
              </Prose>
            </article>

            <article>
              <p className="editorial-kicker mb-3">Curation philosophy</p>
              <Heading as="h2" size="md" font="serif" className="mb-5">
                Distinct, consistent, repeatable
              </Heading>
              <Prose>
                <p>
                  Inclusion is based on lived experience, not listing volume. Atmosphere,
                  craft, and repeat value matter most.
                </p>
                <p>
                  This guide prefers fewer stronger recommendations over broad coverage.
                </p>
              </Prose>
            </article>
          </div>
        </Container>
      </section>

      <section className="section-warm border-b border-border py-14 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <article className="border border-border bg-background p-6 lg:col-span-4">
              <p className="editorial-kicker mb-3">Source note</p>
              <Heading as="h2" size="sm" font="serif" className="mb-4">
                On sources and verification
              </Heading>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                Inputs include firsthand visits, direct checks, and selected references.
                Practical details can change quickly, so verify hours and availability.
              </p>
            </article>

            <article className="border border-border bg-background p-6 lg:col-span-4">
              <p className="editorial-kicker mb-3">Image note</p>
              <Heading as="h2" size="sm" font="serif" className="mb-4">
                Rights and attribution
              </Heading>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                Most images are sourced from shops&apos; own official websites or public-facing materials.
                If you hold rights and need a credit, update, or removal, please get in touch.
              </p>
            </article>

            <article className="border border-border bg-background p-6 lg:col-span-4">
              <p className="editorial-kicker mb-3">Corrections</p>
              <Heading as="h2" size="sm" font="serif" className="mb-4">
                Updates are welcome
              </Heading>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                This section stays open for thoughtful corrections and practical updates.
              </p>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
