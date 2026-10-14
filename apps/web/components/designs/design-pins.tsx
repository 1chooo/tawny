import { DesignPinCard } from '@/components/designs/design-pin-card'
import type { Design } from '@/lib/data'
import { cn } from '@tawny/ui/lib/utils'

/**
 * Featured designs as a blog pin band: one large cover, up to two compact
 * covers beside it. The featured card sticks while the page scrolls on.
 */
export function DesignPins({ designs }: { designs: Design[] }) {
  const [main, ...rest] = designs
  const side = rest.slice(0, 2)
  if (!main) return null

  return (
    <section className="mb-10 md:mb-14">
      <div className="hidden lg:grid lg:grid-cols-3 lg:items-start lg:gap-5">
        <div
          className={cn(
            'sticky top-20 self-start',
            side.length > 0 ? 'col-span-2' : 'col-span-3',
          )}
        >
          <DesignPinCard design={main} variant="featured" />
        </div>
        {side.length > 0 ? (
          <div className="col-span-1 flex flex-col gap-5">
            {side.map((design) => (
              <DesignPinCard
                key={design.id}
                design={design}
                variant="compact"
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-5 lg:hidden">
        <DesignPinCard design={main} variant="featured" />
        {side.length > 0 ? (
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1">
            {side.map((design) => (
              <DesignPinCard
                key={design.id}
                design={design}
                variant="compact"
                className="w-2/3 min-w-2/3 shrink-0 snap-start"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
