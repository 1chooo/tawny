import Link from 'next/link'
import { ArrowUpRight, Lock } from 'lucide-react'
import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import { ArtPreviewMock } from '@/components/landing/art-preview-mock'
import { ProductFrame } from '@/components/product-frame'
import { BlurFade } from '@/components/ui/blur-fade'
import { designs } from '@/lib/data'

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-art-serif-display',
})

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-art-sans-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-art-mono',
})

const art = designs.find((d) => d.id === 'art') ?? designs[0]

function PriceBadge({ price }: { price: number | 'free' }) {
  if (price === 'free') {
    return (
      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60">
        Free
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60">
      <Lock size={8} />
      ${price}
    </span>
  )
}

/**
 * Landing “Web Designs” teaser — 1/3 intro + 2/3 inert Art product preview.
 */
export function DesignsShowcase() {
  if (!art) return null

  return (
    <section className="relative px-6 py-20">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ── 1/3 intro ───────────────────────────────────── */}
          <BlurFade delay={0.05} inView className="lg:col-span-4">
            <div className="max-w-md lg:max-w-none">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Web Designs
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl">
                {art.title}
              </h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                {art.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <PriceBadge price={art.price} />
                {art.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/8 bg-white/3 px-2.5 py-0.5 text-[11px] text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={art.demoPath}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-85"
                >
                  Open live demo
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
                <Link
                  href="/designs"
                  className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  View all designs
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </BlurFade>

          {/* ── 2/3 product preview ─────────────────────────── */}
          <BlurFade delay={0.12} inView className="lg:col-span-8">
            <ProductFrame
              title="designs/art"
              fade
              contentClassName="h-[min(520px,70vh)] overflow-hidden bg-black"
            >
              <div
                className={`${display.variable} ${sans.variable} ${mono.variable} ${sans.className} h-full font-(family-name:--font-art-sans-body)`}
              >
                <ArtPreviewMock className="h-full" />
              </div>
            </ProductFrame>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
