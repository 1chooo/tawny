import { NoiseTexture } from '@/components/seal/noise-texture'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'

/**
 * Desktop crop of the Seal home: wordmark, vertical title, and a vermilion disc.
 * No links, so catalog previews cannot navigate.
 */
export function SealPreviewMock({ className }: { className?: string }) {
  return (
    <ScaledDesignCanvas className={className}>
      <div
        role="img"
        aria-label="Seal design preview"
        className="relative flex h-full flex-col bg-[#f3efe6] text-[#2c2825]"
        style={{ fontFamily: 'var(--font-seal-body), Palatino, serif' }}
      >
        <NoiseTexture />
        <div className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-[rgba(44,40,37,0.18)] px-12">
          <span
            className="flex items-center gap-2 text-lg tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-seal-display), serif' }}
          >
            <img src="/images/seal-wax.png" alt="" className="size-5 object-contain" />
            Seal
          </span>
          <span className="flex gap-8 text-[11px] tracking-[0.22em] text-[#6f695f] uppercase">
            <span>Studio</span>
            <span>Practice</span>
            <span>Work</span>
            <span>Contact</span>
          </span>
        </div>
        <div className="relative z-10 grid min-h-0 flex-1 grid-cols-[1.15fr_0.85fr] items-center px-16 pb-8">
          <div className="flex items-center gap-12">
            <div>
              <p className="mb-5 text-[11px] tracking-[0.22em] text-[#6f695f] uppercase">
                Editorial studio
              </p>
              <p
                lang="zh-Hant"
                className="text-[3.4rem] leading-none font-semibold tracking-[0.16em]"
                style={{
                  fontFamily: 'var(--font-seal-display), serif',
                  writingMode: 'vertical-rl',
                }}
              >
                讓紙面留白
              </p>
            </div>
            <img src="/images/seal-wax.png" alt="" className="size-44 object-contain" />
          </div>
          <div className="max-w-[16rem] self-end pb-10">
            <p className="text-[15px] leading-7">
              Seal is a one-person studio for books, marks, and posters. The sheet stays mostly empty.
            </p>
            <p className="mt-6 flex items-center gap-3 text-[#9c2f24]">
              <span className="inline-block size-2.5 rounded-full bg-[#c44536]" aria-hidden="true" />
              See the work
            </p>
          </div>
        </div>
      </div>
    </ScaledDesignCanvas>
  )
}
