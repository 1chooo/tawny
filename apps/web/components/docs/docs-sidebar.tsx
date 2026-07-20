import { DocsSidebarNav } from '@/components/docs/docs-sidebar-nav'
import type { DocsSidebarGroup } from '@/lib/docs/load'

export function DocsSidebar({
  groups,
  activeSlug,
}: {
  groups: DocsSidebarGroup[]
  activeSlug: string
}) {
  return (
    <aside className="hidden w-56 shrink-0 lg:block xl:w-60">
      <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto py-2 pr-4">
        <DocsSidebarNav groups={groups} activeSlug={activeSlug} />
      </div>
    </aside>
  )
}
