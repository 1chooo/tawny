import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Cta() {
  return (
    <section id="cta" className="relative scroll-mt-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_50%,color-mix(in_oklch,var(--tawny)_22%,transparent),transparent_72%)]"
      />
      <div className="relative mx-auto flex w-full max-w-340 flex-col items-center px-6 py-20 text-center md:py-24">
        <h2 className="text-balance font-serif text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
          Ship with Tawny designs.
        </h2>
        <Link
          href="/designs"
          className="mt-8 inline-flex items-center justify-center gap-1.5 rounded-full bg-tawny px-6 py-2.5 text-sm font-medium text-tawny-foreground transition-opacity hover:opacity-90"
        >
          Browse designs
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
