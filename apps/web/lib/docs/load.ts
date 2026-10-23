import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {
  docsHref,
  docsNavigation,
  getAllDocSlugs,
} from '@/content/components/navigation'
import { componentDemos } from '@/components/landing/showcases'

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

const CONTENT_ROOT = path.join(process.cwd(), 'content/components')

/** Sidebar group id that lists live component demos instead of MDX pages. */
const COMPONENTS_GROUP_ID = 'components'
const COMPONENTS_GROUP_TITLE = 'Components'

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

/** Sidebar item for a single live component demo. */
function componentDemoSidebarItem(
  demo: (typeof componentDemos)[number],
): DocsSidebarItem {
  return { slug: demo.id, href: `/components/${demo.id}`, title: demo.title }
}

/**
 * Sidebar groups — MDX guide groups from `docsNavigation`, plus a
 * "Components" group built from `componentDemos` so every live demo shows
 * up as a clickable entry automatically.
 */
export function getDocsSidebar(): DocsSidebarGroup[] {
  const mdxGroups = docsNavigation.map((group) => ({
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

  const start = mdxGroups.find((group) => group.id === 'start')
  if (start) {
    start.items.unshift({
      slug: '',
      href: '/components',
      title: 'Overview',
    })
  }

  return [
    ...mdxGroups,
    {
      id: COMPONENTS_GROUP_ID,
      title: COMPONENTS_GROUP_TITLE,
      items: componentDemos.map(componentDemoSidebarItem),
    },
  ]
}

/** Flat ordered pages for prev/next — MDX guides followed by component demos. */
export function getDocsFlatNav(): DocsPagerLink[] {
  const mdxLinks = getAllDocSlugs().flatMap((slug) => {
    const doc = loadDoc(slug)
    if (!doc) return []
    return [{ slug, href: docsHref(slug), title: doc.title }]
  })

  const demoLinks = componentDemos.map((demo) => ({
    slug: demo.id,
    href: `/components/${demo.id}`,
    title: demo.title,
  }))

  return [...mdxLinks, ...demoLinks]
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

/** Static params for nested MDX guide pages (excluding index and demos). */
export function getDocsStaticParams(): { slug: string[] }[] {
  return getAllDocSlugs()
    .filter((slug) => slug !== '')
    .map((slug) => ({ slug: slug.split('/') }))
}

export { docsHref, getAllDocSlugs }
