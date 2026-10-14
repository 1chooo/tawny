import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { WHALE_DOTS } from '@/components/landing/ocean-preview-dots'
import { cn } from '@tawny/ui/lib/utils'

const NAV = ['Studio', 'Work', 'Craft', 'Contact']

const BUBBLES = [
  { left: '44%', top: '72%', size: 6 },
  { left: '52%', top: '16%', size: 4 },
  { left: '60%', top: '62%', size: 9 },
  { left: '72%', top: '80%', size: 5 },
  { left: '84%', top: '30%', size: 7 },
  { left: '38%', top: '40%', size: 3 },
  { left: '66%', top: '10%', size: 5 },
]

type OceanPreviewMockProps = {
  className?: string
}

/**
 * Desktop-fidelity Ocean hero mock — fixed 1120×630 canvas scaled into the
 * browser frame supplied by `DesignShowcaseRow`. The particle whale is a
 * pre-projected dot path from the same glTF model the live WebGL scene samples.
 */
export function OceanPreviewMock({ className }: OceanPreviewMockProps) {
  return (
    <div
      role="img"
      aria-label="Ocean design preview"
      className={cn('h-full select-none', className)}
    >
      <ScaledDesignCanvas>
        <div className="ocean-root flex h-full w-full flex-col overflow-hidden">
          <div aria-hidden="true" className="ocean-rays" />

          <div className="relative z-10 flex items-center justify-between px-12 py-8">
            <span className="ocean-display text-2xl tracking-wide">Abyssal</span>
            <div className="flex items-center gap-8 text-sm text-(--ocean-muted)">
              {NAV.map((item) => (
                <span key={item} className="transition-colors hover:text-(--ocean-ink)">
                  {item}
                </span>
              ))}
              <span className="rounded-full border border-(--ocean-faint) px-4 py-1.5 text-(--ocean-ink) transition-colors hover:border-(--ocean-accent) hover:text-(--ocean-accent)">
                Say hello
              </span>
            </div>
          </div>

          <svg
            aria-hidden="true"
            viewBox={`-10 -10 ${WHALE_DOTS.width + 20} ${WHALE_DOTS.height + 20}`}
            className="ocean-bob absolute top-[13%] left-[37%] w-[34%] drop-shadow-[0_0_12px_rgb(45_212_191/0.5)]"
          >
            <defs>
              <linearGradient id="ocean-mock-whale" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#99f6e4" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <path
              d={WHALE_DOTS.d}
              stroke="url(#ocean-mock-whale)"
              strokeWidth={2.6}
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {BUBBLES.map((bubble) => (
            <span
              key={`${bubble.left}-${bubble.top}`}
              aria-hidden="true"
              className="absolute rounded-full border border-cyan-100/40"
              style={{
                left: bubble.left,
                top: bubble.top,
                width: bubble.size,
                height: bubble.size,
              }}
            />
          ))}

          <div className="relative z-10 mt-auto px-12 pb-14">
            <p className="mb-5 font-mono text-[11px] tracking-[0.25em] text-(--ocean-accent) uppercase">
              Ocean storytelling studio
            </p>
            <p className="ocean-display ocean-text-shadow max-w-[9ch] text-[124px]">
              Into the deep
            </p>
            <p className="ocean-text-shadow mt-6 max-w-sm text-sm leading-relaxed text-(--ocean-muted)">
              We turn marine science into films, exhibits, and interactive
              worlds that make people care about the 95% of the ocean nobody
              has seen.
            </p>
          </div>
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}
