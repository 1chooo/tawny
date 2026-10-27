import type { Metadata } from "next";
import { ProductCard } from "@/components/atelier/product-card";
import { SiteShell } from "@/components/atelier/site-shell";
import { sectionTitle, shell } from "@/components/atelier/styles";
import { site } from "@/components/atelier/content";
import { categoryAnchor, productsByCategory } from "@/components/atelier/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Mugs and cups from the current Jane Mug firing.",
};

export default function ShopPage() {
  const groups = productsByCategory();

  return (
    <SiteShell>
      <div className={`${shell} py-16 md:py-24`}>
        <h1 className={sectionTitle}>Shop</h1>
        {groups.length === 0 ? (
          <p className="mt-8 text-sm text-muted-foreground">
            {site.offerings.empty}
          </p>
        ) : (
          <div className="mt-14 flex flex-col gap-16">
            {groups.map(([category, products]) => (
              <section key={category} id={categoryAnchor(category)}>
                <h2 className="text-xl break-words">{category}</h2>
                <ul className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <li key={product.slug} className="min-w-0">
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
