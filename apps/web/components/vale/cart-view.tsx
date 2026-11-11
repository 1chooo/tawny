'use client'

import Image from 'next/image'
import { useState } from 'react'
import { formatPrice, getProductById, selectionLabels } from '@/lib/vale/catalog'
import { lineLimit, unitPrice } from '@/lib/vale/cart'
import { useCart } from '@/components/vale/cart-provider'
import { ValeLink } from '@/components/vale/vale-link'

export function CartView() {
  const { lines, count, total, setQty, remove } = useCart()
  const [demoOpen, setDemoOpen] = useState(false)
  const entries = lines.flatMap((line) => {
    const product = getProductById(line.productId)
    return product ? [{ line, product }] : []
  })

  return (
    <div className="vale-page">
      <h1 className="vale-page-title vale-display">
        Cart <sup>[ {count} ]</sup>
      </h1>
      {entries.length === 0 ? (
        <div className="vale-empty">
          <p>Your cart is empty.</p>
          <ValeLink href="/catalog" className="vale-text-link vale-ui">
            Browse the catalog
          </ValeLink>
        </div>
      ) : (
        <div className="vale-cart-layout">
          <ul className="vale-cart-lines">
            {entries.map(({ line, product }) => {
              const image = product.images[0]
              const options = selectionLabels(product, line.selections).join(' / ')
              return (
                <li key={line.id} className="vale-cart-line">
                  <ValeLink href={`/products/${product.slug}`} className="vale-cart-thumb">
                    {image ? (
                      <Image src={image.src} alt="" fill sizes="120px" />
                    ) : null}
                  </ValeLink>
                  <div className="vale-cart-details">
                    <ValeLink href={`/products/${product.slug}`} className="vale-cart-name vale-ui">
                      {product.title}
                    </ValeLink>
                    <p className="vale-cart-meta">
                      {product.medium}
                      {options ? ` · ${options}` : ''}
                    </p>
                    <div className="vale-stepper">
                      <button
                        type="button"
                        aria-label={`Decrease ${product.title}`}
                        onClick={() => setQty(line.id, line.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{line.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${product.title}`}
                        onClick={() => setQty(line.id, line.quantity + 1)}
                        disabled={line.quantity >= lineLimit(product, line.selections)}
                      >
                        +
                      </button>
                    </div>
                    <button type="button" className="vale-remove" onClick={() => remove(line.id)}>
                      Remove
                    </button>
                  </div>
                  <p className="vale-cart-price vale-ui">
                    {formatPrice(unitPrice(product, line.selections) * line.quantity)}
                  </p>
                </li>
              )
            })}
          </ul>
          <aside className="vale-cart-summary">
            <p className="vale-subtotal vale-ui">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </p>
            <p className="vale-demo-note">
              Payment is not connected. This demo does not place an order or charge a card.
            </p>
            <button
              type="button"
              className="vale-add vale-ui"
              onClick={() => setDemoOpen(true)}
            >
              <span>Demo checkout</span>
              <span>{formatPrice(total)}</span>
            </button>
            {demoOpen ? (
              <p className="vale-demo-note" role="status">
                No order was placed. The cart is unchanged because checkout is only a preview.
              </p>
            ) : null}
          </aside>
        </div>
      )}
    </div>
  )
}
