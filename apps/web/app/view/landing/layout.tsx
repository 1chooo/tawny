import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { JaneRootShell } from '@/components/jane/jane-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('landing')!

export const metadata: Metadata = {
  title: 'Landing — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function LandingViewLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <JaneRootShell className="min-h-dvh">{children}</JaneRootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
