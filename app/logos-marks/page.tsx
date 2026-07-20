import type { Metadata } from 'next'
import { BlurFade } from '@/components/ui/blur-fade'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { Logo } from '@/components/logo'

export const metadata: Metadata = {
  title: 'Logos & Marks — Tawny',
  description:
    'The Tawny double crescent — two overlapping arcs standing in for the O in Tawny. Warm terracotta and cream, flat and quiet.',
}

const MARKS = [
  {
    key: 'light',
    src: '/tawny-crescent-light.svg',
    label: 'App icon · light',
    alt: 'Tawny crescent mark in terracotta on a cream field',
  },
  {
    key: 'dark',
    src: '/tawny-crescent-dark.svg',
    label: 'App icon · dark',
    alt: 'Tawny crescent mark in sand on an ink field',
  },
  {
    key: 'transparent',
    src: '/tawny-crescent-transparent.svg',
    label: 'Mark only',
    alt: 'Tawny crescent mark on a transparent field',
  },
] as const

const SWATCHES = [
  { hex: '#FBF3E8', name: 'Cream', className: 'bg-[#FBF3E8] text-[#241812]' },
  { hex: '#B5591F', name: 'Terracotta', className: 'bg-[#B5591F] text-[#FBF3E8]' },
  { hex: '#241812', name: 'Ink', className: 'bg-[#241812] text-[#E8A868]' },
  { hex: '#E8A868', name: 'Sand', className: 'bg-[#E8A868] text-[#241812]' },
] as const

const PRINCIPLES = [
  {
    title: 'Flat, not glossy',
    body: 'No gradients, no chrome. Two solid arcs at one stroke weight keep the mark calm at every size, from favicon to hero.',
  },
  {
    title: 'One accent',
    body: 'Terracotta on cream, sand on ink. The crescent never mixes both accents in the same lockup.',
  },
  {
    title: 'Squircle field',
    body: 'The rounded square is the app icon and favicon. On the site, the live mark inherits the tawny accent from the theme.',
  },
] as const

export default function LogosMarksPage() {
  return (
    <div className="relative min-h-screen">
      {/* ── Header ─────────────────────────────────────────── */}
      <section className="relative px-6 pt-28 pb-16 md:pb-20">
        <NoiseTexture opacity={0.025} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 80% 10%, rgba(198,144,92,0.14) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <BlurFade delay={0.05}>
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Brand</p>
              <h1 className="font-serif text-5xl italic tracking-tight text-foreground md:text-7xl">
                Tawny
              </h1>
              <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                Two overlapping arcs standing in for the O in Tawny — a crescent
                caught between light and shadow, like the woodgrain the name
                comes from.
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={0.15}>
            <Logo className="size-32 shrink-0 self-center rounded-3xl md:size-48 md:self-auto" />
          </BlurFade>
        </div>
      </section>

      {/* ── The mark ───────────────────────────────────────── */}
      <section className="relative border-t border-white/8 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <BlurFade delay={0.05} inView>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">The mark</h2>
            <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Warm cream and terracotta on light surfaces, inverted to ink and
              sand for dark. Flat color, no gloss — one confident accent
              instead of a rainbow.
            </p>
          </BlurFade>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {MARKS.map((mark, i) => (
              <BlurFade key={mark.key} delay={0.1 + i * 0.07} inView>
                <figure className="flex flex-col items-center gap-6 rounded-xl border border-white/8 bg-white/[0.03] p-8">
                  {/* eslint-disable-next-line @next/next/no-img-element -- brand asset preview, not content imagery */}
                  <img src={mark.src} alt={mark.alt} className="size-24 md:size-28" />
                  <figcaption className="text-xs uppercase tracking-widest text-muted-foreground">
                    {mark.label}
                  </figcaption>
                </figure>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wordmark lockup ────────────────────────────────── */}
      <section className="relative border-t border-white/8 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <BlurFade delay={0.05} inView>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Wordmark lockup</h2>
            <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Lowercase wordmark for headers and landing pages. Mark and type
              share one quiet line — never stacked as a badge collage.
            </p>
          </BlurFade>

          <div className="mt-10 flex flex-col gap-4">
            <BlurFade delay={0.14} inView>
              {/* eslint-disable-next-line @next/next/no-img-element -- brand asset preview, not content imagery */}
              <img
                src="/tawny-crescent-wordmark-light.svg"
                alt="Tawny wordmark on a cream field"
                className="w-full rounded-xl border border-white/8"
              />
            </BlurFade>
            <BlurFade delay={0.2} inView>
              {/* eslint-disable-next-line @next/next/no-img-element -- brand asset preview, not content imagery */}
              <img
                src="/tawny-crescent-wordmark-dark.svg"
                alt="Tawny wordmark on an ink field"
                className="w-full rounded-xl border border-white/8"
              />
            </BlurFade>
          </div>
        </div>
      </section>

      {/* ── Palette ────────────────────────────────────────── */}
      <section className="relative border-t border-white/8 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <BlurFade delay={0.05} inView>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Palette</h2>
            <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Four colors. Cream and terracotta for light surfaces; ink and
              sand for dark. Flat, quiet confidence.
            </p>
          </BlurFade>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SWATCHES.map((swatch, i) => (
              <BlurFade key={swatch.hex} delay={0.1 + i * 0.06} inView>
                <div className={`flex aspect-4/3 flex-col justify-end rounded-xl p-5 ${swatch.className}`}>
                  <p className="text-lg font-semibold tracking-tight">{swatch.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest opacity-80">{swatch.hex}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ─────────────────────────────────────── */}
      <section className="relative border-t border-white/8 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <BlurFade delay={0.05} inView>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">How we use it</h2>
          </BlurFade>

          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {PRINCIPLES.map((principle, i) => (
              <BlurFade key={principle.title} delay={0.1 + i * 0.06} inView>
                <li className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{principle.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
                </li>
              </BlurFade>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
