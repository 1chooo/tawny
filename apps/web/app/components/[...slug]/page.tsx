import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DocsArticle } from '@/components/docs/docs-article'
import { DocsBreadcrumbs } from '@/components/docs/docs-breadcrumbs'
import { CopyCodeBlock } from '@/components/landing/copy-code-block'
import { GenerateScreenshotButton } from '@/components/landing/generate-screenshot-button'
import {
  componentDemos,
  getComponentDemo,
} from '@/components/landing/showcases'
import { ProductFrame } from '@/components/product-frame'
import {
  getAdjacentDocs,
  getDocsStaticParams,
  loadDoc,
} from '@/lib/docs/load'
import { extractToc } from '@/lib/docs/toc'
import { highlightCode, languageFromPath } from '@/lib/highlight-code'
import { docsMdxComponents } from '@/lib/mdx/docs-components'
import { renderMdx } from '@/lib/mdx/render'
import { cn } from '@tawny/ui/lib/utils'

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export function generateStaticParams() {
  const mdxParams = getDocsStaticParams()
  const demoParams = componentDemos.map((demo) => ({ slug: [demo.id] }))
  return [...mdxParams, ...demoParams]
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: slugParts } = await params

  if (slugParts.length === 1) {
    const demo = getComponentDemo(slugParts[0]!)
    if (demo) {
      return {
        title: `${demo.title} · Components`,
        description: demo.description,
      }
    }
  }

  const doc = loadDoc(slugParts.join('/'))
  if (!doc) return { title: 'Not found — Tawny' }
  return { title: `${doc.title} — Tawny`, description: doc.description }
}

/** `relativePath` is relative to the monorepo root, not this app's cwd. */
async function readSourceFile(relativePath: string) {
  return readFile(path.join(process.cwd(), '..', '..', relativePath), 'utf8')
}

async function ComponentDemoDetail({
  demo,
}: {
  demo: NonNullable<ReturnType<typeof getComponentDemo>>
}) {
  const sources = await Promise.all(
    demo.sourceFiles.map(async (file) => {
      const code = await readSourceFile(file)
      const language = languageFromPath(file)
      const html = await highlightCode(code, language)
      return { file, code, html, language }
    }),
  )

  return (
    <div className="min-w-0 flex-1 py-2 pb-16">
      <DocsBreadcrumbs
        items={[
          { label: 'Components', href: '/components' },
          { label: demo.title },
        ]}
      />

      <div className="min-w-0">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
          {demo.category}
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl">
          {demo.title}
        </h1>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {demo.description}
        </p>

        {process.env.NODE_ENV !== 'production' ? (
          <div className="mt-4">
            <GenerateScreenshotButton
              kind="component"
              id={demo.id}
              path={`/components/${demo.id}`}
              selector={`#thumbnail-capture-${demo.id}`}
              viewport={{ width: 640 }}
            />
          </div>
        ) : null}

        <div className="mt-10">
          <ProductFrame
            title={demo.frameTitle}
            contentClassName={cn(
              'h-[36rem] overflow-auto',
              demo.detailContentClassName,
              demo.detailRender ? undefined : demo.contentClassName,
            )}
          >
            <div id={`thumbnail-capture-${demo.id}`} className="h-full min-h-0">
              {(demo.detailRender ?? demo.render)()}
            </div>
          </ProductFrame>
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Source
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Copy the files below into your project.
          </p>

          <div className="mt-6 flex flex-col gap-5">
            {sources.map(({ file, code, html, language }) => (
              <CopyCodeBlock
                key={file}
                title={file}
                code={code}
                html={html}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function ComponentsSlugPage({ params }: PageProps) {
  const { slug: slugParts } = await params

  if (slugParts.length === 1) {
    const demo = getComponentDemo(slugParts[0]!)
    if (demo) return <ComponentDemoDetail demo={demo} />
  }

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
        { label: 'Components', href: '/components' },
        { label: doc.title },
      ]}
      toc={toc}
      content={content}
      prev={prev}
      next={next}
    />
  )
}
