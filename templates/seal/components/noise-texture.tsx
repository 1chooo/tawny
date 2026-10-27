'use client'

import { useId, type ComponentProps } from 'react'

export interface NoiseTextureProps extends ComponentProps<'svg'> {
  className?: string
  /** `baseFrequency` for `feTurbulence`. Higher values yield finer noise. */
  frequency?: number
  /** `numOctaves` for `feTurbulence`. More octaves add smaller detail. */
  octaves?: number
  /** Linear slope on each channel after desaturation. */
  slope?: number
  /** Opacity of the filled noise layer. */
  noiseOpacity?: number
}

export function NoiseTexture({
  className,
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  noiseOpacity = 0.6,
  ...props
}: NoiseTextureProps) {
  const filterId = useId().replace(/:/g, '')

  return (
    <svg
      className={[
        'pointer-events-none absolute inset-0 z-0 size-full opacity-50 select-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <filter id={filterId}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={octaves}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope={slope} />
          <feFuncG type="linear" slope={slope} />
          <feFuncB type="linear" slope={slope} />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} opacity={noiseOpacity} />
    </svg>
  )
}
