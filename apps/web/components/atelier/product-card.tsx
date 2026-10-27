import { AtelierLink as Link } from "./atelier-link";
import { formatPrice, type Product } from "@/components/atelier/products";
import { Photo } from "./photo";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex min-w-0 flex-col gap-4"
    >
      <Photo
        src={product.image}
        alt={
          product.glaze.trim()
            ? `${product.name}, ${product.glaze}`
            : product.name
        }
        priority={priority}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        className="aspect-square"
      />
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="min-w-0 text-base break-words">{product.name}</h3>
        <span className="shrink-0 text-sm tabular-nums">
          {formatPrice(product.price)}
        </span>
      </div>
      {product.glaze.trim() ? (
        <p className="-mt-2 text-sm break-words text-muted-foreground">
          {product.glaze}
        </p>
      ) : null}
    </Link>
  );
}
