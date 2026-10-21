import { describe, expect, it } from 'vitest'
import {
  buildSetupPrompt,
  DEFAULT_PROJECT_NAMES,
  designShowcasePath,
  setupCommand,
} from './setup-prompt'

describe('designShowcasePath', () => {
  it('uses the English locale path for Art', () => {
    expect(designShowcasePath('art')).toBe('/designs/art/en')
  })

  it('uses the demo path for other designs', () => {
    expect(designShowcasePath('dev')).toBe('/designs/dev')
    expect(designShowcasePath('link')).toBe('/designs/link')
  })
})

describe('setupCommand', () => {
  it('uses CLI default project names and --yes', () => {
    expect(setupCommand('art')).toBe(
      'npx create-tawny@latest art my-journal --yes',
    )
    expect(setupCommand('dev')).toBe('npx create-tawny@latest dev my-blog --yes')
    expect(setupCommand('link')).toBe(
      'npx create-tawny@latest link my-links --yes',
    )
    expect(setupCommand('ocean')).toBe(
      'npx create-tawny@latest ocean my-ocean-studio --yes',
    )
    expect(setupCommand('board')).toBe(
      'npx create-tawny@latest board my-board --yes',
    )
    expect(setupCommand('vcard')).toBe(
      'npx create-tawny@latest vcard my-vcard --yes',
    )
    expect(setupCommand('mug')).toBe(
      'npx create-tawny@latest mug my-mug --yes',
    )
  })

  it('keeps default names aligned with the CLI', () => {
    expect(DEFAULT_PROJECT_NAMES).toEqual({
      art: 'my-journal',
      dev: 'my-blog',
      link: 'my-links',
      ocean: 'my-ocean-studio',
      board: 'my-board',
      vcard: 'my-vcard',
      mug: 'my-mug',
    })
  })
})

describe('buildSetupPrompt', () => {
  it('builds an Art prompt that points at the live showcase and create-tawny', () => {
    const prompt = buildSetupPrompt(
      { id: 'art', title: 'Art' },
      'https://tawny.example',
    )

    expect(prompt).toContain(
      'Set up a local copy of the Tawny Art template — the bilingual bento journal',
    )
    expect(prompt).toContain('shown at https://tawny.example/designs/art/en.')
    expect(prompt).toContain('npx create-tawny@latest art my-journal --yes')
    expect(prompt).toContain('Keep English + Chinese so it matches the live showcase.')
    expect(prompt).toContain('Read https://tawny.example/components/create-tawny')
    expect(prompt).toContain('Do not rebuild the layout from scratch.')
  })

  it('omits the Art locale line for other designs', () => {
    const prompt = buildSetupPrompt(
      { id: 'dev', title: 'Dev' },
      'https://tawny.example',
    )

    expect(prompt).toContain('https://tawny.example/designs/dev')
    expect(prompt).toContain('npx create-tawny@latest dev my-blog --yes')
    expect(prompt).not.toContain('Keep English + Chinese')
  })
})
