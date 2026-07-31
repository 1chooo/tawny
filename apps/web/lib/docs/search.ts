import 'server-only'

import { docsNavigation } from '@/content/components/navigation'
import { docsHref, getAllDocSlugs, loadDoc } from '@/lib/docs/load'
import { extractToc } from '@/lib/docs/toc'
import { componentDemos } from '@/components/landing/showcases'

export type DocsSearchEntry = {
  id: string
  slug: string
  href: string
  title: string
  description: string
  groupTitle: string
  /** Blob used by cmdk filter (title + description + headings + body). */
  keywords: string
  kind: 'page' | 'heading'
}

function toSearchText(body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`[\]()>|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function groupTitleForSlug(slug: string): string {
  const group = docsNavigation.find((g) => g.items.includes(slug))
  return group?.title ?? ''
}

/**
 * Build a client-safe search index (MDX guide pages + heading deep links,
 * plus one entry per live component demo).
 */
export function getDocsSearchIndex(): DocsSearchEntry[] {
  const entries: DocsSearchEntry[] = []

  for (const slug of getAllDocSlugs()) {
    const doc = loadDoc(slug)
    if (!doc) continue

    const groupTitle = groupTitleForSlug(slug)
    const href = docsHref(slug)
    const headings = extractToc(doc.body)
    const bodyText = toSearchText(doc.body)
    const headingTitles = headings.map((h) => h.title).join(' ')

    entries.push({
      id: `page:${slug || 'index'}`,
      slug,
      href,
      title: doc.title,
      description: doc.description,
      groupTitle,
      keywords: [doc.title, doc.description, headingTitles, bodyText]
        .filter(Boolean)
        .join(' '),
      kind: 'page',
    })

    for (const heading of headings) {
      entries.push({
        id: `heading:${slug || 'index'}:${heading.id}`,
        slug,
        href: `${href}#${heading.id}`,
        title: heading.title,
        description: doc.title,
        groupTitle,
        keywords: [heading.title, doc.title, doc.description].join(' '),
        kind: 'heading',
      })
    }
  }

  for (const demo of componentDemos) {
    entries.push({
      id: `page:${demo.id}`,
      slug: demo.id,
      href: `/components/${demo.id}`,
      title: demo.title,
      description: demo.description,
      groupTitle: 'Components',
      keywords: [demo.title, demo.description, demo.category].join(' '),
      kind: 'page',
    })
  }

  return entries
}
