import { describe, expect, it } from 'vitest'
import { getDesign, designs } from './data'

describe('getDesign', () => {
  it('returns a known design by id', () => {
    const art = getDesign('art')
    expect(art?.id).toBe('art')
    expect(art?.demoPath).toBe('/designs/art')
    expect(art?.viewPath).toBe('/view/art')
    expect(art?.packageName).toBe('create-tawny')
  })

  it('includes the link design', () => {
    const link = getDesign('link')
    expect(link?.demoPath).toBe('/designs/link')
    expect(link?.viewPath).toBe('/view/link')
    expect(link?.category).toBe('Links')
  })

  it('returns undefined for unknown ids', () => {
    expect(getDesign('missing')).toBeUndefined()
  })

  it('covers every catalog entry by id', () => {
    for (const design of designs) {
      expect(getDesign(design.id)).toBe(design)
      expect(design.viewPath).toBe(`/view/${design.id}`)
    }
  })

  it('marks Dev as having an independent theme switch', () => {
    expect(getDesign('dev')?.hasThemeSwitch).toBe(true)
    expect(getDesign('art')?.hasThemeSwitch).toBeUndefined()
  })
})
