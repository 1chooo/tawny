'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BlurFade } from '@/components/ui/blur-fade'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { NumberTicker } from '@/components/ui/number-ticker'
import { WordRotate } from '@/components/ui/word-rotate'

const stats = [
  { value: 40, suffix: '+', label: 'Designs' },
  { value: 120, suffix: '+', label: 'Components' },
  { value: 8, suffix: 'k+', label: 'Downloads' },
]

export function Hero() {
  return (
    <section className="relative flex min-h-[92dvh] flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-24">
      {/* Layered dark background gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,255,255,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,255,255,0.03) 0%, transparent 60%)',
        }}
      />

      {/* Subtle grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Noise texture overlay */}
      <NoiseTexture opacity={0.035} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">

        {/* Badge */}
        <BlurFade delay={0.1} duration={0.5}>
          <AnimatedGradientText className="mb-8">
            <Sparkles size={13} className="opacity-80" />
            Handcrafted web designs &amp; components
          </AnimatedGradientText>
        </BlurFade>

        {/* Headline */}
        <BlurFade delay={0.2} duration={0.55}>
          <h1 className="text-balance text-5xl font-semibold leading-[1.1] tracking-[-0.03em] text-foreground md:text-7xl lg:text-8xl">
            Designs that make
            <br />
            your{' '}
            <WordRotate
              words={['projects', 'product', 'startup', 'portfolio']}
              className="text-foreground/50"
              duration={2400}
            />{' '}
            ship.
          </h1>
        </BlurFade>

        {/* Sub-copy */}
        <BlurFade delay={0.32} duration={0.5}>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            A curated collection of premium web templates and reusable UI
            components. Free to explore, ready to ship.
          </p>
        </BlurFade>

        {/* CTAs */}
        <BlurFade delay={0.44} duration={0.5}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <ShimmerButton
              background="rgba(255,255,255,1)"
              shimmerColor="rgba(0,0,0,0.12)"
              className="px-7 py-3 text-sm font-medium !text-black"
              onClick={() => { window.location.href = '/designs' }}
            >
              Browse Designs
              <ArrowRight size={14} />
            </ShimmerButton>
            <Link
              href="/components"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-foreground/80 transition-colors hover:border-white/20 hover:text-foreground"
            >
              View Components
            </Link>
          </div>
        </BlurFade>

        {/* Stats */}
        <BlurFade delay={0.56} duration={0.5}>
          <div className="mt-20 flex items-center justify-center gap-14 md:gap-24">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <p className="text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl">
                  <NumberTicker value={stat.value} suffix={stat.suffix} delay={0.7} />
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </BlurFade>

        {/* Bottom fade divider */}
        <BlurFade delay={0.64} duration={0.5}>
          <div className="mt-16 flex w-full max-w-xs items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Selected Works
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
