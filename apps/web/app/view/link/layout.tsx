import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { LinkRootShell } from '@/components/link/link-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('link')!

export const metadata: Metadata = {
  title: 'Link — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function LinkViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LinkRootShell className="flex min-h-dvh flex-1 flex-col">
        {children}
      </LinkRootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
