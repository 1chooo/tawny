'use client'

import { DeskLink } from '@/components/desk-link'
import { EmptyNote } from '@/components/empty-note'
import { useDesk } from '@/components/desk-store'
import { PageHeading, primaryButton } from '@/components/views/page-heading'
import { focusFor, matches } from '@/lib/model'

export function TeamView() {
  const desk = useDesk()
  const visible = desk.members.filter((member) => matches(desk.query, member.name, member.role, member.email))

  return (
    <div>
      <PageHeading
        title="Team"
        description="Who is carrying which project."
        actions={
          <button type="button" className={primaryButton} onClick={() => desk.openDialog('member')}>
            + Add member
          </button>
        }
      />
      {visible.length === 0 ? (
        <EmptyNote title="No teammates" body="Add a member to the desk." />
      ) : (
        <ul className="grid grid-cols-1 gap-3 @md:grid-cols-2">
          {visible.map((member) => {
            const focus = focusFor(member.id, desk.tasks, desk.projects)
            const count = desk.tasks.filter((task) => task.assigneeId === member.id && task.status !== 'done').length
            return (
              <li key={member.id}>
                <DeskLink href={`/team/${member.id}`} className="block rounded-lg border border-border bg-card p-4 hover:bg-muted">
                  <span className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-xs text-primary-foreground">
                      {member.initials}
                    </span>
                    <span>
                      <span className="block font-medium">{member.name}</span>
                      <span className="block text-xs text-muted-foreground">{member.role}</span>
                    </span>
                  </span>
                  <span className="mt-3 block text-sm text-muted-foreground">
                    {focus.label} · {count} open
                  </span>
                </DeskLink>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
