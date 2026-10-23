'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@tawny/ui/lib/utils'

export type OverviewCommand = {
  id: string
  label: string
  code: string
}

/**
 * Dark code well for the components overview hero. Language tabs and the
 * copy control sit in the header, the way the xAI docs quickstart does.
 */
export function OverviewCodePanel({
  commands,
  highlightedHtml,
}: {
  commands: OverviewCommand[]
  highlightedHtml: Record<string, string>
}) {
  const [activeId, setActiveId] = useState(commands[0]?.id ?? '')
  const [copied, setCopied] = useState(false)
  const active = commands.find((command) => command.id === activeId) ?? commands[0]

  async function handleCopy() {
    if (!active) return
    try {
      await navigator.clipboard.writeText(active.code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  if (!active) return null

  return (
    <div className="flex min-h-[168px] min-w-0 flex-col overflow-hidden rounded-2xl bg-[#141311] text-white/85">
      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-4 py-2.5">
        <div
          role="tablist"
          aria-label="Package manager"
          className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto"
        >
          {commands.map((command) => {
            const isActive = command.id === active.id
            return (
              <button
                key={command.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(command.id)}
                className={cn(
                  'shrink-0 px-1 text-xs transition-colors',
                  isActive ? 'text-white' : 'text-white/55 hover:text-white/80',
                )}
              >
                {command.label}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/6 hover:text-white"
        >
          {copied ? (
            <Check className="size-3.5" aria-hidden />
          ) : (
            <Copy className="size-3.5" aria-hidden />
          )}
        </button>
      </div>
      <div
        className={cn(
          'overflow-auto px-5 py-4 font-mono text-[13px] leading-5',
          '[&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!',
          '[&_code]:font-mono [&_code]:text-[13px] [&_code]:leading-5',
        )}
        dangerouslySetInnerHTML={{ __html: highlightedHtml[active.id] ?? '' }}
      />
    </div>
  )
}
