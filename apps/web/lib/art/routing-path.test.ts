import { describe, expect, it } from 'vitest'
import { isArtLocale, ART_BASE } from './routing'
import { postPath, projectPath } from './path'

describe('isArtLocale', () => {
  it('accepts supported locales', () => {
    expect(isArtLocale('en')).toBe(true)
    expect(isArtLocale('zh')).toBe(true)
  })

  it('rejects unsupported locales', () => {
    expect(isArtLocale('fr')).toBe(false)
    expect(isArtLocale('')).toBe(false)
  })
})

describe('art path helpers', () => {
  it('builds note and project paths', () => {
    expect(postPath('hello-world')).toBe('/notes/hello-world')
    expect(projectPath('portfolio')).toBe('/projects/portfolio')
  })

  it('exposes the art showcase base', () => {
    expect(ART_BASE).toBe('/designs/art')
  })
})
