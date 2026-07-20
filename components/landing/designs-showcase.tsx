import Link from 'next/link'
import { ArrowUpRight, Lock } from 'lucide-react'
import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import { ArtPreviewMock } from '@/components/landing/art-preview-mock'
import { DevPreviewMock } from '@/components/landing/dev-preview-mock'
import { ProductFrame } from '@/components/product-frame'
import { BlurFade } from '@/components/ui/blur-fade'
import { designs, type Design } from '@/lib/data'

const artDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-art-serif-display',
})

const artSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-art-sans-body',
})

const artMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-art-mono',
})

const devMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-dev-mono',
})

const featuredDesigns = designs.filter((d) => d.featured)

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

function FeaturedDesignRow({
  design,
  index,
}: {
  design: Design
  index: number
}) {
  const isArt = design.id === 'art'
  const isDev = design.id === 'dev'

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <BlurFade delay={0.05 + index * 0.04} inView className="lg:col-span-4">
        <div className="max-w-md lg:max-w-none">
          {index === 0 ? (
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Web Designs
            </p>
          ) : null}
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl">
            {design.title}
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {design.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <PriceBadge price={design.price} />
            {design.tags.map((tag) => (
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
              href={design.demoPath}
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

      <BlurFade delay={0.12 + index * 0.04} inView className="lg:col-span-8">
        <ProductFrame
          title={`designs/${design.id}`}
          fade
          contentClassName={
            isArt
              ? 'aspect-video overflow-hidden bg-black md:aspect-auto md:h-[min(520px,70vh)]'
              : 'aspect-video overflow-hidden bg-white md:aspect-auto md:h-[min(520px,70vh)] dark:bg-zinc-950'
          }
        >
          {isArt ? (
            <div
              className={`${artDisplay.variable} ${artSans.variable} ${artMono.variable} ${artSans.className} h-full font-(family-name:--font-art-sans-body)`}
            >
              <ArtPreviewMock className="h-full" />
            </div>
          ) : isDev ? (
            <div
              className={`${devMono.variable} ${devMono.className} h-full font-mono`}
            >
              <DevPreviewMock className="h-full" />
            </div>
          ) : null}
        </ProductFrame>
      </BlurFade>
    </div>
  )
}

/**
 * Landing “Web Designs” teaser — stacked 1/3 intro + 2/3 inert product previews.
 */
export function DesignsShowcase() {
  if (featuredDesigns.length === 0) return null

  return (
    <section className="relative px-6 py-20">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-20">
        {featuredDesigns.map((design, index) => (
          <FeaturedDesignRow key={design.id} design={design} index={index} />
        ))}
      </div>
    </section>
  )
}
