'use client'

import { useState, type ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'
import { CartProvider } from '@/components/atelier/cart-provider'
import { PortalContext } from '@/components/atelier/portal'

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-atelier-sans',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-atelier-mono',
})

export const atelierFontClassName = cn(sans.variable, mono.variable, sans.className)

export function AtelierRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null)

  return (
    <PortalContext.Provider value={node}>
      <div
        ref={setNode}
        className={cn('atelier min-h-dvh', atelierFontClassName, className)}
      >
        <CartProvider>{children}</CartProvider>
      </div>
    </PortalContext.Provider>
  )
}
