import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import {
  CobaltShowcaseLayout,
  cobaltDesignMetadata,
} from '@/components/cobalt/cobalt-showcase-layout'

export const metadata: Metadata = cobaltDesignMetadata('cobalt')

export default function CobaltShowcaseRouteLayout({
  children,
}: {
  children: ReactNode
}) {
  return <CobaltShowcaseLayout id="cobalt">{children}</CobaltShowcaseLayout>
}
