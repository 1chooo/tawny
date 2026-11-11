import Image from 'next/image'
import { categories, products } from '@/lib/content'
import { productsByCategory } from '@/lib/catalog'
import type { CategoryId } from '@/lib/types'
import { ProductGrid } from '@/components/product-grid'
import { ValeLink } from '@/components/vale-link'

export function CatalogPage({ category }: { category?: CategoryId }) {
  const list = category ? productsByCategory(category) : products
  const current = categories.find((entry) => entry.id === category)
  const hero = list.find((product) => product.featured) ?? list[0]
  const heroImage = hero?.images[0]

  return (
    <div className="vale-page">
      <h1 className="vale-page-title vale-display">
        {current?.label ?? 'Catalog'}
        <sup>[ {list.length} ]</sup>
      </h1>
      <nav className="vale-pills" aria-label="Collections">
        <ValeLink
          href="/catalog"
          className="vale-pill"
          aria-current={category ? undefined : 'page'}
        >
          All
        </ValeLink>
        {categories.map((entry) => (
          <ValeLink
            key={entry.id}
            href={`/catalog/${entry.id}`}
            className="vale-pill"
            aria-current={entry.id === category ? 'page' : undefined}
          >
            {entry.label}
          </ValeLink>
        ))}
      </nav>
      {current ? <p className="vale-catalog-blurb">{current.description}</p> : null}
      <div className="vale-shop">
        {hero && heroImage ? (
          <article className="vale-shop-hero">
            <ValeLink href={`/products/${hero.slug}`} className="vale-shop-hero-media">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                sizes="(max-width: 999px) 100vw, 40vw"
              />
            </ValeLink>
            <div>
              <p className="vale-kicker vale-ui">Featured</p>
              <h2 className="vale-display">
                <ValeLink href={`/products/${hero.slug}`}>{hero.title}</ValeLink>
              </h2>
              <p>{hero.medium}</p>
              <ValeLink href={`/products/${hero.slug}`} className="vale-text-link vale-ui">
                View piece
              </ValeLink>
            </div>
          </article>
        ) : null}
        <div className="vale-shop-grid">
          <ProductGrid products={list} />
        </div>
      </div>
    </div>
  )
}
