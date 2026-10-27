import { CartProvider } from '@/components/cobalt/cart-provider'
import { FeaturedWork } from '@/components/cobalt/featured-work'
import { Hero } from '@/components/cobalt/hero'
import { Process } from '@/components/cobalt/process'
import { SiteFooter } from '@/components/cobalt/site-footer'
import { SiteHeader } from '@/components/cobalt/site-header'
import { StudioNote } from '@/components/cobalt/studio-note'

export default function CobaltHomePage() {
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
  )
}
