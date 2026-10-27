'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-cobalt-sans',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-cobalt-mono',
})

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-cobalt-display',
})

export const cobaltFontClassName = cn(
  sans.variable,
  mono.variable,
  display.variable,
  sans.className,
)

export const CobaltPortalContext = createContext<HTMLElement | null>(null)

export function useCobaltPortal() {
  return useContext(CobaltPortalContext)
}

/**
 * Shared ceramics root — bone, ink, and cobalt for the landing, login, and admin demos.
 */
export function CobaltRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null)

  return (
    <CobaltPortalContext.Provider value={node}>
      <div
        ref={setNode}
        className={cn('cobalt', cobaltFontClassName, className)}
      >
        {children}
      </div>
    </CobaltPortalContext.Provider>
  )
}
