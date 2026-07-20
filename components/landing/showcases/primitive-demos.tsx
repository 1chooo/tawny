'use client'

import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BorderBeam } from '@/components/ui/border-beam'
import { DottedMap } from '@/components/ui/dotted-map'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { WordRotate } from '@/components/ui/word-rotate'
import { cn } from '@/lib/utils'

/**
 * Live motion primitives — ShimmerButton + WordRotate.
 */
export function MotionPrimitivesDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6 px-6 py-10',
        className,
      )}
    >
      <p className="text-center text-lg text-foreground/90 sm:text-xl">
        Build with{' '}
        <WordRotate
          words={['motion', 'clarity', 'craft', 'presence']}
          className="font-semibold text-foreground"
        />
      </p>
      <ShimmerButton
        background="rgba(255,255,255,1)"
        shimmerColor="rgba(0,0,0,0.12)"
        className="text-sm text-black!"
        type="button"
        tabIndex={-1}
      >
        Shimmer button
      </ShimmerButton>
    </div>
  )
}

/**
 * Live BorderBeam + AnimatedGradientText + NumberTicker panel.
 */
export function EffectsDemo({ className }: { className?: string }) {
  return (
    <div className={cn('relative px-6 py-10', className)}>
      <div className="relative mx-auto max-w-sm overflow-hidden rounded-xl border border-white/10 bg-white/3 p-6">
        <BorderBeam
          size={120}
          duration={12}
          colorFrom="rgba(211,160,108,0.7)"
          colorTo="transparent"
        />
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <AnimatedGradientText>New components</AnimatedGradientText>
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            <NumberTicker value={2} /> designs
          </p>
          <p className="text-sm text-muted-foreground">
            Headers, motion, and map primitives — rendered live, not screenshots.
          </p>
        </div>
      </div>
    </div>
  )
}

const MAP_MARKERS = [
  { lat: 37.77, lng: -122.42, size: 0.5 },
  { lat: 40.71, lng: -74.0, size: 0.45 },
  { lat: 51.5, lng: -0.12, size: 0.4 },
  { lat: 35.68, lng: 139.69, size: 0.45 },
]

/**
 * Live DottedMap preview.
 */
export function DottedMapDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center px-4 py-8 text-white/25',
        className,
      )}
    >
      <DottedMap
        width={140}
        height={70}
        mapSamples={4000}
        markers={MAP_MARKERS}
        markerColor="#d3a06c"
        className="h-auto w-full max-w-md"
      />
    </div>
  )
}
