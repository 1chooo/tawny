import Link from 'next/link'
import { ArrowUpRight, Lock } from 'lucide-react'
import {
  DesignPreview,
  designPreviewBg,
} from '@/components/landing/design-preview'
import { ProductFrame } from '@/components/product-frame'
import { BlurFade } from '@tawny/ui/components/blur-fade'
import type { Design } from '@/lib/data'
import { cn } from '@tawny/ui/lib/utils'

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

type DesignShowcaseRowProps = {
  design: Design
  index: number
  /** Optional secondary link under the primary CTA (e.g. “View all designs”). */
  secondaryCta?: { href: string; label: string }
  /** When true, odd rows put the preview on the left on desktop. */
  alternate?: boolean
}

/**
 * 1/3 intro + 2/3 ProductFrame inert preview — shared by landing and `/designs`.
 */
export function DesignShowcaseRow({
  design,
  index,
  secondaryCta,
  alternate = true,
}: DesignShowcaseRowProps) {
  const demoFirst = alternate && index % 2 === 1

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <BlurFade
        delay={0.05 + index * 0.04}
        inView
        className={cn('lg:col-span-4', demoFirst && 'lg:order-2')}
      >
        <div className="max-w-md lg:max-w-none">
          <p className="mb-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            {design.category}
          </p>
          <h3 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl">
            {design.title}
          </h3>
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
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {secondaryCta.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </BlurFade>

      <BlurFade
        delay={0.12 + index * 0.04}
        inView
        className={cn('lg:col-span-8', demoFirst && 'lg:order-1')}
      >
        <ProductFrame
          title={`designs/${design.id}`}
          fade
          contentClassName={cn(
            'aspect-[1440/900] overflow-hidden md:aspect-auto md:h-[min(520px,70vh)]',
            designPreviewBg(design.id),
          )}
        >
          {design.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={design.thumbnail}
              alt={`${design.title} design preview`}
              className="h-full w-full object-cover"
            />
          ) : (
            <DesignPreview id={design.id} />
          )}
        </ProductFrame>
      </BlurFade>
    </div>
  )
}
