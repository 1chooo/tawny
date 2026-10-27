import { describe, expect, it } from 'vitest'
import { sealHref } from './routing'

describe('sealHref', () => {
  it('prefixes home and work links for the framed demo', () => {
    expect(sealHref('/designs/seal', '/#work')).toBe('/designs/seal#work')
    expect(sealHref('/designs/seal/work/field-guide', '/')).toBe('/designs/seal')
    expect(sealHref('/designs/seal', '/work/harbor-mark')).toBe(
      '/designs/seal/work/harbor-mark',
    )
  })

  it('prefixes links for the full preview', () => {
    expect(sealHref('/view/seal', '/work/field-guide')).toBe(
      '/view/seal/work/field-guide',
    )
    expect(sealHref('/view/seal/work/field-guide', '/#contact')).toBe(
      '/view/seal#contact',
    )
  })

  it('leaves mail and in-page hashes alone', () => {
    expect(sealHref('/designs/seal', 'mailto:hello@example.com')).toBe(
      'mailto:hello@example.com',
    )
    expect(sealHref('/view/seal', '#work')).toBe('#work')
  })
})
