'use client'

import type { ReactNode } from 'react'
import { Source_Sans_3 } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-usc-sans',
})

export const uscFontClassName = cn(sourceSans.variable, sourceSans.className)

/**
 * Charcoal page and Source Sans 3 for the USC researcher site. Tokens stay on this
 * root so the demo does not follow Tawny's theme.
 */
export function USCRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('usc', uscFontClassName, className)}>{children}</div>
}
