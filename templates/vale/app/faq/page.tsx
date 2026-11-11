import type { Metadata } from 'next'
import { FaqPage } from '@/components/info-pages'

export const metadata: Metadata = {
  title: 'FAQ',
}

export default function Page() {
  return <FaqPage />
}
