import type { ReactNode } from 'react'
import { cn } from '@tawny/ui/lib/utils'

/**
 * SaaS-style product chrome for live design demos — muted outer frame with
 * optional window dots and a soft bottom fade on small screens.
 * Chrome always follows Tawny's global theme; design content owns its own tokens.
 */
export function ProductFrame({
  title,
  children,
  className,
  contentClassName,
  fade = false,
}: {
  title?: string
  children: ReactNode
  className?: string
  contentClassName?: string
  fade?: boolean
}) {
  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden rounded-xl border border-border bg-muted/40 p-1.5 shadow-sm">
        {title ? (
          <div className="mb-1.5 flex items-center gap-2 px-2.5 pt-1">
            <div className="flex items-center gap-1" aria-hidden="true">
              <span className="size-2 rounded-full bg-muted-foreground/40" />
              <span className="size-2 rounded-full bg-muted-foreground/40" />
              <span className="size-2 rounded-full bg-muted-foreground/40" />
            </div>
            <span className="truncate font-mono text-[11px] text-muted-foreground">
              {title}
            </span>
          </div>
        ) : null}
        <div
          className={cn(
            'rounded-lg border border-border bg-background',
            contentClassName,
          )}
        >
          {children}
        </div>
      </div>
      {fade ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background to-transparent md:hidden"
        />
      ) : null}
    </div>
  )
}
