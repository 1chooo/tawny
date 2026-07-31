'use client'

import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { cn } from '@tawny/ui/lib/utils'

type DevPreviewMockProps = {
  className?: string
}

/**
 * Desktop-fidelity Dev about mock — fixed 1440×900 canvas scaled into the frame.
 * Hover affordances only; no navigation.
 */
export function DevPreviewMock({ className }: DevPreviewMockProps) {
  return (
    <div
      role="img"
      aria-label="Dev design preview"
      className={cn('h-full select-none', className)}
      onClick={(e) => e.preventDefault()}
      onKeyDown={(e) => e.preventDefault()}
    >
      <ScaledDesignCanvas>
        <div
          className="dev-root h-full bg-[var(--background)] font-mono text-[var(--foreground)] antialiased"
          data-theme="dark"
        >
          <div className="mx-auto flex h-full max-w-2xl flex-col px-10 py-14">
            <nav>
              <div className="flex items-center font-extrabold">
                <span className="inline-flex items-center text-2xl">
                  lin hugo
                  <span
                    aria-hidden="true"
                    className="terminal-cursor ml-1 inline-block text-red-500"
                  >
                    _
                  </span>
                </span>
              </div>
              <div className="mt-1.5 flex gap-4">
                {(['about', 'blog', 'projects'] as const).map((label, i) => (
                  <span
                    key={label}
                    className={cn(
                      'cursor-default text-lg transition-colors hover:text-[var(--foreground)]',
                      i === 0
                        ? 'font-extrabold text-[var(--foreground)]'
                        : 'font-normal text-[var(--muted)]',
                    )}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </nav>

            <article className="prose-layout mt-10 flex-1 leading-relaxed">
              <div className="space-y-6 text-base">
                <p>
                  I&apos;m a software builder and writer. I study Computer
                  Science at USC Viterbi.
                </p>
                <p>
                  While my professional work focuses on high-quality,
                  large-scale software systems. On weekends, I&apos;m a
                  photographer capturing the human touch in fleeting moments.
                </p>
                <p>
                  You can gain further insights through my thoughts, projects,
                  or code.
                </p>
              </div>
            </article>

            <footer className="mt-auto border-t border-[var(--border)] pt-4">
              <div className="flex items-center justify-between gap-4 text-sm text-[var(--muted)]">
                <div className="flex items-center gap-4 whitespace-nowrap">
                  {['twitter', 'github', 'linkedin'].map((label) => (
                    <span
                      key={label}
                      className="cursor-default transition-colors hover:text-[var(--foreground)]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <p className="shrink-0 whitespace-nowrap">taipei · la · sf</p>
              </div>
            </footer>
          </div>
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}
