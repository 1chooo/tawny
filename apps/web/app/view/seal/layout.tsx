import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { SealRootShell } from '@/components/seal/seal-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('seal')!

export const metadata: Metadata = {
  title: 'Seal — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function SealViewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#f3efe6]">
      <SealRootShell className="flex min-h-dvh flex-1 flex-col">
        {children}
      </SealRootShell>
      <ViewBackLink href={design.demoPath} />
    </div>
  )
}
