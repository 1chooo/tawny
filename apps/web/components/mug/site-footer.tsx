import { MugLink } from "./mug-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="flex flex-col gap-4">
          <p className="font-display text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Made slowly, by hand.
          </p>
          <p className="max-w-md text-sm leading-relaxed opacity-70">
            New pieces come out of the kiln roughly once a month. Sign in to
            keep your bag and hear when the next batch lands.
          </p>
        </div>
        <nav aria-label="Footer" className="flex gap-8 text-sm opacity-80">
          <a href="#work" className="hover:underline">
            Shop
          </a>
          <MugLink href="/login" className="hover:underline">
            Account
          </MugLink>
          <MugLink href="/admin" className="hover:underline">
            Studio admin
          </MugLink>
        </nav>
      </div>
      <div className="mx-auto flex max-w-7xl justify-between px-5 pb-8 font-mono text-xs opacity-50 md:px-8">
        <span>Jane Mug Ceramics</span>
        <span>Stoneware · Porcelain · Cone 6</span>
      </div>
    </footer>
  );
}
