import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Design } from '@/lib/data'
import { listTemplateFilePaths, templateRoot } from '@/lib/template-tree'

const PAGE_FILE =
  /^app\/(?:.*\/)?(?:page|layout|template|not-found|loading|error|route|default)\.(?:tsx|ts|jsx|js|mdx)$/

export type RegistryFile = {
  path: string
  content: string
  type: string
  target: string
}

export type RegistryItem = {
  $schema: string
  name: string
  type: 'registry:block'
  title: string
  description: string
  dependencies: string[]
  devDependencies: string[]
  files: RegistryFile[]
}

function registryFileType(relPath: string) {
  if (PAGE_FILE.test(relPath)) return 'registry:page'
  if (relPath.startsWith('components/')) return 'registry:component'
  if (relPath.startsWith('lib/') || relPath.startsWith('hooks/')) {
    return 'registry:lib'
  }
  return 'registry:file'
}

function packageSpecs(
  packageJson: string,
  field: 'dependencies' | 'devDependencies',
) {
  if (!packageJson) return []
  try {
    const parsed = JSON.parse(packageJson) as {
      dependencies?: Record<string, unknown>
      devDependencies?: Record<string, unknown>
    }
    const deps = parsed[field]
    if (!deps || typeof deps !== 'object') return []
    return Object.entries(deps).flatMap(([name, version]) =>
      typeof version === 'string' ? [`${name}@${version}`] : [],
    )
  } catch {
    return []
  }
}

/**
 * Registry item v0 fetches for one design. File contents come from
 * `templates/<id>`; the id itself is a catalog slug, never a request path.
 */
export async function buildRegistryItem(design: Design): Promise<RegistryItem> {
  const root = templateRoot(design.id)
  const filePaths = (await listTemplateFilePaths(design.id))
    .slice()
    .sort((a, b) => a.localeCompare(b))

  const files: RegistryFile[] = []
  let packageJson = ''

  for (const relPath of filePaths) {
    const content = await readFile(path.join(root, relPath), 'utf8')
    if (content.includes('\0')) continue
    if (relPath === 'package.json') packageJson = content
    files.push({
      path: relPath,
      content,
      type: registryFileType(relPath),
      target: `~/${relPath}`,
    })
  }

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: design.id,
    type: 'registry:block',
    title: design.title,
    description: design.description,
    dependencies: packageSpecs(packageJson, 'dependencies'),
    devDependencies: packageSpecs(packageJson, 'devDependencies'),
    files,
  }
}
