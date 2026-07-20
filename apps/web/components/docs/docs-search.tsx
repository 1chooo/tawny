'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { FileText, Hash, Search, X } from 'lucide-react'
import type { DocsSearchEntry } from '@/lib/docs/search'
import { cn } from '@tawny/ui/lib/utils'

export function DocsSearch({ entries }: { entries: DocsSearchEntry[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.platform))
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') {
        return
      }
      event.preventDefault()
      setOpen((prev) => !prev)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!open) return
    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEscape)
    }
  }, [open])

  const pageEntries = useMemo(
    () => entries.filter((entry) => entry.kind === 'page'),
    [entries],
  )
  const headingEntries = useMemo(
    () => entries.filter((entry) => entry.kind === 'heading'),
    [entries],
  )

  const shortcutLabel = isMac ? '⌘K' : 'Ctrl+K'

  function goTo(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex h-8 w-full min-w-0 max-w-md items-center gap-2 rounded-md border border-white/8 bg-white/3 px-3 text-sm text-muted-foreground transition-colors',
          'hover:border-white/15 hover:bg-white/5 hover:text-foreground sm:min-w-56 md:min-w-72',
        )}
        aria-label="Search docs"
      >
        <Search className="size-3.5 shrink-0" aria-hidden />
        <span className="min-w-0 flex-1 truncate text-left">Search docs…</span>
        <kbd className="pointer-events-none hidden h-5 shrink-0 items-center rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[0.65rem] font-medium text-muted-foreground sm:inline-flex">
          {shortcutLabel}
        </kbd>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
          <button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            aria-label="Close search"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-background shadow-2xl"
          >
            <Command
              className="flex flex-col"
              filter={(value, search) => {
                if (!search) return 1
                return value.toLowerCase().includes(search.toLowerCase())
                  ? 1
                  : 0
              }}
            >
              <div className="flex items-center gap-2 border-b border-white/8 px-3">
                <Search
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <Command.Input
                  placeholder="Search docs…"
                  className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
              <Command.List className="max-h-72 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>
                {pageEntries.length > 0 ? (
                  <Command.Group
                    heading="Pages"
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[0.65rem] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:text-muted-foreground"
                  >
                    {pageEntries.map((entry) => (
                      <Command.Item
                        key={entry.id}
                        value={`${entry.title} ${entry.keywords}`}
                        onSelect={() => goTo(entry.href)}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground outline-none data-[selected=true]:bg-white/8 data-[selected=true]:text-foreground"
                      >
                        <FileText className="size-4 shrink-0" aria-hidden />
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="truncate">{entry.title}</span>
                          {entry.description ? (
                            <span className="truncate text-xs text-muted-foreground/80">
                              {entry.description}
                            </span>
                          ) : null}
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ) : null}
                {headingEntries.length > 0 ? (
                  <Command.Group
                    heading="Headings"
                    className="mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[0.65rem] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:text-muted-foreground"
                  >
                    {headingEntries.map((entry) => (
                      <Command.Item
                        key={entry.id}
                        value={`${entry.title} ${entry.keywords}`}
                        onSelect={() => goTo(entry.href)}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground outline-none data-[selected=true]:bg-white/8 data-[selected=true]:text-foreground"
                      >
                        <Hash className="size-4 shrink-0" aria-hidden />
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="truncate">{entry.title}</span>
                          <span className="truncate text-xs text-muted-foreground/80">
                            {entry.description}
                          </span>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ) : null}
              </Command.List>
            </Command>
          </div>
        </div>
      ) : null}
    </>
  )
}
