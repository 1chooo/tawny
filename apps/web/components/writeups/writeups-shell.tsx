import type { ReactNode } from 'react'
import Link from 'next/link'
import { DocsToc } from '@/components/docs/docs-toc'
import type { TocItem } from '@/lib/docs/toc'

/**
 * Writeup chrome: same content width as the navbar. The date sits on the
 * left content edge; the article stays centered; the TOC sits to the right.
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
    <div className="mx-auto w-full max-w-340 px-6">
      <div className="relative">
        <aside className="absolute top-0 left-0 hidden w-52 xl:block">
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

        <div className="relative mx-auto w-full min-w-0 max-w-2xl">
          <article className="py-2 pb-16">{children}</article>
          <div className="absolute top-0 left-full ml-8 hidden w-60 xl:block">
            <DocsToc items={toc} label="On this page" />
          </div>
        </div>
      </div>
    </div>
  )
}
