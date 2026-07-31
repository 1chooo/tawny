import { Hero } from '@/components/hero'
import { DesignsShowcase } from '@/components/landing/designs-showcase'
import { ComponentsShowcase } from '@/components/landing/components-showcase'
import { Cta } from '@/components/landing/cta'

export default function HomePage() {
  return (
    <>
      <Hero />

      <DesignsShowcase />

      <ComponentsShowcase />

      <Cta />
    </>
  )
}
