import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { VcardRootShell } from '@/components/vcard/vcard-root-shell'
import { ViewBackLink } from '@/components/view-back-link'
import { getDesign } from '@/lib/data'

const design = getDesign('vcard')!

export const metadata: Metadata = {
  title: 'VCard — Full Preview',
  description: design.description,
  robots: { index: false, follow: false },
}

export default function VcardViewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#121212]">
      <VcardRootShell className="flex min-h-dvh flex-1 flex-col">
        {children}
      </VcardRootShell>
      <ViewBackLink href={design.demoPath} />
    </div>
  )
}
