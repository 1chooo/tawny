import type { ReactNode } from 'react'
import { ArtHeaderDemo, ArtHeaderDetail } from '@/components/landing/showcases/art-header-demo'
import { DevHeaderDemo, DevHeaderDetail } from '@/components/landing/showcases/dev-header-demo'
import {
  EmbedCardDemo,
  EmbedCardGalleryPreview,
} from '@/components/landing/showcases/embed-card-demo'
import {
  DottedMapDemo,
  DottedMapDetail,
  EffectsDemo,
  EffectsDetail,
  MotionPrimitivesDemo,
  MotionPrimitivesDetail,
} from '@/components/landing/showcases/primitive-demos'
import {
  IssueListDemo,
  IssueListDetail,
} from '@/components/landing/showcases/issue-list-demo'
import { TawnyHeaderDemo, TawnyHeaderDetail } from '@/components/landing/showcases/tawny-header-demo'

export type ComponentDemo = {
  id: string
  title: string
  description: string
  category: 'Navigation' | 'Motion' | 'Effects' | 'Maps' | 'Embed' | 'Dashboard'
  frameTitle: string
  contentClassName?: string
  /** ProductFrame content classes on the detail page; defaults to aspect-video */
  detailContentClassName?: string
  /** Featured on the landing teaser */
  featured?: boolean
  /** Repo-relative source files shown on the detail page for copy */
  sourceFiles: string[]
  render: () => ReactNode
  /** Live preview on /components/<id>; defaults to render() */
  detailRender?: () => ReactNode
}

/**
 * Shared live component demos for the landing and /components gallery.
 * Each render uses ScaledDesignCanvas so cards preserve real desktop ratios.
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
    sourceFiles: ['apps/web/components/navbar.tsx', 'apps/web/components/logo.tsx'],
    render: () => <TawnyHeaderDemo />,
    detailRender: () => <TawnyHeaderDetail />,
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
    sourceFiles: [
      'apps/web/components/art/site-header.tsx',
      'apps/web/components/art/nav-links.tsx',
      'apps/web/components/art/locale-switcher.tsx',
    ],
    render: () => <ArtHeaderDemo />,
    detailRender: () => <ArtHeaderDetail />,
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
    sourceFiles: ['apps/web/components/dev/site-header.tsx'],
    render: () => <DevHeaderDemo />,
    detailRender: () => <DevHeaderDetail />,
  },
  {
    id: 'motion',
    title: 'Motion Primitives',
    description: 'WordRotate and ShimmerButton for headlines and CTAs.',
    category: 'Motion',
    frameTitle: 'components/ui/motion',
    featured: true,
    sourceFiles: [
      'packages/ui/src/components/word-rotate.tsx',
      'packages/ui/src/components/shimmer-button.tsx',
    ],
    render: () => <MotionPrimitivesDemo />,
    detailRender: () => <MotionPrimitivesDetail />,
  },
  {
    id: 'effects',
    title: 'Border & Counters',
    description:
      'BorderBeam, AnimatedGradientText, and NumberTicker in one panel.',
    category: 'Effects',
    frameTitle: 'components/ui/effects',
    featured: true,
    sourceFiles: [
      'packages/ui/src/components/border-beam.tsx',
      'packages/ui/src/components/animated-gradient-text.tsx',
      'packages/ui/src/components/number-ticker.tsx',
    ],
    render: () => <EffectsDemo />,
    detailRender: () => <EffectsDetail />,
  },
  {
    id: 'dotted-map',
    title: 'Dotted Map',
    description: 'SVG dotted world map with markers for location moments.',
    category: 'Maps',
    frameTitle: 'components/ui/dotted-map',
    sourceFiles: ['packages/ui/src/components/dotted-map.tsx'],
    render: () => <DottedMapDemo />,
    detailRender: () => <DottedMapDetail />,
  },
  {
    id: 'embed-card',
    title: 'Embed Card',
    description:
      'URL embed cards for YouTube, X, Instagram, Reddit, Maps, Vimeo, TikTok, and a link-preview fallback.',
    category: 'Embed',
    frameTitle: 'components/embed-card',
    sourceFiles: [
      'apps/web/components/landing/showcases/embed-card-demo.tsx',
    ],
    render: () => <EmbedCardGalleryPreview />,
    detailRender: () => <EmbedCardDemo />,
    detailContentClassName: 'overflow-hidden',
  },
  {
    id: 'issue-list',
    title: 'Issue list',
    description:
      'A 4px grid, 16px icons on the text line, labels and ids on the left, numbers and dates on the right.',
    category: 'Dashboard',
    frameTitle: 'components/issue-list',
    contentClassName: 'bg-background',
    detailContentClassName: 'h-[36rem] overflow-hidden bg-background',
    sourceFiles: ['apps/web/components/writeups/linear-ux-demo.tsx'],
    render: () => <IssueListDemo />,
    detailRender: () => <IssueListDetail />,
  },
]

export const featuredComponentDemos = componentDemos.filter((d) => d.featured)

export function getComponentDemo(id: string) {
  return componentDemos.find((d) => d.id === id)
}
