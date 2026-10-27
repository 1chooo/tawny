import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { MugV2RootShell } from '@/components/mug-v2/mug-v2-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('mug-v2')!

export const metadata: Metadata = {
  title: 'Atelier — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function MugV2ViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MugV2RootShell className="min-h-dvh">{children}</MugV2RootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
