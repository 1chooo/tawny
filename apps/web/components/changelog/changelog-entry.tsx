import type { ReactNode } from 'react'
import Link from 'next/link'
import { formatChangelogDate } from '@/lib/changelog-date'
import type { ChangelogEntry as ChangelogEntryData } from '@/lib/changelog'

export function ChangelogEntry({
  entry,
  content,
}: {
  entry: ChangelogEntryData
  content: ReactNode
}) {
  return (
    <article className="border-t border-border py-12 first:border-t-0 first:pt-0">
      <p className="text-sm text-muted-foreground">
        <time dateTime={entry.date}>{formatChangelogDate(entry.date)}</time>
        <span aria-hidden="true" className="mx-1.5">
          ·
        </span>
        <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-foreground">
          {entry.category}
        </span>
      </p>

      <Link href={`/changelog/${entry.slug}`} className="group">
        <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.03em] text-foreground transition-colors group-hover:text-tawny md:text-3xl">
          {entry.title}
        </h2>
      </Link>

      <div className="mt-6 max-w-2xl">{content}</div>
    </article>
  )
}
