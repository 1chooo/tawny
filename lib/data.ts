export interface Design {
  id: string
  title: string
  description: string
  category: string
  price: number | 'free'
  tags: string[]
  featured?: boolean
  /** Live demo path inside Tawny */
  demoPath: string
}

export const designs: Design[] = [
  {
    id: 'art',
    title: 'Art',
    description:
      'A bilingual bento journal with MDX notes, projects, and interactive demos — open the live showcase.',
    category: 'Journal',
    price: 'free',
    tags: ['Next.js', 'MDX', 'Bento', 'i18n'],
    featured: true,
    demoPath: '/designs/art',
  },
  {
    id: 'dev',
    title: 'Dev',
    description:
      'A minimal mono developer blog with MDX essays and interactive CS demos — open the live showcase.',
    category: 'Blog',
    price: 'free',
    tags: ['Next.js', 'MDX', 'Mono', 'Demos'],
    featured: true,
    demoPath: '/designs/dev',
  },
]

export const designCategories = ['All', 'Journal', 'Blog'] as const
