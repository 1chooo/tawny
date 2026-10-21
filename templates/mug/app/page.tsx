import { CartProvider } from "@/components/cart-provider";
import { FeaturedWork } from "@/components/featured-work";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StudioNote } from "@/components/studio-note";

export default function HomePage() {
  return (
    <CartProvider>
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <FeaturedWork />
          <Process />
          <StudioNote />
        </main>
        <SiteFooter />
      </div>
    </CartProvider>
  );
}
