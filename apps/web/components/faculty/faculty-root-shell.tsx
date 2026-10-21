'use client'

import type { ReactNode } from 'react'
import { Source_Sans_3 } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-faculty-sans',
})

export const facultyFontClassName = cn(sourceSans.variable, sourceSans.className)

/**
 * Charcoal page and Source Sans 3 for the faculty site. Tokens stay on this
 * root so the demo does not follow Tawny's theme.
 */
export function FacultyRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('faculty', facultyFontClassName, className)}>{children}</div>
}
