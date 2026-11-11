import { describe, expect, it } from 'vitest'
import { valeHref } from './routing'

describe('valeHref', () => {
  it('prefixes in-app paths for the active mount', () => {
    expect(valeHref('/designs/vale', '/catalog')).toBe('/designs/vale/catalog')
    expect(valeHref('/designs/vale/products/speckled-cup', '/')).toBe('/designs/vale')
    expect(valeHref('/view/vale', '/cart')).toBe('/view/vale/cart')
    expect(valeHref('/view/vale/faq', '/products/heat')).toBe('/view/vale/products/heat')
  })

  it('leaves external and mail links alone', () => {
    expect(valeHref('/designs/vale', 'mailto:hello@studiovale.example')).toBe(
      'mailto:hello@studiovale.example',
    )
    expect(valeHref('/view/vale', 'https://instagram.com/studiovale')).toBe(
      'https://instagram.com/studiovale',
    )
  })
})
