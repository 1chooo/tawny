'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  bentoCellGroup,
  bentoCellHover,
  bentoCellInvertedHover,
} from '@/lib/art/bento-cell'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { cn } from '@tawny/ui/lib/utils'

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
  { src: '/images/art-gallery/cover-1.png', alt: 'Gallery cover 1' },
  { src: '/images/art-gallery/cover-2.png', alt: 'Gallery cover 2' },
  { src: '/images/art-gallery/cover-3.png', alt: 'Gallery cover 3' },
]

const INTERVAL_MS = 5000

function BentoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 inline-block border-b-2 border-current text-center text-xs font-bold tracking-[0.15em] uppercase">
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
 * Desktop-fidelity Art home mock — fixed 1440×900 canvas scaled into the frame.
 * Hover + autoplay only; no navigation.
 */
export function ArtPreviewMock({ className }: ArtPreviewMockProps) {
  const tagIndex = useCycle(TAGS.length)
  const upcomingIndex = useCycle(UPCOMING.length)
  const projectIndex = useCycle(PROJECTS.length)
  const galleryIndex = useCycle(HERO_IMAGES.length)

  const tag = TAGS[tagIndex]!
  const upcoming = UPCOMING[upcomingIndex]!
  const project = PROJECTS[projectIndex]!
  const image = HERO_IMAGES[galleryIndex]!

  return (
    <div
      role="img"
      aria-label="Art design preview"
      className={cn('h-full select-none', className)}
      onClick={(e) => e.preventDefault()}
      onKeyDown={(e) => e.preventDefault()}
    >
      <ScaledDesignCanvas>
        <div className="art-root flex h-full min-h-0 flex-col overflow-hidden bg-black text-art-bento-ink antialiased">
          <header className="shrink-0 bg-art-bento-bg pt-3">
            <div className="relative flex items-center justify-between gap-4 px-5 pb-3">
              <span className="text-lg font-bold tracking-tight text-art-bento-ink">
                Hugo Lin
              </span>
              <nav className="flex flex-wrap items-center justify-end gap-5">
                <ul className="flex items-center gap-5 text-sm font-bold">
                  {['Notes', 'Projects', 'About'].map((label) => (
                    <li key={label}>
                      <span className="cursor-default opacity-90 transition-opacity hover:opacity-100 hover:underline">
                        {label}
                      </span>
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

          <div className="flex min-h-0 flex-1 flex-col bg-black p-art-bento-gap">
            <div className="grid min-h-0 flex-1 grid-cols-12 grid-rows-[auto_1fr_auto] gap-art-bento-gap bg-black">
              <section
                className={`col-span-3 flex flex-col items-center justify-center p-5 text-center ${bentoCellGroup}`}
              >
                <BentoLabel>Copyright</BentoLabel>
                <p className="font-(family-name:--font-serif-display) text-2xl font-bold">
                  Hugo Lin
                </p>
              </section>

              <section
                className={`col-span-3 flex flex-col items-center justify-center p-5 text-center ${bentoCellGroup}`}
              >
                <BentoLabel>Tag</BentoLabel>
                <p
                  key={tag}
                  className="font-(family-name:--font-serif-display) text-2xl font-bold"
                  style={{ animation: 'art-bento-tag-in 0.35s ease-out' }}
                >
                  {tag}
                </p>
              </section>

              <section className="col-span-6 flex flex-col bg-art-bento-bg p-5">
                <BentoLabel>Upcoming</BentoLabel>
                <div className="mt-auto flex flex-1 flex-col justify-center">
                  <h3
                    key={upcoming.title}
                    className="font-(family-name:--font-serif-display) text-2xl font-bold leading-tight text-art-bento-ink"
                    style={{ animation: 'art-bento-tag-in 0.35s ease-out' }}
                  >
                    {upcoming.title}
                  </h3>
                  <p className="mt-2 text-sm text-art-bento-ink opacity-70">
                    {upcoming.description}
                  </p>
                </div>
                <div className="mt-3 flex gap-2 self-end">
                  <span className="flex size-8 items-center justify-center border border-art-bento-ink bg-art-bento-bg text-art-bento-ink transition-colors hover:bg-art-bento-ink hover:text-art-bento-bg">
                    <ChevronLeft className="size-4" strokeWidth={2.5} />
                  </span>
                  <span className="flex size-8 items-center justify-center border border-art-bento-ink bg-art-bento-bg text-art-bento-ink transition-colors hover:bg-art-bento-ink hover:text-art-bento-bg">
                    <ChevronRight className="size-4" strokeWidth={2.5} />
                  </span>
                </div>
              </section>

              {/* Gallery — pinned covers from JustHold blog */}
              <div className="relative col-span-6 row-start-2 min-h-0 overflow-hidden bg-art-bento-bg">
                <Image
                  key={image.src}
                  src={image.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="560px"
                  style={{ animation: 'art-bento-tag-in 0.35s ease-out' }}
                />
                <div className="absolute top-0 right-0 z-10 flex gap-art-bento-gap bg-black pl-art-bento-gap pb-art-bento-gap">
                  <span className="flex size-9 items-center justify-center bg-art-bento-bg text-art-bento-ink transition-colors hover:bg-art-bento-ink hover:text-art-bento-bg">
                    <ChevronLeft className="size-4" strokeWidth={2.5} />
                  </span>
                  <span className="flex size-9 items-center justify-center bg-art-bento-bg text-art-bento-ink transition-colors hover:bg-art-bento-ink hover:text-art-bento-bg">
                    <ChevronRight className="size-4" strokeWidth={2.5} />
                  </span>
                </div>
              </div>

              <section className="col-span-3 row-start-2 flex flex-col bg-art-bento-bg p-5">
                <BentoLabel>Project</BentoLabel>
                <div className="mt-auto flex flex-1 flex-col justify-center">
                  <h3
                    key={project.title}
                    className="font-(family-name:--font-serif-display) text-xl font-bold leading-tight text-art-bento-ink"
                    style={{ animation: 'art-bento-tag-in 0.35s ease-out' }}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs text-art-bento-ink opacity-70">
                    {project.description}
                  </p>
                </div>
              </section>

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

              <section
                className={`col-span-6 row-start-3 flex items-center justify-center bg-art-bento-ink p-6 text-center text-art-bento-bg ${bentoCellInvertedHover}`}
              >
                <p className="max-w-md font-(family-name:--font-serif-display) text-lg font-bold">
                  Talk is cheap. Show me the code.
                </p>
              </section>

              <section
                className={`col-span-6 row-start-3 flex items-center justify-center p-6 text-center ${bentoCellGroup}`}
              >
                <span className="font-(family-name:--font-serif-display) text-xl font-bold">
                  View the latest Article
                </span>
              </section>
            </div>
          </div>
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}
