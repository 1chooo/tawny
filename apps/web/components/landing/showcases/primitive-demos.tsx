'use client'

import { AnimatedGradientText } from '@tawny/ui/components/animated-gradient-text'
import { BorderBeam } from '@tawny/ui/components/border-beam'
import { DottedMap } from '@tawny/ui/components/dotted-map'
import { NumberTicker } from '@tawny/ui/components/number-ticker'
import { ShimmerButton } from '@tawny/ui/components/shimmer-button'
import { WordRotate } from '@tawny/ui/components/word-rotate'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { cn } from '@tawny/ui/lib/utils'

/**
 * Live motion primitives — ShimmerButton + WordRotate on a scaled desktop stage.
 */
export function MotionPrimitivesDemo({ className }: { className?: string }) {
  return (
    <div className={cn('h-full', className)}>
      <ScaledDesignCanvas>
        <div className="flex h-full flex-col items-center justify-center gap-8 bg-background px-16">
          <p className="text-center text-3xl text-foreground/90">
            Build with{' '}
            <WordRotate
              words={['motion', 'clarity', 'craft', 'presence']}
              className="font-semibold text-foreground"
            />
          </p>
          <ShimmerButton
            background="rgba(255,255,255,1)"
            shimmerColor="rgba(0,0,0,0.12)"
            className="text-base text-black!"
            type="button"
            tabIndex={-1}
          >
            Shimmer button
          </ShimmerButton>
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}

/**
 * Live BorderBeam + AnimatedGradientText + NumberTicker on a scaled desktop stage.
 */
export function EffectsDemo({ className }: { className?: string }) {
  return (
    <div className={cn('h-full', className)}>
      <ScaledDesignCanvas>
        <div className="relative flex h-full items-center justify-center bg-background px-16">
          <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-white/3 p-10">
            <BorderBeam
              size={160}
              duration={12}
              colorFrom="rgba(211,160,108,0.7)"
              colorTo="transparent"
            />
            <div className="relative z-10 flex flex-col items-center gap-5 text-center">
              <AnimatedGradientText>New components</AnimatedGradientText>
              <p className="text-4xl font-semibold tracking-tight text-foreground">
                <NumberTicker value={2} /> designs
              </p>
              <p className="text-base text-muted-foreground">
                Headers, motion, and map primitives — rendered live at real
                desktop ratio.
              </p>
            </div>
          </div>
        </div>
      </ScaledDesignCanvas>
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
 * Live DottedMap preview on a scaled desktop stage.
 */
export function DottedMapDemo({ className }: { className?: string }) {
  return (
    <div className={cn('h-full', className)}>
      <ScaledDesignCanvas>
        <div className="flex h-full items-center justify-center bg-background px-16 text-white/25">
          <DottedMap
            width={280}
            height={140}
            mapSamples={4000}
            markers={MAP_MARKERS}
            markerColor="#d3a06c"
            className="h-auto w-full max-w-3xl"
          />
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}
