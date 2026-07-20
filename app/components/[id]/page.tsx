import { readFile } from 'node:fs/promises'
import path from 'node:path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { CopyCodeBlock } from '@/components/landing/copy-code-block'
import {
  componentDemos,
  getComponentDemo,
} from '@/components/landing/showcases'
import { ProductFrame } from '@/components/product-frame'
import { BlurFade } from '@/components/ui/blur-fade'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { cn } from '@/lib/utils'

type PageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return componentDemos.map((demo) => ({ id: demo.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const demo = getComponentDemo(id)
  if (!demo) return { title: 'Component' }
  return {
    title: `${demo.title} · Components`,
    description: demo.description,
  }
}

async function readSourceFile(relativePath: string) {
  return readFile(path.join(process.cwd(), relativePath), 'utf8')
}

export default async function ComponentDetailPage({ params }: PageProps) {
  const { id } = await params
  const demo = getComponentDemo(id)
  if (!demo) notFound()

  const sources = await Promise.all(
    demo.sourceFiles.map(async (file) => ({
      file,
      code: await readSourceFile(file),
    })),
  )

  return (
    <div className="relative min-h-screen px-6 pb-24 pt-28">
      <NoiseTexture opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-4xl">
        <BlurFade delay={0.05}>
          <Link
            href="/components"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All components
          </Link>

          <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {demo.category}
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl">
            {demo.title}
          </h1>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {demo.description}
          </p>
        </BlurFade>

        <BlurFade delay={0.1} className="mt-10">
          <ProductFrame
            title={demo.frameTitle}
            contentClassName={cn('overflow-hidden', demo.contentClassName)}
          >
            {demo.render()}
          </ProductFrame>
        </BlurFade>

        <BlurFade delay={0.15} className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Source
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Copy the files below into your project.
          </p>

          <div className="mt-6 flex flex-col gap-5">
            {sources.map(({ file, code }) => (
              <CopyCodeBlock key={file} title={file} code={code} />
            ))}
          </div>
        </BlurFade>
      </div>
    </div>
  )
}
