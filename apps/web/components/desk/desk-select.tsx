'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'
import { cn } from '@tawny/ui/lib/utils'

export type DeskOption = { value: string; label: string }

/**
 * Desk menu. Native selects keep the browser's list, which does not match
 * the paper cards, so this draws the same border, radius, and ink row.
 */
export function DeskSelect({
  value,
  options,
  onChange,
  ariaLabel,
  size = 'md',
  className,
}: {
  value: string
  options: DeskOption[]
  onChange: (value: string) => void
  ariaLabel?: string
  size?: 'sm' | 'md'
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<{ top: number; left: number; width: number; root: HTMLElement } | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const listId = useId()
  const current = options.find((option) => option.value === value)

  function close() {
    setOpen(false)
    setMenu(null)
  }

  function toggle() {
    if (open) {
      close()
      return
    }
    const button = buttonRef.current
    const root = button?.closest('[data-desk-root]')
    if (!button || !(root instanceof HTMLElement)) return
    const buttonBox = button.getBoundingClientRect()
    const rootBox = root.getBoundingClientRect()
    setMenu({
      top: buttonBox.bottom - rootBox.top + 4,
      left: buttonBox.left - rootBox.left,
      width: Math.max(buttonBox.width, 160),
      root,
    })
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    function onPointer(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Node)) return
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return
      close()
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }
    function onScroll(event: Event) {
      const target = event.target
      if (target instanceof Node && menuRef.current?.contains(target)) return
      close()
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [open])

  return (
    <div className={cn('relative min-w-0', className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel}
        onClick={toggle}
        className={cn(
          'flex w-full items-center justify-between gap-2 border border-border bg-background text-left text-foreground',
          size === 'sm' ? 'h-8 rounded-lg px-2 text-xs' : 'h-9 rounded-lg px-3 text-sm',
        )}
      >
        <span className="min-w-0 truncate">{current?.label ?? 'Choose'}</span>
        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      </button>
      {open && menu
        ? createPortal(
            <ul
              ref={menuRef}
              id={listId}
              role="listbox"
              aria-label={ariaLabel}
              style={{ top: menu.top, left: menu.left, width: menu.width }}
              className="absolute z-40 max-h-56 overflow-y-auto rounded-lg border border-border bg-card py-1 text-card-foreground shadow-sm"
            >
              {options.map((option) => {
                const selected = option.value === value
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        onChange(option.value)
                        close()
                      }}
                      className={cn(
                        'flex w-full px-3 py-2 text-left text-sm',
                        selected ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted',
                      )}
                    >
                      {option.label}
                    </button>
                  </li>
                )
              })}
            </ul>,
            menu.root,
          )
        : null}
    </div>
  )
}

export const PROJECT_STATUS_OPTIONS: DeskOption[] = [
  { value: 'running', label: 'Running' },
  { value: 'pending', label: 'Pending' },
  { value: 'ended', label: 'Ended' },
]

export const TASK_STATUS_OPTIONS: DeskOption[] = [
  { value: 'todo', label: 'To do' },
  { value: 'progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
]

export const PRIORITY_OPTIONS: DeskOption[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]
