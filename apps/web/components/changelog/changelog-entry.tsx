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
  const dateLabel = formatChangelogDate(entry.date)

  return (
    <article className="border-t border-border py-12 first:border-t-0 first:pt-0">
      <div className="relative">
        <p className="absolute top-0 left-0 hidden w-52 text-left text-lg text-muted-foreground xl:block">
          <time dateTime={entry.date}>{dateLabel}</time>
        </p>

        <div className="relative mx-auto w-full min-w-0 max-w-2xl">
          <p className="text-sm text-muted-foreground xl:hidden">
            <time dateTime={entry.date}>{dateLabel}</time>
          </p>

          <p className="mt-3 text-sm text-muted-foreground xl:mt-0">{entry.category}</p>

          <Link href={`/changelog/${entry.slug}`} className="group">
            <h2 className="mt-2 text-balance text-2xl font-semibold tracking-[-0.03em] text-foreground transition-colors group-hover:text-tawny md:text-3xl">
              {entry.title}
            </h2>
          </Link>

          <div className="mt-6">{content}</div>
        </div>
      </div>
    </article>
  )
}
