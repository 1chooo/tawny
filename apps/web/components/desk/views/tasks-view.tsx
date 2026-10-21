'use client'

import { DeskLink } from '@/components/desk/desk-link'
import { EmptyNote } from '@/components/desk/empty-note'
import { useDesk } from '@/components/desk/desk-store'
import { PageHeading, primaryButton } from '@/components/desk/views/page-heading'
import {
  PRIORITY_LABEL,
  STATUS_LABEL,
  formatDue,
  matches,
  memberById,
  projectById,
  type TaskStatus,
} from '@/lib/desk/model'
import { cn } from '@tawny/ui/lib/utils'

const filters: { id: 'all' | TaskStatus; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'todo', label: 'To do' },
  { id: 'progress', label: 'In progress' },
  { id: 'done', label: 'Done' },
]

export function TasksView() {
  const desk = useDesk()
  const visible = desk.tasks.filter((task) => {
    if (desk.taskStatus !== 'all' && task.status !== desk.taskStatus) return false
    if (desk.taskProjectId !== 'all' && task.projectId !== desk.taskProjectId) return false
    const project = projectById(desk.projects, task.projectId)
    const owner = memberById(desk.members, task.assigneeId)
    return matches(desk.query, task.title, project?.name ?? '', owner?.name ?? '')
  })

  return (
    <div>
      <PageHeading
        title="Tasks"
        description="What is open, in progress, and done."
        actions={
          <button type="button" className={primaryButton} onClick={() => desk.openDialog('task')}>
            + Add task
          </button>
        }
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={desk.taskStatus === filter.id}
            onClick={() => desk.setTaskStatus(filter.id)}
            className={cn(
              'h-8 rounded-full border px-3 text-xs',
              desk.taskStatus === filter.id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-foreground hover:bg-muted',
            )}
          >
            {filter.label}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          Project
          <select
            className="h-8 rounded-lg border border-border bg-card px-2 text-sm text-foreground"
            value={desk.taskProjectId}
            onChange={(event) => desk.setTaskProjectId(event.target.value)}
          >
            <option value="all">All projects</option>
            {desk.projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {visible.length === 0 ? (
        <EmptyNote
          title="No tasks"
          body={desk.query ? `Nothing matches “${desk.query.trim()}”.` : 'Add a task or clear the filters.'}
        />
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          {visible.map((task) => {
            const project = projectById(desk.projects, task.projectId)
            const owner = memberById(desk.members, task.assigneeId)
            return (
              <li key={task.id} className="flex items-center gap-3 px-3 py-3">
                <select
                  aria-label={`Status for ${task.title}`}
                  className="h-8 rounded-lg border border-border bg-background px-2 text-xs"
                  value={task.status}
                  onChange={(event) => desk.updateTask(task.id, { status: event.target.value as TaskStatus })}
                >
                  <option value="todo">To do</option>
                  <option value="progress">In progress</option>
                  <option value="done">Done</option>
                </select>
                <DeskLink href={`/tasks/${task.id}`} className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{task.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {project?.name ?? 'No project'} · {owner?.name ?? 'Unassigned'} · {PRIORITY_LABEL[task.priority]} ·{' '}
                    {formatDue(task.due)}
                  </span>
                </DeskLink>
                <span className="hidden text-xs text-muted-foreground @sm:inline">{STATUS_LABEL[task.status]}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
