import { JetBrains_Mono } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'

const devMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-dev-mono',
})

/**
 * Inert visual twin of the Dev site header — marketing preview only.
 */
export function DevHeaderDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(devMono.variable, devMono.className, 'font-mono', className)}
    >
      <div
        role="img"
        aria-label="Dev navigation header preview"
        inert
        className="dev-root select-none bg-(--dev-background,#09090b) px-5 py-4 text-(--dev-foreground,#e4e4e7) antialiased"
      >
        <nav>
          <div className="flex items-center justify-between font-extrabold">
            <span className="inline-flex items-center text-2xl">
              lin hugo
              <span
                aria-hidden="true"
                className="ml-1 inline-block animate-pulse text-red-500"
              >
                _
              </span>
            </span>
          </div>
          <div className="mt-1.5 flex gap-4 text-lg">
            <span className="font-extrabold text-(--dev-foreground,#e4e4e7)">
              about
            </span>
            <span className="font-normal text-(--dev-muted,#a1a1aa)">
              blog
            </span>
            <span className="font-normal text-(--dev-muted,#a1a1aa)">
              projects
            </span>
          </div>
        </nav>
      </div>
    </div>
  )
}
