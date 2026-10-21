'use client'

import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts'
import { WEEK, weekSummary } from '@/lib/desk/model'
import { Panel } from '@/components/desk/panel'
import { useLayoutSize } from '@/components/desk/use-layout-size'

function WeekTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { value?: number; payload?: { label: string } }[]
}) {
  if (!active || !payload?.length) return null
  const point = payload[0]
  return (
    <div className="rounded-lg bg-foreground px-3 py-2 text-xs text-background">
      <p className="font-medium">{point.value}%</p>
      <p className="text-[10px] opacity-80">{point.payload?.label}</p>
    </div>
  )
}

export function WeekChart() {
  const [ref, size] = useLayoutSize<HTMLDivElement>()
  const { average, peak } = weekSummary()

  return (
    <Panel>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">This week</h2>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-tawny" aria-hidden="true" />
          Hours logged
        </p>
      </div>
      <div ref={ref} className="h-56 w-full min-w-0">
        {size.width > 0 && size.height > 0 ? (
          <BarChart
            data={WEEK}
            width={size.width}
            height={size.height}
            margin={{ top: 8, right: 4, left: -18, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontFamily: 'var(--font-desk-sans), sans-serif' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontFamily: 'var(--font-desk-sans), sans-serif' }}
            />
            <Tooltip content={<WeekTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={36} isAnimationActive={false}>
              {WEEK.map((point) => (
                <Cell
                  key={point.id}
                  fill={point.emphasis ? 'var(--tawny)' : 'var(--foreground)'}
                />
              ))}
            </Bar>
          </BarChart>
        ) : null}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
        <p className="text-muted-foreground">
          Average <span className="desk-num font-medium text-foreground">{average}%</span>
        </p>
        <p className="text-muted-foreground">
          Peak <span className="desk-num font-medium text-foreground">{peak}%</span>
        </p>
      </div>
    </Panel>
  )
}
