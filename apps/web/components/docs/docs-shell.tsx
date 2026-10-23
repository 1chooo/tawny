'use client'

import { useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import {
  DocsSearchProvider,
  DocsSearchTrigger,
} from '@/components/docs/docs-search'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { DocsSidebarNav } from '@/components/docs/docs-sidebar-nav'
import type { DocsSidebarGroup } from '@/lib/docs/load'
import type { DocsSearchEntry } from '@/lib/docs/search'
import { NoiseTexture } from '@tawny/ui/components/noise-texture'
import { cn } from '@tawny/ui/lib/utils'

function activeSlugFromPathname(pathname: string): string {
  const docsIndex = pathname.indexOf('/components')
  if (docsIndex === -1) return ''
  const rest = pathname
    .slice(docsIndex + '/components'.length)
    .replace(/^\//, '')
  return rest
}

export function DocsShell({
  groups,
  searchEntries,
  children,
}: {
  groups: DocsSidebarGroup[]
  searchEntries: DocsSearchEntry[]
  children: ReactNode
}) {
  const pathname = usePathname()
  const activeSlug = activeSlugFromPathname(pathname)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <DocsSearchProvider entries={searchEntries}>
      <div className="relative min-h-screen px-6 pb-8 pt-20">
        <NoiseTexture opacity={0.025} />

        <div className="relative z-10 w-full">
          <div className="sticky top-14 z-40 -mx-6 mb-4 border-b border-border/60 bg-background/80 px-6 py-3 backdrop-blur-xl lg:hidden">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label={
                  mobileOpen ? 'Close docs navigation' : 'Open docs navigation'
                }
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? (
                  <X className="size-4" aria-hidden />
                ) : (
                  <Menu className="size-4" aria-hidden />
                )}
              </button>
              <DocsSearchTrigger variant="toolbar" />
            </div>
          </div>

          {mobileOpen ? (
            <div
              className={cn(
                'mb-6 rounded-xl border border-border bg-muted/40 p-4 lg:hidden',
              )}
            >
              <DocsSidebarNav
                groups={groups}
                activeSlug={activeSlug}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
          ) : null}

          <div className="flex gap-2">
            <DocsSidebar
              groups={groups}
              activeSlug={activeSlug}
              search={<DocsSearchTrigger variant="sidebar" />}
            />
            {children}
          </div>
        </div>
      </div>
    </DocsSearchProvider>
  )
}
