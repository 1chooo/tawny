import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ComponentDemoCard } from '@/components/landing/showcases/component-demo-card'
import {
  componentDemos,
  type ComponentDemo,
} from '@/components/landing/showcases'
import { BlurFade } from '@tawny/ui/components/blur-fade'
import { BorderBeam } from '@tawny/ui/components/border-beam'
import { NoiseTexture } from '@tawny/ui/components/noise-texture'

/** The three headers share one gallery card. Each still has its own page. */
const GALLERY_HIDDEN = new Set(['tawny-header', 'art-header', 'dev-header'])

const CATEGORY_ORDER: ComponentDemo['category'][] = [
  'Dashboard',
  'Maps',
  'People',
  'Navigation',
  'Motion',
  'Effects',
  'Embed',
]

function galleryGroups(demos: ComponentDemo[]) {
  const groups = new Map<ComponentDemo['category'], ComponentDemo[]>()
  for (const demo of demos) {
    if (GALLERY_HIDDEN.has(demo.id)) continue
    const list = groups.get(demo.category)
    if (list) list.push(demo)
    else groups.set(demo.category, [demo])
  }
  return CATEGORY_ORDER.flatMap((category) => {
    const list = groups.get(category)
    return list ? [{ category, demos: list }] : []
  })
}

export default function ComponentsPage() {
  const groups = galleryGroups(componentDemos)
  let cardIndex = 0

  return (
    <div className="min-w-0 flex-1 py-2 pb-16">
      <BlurFade delay={0.05}>
        <div className="mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            UI Components
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl">
            Components
          </h1>
          <p className="mt-3 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Live previews, grouped by what they do. The three headers share
            one card. Open any card for the source, or pick a single header
            in the sidebar.
          </p>
        </div>
      </BlurFade>

      <div className="flex flex-col gap-14">
        {groups.map((group) => (
          <section key={group.category} aria-labelledby={`components-${group.category}`}>
            <h2
              id={`components-${group.category}`}
              className="mb-5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
            >
              {group.category}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {group.demos.map((demo) => {
                const index = cardIndex
                cardIndex += 1
                return <ComponentDemoCard key={demo.id} demo={demo} index={index} />
              })}
            </div>
          </section>
        ))}
      </div>

      <BlurFade delay={0.2} inView>
        <div className="relative mt-16 overflow-hidden rounded-2xl border border-white/8 bg-white/3 p-8 md:p-12">
          <NoiseTexture opacity={0.04} />
          <BorderBeam
            size={300}
            duration={16}
            colorFrom="rgba(255,255,255,0.3)"
            colorTo="transparent"
          />
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                Pair them with live designs
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Explore the Art and Dev showcases to see these building blocks
                in full product contexts.
              </p>
            </div>
            <Link
              href="/designs"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-tawny px-6 py-2.5 text-sm font-medium text-tawny-foreground transition-opacity hover:opacity-90"
            >
              Browse designs
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </BlurFade>
    </div>
  )
}
