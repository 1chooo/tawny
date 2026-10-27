import { describe, expect, it } from 'vitest'
import { projects, sealDisplayCharacters, verticalTitles } from './content'

describe('seal content', () => {
  it('keeps vertical headlines within eight characters', () => {
    const titles = verticalTitles()
    expect(titles.length).toBeGreaterThan(0)
    for (const title of titles) {
      expect([...title].length).toBeGreaterThan(0)
      expect([...title].length).toBeLessThanOrEqual(8)
    }
  })

  it('uses only characters present in the display subset', () => {
    for (const title of verticalTitles()) {
      for (const character of title) {
        expect(sealDisplayCharacters).toContain(character)
      }
    }
  })

  it('uses a unique slug for each project', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(projects).toHaveLength(3)
  })
})
