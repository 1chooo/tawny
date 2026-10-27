import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/seal/site-footer'
import { SiteHeader } from '@/components/seal/site-header'

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="seal-main">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
