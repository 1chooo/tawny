import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProductFrame } from '@/components/product-frame'
import type { ComponentDemo } from '@/components/landing/showcases'
import { BlurFade } from '@/components/ui/blur-fade'
import { cn } from '@/lib/utils'

type ComponentDemoCardProps = {
  demo: ComponentDemo
  index: number
  className?: string
}

/**
 * Shared ProductFrame card used by the landing teaser and /components gallery.
 * Links to the component detail page for live preview + copyable source.
 */
export function ComponentDemoCard({
  demo,
  index,
  className,
}: ComponentDemoCardProps) {
  return (
    <BlurFade delay={0.06 + index * 0.05} inView className={className}>
      <Link
        href={`/components/${demo.id}`}
        className="group flex h-full flex-col gap-3 rounded-xl outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <div className="rounded-xl ring-1 ring-transparent transition-[box-shadow,ring-color] duration-200 group-hover:ring-white/15">
          <ProductFrame
            title={demo.frameTitle}
            contentClassName={cn('overflow-hidden', demo.contentClassName)}
          >
            {demo.render()}
          </ProductFrame>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {demo.category}
            </p>
            <h3 className="mt-1 text-sm font-medium text-foreground transition-colors group-hover:text-white">
              {demo.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {demo.description}
            </p>
          </div>
          <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
            Code
            <ArrowUpRight
              size={12}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </BlurFade>
  )
}
