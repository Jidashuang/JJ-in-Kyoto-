import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type TagVariant = 'default' | 'category' | 'label' | 'outline'
type TagSize   = 'sm' | 'md'

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant
  size?: TagSize
}

const variantClasses: Record<TagVariant, string> = {
  /** Subtle filled pill — used for place tags (Top Pick, Morning, Quiet…) */
  default:  'bg-muted text-muted-foreground',
  /** Slightly stronger — used for category chips (Cafe, Bookstore…) */
  category: 'bg-foreground/[0.06] text-foreground',
  /** Accent colour — used for editorial labels or "Featured" marks */
  label:    'bg-[--color-accent] text-[--color-accent-foreground]',
  /** Bare border only — used in lists or on coloured backgrounds */
  outline:  'border border-border text-muted-foreground bg-transparent',
}

const sizeClasses: Record<TagSize, string> = {
  sm: 'text-[0.65rem] px-2 py-0.5 tracking-[0.08em]',
  md: 'text-xs      px-2.5 py-1  tracking-[0.06em]',
}

/**
 * Small editorial tag / badge.
 *
 * Usage:
 *   <Tag>Quiet</Tag>
 *   <Tag variant="category" size="md">Cafe</Tag>
 *   <Tag variant="outline">Solo Friendly</Tag>
 *   <Tag variant="label">Top Pick</Tag>
 */
export function Tag({
  variant = 'default',
  size = 'sm',
  className,
  children,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm font-sans uppercase',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

/**
 * Convenience wrapper that renders a row of Tag components.
 *
 * Usage:
 *   <TagList tags={place.tags} />
 *   <TagList tags={place.category} variant="category" />
 */
export function TagList({
  tags,
  variant,
  size,
  className,
}: {
  tags: string[]
  variant?: TagVariant
  size?: TagSize
  className?: string
}) {
  if (!tags.length) return null
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {tags.map((tag) => (
        <Tag key={tag} variant={variant} size={size}>
          {tag}
        </Tag>
      ))}
    </div>
  )
}
