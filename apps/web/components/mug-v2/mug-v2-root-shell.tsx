'use client'

import { useState, type ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'
import { CartProvider } from '@/components/mug-v2/cart-provider'
import { PortalContext } from '@/components/mug-v2/portal'

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-mug-v2-sans',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mug-v2-mono',
})

export const mugV2FontClassName = cn(sans.variable, mono.variable, sans.className)

export function MugV2RootShell({
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
        className={cn('mug-v2 min-h-dvh', mugV2FontClassName, className)}
      >
        <CartProvider>{children}</CartProvider>
      </div>
    </PortalContext.Provider>
  )
}
