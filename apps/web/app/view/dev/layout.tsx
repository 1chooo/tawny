import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { DevRootShell } from '@/components/dev/dev-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('dev')!

export const metadata: Metadata = {
  title: 'Dev — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function DevViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DevRootShell className="flex min-h-dvh flex-1 flex-col">
        {children}
      </DevRootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
