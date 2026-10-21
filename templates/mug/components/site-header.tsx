"use client";

import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { CartSheet } from "./cart-sheet";
import { useCart } from "./cart-provider";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#work", label: "Shop" },
  { href: "#process", label: "Process" },
  { href: "#studio", label: "Studio" },
];

export function SiteHeader() {
  const { count, setOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Jane Mug home">
          <span
            aria-hidden
            className="flex size-7 items-center justify-center rounded-full bg-primary"
          >
            <span className="size-2.5 bg-primary-foreground" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Jane Mug
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/login"
            className="flex h-9 items-center gap-2 px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <User className="size-4" aria-hidden />
            <span className="hidden sm:inline">Sign in</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-9 items-center gap-2 bg-foreground px-3.5 text-sm text-background transition-opacity hover:opacity-90"
          >
            <ShoppingBag className="size-4" aria-hidden />
            <span>Bag</span>
            <span className="font-mono text-xs tabular-nums">{count}</span>
          </button>
        </div>
      </div>
      <CartSheet />
    </header>
  );
}
