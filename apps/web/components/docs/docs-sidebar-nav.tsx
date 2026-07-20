'use client'

import Link from 'next/link'
import { cn } from '@tawny/ui/lib/utils'
import type { DocsSidebarGroup } from '@/lib/docs/load'

export function DocsSidebarNav({
  groups,
  activeSlug,
  onNavigate,
}: {
  groups: DocsSidebarGroup[]
  activeSlug: string
  onNavigate?: () => void
}) {
  return (
    <nav aria-label="Docs" className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.id} className="flex flex-col gap-1">
          <p className="px-2 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {group.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const isActive = item.slug === activeSlug
              return (
                <li key={item.slug || 'index'}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={onNavigate}
                    className={cn(
                      'block rounded-md px-2 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-white/8 font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
