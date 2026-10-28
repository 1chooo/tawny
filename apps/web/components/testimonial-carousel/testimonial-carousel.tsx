'use client'

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  slideMotion,
  slideOffset,
  swipeDirection,
  TESTIMONIAL_AUTOPLAY_MS,
  TESTIMONIAL_EASE,
  TESTIMONIAL_MOVE_MS,
  testimonialCarousel,
  testimonialThemeVars,
  wrapIndex,
  type Testimonial,
} from '@/lib/testimonial-carousel'
import { cn } from '@tawny/ui/lib/utils'

const iconButtonClass =
  'grid size-9 place-items-center rounded-full text-foreground shadow-[inset_0_0_0_1px_var(--t-line)] transition-colors hover:bg-foreground/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background'

type MotionPreference = 'pending' | 'reduce' | 'ok'
type ChangeSource = 'manual' | 'auto'

function useMotionPreference() {
  const [motion, setMotion] = useState<MotionPreference>('pending')

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotion(media.matches ? 'reduce' : 'ok')
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return {
    reduced: motion === 'reduce',
    ready: motion !== 'pending',
  }
}

export function TestimonialCarousel({
  items = testimonialCarousel,
  className,
}: {
  items?: Testimonial[]
  className?: string
}) {
  const count = items.length
  const [index, setIndex] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [keyboardFocus, setKeyboardFocus] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const { reduced, ready } = useMotionPreference()
  const rootRef = useRef<HTMLElement>(null)
  const tabListRef = useRef<HTMLDivElement>(null)
  const pendingFocusId = useRef<string | null>(null)
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null)
  const consumedSwipe = useRef(false)

  const active = items[index]
  const paused = !ready || reduced || hovering || keyboardFocus

  function select(next: number, source: ChangeSource) {
    if (count === 0) return
    const wrapped = wrapIndex(next, count)
    if (wrapped === index) return
    const item = items[wrapped]
    if (!item) return
    setIndex(wrapped)
    if (source === 'manual') {
      setAnnouncement(`${item.name}, ${item.role}, ${item.company}. ${item.quote}`)
    }
  }

  useEffect(() => {
    const id = pendingFocusId.current
    if (!id) return
    pendingFocusId.current = null
    document.getElementById(id)?.focus()
  }, [index])

  useEffect(() => {
    const list = tabListRef.current
    const tab = list?.querySelector<HTMLElement>('[aria-selected="true"]')
    if (!list || !tab) return
    if (list.scrollWidth <= list.clientWidth + 1) return
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2
    list.scrollTo({
      left: Math.max(0, left),
      behavior: reduced ? 'auto' : 'smooth',
    })
  }, [index, reduced])

  function syncKeyboardFocus() {
    const root = rootRef.current
    const current = document.activeElement
    if (!(current instanceof HTMLElement) || !root?.contains(current)) {
      setKeyboardFocus(false)
      return
    }
    setKeyboardFocus(current.matches(':focus-visible'))
  }

  function onTabKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const next =
      event.key === 'ArrowRight'
        ? index + 1
        : event.key === 'ArrowLeft'
          ? index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? count - 1
              : null
    if (next === null) return
    event.preventDefault()
    event.stopPropagation()
    const wrapped = wrapIndex(next, count)
    if (wrapped === index) return
    pendingFocusId.current = `testimonial-carousel-tab-${items[wrapped]?.id}`
    select(wrapped, 'manual')
  }

  function onSectionKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    if ((event.target as HTMLElement).closest('[role="tablist"]')) return
    event.preventDefault()
    select(index + (event.key === 'ArrowRight' ? 1 : -1), 'manual')
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId }
    consumedSwipe.current = false
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = gesture.current
    gesture.current = null
    if (!start || start.id !== event.pointerId) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    const direction = swipeDirection(dx, dy)
    if (direction === null) return
    consumedSwipe.current = true
    select(index + direction, 'manual')
  }

  if (!active) return null

  return (
    <section
      ref={rootRef}
      id="testimonial-carousel"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      className={cn(
        'bg-background px-6 py-16 text-foreground md:px-8 md:py-24',
        className,
      )}
      style={testimonialThemeVars}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => {
        queueMicrotask(syncKeyboardFocus)
      }}
      onBlurCapture={() => {
        queueMicrotask(syncKeyboardFocus)
      }}
      onKeyDown={onSectionKeyDown}
    >
      <div className="mx-auto w-full max-w-[1072px]">
        <h2 className="mx-auto max-w-[18rem] text-balance text-center font-serif text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-foreground sm:max-w-[28rem] md:max-w-[34rem] md:text-[2.5rem] md:leading-[1.12]">
          Thousands approved. Here&apos;s what{' '}
          <span className="mx-[0.18em] inline-flex translate-y-[0.08em] align-baseline">
            {items.slice(0, 3).map((item, avatarIndex) => (
              <span
                key={item.id}
                className="relative size-[0.92em] shrink-0 overflow-hidden rounded-full shadow-[0_0_0_0.08em_var(--background)]"
                style={{
                  marginLeft: avatarIndex === 0 ? 0 : '-0.3em',
                  zIndex: 3 - avatarIndex,
                }}
              >
                <Image
                  src={item.avatar}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
            ))}
          </span>{' '}
          they&apos;re saying.
        </h2>

        <div
          className="relative mt-10 grid touch-pan-y overflow-hidden md:mt-12"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            gesture.current = null
          }}
        >
          {items.map((item, itemIndex) => {
            const offset = slideOffset(itemIndex, index, count)
            const motion = slideMotion(offset)
            return (
              <article
                key={item.id}
                id={`testimonial-carousel-slide-${item.id}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${itemIndex + 1} of ${count}`}
                aria-hidden={offset !== 0}
                className={cn(
                  'relative col-start-1 row-start-1 flex h-full min-h-[300px] w-[88%] flex-col justify-between gap-8 justify-self-start overflow-hidden rounded-2xl bg-[var(--t-card)] p-6 md:min-h-[380px] md:w-[78%] md:p-10',
                  offset === 1 && 'cursor-pointer',
                )}
                style={{
                  ...motion,
                  transition: reduced
                    ? 'none'
                    : `transform ${TESTIMONIAL_MOVE_MS}ms ${TESTIMONIAL_EASE}, opacity ${TESTIMONIAL_MOVE_MS}ms ease`,
                }}
                onClick={() => {
                  if (consumedSwipe.current) {
                    consumedSwipe.current = false
                    return
                  }
                  if (offset === 1) select(itemIndex, 'manual')
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-3/5"
                  style={{
                    backgroundImage:
                      'radial-gradient(var(--t-dot) 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                    maskImage:
                      'radial-gradient(120% 105% at 100% 50%, #000 0%, transparent 72%)',
                    WebkitMaskImage:
                      'radial-gradient(120% 105% at 100% 50%, #000 0%, transparent 72%)',
                  }}
                />
                <p className="relative z-10 max-w-[46ch] text-base font-medium leading-snug text-[var(--t-body)] md:text-xl md:leading-[1.33]">
                  “{item.quote}”
                </p>
                <div className="relative z-10 flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 shrink-0 rounded-[10px] object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium leading-tight text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-[15px] leading-tight text-[var(--t-soft)]">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-5 flex items-center gap-5 md:mt-6">
          <div
            className="relative h-px flex-1 bg-[var(--t-line)]"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={count}
            aria-valuenow={index + 1}
            aria-valuetext={`Testimonial ${index + 1} of ${count}`}
            aria-label="Testimonial progress"
          >
            {ready && !reduced ? (
              <div
                key={index}
                className="absolute inset-y-0 left-0 w-full origin-left bg-[var(--t-fill)]"
                style={{
                  animationName: 'tawny-testimonial-progress',
                  animationDuration: `${TESTIMONIAL_AUTOPLAY_MS}ms`,
                  animationTimingFunction: 'linear',
                  animationFillMode: 'forwards',
                  animationPlayState: paused ? 'paused' : 'running',
                }}
                onAnimationEnd={(event) => {
                  if (event.target !== event.currentTarget) return
                  select(index + 1, 'auto')
                }}
              />
            ) : (
              <div
                className="absolute inset-y-0 left-0 bg-[var(--t-fill)]"
                style={{ width: `${((index + 1) / count) * 100}%` }}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={iconButtonClass}
              aria-label="Previous testimonial"
              aria-controls={`testimonial-carousel-slide-${active.id}`}
              onClick={() => select(index - 1, 'manual')}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={iconButtonClass}
              aria-label="Next testimonial"
              aria-controls={`testimonial-carousel-slide-${active.id}`}
              onClick={() => select(index + 1, 'manual')}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Companies"
          className="mt-5 flex w-full items-center justify-between gap-1 overflow-x-auto py-1 [scrollbar-width:none] md:mt-6 [&::-webkit-scrollbar]:hidden"
          onKeyDown={onTabKeyDown}
        >
          {items.map((item, itemIndex) => {
            const selected = itemIndex === index
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`testimonial-carousel-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`testimonial-carousel-slide-${item.id}`}
                tabIndex={selected ? 0 : -1}
                className="relative flex h-9 shrink-0 items-center justify-center rounded-full px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-inset"
                onClick={() => select(itemIndex, 'manual')}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0 rounded-full bg-[var(--t-card)] transition-opacity duration-200',
                    selected ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'relative flex items-center gap-2 transition-opacity duration-200',
                    selected ? 'opacity-100' : 'opacity-40',
                  )}
                >
                  <Image
                    src={item.companyLogo}
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 shrink-0 dark:invert"
                  />
                  <span className="text-sm font-medium tracking-[-0.01em] whitespace-nowrap md:text-[15px]">
                    {item.company}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </section>
  )
}
