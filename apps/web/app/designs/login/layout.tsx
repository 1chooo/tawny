import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import {
  JaneShowcaseLayout,
  janeDesignMetadata,
} from '@/components/jane/jane-showcase-layout'

export const metadata: Metadata = janeDesignMetadata('login')

export default function LoginShowcaseLayout({
  children,
}: {
  children: ReactNode
}) {
  return <JaneShowcaseLayout id="login">{children}</JaneShowcaseLayout>
}
