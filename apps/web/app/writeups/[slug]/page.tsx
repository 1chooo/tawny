import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DocsPager } from '@/components/docs/docs-pager'
import { WriteupsHeader } from '@/components/writeups/writeups-header'
import { WriteupsShell } from '@/components/writeups/writeups-shell'
import { formatChangelogDate } from '@/lib/changelog-date'
import { extractToc } from '@/lib/docs/toc'
import { writeupsMdxComponents } from '@/lib/mdx/writeups-components'
import { renderMdx } from '@/lib/mdx/render'
import {
  getAdjacentWriteups,
  getWriteup,
  getWriteupStaticParams,
} from '@/lib/writeups'
import { NoiseTexture } from '@tawny/ui/components/noise-texture'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getWriteupStaticParams()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = getWriteup(slug)
  if (!entry) return { title: 'Not found — Tawny' }
  return {
    title: `${entry.title} — Writeups — Tawny`,
    description: entry.description,
  }
}

export default async function WriteupPage({ params }: PageProps) {
  const { slug } = await params
  const entry = getWriteup(slug)
  if (!entry) notFound()

  const { content, error } = await renderMdx(entry.body, writeupsMdxComponents)
  if (error) {
    console.error('Writeup MDX render failed:', entry.slug, error)
    notFound()
  }

  const toc = extractToc(entry.body)
  const { newer, older } = getAdjacentWriteups(slug)

  return (
    <div className="relative min-h-screen pt-28 pb-8">
      <NoiseTexture opacity={0.025} />

      <div className="relative z-10">
        <WriteupsShell date={formatChangelogDate(entry.date)} toc={toc}>
          <WriteupsHeader entry={entry} />
          {content}
          <DocsPager prev={newer} next={older} prevLabel="Newer" nextLabel="Older" />
        </WriteupsShell>
      </div>
    </div>
  )
}
