import type { ReactNode } from 'react'
import { ArtHeaderDemo } from '@/components/landing/showcases/art-header-demo'
import { DevHeaderDemo } from '@/components/landing/showcases/dev-header-demo'
import {
  DottedMapDemo,
  EffectsDemo,
  MotionPrimitivesDemo,
} from '@/components/landing/showcases/primitive-demos'
import { TawnyHeaderDemo } from '@/components/landing/showcases/tawny-header-demo'

export type ComponentDemo = {
  id: string
  title: string
  description: string
  category: 'Navigation' | 'Motion' | 'Effects' | 'Maps'
  frameTitle: string
  contentClassName?: string
  /** Featured on the landing teaser */
  featured?: boolean
  render: () => ReactNode
}

/**
 * Shared live component demos for the landing and /components gallery.
 */
export const componentDemos: ComponentDemo[] = [
  {
    id: 'tawny-header',
    title: 'Tawny Navbar',
    description:
      'Scroll-aware site chrome with brand mark, desktop links, and mobile menu.',
    category: 'Navigation',
    frameTitle: 'components/navbar',
    featured: true,
    render: () => <TawnyHeaderDemo />,
  },
  {
    id: 'art-header',
    title: 'Art Header',
    description:
      'Sticky bilingual journal header with bold nav and locale switcher.',
    category: 'Navigation',
    frameTitle: 'components/art/site-header',
    contentClassName: 'bg-art-bento-bg',
    featured: true,
    render: () => <ArtHeaderDemo />,
  },
  {
    id: 'dev-header',
    title: 'Dev Header',
    description:
      'Terminal-style mono header with blinking cursor and route links.',
    category: 'Navigation',
    frameTitle: 'components/dev/site-header',
    contentClassName: 'bg-[#09090b]',
    featured: true,
    render: () => <DevHeaderDemo />,
  },
  {
    id: 'motion',
    title: 'Motion Primitives',
    description: 'WordRotate and ShimmerButton for headlines and CTAs.',
    category: 'Motion',
    frameTitle: 'components/ui/motion',
    featured: true,
    render: () => <MotionPrimitivesDemo />,
  },
  {
    id: 'effects',
    title: 'Border & Counters',
    description:
      'BorderBeam, AnimatedGradientText, and NumberTicker in one panel.',
    category: 'Effects',
    frameTitle: 'components/ui/effects',
    featured: true,
    render: () => <EffectsDemo />,
  },
  {
    id: 'dotted-map',
    title: 'Dotted Map',
    description: 'SVG dotted world map with markers for location moments.',
    category: 'Maps',
    frameTitle: 'components/ui/dotted-map',
    render: () => <DottedMapDemo />,
  },
]

export const featuredComponentDemos = componentDemos.filter((d) => d.featured)
