import { Menu } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

/**
 * Inert visual twin of the Tawny site navbar — marketing preview only.
 * Uses container queries so the layout follows the ProductFrame width,
 * not the viewport (cards are narrow even on large screens).
 */
export function TawnyHeaderDemo({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Tawny navigation bar preview"
      inert
      className={cn(
        '@container select-none border-b border-white/8 bg-background/80 backdrop-blur-xl',
        className,
      )}
    >
      <div className="flex h-14 items-center justify-between gap-3 px-4 @min-[380px]:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <Logo className="size-7 shrink-0 rounded-md" />
          <span className="truncate font-serif text-lg italic tracking-tight text-foreground">
            Tawny
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <nav
            className="hidden items-center @min-[480px]:flex"
            aria-hidden="true"
          >
            {['Designs', 'Components', 'Pricing'].map((label) => (
              <span
                key={label}
                className="rounded-md px-2 py-1.5 text-xs text-muted-foreground @min-[560px]:px-2.5 @min-[560px]:text-sm"
              >
                {label}
              </span>
            ))}
          </nav>
          <span className="ml-1 hidden rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background @min-[480px]:inline-flex @min-[560px]:px-4 @min-[560px]:text-sm">
            Get access
          </span>
          <span
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground @min-[480px]:hidden"
            aria-hidden="true"
          >
            <Menu size={18} />
          </span>
        </div>
      </div>
    </div>
  )
}
