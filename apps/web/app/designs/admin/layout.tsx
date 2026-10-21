import type { ReactNode } from 'react'
import {
  MugShowcaseLayout,
  mugDesignMetadata,
} from '@/components/mug/mug-showcase-layout'

export const metadata = mugDesignMetadata('admin')

export default function AdminShowcaseLayout({
  children,
}: {
  children: ReactNode
}) {
  return <MugShowcaseLayout id="admin">{children}</MugShowcaseLayout>
}
