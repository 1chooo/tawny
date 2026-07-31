import type { ReactNode } from 'react'
import { cn } from '@tawny/ui/lib/utils'

/**
 * Desktop design canvas for landing feature bands.
 * Matches JustHold Holdings: 16:9 so it fills the `aspect-video` window crop.
 */
export const DESIGN_W = 1120
export const DESIGN_H = 630

type ScaledDesignCanvasProps = {
  children: ReactNode
  className?: string
  /** Override canvas width (defaults to DESIGN_W). */
  width?: number
  /** Override canvas height (defaults to DESIGN_H). */
  height?: number
}

/**
 * Fixed desktop layout scaled into its parent via `@container` + `100cqw`.
 * Parent must have a defined size; overflow is clipped so the crop stays true-ratio.
 */
export function ScaledDesignCanvas({
  children,
  className,
  width = DESIGN_W,
  height = DESIGN_H,
}: ScaledDesignCanvasProps) {
  return (
    <div
      className={cn(
        '@container relative h-full w-full overflow-hidden',
        className,
      )}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width,
          height,
          transform: `scale(calc(100cqw / ${width}px))`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
