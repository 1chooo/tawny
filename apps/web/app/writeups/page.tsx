import type { Metadata } from 'next'
import Link from 'next/link'
import { formatChangelogDate } from '@/lib/changelog-date'
import { getAllWriteups } from '@/lib/writeups'
import { NoiseTexture } from '@tawny/ui/components/noise-texture'

export const metadata: Metadata = {
  title: 'Writeups — Tawny',
  description: 'Notes on design decisions, and how to apply them.',
}

export default function WriteupsPage() {
  const entries = getAllWriteups()

  return (
    <div className="relative min-h-screen pb-16 pt-28">
      <NoiseTexture opacity={0.025} />

      <div className="relative z-10 mx-auto w-full max-w-340 px-6">
        <div className="relative">
          <header className="mx-auto mb-12 w-full max-w-2xl">
            <h1 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Writeups
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Design notes. Each one walks a decision from the first frame to the last.
            </p>
          </header>

          <ul className="mx-auto w-full max-w-2xl">
            {entries.map((entry) => (
              <li key={entry.slug} className="border-t border-border py-8 first:border-t-0 first:pt-0">
                <p className="text-sm text-muted-foreground">
                  <time dateTime={entry.date}>{formatChangelogDate(entry.date)}</time>
                  <span aria-hidden="true"> · </span>
                  {entry.readingTime}
                </p>
                <Link href={`/writeups/${entry.slug}`} className="group">
                  <h2 className="mt-2 text-balance text-2xl font-semibold tracking-[-0.03em] text-foreground transition-colors group-hover:text-tawny md:text-3xl">
                    {entry.title}
                  </h2>
                </Link>
                <p className="mt-3 leading-relaxed text-muted-foreground">{entry.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
