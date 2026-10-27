import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import {
  MugV2ShowcaseLayout,
  mugV2DesignMetadata,
} from '@/components/mug-v2/mug-v2-showcase-layout'

export const metadata: Metadata = mugV2DesignMetadata('mug-v2')

export default function MugV2ShowcaseRouteLayout({
  children,
}: {
  children: ReactNode
}) {
  return <MugV2ShowcaseLayout id="mug-v2">{children}</MugV2ShowcaseLayout>
}
