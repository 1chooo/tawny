"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { formatPrice } from "@/components/mug/products";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "./ui/sheet";
import { BagSummary } from "./bag-summary";
import { useCart } from "./cart-provider";

export function CartSheet() {
  const { lines, isOpen, setOpen, setQuantity, remove } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent>
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex flex-col gap-1">
            <SheetTitle className="font-display text-lg">Your bag</SheetTitle>
            <SheetDescription>
              Each piece is one of a small batch.
            </SheetDescription>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex size-9 items-center justify-center hover:bg-muted"
            aria-label="Close bag"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span
              aria-hidden
              className="size-16 rounded-full border-2 border-foreground"
            />
            <p className="text-sm text-muted-foreground">
              Your bag is empty. Something from the kiln is waiting.
            </p>
          </div>
        ) : (
          <ul className="flex flex-1 flex-col overflow-y-auto">
            {lines.map(({ product, quantity }) => (
              <li
                key={product.slug}
                className="flex gap-4 border-b border-border px-6 py-5"
              >
                <div className="relative size-20 shrink-0 overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.glaze}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.slug)}
                      className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(product.slug, quantity - 1)
                        }
                        className="flex size-8 items-center justify-center hover:bg-muted"
                        aria-label={`Decrease ${product.name} quantity`}
                      >
                        <Minus className="size-3" aria-hidden />
                      </button>
                      <span className="w-8 text-center font-mono text-sm tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(product.slug, quantity + 1)
                        }
                        disabled={quantity >= product.stock}
                        className="flex size-8 items-center justify-center hover:bg-muted disabled:opacity-40"
                        aria-label={`Increase ${product.name} quantity`}
                      >
                        <Plus className="size-3" aria-hidden />
                      </button>
                    </div>
                    <span className="font-mono text-sm tabular-nums">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <BagSummary />
      </SheetContent>
    </Sheet>
  );
}
