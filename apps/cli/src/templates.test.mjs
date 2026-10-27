import { describe, expect, it } from 'vitest'
import { getTemplate, templateList, templates } from './templates.mjs'

describe('templates registry', () => {
  it('exposes art, dev, link, ocean, board, vcard, cobalt, atelier, admin, desk, usc, and seal templates', () => {
    expect(Object.keys(templates).sort()).toEqual([
      'admin',
      'art',
      'atelier',
      'board',
      'cobalt',
      'desk',
      'dev',
      'link',
      'ocean',
      'seal',
      'usc',
      'vcard',
    ])
    expect(templateList.map((t) => t.id).sort()).toEqual([
      'admin',
      'art',
      'atelier',
      'board',
      'cobalt',
      'desk',
      'dev',
      'link',
      'ocean',
      'seal',
      'usc',
      'vcard',
    ])
  })

  it('returns known templates by id', () => {
    expect(getTemplate('art')?.path).toBe('templates/art')
    expect(getTemplate('dev')?.defaultProjectName).toBe('my-blog')
    expect(getTemplate('link')?.defaultProjectName).toBe('my-links')
    expect(getTemplate('ocean')?.path).toBe('templates/ocean')
    expect(getTemplate('ocean')?.defaultProjectName).toBe('my-ocean-studio')
    expect(getTemplate('board')?.path).toBe('templates/board')
    expect(getTemplate('board')?.defaultProjectName).toBe('my-board')
    expect(getTemplate('vcard')?.path).toBe('templates/vcard')
    expect(getTemplate('vcard')?.defaultProjectName).toBe('my-vcard')
    expect(getTemplate('cobalt')?.path).toBe('templates/cobalt')
    expect(getTemplate('cobalt')?.defaultProjectName).toBe('my-cobalt')
    expect(getTemplate('atelier')?.path).toBe('templates/atelier')
    expect(getTemplate('atelier')?.defaultProjectName).toBe('my-atelier')
    expect(getTemplate('admin')?.path).toBe('templates/admin')
    expect(getTemplate('admin')?.defaultProjectName).toBe('my-admin')
    expect(getTemplate('desk')?.path).toBe('templates/desk')
    expect(getTemplate('desk')?.defaultProjectName).toBe('my-desk')
    expect(getTemplate('usc')?.path).toBe('templates/usc')
    expect(getTemplate('usc')?.defaultProjectName).toBe('my-usc')
    expect(getTemplate('seal')?.path).toBe('templates/seal')
    expect(getTemplate('seal')?.defaultProjectName).toBe('my-seal')
  })

  it('keeps bilingual locales as the Art --yes default', () => {
    expect(getTemplate('art')?.extraDefaults).toEqual({ locales: 'en,zh' })
    expect(getTemplate('dev')?.extraDefaults).toEqual({})
    expect(getTemplate('link')?.extraDefaults).toEqual({})
    expect(getTemplate('ocean')?.extraDefaults).toEqual({})
    expect(getTemplate('board')?.extraDefaults).toEqual({})
    expect(getTemplate('vcard')?.extraDefaults).toEqual({})
    expect(getTemplate('cobalt')?.extraDefaults).toEqual({})
    expect(getTemplate('atelier')?.extraDefaults).toEqual({})
    expect(getTemplate('admin')?.extraDefaults).toEqual({})
    expect(getTemplate('desk')?.extraDefaults).toEqual({})
    expect(getTemplate('usc')?.extraDefaults).toEqual({})
    expect(getTemplate('seal')?.extraDefaults).toEqual({})
  })

  it('returns undefined for unknown ids', () => {
    expect(getTemplate('missing')).toBeUndefined()
  })
})
