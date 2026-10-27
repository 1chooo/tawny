"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from "recharts";
import { formatCents } from "@/components/cobalt/sales";
import { useLayoutSize } from "@/components/cobalt/use-layout-size";

type Point = { label: string; name: string; revenue: number };

function RadarTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: Point }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="flex flex-col gap-1 bg-foreground px-3 py-2 text-xs text-background">
      <span>{point.name}</span>
      <span className="font-medium">{formatCents(point.revenue)}</span>
    </div>
  );
}

export function SellerRadar({ data }: { data: Point[] }) {
  const [ref, size] = useLayoutSize<HTMLDivElement>();

  return (
    <div ref={ref} className="h-64 w-full min-w-0 overflow-hidden" aria-hidden>
      {size.width > 0 && size.height > 0 ? (
        <RadarChart
          data={data}
          width={size.width}
          height={size.height}
          cx="50%"
          cy="50%"
          outerRadius="68%"
        >
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <Radar
            dataKey="revenue"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="var(--primary)"
            fillOpacity={0.15}
            isAnimationActive={false}
          />
          <Tooltip content={<RadarTooltip />} />
        </RadarChart>
      ) : null}
    </div>
  );
}
