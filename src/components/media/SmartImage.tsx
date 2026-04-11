"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  src: string;
  alt: string;
  fallbackLabel?: string;
  className?: string;
  imgClassName?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

export function SmartImage({
  src,
  alt,
  fallbackLabel,
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
  const fallbackText = fallbackLabel?.trim() || "Image unavailable";

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
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <span className="label-xs rounded-sm border border-border/70 bg-background/60 px-3 py-1.5 text-muted-foreground/70 backdrop-blur-[1px]">
            {fallbackText}
          </span>
        </div>
      )}
    </div>
  );
}
