import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DocsArticle } from '@/components/docs/docs-article'
import {
  getAdjacentDocs,
  getDocsStaticParams,
  loadDoc,
} from '@/lib/docs/load'
import { extractToc } from '@/lib/docs/toc'
import { docsMdxComponents } from '@/lib/mdx/docs-components'
import { renderMdx } from '@/lib/mdx/render'

export function generateStaticParams() {
  return getDocsStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')
  const doc = loadDoc(slug)
  if (!doc) return { title: 'Not found — Tawny' }

  return {
    title: `${doc.title} — Tawny`,
    description: doc.description,
  }
}

export default async function DocsSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')
  const doc = loadDoc(slug)
  if (!doc) notFound()

  const { content, error } = await renderMdx(doc.body, docsMdxComponents)
  if (error) {
    console.error('Docs MDX render failed:', error)
    notFound()
  }

  const { prev, next } = getAdjacentDocs(slug)
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
