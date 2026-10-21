"use client";

import { useState } from "react";
import { formatPrice } from "@/components/jane/products";
import { useCart } from "./cart-provider";

export function BagSummary() {
  const { lines, subtotal, clear } = useCart();
  const [reserved, setReserved] = useState(false);

  if (reserved) {
    return (
      <div className="flex flex-col gap-4 border-t border-border px-6 py-6">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Order reserved
        </p>
        <p className="font-display text-xl font-semibold">Set aside</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your pieces are set aside in this browser. This starter does not
          charge a card or send an email.
        </p>
        <button
          type="button"
          onClick={() => setReserved(false)}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Keep browsing
        </button>
      </div>
    );
  }

  if (lines.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-border px-6 py-5">
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm">Total</span>
        <span className="font-display text-xl font-semibold tabular-nums">
          {formatPrice(subtotal)}
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          clear();
          setReserved(true);
        }}
        className="h-12 bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Reserve order
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Pieces stay in this browser until you reserve them. Payment is not
        collected here.
      </p>
    </div>
  );
}
