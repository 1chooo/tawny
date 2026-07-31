import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ComponentDemoCard } from '@/components/landing/showcases/component-demo-card'
import { componentDemos } from '@/components/landing/showcases'
import { BlurFade } from '@tawny/ui/components/blur-fade'
import { BorderBeam } from '@tawny/ui/components/border-beam'
import { NoiseTexture } from '@tawny/ui/components/noise-texture'

export default function ComponentsPage() {
  return (
    <div className="min-w-0 flex-1 py-2 pb-16">
      <BlurFade delay={0.05}>
        <div className="mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            UI Components
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl">
            Headers and building blocks
          </h1>
          <p className="mt-3 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Live demos of navigation patterns and motion primitives. Pick any
            entry in the sidebar, or open a card below, to preview and copy
            the source.
          </p>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {componentDemos.map((demo, i) => (
          <ComponentDemoCard key={demo.id} demo={demo} index={i} />
        ))}
      </div>

      <BlurFade delay={0.2} inView>
        <div className="relative mt-16 overflow-hidden rounded-2xl border border-white/8 bg-white/3 p-8 md:p-12">
          <NoiseTexture opacity={0.04} />
          <BorderBeam
            size={300}
            duration={16}
            colorFrom="rgba(255,255,255,0.3)"
            colorTo="transparent"
          />
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                Pair them with live designs
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Explore the Art and Dev showcases to see these building blocks
                in full product contexts.
              </p>
            </div>
            <Link
              href="/designs"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-tawny px-6 py-2.5 text-sm font-medium text-tawny-foreground transition-opacity hover:opacity-90"
            >
              Browse designs
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </BlurFade>
    </div>
  )
}
