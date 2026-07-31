import { JetBrains_Mono } from 'next/font/google'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { cn } from '@tawny/ui/lib/utils'

const devMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-dev-mono',
})

/**
 * Desktop-fidelity Dev header twin — fixed canvas scaled into the frame.
 * Inert visual twin; no navigation.
 */
export function DevHeaderDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        devMono.variable,
        devMono.className,
        'h-full font-mono',
        className,
      )}
    >
      <div
        role="img"
        aria-label="Dev navigation header preview"
        inert
        className="h-full select-none"
      >
        <ScaledDesignCanvas>
          <div
            className="dev-root flex h-full flex-col bg-(--dev-background,#09090b) text-(--dev-foreground,#e4e4e7) antialiased"
            data-theme="dark"
          >
            <div className="mx-auto w-full max-w-2xl px-10 pt-14">
              <nav>
                <div className="flex items-center justify-between font-extrabold">
                  <span className="inline-flex items-center text-2xl">
                    lin hugo
                    <span
                      aria-hidden="true"
                      className="ml-1 inline-block animate-pulse text-red-500"
                    >
                      _
                    </span>
                  </span>
                </div>
                <div className="mt-1.5 flex gap-4">
                  {(['about', 'blog', 'projects'] as const).map((label, i) => (
                    <span
                      key={label}
                      className={cn(
                        'text-lg',
                        i === 0
                          ? 'font-extrabold text-(--dev-foreground,#e4e4e7)'
                          : 'font-normal text-(--dev-muted,#a1a1aa)',
                      )}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </nav>
            </div>
            <div aria-hidden="true" className="min-h-0 flex-1" />
          </div>
        </ScaledDesignCanvas>
      </div>
    </div>
  )
}
