import type { Metadata } from 'next'
import { StudioPage } from '@/components/info-pages'

export const metadata: Metadata = {
  title: 'Information',
}

export default function Page() {
  return <StudioPage />
}
