import { Logo } from '@/components/logo'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { cn } from '@tawny/ui/lib/utils'

/**
 * Desktop-fidelity Tawny navbar twin — fixed canvas scaled into the frame.
 * Inert visual twin; no mobile menu.
 */
export function TawnyHeaderDemo({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Tawny navigation bar preview"
      inert
      className={cn('h-full select-none', className)}
    >
      <ScaledDesignCanvas>
        <div className="flex h-full flex-col bg-background">
          <header className="shrink-0 border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
              <div className="flex items-center gap-2.5">
                <Logo className="size-8 rounded-md" />
                <span className="font-serif text-xl italic tracking-tight text-foreground">
                  Tawny
                </span>
              </div>
              <nav
                className="flex items-center gap-1"
                aria-hidden="true"
              >
                {['Designs', 'Components', 'Docs', 'Pricing'].map((label, i) => (
                  <span
                    key={label}
                    className={cn(
                      'rounded-md px-3 py-1.5 text-sm',
                      i === 0
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground',
                    )}
                  >
                    {label}
                  </span>
                ))}
              </nav>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background">
                Get access
              </span>
            </div>
          </header>
          <div
            aria-hidden="true"
            className="min-h-0 flex-1 bg-linear-to-b from-muted/30 to-background"
          />
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}
