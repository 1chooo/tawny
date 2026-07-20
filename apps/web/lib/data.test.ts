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

  it('returns undefined for unknown ids', () => {
    expect(getDesign('missing')).toBeUndefined()
  })

  it('covers every catalog entry by id', () => {
    for (const design of designs) {
      expect(getDesign(design.id)).toBe(design)
      expect(design.viewPath).toBe(`/view/${design.id}`)
    }
  })
})
