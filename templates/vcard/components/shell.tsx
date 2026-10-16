import type { ReactNode } from 'react'
import { VcardNav } from '@/components/nav'
import {
  VcardMobileContacts,
  VcardSidebar,
} from '@/components/sidebar'

export function VcardShell({
  title,
  children,
}: {
  title: ReactNode
  children: ReactNode
}) {
  return (
    <main className="vcard-main">
      <VcardSidebar />
      <div className="vcard-content">
        <article className="vcard-article">
          <VcardNav />
          <h2 className="vcard-page-title">{title}</h2>
          {children}
        </article>
        <VcardMobileContacts />
      </div>
    </main>
  )
}
