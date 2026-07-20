import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

/**
 * Inert visual twin of the Tawny site navbar — marketing preview only.
 */
export function TawnyHeaderDemo({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Tawny navigation bar preview"
      inert
      className={cn(
        'select-none border-b border-white/8 bg-background/80 backdrop-blur-xl',
        className,
      )}
    >
      <div className="flex h-14 items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <Logo className="size-7 rounded-md" />
          <span className="font-serif text-lg italic tracking-tight text-foreground">
            Tawny
          </span>
        </div>
        <nav className="hidden items-center gap-1 sm:flex" aria-hidden="true">
          {['Designs', 'Components', 'Pricing'].map((label) => (
            <span
              key={label}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground"
            >
              {label}
            </span>
          ))}
        </nav>
        <span className="hidden rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background sm:inline-flex">
          Get access
        </span>
        <span className="text-muted-foreground sm:hidden" aria-hidden="true">
          ☰
        </span>
      </div>
    </div>
  )
}
