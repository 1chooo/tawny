import type { ReactNode } from 'react'
import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-art-serif-display',
})

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-art-sans-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-art-mono',
})

/**
 * Art design root — fonts + tokens. Used by ProductFrame showcase and /view.
 */
export function ArtRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'art-root',
        display.variable,
        sans.variable,
        mono.variable,
        sans.className,
        'bg-black text-art-bento-ink font-(family-name:--font-art-sans-body) antialiased',
        className,
      )}
    >
      {children}
    </div>
  )
}
