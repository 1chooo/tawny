import type { ReactNode } from 'react'
import { cn } from '@tawny/ui/lib/utils'
import { CartProvider } from '@/components/vale/cart-provider'
import { SiteShell } from '@/components/vale/site-shell'
import { valeFontClassName } from '@/lib/vale/fonts'

/**
 * Vale design root — fonts and tokens for the ProductFrame, /view, and
 * catalog mocks. Styles stay on this element, not on <html>.
 */
export function ValeRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div lang="en" className={cn('vale', valeFontClassName, className)}>
      <CartProvider>
        <SiteShell>{children}</SiteShell>
      </CartProvider>
    </div>
  )
}
