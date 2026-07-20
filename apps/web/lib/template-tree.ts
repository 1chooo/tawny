import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { highlightCode, languageFromPath } from '@/lib/highlight-code'

export type TemplateFileNode =
  | { type: 'file'; name: string; path: string }
  | { type: 'dir'; name: string; path: string; children: TemplateFileNode[] }

export type TemplateFileContent = {
  code: string
  html: string
  language: string
}

export type TemplateExplorerData = {
  tree: TemplateFileNode[]
  files: Record<string, TemplateFileContent>
}

const IGNORED_NAMES = new Set([
  'node_modules',
  '.git',
  '.next',
  '.turbo',
  '.DS_Store',
])

const IGNORED_EXTENSIONS = new Set([
  '.ico',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.avif',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.lock',
])

function isIgnoredFile(name: string) {
  const ext = path.extname(name).toLowerCase()
  return IGNORED_EXTENSIONS.has(ext)
}

async function walkDir(
  absDir: string,
  relDir: string,
): Promise<TemplateFileNode[]> {
  const entries = await readdir(absDir, { withFileTypes: true })
  const nodes: TemplateFileNode[] = []

  for (const entry of entries) {
    if (IGNORED_NAMES.has(entry.name)) continue
    const relPath = relDir ? `${relDir}/${entry.name}` : entry.name

    if (entry.isDirectory()) {
      const children = await walkDir(path.join(absDir, entry.name), relPath)
      if (children.length > 0) {
        nodes.push({ type: 'dir', name: entry.name, path: relPath, children })
      }
      continue
    }

    if (isIgnoredFile(entry.name)) continue
    nodes.push({ type: 'file', name: entry.name, path: relPath })
  }

  return nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
}

function flattenFilePaths(nodes: TemplateFileNode[]): string[] {
  return nodes.flatMap((node) =>
    node.type === 'dir' ? flattenFilePaths(node.children) : [node.path],
  )
}

/**
 * Walks `templates/<designId>` and highlights every text file in it, for the
 * shadcn/ui-blocks-style file tree + code viewer on the design demo pages.
 */
export async function loadTemplateExplorer(
  designId: string,
): Promise<TemplateExplorerData> {
  const root = path.join(process.cwd(), '..', '..', 'templates', designId)
  const tree = await walkDir(root, '')
  const filePaths = flattenFilePaths(tree)

  const entries = await Promise.all(
    filePaths.map(async (filePath) => {
      const code = await readFile(path.join(root, filePath), 'utf8')
      const language = languageFromPath(filePath)
      const html = await highlightCode(code, language)
      return [filePath, { code, html, language }] as const
    }),
  )

  return { tree, files: Object.fromEntries(entries) }
}
