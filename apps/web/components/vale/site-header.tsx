'use client'

import { site } from '@/lib/vale/content'
import { useCart } from '@/components/vale/cart-provider'
import { ValeLink } from '@/components/vale/vale-link'

export function SiteHeader() {
  const { count } = useCart()

  return (
    <header className="vale-header">
      <div className="vale-header-inner">
        <nav className="vale-header-nav" aria-label="Shop">
          <ValeLink href="/catalog" className="vale-ui">
            Catalog
          </ValeLink>
        </nav>
        <ValeLink href="/" className="vale-logo vale-ui">
          {site.name}
        </ValeLink>
        <div className="vale-header-actions">
          <ValeLink href="/information" className="vale-info-link vale-ui">
            Information
          </ValeLink>
          <ValeLink href="/cart" className="vale-cart-link vale-ui">
            Cart {count}
          </ValeLink>
        </div>
      </div>
    </header>
  )
}
