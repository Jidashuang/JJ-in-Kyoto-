"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, startTransition } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/features", label: "Routes" },
  { href: "/places", label: "All Places" },
  { href: "/map", label: "Area Guide" },
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
        "sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-200",
        scrolled
          ? "shadow-[rgba(0,0,0,0.06)_0px_0px_0px_1px,rgba(0,0,0,0.04)_0px_1px_2px]"
          : "border-b border-black/5",
      )}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between">
          <Link
            href="/"
            className="font-serif text-[1.45rem] font-[300] leading-none text-foreground transition-opacity hover:opacity-60 focus-visible:opacity-60"
            aria-label="Kyoto by JJ — home"
          >
            Kyoto by JJ
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-8"
          >
            {navLinks.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative font-sans text-[0.94rem] leading-[1.47] tracking-[0.15px] font-medium transition-colors",
                    active
                      ? "text-foreground after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:bg-[#777169]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link href="/places" className="el-pill-white h-10">
              All Places
            </Link>
            <Link href="/neighborhoods" className="el-pill-black h-10">
              Start by Neighborhood
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden -mr-1 flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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

      {mobileOpen && (
        <div className="lg:hidden border-t border-black/5 bg-white">
          <Container>
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1 py-4">
              {navLinks.map(({ href, label }) => {
                const active =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "rounded-xl border border-transparent px-3 py-2.5 font-sans text-[0.94rem] leading-[1.47] tracking-[0.15px] transition-colors",
                      active
                        ? "border-black/5 bg-[#f5f2ef] text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="mt-3 flex flex-wrap gap-2 border-t border-black/5 pt-3">
                <Link href="/places" className="el-pill-white h-10">
                  All Places
                </Link>
                <Link href="/neighborhoods" className="el-pill-black h-10">
                  Start by Neighborhood
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
