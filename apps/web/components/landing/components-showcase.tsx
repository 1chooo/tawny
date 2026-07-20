import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ComponentDemoCard } from '@/components/landing/showcases/component-demo-card'
import { featuredComponentDemos } from '@/components/landing/showcases'
import { BlurFade } from '@tawny/ui/components/blur-fade'

/**
 * Landing “UI Components” teaser — live ProductFrame demos of headers and primitives.
 */
export function ComponentsShowcase() {
  return (
    <section className="relative border-t border-white/8 px-6 py-20">
      <div className="relative z-10 mx-auto max-w-7xl">
        <BlurFade delay={0.05} inView>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                UI Components
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground">
                Headers and building blocks
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Real navigation patterns and motion primitives — click any card
                to open the source and copy the code.
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
          {featuredComponentDemos.map((demo, i) => (
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
