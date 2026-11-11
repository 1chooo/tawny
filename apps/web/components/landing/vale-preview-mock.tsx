import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'

/**
 * Desktop crop of the Vale home: wordmark, a thin serif headline, stacked
 * category names, and a bordered photo grid. No links, so catalog previews
 * cannot navigate.
 */
export function ValePreviewMock({ className }: { className?: string }) {
  return (
    <ScaledDesignCanvas className={className}>
      <div
        role="img"
        aria-label="Vale design preview"
        className="flex h-full flex-col bg-white text-[#111]"
        style={{ fontFamily: 'var(--font-vale-ui), Inter, sans-serif' }}
      >
        <div className="grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-[#d6d6d6] px-5 text-[11px] font-bold tracking-wide uppercase">
          <span>Catalog</span>
          <span className="tracking-[-0.02em]">Studio Vale</span>
          <span className="justify-self-end">
            Information
            <span className="ml-6">Cart 0</span>
          </span>
        </div>
        <div className="px-5 pt-7 text-center">
          <div className="mx-auto mb-3 h-6 w-16 border-b border-black" />
          <p
            className="text-[64px] leading-[0.88] font-light tracking-[-0.05em] text-black uppercase"
            style={{ fontFamily: 'var(--font-vale-hero), Georgia, serif' }}
          >
            Made once
          </p>
          <p className="mx-auto mt-3 max-w-sm text-[13px] leading-snug">
            Ceramics, paintings, and a few objects from the studio.
          </p>
        </div>
        <div className="mt-6 grid min-h-0 flex-1 grid-cols-[2fr_3fr] border-t border-[#d6d6d6]">
          <div className="px-5 pt-6">
            <p
              className="text-[42px] leading-none font-bold tracking-[-0.02em] text-black uppercase"
              style={{ fontFamily: 'var(--font-vale-heading), Impact, sans-serif' }}
            >
              Ceramics
              <sup className="ml-1 text-[11px]">[ 9 ]</sup>
            </p>
            <p
              className="mt-2 text-[42px] leading-none font-bold tracking-[-0.02em] text-[#b5b5b5] uppercase"
              style={{ fontFamily: 'var(--font-vale-heading), Impact, sans-serif' }}
            >
              Paintings
            </p>
            <p
              className="mt-2 text-[42px] leading-none font-bold tracking-[-0.02em] text-[#b5b5b5] uppercase"
              style={{ fontFamily: 'var(--font-vale-heading), Impact, sans-serif' }}
            >
              Others
            </p>
          </div>
          <div className="grid grid-cols-3 border-l border-[#d6d6d6]">
            {['Speckled cup', 'Harbor plate', 'Raw vessel'].map((title) => (
              <div key={title} className="border-r border-b border-[#d6d6d6] p-3">
                <p className="text-[11px] font-bold tracking-[-0.02em] uppercase">{title}</p>
                <p className="mt-1 text-[10px] text-[#111]">Wheel thrown</p>
                <div className="mt-3 aspect-square bg-[#f3f3f3]" />
                <div className="mt-3 flex justify-between border border-[#d6d6d6] px-2 py-2 text-[9px] font-bold uppercase">
                  <span>Add to cart</span>
                  <span>$64</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScaledDesignCanvas>
  )
}
