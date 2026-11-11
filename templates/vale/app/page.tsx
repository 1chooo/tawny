import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { site } from '@/lib/content'

export const metadata: Metadata = {
  title: `${site.name} — ceramics and paintings`,
}

export default function Page() {
  return <HomePage />
}
