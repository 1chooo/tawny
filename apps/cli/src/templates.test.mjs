import { describe, expect, it } from 'vitest'
import { getTemplate, templateList, templates } from './templates.mjs'

describe('templates registry', () => {
  it('exposes art and dev templates', () => {
    expect(Object.keys(templates).sort()).toEqual(['art', 'dev'])
    expect(templateList.map((t) => t.id).sort()).toEqual(['art', 'dev'])
  })

  it('returns known templates by id', () => {
    expect(getTemplate('art')?.path).toBe('templates/art')
    expect(getTemplate('dev')?.defaultProjectName).toBe('my-blog')
  })

  it('returns undefined for unknown ids', () => {
    expect(getTemplate('missing')).toBeUndefined()
  })
})
