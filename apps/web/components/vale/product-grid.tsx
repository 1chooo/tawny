import { ProductCard } from '@/components/vale/product-card'
import type { Product } from '@/lib/vale/types'

export function ProductGrid({
  products,
  showAction = true,
}: {
  products: Product[]
  showAction?: boolean
}) {
  if (products.length === 0) {
    return <p className="vale-prose">Nothing in this collection yet.</p>
  }

  return (
    <ul className="vale-cards">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} showAction={showAction} />
        </li>
      ))}
    </ul>
  )
}
