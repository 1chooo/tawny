'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    <section className="relative flex flex-col items-center justify-center px-3 pt-24 pb-16 sm:px-6 md:pt-28">
      {/* Aged-paper mat framing the card, like a matted print */}
      <div
        className="relative mx-auto w-full max-w-6xl rounded-[28px] bg-cover bg-center p-2.5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] sm:p-4 md:p-5"
        style={{ backgroundImage: "url('/images/paper-texture.png')" }}
      >
        <div className="relative flex min-h-[600px] w-full flex-col overflow-hidden rounded-[20px] bg-black lg:h-[640px]">
          {/* Layered dark background gradient, warmed with a tawny glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 12% 8%, rgba(198,144,92,0.16) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 92% 75%, rgba(198,144,92,0.10) 0%, transparent 60%)',
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

          {/* Main row: text left, owl graphic right */}
          <div className="relative z-10 flex flex-1 flex-col lg:flex-row">
            {/* Text column */}
            <div className="flex w-full flex-col justify-center px-6 py-14 sm:px-10 md:px-12 lg:w-[56%] lg:px-14 lg:py-0">
              <BlurFade delay={0.1} duration={0.5}>
                <AnimatedGradientText className="mx-0 mb-8">
                  <Sparkles size={13} className="opacity-80" />
                  Handcrafted web designs &amp; components
                </AnimatedGradientText>
              </BlurFade>

              <BlurFade delay={0.2} duration={0.55}>
                <h1 className="text-balance font-serif text-4xl leading-[1.08] tracking-[-0.01em] text-foreground sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl">
                  Designs that make
                  <br />
                  your{' '}
                  <WordRotate
                    words={['projects', 'product', 'startup', 'portfolio']}
                    className="italic text-tawny"
                    duration={2400}
                  />{' '}
                  ship.
                </h1>
              </BlurFade>

              <BlurFade delay={0.32} duration={0.5}>
                <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  A curated collection of premium web templates and reusable UI
                  components. Free to explore, ready to ship.
                </p>
              </BlurFade>

              <BlurFade delay={0.44} duration={0.5}>
                <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <ShimmerButton
                    background="var(--tawny)"
                    shimmerColor="rgba(255,255,255,0.35)"
                    className="px-7 py-3 text-sm font-medium text-tawny-foreground!"
                    onClick={() => { window.location.href = '/designs' }}
                  >
                    Browse Designs
                    <ArrowRight size={14} />
                  </ShimmerButton>
                  <Link
                    href="/components"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-foreground/80 transition-colors hover:border-tawny/40 hover:text-foreground"
                  >
                    View Components
                  </Link>
                </div>
              </BlurFade>

              <BlurFade delay={0.56} duration={0.5}>
                <div className="mt-16 flex items-center gap-10 md:gap-14">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-start gap-1">
                      <p className="text-2xl font-semibold tracking-[-0.03em] text-foreground md:text-3xl">
                        <NumberTicker value={stat.value} suffix={stat.suffix} delay={0.7} />
                      </p>
                      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </BlurFade>

              <BlurFade delay={0.64} duration={0.5}>
                <div className="mt-12 flex w-full max-w-xs items-center gap-4">
                  <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Selected Works
                  </span>
                </div>
              </BlurFade>
            </div>

            {/* Owl-head progression graphic */}
            <div className="relative aspect-video w-full px-6 pb-6 opacity-80 lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[44%] lg:px-6 lg:py-8 lg:opacity-100">
              <Image
                src="/images/hero-owl-progression.png"
                alt="Four owl-head silhouettes rendered in increasing abstraction, from a solid shape to a dot pattern, wireframe mesh, and scattered particles"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Footer wordmark, echoing the reference ad's logo placement */}
          <div className="relative z-10 flex items-center gap-2 px-6 pb-8 pt-2 sm:px-10 md:px-12 lg:px-14 lg:pb-10">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-tawny">
              <span className="h-1.5 w-1.5 rounded-full bg-tawny-foreground" />
            </span>
            <span className="font-serif text-lg italic tracking-tight text-foreground/90">
              Tawny
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
