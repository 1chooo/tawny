import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type ChangelogFrontmatter = {
  title: string
  date: string
  category: string
  summary?: string
}

export type ChangelogEntry = ChangelogFrontmatter & {
  slug: string
  body: string
  readingTime: string
}

export type ChangelogPageResult = {
  entries: ChangelogEntry[]
  currentPage: number
  totalPages: number
}

export type ChangelogAdjacentLink = {
  slug: string
  href: string
  title: string
}

const WORDS_PER_MINUTE = 200

function estimateReadingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  return `${minutes} min read`
}

const CONTENT_ROOT = path.join(process.cwd(), 'content/changelog')

/**
 * YAML parses unquoted `date: 2026-07-20` as a native `Date`, not a string —
 * normalize back to `YYYY-MM-DD` regardless of which shape gray-matter gives us.
 */
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string') return value
  return '1970-01-01'
}

function parseFrontmatter(data: Record<string, unknown>): ChangelogFrontmatter {
  const title = typeof data.title === 'string' ? data.title : 'Untitled'
  const date = normalizeDate(data.date)
  const category = typeof data.category === 'string' ? data.category : 'General'
  const summary = typeof data.summary === 'string' ? data.summary : undefined
  return { title, date, category, summary }
}

/**
 * All changelog entries, newest first. Each `.mdx` file is its own entry —
 * entries are never grouped or deduplicated by date, so several designs or
 * components shipped on the same day simply appear as separate, adjacent
 * entries sharing that date.
 */
export function getAllChangelogEntries(): ChangelogEntry[] {
  if (!fs.existsSync(CONTENT_ROOT)) return []

  const files = fs.readdirSync(CONTENT_ROOT).filter((file) => file.endsWith('.mdx'))

  const entries = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(CONTENT_ROOT, file), 'utf8')
    const { data, content } = matter(raw)
    const frontmatter = parseFrontmatter(data as Record<string, unknown>)
    return {
      slug,
      ...frontmatter,
      body: content,
      readingTime: estimateReadingTime(content),
    }
  })

  return entries.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.slug.localeCompare(a.slug)))
}

/** Slice all entries into a single page for `/changelog?page=N`. */
export function getChangelogPage(page: number, perPage = 5): ChangelogPageResult {
  const all = getAllChangelogEntries()
  const totalPages = Math.max(1, Math.ceil(all.length / perPage))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * perPage
  const entries = all.slice(start, start + perPage)

  return { entries, currentPage, totalPages }
}

/** Single entry by slug, for the permalink page. Returns null if missing. */
export function getChangelogEntry(slug: string): ChangelogEntry | null {
  return getAllChangelogEntries().find((entry) => entry.slug === slug) ?? null
}

/** Static params for `/changelog/[slug]`. */
export function getChangelogStaticParams(): { slug: string }[] {
  return getAllChangelogEntries().map((entry) => ({ slug: entry.slug }))
}

/**
 * Newer/older neighbors in the reverse-chronological list — "newer" is the
 * entry just above (more recent), "older" is the entry just below.
 */
export function getAdjacentChangelogEntries(slug: string): {
  newer: ChangelogAdjacentLink | null
  older: ChangelogAdjacentLink | null
} {
  const all = getAllChangelogEntries()
  const index = all.findIndex((entry) => entry.slug === slug)
  if (index === -1) return { newer: null, older: null }

  const toLink = (entry: ChangelogEntry): ChangelogAdjacentLink => ({
    slug: entry.slug,
    href: `/changelog/${entry.slug}`,
    title: entry.title,
  })

  return {
    newer: index > 0 ? toLink(all[index - 1]!) : null,
    older: index < all.length - 1 ? toLink(all[index + 1]!) : null,
  }
}
