"use client";

import { useCart } from "./cart-provider";

export function AddToBag({
  slug,
  name,
  soldOut,
}: {
  slug: string;
  name: string;
  soldOut: boolean;
}) {
  const { add } = useCart();

  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={() => add(slug)}
      className="inline-flex h-12 items-center bg-foreground px-6 text-sm text-background transition-opacity hover:opacity-80 disabled:cursor-default disabled:opacity-40"
    >
      {soldOut ? `${name} is sold out` : "Add to bag"}
    </button>
  );
}
