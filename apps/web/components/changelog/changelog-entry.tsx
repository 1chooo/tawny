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
      </p>

      <p className="mt-3 text-sm text-muted-foreground">{entry.category}</p>

      <Link href={`/changelog/${entry.slug}`} className="group">
        <h2 className="mt-2 text-balance text-2xl font-semibold tracking-[-0.03em] text-foreground transition-colors group-hover:text-tawny md:text-3xl">
          {entry.title}
        </h2>
      </Link>

      <div className="mt-6 max-w-2xl">{content}</div>
    </article>
  )
}
