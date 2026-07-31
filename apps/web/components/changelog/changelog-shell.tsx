import type { ReactNode } from 'react'
import { DocsToc } from '@/components/docs/docs-toc'
import type { TocItem } from '@/lib/docs/toc'

/**
 * Changelog post chrome: article centered at `max-w-2xl`, sticky TOC on
 * the right (xl+). Date/category live in `ChangelogHeader`, left-aligned
 * with the title — no left gutter rail.
 */
export function ChangelogShell({
  toc,
  tocLabel = 'On this page',
  children,
}: {
  toc: TocItem[]
  tocLabel?: string
  children: ReactNode
}) {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-6">
      <div className="mx-auto flex w-full max-w-2xl gap-8">
        <article className="min-w-0 flex-1 py-2 pb-16">{children}</article>
        <DocsToc items={toc} label={tocLabel} />
      </div>
    </div>
  )
}
