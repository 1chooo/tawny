import { codeToHtml } from 'shiki'

const LANG_BY_EXT: Record<string, string> = {
  tsx: 'tsx',
  ts: 'ts',
  jsx: 'jsx',
  js: 'js',
  mjs: 'js',
  cjs: 'js',
  css: 'css',
  json: 'json',
  mdx: 'mdx',
  md: 'md',
  yaml: 'yaml',
  yml: 'yaml',
  env: 'sh',
}

/** Extensionless / dotfile names matched against the file's basename. */
const LANG_BY_BASENAME: Record<string, string> = {
  LICENSE: 'text',
  '.gitignore': 'text',
  '.env': 'sh',
  '.env.example': 'sh',
  '.env.local': 'sh',
}

export function languageFromPath(filePath: string) {
  const basename = filePath.split('/').pop() ?? filePath
  if (basename in LANG_BY_BASENAME) return LANG_BY_BASENAME[basename]

  const ext = basename.split('.').pop()?.toLowerCase()
  if (!ext || ext === basename) return 'text'
  return LANG_BY_EXT[ext] ?? 'text'
}

/**
 * Highlight source with Shiki for the dark Tawny shell.
 */
export async function highlightCode(code: string, language = 'tsx') {
  return codeToHtml(code.trim(), {
    lang: language,
    theme: 'github-dark',
  })
}
