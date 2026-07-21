import type { ReactNode } from 'react'
import { Inter, Lora } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-link-sans',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-link-serif',
  display: 'swap',
})

/**
 * Link design root — fonts and tokens for ProductFrame showcase and /view.
 */
export function LinkRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'link-root',
        inter.variable,
        lora.variable,
        inter.className,
        className,
      )}
    >
      {children}
    </div>
  )
}
