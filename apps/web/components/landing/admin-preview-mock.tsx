import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'

const BARS = [
  { label: 'Tide Mug', width: '100%' },
  { label: 'Oat Cylinder', width: '72%' },
  { label: 'Facet Tumbler', width: '48%' },
]

/**
 * Desktop crop of the ceramics sales dashboard. No links, so catalog previews cannot navigate.
 */
export function AdminPreviewMock({ className }: { className?: string }) {
  return (
    <ScaledDesignCanvas className={className}>
      <div
        role="img"
        aria-label="Admin design preview"
        className="flex h-full bg-[#efede8] p-6 text-[#1b1c1e]"
      >
        <div className="flex min-h-0 flex-1 flex-col border border-[#1b1c1e] bg-[#f8f7f4]">
          <div className="flex items-center justify-between border-b border-[#1b1c1e] px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2741a8]">
                <span className="size-2 bg-[#f8f7f4]" />
              </span>
              <span className="font-display text-sm font-semibold">Jane Mug</span>
            </div>
            <div className="flex gap-1 text-xs">
              <span className="bg-[#1b1c1e] px-3 py-1.5 text-[#f8f7f4]">Sales</span>
              <span className="px-3 py-1.5">Products</span>
              <span className="px-3 py-1.5">Orders</span>
              <span className="px-3 py-1.5">Coupons</span>
            </div>
            <span className="font-mono text-[10px] text-[#6b6a66]">
              jane@example.com
            </span>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-4 p-5">
            <div className="flex flex-col gap-3 border border-[#d6d1c7] bg-[#efede8] p-4">
              <p className="font-display text-sm font-semibold">Overview</p>
              {BARS.map((bar) => (
                <div key={bar.label} className="flex flex-col gap-1">
                  <span className="text-[11px]">{bar.label}</span>
                  <span className="h-2 bg-[#e3dfd7]">
                    <span
                      className="block h-full bg-[#2741a8]"
                      style={{ width: bar.width }}
                    />
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-between border border-[#d6d1c7] bg-[#efede8] p-4">
              <p className="font-display text-sm font-semibold">Revenue by day</p>
              <div className="flex h-28 items-end gap-1">
                {[40, 55, 48, 70, 62, 80, 74, 90, 68, 84].map((height) => (
                  <span
                    key={height}
                    className="flex-1 bg-[#2741a8]/30"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="border border-[#d6d1c7] bg-[#efede8] p-4">
                <p className="font-mono text-[10px] tracking-widest text-[#6b6a66] uppercase">
                  Revenue
                </p>
                <p className="font-display text-3xl font-semibold">$4,820</p>
              </div>
              <div className="border border-[#d6d1c7] bg-[#efede8] p-4">
                <p className="font-mono text-[10px] tracking-widest text-[#6b6a66] uppercase">
                  Awaiting payment
                </p>
                <p className="font-display text-3xl font-semibold">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaledDesignCanvas>
  )
}
