import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { MugRootShell } from '@/components/mug/mug-root-shell'
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
      <MugRootShell className="min-h-dvh">{children}</MugRootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
