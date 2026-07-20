import { cn } from '../lib/utils'

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  borderWidth?: number
}

/**
 * Animated conic-gradient border beam. Mount inside a `relative overflow-hidden rounded-*` container.
 */
export function BorderBeam({
  className,
  size = 200,
  duration = 10,
  delay = 0,
  colorFrom = 'rgba(255,255,255,0.6)',
  colorTo = 'transparent',
  borderWidth = 1,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 rounded-[inherit]', className)}
      style={
        {
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--delay': `${delay}s`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--border-width': `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      {/* The beam travels around the border via a mask + background trick */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          padding: borderWidth,
          background: `conic-gradient(from calc(var(--angle, 0deg)), ${colorTo}, ${colorTo} 40%, ${colorFrom} 60%, ${colorTo})`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          animation: `border-beam-rotate var(--duration) linear calc(var(--delay) * -1) infinite`,
        }}
      />
      <style>{`
        @keyframes border-beam-rotate {
          from { --angle: 0deg; }
          to   { --angle: 360deg; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </div>
  )
}
