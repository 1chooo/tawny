import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { ValeRootShell } from '@/components/vale/vale-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('vale')!

export const metadata: Metadata = {
  title: 'Vale — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function ValeViewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white">
      <ValeRootShell className="flex min-h-dvh flex-1 flex-col">
        {children}
      </ValeRootShell>
      <ViewBackLink href={design.demoPath} />
    </div>
  )
}
