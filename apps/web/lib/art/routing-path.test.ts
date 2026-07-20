import { describe, expect, it } from 'vitest'
import {
  isArtLocale,
  ART_BASE,
  ART_VIEW_BASE,
  artBaseFromPathname,
} from './routing'
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

  it('exposes the art showcase and view bases', () => {
    expect(ART_BASE).toBe('/designs/art')
    expect(ART_VIEW_BASE).toBe('/view/art')
  })

  it('resolves the mount from the pathname', () => {
    expect(artBaseFromPathname('/view/art/en/notes')).toBe(ART_VIEW_BASE)
    expect(artBaseFromPathname('/designs/art/en')).toBe(ART_BASE)
    expect(artBaseFromPathname('/')).toBe(ART_BASE)
  })
})
