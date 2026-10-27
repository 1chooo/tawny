import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { SealRootShell } from '@/components/seal/seal-root-shell'
import { GenerateScreenshotButton } from '@/components/landing/generate-screenshot-button'
import {
  DesignCopyPageAction,
  DesignTemplateDocs,
} from '@/components/landing/design-template-docs'
import { ProductFrame } from '@/components/product-frame'
import { getDesign } from '@/lib/data'
import type { Metadata } from 'next'

const design = getDesign('seal')!

export const metadata: Metadata = {
  title: 'Seal — Live Design Demo',
  description: design.description,
}

export default function SealShowcaseLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen px-6 pt-28 pb-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <Link
          href="/designs"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Designs
        </Link>
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl">
              {design.title}
            </h1>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              {design.description} Navigate inside the frame — you are still on
              Tawny.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <DesignCopyPageAction design={design} />
            {process.env.NODE_ENV !== 'production' ? (
              <GenerateScreenshotButton
                kind="design"
                id={design.id}
                path={design.screenshotPath ?? design.viewPath}
                viewport={{ width: 1440, height: 900 }}
              />
            ) : null}
            <Link
              href={design.viewPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground/80 transition-colors hover:border-border hover:bg-muted hover:text-foreground"
            >
              Open in new tab
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ProductFrame
          title="designs/seal"
          contentClassName="flex max-h-[calc(100dvh-8rem)] min-h-[70vh] flex-col overflow-y-auto bg-[#f3efe6]"
        >
          <SealRootShell className="flex min-h-full flex-1 flex-col">
            {children}
          </SealRootShell>
        </ProductFrame>

        <DesignTemplateDocs design={design} />
      </div>
    </div>
  )
}
