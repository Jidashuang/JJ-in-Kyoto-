import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 'default' — standard page container (max-w-screen-xl)
   * 'narrow'  — article / prose container  (max-w-2xl)
   * 'wide'    — full-bleed with minimal gutters (max-w-screen-2xl)
   */
  size?: 'default' | 'narrow' | 'wide'
}

const sizeClasses = {
  default: 'max-w-screen-xl',
  narrow:  'max-w-2xl',
  wide:    'max-w-screen-2xl',
}

/**
 * Page-level container.
 *
 * Provides consistent horizontal gutters and max-width across all pages.
 * Wrap every top-level section with this component.
 *
 * Usage:
 *   <Container>…</Container>
 *   <Container size="narrow">…</Container>
 */
export function Container({
  size = 'default',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-12',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
