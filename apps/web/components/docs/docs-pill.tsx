import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@tawny/ui/lib/utils'

const pillClass =
  'inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-[18px] text-sm font-medium leading-5 transition-[color,background-color,opacity]'

/**
 * Pill actions used on the components overview, matching the docs.x.ai
 * primary / quiet button pair.
 */
export function DocsPillLink({
  href,
  variant = 'primary',
  children,
  className,
}: {
  href: string
  variant?: 'primary' | 'secondary'
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        pillClass,
        variant === 'primary'
          ? 'bg-primary text-primary-foreground hover:opacity-90'
          : 'bg-accent text-foreground hover:bg-accent/70',
        className,
      )}
    >
      {children}
    </Link>
  )
}
