'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { uiComponents, componentCategories, type UIComponent } from '@/lib/data'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { ShimmerButton } from '@/components/ui/shimmer-button'

function PriceBadge({ price }: { price: number | 'free' }) {
  if (price === 'free') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/60">
        Free
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/60">
      <Lock size={9} />
      ${price}
    </span>
  )
}

function ComponentCard({ comp, index }: { comp: UIComponent; index: number }) {
  const isFree = comp.price === 'free'

  return (
    <BlurFade delay={index * 0.07} inView>
      <article className="group relative flex flex-col rounded-xl overflow-hidden border border-white/8 bg-white/[0.03] hover:border-white/15 transition-all duration-200">
        {!isFree && <BorderBeam size={120} duration={14} delay={index * 1.5} colorFrom="rgba(255,255,255,0.35)" colorTo="transparent" />}

        {/* Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-white/5">
          <Image src={comp.image} alt={comp.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" />
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-xs font-medium text-white/70 border border-white/10">
            {comp.count} variants
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wide">{comp.category}</span>
              <h3 className="font-medium text-foreground leading-snug">{comp.title}</h3>
            </div>
            <PriceBadge price={comp.price} />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">{comp.description}</p>
          <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{isFree ? 'No credit card needed' : 'One-time purchase'}</span>
            <button className={cn('inline-flex items-center gap-1.5 text-sm font-medium transition-colors', isFree ? 'text-foreground/70 hover:text-foreground' : 'text-foreground/70 hover:text-foreground')}>
              {isFree ? 'Get free' : 'Buy now'}
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </article>
    </BlurFade>
  )
}

export default function ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered = activeCategory === 'All' ? uiComponents : uiComponents.filter((c) => c.category === activeCategory)

  return (
    <div className="relative min-h-screen px-6 pt-28 pb-24">
      <NoiseTexture opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <BlurFade delay={0.05}>
          <div className="mb-12">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.15em] mb-3">UI Components</p>
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl text-balance">
              Reusable building blocks
            </h1>
            <p className="mt-3 text-muted-foreground max-w-lg text-pretty leading-relaxed">
              Drop-in components designed to work with any layout. Free and premium options available.
            </p>
          </div>
        </BlurFade>

        {/* Category filter */}
        <BlurFade delay={0.12}>
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
            {componentCategories.map((cat) => (
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
        </BlurFade>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((comp, i) => (
            <ComponentCard key={comp.id} comp={comp} index={i} />
          ))}
        </div>

        {/* Bundle CTA */}
        <BlurFade delay={0.2} inView>
          <div className="relative mt-16 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-8 md:p-12">
            <NoiseTexture opacity={0.04} />
            <BorderBeam size={300} duration={16} colorFrom="rgba(255,255,255,0.3)" colorTo="transparent" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">Get everything in one bundle</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md leading-relaxed">
                  All 40+ designs and 120+ components at a single price. Lifetime access with future updates included.
                </p>
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground line-through">$249</p>
                  <p className="text-2xl font-semibold text-foreground tracking-tight">$99</p>
                </div>
                <Link href="/pricing">
                  <ShimmerButton background="rgba(255,255,255,1)" shimmerColor="rgba(0,0,0,0.12)" className="!text-black text-sm">
                    Get bundle
                    <ArrowUpRight size={14} />
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  )
}
