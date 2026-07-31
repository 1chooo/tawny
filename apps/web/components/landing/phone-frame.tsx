import type { ReactNode } from 'react'
import { cn } from '@tawny/ui/lib/utils'

/**
 * Compact phone chrome for landing feature-band previews — pairs with
 * `DemoWindow` as the mobile "satellite" beside a desktop browser mock
 * (JustHold DesktopStage main+satellite pattern, adapted with a phone shape).
 */
export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative aspect-9/19.5 w-full rounded-[1.75rem] bg-neutral-900 p-0.75 shadow-2xl ring-1 ring-black/10',
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[calc(1.75rem-3px)] bg-background">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1.5 z-10 mx-auto block h-3.5 w-16 rounded-full bg-neutral-900"
        />
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-1.5 z-10 mx-auto block h-1 w-20 rounded-full bg-foreground/25"
        />
      </div>
    </div>
  )
}
