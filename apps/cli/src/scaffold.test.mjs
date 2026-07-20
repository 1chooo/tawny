import { mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  PLACEHOLDERS,
  replacePlaceholders,
  setProjectName,
  walk,
} from './scaffold.mjs'

async function makeTempProject() {
  const root = await mkdtemp(join(tmpdir(), 'create-tawny-'))
  await mkdir(join(root, 'src'), { recursive: true })
  await mkdir(join(root, 'node_modules', 'pkg'), { recursive: true })
  await mkdir(join(root, '.git'), { recursive: true })

  await writeFile(
    join(root, 'package.json'),
    JSON.stringify({ name: 'template-name', version: '0.0.0' }, null, 2) + '\n',
  )
  await writeFile(
    join(root, 'README.md'),
    'Hello {{AUTHOR_NAME}} <{{AUTHOR_EMAIL}}>\n',
  )
  await writeFile(
    join(root, 'src', 'site.ts'),
    'export const github = "{{GITHUB_USERNAME}}";\nexport const city = "{{CITY_NAME}}";\n',
  )
  await writeFile(join(root, 'node_modules', 'pkg', 'index.js'), 'ignored\n')

  return root
}

describe('PLACEHOLDERS', () => {
  it('lists the expected tokens', () => {
    expect(PLACEHOLDERS.map(([token]) => token)).toEqual([
      '{{AUTHOR_NAME}}',
      '{{AUTHOR_EMAIL}}',
      '{{GITHUB_USERNAME}}',
      '{{CITY_NAME}}',
    ])
  })
})

describe('walk', () => {
  it('lists files and skips node_modules and .git', async () => {
    const root = await makeTempProject()
    const files = await walk(root)
    const relative = files.map((f) => f.slice(root.length + 1)).sort()

    expect(relative).toEqual(['README.md', 'package.json', 'src/site.ts'])
  })
})

describe('setProjectName', () => {
  it('rewrites package.json name', async () => {
    const root = await makeTempProject()
    await setProjectName(root, 'my-journal')

    const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
    expect(pkg.name).toBe('my-journal')
  })
})

describe('replacePlaceholders', () => {
  it('replaces tokens in text files', async () => {
    const root = await makeTempProject()
    await replacePlaceholders(root, {
      authorName: 'Ada',
      authorEmail: 'ada@example.com',
      githubUsername: 'ada',
      cityName: 'London',
    })

    expect(await readFile(join(root, 'README.md'), 'utf8')).toBe(
      'Hello Ada <ada@example.com>\n',
    )
    expect(await readFile(join(root, 'src', 'site.ts'), 'utf8')).toBe(
      'export const github = "ada";\nexport const city = "London";\n',
    )
  })
})
