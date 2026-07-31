import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ChangelogHeader } from '@/components/changelog/changelog-header'
import { ChangelogShell } from '@/components/changelog/changelog-shell'
import { DocsPager } from '@/components/docs/docs-pager'
import { extractToc } from '@/lib/docs/toc'
import {
  getAdjacentChangelogEntries,
  getChangelogEntry,
  getChangelogStaticParams,
} from '@/lib/changelog'
import { docsMdxComponents } from '@/lib/mdx/docs-components'
import { renderMdx } from '@/lib/mdx/render'
import { NoiseTexture } from '@tawny/ui/components/noise-texture'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getChangelogStaticParams()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getChangelogEntry(slug)
  if (!entry) return { title: 'Not found — Tawny' }
  return {
    title: `${entry.title} — Changelog — Tawny`,
    description: entry.summary,
  }
}

export default async function ChangelogEntryPage({ params }: PageProps) {
  const { slug } = await params
  const entry = getChangelogEntry(slug)
  if (!entry) notFound()

  const { content, error } = await renderMdx(entry.body, docsMdxComponents)
  if (error) {
    console.error('Changelog MDX render failed:', entry.slug, error)
    notFound()
  }

  const toc = extractToc(entry.body)
  const { newer, older } = getAdjacentChangelogEntries(slug)

  return (
    <div className="relative min-h-screen pt-28 pb-8">
      <NoiseTexture opacity={0.025} />

      <div className="relative z-10">
        <ChangelogShell toc={toc}>
          <ChangelogHeader entry={entry} />
          {content}
          <DocsPager prev={newer} next={older} prevLabel="Newer" nextLabel="Older" />
        </ChangelogShell>
      </div>
    </div>
  )
}
