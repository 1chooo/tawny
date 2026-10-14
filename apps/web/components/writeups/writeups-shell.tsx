import type { ReactNode } from 'react'
import Link from 'next/link'
import { DocsToc } from '@/components/docs/docs-toc'
import type { TocItem } from '@/lib/docs/toc'

/**
 * Writeup chrome. Date and contents are full-height columns so they can
 * stick for the whole article. Prose stays at 42rem; a figure marked
 * `data-writeup-stage` uses the wider center column.
 */
export function WriteupsShell({
  date,
  toc,
  children,
}: {
  date: string
  toc: TocItem[]
  children: ReactNode
}) {
  return (
    <div className="mx-auto grid w-full max-w-340 gap-x-8 px-6 xl:grid-cols-[11rem_minmax(0,52rem)_14rem] xl:justify-center">
      <aside className="hidden xl:block">
        <nav
          aria-label="Writeups"
          className="sticky top-24 text-left text-lg text-muted-foreground"
        >
          <Link
            href="/writeups"
            className="font-medium transition-colors hover:text-foreground"
          >
            {date}
          </Link>
        </nav>
      </aside>

      <article className="min-w-0 py-2 pb-16 [&>*:not([data-writeup-stage])]:mx-auto [&>*:not([data-writeup-stage])]:max-w-2xl">
        {children}
      </article>

      <aside className="hidden xl:block">
        <div className="sticky top-24">
          <DocsToc items={toc} label="On this page" sticky={false} />
        </div>
      </aside>
    </div>
  )
}
