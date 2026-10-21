'use client'

import { Plus } from 'lucide-react'
import { cn } from '@tawny/ui/lib/utils'
import { DeskLink } from '@/components/desk/desk-link'
import { EmptyNote } from '@/components/desk/empty-note'
import { useDesk } from '@/components/desk/desk-store'
import { STATUS_LABEL, focusFor, matches } from '@/lib/desk/model'
import { Panel } from '@/components/desk/panel'

const statusClass = {
  done: 'bg-tawny/20 text-foreground',
  progress: 'bg-muted text-foreground',
  pending: 'border border-border text-muted-foreground',
}

export function Team() {
  const { members, tasks, projects, query, openDialog } = useDesk()
  const visible = members.filter((member) => matches(query, member.name, member.role, member.email))

  return (
    <Panel>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">Team</h2>
        <button
          type="button"
          onClick={() => openDialog('member')}
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-border px-2.5 text-xs text-foreground hover:bg-muted"
        >
          <Plus className="size-3.5" aria-hidden="true" />
          Add member
        </button>
      </div>
      {visible.length === 0 ? (
        <EmptyNote title="No teammates" body={query ? `Nothing matches “${query.trim()}”.` : 'Add someone to the desk.'} />
      ) : (
        <ul className="space-y-2">
          {visible.map((member) => {
            const focus = focusFor(member.id, tasks, projects)
            return (
              <li key={member.id}>
                <DeskLink href={`/team/${member.id}`} className="flex items-center gap-3 rounded-lg px-1 py-2 hover:bg-muted">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-medium text-primary-foreground">
                    {member.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{member.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      Working on <span className="text-foreground">{focus.label}</span>
                    </span>
                  </span>
                  <span className={cn('shrink-0 rounded-full px-2.5 py-1 text-xs', statusClass[focus.status])}>
                    {STATUS_LABEL[focus.status]}
                  </span>
                </DeskLink>
              </li>
            )
          })}
        </ul>
      )}
    </Panel>
  )
}
