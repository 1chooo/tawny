import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'

/**
 * Desktop crop of the ceramics sign-in. No links, so catalog previews cannot navigate.
 */
export function LoginPreviewMock({ className }: { className?: string }) {
  return (
    <ScaledDesignCanvas className={className}>
      <div
        role="img"
        aria-label="Login design preview"
        className="grid h-full grid-cols-2 bg-[#efede8] text-[#1b1c1e]"
      >
        <div className="flex items-end bg-[#1b1c1e] p-10 text-[#f8f7f4]">
          <div className="flex flex-col gap-3">
            <p className="font-display text-3xl leading-tight font-semibold">
              Keep your bag, and be first when the kiln opens.
            </p>
            <p className="font-mono text-[10px] tracking-widest uppercase opacity-70">
              Jane Mug Ceramics
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-12">
          <div className="mb-8 flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-[#2741a8]">
              <span className="size-2 bg-[#f8f7f4]" />
            </span>
            <span className="font-display text-sm font-semibold">Jane Mug</span>
          </div>
          <p className="font-display text-4xl font-semibold tracking-tight">
            Welcome back
          </p>
          <p className="mt-2 text-sm text-[#6b6a66]">
            Sign in to your Jane Mug account.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <div className="h-11 border border-[#d6d1c7] bg-[#f8f7f4]" />
            <div className="h-11 border border-[#d6d1c7] bg-[#f8f7f4]" />
            <div className="mt-2 flex h-11 items-center justify-center bg-[#1b1c1e] text-sm text-[#f8f7f4]">
              Sign in
            </div>
          </div>
        </div>
      </div>
    </ScaledDesignCanvas>
  )
}
