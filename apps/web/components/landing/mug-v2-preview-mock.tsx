import Image from 'next/image'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'

/**
 * Desktop crop of the Mug v2 home: contact bar, wordmark, and the kiln photograph.
 * No links, so catalog previews cannot navigate.
 */
export function MugV2PreviewMock({ className }: { className?: string }) {
  return (
    <ScaledDesignCanvas className={className}>
      <div
        role="img"
        aria-label="Mug v2 design preview"
        className="flex h-full flex-col bg-white text-[#1a1a1a]"
      >
        <div className="flex h-8 items-center justify-between border-b border-[#e4e4e4] px-8 text-[10px] text-[#6b6b6b]">
          <span>jane@example.com</span>
          <span>Account · Bag 2</span>
        </div>
        <div className="flex h-14 items-center justify-between border-b border-[#e4e4e4] px-8">
          <span className="text-sm tracking-tight">Jane Mug</span>
          <span className="flex gap-6 text-xs text-[#6b6b6b]">
            <span>Shop</span>
            <span>Process</span>
            <span>Studio</span>
          </span>
        </div>
        <div className="relative min-h-0 flex-1">
          <Image
            src="/images/hero-mugs.png"
            alt=""
            fill
            sizes="1120px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" aria-hidden />
          <div className="relative flex h-full items-center justify-end px-16 text-right text-white">
            <div className="flex flex-col items-end gap-6">
              <p className="text-5xl leading-tight font-medium tracking-tight">
                Round things,
                <br />
                thrown by hand.
              </p>
              <span className="bg-white px-4 py-2 text-xs text-black">
                Shop the current kiln
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScaledDesignCanvas>
  )
}
