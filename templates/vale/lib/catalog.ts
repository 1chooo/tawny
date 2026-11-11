import { categories, products } from '@/lib/content'
import type { CategoryId, Product } from '@/lib/types'

export function formatPrice(amount: number) {
  return `$${amount}`
}

export function getCategory(id: string) {
  return categories.find((category) => category.id === id)
}

export function isCategoryId(id: string): id is CategoryId {
  return categories.some((category) => category.id === id)
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function productsByCategory(category: CategoryId) {
  return products.filter((product) => product.category === category)
}

export function categoryCount(category: CategoryId) {
  return productsByCategory(category).length
}

export function relatedProducts(product: Product, limit = 3) {
  return products
    .filter((entry) => entry.category === product.category && entry.id !== product.id)
    .slice(0, limit)
}

export function recommendedProducts(product: Product, limit = 6) {
  const others = products.filter((entry) => entry.id !== product.id)
  const featured = others.filter((entry) => entry.featured)
  const rest = others.filter((entry) => !entry.featured)
  return [...featured, ...rest].slice(0, limit)
}

export function selectionLabels(
  product: Product,
  selections: Record<string, string>,
) {
  return (product.variants ?? [])
    .map((group) => group.options.find((option) => option.id === selections[group.id])?.label)
    .filter((label): label is string => Boolean(label))
}

export function priceLabel(product: Product, selections: Record<string, string> = {}) {
  const hasDelta = product.variants?.some((group) =>
    group.options.some((option) => option.priceDelta),
  )
  const complete =
    !product.variants?.length ||
    product.variants.every((group) =>
      group.options.some((option) => option.id === selections[group.id]),
    )
  if (!complete && hasDelta) return `From ${formatPrice(product.price)}`
  let amount = product.price
  if (complete) {
    for (const group of product.variants ?? []) {
      const selected = group.options.find((option) => option.id === selections[group.id])
      if (selected?.priceDelta) amount += selected.priceDelta
    }
  }
  return formatPrice(amount)
}
