"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { PRODUCTS, type Product } from "@/components/cobalt/products";

type CartLine = { slug: string; quantity: number };

type CartContextValue = {
  lines: (CartLine & { product: Product })[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "cobalt-cart";
const SAMPLE: CartLine[] = [
  { slug: "tide-mug", quantity: 1 },
  { slug: "oat-cylinder-mug", quantity: 1 },
];

const listeners = new Set<() => void>();

function readStored(): CartLine[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved == null) return SAMPLE;
    const parsed = JSON.parse(saved) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        typeof line?.slug === "string" && Number.isInteger(line?.quantity),
    );
  } catch {
    return SAMPLE;
  }
}

let snapshot: CartLine[] =
  typeof window === "undefined" ? SAMPLE : readStored();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return SAMPLE;
}

function write(next: CartLine[]) {
  snapshot = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

const CartContext = createContext<CartContextValue | null>(null);

function clampQuantity(slug: string, quantity: number) {
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product || !Number.isInteger(quantity)) return 0;
  return Math.max(0, Math.min(quantity, product.stock, 20));
}

function replaceLine(current: CartLine[], slug: string, quantity: number) {
  const next = clampQuantity(slug, quantity);
  const others = current.filter((line) => line.slug !== slug);
  return next > 0 ? [...others, { slug, quantity: next }] : others;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const bySlug = new Map(PRODUCTS.map((product) => [product.slug, product]));
    const lines = raw.flatMap((line) => {
      const product = bySlug.get(line.slug);
      const quantity = clampQuantity(line.slug, line.quantity);
      return product && quantity > 0
        ? [{ slug: line.slug, quantity, product }]
        : [];
    });

    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce(
        (sum, line) => sum + line.quantity * line.product.price,
        0,
      ),
      isOpen,
      setOpen,
      setQuantity: (slug, quantity) =>
        write(replaceLine(snapshot, slug, quantity)),
      add: (slug) => {
        const existing =
          snapshot.find((line) => line.slug === slug)?.quantity ?? 0;
        write(replaceLine(snapshot, slug, existing + 1));
        setOpen(true);
      },
      remove: (slug) => write(snapshot.filter((line) => line.slug !== slug)),
      clear: () => write([]),
    };
  }, [raw, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
