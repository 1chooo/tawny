import { describe, expect, it } from 'vitest'
import { uscBase, uscHref, uscPage } from './routing'

describe('usc routing', () => {
  it('keeps scaffolded template links at the site root', () => {
    expect(uscBase('/research')).toBe('')
    expect(uscHref('/research', '/students')).toBe('/students')
    expect(uscPage('/publications')).toBe('/publications')
    expect(uscPage('/')).toBe('/')
  })

  it('prefixes links inside the live demo and the full preview', () => {
    expect(uscHref('/designs/usc/teaching', '/')).toBe('/designs/usc')
    expect(uscHref('/designs/usc', '/publications')).toBe(
      '/designs/usc/publications',
    )
    expect(uscPage('/view/usc/research')).toBe('/research')
    expect(uscPage('/view/usc')).toBe('/')
  })
})
