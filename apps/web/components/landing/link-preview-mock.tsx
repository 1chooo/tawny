'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@tawny/ui/lib/utils'

type LinkPreviewMockProps = {
  className?: string
}

/** Browser viewport used for Link screenshots — preview scales to match. */
const LINK_VIEWPORT = { width: 1440, height: 900 } as const

/**
 * Lightweight, non-interactive mock of the Link home page.
 * Renders at the same CSS point sizes as `/view/link` in a 1440×900
 * browser, then scales down to fit the ProductFrame — matching screenshots.
 */
export function LinkPreviewMock({ className }: LinkPreviewMockProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.4)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return

    const update = () => {
      const { width, height } = el.getBoundingClientRect()
      if (width <= 0 || height <= 0) return
      setScale(
        Math.min(width / LINK_VIEWPORT.width, height / LINK_VIEWPORT.height),
      )
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={frameRef}
      role="img"
      aria-label="Link design preview"
      inert
      className={cn('relative overflow-hidden', className)}
    >
      <div
        className="link-root absolute top-0 left-0 flex flex-col justify-center bg-(--link-background) antialiased"
        style={{
          width: LINK_VIEWPORT.width,
          height: LINK_VIEWPORT.height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <div className="mx-auto w-full max-w-md px-[clamp(1rem,4vw,1.75rem)] py-8">
          <div className="relative mx-auto mb-4 size-24 rounded-full shadow-[0_0_0_1px_var(--link-border),0_2px_12px_rgba(46,49,53,0.08)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github.com/1chooo.png"
              alt=""
              className="block size-24 rounded-full"
              width={96}
              height={96}
            />
          </div>

          <div className="w-full text-center text-[0.9375rem] leading-normal text-(--link-rurikon-700)">
            <p className="mb-[0.35rem] text-lg tracking-[0.006em] text-(--link-foreground)">
              Hugo Lin
            </p>
            <p className="mx-auto max-w-[36ch] text-(--link-muted-foreground)">
              CS @ USC | Making 1chooo.com more fun
            </p>
          </div>

          <div className="mx-auto mt-6 block w-full">
            {['Github', 'Linkedin', 'Portfolio'].map((label) => (
              <div
                key={label}
                className="font-link-serif relative mb-2.5 block rounded-(--radius) border border-(--link-border) bg-(--link-card) px-4 py-3 text-center text-[0.9375rem] leading-[1.45] font-normal text-(--link-card-foreground) shadow-[0_1px_2px_rgba(46,49,53,0.04)]"
              >
                {label}
              </div>
            ))}
          </div>

          <div className="font-link-serif relative w-full pt-5 pb-2 text-center text-sm leading-normal font-normal text-(--link-muted-foreground) [word-spacing:0.08em]">
            &ldquo;You are too focused on the future without realizing that today
            is exactly what you prayed for years ago.&rdquo;
          </div>
        </div>
      </div>
    </div>
  )
}

export { LINK_VIEWPORT }
