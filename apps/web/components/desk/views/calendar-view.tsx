'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DeskLink } from '@/components/desk/desk-link'
import { EmptyNote } from '@/components/desk/empty-note'
import { useDesk } from '@/components/desk/desk-store'
import { PageHeading, primaryButton, quietButton } from '@/components/desk/views/page-heading'
import { DEMO_TODAY, matches, projectById } from '@/lib/desk/model'
import { cn } from '@tawny/ui/lib/utils'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function monthLabel(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function CalendarView() {
  const desk = useDesk()
  const [cursor, setCursor] = useState(() => {
    const [year, month] = DEMO_TODAY.split('-').map(Number)
    return { year, month: month - 1 }
  })
  const [selected, setSelected] = useState(DEMO_TODAY)

  const cells = useMemo(() => {
    const first = new Date(cursor.year, cursor.month, 1)
    const start = first.getDay()
    const days = new Date(cursor.year, cursor.month + 1, 0).getDate()
    const slots: { iso: string | null; day: number | null }[] = []
    for (let i = 0; i < start; i += 1) slots.push({ iso: null, day: null })
    for (let day = 1; day <= days; day += 1) {
      const iso = `${cursor.year}-${String(cursor.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      slots.push({ iso, day })
    }
    return slots
  }, [cursor])

  const dayEvents = desk.events
    .filter((event) => event.date === selected)
    .filter((event) => matches(desk.query, event.title, projectById(desk.projects, event.projectId ?? '')?.name ?? ''))

  return (
    <div>
      <PageHeading
        title="Calendar"
        description="Meetings and due dates. October 2026 is the demo month."
        actions={
          <button type="button" className={primaryButton} onClick={() => desk.openDialog('event')}>
            + Add event
          </button>
        }
      />
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-medium">{monthLabel(cursor.year, cursor.month)}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className={quietButton}
            aria-label="Previous month"
            onClick={() =>
              setCursor((current) =>
                current.month === 0 ? { year: current.year - 1, month: 11 } : { ...current, month: current.month - 1 },
              )
            }
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            className={quietButton}
            aria-label="Next month"
            onClick={() =>
              setCursor((current) =>
                current.month === 11 ? { year: current.year + 1, month: 0 } : { ...current, month: current.month + 1 },
              )
            }
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, index) => {
          if (!cell.iso || !cell.day) return <div key={`empty-${index}`} />
          const count = desk.events.filter((event) => event.date === cell.iso).length
          const isSelected = cell.iso === selected
          const isToday = cell.iso === DEMO_TODAY
          return (
            <button
              key={cell.iso}
              type="button"
              onClick={() => setSelected(cell.iso!)}
              className={cn(
                'flex h-12 flex-col items-center justify-center rounded-lg border text-sm',
                isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card',
                isToday && !isSelected ? 'border-tawny' : '',
              )}
            >
              <span>{cell.day}</span>
              {count > 0 ? <span className="text-[10px]">{count}</span> : null}
            </button>
          )
        })}
      </div>
      <section className="mt-4">
        <h2 className="mb-2 text-sm font-medium">
          {selected === DEMO_TODAY ? 'Today' : selected}
        </h2>
        {dayEvents.length === 0 ? (
          <EmptyNote title="Nothing scheduled" body="Pick another day or add an event." />
        ) : (
          <ul className="space-y-2">
            {dayEvents.map((event) => {
              const project = projectById(desk.projects, event.projectId ?? '')
              return (
                <li key={event.id} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-3">
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.time} · {event.duration}
                      {project ? ` · ${project.name}` : ''}
                      {event.started ? ' · Started' : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {project ? (
                      <DeskLink href={`/projects/${project.id}`} className="text-xs underline">
                        Project
                      </DeskLink>
                    ) : null}
                    <button type="button" className="text-xs underline" onClick={() => desk.removeEvent(event.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
