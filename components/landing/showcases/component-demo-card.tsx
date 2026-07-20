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
 */
export function ComponentDemoCard({
  demo,
  index,
  className,
}: ComponentDemoCardProps) {
  return (
    <BlurFade delay={0.06 + index * 0.05} inView className={className}>
      <article className="flex h-full flex-col gap-3">
        <ProductFrame
          title={demo.frameTitle}
          contentClassName={cn('overflow-hidden', demo.contentClassName)}
        >
          {demo.render()}
        </ProductFrame>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {demo.category}
          </p>
          <h3 className="mt-1 text-sm font-medium text-foreground">
            {demo.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {demo.description}
          </p>
        </div>
      </article>
    </BlurFade>
  )
}
