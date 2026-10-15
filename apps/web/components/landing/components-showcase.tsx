import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ComponentDemoCard } from '@/components/landing/showcases/component-demo-card'
import {
  getComponentDemo,
  type ComponentDemo,
} from '@/components/landing/showcases'
import { BlurFade } from '@tawny/ui/components/blur-fade'

/** Product components first, then the headers and primitives. Each card is a scaled 16:9 frame. */
const HOME_IDS = [
  'issue-list',
  'route-sheet',
  'talent-drop',
  'status-select',
  'tawny-header',
  'art-header',
  'dev-header',
  'motion',
  'effects',
] as const

function homeDemos(): ComponentDemo[] {
  return HOME_IDS.flatMap((id) => {
    const demo = getComponentDemo(id)
    return demo ? [demo] : []
  })
}

/**
 * Landing teaser. Previews use each demo's scaled desktop canvas inside a
 * shared 16:9 frame, so adding cards does not change the ratio.
 */
export function ComponentsShowcase() {
  const demos = homeDemos()

  return (
    <section className="relative border-t border-border py-20">
      <div className="relative z-10 mx-auto w-full max-w-340 px-6">
        <BlurFade delay={0.05} inView>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                UI Components
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground">
                Desktop previews
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Lists, routes, the status select, and the headers. Every card
                is a desktop canvas scaled into a 16:9 frame. Open one for the
                source.
              </p>
            </div>
            <Link
              href="/components"
              className="hidden shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              View all <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo, i) => (
            <ComponentDemoCard key={demo.id} demo={demo} index={i} />
          ))}
        </div>

        <BlurFade delay={0.1} inView className="mt-10 sm:hidden">
          <Link
            href="/components"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all components
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </BlurFade>
      </div>
    </section>
  )
}
