import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";

export default function NotFound() {
  return (
    <div className="py-24 md:py-32">
      <Container size="narrow">
        <div className="max-w-xl">
          <p className="label-xs mb-5 text-muted-foreground/60">404</p>
          <Heading as="h1" size="xl" font="serif" className="mb-5">
            Page not found
          </Heading>
          <p className="font-sans text-base leading-relaxed text-muted-foreground max-w-lg">
            The page you&apos;re looking for does not exist here. You can go
            back to the guide, the place index, or the neighborhood index.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex h-10 items-center border border-foreground bg-foreground px-6 font-sans text-xs tracking-[0.12em] uppercase text-primary-foreground transition-opacity hover:opacity-75"
            >
              Home
            </Link>
            <Link
              href="/places"
              className="inline-flex h-10 items-center border border-border px-6 font-sans text-xs tracking-[0.12em] uppercase text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              Places
            </Link>
            <Link
              href="/map"
              className="inline-flex h-10 items-center border border-border px-6 font-sans text-xs tracking-[0.12em] uppercase text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              Index
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
