import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { ArtRootShell } from '@/components/art/art-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('art')!

export const metadata: Metadata = {
  title: 'Art — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function ArtViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ArtRootShell className="flex min-h-dvh flex-1 flex-col">
        {children}
      </ArtRootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
