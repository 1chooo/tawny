import { describe, expect, it, vi } from 'vitest'

vi.mock('next/link', () => ({ default: () => null }))
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({}),
}))
vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}))

import { ART_VIEW_BASE } from './routing'
import { artHref, stripArtLocalePrefix } from './navigation'

describe('artHref', () => {
  it('prefixes locale and art base', () => {
    expect(artHref('en', '/notes')).toBe('/designs/art/en/notes')
    expect(artHref('zh', 'projects')).toBe('/designs/art/zh/projects')
  })

  it('treats root href as locale home', () => {
    expect(artHref('en', '/')).toBe('/designs/art/en')
  })

  it('supports the view mount base', () => {
    expect(artHref('en', '/notes', ART_VIEW_BASE)).toBe('/view/art/en/notes')
    expect(artHref('zh', '/', ART_VIEW_BASE)).toBe('/view/art/zh')
  })
})

describe('stripArtLocalePrefix', () => {
  it('strips the art locale prefix', () => {
    expect(stripArtLocalePrefix('/designs/art/en/notes')).toBe('/notes')
    expect(stripArtLocalePrefix('/designs/art/zh')).toBe('/')
  })

  it('strips the view mount locale prefix', () => {
    expect(stripArtLocalePrefix('/view/art/en/notes')).toBe('/notes')
    expect(stripArtLocalePrefix('/view/art/zh')).toBe('/')
  })

  it('returns / for non-matching paths', () => {
    expect(stripArtLocalePrefix('/designs/dev')).toBe('/')
    expect(stripArtLocalePrefix('/')).toBe('/')
  })
})
