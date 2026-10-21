import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { FacultyRootShell } from '@/components/faculty/faculty-root-shell'
import { SiteFrame } from '@/components/faculty/site-frame'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('faculty')!

export const metadata: Metadata = {
  title: 'Faculty — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function FacultyViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <FacultyRootShell className="min-h-dvh">
        <SiteFrame>{children}</SiteFrame>
      </FacultyRootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
