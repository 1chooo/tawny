import type { ReactNode } from 'react'
import { Inter, Oswald } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-ocean-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ocean-sans',
  display: 'swap',
})

/**
 * Ocean design root — fonts for ProductFrame showcase and /view.
 */
export function OceanRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn(oswald.variable, inter.variable, className)}>
      {children}
    </div>
  )
}
