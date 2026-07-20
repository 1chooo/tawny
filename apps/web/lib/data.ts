export interface Design {
  id: string
  title: string
  description: string
  /** Longer explanation shown below the live demo */
  longDescription: string[]
  category: string
  price: number | 'free'
  tags: string[]
  featured?: boolean
  /** Live demo path inside Tawny */
  demoPath: string
  /** npm create package name (may be mock / unpublished) */
  packageName: string
  /** Paths relative to templates/<id>/ shown in the source viewer */
  sourceFiles: string[]
}

export const designs: Design[] = [
  {
    id: 'art',
    title: 'Art',
    description:
      'A bilingual bento journal with MDX notes, projects, and interactive demos — open the live showcase.',
    longDescription: [
      'Art is a bilingual personal journal built around a brutalist bento home grid. It ships with MDX notes and projects, next-intl for English and Chinese, and interactive tiles — weather, location globe, image and tag carousels.',
      'Use the live demo above to explore the full experience inside Tawny. When you are ready to start from the same foundation, scaffold a copy with the create command below, then replace the placeholder author details and sample content.',
    ],
    category: 'Journal',
    price: 'free',
    tags: ['Next.js', 'MDX', 'Bento', 'i18n'],
    featured: true,
    demoPath: '/designs/art',
    packageName: 'create-tawny',
    sourceFiles: ['package.json', 'README.md', 'app/[locale]/page.tsx'],
  },
  {
    id: 'dev',
    title: 'Dev',
    description:
      'A minimal mono developer blog with MDX essays and interactive CS demos — open the live showcase.',
    longDescription: [
      'Dev is a minimal mono developer blog focused on readable essays and interactive demos. It uses MDX for content, Shiki for syntax highlighting, and a tight typographic system inspired by classic engineer personal sites.',
      'Navigate the live demo above to read sample posts and try the demos. Scaffold your own copy with the create command below, then swap in your name, social links, and writing.',
    ],
    category: 'Blog',
    price: 'free',
    tags: ['Next.js', 'MDX', 'Mono', 'Demos'],
    featured: true,
    demoPath: '/designs/dev',
    packageName: 'create-tawny',
    sourceFiles: ['package.json', 'README.md', 'app/page.tsx'],
  },
]

export const designCategories = ['All', 'Journal', 'Blog'] as const

export function getDesign(id: string) {
  return designs.find((d) => d.id === id)
}
