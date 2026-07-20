import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { DesignShowcaseRow } from '@/components/landing/design-showcase-row'
import { BlurFade } from '@/components/ui/blur-fade'
import { designs } from '@/lib/data'

const MAX_FEATURED = 3
const featuredDesigns = designs.filter((d) => d.featured).slice(0, MAX_FEATURED)

/**
 * Landing “Web Designs” teaser — section header + up to 3 alternating
 * describe/demo rows with inert product previews.
 */
export function DesignsShowcase() {
  if (featuredDesigns.length === 0) return null

  return (
    <section className="relative px-6 py-20">
      <div className="relative z-10 mx-auto max-w-7xl">
        <BlurFade delay={0.05} inView>
          <div className="mb-14 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Web Designs
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground">
                Design showcases
              </h2>
            </div>
            <Link
              href="/designs"
              className="hidden shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              View all designs
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </BlurFade>

        <div className="flex flex-col gap-20">
          {featuredDesigns.map((design, index) => (
            <DesignShowcaseRow key={design.id} design={design} index={index} />
          ))}
        </div>

        <BlurFade delay={0.1} inView className="mt-10 sm:hidden">
          <Link
            href="/designs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all designs
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </BlurFade>
      </div>
    </section>
  )
}
