import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { CobaltRootShell } from '@/components/cobalt/cobalt-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('cobalt')!

export const metadata: Metadata = {
  title: 'Cobalt — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function CobaltViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CobaltRootShell className="min-h-dvh">{children}</CobaltRootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
