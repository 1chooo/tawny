'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import { creatures, site } from '@/lib/ocean/content'
import { OceanScene } from '@/lib/ocean/scene'
import { OceanFooter, OceanNav, OceanSections } from './ocean-sections'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

export function OceanExperience({
  mode,
  modelBaseUrl,
  smoothScroll = false,
}: {
  /** `frame` scrolls inside its own container (ProductFrame); `full` scrolls the window */
  mode: 'frame' | 'full'
  modelBaseUrl: string
  smoothScroll?: boolean
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasHostRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
    const root = rootRef.current!
    const stage = stageRef.current!
    const scrollerEl = mode === 'frame' ? scrollerRef.current! : null
    const scroller: Element | Window = scrollerEl ?? window
    const reducedMotion = window.matchMedia(REDUCED_MOTION).matches

    let scene: OceanScene | null = null
    const boot = async () => {
      scene = new OceanScene({
        container: canvasHostRef.current!,
        creatures,
        modelBaseUrl,
        reducedMotion,
        onReady: () => setReady(true),
      })
      await scene.load()
    }
    boot().catch((error) => {
      console.error('[ocean] particle scene unavailable', error)
      setReady(true)
    })

    let lenis: Lenis | null = null
    const lenisRaf = (time: number) => lenis?.raf(time * 1000)
    if (smoothScroll && !reducedMotion && !scrollerEl) {
      lenis = new Lenis()
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(lenisRaf)
      gsap.ticker.lagSmoothing(0)
      lenisRef.current = lenis
    }

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-creature]', root)
      const segments: { el: HTMLElement; from: number; to: number }[] = []
      let previous = Number(sections[0]?.dataset.creature ?? 0)
      for (const el of sections) {
        const creature = Number(el.dataset.creature)
        if (creature !== previous) segments.push({ el, from: previous, to: creature })
        previous = creature
      }
      const progress = segments.map(() => 0)
      const sync = () =>
        scene?.setProgress(
          segments.reduce(
            (sum, s, i) => sum + (s.to - s.from) * progress[i],
            Number(sections[0]?.dataset.creature ?? 0),
          ),
        )
      segments.forEach((segment, i) => {
        const update = (self: ScrollTrigger) => {
          progress[i] = self.progress
          sync()
        }
        ScrollTrigger.create({
          trigger: segment.el,
          scroller,
          start: 'top bottom',
          end: 'top 20%',
          onUpdate: update,
          onRefresh: update,
        })
      })

      if (reducedMotion) return

      for (const el of gsap.utils.toArray<HTMLElement>('[data-split]', root)) {
        const split = SplitText.create(el, { type: 'words', mask: 'words' })
        gsap.from(split.words, {
          yPercent: 110,
          rotate: 6,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, scroller, start: 'top 85%' },
        })
      }
      for (const el of gsap.utils.toArray<HTMLElement>('[data-reveal]', root)) {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller, start: 'top 90%' },
        })
      }
    }, root)

    const onPointerMove = (event: PointerEvent) =>
      scene?.setPointer(event.clientX, event.clientY)
    const onPointerLeave = () => scene?.clearPointer()
    const pointerTarget = scrollerEl ?? document.documentElement
    pointerTarget.addEventListener('pointermove', onPointerMove)
    pointerTarget.addEventListener('pointerleave', onPointerLeave)

    const observer = new IntersectionObserver(([entry]) =>
      scene?.setInView(entry.isIntersecting),
    )
    observer.observe(stage)

    return () => {
      observer.disconnect()
      pointerTarget.removeEventListener('pointermove', onPointerMove)
      pointerTarget.removeEventListener('pointerleave', onPointerLeave)
      ctx.revert()
      if (lenis) {
        gsap.ticker.remove(lenisRaf)
        gsap.ticker.lagSmoothing(500, 33)
        lenis.destroy()
        lenisRef.current = null
      }
      scene?.dispose()
    }
  }, [mode, modelBaseUrl, smoothScroll])

  useEffect(() => {
    if (!ready || window.matchMedia(REDUCED_MOTION).matches) return
    const root = rootRef.current!
    const ctx = gsap.context(() => {
      const title = root.querySelector<HTMLElement>('[data-hero-title]')!
      const split = SplitText.create(title, { type: 'words', mask: 'words' })
      gsap
        .timeline({ delay: 0.4 })
        .from('[data-hero-kicker]', { y: 20, autoAlpha: 0, duration: 0.8, ease: 'power3.out' })
        .from(
          split.words,
          { yPercent: 115, rotate: 8, duration: 1.3, ease: 'power4.out', stagger: 0.1 },
          '<0.1',
        )
        .from(
          '[data-hero-description]',
          { y: 30, autoAlpha: 0, duration: 1, ease: 'power3.out' },
          '<0.5',
        )
    }, root)
    return () => ctx.revert()
  }, [ready])

  const onNavigate = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      const hash = event.currentTarget.getAttribute('href')
      const target = hash?.startsWith('#')
        ? rootRef.current?.querySelector<HTMLElement>(hash)
        : null
      if (!target) return
      event.preventDefault()
      const behavior = window.matchMedia(REDUCED_MOTION).matches ? 'auto' : 'smooth'
      const scroller = scrollerRef.current!
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { duration: 1.8 })
      } else if (mode === 'frame') {
        const top =
          target.getBoundingClientRect().top -
          scroller.getBoundingClientRect().top +
          scroller.scrollTop
        scroller.scrollTo({ top, behavior })
      } else {
        target.scrollIntoView({ behavior })
      }
    },
    [mode],
  )

  return (
    <div
      ref={rootRef}
      className="ocean-root"
      data-mode={mode}
      data-ready={ready}
    >
      <div ref={scrollerRef} className="ocean-scroller">
        <div ref={stageRef} className="ocean-stage" aria-hidden="true">
          <div className="ocean-rays" />
          <div ref={canvasHostRef} className="absolute inset-0" />
          <div
            className="ocean-loader absolute inset-0 grid place-items-center bg-(--ocean-bg)"
            data-ready={ready}
          >
            <div className="text-center">
              <p className="ocean-display animate-pulse text-4xl tracking-widest">
                {site.name}
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.3em] text-(--ocean-muted) uppercase">
                Descending…
              </p>
            </div>
          </div>
        </div>
        <OceanNav onNavigate={onNavigate} />
        <OceanSections />
        <OceanFooter />
      </div>
    </div>
  )
}
