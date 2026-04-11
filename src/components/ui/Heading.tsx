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
  display: 'text-[clamp(2.2rem,5vw,3rem)] leading-[1.08] tracking-[-0.96px]',
  xl:      'text-[clamp(2rem,4.2vw,2.25rem)] leading-[1.17]',
  lg:      'text-[clamp(1.7rem,3vw,2rem)] leading-[1.13]',
  md:      'text-[clamp(1.3rem,2.2vw,1.5rem)] leading-[1.17]',
  sm:      'text-[1.125rem] leading-[1.35]',
  xs:      'text-[1rem] leading-[1.5]',
}

const fontClasses: Record<HeadingFont, string> = {
  serif: 'font-serif font-[300]',
  sans:  'font-sans font-medium',
}
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
