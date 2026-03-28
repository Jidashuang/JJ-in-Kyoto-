import Link from "next/link";
import { Container } from "./Container";

const footerLinks = [
  { href: "/places", label: "Places" },
  { href: "/features", label: "Features" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <Container>
        {/* ── Main row ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-10 py-14 sm:flex-row sm:items-start sm:justify-between">
          {/* Wordmark + tagline */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link
              href="/"
              className="font-serif text-xl tracking-wide text-foreground hover:opacity-60 transition-opacity"
            >
              Kyoto by JJ
            </Link>
            <p className="font-sans text-xs leading-relaxed text-muted-foreground">
              A calm, selective guide to Kyoto — coffee, books, old shops, and
              quiet rooms.
            </p>
          </div>

          {/* Nav links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-col gap-3 sm:items-end"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-2 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-muted-foreground/70">
            &copy; {year} Kyoto by JJ. All rights reserved.
          </p>
          <p className="font-sans text-xs text-muted-foreground/50">
            Edited from personal visits and careful source notes. Details can
            change; please verify before you go.
          </p>
        </div>
      </Container>
    </footer>
  );
}
