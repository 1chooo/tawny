import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Hero } from '@/components/hero'
import { DesignsShowcase } from '@/components/landing/designs-showcase'
import { ComponentsShowcase } from '@/components/landing/components-showcase'
import { BlurFade } from '@tawny/ui/components/blur-fade'

export default function HomePage() {
  return (
    <>
      <Hero />

      <DesignsShowcase />

      <ComponentsShowcase />

      {/* ── CTA band ────────────────────────────────────────── */}
      <section className="relative border-t border-white/8 px-6 py-24">
        <BlurFade delay={0.1} inView>
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
              Get the full bundle at one price
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-white/75">
              Two live design showcases, reusable headers and UI primitives,
              commercial license, and lifetime updates — all for a one-time fee.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-opacity hover:opacity-85"
              >
                View pricing <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/designs"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:border-white/35 hover:text-white"
              >
                Browse designs
              </Link>
            </div>
          </div>
        </BlurFade>
      </section>
    </>
  )
}
