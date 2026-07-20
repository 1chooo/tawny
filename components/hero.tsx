'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/logo'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { BlurFade } from '@/components/ui/blur-fade'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { WordRotate } from '@/components/ui/word-rotate'

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-0 pt-0 pb-0 lg:overflow-visible lg:px-3 lg:pt-24 lg:pb-16">
      {/* Full-bleed paper texture background on mobile; desktop uses the mat frame below instead */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center lg:hidden"
        style={{ backgroundImage: "url('/images/paper-texture.png')" }}
      />

      {/* Aged-paper mat framing the card on larger screens, like a matted print */}
      <div
        className="relative w-full lg:mx-auto lg:max-w-6xl lg:rounded-[28px] lg:bg-cover lg:bg-center lg:p-5 lg:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]"
        style={{ backgroundImage: "url('/images/paper-texture.png')" }}
      >
        <div className="relative flex min-h-svh w-full flex-col overflow-hidden bg-black/55 lg:h-[640px] lg:min-h-0 lg:rounded-[20px] lg:bg-black">
          {/* Layered dark background gradient, warmed with a stronger tawny glow on mobile */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 15% 10%, rgba(198,144,92,0.32) 0%, transparent 65%), radial-gradient(ellipse 70% 55% at 88% 78%, rgba(198,144,92,0.22) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(198,144,92,0.08) 0%, transparent 70%)',
            }}
          />

          {/* Text legibility scrim — darkest behind copy on mobile; muted on desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-black/65 to-black/80 lg:from-transparent lg:via-transparent lg:to-transparent"
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

          {/* Main row: text column, with the owl graphic as an atmospheric layer */}
          <div className="relative z-10 flex flex-1">
            {/* Owl-head progression graphic — behind the copy on mobile, right column on desktop */}
            <div className="absolute inset-0 opacity-20 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[44%] lg:px-6 lg:py-8 lg:opacity-100">
              <Image
                src="/images/hero-owl-progression.png"
                alt="Four owl-head silhouettes rendered in increasing abstraction, from a solid shape to a dot pattern, wireframe mesh, and scattered particles"
                fill
                className="object-cover object-[72%_38%] lg:object-contain"
                priority
              />
            </div>

            {/* Text column */}
            <div className="relative z-10 flex w-full flex-col justify-center px-6 py-14 sm:px-10 md:px-12 lg:w-[56%] lg:px-14 lg:py-0">
              <BlurFade delay={0.1} duration={0.5}>
                <div className="mb-8 flex items-center gap-2.5">
                  <Logo className="h-7 w-7 rounded-full" />
                  <span className="font-serif text-2xl italic tracking-tight text-foreground">
                    Tawny
                  </span>
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
