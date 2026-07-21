'use client'

import { useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { DocsSearch } from '@/components/docs/docs-search'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { DocsSidebarNav } from '@/components/docs/docs-sidebar-nav'
import type { DocsSidebarGroup } from '@/lib/docs/load'
import type { DocsSearchEntry } from '@/lib/docs/search'
import { NoiseTexture } from '@tawny/ui/components/noise-texture'
import { cn } from '@tawny/ui/lib/utils'

function activeSlugFromPathname(pathname: string): string {
  const docsIndex = pathname.indexOf('/docs')
  if (docsIndex === -1) return ''
  const rest = pathname.slice(docsIndex + '/docs'.length).replace(/^\//, '')
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
    <div className="relative min-h-screen px-6 pb-8 pt-28">
      <NoiseTexture opacity={0.025} />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            aria-label={mobileOpen ? 'Close docs navigation' : 'Open docs navigation'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="size-4" aria-hidden />
            ) : (
              <Menu className="size-4" aria-hidden />
            )}
          </button>
          <DocsSearch entries={searchEntries} />
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
          <DocsSidebar groups={groups} activeSlug={activeSlug} />
          {children}
        </div>
      </div>
    </div>
  )
}
