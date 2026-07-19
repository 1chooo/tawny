'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LayoutGrid, List, Columns2, ArrowUpRight, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

type LayoutMode = 'grid' | 'list' | 'masonry'

interface Design {
  id: string
  title: string
  description: string
  category: string
  image: string
  price: number | 'free'
  tags: string[]
  featured?: boolean
}

const designs: Design[] = [
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

const categories = ['All', 'Dashboard', 'E-Commerce', 'Portfolio', 'Landing Page', 'Blog', 'Agency']

const layoutIcons = [
  { mode: 'grid' as LayoutMode, icon: LayoutGrid, label: 'Grid layout' },
  { mode: 'masonry' as LayoutMode, icon: Columns2, label: 'Masonry layout' },
  { mode: 'list' as LayoutMode, icon: List, label: 'List layout' },
]

function PriceBadge({ price }: { price: number | 'free' }) {
  if (price === 'free') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
        Free
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-muted text-brand border border-brand/20">
      <Lock size={9} />
      ${price}
    </span>
  )
}

function DesignCard({ design, layout }: { design: Design; layout: LayoutMode }) {
  if (layout === 'list') {
    return (
      <article className="group flex gap-5 items-start p-4 rounded-xl border border-border bg-card hover:border-foreground/20 hover:shadow-sm transition-all duration-200">
        <div className="relative shrink-0 w-28 h-20 rounded-lg overflow-hidden bg-muted">
          <Image
            src={design.image}
            alt={design.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{design.category}</p>
              <h3 className="font-semibold text-foreground leading-tight">{design.title}</h3>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <PriceBadge price={design.price} />
              <button
                aria-label={`Open ${design.title}`}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-1">
            {design.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {design.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group relative rounded-xl overflow-hidden border border-border bg-card hover:border-foreground/20 hover:shadow-md transition-all duration-200">
      {/* Image */}
      <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden">
        <Image
          src={design.image}
          alt={design.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-background/95 text-foreground text-xs font-medium shadow-sm">
            Preview <ArrowUpRight size={12} />
          </span>
        </div>
        {/* Featured badge */}
        {design.featured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md bg-foreground text-background">
            Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">{design.category}</p>
            <h3 className="font-semibold text-foreground leading-tight">{design.title}</h3>
          </div>
          <PriceBadge price={design.price} />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {design.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {design.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function DesignsShowcase() {
  const [layout, setLayout] = useState<LayoutMode>('grid')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? designs
      : designs.filter((d) => d.category === activeCategory)

  return (
    <section id="designs" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs text-brand font-semibold uppercase tracking-widest mb-2">Web Designs</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
              Ready-to-launch templates
            </h2>
            <p className="mt-2 text-muted-foreground text-balance">
              Pick a layout that fits your workflow — grid, masonry, or list view.
            </p>
          </div>

          {/* Layout switcher */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary border border-border shrink-0">
            {layoutIcons.map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                aria-label={label}
                onClick={() => setLayout(mode)}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground transition-all',
                  layout === mode
                    ? 'bg-background text-foreground shadow-sm'
                    : 'hover:text-foreground'
                )}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all',
                activeCategory === cat
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted border border-border'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid / Masonry / List */}
        {layout === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((design) => (
              <DesignCard key={design.id} design={design} layout="grid" />
            ))}
          </div>
        )}

        {layout === 'masonry' && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((design, i) => (
              <div
                key={design.id}
                className={cn('break-inside-avoid', i % 3 === 1 && 'mt-8')}
              >
                <DesignCard design={design} layout="masonry" />
              </div>
            ))}
          </div>
        )}

        {layout === 'list' && (
          <div className="flex flex-col gap-3">
            {filtered.map((design) => (
              <DesignCard key={design.id} design={design} layout="list" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
