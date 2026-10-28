'use client'

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TestimonialCarousel } from '@/components/testimonial-carousel/testimonial-carousel'
import {
  rawOffset,
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

const SHORT_QUOTE: Record<string, string> = {
  atelier: 'A homepage that felt finished on the first day.',
  harbor: 'The components stay quiet in the best way.',
  fieldnote: 'The type, the spacing, and the motion already agreed.',
  kiln: 'A shop that still felt like a studio.',
  paper: 'The previews are the actual layouts.',
  lumen: 'The first dashboard we did not have to reskin.',
}

const POSES = [
  { offset: -1, label: '−1' },
  { offset: 0, label: '0' },
  { offset: 1, label: '+1' },
  { offset: 2, label: '+2' },
] as const

const STAGES = ['piece', 'track', 'poses', 'wrap', 'clock', 'gesture', 'marks', 'type'] as const

type StageName = (typeof STAGES)[number]

function figureItems(longId?: string | null): Testimonial[] {
  return testimonialCarousel.map((item) => ({
    ...item,
    quote: item.id === longId ? item.quote : (SHORT_QUOTE[item.id] ?? item.quote),
  }))
}

function formatOffset(offset: number) {
  if (offset > 0) return `+${offset}`
  return String(offset).replace('-', '−')
}

function moveTransition(reduced: boolean) {
  if (reduced) return 'none'
  return `transform ${TESTIMONIAL_MOVE_MS}ms ${TESTIMONIAL_EASE}, opacity ${TESTIMONIAL_MOVE_MS}ms ease`
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setReduced(media.matches)
      setReady(true)
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return { reduced, ready }
}

function StageFrame({
  testId,
  control,
  status,
  caption,
  children,
}: {
  testId: string
  control?: ReactNode
  status?: ReactNode
  caption: string
  children: ReactNode
}) {
  return (
    <figure
      data-writeup-stage=""
      data-testid={testId}
      className="my-8 w-full overflow-hidden rounded-xl border border-border bg-background"
      style={{
        backgroundImage:
          'linear-gradient(color-mix(in srgb, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--foreground) 6%, transparent) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="p-3 sm:p-4">
        {control || status ? (
          <div className="mb-3 space-y-2">
            {control ? <div className="min-w-0">{control}</div> : null}
            {status ? <p className="text-sm text-pretty text-muted-foreground">{status}</p> : null}
          </div>
        ) : null}
        {children}
        <figcaption className="mt-3 text-center text-[13px] leading-relaxed text-pretty text-muted-foreground">
          {caption}
        </figcaption>
      </div>
    </figure>
  )
}

function Paper({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn('overflow-hidden rounded-xl bg-card text-card-foreground', className)}
      style={testimonialThemeVars}
    >
      {children}
    </div>
  )
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex flex-wrap rounded-full border border-border bg-card p-0.5"
    >
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-full px-3 py-1 text-[13px] font-medium transition-colors',
              selected ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function Dots() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 w-3/5"
      style={{
        backgroundImage: 'radial-gradient(var(--t-dot) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
        maskImage: 'radial-gradient(120% 105% at 100% 50%, #000 0%, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(120% 105% at 100% 50%, #000 0%, transparent 72%)',
      }}
    />
  )
}

function QuoteFace({ item }: { item: Testimonial }) {
  return (
    <div className="relative z-10 flex h-full min-h-[9.5rem] flex-col justify-between gap-6">
      <p className="max-w-[40ch] text-[15px] font-medium leading-snug text-[var(--t-body)] md:text-lg md:leading-[1.35]">
        “{item.quote}”
      </p>
      <div className="flex items-center gap-3">
        <Image
          src={item.avatar}
          alt=""
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-[10px] object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium leading-tight">{item.name}</p>
          <p className="mt-0.5 truncate text-[13px] leading-tight text-[var(--t-soft)] md:text-[15px]">
            {item.role}, {item.company}
          </p>
        </div>
      </div>
    </div>
  )
}

function StepButtons({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
}: {
  onPrev: () => void
  onNext: () => void
  prevDisabled?: boolean
  nextDisabled?: boolean
}) {
  const className =
    'grid size-9 place-items-center rounded-full text-foreground shadow-[inset_0_0_0_1px_var(--t-line)] transition-colors hover:bg-foreground/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent'
  return (
    <div className="flex items-center gap-2">
      <button type="button" className={className} aria-label="Previous testimonial" onClick={onPrev} disabled={prevDisabled}>
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>
      <button type="button" className={className} aria-label="Next testimonial" onClick={onNext} disabled={nextDisabled}>
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}

function DeckFooter({
  index,
  count,
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
}: {
  index: number
  count: number
  onPrev: () => void
  onNext: () => void
  prevDisabled?: boolean
  nextDisabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-5">
      <p className="text-sm text-[var(--t-soft)]">
        {index + 1} of {count}
      </p>
      <StepButtons
        onPrev={onPrev}
        onNext={onNext}
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
      />
    </div>
  )
}

function OffsetChips({
  items,
  index,
  offsetAt,
}: {
  items: Testimonial[]
  index: number
  offsetAt: (itemIndex: number) => number
}) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5 px-4 md:px-5">
      {items.map((item, itemIndex) => {
        const offset = offsetAt(itemIndex)
        const selected = itemIndex === index
        const peek = offset === 1
        return (
          <li
            key={item.id}
            className={cn(
              'rounded-full px-2.5 py-1 text-[12px] leading-none',
              selected && 'bg-foreground text-background',
              peek && !selected && 'text-foreground ring-1 ring-foreground/30',
              !selected && !peek && 'text-foreground/70',
            )}
          >
            <span className="font-mono">{formatOffset(offset)}</span>
            <span className="ml-1.5">{item.company}</span>
          </li>
        )
      })}
    </ul>
  )
}

function StackDeck({
  items,
  offsetAt,
  reduced,
  onPeek,
  revealOffset,
  peekTag,
}: {
  items: Testimonial[]
  offsetAt: (itemIndex: number) => number
  reduced: boolean
  onPeek?: (itemIndex: number) => void
  revealOffset?: number | null
  peekTag?: boolean
}) {
  const hasPeek = items.some((_, itemIndex) => offsetAt(itemIndex) === 1)

  return (
    <div className="relative grid overflow-hidden">
      {items.map((item, itemIndex) => {
        const offset = offsetAt(itemIndex)
        const motion = slideMotion(offset)
        const outlined = revealOffset === offset && motion.opacity > 0
        return (
          <article
            key={item.id}
            data-peek={offset === 1 ? 'true' : undefined}
            data-offset={offset}
            aria-hidden={offset !== 0}
            className={cn(
              'relative col-start-1 row-start-1 flex w-[78%] flex-col justify-self-start overflow-hidden rounded-2xl bg-[var(--t-card)] p-5 md:p-6',
              offset === 1 && onPeek && 'cursor-pointer',
            )}
            style={{
              ...motion,
              transition: moveTransition(reduced),
              boxShadow: outlined ? 'inset 0 0 0 1.5px var(--foreground)' : undefined,
            }}
            onClick={() => {
              if (offset === 1) onPeek?.(itemIndex)
            }}
          >
            <Dots />
            {peekTag && offset === 1 ? (
              <span className="absolute top-3 left-3 z-20 rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-medium tracking-[0.14em] text-foreground/70 uppercase">
                Peek
              </span>
            ) : null}
            <QuoteFace item={item} />
          </article>
        )
      })}
      {hasPeek ? null : (
        <div className="pointer-events-none absolute inset-y-4 right-3 z-10 flex w-[18%] items-center justify-center rounded-xl border border-dashed border-foreground/25 px-1 text-center text-[11px] leading-tight text-foreground/55">
          No +1
        </div>
      )}
    </div>
  )
}

function PieceStage() {
  return (
    <StageFrame
      testId="testimonial-stage-piece"
      caption="The live band. The quote, the bar, the arrows, and the marks share one index."
    >
      <div className="overflow-hidden rounded-xl">
        <TestimonialCarousel className="py-8 md:py-10" />
      </div>
    </StageFrame>
  )
}

function TrackStage() {
  const { reduced } = useReducedMotion()
  const items = figureItems()
  const count = items.length
  const [index, setIndex] = useState(count - 1)
  const atStart = index === 0
  const atEnd = index === count - 1

  return (
    <StageFrame
      testId="testimonial-stage-track"
      caption={
        atEnd
          ? 'Last slide. The row has no neighbor, so the right edge is empty.'
          : 'Earlier slides still have a neighbor peeking in.'
      }
      status={<span className="font-mono">translateX({index * -80}%)</span>}
    >
      <Paper>
        <div className="relative overflow-hidden">
          <div
            className="flex w-full items-stretch"
            style={{
              transform: `translateX(${index * -80}%)`,
              transition: moveTransition(reduced),
            }}
          >
            {items.map((item) => (
              <article
                key={item.id}
                className="relative mr-[2%] flex w-[78%] shrink-0 flex-col rounded-2xl bg-[var(--t-card)] p-5 md:p-6"
              >
                <Dots />
                <QuoteFace item={item} />
              </article>
            ))}
          </div>
          {atEnd ? (
            <div className="pointer-events-none absolute inset-y-4 right-3 z-10 flex w-[18%] items-center justify-center rounded-xl border border-dashed border-foreground/25 px-1 text-center text-[11px] leading-tight text-foreground/55">
              No neighbor
            </div>
          ) : null}
        </div>
        <DeckFooter
          index={index}
          count={count}
          onPrev={() => setIndex((value) => Math.max(0, value - 1))}
          onNext={() => setIndex((value) => Math.min(count - 1, value + 1))}
          prevDisabled={atStart}
          nextDisabled={atEnd}
        />
      </Paper>
    </StageFrame>
  )
}

function PosesStage() {
  const { reduced } = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [inspect, setInspect] = useState(1)
  const [long, setLong] = useState(false)
  const items = figureItems(long ? 'fieldnote' : null)
  const count = items.length
  const offsetAt = (itemIndex: number) => slideOffset(itemIndex, index, count)
  const inspected = items.find((_, itemIndex) => offsetAt(itemIndex) === inspect)
  const motion = slideMotion(inspect)
  const fieldIndex = items.findIndex((item) => item.id === 'fieldnote')
  const fieldOffset = fieldIndex === -1 ? 0 : offsetAt(fieldIndex)

  let caption = motion.opacity > 0
    ? 'The outlined card is the pose selected above. Lengthen Fieldnote while it is parked.'
    : 'This pose is opacity 0, so the card stays out of the way. Lengthen Fieldnote while it is parked.'
  if (long && fieldOffset !== 0) {
    caption = 'Fieldnote is offstage. The words in front stayed put, and the cell still grew.'
  } else if (long) {
    caption = 'Fieldnote is the quote on stage, so the extra lines are the ones you can read.'
  }

  return (
    <StageFrame
      testId="testimonial-stage-poses"
      caption={caption}
      control={
        <div className="flex flex-wrap items-center gap-2">
          <Segmented
            label="Pose"
            value={String(inspect)}
            options={POSES.map((pose) => ({ value: String(pose.offset), label: pose.label }))}
            onChange={(value) => setInspect(Number(value))}
          />
          <button
            type="button"
            aria-pressed={long}
            onClick={() => setLong((value) => !value)}
            className={cn(
              'rounded-full border px-3 py-1 text-[13px] font-medium',
              long ? 'border-foreground bg-foreground text-background' : 'border-border text-foreground hover:bg-muted',
            )}
          >
            {long ? 'Short quotes' : 'Lengthen Fieldnote'}
          </button>
        </div>
      }
      status={
        <span className="font-mono text-[12px] leading-relaxed">
          {inspected?.company ?? 'Parked'} · {formatOffset(inspect)} · {motion.transform} · opacity {motion.opacity}
        </span>
      }
    >
      <Paper>
        <StackDeck
          items={items}
          offsetAt={offsetAt}
          reduced={reduced}
          revealOffset={inspect}
          onPeek={(itemIndex) => setIndex(itemIndex)}
        />
        <DeckFooter
          index={index}
          count={count}
          onPrev={() => setIndex(wrapIndex(index - 1, count))}
          onNext={() => setIndex(wrapIndex(index + 1, count))}
        />
      </Paper>
    </StageFrame>
  )
}

function WrapStage() {
  const { reduced } = useReducedMotion()
  const items = figureItems()
  const count = items.length
  const [index, setIndex] = useState(count - 1)
  const [folded, setFolded] = useState(false)
  const offsetAt = (itemIndex: number) =>
    folded ? slideOffset(itemIndex, index, count) : rawOffset(itemIndex, index)
  const next = wrapIndex(index + 1, count)
  const nextItem = items[next]
  const nextOffset = offsetAt(next)

  return (
    <StageFrame
      testId="testimonial-stage-wrap"
      caption={
        folded
          ? `${nextItem?.company} is ${formatOffset(nextOffset)}. It peeks from the right.`
          : `${nextItem?.company} is ${formatOffset(nextOffset)}. Nothing is at +1, so the right edge is empty.`
      }
      control={
        <Segmented
          label="Offset"
          value={folded ? 'short' : 'raw'}
          options={[
            { value: 'raw', label: 'Raw difference' },
            { value: 'short', label: 'Short way' },
          ]}
          onChange={(value) => setFolded(value === 'short')}
        />
      }
    >
      <Paper>
        <StackDeck
          items={items}
          offsetAt={offsetAt}
          reduced={reduced}
          onPeek={(itemIndex) => setIndex(itemIndex)}
        />
        <OffsetChips items={items} index={index} offsetAt={offsetAt} />
        <DeckFooter
          index={index}
          count={count}
          onPrev={() => setIndex(wrapIndex(index - 1, count))}
          onNext={() => setIndex(wrapIndex(index + 1, count))}
        />
      </Paper>
    </StageFrame>
  )
}

function ClockStage() {
  const items = figureItems()
  const count = items.length
  const { reduced: systemReduced, ready } = useReducedMotion()
  const [mode, setMode] = useState<'clock' | 'reduced' | null>(null)
  const reduced = (mode ?? (systemReduced ? 'reduced' : 'clock')) === 'reduced'
  const showClock = ready && !reduced
  const [index, setIndex] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [keyboardFocus, setKeyboardFocus] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const secondsRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!showClock) return
    let frame = 0
    const tick = () => {
      const anim = fillRef.current?.getAnimations()[0]
      const time = anim?.currentTime
      const ms = typeof time === 'number' ? time : 0
      if (secondsRef.current) {
        secondsRef.current.textContent = `${(ms / 1000).toFixed(1)}s of 7s`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [showClock, index])

  function syncKeyboardFocus() {
    const root = rootRef.current
    const current = document.activeElement
    if (!(current instanceof HTMLElement) || !root?.contains(current)) {
      setKeyboardFocus(false)
      return
    }
    setKeyboardFocus(current.matches(':focus-visible'))
  }

  function select(next: number) {
    setIndex(wrapIndex(next, count))
    if (secondsRef.current) secondsRef.current.textContent = '0.0s of 7s'
  }

  const active = items[index]
  if (!active) return null

  const statusWord = !ready
    ? 'Reading motion preference'
    : reduced
      ? 'Reduced motion'
      : keyboardFocus
        ? 'Paused · keyboard'
        : hovering
          ? 'Paused · pointer'
          : 'Running'

  return (
    <StageFrame
      testId="testimonial-stage-clock"
      caption="Hover the band to pause. Leave, and the same seven seconds continue. A click remounts the fill at zero."
      control={
        <Segmented
          label="Clock mode"
          value={reduced ? 'reduced' : 'clock'}
          options={[
            { value: 'clock', label: 'Clock' },
            { value: 'reduced', label: 'Reduced motion' },
          ]}
          onChange={setMode}
        />
      }
      status={
        <>
          <span aria-live="polite">{statusWord}</span>
          {showClock ? (
            <span ref={secondsRef} aria-hidden="true" className="ml-1.5 font-mono">
              0.0s of 7s
            </span>
          ) : ready ? (
            <span className="ml-1.5 font-mono">
              {index + 1} of {count}
            </span>
          ) : null}
        </>
      }
    >
      <Paper>
        <div
          ref={rootRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocusCapture={() => {
            queueMicrotask(syncKeyboardFocus)
          }}
          onBlurCapture={() => {
            queueMicrotask(syncKeyboardFocus)
          }}
        >
          <div className="px-5 pt-6 md:px-8">
            <p className="max-w-[40ch] text-lg font-medium leading-snug text-[var(--t-body)]">
              “{active.quote}”
            </p>
            <p className="mt-3 text-sm font-medium">{active.name}</p>
          </div>
          <div className="mt-6 flex items-center gap-5 px-5 md:px-8">
            <div
              className="relative h-px flex-1 bg-[var(--t-line)]"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={count}
              aria-valuenow={index + 1}
              aria-valuetext={showClock ? 'Time until the next quote' : `Testimonial ${index + 1} of ${count}`}
              aria-label="Testimonial progress"
            >
              {showClock ? (
                <div
                  key={index}
                  ref={fillRef}
                  className="absolute inset-y-0 left-0 w-full origin-left bg-[var(--t-fill)]"
                  style={{
                    animationName: 'tawny-testimonial-progress',
                    animationDuration: `${TESTIMONIAL_AUTOPLAY_MS}ms`,
                    animationTimingFunction: 'linear',
                    animationFillMode: 'forwards',
                    animationPlayState: hovering || keyboardFocus ? 'paused' : 'running',
                  }}
                  onAnimationEnd={(event) => {
                    if (event.target !== event.currentTarget) return
                    if (hovering || keyboardFocus) return
                    select(index + 1)
                  }}
                />
              ) : (
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--t-fill)]"
                  style={{ width: `${((index + 1) / count) * 100}%` }}
                />
              )}
            </div>
            <StepButtons onPrev={() => select(index - 1)} onNext={() => select(index + 1)} />
          </div>
          <p className="px-5 pt-3 pb-5 text-[12px] text-[var(--t-soft)] md:px-8">
            {showClock
              ? 'This fill is time until the next quote.'
              : 'This fill is place in the set. Choosing a quote is the only way it moves.'}
          </p>
        </div>
      </Paper>
    </StageFrame>
  )
}

function GestureStage() {
  const items = figureItems()
  const count = items.length
  const { reduced } = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [policy, setPolicy] = useState<'keep' | 'click'>('keep')
  const [drag, setDrag] = useState<{ dx: number; dy: number } | null>(null)
  const [held, setHeld] = useState<{ dx: number; dy: number } | null>(null)
  const [verdict, setVerdict] = useState('Drag right onto the peek.')
  const origin = useRef<{ x: number; y: number; id: number } | null>(null)
  const consumed = useRef(false)
  const sample = drag ?? held
  const dx = sample?.dx ?? 0
  const dy = sample?.dy ?? 0
  const absX = Math.abs(dx)
  const absY = Math.abs(dy)

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    origin.current = { x: event.clientX, y: event.clientY, id: event.pointerId }
    setDrag({ dx: 0, dy: 0 })
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const start = origin.current
    if (!start || start.id !== event.pointerId) return
    setDrag({ dx: event.clientX - start.x, dy: event.clientY - start.y })
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = origin.current
    origin.current = null
    setDrag(null)
    if (!start || start.id !== event.pointerId) return
    const nextDx = event.clientX - start.x
    const nextDy = event.clientY - start.y
    setHeld({ dx: nextDx, dy: nextDy })
    if (Math.abs(nextDx) < 8 && Math.abs(nextDy) < 8) return
    const direction = swipeDirection(nextDx, nextDy)
    if (direction === null) {
      setVerdict(
        Math.abs(nextDx) < 48
          ? `${Math.round(Math.abs(nextDx))}px stays under the 48px line.`
          : 'Steeper than a swipe. The page would scroll.',
      )
      return
    }
    const node = document.elementFromPoint(event.clientX, event.clientY)
    const onPeek = node instanceof Element && Boolean(node.closest('[data-peek="true"]'))
    consumed.current = true
    if (onPeek && policy === 'click') {
      setIndex(wrapIndex(index + 1, count))
      setVerdict(
        direction === -1
          ? 'The click on the peek won. The swipe had said previous.'
          : 'The swipe and the click both chose the next quote.',
      )
      return
    }
    setIndex(wrapIndex(index + direction, count))
    setVerdict(
      onPeek
        ? 'Swipe counted. The click on the peek was ignored.'
        : direction === 1
          ? 'Swipe counted. Next quote.'
          : 'Swipe counted. Previous quote.',
    )
  }

  return (
    <StageFrame
      testId="testimonial-stage-gesture"
      caption="A rightward swipe means previous. Releasing on the peek also fires its click, unless the swipe keeps the turn."
      control={
        <Segmented
          label="Click after a swipe"
          value={policy}
          options={[
            { value: 'keep', label: 'Keep the swipe' },
            { value: 'click', label: 'Let the click win' },
          ]}
          onChange={setPolicy}
        />
      }
      status={<span aria-live="polite">{verdict}</span>}
    >
      <Paper>
        <div
          className="touch-none select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            origin.current = null
            setDrag(null)
          }}
        >
          <StackDeck
            items={items}
            offsetAt={(itemIndex) => slideOffset(itemIndex, index, count)}
            reduced={reduced}
            peekTag
            onPeek={(itemIndex) => {
              if (consumed.current) {
                consumed.current = false
                return
              }
              setIndex(itemIndex)
              setVerdict('Click. The peek is a control.')
            }}
          />
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 font-mono text-[12px] text-foreground/70 md:px-5">
            <p>
              {absX >= 48 ? '≥ 48px' : '< 48px'} · dx {Math.round(dx)}
            </p>
            <p>
              {absX >= absY * 1.2 ? '|dx| ≥ |dy| × 1.2' : '|dx| < |dy| × 1.2'} · dy {Math.round(dy)}
            </p>
          </div>
        </div>
      </Paper>
    </StageFrame>
  )
}

function MarksStage() {
  const items = figureItems()
  const count = items.length
  const [index, setIndex] = useState(0)
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const pending = useRef<string | null>(null)
  const active = items[index]

  useEffect(() => {
    const id = pending.current
    if (!id) return
    pending.current = null
    document.getElementById(id)?.focus()
  }, [index])

  function select(next: number, moveFocus: boolean) {
    const wrapped = wrapIndex(next, count)
    if (wrapped === index) return
    if (moveFocus) pending.current = `writeup-company-tab-${items[wrapped]?.id}`
    setIndex(wrapped)
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
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
    select(next, true)
  }

  if (!active) return null

  return (
    <StageFrame
      testId="testimonial-stage-marks"
      caption="One tab stop. Arrow keys move the index, then the focus follows on the next paint."
      status={
        <span className="font-mono">
          index {index} · {active.company}
        </span>
      }
    >
      <Paper>
        <div className="px-5 pt-6 md:px-8">
          <p className="max-w-[40ch] text-lg font-medium leading-snug text-[var(--t-body)]">“{active.quote}”</p>
          <p className="mt-3 text-sm font-medium">{active.name}</p>
        </div>
        <div
          role="tablist"
          aria-label="Companies"
          className="mt-5 flex gap-1 overflow-x-auto px-3 pb-4 [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden"
          onKeyDown={onKeyDown}
        >
          {items.map((item, itemIndex) => {
            const selected = itemIndex === index
            const focused = focusedId === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`writeup-company-tab-${item.id}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(itemIndex, false)}
                onFocus={() => setFocusedId(item.id)}
                onBlur={() => setFocusedId((current) => (current === item.id ? null : current))}
                className="flex shrink-0 flex-col items-center gap-1 rounded-xl px-1.5 py-1 outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              >
                <span className="relative flex h-9 items-center gap-2 rounded-full px-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-0 rounded-full bg-[var(--t-card)] transition-opacity duration-200',
                      selected ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <Image src={item.companyLogo} alt="" width={16} height={16} className="relative size-4 shrink-0 dark:invert" />
                  <span
                    className={cn(
                      'relative text-sm font-medium tracking-[-0.01em] whitespace-nowrap',
                      selected ? 'opacity-100' : 'opacity-40',
                    )}
                  >
                    {item.company}
                  </span>
                </span>
                <span className="font-mono text-[10px] text-foreground/50">
                  {selected ? 'tabIndex 0' : 'tabIndex −1'}
                </span>
                <span
                  aria-hidden="true"
                  className={cn('h-3 text-[10px] font-medium', focused ? 'text-foreground' : 'text-transparent')}
                >
                  Focused
                </span>
              </button>
            )
          })}
        </div>
      </Paper>
    </StageFrame>
  )
}

function TypeStage() {
  const [size, setSize] = useState(28)
  const faces = testimonialCarousel.slice(0, 3)
  const emPx = size * 0.92

  return (
    <StageFrame
      testId="testimonial-stage-type"
      caption={`The portraits are 0.92em — ${emPx.toFixed(1)}px next to ${size}px type. They stay the first three people.`}
      control={
        <label className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          Headline size
          <input
            type="range"
            min={28}
            max={40}
            step={1}
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
            aria-label="Headline size"
            aria-valuemin={28}
            aria-valuemax={40}
            aria-valuenow={size}
            aria-valuetext={`${size} pixels`}
            className="h-1 w-36 cursor-pointer accent-foreground"
          />
          <span className="font-mono text-foreground">{size}px</span>
        </label>
      }
    >
      <Paper>
        <div className="px-5 py-10 md:px-8">
          <p
            className="mx-auto max-w-[34rem] text-center font-serif leading-[1.15] tracking-[-0.02em] text-balance text-foreground"
            style={{ fontSize: size }}
          >
            Thousands approved. Here&apos;s what{' '}
            <span className="mx-[0.18em] inline-flex translate-y-[0.08em] align-baseline">
              {faces.map((item, avatarIndex) => (
                <span
                  key={item.id}
                  className="relative size-[0.92em] shrink-0 overflow-hidden rounded-full shadow-[0_0_0_0.08em_var(--card)]"
                  style={{
                    marginLeft: avatarIndex === 0 ? 0 : '-0.3em',
                    zIndex: 3 - avatarIndex,
                  }}
                >
                  <Image src={item.avatar} alt="" fill sizes="48px" className="object-cover" />
                </span>
              ))}
            </span>{' '}
            they&apos;re saying.
          </p>
        </div>
      </Paper>
    </StageFrame>
  )
}

/** Interactive figures for the testimonial-carousel writeup. */
export function TestimonialStage({ stage }: { stage: StageName }) {
  switch (stage) {
    case 'piece':
      return <PieceStage />
    case 'track':
      return <TrackStage />
    case 'poses':
      return <PosesStage />
    case 'wrap':
      return <WrapStage />
    case 'clock':
      return <ClockStage />
    case 'gesture':
      return <GestureStage />
    case 'marks':
      return <MarksStage />
    case 'type':
      return <TypeStage />
    default:
      return null
  }
}
