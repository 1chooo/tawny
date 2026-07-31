import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function pageHref(page: number): string {
  return page <= 1 ? '/changelog' : `/changelog?page=${page}`
}

export function ChangelogPager({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  if (totalPages <= 1) return null

  const hasNewer = currentPage > 1
  const hasOlder = currentPage < totalPages

  return (
    <nav
      aria-label="Changelog pagination"
      className="mt-4 flex items-center justify-between border-t border-border pt-8"
    >
      {hasNewer ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Next
        </Link>
      ) : (
        <span />
      )}
      {hasOlder ? (
        <Link
          href={pageHref(currentPage + 1)}
          className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Older posts
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
