'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { DeskLink } from '@/components/desk/desk-link'
import { fieldClass } from '@/components/desk/desk-dialog'
import { EmptyNote } from '@/components/desk/empty-note'
import { useDesk } from '@/components/desk/desk-store'
import { PageHeading, primaryButton, quietButton } from '@/components/desk/views/page-heading'
import { STATUS_LABEL, formatDue, type ProjectStatus, type TaskStatus } from '@/lib/desk/model'
import { deskHref } from '@/lib/desk/routing'

export function ProjectDetail({ id }: { id: string }) {
  const desk = useDesk()
  const router = useRouter()
  const pathname = usePathname()
  const project = desk.projects.find((item) => item.id === id)
  const [name, setName] = useState(project?.name ?? '')
  const [summary, setSummary] = useState(project?.summary ?? '')
  const [due, setDue] = useState(project?.due ?? '')
  const [status, setStatus] = useState<ProjectStatus>(project?.status ?? 'running')
  const [ownerId, setOwnerId] = useState(project?.ownerId ?? '')
  const related = desk.tasks.filter((task) => task.projectId === id)

  if (!project) {
    return <EmptyNote title="Project not found" body="It may have been removed in this session." />
  }

  return (
    <div className="space-y-4">
      <PageHeading title={project.name} description="Edit the project. Related tasks stay attached." />
      <form
        className="max-w-xl space-y-3 rounded-lg border border-border bg-card p-4"
        onSubmit={(event) => {
          event.preventDefault()
          if (!name.trim()) return
          desk.updateProject(project.id, { name: name.trim(), summary: summary.trim(), due, status, ownerId })
        }}
      >
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Name</span>
          <input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Summary</span>
          <textarea className={`${fieldClass} h-20 py-2`} value={summary} onChange={(event) => setSummary(event.target.value)} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Due</span>
            <input className={fieldClass} type="date" value={due} onChange={(event) => setDue(event.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Status</span>
            <select className={fieldClass} value={status} onChange={(event) => setStatus(event.target.value as ProjectStatus)}>
              <option value="running">Running</option>
              <option value="pending">Pending</option>
              <option value="ended">Ended</option>
            </select>
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Owner</span>
          <select className={fieldClass} value={ownerId} onChange={(event) => setOwnerId(event.target.value)}>
            {desk.members.map((member) => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap gap-2 pt-2">
          <button type="submit" className={primaryButton}>Save project</button>
          <button
            type="button"
            className={quietButton}
            onClick={() => {
              desk.removeProject(project.id)
              router.push(deskHref(pathname, '/'))
            }}
          >
            Delete
          </button>
        </div>
      </form>
      <section className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-medium">Tasks</h2>
          <button type="button" className={quietButton} onClick={() => desk.openDialog('task')}>
            Add task
          </button>
        </div>
        {related.length === 0 ? (
          <EmptyNote title="No tasks on this project" body="Add one and it will land in the task list." />
        ) : (
          <ul className="space-y-2">
            {related.map((task) => (
              <li key={task.id} className="flex items-center justify-between gap-3 text-sm">
                <DeskLink href={`/tasks/${task.id}`} className="min-w-0 truncate font-medium hover:underline">
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
