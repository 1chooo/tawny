import type { Piece } from "@/components/mug/sales";

export function RestockQueue({ pieces }: { pieces: Piece[] }) {
  const queue = pieces
    .filter((piece) => piece.stock <= 3)
    .sort((a, b) => a.stock - b.stock);

  if (queue.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Every piece is well stocked.</p>
    );
  }

  return (
    <ul className="flex flex-col">
      {queue.map((piece) => (
        <li
          key={piece.slug}
          className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-0"
        >
          <div className="flex flex-col">
            <span className="font-medium">{piece.name}</span>
            <span className="text-xs text-muted-foreground">{piece.clay}</span>
          </div>
          <span
            className={
              piece.stock === 0
                ? "shrink-0 bg-foreground px-2 py-0.5 font-mono text-[11px] text-background uppercase"
                : "shrink-0 bg-primary px-2 py-0.5 font-mono text-[11px] text-primary-foreground uppercase"
            }
          >
            {piece.stock === 0 ? "Throw next batch" : `${piece.stock} left`}
          </span>
        </li>
      ))}
    </ul>
  );
}
