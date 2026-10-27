import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import {
  AtelierShowcaseLayout,
  atelierDesignMetadata,
} from '@/components/atelier/atelier-showcase-layout'

export const metadata: Metadata = atelierDesignMetadata('atelier')

export default function AtelierShowcaseRouteLayout({
  children,
}: {
  children: ReactNode
}) {
  return <AtelierShowcaseLayout id="atelier">{children}</AtelierShowcaseLayout>
}
