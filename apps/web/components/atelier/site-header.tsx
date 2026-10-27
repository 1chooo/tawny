"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingBag, User } from "lucide-react";
import { site } from "@/components/atelier/content";
import { CartSheet } from "./cart-sheet";
import { ContentLink } from "./content-link";
import { useCart } from "./cart-provider";
import { usePortal } from "./portal";
import { shell } from "./styles";

const menuLink =
  "block border-b border-border py-4 text-lg break-words focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const portal = usePortal();
  const [menuOpen, setMenuOpen] = useState(false);
  const email = site.email.trim();
  const phone = site.phone.trim();

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const close = () => {
      if (wide.matches) setMenuOpen(false);
    };
    wide.addEventListener("change", close);
    return () => wide.removeEventListener("change", close);
  }, []);

  if (!site.header.visible) return null;

  function openBag() {
    setMenuOpen(false);
    setOpen(true);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to main content
      </a>
      <div className="border-b border-border">
        <div
          className={`${shell} flex h-9 items-center justify-between gap-4 text-xs text-muted-foreground`}
        >
          <p className="flex min-w-0 items-center gap-3">
            {email ? (
              <a
                href={`mailto:${email}`}
                className="truncate underline-offset-4 hover:text-foreground hover:underline"
              >
                {email}
              </a>
            ) : null}
            {phone ? (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="shrink-0 underline-offset-4 hover:text-foreground hover:underline"
              >
                {phone}
              </a>
            ) : null}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <ContentLink
              href={site.account.href}
              className="inline-flex h-9 items-center gap-1.5 px-2 hover:text-foreground"
            >
              <User className="size-3.5" aria-hidden />
              {site.account.label}
            </ContentLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-9 items-center gap-1.5 px-2 hover:text-foreground"
            >
              <ShoppingBag className="size-3.5" aria-hidden />
              Bag
              <span className="tabular-nums">{count}</span>
            </button>
          </div>
        </div>
      </div>
      <div className={`${shell} flex h-16 items-center justify-between gap-6`}>
        <ContentLink
          href="/"
          className="text-lg tracking-tight"
          aria-label={`${site.name} home`}
        >
          {site.name}
        </ContentLink>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <ContentLink
              key={item.href + item.label}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </ContentLink>
          ))}
        </nav>
        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger
            className="inline-flex h-11 items-center px-3 text-sm md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "Close" : "Menu"}
          </Dialog.Trigger>
          <Dialog.Portal container={portal ?? undefined}>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 md:hidden" />
            <Dialog.Content
              id="atelier-menu"
              className="atelier fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto border-b border-border bg-background px-5 pt-6 pb-8 outline-none md:hidden"
            >
              <Dialog.Title className="text-lg tracking-tight">
                {site.name}
              </Dialog.Title>
              <Dialog.Description className="sr-only">
                Site sections, account, and bag.
              </Dialog.Description>
              <nav aria-label="Mobile" className="mt-6">
                {site.nav.map((item) => (
                  <ContentLink
                    key={item.href + item.label}
                    href={item.href}
                    className={menuLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </ContentLink>
                ))}
                <ContentLink
                  href={site.account.href}
                  className={menuLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {site.account.label}
                </ContentLink>
                <button type="button" onClick={openBag} className={menuLink}>
                  Bag
                  <span className="ml-2 tabular-nums">{count}</span>
                </button>
              </nav>
              <Dialog.Close className="mt-6 text-sm underline underline-offset-4">
                Close
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <CartSheet />
    </header>
  );
}
