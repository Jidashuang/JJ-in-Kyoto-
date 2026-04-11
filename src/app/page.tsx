import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import {
  CompactEditorialCard,
  LeadEditorialCard,
  StandardEditorialCard,
  TextNoteCard,
} from "@/components/ui/EditorialCards";
import { places } from "@/data/places";
import { features } from "@/data/features";
import { neighborhoods } from "@/data/neighborhoods";
import { selectHomepagePlaces } from "@/lib/homepage-selection";

export default function HomePage() {
  const homepageSelection = selectHomepagePlaces(places);
  const heroLead = homepageSelection.heroLead;
  const editorialLead = homepageSelection.editorialLead;
  const supportingPicks = homepageSelection.supportingPicks;
  const supportingLeadCards = supportingPicks.slice(0, 2);
  const supportingReferenceCards = supportingPicks.slice(2);

  const featuredRoutes = features.slice(0, 3);
  const stripNeighborhoods = neighborhoods.slice(0, 6);

  return (
    <>
      <section className="section-paper border-b border-black/5 pb-20 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="cover-frame px-6 py-8 md:px-10 md:py-11 lg:px-12 lg:py-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="editorial-kicker mb-4">Kyoto by JJ · Personal Editorial Guide</p>
                <div className="editorial-rule mb-8 max-w-64" />
                <Heading
                  as="h1"
                  size="display"
                  font="serif"
                  className="max-w-5xl text-balance"
                >
                  Kyoto,
                  <br />
                  read by neighborhoods and pace.
                </Heading>
                <p className="mt-7 max-w-xl font-sans text-[1.13rem] leading-[1.6] tracking-[0.18px] text-muted-foreground">
                  A selective guide for slow city days: where to begin, how to drift,
                  and where to pause without over-scheduling every stop.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href="/neighborhoods"
                    className="el-pill-black h-11"
                  >
                    Start by Neighborhood
                  </Link>
                  <Link
                    href="/features"
                    className="el-pill-warm h-11"
                  >
                    Browse Routes
                  </Link>
                </div>
              </div>

              {heroLead && (
                <div className="lg:col-span-5 lg:translate-y-8">
                  <LeadEditorialCard
                    href={`/places/${heroLead.slug}`}
                    title={heroLead.title}
                    excerpt={heroLead.excerpt}
                    image={heroLead.heroImage}
                    eyebrow="Lead Pick"
                  />
                </div>
              )}
            </div>
          </div>

          <p className="editorial-standfirst mt-14 max-w-4xl">
            Choose one district first, then let the day remain half-open.
          </p>
          <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground/85">
            The guide is designed as layers: lead cards for anchors, standard cards for context,
            and compact shelf entries for optional references.
          </p>
        </Container>
      </section>

      <section className="section-warm border-b border-black/5 py-14 md:py-16">
        <Container>
          <div className="mb-8">
            <p className="editorial-kicker mb-3">How to enter this guide</p>
            <div className="editorial-rule mb-6 max-w-56" />
            <Heading as="h2" size="lg" font="serif" className="max-w-3xl text-balance">
              Three calm ways in, depending on where your day begins.
            </Heading>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <TextNoteCard
              title="By neighborhood"
              body="Start from where you are, then follow local rhythm before checking categories."
              href="/neighborhoods"
              cta="Open Neighborhoods"
            />
            <TextNoteCard
              title="By mood / theme"
              body="Use tags as atmosphere cues: quiet coffee, design shops, sweets, and pauses."
              href="/places"
              cta="Browse Places"
            />
            <TextNoteCard
              title="By route"
              body="Take a compact editorial sequence when you want less planning and clearer pacing."
              href="/features"
              cta="Read Routes"
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-black/5 bg-background py-16 md:py-20">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="editorial-kicker mb-3">Editor&apos;s picks</p>
              <div className="editorial-rule mb-6 max-w-48" />
              <Heading as="h2" size="lg" font="serif" className="max-w-3xl text-balance">
                Fewer, stronger places to anchor the day.
              </Heading>
            </div>
            <Link
              href="/places"
              className="font-sans text-[0.94rem] leading-[1.47] tracking-[0.15px] text-muted-foreground transition-colors hover:text-foreground"
            >
              All places →
            </Link>
          </div>

          <div
            className={
              editorialLead
                ? "grid grid-cols-1 gap-6 lg:grid-cols-12"
                : "grid grid-cols-1 gap-6"
            }
          >
            {editorialLead && (
              <div className="lg:col-span-8">
                <LeadEditorialCard
                  href={`/places/${editorialLead.slug}`}
                  title={editorialLead.title}
                  excerpt={editorialLead.excerpt}
                  image={editorialLead.heroImage}
                  eyebrow="Editor&apos;s lead"
                />
              </div>
            )}
            <div
              className={
                editorialLead
                  ? "grid grid-cols-1 gap-6 lg:col-span-4"
                  : "grid grid-cols-1 gap-6 md:grid-cols-2"
              }
            >
              {supportingLeadCards.map((place) => (
                <StandardEditorialCard
                  key={place.slug}
                  href={`/places/${place.slug}`}
                  title={place.title}
                  excerpt={place.excerpt}
                  image={place.heroImage}
                  eyebrow={place.category[0] ?? "Place"}
                  tone="warm"
                />
              ))}
              <TextNoteCard
                title="Selection note"
                body="Homepage cards are intentionally capped. If confidence is low, the shelf stays short."
                href="/about"
                cta="Read curation note"
                tone="ink"
              />
            </div>
          </div>

          {supportingReferenceCards.length > 0 && (
            <div className="reference-shelf mt-9 p-5 md:p-6">
              <p className="label-xs mb-3">Reference shelf · lower-priority picks</p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {supportingReferenceCards.map((place) => (
                  <CompactEditorialCard
                    key={place.slug}
                    href={`/places/${place.slug}`}
                    title={place.title}
                    excerpt={place.excerpt}
                    image={place.heroImage}
                    eyebrow={place.category[0] ?? "Place"}
                  />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="section-tint border-b border-black/5 py-16 md:py-20">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="editorial-kicker mb-3">Routes</p>
              <div className="editorial-rule mb-6 max-w-44" />
              <Heading as="h2" size="lg" font="serif" className="max-w-3xl text-balance">
                Editorial sequences for morning starts, river drifts, and slower afternoons.
              </Heading>
            </div>
            <Link
              href="/features"
              className="font-sans text-[0.94rem] leading-[1.47] tracking-[0.15px] text-muted-foreground transition-colors hover:text-foreground"
            >
              See all routes →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredRoutes.map((route, index) => {
              if (index === 0) {
                return (
                  <div key={route.slug} className="md:col-span-2">
                    <LeadEditorialCard
                      href={`/features/${route.slug}`}
                      title={route.title}
                      excerpt={route.intro}
                      image={route.coverImage}
                      eyebrow="Featured route"
                    />
                  </div>
                );
              }

              return (
                <StandardEditorialCard
                  key={route.slug}
                  href={`/features/${route.slug}`}
                  title={route.title}
                  excerpt={route.intro}
                  image={route.coverImage}
                  eyebrow={route.kind === "route" ? "Route" : "Feature"}
                  tone="warm"
                />
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-black/5 py-14 md:py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="editorial-kicker mb-3">Neighborhood strip</p>
              <div className="editorial-rule mb-6 max-w-40" />
              <Heading as="h2" size="md" font="serif">
                Choose your district before choosing your list.
              </Heading>
            </div>
            <Link
              href="/neighborhoods"
              className="font-sans text-[0.94rem] leading-[1.47] tracking-[0.15px] text-muted-foreground transition-colors hover:text-foreground"
            >
              Explore all →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {stripNeighborhoods.map((neighborhood) => (
              <CompactEditorialCard
                key={neighborhood.slug}
                href={`/neighborhoods/${neighborhood.slug}`}
                title={neighborhood.name}
                excerpt={neighborhood.intro}
                image={neighborhood.heroImage}
                eyebrow="Area"
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-ink border-b border-black/5 py-16 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <p className="editorial-kicker mb-4 text-current/70">About this guide</p>
              <Heading as="h2" size="lg" font="serif" className="max-w-2xl text-current">
                A personal Kyoto notebook edited for atmosphere, not volume.
              </Heading>
              <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-current/80">
                Entries come from repeated visits, careful notes, and selective source checks.
                The goal is orientation with taste, not exhaustive coverage.
              </p>
              <Link
                href="/about"
                className="mt-7 inline-flex font-sans text-xs tracking-[0.12em] uppercase text-current/80 underline underline-offset-4 transition-colors hover:text-current"
              >
                Read the full philosophy
              </Link>
            </div>

            <aside className="md:col-span-5 border border-current/25 p-6">
              <p className="editorial-kicker mb-4 text-current/65">Quiet Kyoto notes</p>
              <ul className="space-y-3 font-sans text-sm leading-relaxed text-current/80">
                <li>Small shops often close on irregular weekdays.</li>
                <li>Early hours reward calm café and temple stretches.</li>
                <li>Use routes as tone guides, not strict itineraries.</li>
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
