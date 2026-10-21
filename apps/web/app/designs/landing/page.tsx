import { CartProvider } from '@/components/jane/cart-provider'
import { FeaturedWork } from '@/components/jane/featured-work'
import { Hero } from '@/components/jane/hero'
import { Process } from '@/components/jane/process'
import { SiteFooter } from '@/components/jane/site-footer'
import { SiteHeader } from '@/components/jane/site-header'
import { StudioNote } from '@/components/jane/studio-note'

export default function LandingDesignPage() {
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
