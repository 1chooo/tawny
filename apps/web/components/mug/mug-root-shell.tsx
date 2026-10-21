'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-mug-sans',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mug-mono',
})

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mug-display',
})

export const mugFontClassName = cn(
  sans.variable,
  mono.variable,
  display.variable,
  sans.className,
)

export const MugPortalContext = createContext<HTMLElement | null>(null)

export function useMugPortal() {
  return useContext(MugPortalContext)
}

/**
 * Shared ceramics root — bone, ink, and cobalt for the landing, login, and admin demos.
 */
export function MugRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null)

  return (
    <MugPortalContext.Provider value={node}>
      <div
        ref={setNode}
        className={cn('mug', mugFontClassName, className)}
      >
        {children}
      </div>
    </MugPortalContext.Provider>
  )
}
