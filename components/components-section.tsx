import Image from 'next/image'
import { ArrowUpRight, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UIComponent {
  id: string
  title: string
  description: string
  image: string
  price: number | 'free'
  category: string
  count: number
}

const uiComponents: UIComponent[] = [
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

function ComponentCard({ comp }: { comp: UIComponent }) {
  const isFree = comp.price === 'free'

  return (
    <article className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground/25 hover:shadow-lg transition-all duration-200">
      {/* Image area */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={comp.image}
          alt={comp.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        {/* Count badge */}
        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground border border-border">
          {comp.count} variants
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-[11px] text-muted-foreground uppercase tracking-wide">{comp.category}</span>
            <h3 className="font-semibold text-foreground leading-snug">{comp.title}</h3>
          </div>
          {isFree ? (
            <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
              Free
            </span>
          ) : (
            <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-muted text-brand border border-brand/20">
              <Lock size={9} />
              ${comp.price}
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{comp.description}</p>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {isFree ? 'No credit card required' : 'One-time purchase'}
          </span>
          <button
            className={cn(
              'inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
              isFree
                ? 'text-foreground hover:text-brand'
                : 'text-brand hover:text-brand/80'
            )}
          >
            {isFree ? 'Get free' : 'Buy now'}
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </article>
  )
}

export function ComponentsSection() {
  return (
    <section id="components" className="py-20 px-6 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs text-brand font-semibold uppercase tracking-widest mb-2">UI Components</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
              Reusable building blocks
            </h2>
            <p className="mt-2 text-muted-foreground max-w-md text-pretty">
              Drop-in components designed to work with any layout. Free and premium options available.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            View all components <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Components grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {uiComponents.map((comp) => (
            <ComponentCard key={comp.id} comp={comp} />
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-14 rounded-2xl bg-foreground text-background p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold leading-snug">Get everything in one bundle</h3>
            <p className="mt-1.5 text-background/70 text-sm max-w-md">
              All 40+ designs and 120+ components at a single price. Lifetime access with future updates included.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <p className="text-xs text-background/50 line-through">$249</p>
              <p className="text-2xl font-bold">$99</p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-brand text-brand-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get bundle <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
