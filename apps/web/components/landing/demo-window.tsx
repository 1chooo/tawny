import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@tawny/ui/lib/utils'

/**
 * Floating window chrome for landing feature-band previews.
 * Matches JustHold DemoWindow: title bar + flex content (height from parent crop).
 */
export function DemoWindow({
  title,
  children,
  className,
  contentClassName,
  active = false,
  style,
}: {
  title: string
  children: ReactNode
  className?: string
  contentClassName?: string
  active?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-col overflow-hidden rounded-xl border bg-card shadow-2xl transition-[box-shadow,border-color,ring-color]',
        active
          ? 'border-border ring-1 ring-tawny/25'
          : 'border-border/80',
        className,
      )}
      style={style}
    >
      <div className="relative flex shrink-0 items-center bg-card px-3 py-2">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </div>
        <span className="pointer-events-none absolute inset-x-10 truncate text-center font-mono text-[11px] text-muted-foreground">
          {title}
        </span>
      </div>
      <div
        className={cn(
          'min-h-0 flex-1 overflow-hidden border-t border-border/60',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}
