import { DesignShowcaseRow } from '@/components/landing/design-showcase-row'
import { BlurFade } from '@/components/ui/blur-fade'
import { NoiseTexture } from '@/components/ui/noise-texture'
import { designs } from '@/lib/data'

export default function DesignsPage() {
  return (
    <div className="relative min-h-screen px-6 pt-28 pb-24">
      <NoiseTexture opacity={0.025} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <BlurFade delay={0.05}>
          <div className="mb-14">
            <p className="mb-3 text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
              Web Designs
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl">
              Design showcases
            </h1>
            <p className="mt-3 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Explore live design demos hosted inside Tawny — open a showcase and
              navigate within it.
            </p>
          </div>
        </BlurFade>

        <div className="flex flex-col gap-20">
          {designs.map((design, index) => (
            <DesignShowcaseRow key={design.id} design={design} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
