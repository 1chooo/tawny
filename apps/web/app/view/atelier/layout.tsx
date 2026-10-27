import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { AtelierRootShell } from '@/components/atelier/atelier-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('atelier')!

export const metadata: Metadata = {
  title: 'Atelier — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function AtelierViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AtelierRootShell className="min-h-dvh">{children}</AtelierRootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
