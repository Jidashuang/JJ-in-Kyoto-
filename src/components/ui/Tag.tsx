import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type TagVariant = 'default' | 'category' | 'label' | 'outline'
type TagSize   = 'sm' | 'md'

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant
  size?: TagSize
}

const variantClasses: Record<TagVariant, string> = {
  default:  'border border-black/5 bg-[#f5f5f5] text-[#4e4e4e]',
  category: 'border border-transparent bg-[#f5f2ef]/80 text-foreground shadow-[rgba(78,50,23,0.04)_0px_6px_16px]',
  label:    'border border-transparent bg-black text-white',
  outline:  'border border-[#e5e5e5] text-[#4e4e4e] bg-transparent',
}

const sizeClasses: Record<TagSize, string> = {
  sm: 'text-[0.75rem] px-2.5 py-1 tracking-[0.14px] leading-[1.33]',
  md: 'text-[0.81rem] px-3 py-1.5 tracking-[0.14px] leading-[1.38]',
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
        'inline-flex items-center rounded-full font-sans',
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
