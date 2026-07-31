import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ChangelogEntry } from '@/components/changelog/changelog-entry'
import { ChangelogPager } from '@/components/changelog/changelog-pager'
import { getChangelogPage } from '@/lib/changelog'
import { docsMdxComponents } from '@/lib/mdx/docs-components'
import { renderMdx } from '@/lib/mdx/render'
import { NoiseTexture } from '@tawny/ui/components/noise-texture'

export const metadata: Metadata = {
  title: 'Changelog — Tawny',
  description: 'New designs, components, and improvements to Tawny.',
}

type PageProps = {
  searchParams: Promise<{ page?: string }>
}

export default async function ChangelogPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams
  const requestedPage = Number.parseInt(pageParam ?? '1', 10)
  const { entries, currentPage, totalPages } = getChangelogPage(
    Number.isFinite(requestedPage) ? requestedPage : 1,
  )

  if (entries.length === 0) notFound()

  const rendered = await Promise.all(
    entries.map(async (entry) => {
      const { content, error } = await renderMdx(entry.body, docsMdxComponents)
      if (error) console.error('Changelog MDX render failed:', entry.slug, error)
      return { entry, content: error ? null : content }
    }),
  )

  return (
    <div className="relative min-h-screen pb-16 pt-28">
      <NoiseTexture opacity={0.025} />

      <div className="relative z-10 mx-auto w-full max-w-340 px-6">
        <div className="relative">
          <h1 className="mx-auto mb-12 w-full max-w-2xl text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Changelog
          </h1>

          <div>
            {rendered.map(({ entry, content }) => (
              <ChangelogEntry key={entry.slug} entry={entry} content={content} />
            ))}
          </div>

          <div className="mx-auto w-full max-w-2xl">
            <ChangelogPager currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  )
}
