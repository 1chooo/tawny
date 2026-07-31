import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'
import {
  DesignPreview,
  designPreviewBg,
} from '@/components/landing/design-preview'
import { DemoWindow } from '@/components/landing/demo-window'
import { NoiseTexture } from '@tawny/ui/components/noise-texture'
import type { Design } from '@/lib/data'

function PriceBadge({ price }: { price: number | 'free' }) {
  if (price === 'free') {
    return (
      <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
        Free
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
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
  /**
   * When true, odd rows mirror Chat (window left, copy right).
   * Even rows match Holdings (copy left, oversized window crop right).
   */
  alternate?: boolean
}

/**
 * JustHold Holdings/Chat–style feature band: 1/3 copy + 2/3 noise panel
 * with a scaled design window. Shared by landing and `/designs`.
 */
export function DesignShowcaseRow({
  design,
  index,
  secondaryCta,
  alternate = true,
}: DesignShowcaseRowProps) {
  const mirror = alternate && index % 2 === 1

  const copy = (
    <>
      <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {design.category}
      </p>
      <h3 className="font-sans text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {design.title}
      </h3>
      <p className="text-sm text-muted-foreground md:text-base">
        {design.description}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <PriceBadge price={design.price} />
        {design.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-muted/30 px-2.5 py-0.5 text-[11px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={design.demoPath}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-tawny transition-opacity hover:opacity-80"
        >
          Open live demo
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </Link>
        {secondaryCta ? (
          <Link
            href={secondaryCta.href}
            className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {secondaryCta.label}
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </>
  )

  const window = (
    <DemoWindow
      title={`designs/${design.id}`}
      active
      className="h-full w-full"
      contentClassName={designPreviewBg(design.id)}
    >
      <DesignPreview id={design.id} className="h-full" />
    </DemoWindow>
  )

  return (
    <div className="relative mx-auto min-h-112 w-full overflow-hidden rounded-xs border border-border bg-card md:aspect-16/10 md:min-h-0 md:max-h-176">
      <div className="flex h-full min-h-112 flex-col md:absolute md:inset-0 md:min-h-0 md:grid md:grid-cols-3">
        {mirror ? (
          <>
            {/* Chat mirror: copy first in DOM for mobile stack; right column on md+ */}
            <div className="flex flex-col justify-center gap-4 p-8 md:col-span-1 md:col-start-3 md:row-start-1 md:p-10 lg:p-12">
              {copy}
            </div>
            <div className="relative flex min-h-72 flex-1 items-center justify-center overflow-hidden border-t border-border p-5 sm:p-6 md:col-span-2 md:col-start-1 md:row-start-1 md:h-full md:min-h-0 md:border-t-0 md:border-r md:p-8">
              <NoiseTexture opacity={0.45} className="absolute inset-0" />
              {/* Mobile: width-driven 16:9. md+: height-fit so the whole window stays visible. */}
              <div className="relative z-10 aspect-video w-full shadow-2xl md:h-full md:w-auto md:max-w-full">
                {window}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Holdings: copy left, oversized 16:9 window crop right */}
            <div className="flex flex-col justify-center gap-4 p-8 md:col-span-1 md:p-10 lg:p-12">
              {copy}
            </div>
            <div className="relative min-h-72 flex-1 overflow-hidden border-t border-border md:col-span-2 md:min-h-0 md:border-t-0 md:border-l">
              <NoiseTexture opacity={0.45} className="absolute inset-0" />
              <div className="absolute top-[8%] left-[8%] aspect-video w-[118%] shadow-2xl md:top-1/2 md:left-[6%] md:w-[125%] md:-translate-y-1/2">
                {window}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
