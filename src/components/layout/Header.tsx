"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, startTransition } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/places", label: "Places" },
  { href: "/features", label: "Features" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
    });
  }, [pathname]);

  // Add shadow/blur on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/95 backdrop-blur-sm transition-shadow duration-200",
        scrolled
          ? "shadow-[0_1px_0_0_var(--color-border)]"
          : "border-b border-border",
      )}
    >
      <Container>
        <div className="flex h-[60px] items-center justify-between">
          {/* ── Site name ─────────────────────────────────────────────── */}
          <Link
            href="/"
            className="font-serif text-[1.35rem] leading-none tracking-wide text-foreground transition-opacity hover:opacity-60 focus-visible:opacity-60"
            aria-label="Kyoto by JJ — home"
          >
            Kyoto by JJ
          </Link>

          {/* ── Desktop navigation ────────────────────────────────────── */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-7"
          >
            {navLinks.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "font-sans text-[0.7rem] tracking-[0.18em] uppercase transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* ── Mobile menu toggle ────────────────────────────────────── */}
          <button
            type="button"
            className="md:hidden -mr-1 flex h-9 w-9 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <X size={18} strokeWidth={1.5} />
            ) : (
              <Menu size={18} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </Container>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <Container>
            <nav aria-label="Mobile navigation" className="flex flex-col py-4">
              {navLinks.map(({ href, label }) => {
                const active =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "py-3 font-sans text-[0.7rem] tracking-[0.18em] uppercase transition-colors border-b border-border/50 last:border-0",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
