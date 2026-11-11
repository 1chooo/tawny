import type { Category, Product } from '@/lib/vale/types'

const img = (file: string) => `/images/vale/${file}`

export const site = {
  name: 'Studio Vale',
  emblem: 'bowl' as const,
  hero: {
    title: 'Made once',
    body: 'Ceramics, paintings, and a few objects from the studio. Thrown, fired, painted, signed.',
  },
  statement: {
    title: 'Every piece keeps the day it was made',
    body: 'A thicker lip, a glaze that breaks on the edge — the piece remembers the wheel.',
  },
  featured: {
    kicker: 'Featured',
    title: 'Speckled cups',
    body: 'A short run of stoneware cups. Cream glaze, sand foot, and a speckled lip that changes with the light.',
    href: '/catalog/ceramics',
    linkLabel: 'Shop collection',
    image: img('feature.jpg'),
    imageAlt: 'Speckled beige cups and a small white cup lined up on a white table',
  },
  city: 'Hudson, New York',
  email: 'hello@studiovale.example',
  tagline: 'Made once, kept close.',
  social: [
    { label: 'Instagram', href: 'https://instagram.com/studiovale' },
    { label: 'X', href: 'https://x.com/studiovale' },
  ],
  year: 2026,
  shipping: {
    title: 'Shipping & returns',
    shippingTitle: 'Shipping',
    shipping: [
      'Pieces are packed in the studio and leave Hudson within five business days. This demo does not calculate postage or ship an order.',
      'Notes below are sample policy copy for the template. International packing is arranged by email when a piece can travel.',
    ],
    returnsTitle: 'Returns',
    returns: [
      'Sample policy: finished work is final unless it arrives broken. Write within seven days with photos of the piece and the packing.',
      'Commissions are confirmed by email before any painting begins. A paused preorder cannot be added in this demo.',
    ],
  },
  newsletter: {
    kicker: 'Mailing list',
    title: 'Letters from the studio',
    body: 'New work, kiln notes, and the occasional painting. Sent once in a while.',
    finePrint: 'Unsubscribe anytime',
    success: 'This demo does not subscribe you. Nothing was sent.',
  },
}

export const categories: Category[] = [
  {
    id: 'ceramics',
    label: 'Ceramics',
    description:
      'Small-batch stoneware and porcelain. Thrown, trimmed, and glazed by hand in Hudson.',
    shopLabel: 'Shop all Ceramics',
  },
  {
    id: 'paintings',
    label: 'Paintings',
    description:
      'Oil and watercolor studies of tables, roads, and faces. Each canvas is one of one, except the commission.',
    shopLabel: 'Shop all Paintings',
  },
  {
    id: 'others',
    label: 'Others',
    description:
      'Tools, a stool, a tote, and a short run of enamel pots made alongside the pots and paintings.',
    shopLabel: 'Shop all Others',
  },
]

export const products: Product[] = [
  {
    id: 'speckled-cup',
    slug: 'speckled-cup',
    title: 'Speckled Cup',
    category: 'ceramics',
    medium: 'Wheel thrown',
    price: 64,
    currency: 'USD',
    description:
      'A short cup with a sand-colored foot and a cream glaze that breaks into brown speckles. Comfortable in the hand, and a little different on every side.',
    materials: 'Speckled stoneware, cream glaze',
    dimensions: 'W3.5" × H3"',
    images: [
      {
        src: img('speckled-cups.jpg'),
        alt: 'Speckled beige cups and a small white cup on a white table',
      },
      {
        src: img('feature.jpg'),
        alt: 'A wider view of the same speckled cups lined up on a white table',
      },
    ],
    availability: 'available',
    inventory: 4,
    featured: true,
  },
  {
    id: 'harbor-plate',
    slug: 'harbor-plate',
    title: 'Harbor Plate',
    category: 'ceramics',
    medium: 'Wheel thrown',
    price: 98,
    currency: 'USD',
    description:
      'A wide plate with a pale blue pool in the center and a warm bare rim. The edge is left slightly uneven from the cut.',
    materials: 'Stoneware, matte blue glaze',
    dimensions: 'W10" × H1"',
    images: [
      {
        src: img('harbor-plates.jpg'),
        alt: 'A stack of pale blue ceramic plates on a wooden shelf',
      },
    ],
    availability: 'available',
    inventory: 5,
  },
  {
    id: 'speckled-bottle',
    slug: 'speckled-bottle',
    title: 'Speckled Bottle',
    category: 'ceramics',
    medium: 'Wheel thrown',
    price: 220,
    currency: 'USD',
    description:
      'One tall bottle, white and finely speckled, with a narrow neck. Made as a single piece. It will not be repeated.',
    materials: 'Speckled porcelain',
    dimensions: 'W4" × H11"',
    images: [
      {
        src: img('speckled-bottles.jpg'),
        alt: 'Three speckled white bottles on a pale table, the tallest holding dried poppy heads',
      },
    ],
    availability: 'available',
    inventory: 1,
    featured: true,
  },
  {
    id: 'raw-vessel',
    slug: 'raw-vessel',
    title: 'Raw Vessel',
    category: 'ceramics',
    medium: 'Hand built',
    price: 180,
    currency: 'USD',
    description:
      'An unglazed vessel with a soft shoulder and a visible pinch along the wall. The surface stays dry so the clay color can read.',
    materials: 'Unglazed cream stoneware',
    dimensions: 'W7" × H8"',
    images: [
      {
        src: img('raw-vases.jpg'),
        alt: 'Three unglazed cream clay vessels standing on a white pedestal',
      },
    ],
    availability: 'available',
    inventory: 2,
  },
  {
    id: 'blossom-bottle',
    slug: 'blossom-bottle',
    title: 'Blossom Bottle',
    category: 'ceramics',
    medium: 'Wheel thrown',
    price: 140,
    currency: 'USD',
    description:
      'A slender white bottle with a quiet foot. The pair in the photograph has already left the studio.',
    materials: 'Porcelain, clear glaze',
    dimensions: 'W3" × H9"',
    images: [
      {
        src: img('blossom-bottles.jpg'),
        alt: 'Two slender white bottles holding pink blossom branches on a wooden board',
      },
    ],
    availability: 'sold-out',
    inventory: 0,
  },
  {
    id: 'color-plate',
    slug: 'color-plate',
    title: 'Color Plate',
    category: 'ceramics',
    medium: 'Wheel thrown',
    price: 72,
    currency: 'USD',
    description:
      'A small plate from a mixed firing: pink, amber, and pale blue glazes sharing one kiln shelf. This colorway is gone.',
    materials: 'Stoneware, colored glaze',
    dimensions: 'W8" × H1"',
    images: [
      {
        src: img('color-plates.jpg'),
        alt: 'Colorful ceramic plates arranged together on a dark gray surface',
      },
    ],
    availability: 'sold-out',
    inventory: 0,
  },
  {
    id: 'breakfast-bowl',
    slug: 'breakfast-bowl',
    title: 'Breakfast Bowl',
    category: 'ceramics',
    medium: 'Wheel thrown',
    price: 86,
    currency: 'USD',
    description:
      'A deep bowl with a speckled rim, wide enough for fruit or a short soup. The foot is trimmed thin so it sits flat.',
    materials: 'Speckled stoneware',
    dimensions: 'W6" × H3"',
    images: [
      {
        src: img('breakfast.jpg'),
        alt: 'Speckled ceramic bowls of oatmeal and fruit on a marble table',
      },
    ],
    availability: 'available',
    inventory: 3,
  },
  {
    id: 'cafe-cup',
    slug: 'cafe-cup',
    title: 'Cafe Cup',
    category: 'ceramics',
    medium: 'Wheel thrown',
    price: 58,
    currency: 'USD',
    description:
      'A gray cup with a low foot, meant for a short coffee. The next firing is on hold, so preorders are paused.',
    materials: 'Stoneware, matte gray glaze',
    dimensions: 'W3.5" × H2.5"',
    images: [
      {
        src: img('cafe-cups.jpg'),
        alt: 'Gray ceramic cups of coffee with latte art, beside white planters',
      },
    ],
    availability: 'paused',
    inventory: 8,
  },
  {
    id: 'morning-mug',
    slug: 'morning-mug',
    title: 'Morning Mug',
    category: 'ceramics',
    medium: 'Wheel thrown',
    price: 48,
    currency: 'USD',
    description:
      'A plain white mug with a generous handle. The wall is even, and the rim is left soft rather than sharp.',
    materials: 'Porcelain, white glaze',
    dimensions: 'W3.5" × H3.5"',
    images: [
      {
        src: img('morning-mug.jpg'),
        alt: 'Top view of a white mug filled with coffee on a wooden table',
      },
    ],
    availability: 'available',
    inventory: 6,
  },
  {
    id: 'night-bouquet',
    slug: 'night-bouquet',
    title: 'Night Bouquet',
    category: 'paintings',
    medium: 'Oil on canvas',
    price: 480,
    currency: 'USD',
    description:
      'A crowded bouquet against a near-black ground. Tulips, poppies, and a bronze urn, painted wet into wet over several days.',
    materials: 'Oil on linen',
    dimensions: 'W16" × H20"',
    images: [
      {
        src: img('night-bouquet.jpg'),
        alt: 'A dark still-life painting of a crowded bouquet in a bronze urn',
      },
    ],
    availability: 'available',
    inventory: 1,
    featured: true,
  },
  {
    id: 'the-lane',
    slug: 'the-lane',
    title: 'The Lane',
    category: 'paintings',
    medium: 'Oil on canvas',
    price: 320,
    currency: 'USD',
    description:
      'Sheep moving down a shaded lane, with a cottage at the right. A small study of late light through leaves.',
    materials: 'Oil on canvas',
    dimensions: 'W18" × H14"',
    images: [
      {
        src: img('the-lane.jpg'),
        alt: 'A landscape painting of sheep walking a lane past trees and a cottage',
      },
    ],
    availability: 'available',
    inventory: 1,
  },
  {
    id: 'heat',
    slug: 'heat',
    title: 'Heat',
    category: 'paintings',
    medium: 'Acrylic on canvas',
    price: 260,
    currency: 'USD',
    description:
      'Thick yellow, red, and teal paint, left with the ridges of the knife. A small canvas about color more than subject.',
    materials: 'Acrylic on canvas',
    dimensions: 'W12" × H12"',
    images: [
      {
        src: img('heat.jpg'),
        alt: 'Close view of thick yellow, red, and teal paint on canvas',
      },
    ],
    availability: 'available',
    inventory: 1,
  },
  {
    id: 'gray-birds',
    slug: 'gray-birds',
    title: 'Gray Birds',
    category: 'paintings',
    medium: 'Watercolor',
    price: 180,
    currency: 'USD',
    description:
      'Two gray birds with peach chests, perched on a vine. The sheet has left the studio.',
    materials: 'Watercolor on paper',
    dimensions: 'W11" × H14"',
    images: [
      {
        src: img('gray-birds.jpg'),
        alt: 'A watercolor of two gray birds with peach chests perched on a vine',
      },
    ],
    availability: 'sold-out',
    inventory: 0,
  },
  {
    id: 'blue-vase',
    slug: 'blue-vase',
    title: 'Blue Vase',
    category: 'paintings',
    medium: 'Oil on canvas',
    price: 540,
    currency: 'USD',
    description:
      'Flowers in a blue glass vase, with fruit at the foot. Painted slowly, with the dark ground laid in first.',
    materials: 'Oil on linen',
    dimensions: 'W20" × H24"',
    images: [
      {
        src: img('blue-vase.jpg'),
        alt: 'A still-life painting of flowers in a blue glass vase against a dark ground',
      },
    ],
    availability: 'available',
    inventory: 1,
  },
  {
    id: 'portrait-commission',
    slug: 'portrait-commission',
    title: 'Portrait Commission',
    category: 'paintings',
    medium: 'Oil on canvas',
    price: 140,
    currency: 'USD',
    description:
      'A small oil portrait from photographs you send after checkout. Choose a size and how many subjects share the canvas. This demo does not start a commission or take payment.',
    materials: 'Oil on canvas',
    dimensions: 'Chosen at order',
    images: [
      {
        src: img('face-study.jpg'),
        alt: 'A painted close-up of a face with blue eyes on a textured wall',
      },
    ],
    availability: 'options',
    inventory: 6,
    featured: true,
    variants: [
      {
        id: 'size',
        label: 'Size',
        options: [
          { id: '8x10', label: '8×10' },
          { id: '10x10', label: '10×10', priceDelta: 40 },
          { id: '11x14', label: '11×14', priceDelta: 90 },
        ],
      },
      {
        id: 'subjects',
        label: 'Subjects',
        options: [
          { id: '1', label: '1 subject' },
          { id: '2', label: '2 subjects', priceDelta: 60 },
          { id: '3', label: '3 subjects', priceDelta: 120 },
        ],
      },
    ],
  },
  {
    id: 'enamel-pot',
    slug: 'enamel-pot',
    title: 'Enamel Pot',
    category: 'others',
    medium: 'Enameled iron',
    price: 128,
    currency: 'USD',
    description:
      'A heavy pot with a fitted lid, made in a short color run beside the kiln. Choose a color. Cream has already sold through.',
    materials: 'Enameled cast iron',
    dimensions: 'W10" × H5"',
    images: [
      {
        src: img('enamel.jpg'),
        alt: 'Teal and white enameled pots on a marble kitchen counter',
      },
    ],
    availability: 'options',
    inventory: 8,
    variants: [
      {
        id: 'color',
        label: 'Color',
        options: [
          { id: 'teal', label: 'Teal', inventory: 3 },
          { id: 'white', label: 'White', inventory: 2 },
          { id: 'cream', label: 'Cream', inventory: 0, priceDelta: 10 },
        ],
      },
    ],
  },
  {
    id: 'studio-brushes',
    slug: 'studio-brushes',
    title: 'Studio Brushes',
    category: 'others',
    medium: 'Studio tool',
    price: 36,
    currency: 'USD',
    description:
      'Two hog-bristle brushes the studio keeps for grounds and broad color. Sold as a pair, unused.',
    materials: 'Hog bristle, nickel ferrule',
    dimensions: 'L8"',
    images: [
      {
        src: img('brushes.jpg'),
        alt: 'Two paintbrushes loaded with red and yellow paint on a white surface',
      },
    ],
    availability: 'available',
    inventory: 8,
  },
  {
    id: 'ash-stool',
    slug: 'ash-stool',
    title: 'Ash Stool',
    category: 'others',
    medium: 'Whitewashed wood',
    price: 240,
    currency: 'USD',
    description:
      'A four-leg stool in pale ash, with a handhold cut into the seat. Made for the studio and offered in a pair.',
    materials: 'Whitewashed ash',
    dimensions: 'W14" × H24"',
    images: [
      {
        src: img('stool.jpg'),
        alt: 'A pale wooden stool against a light blue background',
      },
    ],
    availability: 'available',
    inventory: 2,
  },
  {
    id: 'canvas-tote',
    slug: 'canvas-tote',
    title: 'Canvas Tote',
    category: 'others',
    medium: 'Sewn canvas',
    price: 42,
    currency: 'USD',
    description:
      'An unprinted canvas tote with a flat bottom, sewn for carrying a wrapped pot or a small canvas.',
    materials: 'Cotton canvas',
    dimensions: 'W14" × H16"',
    images: [
      {
        src: img('tote.jpg'),
        alt: 'A brown canvas tote bag with beige straps on a gray wall',
      },
    ],
    availability: 'available',
    inventory: 10,
  },
  {
    id: 'throwing-tools',
    slug: 'throwing-tools',
    title: 'Throwing Tools',
    category: 'others',
    medium: 'Studio tool',
    price: 54,
    currency: 'USD',
    description:
      'A small set of wooden ribs and a sponge from the throwing bench. The set in the photograph has been claimed.',
    materials: 'Wood, natural sponge',
    dimensions: 'Assorted, up to L6"',
    images: [
      {
        src: img('tools.jpg'),
        alt: 'Pottery ribs, a sponge, and a spinning wheel on a clay-covered bench',
      },
    ],
    availability: 'sold-out',
    inventory: 0,
  },
]

export const studioPage = {
  title: 'Information',
  image: img('wheel.jpg'),
  imageAlt: 'Clay-covered hands shaping a small vessel on a spinning potter’s wheel',
  paragraphs: [
    'Studio Vale is a sample ceramics and painting practice set in Hudson, New York. The work is thrown, built, and painted in small numbers. Shapes return. Surfaces do not.',
    'Ceramics are stoneware and porcelain, glazed and fired in the studio. Paintings are oil and watercolor studies: a lane, a bouquet, a face. A few objects — a stool, a tote, enamel pots — are made in the same room.',
    'Each finished piece in this catalog is an edition of one, except where a short run or a commission says otherwise. Photographs are stand-ins, and nothing here is for sale.',
    'For a question about a piece, write to the studio email. The address is sample copy and does not reach a person.',
  ],
}

export const faqItems = [
  {
    question: 'Is every piece one of a kind?',
    answer:
      'Most of them. A shape may come back, but the glaze and the firing do not land the same way twice. Cups in a short run are close, not identical. Commissions are painted for one order.',
  },
  {
    question: 'Are the ceramics food safe?',
    answer:
      'Cups, plates, and bowls in this sample catalog are described as food safe unless a piece says otherwise. Hand washing keeps the surface quieter for longer.',
  },
  {
    question: 'Can they go in a dishwasher?',
    answer:
      'Hand washing is the studio preference. Dinnerware can take a gentle cycle. Paintings, raw clay, and the stool should stay out of the water.',
  },
  {
    question: 'How do I care for a painting?',
    answer:
      'Keep oil and watercolor out of direct sun and damp rooms. Dust with a soft dry cloth. Do not wipe the surface with a wet rag.',
  },
  {
    question: 'Do you take commissions?',
    answer:
      'The portrait listing is the sample commission. Choose a size and a subject count, then add it to the demo cart. No painting is started, and no payment is taken.',
  },
  {
    question: 'When is new work released?',
    answer:
      'A few pieces at a time. The mailing list on this site only confirms in the browser. It does not send a letter.',
  },
  {
    question: 'Where do you ship?',
    answer:
      'See Shipping & returns for the sample policy. This demo does not ship.',
  },
]
