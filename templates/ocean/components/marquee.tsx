import type { CSSProperties } from 'react'

export function Marquee({
  text,
  duration = 40,
  reverse = false,
  className,
}: {
  text: string
  duration?: number
  reverse?: boolean
  className?: string
}) {
  const copies = Array.from({ length: 4 }, () => text)
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ''}`}>
      <div
        className="ocean-marquee"
        data-direction={reverse ? 'reverse' : undefined}
        style={{ '--ocean-marquee-duration': `${duration}s` } as CSSProperties}
      >
        {[0, 1].map((half) => (
          <span key={half} aria-hidden={half === 1 || undefined} className="flex">
            {copies.map((copy, i) => (
              <span key={i} className="pr-[0.3em]">
                {copy}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
