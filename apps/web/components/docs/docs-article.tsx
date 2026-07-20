import { DocsBreadcrumbs } from '@/components/docs/docs-breadcrumbs'
import { DocsPager } from '@/components/docs/docs-pager'
import { DocsToc } from '@/components/docs/docs-toc'
import type { DocsPagerLink } from '@/lib/docs/load'
import type { TocItem } from '@/lib/docs/toc'

export function DocsArticle({
  breadcrumbs,
  toc,
  tocLabel = 'On this page',
  content,
  prev,
  next,
  prevLabel = 'Previous',
  nextLabel = 'Next',
}: {
  breadcrumbs: { label: string; href?: string }[]
  toc: TocItem[]
  tocLabel?: string
  content: React.ReactNode
  prev: DocsPagerLink | null
  next: DocsPagerLink | null
  prevLabel?: string
  nextLabel?: string
}) {
  return (
    <div className="flex min-w-0 flex-1 gap-8">
      <article className="min-w-0 flex-1 py-2 pb-16">
        <DocsBreadcrumbs items={breadcrumbs} />
        <div className="max-w-3xl">{content}</div>
        <div className="max-w-3xl">
          <DocsPager
            prev={prev}
            next={next}
            prevLabel={prevLabel}
            nextLabel={nextLabel}
          />
        </div>
      </article>
      <DocsToc items={toc} label={tocLabel} />
    </div>
  )
}
