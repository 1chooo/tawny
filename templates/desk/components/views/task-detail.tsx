'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { DeskLink } from '@/components/desk-link'
import { fieldClass } from '@/components/desk-dialog'
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
          <select className={fieldClass} value={projectId} onChange={(event) => setProjectId(event.target.value)}>
            {desk.projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Status</span>
            <select className={fieldClass} value={status} onChange={(event) => setStatus(event.target.value as TaskStatus)}>
              <option value="todo">To do</option>
              <option value="progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Priority</span>
            <select className={fieldClass} value={priority} onChange={(event) => setPriority(event.target.value as Priority)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Assignee</span>
          <select className={fieldClass} value={assigneeId} onChange={(event) => setAssigneeId(event.target.value)}>
            {desk.members.map((member) => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
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
