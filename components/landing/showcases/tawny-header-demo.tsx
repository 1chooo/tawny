import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

/**
 * Inert visual twin of the Tawny site navbar — marketing preview only.
 * Compact desktop chrome so the full bar (incl. CTA) fits card widths.
 */
export function TawnyHeaderDemo({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Tawny navigation bar preview"
      inert
      className={cn(
        'select-none border-b border-white/8 bg-background/80 backdrop-blur-xl',
        className,
      )}
    >
      <div className="flex h-11 items-center justify-between gap-2 px-3">
        <div className="flex min-w-0 shrink-0 items-center gap-1.5">
          <Logo className="size-5 rounded-sm" />
          <span className="font-serif text-sm italic tracking-tight text-foreground">
            Tawny
          </span>
        </div>
        <nav
          className="flex min-w-0 items-center gap-0.5"
          aria-hidden="true"
        >
          {['Designs', 'Components', 'Pricing'].map((label) => (
            <span
              key={label}
              className="rounded px-1.5 py-1 text-[10px] text-muted-foreground"
            >
              {label}
            </span>
          ))}
        </nav>
        <span className="shrink-0 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-medium text-background">
          Get access
        </span>
      </div>
    </div>
  )
}
