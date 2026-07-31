export type DocsNavGroup = {
  id: string
  title: string
  items: string[]
}

/**
 * Shared docs IA — slugs and group labels for MDX guide pages. Page titles
 * come from MDX frontmatter. `/components` itself (no slug) is the live
 * gallery landing (`app/components/page.tsx`), not an MDX page. The
 * "Components" sidebar group is NOT listed here — it's built dynamically
 * from `componentDemos` in `lib/docs/load.ts` so every live component demo
 * shows up automatically.
 */
export const docsNavigation: DocsNavGroup[] = [
  {
    id: 'start',
    title: 'Get started',
    items: ['getting-started', 'create-tawny'],
  },
  {
    id: 'designs',
    title: 'Designs',
    items: ['designs/overview'],
  },
]

/** Flat ordered list of all MDX doc slugs (for prev/next + static params). */
export function getAllDocSlugs(): string[] {
  return docsNavigation.flatMap((group) => group.items)
}

export function docsHref(slug: string): string {
  return slug === '' ? '/components' : `/components/${slug}`
}
