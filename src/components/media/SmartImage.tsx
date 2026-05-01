"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  src: string;
  alt: string;
  /** Eyebrow label shown above the title in the editorial fallback (typically the place's category). */
  fallbackLabel?: string;
  /** Title text for the editorial fallback. Defaults to `alt` when not provided. */
  fallbackTitle?: string;
  className?: string;
  imgClassName?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

/**
 * Image with a graceful editorial fallback.
 *
 * When `src` is empty or fails to load, the slot becomes a typeset card —
 * cream paper background, kicker eyebrow, short rule, and a serif title —
 * so a missing image reads as intentional rather than broken.
 *
 * The fallback uses the existing `img-placeholder`, `editorial-kicker`,
 * `editorial-rule` and serif type system so it matches the rest of the guide.
 */
export function SmartImage({
  src,
  alt,
  fallbackLabel,
  fallbackTitle,
  className,
  imgClassName,
  fill = true,
  sizes,
  priority = false,
}: SmartImageProps) {
  const resolvedSrc = src?.trim() ?? "";
  const hasImageSource = resolvedSrc.length > 0;
  const [failed, setFailed] = useState(false);
  const shouldRenderImage = hasImageSource && !failed;

  const eyebrow = fallbackLabel?.trim();
  const title = (fallbackTitle?.trim() || alt?.trim() || "").trim();

  return (
    <div className={cn("img-placeholder relative overflow-hidden", className)}>
      {shouldRenderImage && (
        <Image
          src={resolvedSrc}
          alt={alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className={imgClassName}
          onError={() => setFailed(true)}
        />
      )}

      {!shouldRenderImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 py-8 text-center">
          {eyebrow && (
            <p className="editorial-kicker text-[0.7rem] tracking-[0.18em]">
              {eyebrow}
            </p>
          )}
          <span
            aria-hidden="true"
            className="block h-px w-10 bg-[#777169]/55"
          />
          {title && (
            <p
              className="line-clamp-3 max-w-[14rem] font-serif text-[1.35rem] leading-[1.18] text-foreground/85 md:text-[1.55rem]"
              style={{ letterSpacing: "-0.005em" }}
            >
              {title}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
