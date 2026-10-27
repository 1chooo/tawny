import { describe, expect, it } from 'vitest'
import { sectionVisible } from '@/components/atelier/content'

describe('sectionVisible', () => {
  it('hides a section when visible is false', () => {
    expect(sectionVisible(false, ['Mugs'])).toBe(false)
  })

  it('hides an empty list', () => {
    expect(sectionVisible(true, [])).toBe(false)
  })

  it('shows a visible section with items', () => {
    expect(sectionVisible(true, ['Mugs'])).toBe(true)
  })

  it('shows a visible section that has no list', () => {
    expect(sectionVisible(true)).toBe(true)
  })
})
