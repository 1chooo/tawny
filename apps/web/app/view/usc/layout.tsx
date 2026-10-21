import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { USCRootShell } from '@/components/usc/usc-root-shell'
import { SiteFrame } from '@/components/usc/site-frame'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('usc')!

export const metadata: Metadata = {
  title: 'USC — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function USCViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <USCRootShell className="flex min-h-dvh flex-col">
        <SiteFrame>{children}</SiteFrame>
      </USCRootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
