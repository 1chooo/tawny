export interface Design {
  id: string
  title: string
  description: string
  category: string
  image: string
  price: number | 'free'
  tags: string[]
  featured?: boolean
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
    id: 'saas-dashboard',
    title: 'SaaS Dashboard',
    description: 'A complete analytics dashboard with charts, metrics, and a sidebar navigation.',
    category: 'Dashboard',
    image: '/images/preview-saas.png',
    price: 49,
    tags: ['Next.js', 'Tailwind', 'Charts'],
    featured: true,
  },
  {
    id: 'ecommerce-store',
    title: 'E-Commerce Store',
    description: 'Modern product listing and detail pages with cart and checkout flow.',
    category: 'E-Commerce',
    image: '/images/preview-ecommerce.png',
    price: 39,
    tags: ['React', 'Tailwind'],
  },
  {
    id: 'portfolio-site',
    title: 'Creative Portfolio',
    description: 'A bold, dark portfolio for creatives with project case studies.',
    category: 'Portfolio',
    image: '/images/preview-portfolio.png',
    price: 'free',
    tags: ['Next.js', 'Framer Motion'],
  },
  {
    id: 'startup-landing',
    title: 'Startup Landing Page',
    description: 'Clean hero, feature grid, pricing, and FAQ sections.',
    category: 'Landing Page',
    image: '/images/preview-landing.png',
    price: 'free',
    tags: ['React', 'Tailwind'],
    featured: true,
  },
  {
    id: 'editorial-blog',
    title: 'Editorial Blog',
    description: 'A beautiful reading experience with featured posts and category navigation.',
    category: 'Blog',
    image: '/images/preview-blog.png',
    price: 29,
    tags: ['Next.js', 'MDX'],
  },
  {
    id: 'agency-site',
    title: 'Creative Agency',
    description: 'A dramatic, full-screen agency site with scroll animations.',
    category: 'Agency',
    image: '/images/preview-agency.png',
    price: 59,
    tags: ['Next.js', 'GSAP'],
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

export const designCategories = ['All', 'Dashboard', 'E-Commerce', 'Portfolio', 'Landing Page', 'Blog', 'Agency'] as const
export const componentCategories = ['All', 'Navigation', 'Marketing', 'Layout', 'Content'] as const
