import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { CartProvider } from '@/components/cart-provider'
import { SiteShell } from '@/components/site-shell'
import { site } from '@/lib/content'
import { valeFontClassName } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ceramics and paintings`,
    template: `%s | ${site.name}`,
  },
  description: site.hero.body,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={valeFontClassName}>
      <body className="vale">
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider>
      </body>
    </html>
  )
}
