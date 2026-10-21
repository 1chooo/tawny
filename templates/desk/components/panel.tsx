import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Panel({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={cn(
        'rounded-lg border border-border bg-card p-4 text-card-foreground @md:p-5',
        className,
      )}
    >
      {children}
    </section>
  )
}
