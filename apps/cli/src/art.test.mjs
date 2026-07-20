import { mkdtemp, mkdir, writeFile, readFile, access } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { stripZhLocale } from './art.mjs'

async function fileMissing(path) {
  try {
    await access(path)
    return false
  } catch {
    return true
  }
}

async function makeArtFixture() {
  const root = await mkdtemp(join(tmpdir(), 'create-tawny-art-'))
  await mkdir(join(root, 'messages'), { recursive: true })
  await mkdir(join(root, 'i18n'), { recursive: true })
  await mkdir(join(root, 'content', 'posts'), { recursive: true })

  await writeFile(join(root, 'messages', 'en.json'), '{"hello":"hi"}\n')
  await writeFile(join(root, 'messages', 'zh.json'), '{"hello":"你好"}\n')
  await writeFile(
    join(root, 'i18n', 'routing.ts'),
    `import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
});
`,
  )
  await writeFile(join(root, 'content', 'posts', 'hello.en.mdx'), '# Hello\n')
  await writeFile(join(root, 'content', 'posts', 'hello.zh.mdx'), '# 你好\n')

  return root
}

describe('stripZhLocale', () => {
  it('removes zh locale files and rewrites routing locales', async () => {
    const root = await makeArtFixture()
    await stripZhLocale(root)

    expect(await fileMissing(join(root, 'messages', 'zh.json'))).toBe(true)
    expect(await fileMissing(join(root, 'content', 'posts', 'hello.zh.mdx'))).toBe(
      true,
    )
    expect(await fileMissing(join(root, 'content', 'posts', 'hello.en.mdx'))).toBe(
      false,
    )

    const routing = await readFile(join(root, 'i18n', 'routing.ts'), 'utf8')
    expect(routing).toContain('locales: ["en"]')
    expect(routing).not.toContain('"zh"')
  })
})
