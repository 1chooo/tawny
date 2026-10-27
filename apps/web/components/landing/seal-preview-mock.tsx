import { NoiseTexture } from '@/components/seal/noise-texture'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'

/**
 * Desktop crop of the Seal home: a centered portrait poster with a vertical
 * title and the wax seal. No links, so catalog previews cannot navigate.
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
        <div className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-[rgba(44,40,37,0.18)] px-14">
          <span
            className="flex items-center gap-2.5 text-lg tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-seal-display), serif' }}
          >
            <img src="/images/seal-wax.png" alt="" className="size-6 object-contain" />
            Seal
          </span>
          <span className="flex gap-8 text-[11px] tracking-[0.22em] text-[#6f695f] uppercase">
            <span>Studio</span>
            <span>Practice</span>
            <span>Work</span>
            <span>Contact</span>
          </span>
        </div>
        <div className="relative z-10 flex min-h-0 flex-1 justify-center px-14 pt-6">
          <div className="w-[30rem]">
            <p className="text-[11px] tracking-[0.22em] text-[#6f695f] uppercase">
              Editorial studio
            </p>
            <div className="mt-3 flex items-center gap-8">
              <p
                lang="zh-Hant"
                className="text-[2.35rem] leading-none font-semibold tracking-[0.16em]"
                style={{
                  fontFamily: 'var(--font-seal-display), serif',
                  writingMode: 'vertical-rl',
                }}
              >
                讓紙面留白
              </p>
              <img src="/images/seal-wax.png" alt="" className="w-36 object-contain" />
            </div>
            <p className="mt-6 max-w-sm text-[15px] leading-7">
              Seal is a one-person studio for books, marks, and posters. The sheet stays mostly empty.
            </p>
            <p className="mt-3 flex items-center gap-3 text-[#9c2f24]">
              <span className="inline-block size-2.5 rounded-full bg-[#c44536]" aria-hidden="true" />
              See the work
            </p>
          </div>
        </div>
      </div>
    </ScaledDesignCanvas>
  )
}
