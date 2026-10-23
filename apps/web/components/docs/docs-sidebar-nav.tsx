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
    <nav aria-label="Docs" className="flex flex-col gap-1">
      {groups.map((group) => (
        <div key={group.id} className="flex flex-col gap-0.5 pt-3 first:pt-0">
          <p className="flex h-8 items-center px-2 text-[13px] font-medium text-foreground">
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
                      'flex h-8 items-center rounded-[10px] px-2 text-[13px] font-medium transition-colors duration-200',
                      isActive
                        ? 'bg-accent text-foreground'
                        : 'text-muted-foreground hover:bg-accent/70 hover:text-foreground',
                    )}
                  >
                    <span className="min-w-0 truncate">{item.title}</span>
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
