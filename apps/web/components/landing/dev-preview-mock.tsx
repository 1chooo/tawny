type DevPreviewMockProps = {
  className?: string
}

/**
 * Lightweight, non-interactive mock of the Dev about page.
 * Visual only — clicks do nothing.
 */
export function DevPreviewMock({ className }: DevPreviewMockProps) {
  return (
    <div
      role="img"
      aria-label="Dev design preview"
      inert
      className={className}
    >
      <div
        className="dev-root h-full bg-[var(--background)] font-mono text-[var(--foreground)] antialiased"
        data-theme="dark"
      >
        <div className="mx-auto max-w-2xl px-6 py-8 md:py-10">
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
              <span className="text-lg font-extrabold text-[var(--foreground)]">
                about
              </span>
              <span className="text-lg font-normal text-[var(--muted)]">
                blog
              </span>
              <span className="text-lg font-normal text-[var(--muted)]">
                projects
              </span>
            </div>
          </nav>

          <article className="prose-layout mt-8 leading-relaxed">
            <div className="space-y-6">
              <p>
                I&apos;m a software builder and writer. I study Computer Science
                at USC Viterbi.
              </p>
              <p>
                While my professional work focuses on high-quality, large-scale
                software systems. On weekends, I&apos;m a photographer capturing
                the human touch in fleeting moments.
              </p>
              <p>
                You can gain further insights through my thoughts, projects, or
                code.
              </p>
            </div>
          </article>

          <footer className="mt-10 border-t border-[var(--border)] pt-4">
            <div className="flex items-center justify-between gap-4 text-xs text-[var(--muted)] md:text-sm">
              <div className="flex items-center gap-4 whitespace-nowrap">
                <span>twitter</span>
                <span>github</span>
                <span>linkedin</span>
              </div>
              <p className="shrink-0 whitespace-nowrap">taipei · la · sf</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
