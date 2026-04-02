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
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {failed ? (
        <div className="absolute inset-0 img-placeholder">
          {fallbackLabel && (
            <span className="label-xs text-muted-foreground/50 text-center px-4">
              {fallbackLabel}
            </span>
          )}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className={imgClassName}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
