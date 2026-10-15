'use client'

import { useState } from 'react'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'

type Status = 'todo' | 'progress' | 'done'

const STATUSES: { id: Status; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'progress', label: 'In progress' },
  { id: 'done', label: 'Done' },
]

/**
 * The status menu from the Board issue detail: a 32px trigger,
 * grey status icons, and the open row in tawny.
 */
export function StatusSelect({
  initial = 'progress',
  defaultOpen = false,
}: {
  initial?: Status
  defaultOpen?: boolean
}) {
  const [status, setStatus] = useState<Status>(initial)
  const [open, setOpen] = useState(defaultOpen)
  const current = STATUSES.find((entry) => entry.id === status) ?? STATUSES[0]

  return (
    <div className="w-56 tracking-[-0.01em]">
      <p className="text-[11px] text-muted-foreground">NOR-142</p>
      <h2 className="mt-1 text-[15px] font-semibold leading-5 tracking-tight text-foreground">
        Empty state for archived projects
      </h2>
      <div className="relative mt-4">
        <p className="text-[11px] text-muted-foreground">Status</p>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((value) => !value)}
          className="mt-1 flex h-8 w-full items-center gap-2 rounded-md border border-border bg-background px-2 text-left text-[13px] text-foreground transition-colors duration-[80ms] ease-out hover:bg-accent"
        >
          <StatusIcon status={current.id} />
          <span className="min-w-0 flex-1 truncate">{current.label}</span>
        </button>
        {open ? (
          <ul
            role="listbox"
            aria-label="Status"
            className="absolute top-full z-10 mt-1 w-full overflow-hidden rounded-md border border-border bg-popover py-1"
          >
            {STATUSES.map((entry) => {
              const active = entry.id === status
              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setStatus(entry.id)
                      setOpen(false)
                    }}
                    className={
                      active
                        ? 'flex w-full items-center gap-2 bg-tawny/15 px-2 py-1.5 text-left text-[13px] text-foreground'
                        : 'flex w-full items-center gap-2 px-2 py-1.5 text-left text-[13px] text-foreground transition-colors duration-[80ms] ease-out hover:bg-accent'
                    }
                  >
                    <StatusIcon status={entry.id} />
                    {entry.label}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

function StatusIcon({ status }: { status: Status }) {
  const color = 'var(--muted-foreground)'
  if (status === 'done') {
    return (
      <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M5 8.2 7.1 10.2 11 6.1" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (status === 'progress') {
    return (
      <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M8 2.2a5.8 5.8 0 0 1 0 11.6Z" fill={color} />
      </svg>
    )
  }
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

function SelectStage() {
  return (
    <div className="flex h-full items-start justify-center bg-background pt-16">
      <div className="rounded-xl border border-border bg-card p-4">
        <StatusSelect defaultOpen />
      </div>
    </div>
  )
}

/** Gallery card: menu open, desktop canvas scaled into the 16:9 frame. */
export function StatusSelectDemo() {
  return (
    <div className="h-full">
      <ScaledDesignCanvas>
        <SelectStage />
      </ScaledDesignCanvas>
    </div>
  )
}

/** Detail page: the same control, open, and clickable. */
export function StatusSelectDetail() {
  return (
    <div className="flex h-full items-start justify-center bg-background pt-16">
      <div className="rounded-xl border border-border bg-card p-4">
        <StatusSelect defaultOpen />
      </div>
    </div>
  )
}
