import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type HeadingFont = 'serif' | 'sans'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel
  size?: HeadingSize
  font?: HeadingFont
  dim?: boolean
}

const sizeClasses: Record<HeadingSize, string> = {
  display: 'text-[clamp(3.5rem,8vw,7rem)] leading-[0.93] tracking-[-0.02em]',
  xl:      'text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.01em]',
  lg:      'text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.01em]',
  md:      'text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.2]',
  sm:      'text-lg leading-[1.3]',
  xs:      'text-base leading-[1.4]',
}

const fontClasses: Record<HeadingFont, string> = {
  serif: 'font-serif font-light',
  sans:  'font-sans font-medium',
}

/**
 * Semantic heading component with editorial type scale.
 *
 * Usage:
 *   <Heading as="h1" size="display">Kyoto</Heading>
 *   <Heading as="h2" size="lg" font="sans">Top Picks</Heading>
 *   <Heading as="h3" size="md" dim>Section note</Heading>
 */
export function Heading({
  as: Tag = 'h2',
  size = 'md',
  font = 'serif',
  dim = false,
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        sizeClasses[size],
        fontClasses[font],
        dim ? 'text-muted-foreground' : 'text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
