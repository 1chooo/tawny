import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ComponentsJumpIn } from '@/components/docs/components-jump-in'
import { DocsPillLink } from '@/components/docs/docs-pill'
import { OverviewCodePanel } from '@/components/docs/overview-code-panel'
import { ProductFrame } from '@/components/product-frame'
import {
  getComponentDemo,
  type ComponentDemo,
  componentDemos,
} from '@/components/landing/showcases'
import { highlightCode } from '@/lib/highlight-code'
import { cn } from '@tawny/ui/lib/utils'

export const metadata: Metadata = {
  title: 'Components — Tawny',
  description:
    'Live UI components for Next.js. Preview navigation, dashboards, motion, and portfolio pieces, then copy the source.',
}

/** The three headers share one gallery card. Each still has its own page. */
const GALLERY_HIDDEN = new Set(['tawny-header', 'art-header', 'dev-header'])

const CATEGORY_ORDER: ComponentDemo['category'][] = [
  'Dashboard',
  'Maps',
  'People',
  'Portfolio',
  'Navigation',
  'Motion',
  'Effects',
  'Embed',
]

const HIGHLIGHTS: { id: string; includes: string }[] = [
  { id: 'headers', includes: 'Tawny, Art, and Dev' },
  { id: 'issue-list', includes: 'Labels, ids, and dates' },
  { id: 'motion', includes: 'WordRotate, ShimmerButton' },
]

const QUICKSTART = [
  {
    id: 'pnpm',
    label: 'pnpm',
    code: 'pnpm create tawny@latest art my-site\ncd my-site\npnpm dev',
  },
  {
    id: 'npm',
    label: 'npm',
    code: 'npx create-tawny@latest art my-site\ncd my-site\nnpm run dev',
  },
  {
    id: 'yarn',
    label: 'yarn',
    code: 'yarn create tawny art my-site\ncd my-site\nyarn dev',
  },
  {
    id: 'bun',
    label: 'bun',
    code: 'bunx create-tawny@latest art my-site\ncd my-site\nbun dev',
  },
]

const EXPLORE = [
  {
    title: 'Get started',
    links: [
      { label: 'Getting started', href: '/components/getting-started' },
      { label: 'create-tawny', href: '/components/create-tawny' },
      { label: 'Designs overview', href: '/components/designs/overview' },
      { label: 'Browse designs', href: '/designs' },
    ],
  },
  {
    title: 'Components',
    links: CATEGORY_ORDER.map((category) => ({
      label: category,
      href: `/components#${category.toLowerCase()}`,
    })),
  },
  {
    title: 'Resources',
    links: [
      { label: 'Changelog', href: '/changelog' },
      { label: 'Writeups', href: '/writeups' },
      { label: 'Logos and marks', href: '/logos-marks' },
      {
        label: 'GitHub',
        href: 'https://github.com/1chooo/tawny',
      },
    ],
  },
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

function fileName(path: string) {
  return path.split('/').pop() ?? path
}

function DemoPreview({ demo }: { demo: ComponentDemo }) {
  return (
    <ProductFrame
      title={demo.frameTitle}
      contentClassName={cn('aspect-video overflow-hidden', demo.contentClassName)}
    >
      <div className="pointer-events-none h-full min-h-0">{demo.render()}</div>
    </ProductFrame>
  )
}

export default async function ComponentsPage() {
  const groups = galleryGroups(componentDemos)
  const highlighted = await Promise.all(
    QUICKSTART.map(async (command) => ({
      id: command.id,
      html: await highlightCode(command.code, 'bash'),
    })),
  )
  const highlightedHtml = Object.fromEntries(
    highlighted.map((command) => [command.id, command.html]),
  )
  const highlights = HIGHLIGHTS.flatMap((item) => {
    const demo = getComponentDemo(item.id)
    return demo ? [{ ...item, demo }] : []
  })

  return (
    <div className="min-w-0 flex-1 py-2 pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <section className="grid grid-cols-1 items-center gap-6 rounded-3xl bg-card p-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 lg:p-6">
          <div className="flex flex-col gap-6 px-1 py-2 lg:py-4 lg:pl-4">
            <div>
              <h1 className="max-w-[22rem] text-balance text-4xl font-medium leading-[1.1] tracking-tight text-foreground lg:text-5xl">
                Components{' '}
                <span className="text-foreground/60">for production Next.js</span>
              </h1>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-foreground">
                Live UI you can preview and copy. Navigation, dashboards, motion, maps, and portfolio pieces.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-start">
              <DocsPillLink href="/components/getting-started">
                Get started
                <ArrowUpRight className="size-4" aria-hidden />
              </DocsPillLink>
              <DocsPillLink href="#components" variant="secondary">
                See components
              </DocsPillLink>
            </div>
          </div>
          <OverviewCodePanel
            commands={QUICKSTART}
            highlightedHtml={highlightedHtml}
          />
        </section>

        <section aria-labelledby="component-highlights-heading" className="space-y-6">
          <h2
            id="component-highlights-heading"
            className="text-2xl font-medium leading-tight tracking-tight text-foreground"
          >
            Start here
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {highlights.map(({ demo, includes }) => (
              <article
                key={demo.id}
                className="flex flex-col gap-5 rounded-2xl bg-card p-6"
              >
                <div>
                  <div className="mb-3">
                    <h3 className="text-xl font-medium tracking-tight text-foreground">
                      {demo.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-foreground/60">
                      {demo.id}
                    </p>
                  </div>
                  <p className="max-w-2xl text-sm leading-relaxed text-foreground">
                    {demo.description}
                  </p>
                </div>
                <dl className="divide-y divide-foreground/10">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 py-2 text-sm">
                    <dt className="text-foreground/60">Category</dt>
                    <dd className="text-foreground">{demo.category}</dd>
                  </div>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 py-2 text-sm">
                    <dt className="text-foreground/60">Includes</dt>
                    <dd className="text-foreground">{includes}</dd>
                  </div>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 py-2 text-sm">
                    <dt className="text-foreground/60">Files</dt>
                    <dd className="text-foreground">{demo.sourceFiles.length} to copy</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap items-center gap-3">
                  <DocsPillLink href={`/components/${demo.id}`}>Open component</DocsPillLink>
                  <DocsPillLink href={`/components/${demo.id}#source`} variant="secondary">
                    View source
                  </DocsPillLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ComponentsJumpIn
          groups={groups.map((group) => ({
            category: group.category,
            demos: group.demos.map((demo) => ({
              id: demo.id,
              title: demo.title,
              description: demo.description,
              category: demo.category,
              fileCount: demo.sourceFiles.length,
              files: demo.sourceFiles.map(fileName),
              preview: <DemoPreview demo={demo} />,
            })),
          }))}
        />

        <section aria-labelledby="explore-docs-heading" className="space-y-6">
          <h2
            id="explore-docs-heading"
            className="text-2xl font-medium leading-tight tracking-tight text-foreground"
          >
            Explore the documentation
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {EXPLORE.map((column) => (
              <div key={column.title} className="min-w-0">
                <h3 className="mb-3 text-xl font-medium tracking-tight text-foreground">
                  {column.title}
                </h3>
                <div className="flex flex-col divide-y divide-foreground/10 border-t border-foreground/10">
                  {column.links.map((item) => {
                    const external = item.href.startsWith('http')
                    const className =
                      'group flex min-h-10 items-center justify-between gap-3 py-2 text-sm text-foreground/60 transition-colors hover:text-foreground'
                    const inner = (
                      <>
                        {item.label}
                        <ArrowUpRight
                          className="size-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
                          aria-hidden
                        />
                      </>
                    )
                    return external ? (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link key={item.href} href={item.href} className={className}>
                        {inner}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
