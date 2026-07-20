export type TocItem = {
  id: string
  title: string
  level: 2 | 3
}

/** Slugify heading text for anchor ids (ASCII-friendly + unicode letters). */
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Extract h2/h3 headings from MDX body for the right-rail TOC.
 * Skips fenced code blocks so hashes inside examples are ignored.
 */
export function extractToc(body: string): TocItem[] {
  const withoutCode = body.replace(/```[\s\S]*?```/g, '')
  const items: TocItem[] = []
  const seen = new Map<string, number>()
  const headingRe = /^(#{2,3})\s+(.+)$/gm

  let match: RegExpExecArray | null
  while ((match = headingRe.exec(withoutCode)) !== null) {
    const level = match[1]!.length as 2 | 3
    const rawTitle = match[2]!.replace(/#+\s*$/, '').trim()
    const title = rawTitle.replace(/\{[^}]*\}/g, '').trim()
    if (!title) continue

    let id = slugifyHeading(title)
    if (!id) id = `heading-${items.length + 1}`

    const count = seen.get(id) ?? 0
    seen.set(id, count + 1)
    if (count > 0) id = `${id}-${count}`

    items.push({ id, title, level })
  }

  return items
}
