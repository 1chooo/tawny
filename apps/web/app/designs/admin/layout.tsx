import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import {
  JaneShowcaseLayout,
  janeDesignMetadata,
} from '@/components/jane/jane-showcase-layout'

export const metadata: Metadata = janeDesignMetadata('admin')

export default function AdminShowcaseLayout({
  children,
}: {
  children: ReactNode
}) {
  return <JaneShowcaseLayout id="admin">{children}</JaneShowcaseLayout>
}
