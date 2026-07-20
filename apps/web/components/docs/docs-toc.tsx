'use client'

import { useEffect, useState } from 'react'
import { cn } from '@tawny/ui/lib/utils'
import type { TocItem } from '@/lib/docs/toc'

export function DocsToc({
  items,
  label = 'On this page',
}: {
  items: TocItem[]
  label?: string
}) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    if (items.length === 0) return

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 1],
      },
    )

    for (const heading of headings) {
      observer.observe(heading)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <aside className="hidden w-48 shrink-0 xl:block">
      <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto py-2 pl-4">
        <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </p>
        <ul className="flex flex-col gap-1 border-l border-white/8">
          {items.map((item) => {
            const isActive = item.id === activeId
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    '-ml-px block border-l py-1 text-sm transition-colors',
                    item.level === 3 ? 'pl-5' : 'pl-3',
                    isActive
                      ? 'border-tawny font-medium text-tawny'
                      : 'border-transparent text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
