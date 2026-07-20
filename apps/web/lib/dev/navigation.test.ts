import { describe, expect, it, vi } from 'vitest'

vi.mock('next/link', () => ({ default: () => null }))
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({}),
}))

import { DEV_BASE, DEV_VIEW_BASE } from './routing'
import { devHref, stripDevPrefix } from './navigation'

describe('devHref', () => {
  it('prefixes the dev base path', () => {
    expect(devHref('/posts/hello')).toBe(`${DEV_BASE}/posts/hello`)
    expect(devHref('demos')).toBe(`${DEV_BASE}/demos`)
  })

  it('treats root as the demo home', () => {
    expect(devHref('/')).toBe(DEV_BASE)
  })

  it('supports the view mount base', () => {
    expect(devHref('/blog', DEV_VIEW_BASE)).toBe(`${DEV_VIEW_BASE}/blog`)
    expect(devHref('/', DEV_VIEW_BASE)).toBe(DEV_VIEW_BASE)
  })

  it('leaves absolute and hash urls alone', () => {
    expect(devHref('https://example.com')).toBe('https://example.com')
    expect(devHref('http://localhost:3000')).toBe('http://localhost:3000')
    expect(devHref('#section')).toBe('#section')
  })
})

describe('stripDevPrefix', () => {
  it('strips the demo base', () => {
    expect(stripDevPrefix(`${DEV_BASE}/posts`)).toBe('/posts')
    expect(stripDevPrefix(DEV_BASE)).toBe('/')
    expect(stripDevPrefix(`${DEV_BASE}/`)).toBe('/')
  })

  it('strips the view mount base', () => {
    expect(stripDevPrefix(`${DEV_VIEW_BASE}/blog`)).toBe('/blog')
    expect(stripDevPrefix(DEV_VIEW_BASE)).toBe('/')
  })

  it('returns unrelated paths unchanged', () => {
    expect(stripDevPrefix('/designs/art/en')).toBe('/designs/art/en')
  })
})
