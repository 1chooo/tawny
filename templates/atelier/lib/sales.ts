export type Piece = {
  slug: string;
  name: string;
  clay: string;
  stock: number;
  active: boolean;
};

export type SalesPoint = {
  label: string;
  revenue: number;
  orders: number;
};

export type RankedPiece = {
  name: string;
  units: number;
  revenueCents: number;
};

export type CouponStat = {
  code: string;
  uses: number;
  discountCents: number;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  handle: string | null;
  role: "admin" | "customer";
  joined: string;
  lastSignIn: string;
  confirmed: boolean;
  internal: boolean;
};

const START = Date.UTC(2026, 8, 21);
const dayLabel = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export const SERIES: SalesPoint[] = Array.from({ length: 30 }, (_, index) => {
  const day = new Date(START + index * 86_400_000);
  const revenue = Math.round(90 + 70 * Math.sin(index / 2.4) + (index % 4) * 18);
  const orders = revenue > 40 ? 1 + (index % 3) : 0;
  return {
    label: dayLabel.format(day),
    revenue,
    orders,
  };
});

export const PIECES: Piece[] = [
  {
    slug: "tide-mug",
    name: "Tide Mug",
    clay: "Speckled stoneware",
    stock: 6,
    active: true,
  },
  {
    slug: "oat-cylinder-mug",
    name: "Oat Cylinder Mug",
    clay: "Buff stoneware",
    stock: 9,
    active: true,
  },
  {
    slug: "facet-tumbler",
    name: "Facet Tumbler",
    clay: "Black stoneware",
    stock: 4,
    active: true,
  },
  {
    slug: "orbit-bud-vase",
    name: "Orbit Bud Vase",
    clay: "Porcelain",
    stock: 3,
    active: true,
  },
  {
    slug: "celadon-serving-bowl",
    name: "Celadon Serving Bowl",
    clay: "Speckled stoneware",
    stock: 2,
    active: true,
  },
  {
    slug: "pair-espresso-set",
    name: "Pair Espresso Set",
    clay: "Stoneware",
    stock: 0,
    active: true,
  },
];

export const TOP_PIECES: RankedPiece[] = [
  { name: "Tide Mug", units: 18, revenueCents: 86400 },
  { name: "Oat Cylinder Mug", units: 14, revenueCents: 58800 },
  { name: "Facet Tumbler", units: 11, revenueCents: 41800 },
  { name: "Orbit Bud Vase", units: 6, revenueCents: 33600 },
  { name: "Celadon Serving Bowl", units: 3, revenueCents: 28800 },
];

export const COUPONS: CouponStat[] = [
  { code: "KILN", uses: 12, discountCents: 9600 },
  { code: "FIRSTFIRE", uses: 4, discountCents: 6400 },
];

export const CUSTOMERS: Customer[] = [
  {
    id: "jane",
    name: "Jane",
    email: "jane@example.com",
    handle: "jane",
    role: "admin",
    joined: "Jan 4, 2026",
    lastSignIn: "Oct 20, 2026",
    confirmed: true,
    internal: true,
  },
  {
    id: "maya",
    name: "Maya Ortiz",
    email: "maya.ortiz@example.com",
    handle: "maya.ortiz",
    role: "customer",
    joined: "Sep 2, 2026",
    lastSignIn: "Oct 18, 2026",
    confirmed: true,
    internal: false,
  },
  {
    id: "sam",
    name: "Sam Patel",
    email: "sam.patel@example.com",
    handle: "sam.patel",
    role: "customer",
    joined: "Sep 28, 2026",
    lastSignIn: "Oct 11, 2026",
    confirmed: true,
    internal: false,
  },
  {
    id: "alex",
    name: "Alex Chen",
    email: "alex.chen@example.com",
    handle: null,
    role: "customer",
    joined: "Oct 16, 2026",
    lastSignIn: "Oct 16, 2026",
    confirmed: false,
    internal: false,
  },
];

export const ORDER_COUNT = SERIES.reduce((sum, point) => sum + point.orders, 0);
export const REVENUE_CENTS = SERIES.reduce(
  (sum, point) => sum + Math.round(point.revenue * 100),
  0,
);
export const PENDING_COUNT = 4;
export const CANCELLED_COUNT = 2;
export const DISCOUNT_CENTS = COUPONS.reduce(
  (sum, coupon) => sum + coupon.discountCents,
  0,
);
export const AVERAGE_ORDER_CENTS = ORDER_COUNT
  ? Math.round(REVENUE_CENTS / ORDER_COUNT)
  : 0;

export const STUDIO_EMAIL = "jane@example.com";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCents(cents: number) {
  return formatPrice(cents / 100);
}
