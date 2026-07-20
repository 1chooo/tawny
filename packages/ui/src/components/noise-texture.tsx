import { cn } from '../lib/utils'

interface NoiseTextureProps {
  className?: string
  /** opacity of the noise layer, 0–1, default 0.15 */
  opacity?: number
}

/**
 * Inline SVG noise texture overlay.
 * Place as an absolute child inside a `relative overflow-hidden` container.
 */
export function NoiseTexture({ className, opacity = 0.15 }: NoiseTextureProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 select-none', className)}
      style={{ opacity }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="h-full w-full"
      >
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>
    </div>
  )
}
