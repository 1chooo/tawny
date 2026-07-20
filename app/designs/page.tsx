import Link from 'next/link'
import { Suspense } from 'react'
import { DesignShowcaseRow } from '@/components/landing/design-showcase-row'
import { DesignsSearch } from '@/components/designs/designs-search'
import { BlurFade } from '@/components/ui/blur-fade'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { designs, designCategories } from '@/lib/data'
import { cn } from '@/lib/utils'

type SearchParams = Promise<{ category?: string; q?: string }>

function designsQueryString(parts: { category?: string; q?: string }) {
  const p = new URLSearchParams()
  if (parts.category && parts.category !== 'All') {
    p.set('category', parts.category)
  }
  if (parts.q?.trim()) p.set('q', parts.q.trim())
  const s = p.toString()
  return s ? `?${s}` : ''
}

export default async function DesignsPage(props: {
  searchParams: SearchParams
}) {
  const sp = await props.searchParams
  const categoryParam =
    typeof sp.category === 'string' ? sp.category : undefined
  const qParam = typeof sp.q === 'string' ? sp.q : undefined

  const activeCategory =
    categoryParam &&
    designCategories.includes(
      categoryParam as (typeof designCategories)[number],
    )
      ? categoryParam
      : 'All'

  const qLower = qParam?.trim().toLowerCase() ?? ''

  const filtered = designs.filter((design) => {
    if (activeCategory !== 'All' && design.category !== activeCategory) {
      return false
    }
    if (!qLower) return true
    const haystack =
      `${design.title} ${design.description} ${design.category} ${design.tags.join(' ')}`.toLowerCase()
    return haystack.includes(qLower)
  })

  const currentQ = qParam?.trim() ?? ''

  return (
    <div className="relative min-h-screen px-6 pt-28 pb-24">
      <NoiseTexture opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <BlurFade delay={0.05}>
          <div className="mb-10">
            <p className="mb-3 text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
              Web Designs
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl">
              Design showcases
            </h1>
            <p className="mt-3 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Explore live design demos hosted inside Tawny — open a showcase and
              navigate within it.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.1}>
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by category"
            >
              {designCategories.map((cat) => {
                const href = `/designs${designsQueryString({
                  category: cat === 'All' ? undefined : cat,
                  q: currentQ || undefined,
                })}`
                const isActive = activeCategory === cat
                return (
                  <Link
                    key={cat}
                    href={href}
                    scroll={false}
                    className={cn(
                      'rounded-full px-3.5 py-1.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-foreground text-background'
                        : 'border border-white/8 bg-white/3 text-muted-foreground hover:border-white/15 hover:text-foreground',
                    )}
                  >
                    {cat}
                  </Link>
                )
              })}
            </div>

            <Suspense
              fallback={
                <div className="h-9 w-full max-w-xs rounded-full border border-white/8 bg-white/3 sm:w-xs" />
              }
            >
              <DesignsSearch initialQuery={currentQ} />
            </Suspense>
          </div>
        </BlurFade>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No designs match
            {currentQ ? (
              <>
                {' '}
                “<span className="text-foreground">{currentQ}</span>”
              </>
            ) : null}
            {activeCategory !== 'All' ? (
              <>
                {' '}
                in <span className="text-foreground">{activeCategory}</span>
              </>
            ) : null}
            .{' '}
            <Link
              href="/designs"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Clear filters
            </Link>
          </p>
        ) : (
          <div className="flex flex-col gap-20">
            {filtered.map((design, index) => (
              <DesignShowcaseRow
                key={design.id}
                design={design}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
