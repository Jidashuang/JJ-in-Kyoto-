import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Kyoto by JJ — a concise editorial guide built from repeated visits, careful curation, and quiet places worth returning to.",
};

function Divider() {
  return <hr className="my-12 md:my-14 border-t border-border" />;
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="py-20 md:py-24">
      <Container size="narrow">
        <header className="mb-14 md:mb-16">
          <p className="label-xs mb-5 text-muted-foreground/65">About</p>
          <Heading as="h1" size="xl" font="serif" className="max-w-lg">
            A calm, personal guide to Kyoto.
          </Heading>
        </header>

        <section>
          <Heading as="h2" size="sm" font="serif" className="mb-5">
            Project story
          </Heading>
          <Prose>
            <p>
              This began as private notes: places I kept returning to, routes
              that made sense, details worth remembering.
            </p>
            <p>
              Over time, the notes became a small editorial index. The aim is
              not to be complete, but to be useful and clear.
            </p>
          </Prose>
        </section>

        <Divider />

        <section>
          <Heading as="h2" size="sm" font="serif" className="mb-5">
            Curation philosophy
          </Heading>
          <Prose>
            <p>
              Listings are chosen by experience, not volume. A place is included
              when it feels distinct, consistent, and worth recommending more
              than once.
            </p>
            <p>
              Preference is given to atmosphere, craft, and repeat value. This
              is selective by design.
            </p>
          </Prose>
        </section>

        <Divider />

        <section>
          <Heading as="h2" size="sm" font="serif" className="mb-5">
            Content source note
          </Heading>
          <Prose>
            <p>
              Sources include firsthand visits, direct checks, and selected
              editorial references (including print guides). External sources
              are used as leads, then filtered through personal judgment.
            </p>
            <p>
              Practical details can change quickly. Please verify hours,
              addresses, and availability before visiting.
            </p>
          </Prose>
        </section>

        <Divider />

        <section>
          <Heading as="h2" size="sm" font="serif" className="mb-5">
            Image / copyright note
          </Heading>
          <Prose>
            <p>
              Images are original unless otherwise stated. Rights remain with
              their respective owners.
            </p>
            <p>
              If you are a rights holder and would like material credited,
              updated, or removed, please get in touch.
            </p>
          </Prose>
        </section>

        <Divider />

        <section>
          <Heading as="h2" size="sm" font="serif" className="mb-5">
            Contact
          </Heading>
          <Prose>
            <p>
              Contact details will be added soon. In the meantime, this section
              is reserved for corrections, updates, and thoughtful suggestions.
            </p>
          </Prose>
        </section>
      </Container>
    </div>
  );
}
