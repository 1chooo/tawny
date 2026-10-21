'use client'

import type { ReactNode } from 'react'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-desk-sans',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-desk-mono',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-desk-serif',
})

export const deskFontClassName = cn(
  sans.variable,
  mono.variable,
  serif.variable,
  sans.className,
)

/**
 * Paper, ink, and tawny for the Desk dashboard. Tokens stay on this root
 * so the demo does not follow Tawny's dark theme.
 */
export function DeskRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('desk', deskFontClassName, className)}>{children}</div>
}
