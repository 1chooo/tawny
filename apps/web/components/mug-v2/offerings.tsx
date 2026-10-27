import { site } from "@/components/mug-v2/content";
import { PRODUCTS } from "@/components/mug-v2/products";
import { ProductCard } from "./product-card";
import { sectionPad, sectionTitle, shell } from "./styles";

export function Offerings() {
  const { offerings } = site;
  if (!offerings.visible) return null;

  return (
    <section id={offerings.id} className="border-t border-border">
      <div className={`${shell} ${sectionPad}`}>
        <h2 className={sectionTitle}>{offerings.title}</h2>
        {PRODUCTS.length === 0 ? (
          <p className="mt-8 text-sm text-muted-foreground">{offerings.empty}</p>
        ) : (
          <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, index) => (
              <li key={product.slug} className="min-w-0">
                <ProductCard product={product} priority={index === 0} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
