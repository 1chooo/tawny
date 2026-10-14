import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  DesignPreview,
  designPreviewBg,
} from '@/components/landing/design-preview'
import { DemoWindow } from '@/components/landing/demo-window'
import type { Design } from '@/lib/data'
import { cn } from '@tawny/ui/lib/utils'

/**
 * Blog-style design card. The cover is the live design window — interactive,
 * so it stays outside the title link.
 */
export function DesignPinCard({
  design,
  variant,
  className,
}: {
  design: Design
  variant: 'featured' | 'compact'
  className?: string
}) {
  const isFeatured = variant === 'featured'

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-xs border border-border bg-card',
        isFeatured && 'h-full',
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <DemoWindow
          title={`designs/${design.id}`}
          active
          className="h-full w-full rounded-none border-0 shadow-none ring-0"
          contentClassName={designPreviewBg(design.id)}
        >
          <DesignPreview id={design.id} className="h-full" />
        </DemoWindow>
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col',
          isFeatured ? 'gap-3 p-5 md:p-6' : 'gap-1.5 p-3 lg:gap-2 lg:p-4',
        )}
      >
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {design.category}
        </p>
        <h2
          className={cn(
            'text-balance font-semibold tracking-tight text-foreground',
            isFeatured ? 'text-2xl md:text-3xl' : 'text-base leading-snug lg:text-xl',
          )}
        >
          <Link
            href={design.demoPath}
            className="transition-colors hover:text-tawny"
          >
            {design.title}
          </Link>
        </h2>
        <p
          className={cn(
            'text-pretty text-muted-foreground',
            isFeatured
              ? 'text-base leading-relaxed'
              : 'line-clamp-2 text-sm leading-relaxed lg:line-clamp-3',
          )}
        >
          {design.description}
        </p>
        <Link
          href={design.demoPath}
          className={cn(
            'mt-auto inline-flex w-fit items-center gap-1.5 font-medium text-tawny transition-opacity hover:opacity-80',
            isFeatured ? 'pt-4 text-sm' : 'pt-2 text-xs lg:pt-3 lg:text-sm',
          )}
        >
          Open live demo
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
