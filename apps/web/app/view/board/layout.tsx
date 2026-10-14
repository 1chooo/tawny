import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('board')!

export const metadata: Metadata = {
  title: 'Board — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function BoardViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-dvh">{children}</div>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
