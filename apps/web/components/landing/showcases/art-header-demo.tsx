import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { cn } from '@tawny/ui/lib/utils'

const artDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-art-serif-display',
})

const artSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-art-sans-body',
})

const artMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-art-mono',
})

/**
 * Desktop-fidelity Art header twin — fixed canvas scaled into the frame.
 * Inert visual twin; no navigation.
 */
export function ArtHeaderDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        artDisplay.variable,
        artSans.variable,
        artMono.variable,
        artSans.className,
        'h-full font-(family-name:--font-art-sans-body)',
        className,
      )}
    >
      <div
        role="img"
        aria-label="Art navigation header preview"
        inert
        className="h-full select-none"
      >
        <ScaledDesignCanvas height={240}>
          <div className="art-root flex h-full flex-col overflow-hidden bg-black text-art-bento-ink antialiased">
            <header className="shrink-0 bg-art-bento-bg pt-3">
              <div className="relative flex items-center justify-between gap-4 px-6 pb-3">
                <span className="text-lg font-bold tracking-tight text-art-bento-ink">
                  Hugo Lin
                </span>
                <nav className="flex flex-wrap items-center justify-end gap-5">
                  <ul className="flex items-center gap-5 text-sm font-bold">
                    {['Notes', 'Projects', 'About'].map((label) => (
                      <li key={label}>
                        <span className="opacity-90">{label}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="font-mono text-xs font-bold tracking-wide">
                    <span>EN</span>
                    <span className="mx-1 opacity-40">|</span>
                    <span className="opacity-40">中</span>
                  </span>
                </nav>
              </div>
            </header>
            <div aria-hidden="true" className="min-h-0 flex-1 bg-black" />
          </div>
        </ScaledDesignCanvas>
      </div>
    </div>
  )
}

export function ArtHeaderDetail({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        artDisplay.variable,
        artSans.variable,
        artMono.variable,
        artSans.className,
        'flex h-full flex-col font-(family-name:--font-art-sans-body)',
        className,
      )}
      inert
    >
      <div className="art-root flex h-full flex-col bg-black text-art-bento-ink">
        <header className="shrink-0 bg-art-bento-bg pt-4">
          <div className="flex items-center justify-between gap-4 px-8 pb-4">
            <span className="text-2xl font-bold tracking-tight">Hugo Lin</span>
            <nav className="flex items-center gap-6 text-base font-bold">
              {['Notes', 'Projects', 'About'].map((label) => (
                <span key={label}>{label}</span>
              ))}
              <span className="font-mono text-sm">
                EN
                <span className="mx-1 opacity-40">|</span>
                <span className="opacity-40">中</span>
              </span>
            </nav>
          </div>
        </header>
        <div className="min-h-0 flex-1 bg-black" />
      </div>
    </div>
  )
}
