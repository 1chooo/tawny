'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  getCategory,
  priceLabel,
  recommendedProducts,
  relatedProducts,
} from '@/lib/catalog'
import { lineLimit, selectionComplete } from '@/lib/cart'
import { site } from '@/lib/content'
import { cartErrorMessage, useCart } from '@/components/cart-provider'
import { ProductCard } from '@/components/product-card'
import { ProductGrid } from '@/components/product-grid'
import { ValeLink } from '@/components/vale-link'
import type { Product } from '@/lib/types'

function Purchase({
  product,
  onPrice,
}: {
  product: Product
  onPrice: (price: string) => void
}) {
  const { add, quantityOf } = useCart()
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState<string | null>(null)
  const complete = selectionComplete(product, selections)
  const cap = complete ? lineLimit(product, selections) : product.inventory
  const inCart = quantityOf(product.id, complete ? selections : {})
  const remaining = Math.max(0, cap - inCart)
  const blocked =
    product.availability === 'sold-out' ||
    product.availability === 'paused' ||
    (complete && cap <= 0)
  const showStepper = product.inventory > 1 && !blocked
  const shownPrice = priceLabel(product, selections)

  useEffect(() => {
    onPrice(shownPrice)
  }, [onPrice, shownPrice])

  function choose(groupId: string, optionId: string) {
    setSelections((current) => ({ ...current, [groupId]: optionId }))
    setQuantity(1)
    setNote(null)
  }

  function onAdd() {
    const error = add(product.id, { quantity, selections })
    setNote(error ? cartErrorMessage(error) : null)
  }

  const label = product.availability === 'paused'
    ? 'Pre-orders paused'
    : product.availability === 'sold-out' || (complete && cap <= 0)
      ? 'Sold out'
      : remaining <= 0 && complete
        ? 'In cart'
        : 'Add to cart'

  return (
    <div className="vale-purchase">
      {product.variants?.length ? (
        <div className="vale-options">
          {product.variants.map((group) => (
            <fieldset key={group.id} className="vale-options">
              <legend className="vale-ui">{group.label}</legend>
              <div className="vale-option-row" role="group" aria-label={group.label}>
                {group.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className="vale-option vale-ui"
                    aria-pressed={selections[group.id] === option.id}
                    onClick={() => choose(group.id, option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      ) : null}
      <div className="vale-purchase-row">
        {showStepper ? (
          <div className="vale-stepper">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              disabled={quantity <= 1}
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((value) => Math.min(remaining || 1, value + 1))}
              disabled={complete && quantity >= remaining}
            >
              +
            </button>
          </div>
        ) : null}
        <button
          type="button"
          className={`vale-add vale-ui${blocked ? ' is-muted' : ''}`}
          onClick={onAdd}
          disabled={blocked || (complete && remaining <= 0)}
        >
          <span>{label}</span>
          <span>{shownPrice}</span>
        </button>
      </div>
      {note ? (
        <p className="vale-quick-note" role="status">
          {note}
        </p>
      ) : null}
    </div>
  )
}

function Recommended({ product }: { product: Product }) {
  const track = useRef<HTMLUListElement>(null)
  const items = recommendedProducts(product)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  function sync() {
    const node = track.current
    if (!node) return
    setAtStart(node.scrollLeft <= 2)
    setAtEnd(node.scrollLeft + node.clientWidth >= node.scrollWidth - 2)
  }

  function scrollBy(direction: -1 | 1) {
    const node = track.current
    if (!node) return
    node.scrollBy({ left: direction * node.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <section className="vale-rail" aria-labelledby="recommended-title">
      <div className="vale-rail-head">
        <h2 id="recommended-title" className="vale-display">
          Recommended <sup>[ {items.length} ]</sup>
        </h2>
        <div className="vale-rail-actions">
          <button type="button" aria-label="Previous" onClick={() => scrollBy(-1)} disabled={atStart}>
            ←
          </button>
          <button type="button" aria-label="Next" onClick={() => scrollBy(1)} disabled={atEnd}>
            →
          </button>
        </div>
      </div>
      <ul className="vale-rail-track" ref={track} onScroll={sync}>
        {items.map((item) => (
          <li key={item.id}>
            {/* ProductCard is the catalog card, including add. */}
            <ProductCard product={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ProductDetail({ product }: { product: Product }) {
  const category = getCategory(product.category)
  const more = relatedProducts(product)
  const [shownPrice, setShownPrice] = useState(() => priceLabel(product))
  const availability =
    product.inventory === 1 && product.availability === 'available'
      ? 'One of a kind.'
      : product.availability === 'sold-out'
        ? 'Sold out.'
        : product.availability === 'paused'
          ? 'Pre-orders are paused.'
          : product.availability === 'options'
            ? 'Choose options before adding.'
            : 'Made by hand in a small batch.'

  return (
    <>
      <article className="vale-pdp">
        <div className="vale-pdp-info">
          <div className="vale-pdp-sticky">
            <nav className="vale-crumbs vale-ui" aria-label="Breadcrumb">
              <ValeLink href="/catalog">Catalog</ValeLink>
              {category ? (
                <ValeLink href={`/catalog/${category.id}`}>{category.label}</ValeLink>
              ) : null}
            </nav>
            <h1 className="vale-display">{product.title}</h1>
            <p className="vale-pdp-price">{shownPrice}</p>
            <div className="vale-prose">
              <p>{product.description}</p>
              <p>{product.materials}</p>
              <p>Approx // {product.dimensions}</p>
              <p className="vale-muted">{availability}</p>
            </div>
            <Purchase product={product} onPrice={setShownPrice} />
            <details className="vale-accordion">
              <summary className="vale-ui">{site.shipping.title}</summary>
              <div className="vale-prose">
                <h3 className="vale-ui">{site.shipping.shippingTitle}</h3>
                {site.shipping.shipping.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <h3 className="vale-ui">{site.shipping.returnsTitle}</h3>
                {site.shipping.returns.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          </div>
        </div>
        <div className="vale-pdp-media">
          {product.images.map((image, index) => (
            <div
              key={image.src}
              className={index === 0 ? 'vale-pdp-image vale-pdp-lead' : 'vale-pdp-image'}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 999px) 100vw, 60vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </article>
      <section className="vale-more" aria-labelledby="more-title">
        <h2 id="more-title" className="vale-display">
          More from {category?.label ?? 'the studio'}
        </h2>
        <ProductGrid products={more} showAction={false} />
      </section>
      <Recommended product={product} />
    </>
  )
}
