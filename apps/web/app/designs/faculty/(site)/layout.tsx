import type { ReactNode } from 'react'
import { SiteFrame } from '@/components/faculty/site-frame'

export default function FacultySiteLayout({ children }: { children: ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>
}
