'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { DocsPillLink } from '@/components/docs/docs-pill'
import { cn } from '@tawny/ui/lib/utils'

export type JumpDemo = {
  id: string
  title: string
  description: string
  category: string
  fileCount: number
  files: string[]
  preview: ReactNode
}

export type JumpGroup = {
  category: string
  demos: JumpDemo[]
}

function categoryHash(category: string) {
  return category.toLowerCase()
}

/**
 * Tabbed live preview. One category at a time, with the active component
 * on the left and a checklist plus open action on the right.
 */
export function ComponentsJumpIn({ groups }: { groups: JumpGroup[] }) {
  const [category, setCategory] = useState(groups[0]?.category ?? '')
  const [activeId, setActiveId] = useState(groups[0]?.demos[0]?.id ?? '')

  function selectCategory(next: string) {
    setCategory(next)
    const first = groups.find((group) => group.category === next)?.demos[0]
    if (first) setActiveId(first.id)
  }

  useEffect(() => {
    function applyHash() {
      const hash = window.location.hash.replace('#', '').toLowerCase()
      const match = groups.find((group) => categoryHash(group.category) === hash)
      if (!match) return
      setCategory(match.category)
      setActiveId(match.demos[0]?.id ?? '')
    }

    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [groups])

  const group = groups.find((item) => item.category === category) ?? groups[0]
  const active = group?.demos.find((demo) => demo.id === activeId) ?? group?.demos[0]

  if (!group || !active) return null

  return (
    <section id="components" aria-labelledby="components-jump-heading" className="scroll-mt-28 space-y-6">
      <div>
        <h2
          id="components-jump-heading"
          className="text-2xl font-medium leading-tight tracking-tight text-foreground"
        >
          Jump straight in
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-foreground/80">
          Pick a group and open the live preview. Each page includes the source to copy.
        </p>
      </div>

      <div className="rounded-3xl bg-card p-4 md:p-5">
        <div
          role="tablist"
          aria-label="Component groups"
          className="mb-5 flex w-fit max-w-full flex-nowrap gap-1 overflow-x-auto rounded-full bg-background p-1"
        >
          {groups.map((item) => {
            const isActive = item.category === group.category
            return (
              <button
                key={item.category}
                id={categoryHash(item.category)}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectCategory(item.category)}
                className={cn(
                  'h-10 shrink-0 rounded-full px-4 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-foreground text-background'
                    : 'text-foreground/60 hover:text-foreground',
                )}
              >
                {item.category}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-8">
          <div className="order-2 min-w-0 lg:order-1">{active.preview}</div>

          <div className="order-1 flex min-w-0 flex-col px-1 py-1 lg:order-2 lg:px-2">
            <h3 className="text-xl font-medium tracking-tight text-foreground">
              {active.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {active.description}
            </p>

            {group.demos.length > 1 ? (
              <ul className="mt-5 divide-y divide-foreground/10 border-t border-foreground/10">
                {group.demos.map((demo) => {
                  const isSelected = demo.id === active.id
                  return (
                    <li key={demo.id}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setActiveId(demo.id)}
                        className={cn(
                          'flex min-h-10 w-full items-center justify-between gap-3 py-2 text-left text-sm transition-colors',
                          isSelected
                            ? 'font-medium text-foreground'
                            : 'text-foreground/60 hover:text-foreground',
                        )}
                      >
                        {demo.title}
                        {isSelected ? (
                          <Check className="size-3.5 shrink-0 text-tawny" aria-hidden />
                        ) : null}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <ul className="mt-5 space-y-2.5 border-t border-foreground/10 pt-5">
                {active.files.map((file) => (
                  <li
                    key={file}
                    className="flex items-start gap-3 font-mono text-[13px] text-foreground"
                  >
                    <Check className="mt-0.5 size-3.5 shrink-0 text-tawny" aria-hidden />
                    <span className="min-w-0 break-all">{file}</span>
                  </li>
                ))}
              </ul>
            )}

            <dl className="mt-4 divide-y divide-foreground/10 border-t border-foreground/10">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 py-2 text-sm">
                <dt className="text-foreground/60">Category</dt>
                <dd className="text-foreground">{active.category}</dd>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 py-2 text-sm">
                <dt className="text-foreground/60">Files</dt>
                <dd className="text-foreground">{active.fileCount} to copy</dd>
              </div>
            </dl>

            <div className="mt-auto pt-6">
              <DocsPillLink href={`/components/${active.id}`} variant="secondary">
                Open component
              </DocsPillLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
