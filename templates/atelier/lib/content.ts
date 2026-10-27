export type ContentLink = {
  label: string;
  href: string;
};

export type ContentImage = {
  src: string;
  alt: string;
};

export type ContentCategory = {
  title: string;
  href: string;
  image: string;
  alt: string;
};

export type ContentStep = {
  title: string;
  body: string;
};

export type ContentQuote = {
  quote: string;
  author: string;
  detail?: string;
};

export type ContentPolicy = {
  slug: string;
  label: string;
  body: string;
};

/**
 * Homepage copy, images, links, and visibility.
 * Leave a string empty, or set `visible` to false, to drop that piece.
 * An empty list hides categories and testimonials. Offerings stays, with an
 * empty state, so a kiln between firings still has a heading.
 *
 * This preview has no phone, street address, hours, or social profiles.
 * Testimonials are sample lines, not reviews. Policies say they are unset.
 */
export const site = {
  name: "Jane Mug",
  email: "jane@example.com",
  phone: "",
  social: [] as ContentLink[],
  nav: [
    { label: "Shop", href: "/shop" },
    { label: "Process", href: "/#process" },
    { label: "Studio", href: "/#studio" },
  ] as ContentLink[],
  account: { label: "Account", href: "/login" } as ContentLink,
  header: { visible: true },
  hero: {
    visible: true,
    image: "/images/hero-mugs.png",
    imageAlt:
      "Three handmade stoneware mugs in cobalt, oat, and charcoal glazes",
    title: "Round things, thrown by hand.",
    cta: { label: "Shop the current kiln", href: "/shop" } as ContentLink,
  },
  intro: {
    visible: true,
    id: "studio",
    eyebrow: "The studio",
    title: "One wheel, one kiln, and a shelf that's always full.",
    body: "I'm Jane. I make functional pottery in short runs, so a glaze you love might not come back exactly the same. That's the point — every mug carries the marks of the day it was made.",
    images: [
      {
        src: "/images/studio.png",
        alt: "Pottery studio with a wheel and shelves of drying pots",
      },
      {
        src: "/images/products/cobalt-mug.png",
        alt: "Tide Mug, cobalt gloss broken over a raw foot",
      },
    ] as ContentImage[],
  },
  categories: {
    visible: true,
    title: "From the studio",
    items: [
      {
        title: "Mugs",
        href: "/shop#mugs",
        image: "/images/products/oat-mug.png",
        alt: "Oat Cylinder Mug in a satin oatmeal glaze",
      },
      {
        title: "Cups",
        href: "/shop#cups",
        image: "/images/products/charcoal-tumbler.png",
        alt: "Facet Tumbler in matte charcoal",
      },
      {
        title: "Process",
        href: "/#process",
        image: "/images/studio.png",
        alt: "The wheel where each mug starts",
      },
    ] as ContentCategory[],
  },
  visit: {
    visible: true,
    id: "process",
    title: "Four steps, about three weeks, per mug.",
    body: "Each form is centered and pulled on the wheel, then trimmed, bisque fired, and glazed to cone 6.",
    address: "",
    hours: "",
    image: "/images/studio.png",
    imageAlt: "Pottery studio with a wheel and shelves of drying pots",
    steps: [
      {
        title: "Throw",
        body: "Each form is centered and pulled on the wheel from about a pound of stoneware.",
      },
      {
        title: "Trim",
        body: "Leather-hard pieces are flipped, trimmed for a clean foot, and handles are attached.",
      },
      {
        title: "Bisque",
        body: "A first firing to cone 04 turns clay into something that can hold glaze.",
      },
      {
        title: "Glaze & fire",
        body: "Dipped by hand, then fired to cone 6 so every piece is food- and dishwasher-safe.",
      },
    ] as ContentStep[],
  },
  testimonials: {
    visible: true,
    /** Sample lines for the preview. Set false once the quotes are real. */
    sample: true,
    title: "Notes from the shelf",
    items: [
      {
        quote:
          "Sample note for this preview. Replace it in lib/content.ts before you publish.",
        author: "Preview",
        detail: "Not a customer review",
      },
      {
        quote: "Another sample line, so the arrows have somewhere to go.",
        author: "Preview",
        detail: "Not a customer review",
      },
      {
        quote: "A third sample, still not a review of a real firing.",
        author: "Preview",
        detail: "Not a customer review",
      },
    ] as ContentQuote[],
  },
  offerings: {
    visible: true,
    id: "offerings",
    title: "Popular pieces",
    empty: "No pieces in this firing yet.",
  },
  footer: {
    visible: true,
    blurb:
      "Made slowly, by hand. New pieces come out of the kiln roughly once a month.",
    note: "Stoneware · Porcelain · Cone 6",
    columns: [
      {
        title: "Studio",
        links: [
          { label: "Shop", href: "/shop" },
          { label: "Process", href: "/#process" },
          { label: "Studio", href: "/#studio" },
        ],
      },
      {
        title: "Account",
        links: [
          { label: "Account", href: "/login" },
          { label: "Studio admin", href: "/admin" },
        ],
      },
    ] as { title: string; links: ContentLink[] }[],
  },
  policies: [
    {
      slug: "shipping",
      label: "Shipping",
      body: "This preview has no shipping policy yet. Replace this note in lib/content.ts.",
    },
    {
      slug: "cancellations",
      label: "Cancellations",
      body: "This preview has no cancellation policy yet. Replace this note in lib/content.ts.",
    },
    {
      slug: "returns",
      label: "Returns",
      body: "This preview has no returns policy yet. Replace this note in lib/content.ts.",
    },
  ] as ContentPolicy[],
};

export function sectionVisible(
  visible: boolean,
  items?: readonly unknown[],
) {
  if (!visible) return false;
  if (items && items.length === 0) return false;
  return true;
}

export function getPolicy(slug: string) {
  return site.policies.find((policy) => policy.slug === slug);
}
