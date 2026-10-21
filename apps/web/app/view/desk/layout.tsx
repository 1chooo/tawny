import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { DeskViewFrame } from '@/components/desk/desk-view-frame'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('desk')!

export const metadata: Metadata = {
  title: 'Desk — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function DeskViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DeskViewFrame>{children}</DeskViewFrame>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
