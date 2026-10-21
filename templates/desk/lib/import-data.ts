import { isIsoDate, type ProjectStatus } from '@/lib/model'

export type ImportRow = {
  name: string
  due: string
  status: ProjectStatus
  owner: string
}

export type ImportResult = {
  rows: ImportRow[]
  errors: string[]
}

const STATUSES = new Set<ProjectStatus>(['running', 'ended', 'pending'])

export const IMPORT_GUIDE = [
  'CSV with a header row, or a JSON array.',
  'Fields: name, due, status, owner.',
  'due is YYYY-MM-DD. status is running, ended, or pending.',
  'owner is matched to a teammate by name. Unknown names stay on the row as text.',
].join(' ')

export const SAMPLE_CSV = `name,due,status,owner
Northwind notes,2026-11-12,running,Ada Cole
Kit release,2026-11-20,pending,Mira Chen
Archive,2026-10-30,ended,Leo Park
`

function parseCsv(text: string) {
  const rows: string[][] = []
  let cell = ''
  let row: string[] = []
  let quoted = false
  const source = text.replace(/^\uFEFF/, '')
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i]
    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') {
          cell += '"'
          i += 1
        } else {
          quoted = false
        }
      } else {
        cell += char
      }
      continue
    }
    if (char === '"') {
      quoted = true
    } else if (char === ',') {
      row.push(cell.trim())
      cell = ''
    } else if (char === '\n') {
      row.push(cell.trim())
      rows.push(row)
      row = []
      cell = ''
    } else if (char !== '\r') {
      cell += char
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim())
    rows.push(row)
  }
  return rows.filter((entry) => entry.some((value) => value.length > 0))
}

function statusOf(value: string): ProjectStatus | null {
  const normalized = value.trim().toLowerCase()
  return STATUSES.has(normalized as ProjectStatus) ? (normalized as ProjectStatus) : null
}

function rowFrom(record: Record<string, string>, line: number, errors: string[]): ImportRow | null {
  const name = record.name?.trim() ?? ''
  const due = record.due?.trim() ?? ''
  const status = statusOf(record.status ?? '')
  const owner = record.owner?.trim() ?? ''
  const problems: string[] = []
  if (!name) problems.push('missing name')
  if (!isIsoDate(due)) problems.push('due must be YYYY-MM-DD')
  if (!status) problems.push('status must be running, ended, or pending')
  if (!owner) problems.push('missing owner')
  if (problems.length > 0) {
    errors.push(`Row ${line}: ${problems.join(', ')}.`)
    return null
  }
  return { name, due, status: status!, owner }
}

function fromCsv(text: string): ImportResult {
  const table = parseCsv(text)
  if (table.length === 0) return { rows: [], errors: ['The file is empty.'] }
  const header = table[0].map((cell) => cell.toLowerCase())
  const required = ['name', 'due', 'status', 'owner']
  const missing = required.filter((field) => !header.includes(field))
  if (missing.length > 0) {
    return { rows: [], errors: [`Missing column${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}.`] }
  }
  const rows: ImportRow[] = []
  const errors: string[] = []
  table.slice(1).forEach((cells, index) => {
    const record: Record<string, string> = {}
    header.forEach((key, cellIndex) => {
      record[key] = cells[cellIndex] ?? ''
    })
    const row = rowFrom(record, index + 2, errors)
    if (row) rows.push(row)
  })
  if (rows.length === 0 && errors.length === 0) {
    errors.push('No project rows were found under the header.')
  }
  return { rows, errors }
}

function fromJson(text: string): ImportResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return { rows: [], errors: ['That JSON could not be read.'] }
  }
  if (!Array.isArray(parsed)) {
    return { rows: [], errors: ['JSON should be an array of projects.'] }
  }
  const rows: ImportRow[] = []
  const errors: string[] = []
  parsed.forEach((entry, index) => {
    if (!entry || typeof entry !== 'object') {
      errors.push(`Row ${index + 1}: expected an object.`)
      return
    }
    const record = entry as Record<string, unknown>
    const row = rowFrom(
      {
        name: String(record.name ?? ''),
        due: String(record.due ?? ''),
        status: String(record.status ?? ''),
        owner: String(record.owner ?? ''),
      },
      index + 1,
      errors,
    )
    if (row) rows.push(row)
  })
  if (rows.length === 0 && errors.length === 0) {
    errors.push('The array has no projects.')
  }
  return { rows, errors }
}

export function parseImport(text: string, filename: string): ImportResult {
  const lower = filename.toLowerCase()
  const trimmed = text.trim()
  if (!trimmed) return { rows: [], errors: ['The file is empty.'] }
  if (lower.endsWith('.json') || trimmed.startsWith('[') || trimmed.startsWith('{')) {
    return fromJson(trimmed)
  }
  if (lower.endsWith('.csv') || lower.endsWith('.txt') || trimmed.includes(',')) {
    return fromCsv(trimmed)
  }
  return { rows: [], errors: ['Use a .csv or .json file.'] }
}
