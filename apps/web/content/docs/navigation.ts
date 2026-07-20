export type DocsNavGroup = {
  id: string
  title: string
  /** Empty string is the docs index (`index.mdx`). */
  items: string[]
}

/**
 * Shared docs IA — slugs and group labels. Page titles come from MDX frontmatter.
 */
export const docsNavigation: DocsNavGroup[] = [
  {
    id: 'start',
    title: 'Get started',
    items: ['', 'getting-started', 'create-tawny'],
  },
  {
    id: 'designs',
    title: 'Designs',
    items: ['designs/overview'],
  },
  {
    id: 'components',
    title: 'Components',
    items: ['components/overview'],
  },
]

/** Flat ordered list of all doc slugs (for prev/next + static params). */
export function getAllDocSlugs(): string[] {
  return docsNavigation.flatMap((group) => group.items)
}

export function docsHref(slug: string): string {
  return slug === '' ? '/docs' : `/docs/${slug}`
}
