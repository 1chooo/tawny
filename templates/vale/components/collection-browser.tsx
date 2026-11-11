'use client'

import { useState } from 'react'
import { categoryCount, productsByCategory } from '@/lib/catalog'
import { categories } from '@/lib/content'
import type { CategoryId } from '@/lib/types'
import { ProductGrid } from '@/components/product-grid'
import { ValeLink } from '@/components/vale-link'

export function CollectionBrowser() {
  const [active, setActive] = useState<CategoryId>('ceramics')
  const category = categories.find((entry) => entry.id === active) ?? categories[0]
  const list = productsByCategory(active)

  return (
    <>
      <section className="vale-explorer" aria-label="Collections">
        <div className="vale-explorer-nav">
          <ul role="tablist" aria-label="Categories">
            {categories.map((entry) => {
              const selected = entry.id === active
              return (
                <li key={entry.id} role="presentation">
                  <button
                    type="button"
                    className="vale-tab vale-display"
                    role="tab"
                    id={`tab-${entry.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${entry.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(entry.id)}
                  >
                    {entry.label}
                    {selected ? <sup>[ {categoryCount(entry.id)} ]</sup> : null}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div
          className="vale-explorer-body"
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
        >
          <ProductGrid products={list} />
        </div>
      </section>
      <div className="vale-note">
        <p>{category.description}</p>
        <ValeLink href={`/catalog/${category.id}`} className="vale-ui">
          {category.shopLabel}
        </ValeLink>
      </div>
    </>
  )
}
