'use client'

import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { cn } from '@tawny/ui/lib/utils'

type LinkPreviewMockProps = {
  className?: string
}

/**
 * Desktop-fidelity Link home mock — fixed 1440×900 canvas scaled into the frame.
 * Hover affordances only; no navigation / no remote avatar image.
 */
export function LinkPreviewMock({ className }: LinkPreviewMockProps) {
  return (
    <div
      role="img"
      aria-label="Link design preview"
      className={cn('h-full select-none', className)}
      onClick={(e) => e.preventDefault()}
      onKeyDown={(e) => e.preventDefault()}
    >
      <ScaledDesignCanvas>
        <div className="link-root flex h-full flex-col justify-center bg-(--link-background) antialiased">
          <div className="mx-auto w-full max-w-md px-7 py-8">
            {/* Initials avatar — no remote image */}
            <div className="relative mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-(--link-card) shadow-[0_0_0_1px_var(--link-border),0_2px_12px_rgba(46,49,53,0.08)]">
              <span className="font-link-serif text-2xl tracking-wide text-(--link-foreground)">
                HL
              </span>
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
                  className="font-link-serif relative mb-2.5 block cursor-default rounded-(--radius) border border-(--link-border) bg-(--link-card) px-4 py-3 text-center text-[0.9375rem] leading-[1.45] font-normal text-(--link-card-foreground) shadow-[0_1px_2px_rgba(46,49,53,0.04)] transition-colors hover:border-(--link-foreground)/25 hover:bg-(--link-background)"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="font-link-serif relative w-full pt-5 pb-2 text-center text-sm leading-normal font-normal text-(--link-muted-foreground) [word-spacing:0.08em]">
              &ldquo;You are too focused on the future without realizing that
              today is exactly what you prayed for years ago.&rdquo;
            </div>
          </div>
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}
