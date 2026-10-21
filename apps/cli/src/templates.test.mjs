import { describe, expect, it } from 'vitest'
import { getTemplate, templateList, templates } from './templates.mjs'

describe('templates registry', () => {
  it('exposes art, dev, link, ocean, board, vcard, mug, and admin templates', () => {
    expect(Object.keys(templates).sort()).toEqual([
      'admin',
      'art',
      'board',
      'dev',
      'link',
      'mug',
      'ocean',
      'vcard',
    ])
    expect(templateList.map((t) => t.id).sort()).toEqual([
      'admin',
      'art',
      'board',
      'dev',
      'link',
      'mug',
      'ocean',
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
    expect(getTemplate('mug')?.path).toBe('templates/mug')
    expect(getTemplate('mug')?.defaultProjectName).toBe('my-mug')
    expect(getTemplate('admin')?.path).toBe('templates/admin')
    expect(getTemplate('admin')?.defaultProjectName).toBe('my-admin')
  })

  it('keeps bilingual locales as the Art --yes default', () => {
    expect(getTemplate('art')?.extraDefaults).toEqual({ locales: 'en,zh' })
    expect(getTemplate('dev')?.extraDefaults).toEqual({})
    expect(getTemplate('link')?.extraDefaults).toEqual({})
    expect(getTemplate('ocean')?.extraDefaults).toEqual({})
    expect(getTemplate('board')?.extraDefaults).toEqual({})
    expect(getTemplate('vcard')?.extraDefaults).toEqual({})
    expect(getTemplate('mug')?.extraDefaults).toEqual({})
    expect(getTemplate('admin')?.extraDefaults).toEqual({})
  })

  it('returns undefined for unknown ids', () => {
    expect(getTemplate('missing')).toBeUndefined()
  })
})
