import Link from 'next/link'
import { Suspense } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DesignShowcaseRow } from '@/components/landing/design-showcase-row'
import { DesignsSearch } from '@/components/designs/designs-search'
import { BlurFade } from '@tawny/ui/components/blur-fade'
import { NoiseTexture } from '@tawny/ui/components/noise-texture'
import { designs, designCategories } from '@/lib/data'
import { cn } from '@tawny/ui/lib/utils'

const PAGE_SIZE = 3

type SearchParams = Promise<{
  category?: string
  q?: string
  page?: string
}>

function designsQueryString(parts: {
  category?: string
  q?: string
  page?: number
}) {
  const p = new URLSearchParams()
  if (parts.category && parts.category !== 'All') {
    p.set('category', parts.category)
  }
  if (parts.q?.trim()) p.set('q', parts.q.trim())
  if (parts.page && parts.page > 1) p.set('page', String(parts.page))
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
  const pageParam = typeof sp.page === 'string' ? sp.page : undefined

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
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const requestedPage = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1)
  const page = Math.min(requestedPage, totalPages)
  const pageItems = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  )

  const filterBase = {
    category: activeCategory === 'All' ? undefined : activeCategory,
    q: currentQ || undefined,
  }

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
          <>
            <div className="flex flex-col gap-20">
              {pageItems.map((design, index) => (
                <DesignShowcaseRow
                  key={design.id}
                  design={design}
                  index={index}
                />
              ))}
            </div>

            {totalPages > 1 ? (
              <nav
                className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
                aria-label="Designs pagination"
              >
                <p className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                  <span className="mx-1.5 text-white/20">·</span>
                  {filtered.length} design{filtered.length === 1 ? '' : 's'}
                </p>

                <div className="flex items-center gap-1">
                  <Link
                    href={`/designs${designsQueryString({
                      ...filterBase,
                      page: page - 1,
                    })}`}
                    aria-disabled={page <= 1}
                    tabIndex={page <= 1 ? -1 : undefined}
                    className={cn(
                      'inline-flex size-9 items-center justify-center rounded-full border border-white/8 text-muted-foreground transition-colors',
                      page <= 1
                        ? 'pointer-events-none opacity-40'
                        : 'hover:border-white/15 hover:text-foreground',
                    )}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                  </Link>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => (
                      <Link
                        key={n}
                        href={`/designs${designsQueryString({
                          ...filterBase,
                          page: n,
                        })}`}
                        aria-current={n === page ? 'page' : undefined}
                        className={cn(
                          'inline-flex size-9 items-center justify-center rounded-full text-sm font-medium transition-colors',
                          n === page
                            ? 'bg-foreground text-background'
                            : 'border border-white/8 text-muted-foreground hover:border-white/15 hover:text-foreground',
                        )}
                      >
                        {n}
                      </Link>
                    ),
                  )}

                  <Link
                    href={`/designs${designsQueryString({
                      ...filterBase,
                      page: page + 1,
                    })}`}
                    aria-disabled={page >= totalPages}
                    tabIndex={page >= totalPages ? -1 : undefined}
                    className={cn(
                      'inline-flex size-9 items-center justify-center rounded-full border border-white/8 text-muted-foreground transition-colors',
                      page >= totalPages
                        ? 'pointer-events-none opacity-40'
                        : 'hover:border-white/15 hover:text-foreground',
                    )}
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </nav>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
