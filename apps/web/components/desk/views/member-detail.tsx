'use client'

import { useState } from 'react'
import { fieldClass } from '@/components/desk/desk-dialog'
import { DeskLink } from '@/components/desk/desk-link'
import { EmptyNote } from '@/components/desk/empty-note'
import { useDesk } from '@/components/desk/desk-store'
import { PageHeading, primaryButton } from '@/components/desk/views/page-heading'
import { STATUS_LABEL, formatDue } from '@/lib/desk/model'

export function MemberDetail({ id }: { id: string }) {
  const desk = useDesk()
  const member = desk.members.find((item) => item.id === id)
  const [name, setName] = useState(member?.name ?? '')
  const [email, setEmail] = useState(member?.email ?? '')
  const [role, setRole] = useState(member?.role ?? '')
  const tasks = desk.tasks.filter((task) => task.assigneeId === id)

  if (!member) {
    return <EmptyNote title="Teammate not found" body="They are not on this desk." />
  }

  return (
    <div className="space-y-4">
      <PageHeading title={member.name} description={member.email} />
      <form
        className="max-w-xl space-y-3 rounded-lg border border-border bg-card p-4"
        onSubmit={(event) => {
          event.preventDefault()
          if (!name.trim() || !email.includes('@')) return
          desk.updateMember(member.id, { name: name.trim(), email: email.trim(), role: role.trim() })
        }}
      >
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Name</span>
          <input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Email</span>
          <input className={fieldClass} value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Role</span>
          <input className={fieldClass} value={role} onChange={(event) => setRole(event.target.value)} />
        </label>
        <button type="submit" className={primaryButton}>Save teammate</button>
      </form>
      <section className="rounded-lg border border-border bg-card p-4">
        <h2 className="mb-3 font-medium">Assigned tasks</h2>
        {tasks.length === 0 ? (
          <EmptyNote title="No tasks" body="Assign a task from the task page." />
        ) : (
          <ul className="space-y-2 text-sm">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between gap-3">
                <DeskLink href={`/tasks/${task.id}`} className="truncate font-medium hover:underline">
                  {task.title}
                </DeskLink>
                <span className="text-xs text-muted-foreground">
                  {STATUS_LABEL[task.status]} · {formatDue(task.due)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
