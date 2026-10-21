import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import {
  MugShowcaseLayout,
  mugDesignMetadata,
} from '@/components/mug/mug-showcase-layout'

export const metadata: Metadata = mugDesignMetadata('mug')

export default function MugShowcaseRouteLayout({
  children,
}: {
  children: ReactNode
}) {
  return <MugShowcaseLayout id="mug">{children}</MugShowcaseLayout>
}
