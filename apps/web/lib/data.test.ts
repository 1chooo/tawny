import { describe, expect, it } from 'vitest'
import { getDesign, designCategories, designs, pinnedDesignIds } from './data'

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

  it('includes the ocean design under Landing', () => {
    const ocean = getDesign('ocean')
    expect(ocean?.demoPath).toBe('/designs/ocean')
    expect(ocean?.viewPath).toBe('/view/ocean')
    expect(ocean?.category).toBe('Landing')
    expect(designCategories).toContain('Landing')
  })

  it('includes the board design under Dashboard', () => {
    const board = getDesign('board')
    expect(board?.demoPath).toBe('/designs/board')
    expect(board?.viewPath).toBe('/view/board')
    expect(board?.category).toBe('Dashboard')
    expect(pinnedDesignIds).not.toContain('board')
    expect(designCategories).toContain('Dashboard')
  })

  it('includes the vcard design under Portfolio', () => {
    const vcard = getDesign('vcard')
    expect(vcard?.demoPath).toBe('/designs/vcard')
    expect(vcard?.viewPath).toBe('/view/vcard')
    expect(vcard?.category).toBe('Portfolio')
    expect(pinnedDesignIds).toEqual(['art', 'ocean', 'vcard'])
    expect(designCategories).toContain('Portfolio')
  })

  it('includes the cobalt design under Shop', () => {
    const mug = getDesign('cobalt')
    expect(mug?.demoPath).toBe('/designs/cobalt')
    expect(mug?.viewPath).toBe('/view/cobalt')
    expect(mug?.title).toBe('Cobalt')
    expect(mug?.category).toBe('Shop')
    expect(pinnedDesignIds).not.toContain('cobalt')
    expect(designCategories).toContain('Shop')
  })

  it('includes atelier under Shop without replacing cobalt', () => {
    const mug = getDesign('atelier')
    expect(mug?.demoPath).toBe('/designs/atelier')
    expect(mug?.viewPath).toBe('/view/atelier')
    expect(mug?.title).toBe('Atelier')
    expect(mug?.category).toBe('Shop')
    expect(pinnedDesignIds).not.toContain('atelier')
    expect(getDesign('cobalt')?.demoPath).toBe('/designs/cobalt')
  })

  it('includes the admin design under Dashboard', () => {
    const admin = getDesign('admin')
    expect(admin?.demoPath).toBe('/designs/admin')
    expect(admin?.viewPath).toBe('/view/admin')
    expect(admin?.category).toBe('Dashboard')
    expect(pinnedDesignIds).not.toContain('admin')
    expect(designCategories).toContain('Dashboard')
  })

  it('includes the desk design under Dashboard', () => {
    const desk = getDesign('desk')
    expect(desk?.demoPath).toBe('/designs/desk')
    expect(desk?.viewPath).toBe('/view/desk')
    expect(desk?.category).toBe('Dashboard')
    expect(pinnedDesignIds).not.toContain('desk')
  })

  it('includes the usc design under Portfolio', () => {
    const usc = getDesign('usc')
    expect(usc?.demoPath).toBe('/designs/usc')
    expect(usc?.viewPath).toBe('/view/usc')
    expect(usc?.category).toBe('Portfolio')
    expect(pinnedDesignIds).not.toContain('usc')
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
