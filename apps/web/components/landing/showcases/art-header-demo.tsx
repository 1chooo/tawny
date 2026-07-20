import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google'
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
 * Inert visual twin of the Art site header — marketing preview only.
 */
export function ArtHeaderDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        artDisplay.variable,
        artSans.variable,
        artMono.variable,
        artSans.className,
        'font-(family-name:--font-art-sans-body)',
        className,
      )}
    >
      <div
        role="img"
        aria-label="Art navigation header preview"
        inert
        className="art-root select-none bg-art-bento-bg text-art-bento-ink antialiased"
      >
        <header className="pt-3">
          <div className="relative flex items-center justify-between gap-4 px-4 pb-3 md:px-5">
            <span className="text-base font-bold tracking-tight md:text-lg">
              Hugo Lin
            </span>
            <nav className="flex flex-wrap items-center justify-end gap-3 md:gap-5">
              <ul className="flex items-center gap-3 text-sm font-bold md:gap-5">
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
      </div>
    </div>
  )
}
