import Link from "next/link";
import { Container } from "./Container";

const footerLinks = [
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/features", label: "Routes" },
  { href: "/places", label: "All Places" },
  { href: "/map", label: "Area Guide" },
  { href: "/about", label: "About" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-black/5 bg-[#f5f5f5]">
      <Container>
        <div className="flex flex-col gap-10 py-14 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3 max-w-xs">
            <Link
              href="/"
              className="font-serif text-[1.5rem] font-[300] text-foreground hover:opacity-60 transition-opacity"
            >
              Kyoto by JJ
            </Link>
            <div className="editorial-rule max-w-28" />
            <p className="font-sans text-[0.94rem] leading-[1.47] tracking-[0.15px] text-muted-foreground">
              A calm, selective guide to Kyoto — coffee, books, old shops, and
              quiet rooms.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-col gap-3 sm:items-end"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[0.94rem] leading-[1.47] tracking-[0.15px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-black/5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[0.81rem] leading-[1.38] text-muted-foreground/70">
            &copy; {year} Kyoto by JJ. All rights reserved.
          </p>
          <p className="font-sans text-[0.81rem] leading-[1.38] text-muted-foreground/50">
            Edited from personal visits and careful source notes. Details can
            change; please verify before you go.
          </p>
        </div>
      </Container>
    </footer>
  );
}
