"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@tawny/ui/lib/utils";
import { formatPrice, type SalesPoint } from "@/components/mug/sales";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { payload: SalesPoint }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="flex flex-col gap-1 bg-foreground px-3 py-2 text-xs text-background">
      <span className="font-mono opacity-70">{label}</span>
      <span className="font-medium">{formatPrice(point.revenue)}</span>
      <span className="opacity-70">
        {`${point.orders} ${point.orders === 1 ? "order" : "orders"}`}
      </span>
    </div>
  );
}

function RevenueArea({
  data,
  width,
  height,
}: {
  data: SalesPoint[];
  width?: number;
  height?: number;
}) {
  return (
    <AreaChart
      data={data}
      width={width}
      height={height}
      margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
    >
      <CartesianGrid vertical={false} stroke="var(--border)" />
      <XAxis
        dataKey="label"
        tickLine={false}
        axisLine={false}
        interval={6}
        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
      />
      <YAxis
        tickLine={false}
        axisLine={false}
        width={48}
        tickFormatter={(value: number) => `$${value}`}
        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
      />
      <Tooltip
        content={<ChartTooltip />}
        cursor={{ stroke: "var(--foreground)", strokeDasharray: "3 3" }}
      />
      <Area
        type="monotone"
        dataKey="revenue"
        stroke="var(--primary)"
        strokeWidth={2}
        fill="var(--primary)"
        fillOpacity={0.15}
        isAnimationActive={false}
      />
    </AreaChart>
  );
}

export function RevenueChart({
  data,
  className,
  width,
  height,
}: {
  data: SalesPoint[];
  className?: string;
  /** Fixed size for the catalog preview, where a scaled parent cannot be measured. */
  width?: number;
  height?: number;
}) {
  if (width != null && height != null) {
    return (
      <div className={cn("overflow-hidden", className)} style={{ width, height }}>
        <RevenueArea data={data} width={width} height={height} />
      </div>
    );
  }

  return (
    <div className={cn("h-64 w-full min-w-0 overflow-hidden", className)}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        initialDimension={{ width: 480, height: 256 }}
      >
        <RevenueArea data={data} />
      </ResponsiveContainer>
    </div>
  );
}
