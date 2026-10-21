import { describe, expect, it } from 'vitest'
import { parseImport, SAMPLE_CSV } from './import-data'

describe('parseImport', () => {
  it('reads the sample csv', () => {
    const result = parseImport(SAMPLE_CSV, 'projects.csv')
    expect(result.errors).toEqual([])
    expect(result.rows).toHaveLength(3)
    expect(result.rows[0]).toMatchObject({
      name: 'Northwind notes',
      due: '2026-11-12',
      status: 'running',
      owner: 'Ada Cole',
    })
  })

  it('reports a missing column and a bad date', () => {
    const missing = parseImport('name,due\nAlpha,2026-11-01\n', 'bad.csv')
    expect(missing.rows).toHaveLength(0)
    expect(missing.errors[0]).toMatch(/status/)

    const dated = parseImport(
      'name,due,status,owner\nAlpha,11/01/2026,running,Ada Cole\n',
      'bad.csv',
    )
    expect(dated.rows).toHaveLength(0)
    expect(dated.errors[0]).toMatch(/YYYY-MM-DD/)
  })

  it('reads a json array and rejects a bare object', () => {
    const result = parseImport(
      JSON.stringify([{ name: 'Kit', due: '2026-12-01', status: 'pending', owner: 'Mira Chen' }]),
      'projects.json',
    )
    expect(result.errors).toEqual([])
    expect(result.rows[0].name).toBe('Kit')

    const object = parseImport('{"name":"Kit"}', 'projects.json')
    expect(object.rows).toHaveLength(0)
    expect(object.errors[0]).toMatch(/array/)
  })
})
