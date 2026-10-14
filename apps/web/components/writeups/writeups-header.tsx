import Link from 'next/link'
import { formatChangelogDate } from '@/lib/changelog-date'
import type { Writeup } from '@/lib/writeups'

export function WriteupsHeader({ entry }: { entry: Writeup }) {
  const dateLabel = formatChangelogDate(entry.date)

  return (
    <header className="not-prose mb-8">
      <p className="mb-3 text-sm text-muted-foreground xl:hidden">
        <Link href="/writeups" className="transition-colors hover:text-foreground">
          <time dateTime={entry.date}>{dateLabel}</time>
        </Link>
      </p>

      <p className="text-sm text-muted-foreground">Design</p>

      <h1 className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
        {entry.title}
      </h1>

      <p className="mt-3 text-sm text-muted-foreground">{entry.readingTime}</p>
    </header>
  )
}
