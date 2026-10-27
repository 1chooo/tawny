import type { ReactNode } from 'react'
import {
  CobaltShowcaseLayout,
  cobaltDesignMetadata,
} from '@/components/cobalt/cobalt-showcase-layout'

export const metadata = cobaltDesignMetadata('admin')

export default function AdminShowcaseLayout({
  children,
}: {
  children: ReactNode
}) {
  return <CobaltShowcaseLayout id="admin">{children}</CobaltShowcaseLayout>
}
