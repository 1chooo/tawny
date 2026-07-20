'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  bentoCellGroup,
  bentoCellHover,
  bentoCellInvertedHover,
} from '@/lib/art/bento-cell'
import { cn } from '@/lib/utils'

const TAGS = ['Programming', 'Design', 'Photography', 'Notes']
const UPCOMING = [
  {
    title: 'How to work in MANNG?',
    description: "Search 'How to print helloworld' in your browser.",
  },
  {
    title: 'Notes from the studio',
    description: 'Process shots, false starts, and a few keepers.',
  },
]
const PROJECTS = [
  {
    title: 'Art',
    description: 'Brutalist bento journal with MDX posts.',
  },
  {
    title: 'vCard',
    description: 'Open-source portfolio template.',
  },
]
const HERO_IMAGES = [
  { src: '/art-opengraph-image.png', alt: 'Gallery' },
  { src: '/art-opengraph-image.png', alt: 'Gallery slide 2' },
]

const INTERVAL_MS = 5000

function BentoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 inline-block border-b-2 border-current text-center text-xs font-bold uppercase tracking-[0.15em]">
      {children}
    </p>
  )
}

function useCycle(length: number, intervalMs = INTERVAL_MS) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (length <= 1) return
    const id = window.setInterval(() => setIndex((i) => i + 1), intervalMs)
    return () => window.clearInterval(id)
  }, [length, intervalMs])
  return length > 0 ? ((index % length) + length) % length : 0
}

type ArtPreviewMockProps = {
  className?: string
}

/**
 * Lightweight, non-interactive mock of the Art home bento.
 * Visual autoplay only — clicks do nothing.
 */
export function ArtPreviewMock({ className }: ArtPreviewMockProps) {
  const tagIndex = useCycle(TAGS.length)
  const upcomingIndex = useCycle(UPCOMING.length)
  const projectIndex = useCycle(PROJECTS.length)
  const imageIndex = useCycle(HERO_IMAGES.length)

  const tag = TAGS[tagIndex]!
  const upcoming = UPCOMING[upcomingIndex]!
  const project = PROJECTS[projectIndex]!
  const image = HERO_IMAGES[imageIndex]!

  return (
    <div
      role="img"
      aria-label="Art design preview"
      inert
      className={cn(
        'art-root flex h-full min-h-0 flex-col overflow-hidden bg-black text-art-bento-ink antialiased select-none',
        className,
      )}
    >
      {/* Sticky-looking header — decorative only */}
      <header className="bg-art-bento-bg shrink-0 pt-3">
        <div className="relative flex items-center justify-between gap-4 px-4 pb-3 md:px-5">
          <span className="text-art-bento-ink text-base font-bold tracking-tight md:text-lg">
            Hugo Lin
          </span>
          <nav className="flex flex-wrap items-center justify-end gap-3 md:gap-5">
            <ul className="flex items-center gap-3 text-sm font-bold md:gap-5">
              {['Notes', 'Projects', 'About'].map((label) => (
                <li key={label}>
                  <span className="cursor-default opacity-90">{label}</span>
                </li>
              ))}
            </ul>
            <span className="font-mono text-xs font-bold tracking-wide">
              <span>EN</span>
              <span className="mx-1 opacity-40">|</span>
              <span className="opacity-40">中</span>
            </span>
          </nav>
        </div>
      </header>

      {/* Force desktop 12-col bento so the landing preview always reads as the real home */}
      <div className="flex min-h-0 flex-1 flex-col bg-black p-art-bento-gap">
        <div className="grid min-h-0 flex-1 grid-cols-12 grid-rows-[auto_1fr_auto] gap-art-bento-gap bg-black">
          {/* Copyright */}
          <section
            className={`col-span-3 flex flex-col items-center justify-center p-4 text-center ${bentoCellGroup}`}
          >
            <BentoLabel>Copyright</BentoLabel>
            <p className="font-(family-name:--font-serif-display) text-xl font-bold">
              Hugo Lin
            </p>
          </section>

          {/* Tag — autoplay */}
          <section
            className={`col-span-3 flex flex-col items-center justify-center p-4 text-center ${bentoCellGroup}`}
          >
            <BentoLabel>Tag</BentoLabel>
            <p
              key={tag}
              className="font-(family-name:--font-serif-display) text-xl font-bold"
              style={{ animation: 'art-bento-tag-in 0.35s ease-out' }}
            >
              {tag}
            </p>
          </section>

          {/* Upcoming */}
          <section className="bg-art-bento-bg col-span-6 flex flex-col p-4 md:p-5">
            <BentoLabel>Upcoming</BentoLabel>
            <div className="mt-auto flex flex-1 flex-col justify-center">
              <h3
                key={upcoming.title}
                className="font-(family-name:--font-serif-display) text-art-bento-ink text-lg font-bold leading-tight md:text-2xl"
                style={{ animation: 'art-bento-tag-in 0.35s ease-out' }}
              >
                {upcoming.title}
              </h3>
              <p className="text-art-bento-ink mt-2 text-xs opacity-70 md:text-sm">
                {upcoming.description}
              </p>
            </div>
            <div className="mt-3 flex gap-2 self-end">
              <span className="border-art-bento-ink bg-art-bento-bg text-art-bento-ink flex size-8 items-center justify-center border">
                <ChevronLeft className="size-4" strokeWidth={2.5} />
              </span>
              <span className="border-art-bento-ink bg-art-bento-bg text-art-bento-ink flex size-8 items-center justify-center border">
                <ChevronRight className="size-4" strokeWidth={2.5} />
              </span>
            </div>
          </section>

          {/* Hero image */}
          <div className="bg-art-bento-bg relative col-span-6 row-start-2 min-h-[160px] overflow-hidden">
            <Image
              key={imageIndex}
              src={image.src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 60vw, 40vw"
              style={{ animation: 'art-bento-tag-in 0.35s ease-out' }}
            />
            <div className="absolute top-0 right-0 z-10 flex gap-art-bento-gap bg-black">
              <span
                className="border-art-bento-ink bg-art-bento-bg text-art-bento-ink flex size-9 items-center justify-center"
                style={{
                  borderLeftWidth: 'var(--spacing-art-bento-gap)',
                  borderBottomWidth: 'var(--spacing-art-bento-gap)',
                }}
              >
                <ChevronLeft className="size-4" strokeWidth={2.5} />
              </span>
              <span
                className="border-art-bento-ink bg-art-bento-bg text-art-bento-ink flex size-9 items-center justify-center"
                style={{ borderBottomWidth: 'var(--spacing-art-bento-gap)' }}
              >
                <ChevronRight className="size-4" strokeWidth={2.5} />
              </span>
            </div>
          </div>

          {/* Project */}
          <section className="bg-art-bento-bg col-span-3 row-start-2 flex flex-col p-4">
            <BentoLabel>Project</BentoLabel>
            <div className="mt-auto flex flex-1 flex-col justify-center">
              <h3
                key={project.title}
                className="font-(family-name:--font-serif-display) text-art-bento-ink text-base font-bold leading-tight md:text-xl"
                style={{ animation: 'art-bento-tag-in 0.35s ease-out' }}
              >
                {project.title}
              </h3>
              <p className="text-art-bento-ink mt-2 text-xs opacity-70">
                {project.description}
              </p>
            </div>
          </section>

          {/* Author / social / weather */}
          <div className="col-span-3 row-start-2 grid grid-cols-2 gap-art-bento-gap bg-black">
            <div
              className={`col-span-2 flex flex-col items-center justify-center bg-art-bento-bg p-3 text-center ${bentoCellHover}`}
            >
              <BentoLabel>Author</BentoLabel>
              <p className="font-(family-name:--font-serif-display) text-base font-bold">
                Hugo Lin
              </p>
            </div>
            <div
              className={`flex items-center justify-center bg-art-bento-bg p-3 text-center font-(family-name:--font-serif-display) text-xs font-bold ${bentoCellHover}`}
            >
              GitHub
            </div>
            <div
              className={`flex items-center justify-center bg-art-bento-bg p-3 text-center font-(family-name:--font-serif-display) text-xs font-bold ${bentoCellHover}`}
            >
              Email
            </div>
            <div
              className={`col-span-2 flex flex-col items-center justify-center bg-art-bento-bg p-3 text-center ${bentoCellHover}`}
            >
              <BentoLabel>Weather</BentoLabel>
              <p className="font-(family-name:--font-serif-display) text-sm font-bold">
                18°C · Clear
              </p>
            </div>
          </div>

          {/* Quote */}
          <section
            className={`bg-art-bento-ink text-art-bento-bg col-span-6 row-start-3 flex items-center justify-center p-5 text-center md:p-6 ${bentoCellInvertedHover}`}
          >
            <p className="font-(family-name:--font-serif-display) max-w-md text-base font-bold md:text-lg">
              Talk is cheap. Show me the code.
            </p>
          </section>

          {/* CTA cell — looks like a link, does nothing */}
          <section
            className={`col-span-6 row-start-3 flex items-center justify-center p-5 text-center md:p-6 ${bentoCellGroup}`}
          >
            <span className="font-(family-name:--font-serif-display) text-base font-bold md:text-xl">
              View the latest Article
            </span>
          </section>
        </div>
      </div>
    </div>
  )
}
