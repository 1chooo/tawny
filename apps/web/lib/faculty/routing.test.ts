import { describe, expect, it } from 'vitest'
import { facultyBase, facultyHref, facultyPage } from './routing'

describe('faculty routing', () => {
  it('keeps scaffolded template links at the site root', () => {
    expect(facultyBase('/research')).toBe('')
    expect(facultyHref('/research', '/students')).toBe('/students')
    expect(facultyPage('/publications')).toBe('/publications')
    expect(facultyPage('/')).toBe('/')
  })

  it('prefixes links inside the live demo and the full preview', () => {
    expect(facultyHref('/designs/faculty/teaching', '/')).toBe('/designs/faculty')
    expect(facultyHref('/designs/faculty', '/publications')).toBe(
      '/designs/faculty/publications',
    )
    expect(facultyPage('/view/faculty/research')).toBe('/research')
    expect(facultyPage('/view/faculty')).toBe('/')
  })
})
