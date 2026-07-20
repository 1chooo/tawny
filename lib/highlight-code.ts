import { codeToHtml } from 'shiki'

const LANG_BY_EXT: Record<string, string> = {
  tsx: 'tsx',
  ts: 'ts',
  jsx: 'jsx',
  js: 'js',
  css: 'css',
  json: 'json',
  mdx: 'mdx',
}

export function languageFromPath(filePath: string) {
  const ext = filePath.split('.').pop()?.toLowerCase() ?? 'tsx'
  return LANG_BY_EXT[ext] ?? 'tsx'
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
