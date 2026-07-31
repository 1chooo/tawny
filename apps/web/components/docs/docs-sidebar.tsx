import type { ReactNode } from 'react'
import { DocsSidebarNav } from '@/components/docs/docs-sidebar-nav'
import type { DocsSidebarGroup } from '@/lib/docs/load'

export function DocsSidebar({
  groups,
  activeSlug,
  search,
}: {
  groups: DocsSidebarGroup[]
  activeSlug: string
  search?: ReactNode
}) {
  return (
    <aside className="hidden w-56 shrink-0 lg:block xl:w-60">
      <div className="sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto py-2 pr-4">
        {search ? <div className="mb-4">{search}</div> : null}
        <DocsSidebarNav groups={groups} activeSlug={activeSlug} />
      </div>
    </aside>
  )
}
