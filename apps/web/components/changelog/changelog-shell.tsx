import type { ReactNode } from 'react'
import Link from 'next/link'
import { DocsToc } from '@/components/docs/docs-toc'
import type { TocItem } from '@/lib/docs/toc'

/**
 * Changelog post chrome, mirroring the JustHold blog's `ArticleShell`:
 * a left rail at the content edge instead of `Blog / Category`, the
 * article centered at `max-w-2xl`, and a sticky TOC on the right (xl+).
 */
export function ChangelogShell({
  date,
  category,
  toc,
  tocLabel = 'On this page',
  children,
}: {
  date: string
  category: string
  toc: TocItem[]
  tocLabel?: string
  children: ReactNode
}) {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-6">
      <aside className="absolute top-0 left-0 hidden w-44 xl:block">
        <nav
          aria-label="Changelog"
          className="sticky top-24 text-left text-lg text-muted-foreground"
        >
          <Link
            href="/changelog"
            className="font-medium transition-colors hover:text-foreground"
          >
            {date}
          </Link>
          <span aria-hidden="true" className="mx-1.5">
            /
          </span>
          <span className="font-medium">{category}</span>
        </nav>
      </aside>

      <div className="mx-auto flex w-full max-w-2xl gap-8">
        <article className="min-w-0 flex-1 py-2 pb-16">{children}</article>
        <DocsToc items={toc} label={tocLabel} />
      </div>
    </div>
  )
}
