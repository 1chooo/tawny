import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Lock } from 'lucide-react'
import { Hero } from '@/components/hero'
import { DesignsShowcase } from '@/components/landing/designs-showcase'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { DottedMap } from '@/components/ui/dotted-map'
import { uiComponents } from '@/lib/data'

const ctaMarkers = [
  { lat: 37.7749, lng: -122.4194, size: 0.7 }, // San Francisco
  { lat: 40.7128, lng: -74.006, size: 0.7 }, // New York
  { lat: 51.5074, lng: -0.1278, size: 0.65 }, // London
  { lat: 35.6762, lng: 139.6503, size: 0.65 }, // Tokyo
]

const featuredComponents = uiComponents.slice(0, 4)

function PriceBadge({ price }: { price: number | 'free' }) {
  if (price === 'free') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border border-white/10 bg-white/5 text-white/60">
        Free
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border border-white/10 bg-white/5 text-white/60">
      <Lock size={8} />
      ${price}
    </span>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <DesignsShowcase />

      {/* ── Components teaser ───────────────────────────────── */}
      <section className="relative px-6 py-20 border-t border-white/8">
        <div className="relative z-10 mx-auto max-w-7xl">
          <BlurFade delay={0.05} inView>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.15em] mb-2">UI Components</p>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-foreground text-balance">
                  Reusable building blocks
                </h2>
              </div>
              <Link
                href="/components"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                View all <ArrowUpRight size={14} />
              </Link>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredComponents.map((comp, i) => (
              <BlurFade key={comp.id} delay={0.08 + i * 0.06} inView>
                <article className="group relative rounded-xl overflow-hidden border border-white/8 bg-white/[0.03] hover:border-white/15 transition-all duration-200">
                  {comp.price !== 'free' && <BorderBeam size={100} duration={14} delay={i * 1.5} colorFrom="rgba(255,255,255,0.3)" colorTo="transparent" />}
                  <div className="relative w-full aspect-[16/9] bg-white/5 overflow-hidden">
                    <Image src={comp.image} alt={comp.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[11px] text-white/60 border border-white/10">
                      {comp.count} variants
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-sm text-foreground leading-snug">{comp.title}</h3>
                      <PriceBadge price={comp.price} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">{comp.description}</p>
                  </div>
                </article>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-24 border-t border-white/8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70"
        >
          <DottedMap
            className="w-full min-w-full shrink-0"
            style={{ width: '100%', height: 'auto' }}
            dotColor="var(--tawny)"
            dotRadius={0.28}
            markerColor="var(--tawny)"
            pulse
            markers={ctaMarkers}
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 65% at 50% 50%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 42%, transparent 72%)',
          }}
        />
        <BlurFade delay={0.1} inView>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl text-balance">
              Get the full bundle at one price
            </h2>
            <p className="mt-4 text-white/75 max-w-md mx-auto leading-relaxed">
              40+ designs, 120+ components, Figma files, commercial license, and lifetime updates — all for a one-time fee.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-7 py-3 text-sm font-medium hover:opacity-85 transition-opacity"
              >
                View pricing <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/designs"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 hover:text-white hover:border-white/35 transition-all"
              >
                Browse designs
              </Link>
            </div>
          </div>
        </BlurFade>
      </section>
    </>
  )
}
