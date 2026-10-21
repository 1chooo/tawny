'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-jane-sans',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-jane-mono',
})

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-jane-display',
})

export const janeFontClassName = cn(
  sans.variable,
  mono.variable,
  display.variable,
  sans.className,
)

export const JanePortalContext = createContext<HTMLElement | null>(null)

export function useJanePortal() {
  return useContext(JanePortalContext)
}

/**
 * Shared ceramics root — bone, ink, and cobalt for the landing, login, and admin demos.
 */
export function JaneRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null)

  return (
    <JanePortalContext.Provider value={node}>
      <div
        ref={setNode}
        className={cn('jane', janeFontClassName, className)}
      >
        {children}
      </div>
    </JanePortalContext.Provider>
  )
}
