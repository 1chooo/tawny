import type { Metadata } from "next";
import { AtelierLink as Link } from "@/components/atelier/atelier-link";
import { notFound } from "next/navigation";
import { AddToBag } from "@/components/atelier/add-to-bag";
import { Photo } from "@/components/atelier/photo";
import { SiteShell } from "@/components/atelier/site-shell";
import { shell } from "@/components/atelier/styles";
import { formatPrice, getProduct, PRODUCTS } from "@/components/atelier/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Piece" };
  return {
    title: product.name,
    description: product.glaze || product.name,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const soldOut = product.stock <= 0;

  return (
    <SiteShell>
      <div
        className={`${shell} grid gap-12 py-16 md:grid-cols-2 md:items-start md:py-24`}
      >
        <Photo
          src={product.image}
          alt={
            product.glaze.trim()
              ? `${product.name}, ${product.glaze}`
              : product.name
          }
          priority
          sizes="(min-width: 768px) 45vw, 100vw"
          className="aspect-square"
        />
        <div className="flex min-w-0 flex-col gap-6">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            {product.category}
          </p>
          <h1 className="text-4xl font-medium tracking-tight break-words">
            {product.name}
          </h1>
          {product.glaze.trim() ? (
            <p className="text-base leading-relaxed break-words text-muted-foreground">
              {product.glaze}
            </p>
          ) : null}
          <p className="text-lg tabular-nums">{formatPrice(product.price)}</p>
          <p className="text-sm text-muted-foreground">
            {soldOut ? "Sold out" : `${product.stock} in this firing`}
          </p>
          <AddToBag slug={product.slug} name={product.name} soldOut={soldOut} />
          <Link
            href="/shop"
            className="w-fit text-sm underline underline-offset-4"
          >
            Back to the shop
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
