import type { Metadata } from 'next'
import { CatalogPage } from '@/components/vale/catalog-page'

export const metadata: Metadata = {
  title: 'Catalog',
}

export default function Page() {
  return <CatalogPage />
}
