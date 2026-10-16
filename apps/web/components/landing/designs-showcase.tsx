import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { DesignPins } from '@/components/designs/design-pins'
import { BlurFade } from '@tawny/ui/components/blur-fade'
import { pinnedDesigns } from '@/lib/data'

/**
 * Landing “Web Designs” teaser — section header plus the same pin band as
 * the designs catalog.
 */
export function DesignsShowcase() {
  const pinned = pinnedDesigns()
  if (pinned.length === 0) return null

  return (
    <section className="relative py-10 md:py-14">
      <div className="relative z-10 mx-auto w-full max-w-340 px-6">
        <BlurFade delay={0.05} inView>
          <div className="mb-10 flex items-end justify-between md:mb-12">
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

        <BlurFade delay={0.08} inView>
          <DesignPins designs={pinned} />
        </BlurFade>

        <BlurFade delay={0.1} inView className="sm:hidden">
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
