import { describe, expect, it } from 'vitest'
import { languageFromPath } from './highlight-code'

describe('languageFromPath', () => {
  it('maps common extensions', () => {
    expect(languageFromPath('src/app/page.tsx')).toBe('tsx')
    expect(languageFromPath('lib/utils.ts')).toBe('ts')
    expect(languageFromPath('scripts/build.mjs')).toBe('js')
    expect(languageFromPath('styles/globals.css')).toBe('css')
    expect(languageFromPath('package.json')).toBe('json')
    expect(languageFromPath('content/hello.mdx')).toBe('mdx')
    expect(languageFromPath('README.md')).toBe('md')
    expect(languageFromPath('pnpm-lock.yaml')).toBe('yaml')
  })

  it('maps special basenames', () => {
    expect(languageFromPath('LICENSE')).toBe('text')
    expect(languageFromPath('.gitignore')).toBe('text')
    expect(languageFromPath('.env')).toBe('sh')
    expect(languageFromPath('.env.example')).toBe('sh')
    expect(languageFromPath('.env.local')).toBe('sh')
  })

  it('falls back to text for unknown or extensionless paths', () => {
    expect(languageFromPath('Makefile')).toBe('text')
    expect(languageFromPath('notes/todo.txt')).toBe('text')
  })
})
