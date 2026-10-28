import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { TestimonialCarousel } from '@/components/testimonial-carousel/testimonial-carousel'

/** 16:9 canvas tall enough to show the full section, including the logo row. */
const PREVIEW_W = 1500
const PREVIEW_H = 844

export function TestimonialCarouselDemo() {
  return (
    <ScaledDesignCanvas width={PREVIEW_W} height={PREVIEW_H} className="bg-background">
      <div inert className="bg-background">
        <TestimonialCarousel />
      </div>
    </ScaledDesignCanvas>
  )
}

export function TestimonialCarouselDetail() {
  return <TestimonialCarousel />
}
