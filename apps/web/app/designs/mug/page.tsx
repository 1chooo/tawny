import { CartProvider } from '@/components/mug/cart-provider'
import { FeaturedWork } from '@/components/mug/featured-work'
import { Hero } from '@/components/mug/hero'
import { Process } from '@/components/mug/process'
import { SiteFooter } from '@/components/mug/site-footer'
import { SiteHeader } from '@/components/mug/site-header'
import { StudioNote } from '@/components/mug/studio-note'

export default function MugHomePage() {
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
