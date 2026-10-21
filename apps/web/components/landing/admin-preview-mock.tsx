import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { RevenueChart } from '@/components/mug/revenue-chart'
import { SERIES } from '@/components/mug/sales'

const BARS = [
  { label: 'Tide Mug', width: '100%' },
  { label: 'Oat Cylinder', width: '72%' },
  { label: 'Facet Tumbler', width: '48%' },
  { label: 'Orbit Bud Vase', width: '36%' },
]

const RESTOCK = [
  { name: 'Pair Espresso Set', note: 'Throw next batch' },
  { name: 'Celadon Serving Bowl', note: '2 left' },
  { name: 'Orbit Bud Vase', note: '3 left' },
]

/**
 * Desktop crop of the sales dashboard. Every panel sits inside the 16:9 frame
 * so the chart is not pushed out of view.
 */
export function AdminPreviewMock({ className }: { className?: string }) {
  return (
    <ScaledDesignCanvas className={className}>
      <div
        role="img"
        aria-label="Admin design preview"
        className="mug box-border flex h-[630px] w-[1120px] bg-[#efede8] p-5 text-[#1b1c1e]"
      >
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border border-[#1b1c1e] bg-[#f8f7f4]">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#1b1c1e] px-5">
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

          <div className="grid min-h-0 flex-1 grid-cols-[1.05fr_1.35fr_0.9fr] gap-3 p-4">
            <div className="flex min-h-0 flex-col gap-3 border border-[#d6d1c7] bg-[#efede8] p-4">
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

            <div className="flex min-h-0 flex-col gap-3 border border-[#d6d1c7] bg-[#efede8] p-4">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-sm font-semibold">Revenue by day</p>
                <p className="font-mono text-[10px] text-[#6b6a66]">Last 30 days</p>
              </div>
              <RevenueChart data={SERIES} width={420} height={220} />
            </div>

            <div className="flex min-h-0 flex-col gap-3">
              <div className="border border-[#d6d1c7] bg-[#efede8] p-4">
                <p className="font-mono text-[10px] tracking-widest text-[#6b6a66] uppercase">
                  Revenue
                </p>
                <p className="font-display text-3xl font-semibold">$3,478</p>
              </div>
              <div className="border border-[#d6d1c7] bg-[#efede8] p-4">
                <p className="font-mono text-[10px] tracking-widest text-[#6b6a66] uppercase">
                  Awaiting payment
                </p>
                <p className="font-display text-3xl font-semibold">4</p>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-2 border border-[#d6d1c7] bg-[#efede8] p-4">
                <p className="font-display text-sm font-semibold">Restock</p>
                {RESTOCK.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3 text-[11px]"
                  >
                    <span className="truncate">{item.name}</span>
                    <span className="shrink-0 bg-[#2741a8] px-1.5 py-0.5 font-mono text-[10px] text-[#f8f7f4] uppercase">
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaledDesignCanvas>
  )
}
