import type { ReactNode } from 'react'
import Link from 'next/link'
import { DocsToc } from '@/components/docs/docs-toc'
import type { TocItem } from '@/lib/docs/toc'

/**
 * Changelog post chrome: same content width as Navbar (`max-w-7xl`);
 * date at the left content edge (logo-aligned). Article stays max-w-2xl
 * centered; TOC sits to the right of the article (xl+).
 */
export function ChangelogShell({
  date,
  toc,
  tocLabel = 'On this page',
  children,
}: {
  date: string
  toc: TocItem[]
  tocLabel?: string
  children: ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      {/* Inner box = navbar content area; left-0 here = Tawny logo edge. */}
      <div className="relative">
        <aside className="absolute top-0 left-0 hidden w-52 xl:block">
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
          </nav>
        </aside>

        <div className="relative mx-auto w-full min-w-0 max-w-2xl">
          <article className="py-2 pb-16">{children}</article>
          <div className="absolute top-0 left-full ml-8 hidden w-60 xl:block">
            <DocsToc items={toc} label={tocLabel} />
          </div>
        </div>
      </div>
    </div>
  )
}
