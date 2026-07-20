import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { JetBrains_Mono } from 'next/font/google'
import {
  DesignCopyPageAction,
  DesignTemplateDocs,
} from '@/components/landing/design-template-docs'
import { ProductFrame } from '@/components/product-frame'
import { SiteHeader } from '@/components/dev/site-header'
import { SiteFooter } from '@/components/dev/site-footer'
import { getDesign } from '@/lib/data'

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-dev-mono',
  display: 'swap',
})

const design = getDesign('dev')!

export const metadata: Metadata = {
  title: 'Dev — Live Design Demo',
  description: design.description,
}

export default async function DevShowcaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen px-6 pt-28 pb-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Live design demo
            </p>
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
            <Link
              href="/designs"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to Designs
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ProductFrame
          title="designs/dev"
          contentClassName="max-h-[calc(100dvh-8rem)] min-h-[70vh] overflow-y-auto"
        >
          <div
            className={`dev-root ${mono.variable} ${mono.className} min-h-[70vh] bg-[var(--background)] font-mono text-[var(--foreground)] antialiased`}
          >
            <div className="mx-auto max-w-2xl px-6 py-8 md:py-12">
              <SiteHeader />
              <main className="mt-8">{children}</main>
              <SiteFooter />
            </div>
          </div>
        </ProductFrame>

        <DesignTemplateDocs design={design} />
      </div>
    </div>
  )
}
