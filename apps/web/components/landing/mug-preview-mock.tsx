import Image from 'next/image'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'

/**
 * Desktop crop of the Mug home. The kiln photo is in the round hero.
 * No links, so catalog previews cannot navigate.
 */
export function MugPreviewMock({ className }: { className?: string }) {
  return (
    <ScaledDesignCanvas className={className}>
      <div
        role="img"
        aria-label="Mug design preview"
        className="mug flex h-full flex-col bg-[#efede8] text-[#1b1c1e]"
      >
        <div className="flex h-14 items-center justify-between border-b border-[#d6d1c7] px-8">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-[#2741a8]">
              <span className="size-2 bg-[#f8f7f4]" />
            </span>
            <span className="font-display text-sm font-semibold">Jane Mug</span>
          </div>
          <div className="flex gap-6 text-xs text-[#6b6a66]">
            <span>Work</span>
            <span>Shop</span>
            <span>Process</span>
            <span>Studio</span>
          </div>
          <span className="bg-[#1b1c1e] px-3 py-1.5 text-xs text-[#f8f7f4]">
            Bag 2
          </span>
        </div>
        <div className="grid flex-1 grid-cols-2 items-center gap-10 px-10">
          <div className="flex flex-col gap-5">
            <p className="font-mono text-[10px] tracking-widest text-[#6b6a66] uppercase">
              Ceramic studio · Small batch
            </p>
            <p className="font-display text-5xl leading-none font-semibold tracking-tighter">
              Round things, <span className="text-[#2741a8]">thrown</span> square
              to the hand.
            </p>
            <div className="flex gap-3">
              <span className="bg-[#1b1c1e] px-4 py-2 text-xs text-[#f8f7f4]">
                Shop the current kiln
              </span>
              <span className="border border-[#1b1c1e] px-4 py-2 text-xs">
                See the work
              </span>
            </div>
          </div>
          <div className="relative mx-auto size-72">
            <div className="relative size-full overflow-hidden rounded-full bg-[#e3dfd7]">
              <Image
                src="/images/hero-mugs.png"
                alt=""
                fill
                sizes="288px"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 flex size-20 flex-col justify-center bg-[#2741a8] p-3 text-[#f8f7f4]">
              <span className="font-display text-2xl font-semibold">6</span>
              <span className="text-[10px] leading-tight">pieces in this firing</span>
            </div>
          </div>
        </div>
      </div>
    </ScaledDesignCanvas>
  )
}
