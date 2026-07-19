import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { DesignsShowcase } from '@/components/designs-showcase'
import { ComponentsSection } from '@/components/components-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <DesignsShowcase />
      <ComponentsSection />
      <Footer />
    </main>
  )
}
