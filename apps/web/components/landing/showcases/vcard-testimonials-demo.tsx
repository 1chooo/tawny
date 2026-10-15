import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { VcardRootShell } from '@/components/vcard/vcard-root-shell'
import { VcardTestimonials } from '@/components/vcard/testimonials'

export function VcardTestimonialsDemo() {
  return (
    <ScaledDesignCanvas>
      <VcardRootShell className="flex h-full items-center px-8">
        <div className="w-full">
          <VcardTestimonials />
        </div>
      </VcardRootShell>
    </ScaledDesignCanvas>
  )
}

export function VcardTestimonialsDetail() {
  return (
    <VcardRootShell className="h-full">
      <VcardTestimonials className="h-full" />
    </VcardRootShell>
  )
}
