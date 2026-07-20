import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {
  docsHref,
  docsNavigation,
  getAllDocSlugs,
} from '@/content/docs/navigation'

export type DocFrontmatter = {
  title: string
  description: string
}

export type DocPage = DocFrontmatter & {
  slug: string
  body: string
}

export type DocsSidebarItem = {
  slug: string
  href: string
  title: string
}

export type DocsSidebarGroup = {
  id: string
  title: string
  items: DocsSidebarItem[]
}

export type DocsPagerLink = {
  slug: string
  href: string
  title: string
}

const CONTENT_ROOT = path.join(process.cwd(), 'content/docs')

function docFilePath(slug: string): string {
  const relative = slug === '' ? 'index.mdx' : `${slug}.mdx`
  return path.join(CONTENT_ROOT, relative)
}

function parseFrontmatter(data: Record<string, unknown>): DocFrontmatter {
  const title = typeof data.title === 'string' ? data.title : 'Untitled'
  const description =
    typeof data.description === 'string' ? data.description : ''
  return { title, description }
}

/** Load a single docs MDX page. Returns null when the file is missing. */
export function loadDoc(slug: string): DocPage | null {
  const filePath = docFilePath(slug)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const frontmatter = parseFrontmatter(data as Record<string, unknown>)

  return {
    slug,
    ...frontmatter,
    body: content,
  }
}

/** Sidebar groups with titles resolved from frontmatter. */
export function getDocsSidebar(): DocsSidebarGroup[] {
  return docsNavigation.map((group) => ({
    id: group.id,
    title: group.title,
    items: group.items.map((slug) => {
      const doc = loadDoc(slug)
      return {
        slug,
        href: docsHref(slug),
        title: doc?.title ?? (slug || group.title),
      }
    }),
  }))
}

/** Flat ordered pages for prev/next. */
export function getDocsFlatNav(): DocsPagerLink[] {
  return getAllDocSlugs().flatMap((slug) => {
    const doc = loadDoc(slug)
    if (!doc) return []
    return [{ slug, href: docsHref(slug), title: doc.title }]
  })
}

export function getAdjacentDocs(slug: string): {
  prev: DocsPagerLink | null
  next: DocsPagerLink | null
} {
  const flat = getDocsFlatNav()
  const index = flat.findIndex((item) => item.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? flat[index - 1]! : null,
    next: index < flat.length - 1 ? flat[index + 1]! : null,
  }
}

/** Static params for nested docs (excluding index). */
export function getDocsStaticParams(): { slug: string[] }[] {
  return getAllDocSlugs()
    .filter((slug) => slug !== '')
    .map((slug) => ({ slug: slug.split('/') }))
}

export { docsHref, getAllDocSlugs }
