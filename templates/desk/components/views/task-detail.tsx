'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { DeskLink } from '@/components/desk-link'
import { fieldClass } from '@/components/desk-dialog'
import { DeskSelect, PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from '@/components/desk-select'
import { EmptyNote } from '@/components/empty-note'
import { useDesk } from '@/components/desk-store'
import { PageHeading, primaryButton, quietButton } from '@/components/views/page-heading'
import { type Priority, type TaskStatus } from '@/lib/model'
import { deskHref } from '@/lib/routing'

export function TaskDetail({ id }: { id: string }) {
  const desk = useDesk()
  const router = useRouter()
  const pathname = usePathname()
  const task = desk.tasks.find((item) => item.id === id)
  const [title, setTitle] = useState(task?.title ?? '')
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'todo')
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'medium')
  const [due, setDue] = useState(task?.due ?? '')
  const [projectId, setProjectId] = useState(task?.projectId ?? '')
  const [assigneeId, setAssigneeId] = useState(task?.assigneeId ?? '')

  if (!task) {
    return <EmptyNote title="Task not found" body="It may have been removed in this session." />
  }

  return (
    <div>
      <PageHeading title={task.title} description="Edit the task, then save." />
      <form
        className="max-w-xl space-y-3 rounded-lg border border-border bg-card p-4"
        onSubmit={(event) => {
          event.preventDefault()
          if (!title.trim()) return
          desk.updateTask(task.id, { title: title.trim(), status, priority, due, projectId, assigneeId })
        }}
      >
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Title</span>
          <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Project</span>
          <DeskSelect
            ariaLabel="Project"
            value={projectId}
            options={desk.projects.map((project) => ({ value: project.id, label: project.name }))}
            onChange={setProjectId}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Status</span>
            <DeskSelect
              ariaLabel="Status"
              value={status}
              options={TASK_STATUS_OPTIONS}
              onChange={(next) => setStatus(next as TaskStatus)}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Priority</span>
            <DeskSelect
              ariaLabel="Priority"
              value={priority}
              options={PRIORITY_OPTIONS}
              onChange={(next) => setPriority(next as Priority)}
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Assignee</span>
          <DeskSelect
            ariaLabel="Assignee"
            value={assigneeId}
            options={desk.members.map((member) => ({ value: member.id, label: member.name }))}
            onChange={setAssigneeId}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Due</span>
          <input className={fieldClass} type="date" value={due} onChange={(event) => setDue(event.target.value)} />
        </label>
        <div className="flex flex-wrap gap-2 pt-2">
          <button type="submit" className={primaryButton}>Save task</button>
          <button
            type="button"
            className={quietButton}
            onClick={() => {
              desk.removeTask(task.id)
              router.push(deskHref(pathname, '/tasks'))
            }}
          >
            Delete
          </button>
          <DeskLink href="/tasks" className={`${quietButton} inline-flex items-center`}>
            Back to tasks
          </DeskLink>
        </div>
      </form>
    </div>
  )
}
