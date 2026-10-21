"use client";

import Image from "next/image";
import { formatPrice, type Product } from "@/components/mug/products";
import { useCart } from "./cart-provider";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { add } = useCart();
  const soldOut = product.stock === 0;

  return (
    <button
      type="button"
      onClick={() => add(product.slug)}
      disabled={soldOut}
      className="group flex flex-col gap-3 text-left disabled:cursor-default"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={`${product.name}, ${product.glaze.toLowerCase()}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] group-disabled:transform-none"
        />
        <span className="absolute top-3 left-3 bg-background px-2 py-1 font-mono text-[11px] uppercase tracking-wider">
          {product.category}
        </span>
        {soldOut ? (
          <span className="absolute top-3 right-3 bg-foreground px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-background">
            Sold out
          </span>
        ) : product.stock <= 3 ? (
          <span className="absolute top-3 right-3 bg-primary px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-primary-foreground">
            {product.stock} left
          </span>
        ) : null}
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="font-display text-lg font-medium">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.glaze}</p>
        </div>
        <span className="font-mono text-sm tabular-nums">
          {formatPrice(product.price)}
        </span>
      </div>
    </button>
  );
}
