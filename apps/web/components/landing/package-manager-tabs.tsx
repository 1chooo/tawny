'use client'

import { useMemo, useState } from 'react'
import { CopyCodeBlock } from '@/components/landing/copy-code-block'
import { cn } from '@tawny/ui/lib/utils'

export type PackageManagerCommand = {
  id: string
  label: string
  code: string
}

type PackageManagerTabsProps = {
  commands: PackageManagerCommand[]
  /** Pre-highlighted HTML keyed by command id */
  highlightedHtml: Record<string, string>
  className?: string
}

/**
 * Next.js-docs-style install tabs for pnpm / npm / yarn / bun.
 * Commands are computed on the server and passed in as props.
 */
export function PackageManagerTabs({
  commands,
  highlightedHtml,
  className,
}: PackageManagerTabsProps) {
  const [active, setActive] = useState(commands[0]?.id ?? 'pnpm')

  const activePm = useMemo(
    () => commands.find((pm) => pm.id === active) ?? commands[0],
    [active, commands],
  )

  if (!activePm) return null

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div
        className="flex flex-wrap gap-1 rounded-full border border-white/8 bg-white/3 p-1 w-fit"
        role="tablist"
        aria-label="Package manager"
      >
        {commands.map((pm) => {
          const isActive = active === pm.id
          return (
            <button
              key={pm.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(pm.id)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {pm.label}
            </button>
          )
        })}
      </div>

      <CopyCodeBlock
        title="Terminal"
        language="bash"
        code={activePm.code}
        html={highlightedHtml[activePm.id] ?? ''}
      />
    </div>
  )
}
