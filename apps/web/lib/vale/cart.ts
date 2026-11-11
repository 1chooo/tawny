import type { CartError, CartLine, Product } from '@/lib/vale/types'

export function lineId(productId: string, selections: Record<string, string>) {
  const key = Object.keys(selections)
    .sort()
    .map((groupId) => `${groupId}:${selections[groupId]}`)
    .join('|')
  return key ? `${productId}::${key}` : productId
}

export function selectionComplete(
  product: Product,
  selections: Record<string, string>,
) {
  if (!product.variants?.length) return true
  return product.variants.every((group) => {
    const selected = selections[group.id]
    return Boolean(selected && group.options.some((option) => option.id === selected))
  })
}

export function unitPrice(product: Product, selections: Record<string, string>) {
  let price = product.price
  for (const group of product.variants ?? []) {
    const selected = group.options.find((option) => option.id === selections[group.id])
    if (selected?.priceDelta) price += selected.priceDelta
  }
  return price
}

export function lineLimit(product: Product, selections: Record<string, string>) {
  let cap = product.inventory
  for (const group of product.variants ?? []) {
    const selected = group.options.find((option) => option.id === selections[group.id])
    if (selected?.inventory != null) cap = Math.min(cap, selected.inventory)
  }
  return Math.max(0, cap)
}

function usedQuantity(lines: CartLine[], productId: string) {
  return lines
    .filter((line) => line.productId === productId)
    .reduce((sum, line) => sum + line.quantity, 0)
}

export function addToCart(
  lines: CartLine[],
  product: Product,
  input?: { quantity?: number; selections?: Record<string, string> },
): { lines: CartLine[]; error?: CartError } {
  if (product.availability === 'paused') return { lines, error: 'paused' }
  if (product.availability === 'sold-out' || product.inventory <= 0) {
    return { lines, error: 'sold-out' }
  }

  const selections = input?.selections ?? {}
  if (!selectionComplete(product, selections)) return { lines, error: 'options' }

  const quantity = input?.quantity ?? 1
  if (!Number.isInteger(quantity) || quantity < 1) return { lines, error: 'limit' }

  const cap = lineLimit(product, selections)
  if (cap <= 0) return { lines, error: 'sold-out' }

  const id = lineId(product.id, selections)
  const current = lines.find((line) => line.id === id)?.quantity ?? 0
  const used = usedQuantity(lines, product.id)
  const room = Math.min(cap - current, product.inventory - used)
  if (room < quantity) return { lines, error: 'limit' }

  const next = lines.some((line) => line.id === id)
    ? lines.map((line) =>
        line.id === id ? { ...line, quantity: line.quantity + quantity } : line,
      )
    : [...lines, { id, productId: product.id, quantity, selections }]

  return { lines: next }
}

export function setQuantity(
  lines: CartLine[],
  product: Product,
  id: string,
  quantity: number,
) {
  if (quantity <= 0) return removeLine(lines, id)
  const line = lines.find((entry) => entry.id === id)
  if (!line) return lines
  const cap = lineLimit(product, line.selections)
  const others = usedQuantity(lines, product.id) - line.quantity
  const next = Math.min(quantity, cap, Math.max(0, product.inventory - others))
  if (next <= 0) return removeLine(lines, id)
  return lines.map((entry) => (entry.id === id ? { ...entry, quantity: next } : entry))
}

export function removeLine(lines: CartLine[], id: string) {
  return lines.filter((line) => line.id !== id)
}

export function itemCount(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0)
}

export function subtotal(lines: CartLine[], catalog: Product[]) {
  return lines.reduce((sum, line) => {
    const product = catalog.find((entry) => entry.id === line.productId)
    if (!product) return sum
    return sum + unitPrice(product, line.selections) * line.quantity
  }, 0)
}

export function cartErrorMessage(error: CartError) {
  switch (error) {
    case 'sold-out':
      return 'This piece is sold out.'
    case 'paused':
      return 'Pre-orders are paused.'
    case 'options':
      return 'Choose an option before adding.'
    case 'limit':
      return 'That is all that is available.'
    case 'missing':
      return 'This piece is not in the catalog.'
  }
}
