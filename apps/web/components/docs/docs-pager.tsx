import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { DocsPagerLink } from '@/lib/docs/load'

export function DocsPager({
  prev,
  next,
  prevLabel = 'Previous',
  nextLabel = 'Next',
}: {
  prev: DocsPagerLink | null
  next: DocsPagerLink | null
  prevLabel?: string
  nextLabel?: string
}) {
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Docs pagination"
      className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-8 sm:flex-row sm:justify-between"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex min-w-0 flex-1 flex-col gap-1 rounded-lg border border-white/8 bg-white/3 px-4 py-3 transition-colors hover:border-white/15 hover:bg-white/5"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronLeft className="size-3.5" aria-hidden />
            {prevLabel}
          </span>
          <span className="truncate text-sm font-semibold text-foreground group-hover:text-tawny">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="hidden flex-1 sm:block" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex min-w-0 flex-1 flex-col gap-1 rounded-lg border border-white/8 bg-white/3 px-4 py-3 text-right transition-colors hover:border-white/15 hover:bg-white/5 sm:items-end"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            {nextLabel}
            <ChevronRight className="size-3.5" aria-hidden />
          </span>
          <span className="truncate text-sm font-semibold text-foreground group-hover:text-tawny">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  )
}
