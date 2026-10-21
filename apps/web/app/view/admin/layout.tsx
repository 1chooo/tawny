import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { JaneRootShell } from '@/components/jane/jane-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('admin')!

export const metadata: Metadata = {
  title: 'Admin — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function AdminViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JaneRootShell className="min-h-dvh">{children}</JaneRootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
