import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Small uppercase label rendered above the heading.
   * e.g. "Editorial", "Top Picks", "Neighborhoods"
   */
  label?: string
  /**
   * Optional heading node — pass a <Heading> component or plain text.
   * Rendered between the label and children.
   */
  heading?: React.ReactNode
  /**
   * Trailing slot — rendered after children, right-aligned.
   * Useful for "See all →" links.
   */
  action?: React.ReactNode
  /**
   * Controls vertical padding.
   * 'default' — standard section spacing (py-20 md:py-28)
   * 'sm'      — tighter spacing (py-12 md:py-16)
   * 'lg'      — generous spacing (py-28 md:py-36)
   * 'none'    — no padding
   */
  spacing?: 'none' | 'sm' | 'default' | 'lg'
  as?: 'section' | 'div' | 'article' | 'aside'
}

const spacingClasses: Record<NonNullable<SectionProps['spacing']>, string> = {
  none:    '',
  sm:      'py-12 md:py-16',
  default: 'py-20 md:py-28',
  lg:      'py-28 md:py-36',
}

/**
 * Section wrapper that provides consistent vertical rhythm.
 *
 * Usage:
 *   <Section label="Editorial" heading={<Heading size="lg">Features</Heading>} action={<Link href="/features">See all →</Link>}>
 *     …content…
 *   </Section>
 *
 * The label/heading/action row is only rendered when at least one of those
 * props is provided, so the component is safe to use as a plain spacer too.
 */
export function Section({
  label,
  heading,
  action,
  spacing = 'default',
  as: Tag = 'section',
  className,
  children,
  ...props
}: SectionProps) {
  const hasHeader = label || heading || action

  return (
    <Tag
      className={cn(spacingClasses[spacing], className)}
      {...props}
    >
      {hasHeader && (
        <div className="mb-10 md:mb-14">
          {/* Label row -------------------------------------------------------- */}
          {(label || action) && (
            <div className="flex items-center justify-between mb-3">
              {label ? (
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground select-none">
                  {label}
                </p>
              ) : (
                <span />
              )}
              {action && (
                <span className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {action}
                </span>
              )}
            </div>
          )}

          {/* Divider ---------------------------------------------------------- */}
          <div className="h-px bg-border" />

          {/* Heading ---------------------------------------------------------- */}
          {heading && (
            <div className="mt-6">
              {heading}
            </div>
          )}
        </div>
      )}

      {children}
    </Tag>
  )
}
