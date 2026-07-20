import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DocsArticle } from '@/components/docs/docs-article'
import { getAdjacentDocs, loadDoc } from '@/lib/docs/load'
import { extractToc } from '@/lib/docs/toc'
import { docsMdxComponents } from '@/lib/mdx/docs-components'
import { renderMdx } from '@/lib/mdx/render'

export async function generateMetadata(): Promise<Metadata> {
  const doc = loadDoc('')
  if (!doc) return { title: 'Docs — Tawny' }

  return {
    title: `${doc.title} — Tawny`,
    description: doc.description,
  }
}

export default async function DocsIndexPage() {
  const doc = loadDoc('')
  if (!doc) notFound()

  const { content, error } = await renderMdx(doc.body, docsMdxComponents)
  if (error) {
    console.error('Docs MDX render failed:', error)
    notFound()
  }

  const { prev, next } = getAdjacentDocs('')
  const toc = extractToc(doc.body)

  return (
    <DocsArticle
      breadcrumbs={[
        { label: 'Docs', href: '/docs' },
        { label: doc.title },
      ]}
      toc={toc}
      content={content}
      prev={prev}
      next={next}
    />
  )
}
