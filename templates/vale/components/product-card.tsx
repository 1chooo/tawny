'use client'

import Image from 'next/image'
import { useState } from 'react'
import { formatPrice } from '@/lib/catalog'
import { cartErrorMessage, useCart } from '@/components/cart-provider'
import { ValeLink } from '@/components/vale-link'
import type { Product } from '@/lib/types'

function SoldLine() {
  return (
    <svg className="vale-sold-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="100" x2="100" y2="0" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export function ProductCard({
  product,
  showAction = true,
}: {
  product: Product
  showAction?: boolean
}) {
  const { add, quantityOf } = useCart()
  const [note, setNote] = useState<string | null>(null)
  const image = product.images[0]
  const inCart = quantityOf(product.id)
  const atLimit = product.availability === 'available' && inCart >= product.inventory
  const href = `/products/${product.slug}`

  function onAdd() {
    const error = add(product.id, { quantity: 1 })
    setNote(error ? cartErrorMessage(error) : null)
  }

  return (
    <article className="vale-card">
      <ValeLink href={href} className="vale-card-link">
        <h3 className="vale-card-title vale-ui">{product.title}</h3>
        <p className="vale-card-meta">{product.medium}</p>
        <div className="vale-card-media">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 599px) 50vw, 30vw"
            />
          ) : null}
          {product.availability === 'sold-out' ? <SoldLine /> : null}
        </div>
      </ValeLink>
      {showAction ? (
        product.availability === 'available' ? (
          <div>
            <button
              type="button"
              className="vale-quick vale-ui is-live"
              onClick={onAdd}
              disabled={atLimit}
            >
              <span>{atLimit ? 'In cart' : 'Add to cart'}</span>
              <span>{formatPrice(product.price)}</span>
            </button>
            {note ? <p className="vale-quick-note">{note}</p> : null}
          </div>
        ) : (
          <ValeLink
            href={href}
            className={`vale-quick vale-ui ${
              product.availability === 'sold-out'
                ? 'is-sold'
                : product.availability === 'paused'
                  ? 'is-paused'
                  : 'is-live'
            }`}
          >
            <span>
              {product.availability === 'sold-out'
                ? 'Sold out'
                : product.availability === 'paused'
                  ? 'Pre-orders paused'
                  : 'Choose options'}
            </span>
            <span>{formatPrice(product.price)}</span>
          </ValeLink>
        )
      ) : null}
    </article>
  )
}
