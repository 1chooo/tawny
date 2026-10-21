import { PRODUCTS } from "@/components/jane/products";
import { ProductCard } from "./product-card";

export function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 md:px-8 lg:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            From the latest firing
          </h2>
          <a
            href="#work"
            className="text-sm underline underline-offset-4 hover:text-primary"
          >
            View all pieces
          </a>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
