export interface Design {
  id: string
  title: string
  description: string
  category: string
  image: string
  price: number | 'free'
  tags: string[]
  featured?: boolean
  /** Live demo path inside Tawny */
  demoPath: string
}

export interface UIComponent {
  id: string
  title: string
  description: string
  image: string
  price: number | 'free'
  category: string
  count: number
}

export const designs: Design[] = [
  {
    id: 'art',
    title: 'Art',
    description:
      'A bilingual bento journal with MDX notes, projects, and interactive demos — open the live showcase.',
    category: 'Journal',
    image: '/art-opengraph-image.png',
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
    image: '/dev-opengraph-image.svg',
    price: 'free',
    tags: ['Next.js', 'MDX', 'Mono', 'Demos'],
    featured: true,
    demoPath: '/designs/dev',
  },
]

export const uiComponents: UIComponent[] = [
  {
    id: 'navbar',
    title: 'Navigation Bar',
    description: 'Responsive navbar with mobile menu, scroll effects, and dropdown support.',
    image: '/images/comp-navbar.png',
    price: 'free',
    category: 'Navigation',
    count: 3,
  },
  {
    id: 'pricing',
    title: 'Pricing Cards',
    description: 'Three-tier pricing layout with feature lists and highlighted popular plan.',
    image: '/images/comp-pricing.png',
    price: 19,
    category: 'Marketing',
    count: 5,
  },
  {
    id: 'hero',
    title: 'Hero Sections',
    description: 'Multiple hero variants — centered, split, full-screen, and more.',
    image: '/images/comp-hero.png',
    price: 'free',
    category: 'Layout',
    count: 8,
  },
  {
    id: 'cards',
    title: 'Feature Cards',
    description: 'Icon cards, stat cards, profile cards, and content cards with hover effects.',
    image: '/images/comp-cards.png',
    price: 14,
    category: 'Content',
    count: 12,
  },
]

export const designCategories = ['All', 'Journal', 'Blog'] as const
export const componentCategories = ['All', 'Navigation', 'Marketing', 'Layout', 'Content'] as const
