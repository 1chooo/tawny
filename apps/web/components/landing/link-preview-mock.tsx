'use client'

import { PhoneFrame } from '@/components/landing/phone-frame'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { cn } from '@tawny/ui/lib/utils'

const LINKS = ['Github', 'Linkedin', 'Portfolio']

/**
 * Shared Link home content — same markup at desktop and phone-screen scale.
 * `compact` drops the max-width column for a full-bleed phone screen and
 * tightens the avatar/spacing so it reads at native mobile proportions.
 */
function LinkPageContent({ compact = false }: { compact?: boolean }) {
  return (
    <div className="link-root flex h-full flex-col justify-center bg-(--link-background) antialiased">
      <div
        className={cn(
          'mx-auto w-full px-7 py-8',
          compact ? 'max-w-none px-4 py-6' : 'max-w-md',
        )}
      >
        {/* Initials avatar — no remote image */}
        <div
          className={cn(
            'relative mx-auto mb-4 flex items-center justify-center rounded-full bg-(--link-card) shadow-[0_0_0_1px_var(--link-border),0_2px_12px_rgba(46,49,53,0.08)]',
            compact ? 'size-14' : 'size-24',
          )}
        >
          <span
            className={cn(
              'font-link-serif tracking-wide text-(--link-foreground)',
              compact ? 'text-base' : 'text-2xl',
            )}
          >
            HL
          </span>
        </div>

        <div
          className={cn(
            'w-full text-center leading-normal text-(--link-rurikon-700)',
            compact ? 'text-xs' : 'text-[0.9375rem]',
          )}
        >
          <p
            className={cn(
              'mb-[0.35rem] tracking-[0.006em] text-(--link-foreground)',
              compact ? 'text-sm' : 'text-lg',
            )}
          >
            Hugo Lin
          </p>
          <p className="mx-auto max-w-[36ch] text-(--link-muted-foreground)">
            CS @ USC | Making 1chooo.com more fun
          </p>
        </div>

        <div className={cn('mx-auto block w-full', compact ? 'mt-4' : 'mt-6')}>
          {LINKS.map((label) => (
            <div
              key={label}
              className={cn(
                'font-link-serif relative block cursor-default rounded-(--radius) border border-(--link-border) bg-(--link-card) text-center leading-[1.45] font-normal text-(--link-card-foreground) shadow-[0_1px_2px_rgba(46,49,53,0.04)] transition-colors hover:border-(--link-foreground)/25 hover:bg-(--link-background)',
                compact
                  ? 'mb-2 px-3 py-2 text-xs'
                  : 'mb-2.5 px-4 py-3 text-[0.9375rem]',
              )}
            >
              {label}
            </div>
          ))}
        </div>

        {!compact ? (
          <div className="font-link-serif relative w-full pt-5 pb-2 text-center text-sm leading-normal font-normal text-(--link-muted-foreground) [word-spacing:0.08em]">
            &ldquo;You are too focused on the future without realizing that
            today is exactly what you prayed for years ago.&rdquo;
          </div>
        ) : null}
      </div>
    </div>
  )
}

type LinkPreviewMockProps = {
  className?: string
}

/**
 * Desktop-fidelity Link home mock — fixed 1120×630 canvas scaled into the
 * browser frame supplied by `DesignShowcaseRow` (same treatment as Art/Dev),
 * with a small phone mockup overlapping the bottom-left corner for the
 * mobile view. Hover affordances only; no navigation / no remote avatar image.
 */
export function LinkPreviewMock({ className }: LinkPreviewMockProps) {
  return (
    <div
      role="img"
      aria-label="Link design preview — desktop and mobile"
      className={cn('h-full select-none', className)}
      onClick={(e) => e.preventDefault()}
      onKeyDown={(e) => e.preventDefault()}
    >
      <ScaledDesignCanvas>
        <div className="relative h-full w-full">
          <LinkPageContent />

          {/* Mobile — small phone mockup overlapping the bottom-left corner */}
          <div className="absolute top-1/2 left-[4%] z-10 w-[20%] -translate-y-1/2 shadow-2xl">
            <PhoneFrame>
              <LinkPageContent compact />
            </PhoneFrame>
          </div>
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}
