import { describe, expect, it } from 'vitest'
import { addToCart, itemCount, removeLine, setQuantity, subtotal } from './cart'
import { categories, products } from './content'
import { getProduct } from './catalog'

describe('vale catalog', () => {
  it('keeps a unique slug for each product', () => {
    const slugs = products.map((product) => product.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(products.length).toBeGreaterThanOrEqual(18)
    expect(products.length).toBeLessThanOrEqual(24)
  })

  it('covers every category and availability state', () => {
    for (const category of categories) {
      expect(products.some((product) => product.category === category.id)).toBe(true)
    }
    for (const availability of ['available', 'sold-out', 'paused', 'options'] as const) {
      expect(products.some((product) => product.availability === availability)).toBe(true)
    }
    expect(products.some((product) => product.inventory === 1)).toBe(true)
    expect(
      products
        .filter((product) => product.availability === 'options')
        .every((product) => (product.variants?.length ?? 0) > 0),
    ).toBe(true)
  })
})

describe('vale cart', () => {
  const cup = getProduct('speckled-cup')!
  const bottle = getProduct('speckled-bottle')!
  const paused = getProduct('cafe-cup')!
  const sold = getProduct('blossom-bottle')!
  const portrait = getProduct('portrait-commission')!
  const enamel = getProduct('enamel-pot')!

  it('adds an available piece and totals the price', () => {
    const added = addToCart([], cup, { quantity: 2 })
    expect(added.error).toBeUndefined()
    expect(itemCount(added.lines)).toBe(2)
    expect(subtotal(added.lines, products)).toBe(128)
    const removed = removeLine(added.lines, added.lines[0].id)
    expect(removed).toHaveLength(0)
  })

  it('refuses sold-out and paused pieces', () => {
    expect(addToCart([], sold).error).toBe('sold-out')
    expect(addToCart([], paused).error).toBe('paused')
  })

  it('requires a selection before adding an options piece', () => {
    expect(addToCart([], portrait).error).toBe('options')
    const added = addToCart([], portrait, {
      selections: { size: '11x14', subjects: '2' },
    })
    expect(added.error).toBeUndefined()
    expect(subtotal(added.lines, products)).toBe(140 + 90 + 60)
  })

  it('caps a one-of-a-kind piece at one', () => {
    const first = addToCart([], bottle)
    expect(first.error).toBeUndefined()
    expect(addToCart(first.lines, bottle).error).toBe('limit')
    const raised = setQuantity(first.lines, bottle, first.lines[0].id, 4)
    expect(raised[0]?.quantity).toBe(1)
  })

  it('treats a sold-out color as unavailable', () => {
    expect(addToCart([], enamel, { selections: { color: 'cream' } }).error).toBe('sold-out')
    const teal = addToCart([], enamel, { selections: { color: 'teal' }, quantity: 3 })
    expect(teal.error).toBeUndefined()
    expect(addToCart(teal.lines, enamel, { selections: { color: 'teal' } }).error).toBe('limit')
  })
})
