import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="vale-site">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}
