'use client'

import { Video } from 'lucide-react'
import { useDesk } from '@/components/desk-store'
import { DEMO_TODAY, formatDue } from '@/lib/model'
import { Panel } from '@/components/panel'
import { EmptyNote } from '@/components/empty-note'

export function Reminders() {
  const { events, startEvent } = useDesk()
  const upcoming = [...events]
    .filter((event) => !event.started)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  const next = upcoming.find((event) => event.date >= DEMO_TODAY) ?? upcoming[0]

  return (
    <Panel>
      <h2 className="text-lg font-semibold tracking-tight">Reminders</h2>
      {next ? (
        <div className="mt-4 rounded-lg border border-border bg-background p-4">
          <h3 className="font-medium text-foreground">{next.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDue(next.date)} · {next.time} · {next.duration}
          </p>
          <button
            type="button"
            onClick={() => startEvent(next.id)}
            className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm text-primary-foreground hover:bg-primary/90"
          >
            <Video className="size-4" aria-hidden="true" />
            Start meeting
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <EmptyNote title="No reminders" body="Add an event on the calendar." />
        </div>
      )}
    </Panel>
  )
}
