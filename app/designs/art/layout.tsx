import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import { ProductFrame } from '@/components/product-frame'

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-art-serif-display',
})

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-art-sans-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-art-mono',
})

export const metadata: Metadata = {
  title: 'Art — Live Design Demo',
  description:
    'Interactive showcase of the Art bento journal design, hosted inside Tawny.',
}

export default function ArtShowcaseLayout({
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
              Art
            </h1>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              A bilingual bento journal with MDX notes and projects. Navigate
              inside the frame — you are still on Tawny.
            </p>
          </div>
          <Link
            href="/designs"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to Designs
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <ProductFrame
          title="designs/art"
          contentClassName="max-h-[calc(100dvh-8rem)] min-h-[70vh] overflow-y-auto"
        >
          <div
            className={`art-root ${display.variable} ${sans.variable} ${mono.variable} ${sans.className} bg-black text-art-bento-ink min-h-[70vh] font-(family-name:--font-art-sans-body) antialiased`}
          >
            {children}
          </div>
        </ProductFrame>
      </div>
    </div>
  )
}
