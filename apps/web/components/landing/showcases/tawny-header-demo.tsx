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
        <ScaledDesignCanvas height={240}>
        <div className="flex h-full flex-col bg-background">
          <header className="shrink-0 border-b border-border bg-background/80 backdrop-blur-xl">
            {/*
              Static twin of the live math:
              side ≈ max(logo, theme+cta) + gap → ~268px at this canvas.
              nav band = total − 2 × side, flex-centered.
            */}
            <div className="relative mx-auto flex h-14 max-w-340 items-center px-6">
              <div className="relative z-10 flex items-center gap-2.5">
                <Logo className="size-8 rounded-md" />
                <span className="font-serif text-xl italic tracking-tight text-foreground">
                  Tawny
                </span>
              </div>
              <nav
                className="absolute inset-y-0 flex items-center justify-center"
                style={{ left: 268, right: 268 }}
                aria-hidden="true"
              >
                <div className="flex items-center gap-1">
                  {['Designs', 'Components', 'Writeups'].map((label, i) => (
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
                </div>
              </nav>
              <div className="relative z-10 ml-auto flex items-center gap-2">
                <span className="inline-flex h-8 items-center rounded-full border border-border bg-muted/40 px-3 text-sm font-medium text-muted-foreground">
                  Dark
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background">
                  Browse designs
                </span>
              </div>
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

/** Detail page: the bar at real size, with a page body under it. */
export function TawnyHeaderDetail({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex h-full select-none flex-col bg-background', className)}
      inert
    >
      <header className="shrink-0 border-b border-border bg-background/80">
        <div className="flex h-16 items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-2.5">
            <Logo className="size-8 rounded-md" />
            <span className="font-serif text-2xl italic tracking-tight text-foreground">
              Tawny
            </span>
          </div>
          <nav className="flex items-center gap-1" aria-hidden="true">
            {['Designs', 'Components', 'Writeups'].map((label, i) => (
              <span
                key={label}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm',
                  i === 0 ? 'bg-muted text-foreground' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 items-center rounded-full border border-border bg-muted/40 px-3 text-sm font-medium text-muted-foreground">
              Dark
            </span>
            <span className="inline-flex items-center rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background">
              Browse designs
            </span>
          </div>
        </div>
      </header>
      <div className="min-h-0 flex-1 bg-linear-to-b from-muted/30 to-background" />
    </div>
  )
}
