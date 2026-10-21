import type { ReactNode } from 'react'
import { SiteFrame } from '@/components/usc/site-frame'

export default function USCSiteLayout({ children }: { children: ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>
}
