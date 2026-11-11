import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/vale/site-footer'
import { SiteHeader } from '@/components/vale/site-header'

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="vale-site">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}
