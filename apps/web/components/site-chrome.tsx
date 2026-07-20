'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

/**
 * Site chrome for marketing pages. Skipped on `/view/*` so design demos
 * can render edge-to-edge in a new tab.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isView = pathname.startsWith('/view')

  if (isView) {
    return (
      <div className="flex min-h-dvh flex-1 flex-col">{children}</div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
