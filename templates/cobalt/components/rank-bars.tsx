export function RankBars({
  data,
}: {
  data: { label: string; value: number; display: string }[];
}) {
  const max = Math.max(1, ...data.map((item) => item.value));
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No sales in this period yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {data.map(({ label, value, display }) => (
        <li key={label} className="flex flex-col gap-2">
          <div className="flex justify-between gap-4 text-sm">
            <span className="truncate">{label}</span>
            <span className="font-mono text-muted-foreground tabular-nums">
              {display}
            </span>
          </div>
          <div className="h-2 bg-muted">
            <div
              className="h-full bg-primary"
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
