import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type WriteupFrontmatter = {
  title: string
  date: string
  description: string
}

export type Writeup = WriteupFrontmatter & {
  slug: string
  body: string
  readingTime: string
}

export type WriteupLink = {
  slug: string
  href: string
  title: string
}

const WORDS_PER_MINUTE = 200
const CONTENT_ROOT = path.join(process.cwd(), 'content/writeups')

function estimateReadingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  return `${minutes} min read`
}

/** YAML parses unquoted dates as `Date`. Keep a calendar `YYYY-MM-DD` string. */
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string') return value
  return '1970-01-01'
}

function parseFrontmatter(data: Record<string, unknown>): WriteupFrontmatter {
  return {
    title: typeof data.title === 'string' ? data.title : 'Untitled',
    date: normalizeDate(data.date),
    description: typeof data.description === 'string' ? data.description : '',
  }
}

/** All writeups, newest first. Each `.mdx` file is one post. */
export function getAllWriteups(): Writeup[] {
  if (!fs.existsSync(CONTENT_ROOT)) return []

  return fs
    .readdirSync(CONTENT_ROOT)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(CONTENT_ROOT, file), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        ...parseFrontmatter(data as Record<string, unknown>),
        body: content,
        readingTime: estimateReadingTime(content),
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getWriteup(slug: string): Writeup | null {
  return getAllWriteups().find((entry) => entry.slug === slug) ?? null
}

export function getWriteupStaticParams(): { slug: string }[] {
  return getAllWriteups().map((entry) => ({ slug: entry.slug }))
}

export function getAdjacentWriteups(slug: string): {
  newer: WriteupLink | null
  older: WriteupLink | null
} {
  const all = getAllWriteups()
  const index = all.findIndex((entry) => entry.slug === slug)
  if (index === -1) return { newer: null, older: null }

  const toLink = (entry: Writeup): WriteupLink => ({
    slug: entry.slug,
    href: `/writeups/${entry.slug}`,
    title: entry.title,
  })

  return {
    newer: index > 0 ? toLink(all[index - 1]!) : null,
    older: index < all.length - 1 ? toLink(all[index + 1]!) : null,
  }
}
