import { describe, expect, it } from 'vitest'
import { mugV2Href } from './routing'

describe('mugV2Href', () => {
  it('prefixes shop and home links for the framed demo', () => {
    expect(mugV2Href('/designs/mug-v2', '/shop#mugs')).toBe(
      '/designs/mug-v2/shop#mugs',
    )
    expect(mugV2Href('/designs/mug-v2/shop', '/')).toBe('/designs/mug-v2')
  })

  it('prefixes links for the full preview', () => {
    expect(mugV2Href('/view/mug-v2/shop', '/#process')).toBe(
      '/view/mug-v2#process',
    )
    expect(mugV2Href('/view/mug-v2', '/login')).toBe('/view/mug-v2/login')
  })

  it('leaves mail, phone, and in-page hashes alone', () => {
    expect(mugV2Href('/designs/mug-v2', 'mailto:jane@example.com')).toBe(
      'mailto:jane@example.com',
    )
    expect(mugV2Href('/view/mug-v2', '#studio')).toBe('#studio')
  })
})
