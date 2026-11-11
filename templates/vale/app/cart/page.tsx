import type { Metadata } from 'next'
import { CartView } from '@/components/cart-view'

export const metadata: Metadata = {
  title: 'Cart',
}

export default function Page() {
  return <CartView />
}
