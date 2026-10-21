export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  glaze: string;
  stock: number;
};

export const PRODUCTS: Product[] = [
  {
    slug: "tide-mug",
    name: "Tide Mug",
    category: "Mugs",
    price: 48,
    image: "/images/products/cobalt-mug.png",
    glaze: "Cobalt gloss, broken over raw foot",
    stock: 6,
  },
  {
    slug: "oat-cylinder-mug",
    name: "Oat Cylinder Mug",
    category: "Mugs",
    price: 42,
    image: "/images/products/oat-mug.png",
    glaze: "Satin oatmeal with iron speckle",
    stock: 9,
  },
  {
    slug: "facet-tumbler",
    name: "Facet Tumbler",
    category: "Cups",
    price: 38,
    image: "/images/products/charcoal-tumbler.png",
    glaze: "Matte charcoal",
    stock: 4,
  },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
