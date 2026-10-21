import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import {
  JaneShowcaseLayout,
  janeDesignMetadata,
} from '@/components/jane/jane-showcase-layout'

export const metadata: Metadata = janeDesignMetadata('landing')

export default function LandingShowcaseLayout({
  children,
}: {
  children: ReactNode
}) {
  return <JaneShowcaseLayout id="landing">{children}</JaneShowcaseLayout>
}
