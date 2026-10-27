import { describe, expect, it } from 'vitest'
import { atelierHref } from './routing'

describe('atelierHref', () => {
  it('prefixes shop and home links for the framed demo', () => {
    expect(atelierHref('/designs/atelier', '/shop#mugs')).toBe(
      '/designs/atelier/shop#mugs',
    )
    expect(atelierHref('/designs/atelier/shop', '/')).toBe('/designs/atelier')
  })

  it('prefixes links for the full preview', () => {
    expect(atelierHref('/view/atelier/shop', '/#process')).toBe(
      '/view/atelier#process',
    )
    expect(atelierHref('/view/atelier', '/login')).toBe('/view/atelier/login')
  })

  it('leaves mail, phone, and in-page hashes alone', () => {
    expect(atelierHref('/designs/atelier', 'mailto:jane@example.com')).toBe(
      'mailto:jane@example.com',
    )
    expect(atelierHref('/view/atelier', '#studio')).toBe('#studio')
  })
})
