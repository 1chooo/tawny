import type { Metadata } from 'next'
import { ShippingPage } from '@/components/vale/info-pages'

export const metadata: Metadata = {
  title: 'Shipping & returns',
}

export default function Page() {
  return <ShippingPage />
}
