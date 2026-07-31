import Link from 'next/link'
import type { ChangelogEntry } from '@/lib/changelog'
import { formatChangelogDate } from '@/lib/changelog-date'

/**
 * Lean post header (Cursor-style): category, title, reading time.
 * Desktop date lives in `ChangelogShell`'s left rail; mobile shows it here.
 */
export function ChangelogHeader({ entry }: { entry: ChangelogEntry }) {
  const dateLabel = formatChangelogDate(entry.date)

  return (
    <header className="not-prose mb-8">
      <p className="mb-3 text-sm text-muted-foreground xl:hidden">
        <Link
          href="/changelog"
          className="transition-colors hover:text-foreground"
        >
          <time dateTime={entry.date}>{dateLabel}</time>
        </Link>
      </p>

      <p className="text-sm text-muted-foreground">{entry.category}</p>

      <h1 className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
        {entry.title}
      </h1>

      <p className="mt-3 text-sm text-muted-foreground">{entry.readingTime}</p>
    </header>
  )
}
