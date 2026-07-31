import Link from 'next/link'
import type { ChangelogEntry } from '@/lib/changelog'
import { formatChangelogDate } from '@/lib/changelog-date'

/**
 * Lean post header (mirrors JustHold's `ArticleHeader`): `date / category`
 * crumb on mobile (desktop shows it in `ChangelogShell`'s left rail),
 * date · category, title, reading time.
 */
export function ChangelogHeader({ entry }: { entry: ChangelogEntry }) {
  const dateLabel = formatChangelogDate(entry.date)

  return (
    <header className="not-prose mb-8">
      <nav
        aria-label="Changelog"
        className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground xl:hidden"
      >
        <Link href="/changelog" className="transition-colors hover:text-foreground">
          {dateLabel}
        </Link>
        <span aria-hidden="true">/</span>
        <span>{entry.category}</span>
      </nav>

      <p className="text-sm text-muted-foreground">
        <time dateTime={entry.date}>{dateLabel}</time>
        <span aria-hidden="true" className="mx-1.5">
          ·
        </span>
        <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-foreground">
          {entry.category}
        </span>
      </p>

      <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
        {entry.title}
      </h1>

      <p className="mt-3 text-sm text-muted-foreground">{entry.readingTime}</p>
    </header>
  )
}
