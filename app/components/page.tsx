import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ComponentDemoCard } from '@/components/landing/showcases/component-demo-card'
import { componentDemos } from '@/components/landing/showcases'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { ShimmerButton } from '@/components/ui/shimmer-button'

export default function ComponentsPage() {
  return (
    <div className="relative min-h-screen px-6 pb-24 pt-28">
      <NoiseTexture opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <BlurFade delay={0.05}>
          <div className="mb-12">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              UI Components
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl">
              Headers and building blocks
            </h1>
            <p className="mt-3 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Live demos of navigation patterns and motion primitives. Open any
              card to preview and copy the source.
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
                  Explore the Art and Dev showcases, then grab the full bundle for
                  commercial use and lifetime updates.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/designs"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-white/25 hover:text-foreground"
                >
                  Browse designs
                  <ArrowUpRight size={14} />
                </Link>
                <Link href="/pricing">
                  <ShimmerButton
                    background="rgba(255,255,255,1)"
                    shimmerColor="rgba(0,0,0,0.12)"
                    className="text-sm text-black!"
                  >
                    View pricing
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
