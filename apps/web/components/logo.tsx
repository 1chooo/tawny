import { cn } from '@tawny/ui/lib/utils'

/**
 * Tawny brand mark — a double crescent inside a rounded field.
 *
 * Uses the `tawny` / `tawny-foreground` theme tokens so the mark tracks
 * the same warm accent used elsewhere on the site (e.g. the hero wordmark dot).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 260"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <rect x="30" y="30" width="200" height="200" rx="44" className="fill-tawny" />
      <path
        d="M130 75 A55 55 0 0 1 130 185 A70 70 0 0 0 130 75 Z"
        className="fill-tawny-foreground"
      />
      <path
        d="M130 75 A55 55 0 0 0 130 185 A70 70 0 0 1 130 75 Z"
        className="fill-tawny-foreground"
        opacity="0.4"
      />
    </svg>
  )
}
