'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LayoutGrid, List, Columns2, ArrowUpRight, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { designs, designCategories, type Design } from '@/lib/data'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { NoiseTexture } from '@/components/ui/noise-texture'

type LayoutMode = 'grid' | 'masonry' | 'list'

const layoutIcons = [
  { mode: 'grid' as LayoutMode, icon: LayoutGrid, label: 'Grid layout' },
  { mode: 'masonry' as LayoutMode, icon: Columns2, label: 'Masonry layout' },
  { mode: 'list' as LayoutMode, icon: List, label: 'List layout' },
]

function PriceBadge({ price }: { price: number | 'free' }) {
  if (price === 'free') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/70">
        Free
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/70">
      <Lock size={9} />
      ${price}
    </span>
  )
}

function DesignCard({ design, layout, index }: { design: Design; layout: LayoutMode; index: number }) {
  const isFeatured = design.featured

  if (layout === 'list') {
    return (
      <BlurFade delay={index * 0.05} inView>
        <Link href={design.demoPath} className="block">
          <article className="group relative flex gap-5 items-start p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-200">
            <div className="relative shrink-0 w-32 h-20 rounded-lg overflow-hidden bg-white/5">
              <Image src={design.image} alt={design.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1 uppercase tracking-wide">{design.category}</p>
                  <h3 className="font-medium text-foreground leading-tight">{design.title}</h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <PriceBadge price={design.price} />
                  <span aria-hidden className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-white/20 transition-colors">
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-1">{design.description}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {design.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground border border-white/8">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        </Link>
      </BlurFade>
    )
  }

  return (
    <BlurFade delay={index * 0.06} inView>
      <Link href={design.demoPath} className="block">
        <article className={cn('group relative rounded-xl overflow-hidden border border-white/8 bg-white/[0.03] hover:border-white/15 transition-all duration-200', isFeatured && 'border-white/12')}>
          {isFeatured && <BorderBeam size={140} duration={12} colorFrom="rgba(255,255,255,0.4)" colorTo="transparent" />}
          <div className="relative w-full aspect-[16/10] bg-white/5 overflow-hidden">
            <Image src={design.image} alt={design.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-medium border border-white/10">
                Open live demo <ArrowUpRight size={12} />
              </span>
            </div>
            {isFeatured && (
              <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-md bg-white text-black">
                Featured
              </span>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">{design.category}</p>
                <h3 className="font-medium text-foreground leading-tight">{design.title}</h3>
              </div>
              <PriceBadge price={design.price} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{design.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {design.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground border border-white/8">{tag}</span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </BlurFade>
  )
}

export default function DesignsPage() {
  const [layout, setLayout] = useState<LayoutMode>('grid')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered = activeCategory === 'All' ? designs : designs.filter((d) => d.category === activeCategory)

  return (
    <div className="relative min-h-screen px-6 pt-28 pb-24">
      <NoiseTexture opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Page header */}
        <BlurFade delay={0.05}>
          <div className="mb-12">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.15em] mb-3">Web Designs</p>
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl text-balance">
              Design showcases
            </h1>
            <p className="mt-3 text-muted-foreground max-w-lg text-pretty leading-relaxed">
              Explore live design demos hosted inside Tawny — open a showcase and navigate within it.
            </p>
          </div>
        </BlurFade>

        {/* Controls row */}
        <BlurFade delay={0.12}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {designCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all',
                    activeCategory === cat
                      ? 'bg-foreground text-background'
                      : 'border border-white/8 bg-white/[0.03] text-muted-foreground hover:text-foreground hover:border-white/15'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Layout switcher */}
            <div className="flex items-center gap-1 rounded-lg border border-white/8 bg-white/[0.03] p-1 shrink-0">
              {layoutIcons.map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  aria-label={label}
                  onClick={() => setLayout(mode)}
                  className={cn(
                    'flex w-8 h-8 items-center justify-center rounded-md text-muted-foreground transition-all',
                    layout === mode ? 'bg-white/10 text-foreground' : 'hover:text-foreground'
                  )}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Grid */}
        {layout === 'grid' && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((design, i) => <DesignCard key={design.id} design={design} layout="grid" index={i} />)}
          </div>
        )}

        {layout === 'masonry' && (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filtered.map((design, i) => (
              <div key={design.id} className={cn('mb-5 break-inside-avoid', i % 3 === 1 && 'mt-8')}>
                <DesignCard design={design} layout="masonry" index={i} />
              </div>
            ))}
          </div>
        )}

        {layout === 'list' && (
          <div className="flex flex-col gap-3">
            {filtered.map((design, i) => <DesignCard key={design.id} design={design} layout="list" index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
