import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { OceanRootShell } from '@/components/ocean/ocean-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('ocean')!

export const metadata: Metadata = {
  title: 'Ocean — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function OceanViewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <OceanRootShell className="flex min-h-dvh flex-1 flex-col">
        {children}
      </OceanRootShell>
      <ViewBackLink href={design.demoPath} />
    </>
  )
}
