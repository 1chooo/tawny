'use client'

import { Plus } from 'lucide-react'
import { cn } from '@tawny/ui/lib/utils'
import { DeskLink } from '@/components/desk/desk-link'
import { EmptyNote } from '@/components/desk/empty-note'
import { useDesk } from '@/components/desk/desk-store'
import { formatDue, matches, memberById, projectMark, toneForStatus } from '@/lib/desk/model'
import { Panel } from '@/components/desk/panel'

const toneClass = {
  ink: 'bg-primary text-primary-foreground',
  tawny: 'bg-tawny text-tawny-foreground',
  stone: 'bg-muted text-foreground',
}

export function ProjectList() {
  const { projects, members, query, projectStatus, openDialog } = useDesk()
  const visible = projects.filter((project) => {
    if (projectStatus !== 'all' && project.status !== projectStatus) return false
    const owner = memberById(members, project.ownerId)
    return matches(query, project.name, project.summary, owner?.name ?? '')
  })

  return (
    <Panel>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
        <button
          type="button"
          onClick={() => openDialog('project')}
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-border px-2.5 text-xs text-foreground hover:bg-muted"
        >
          <Plus className="size-3.5" aria-hidden="true" />
          New
        </button>
      </div>
      {visible.length === 0 ? (
        <EmptyNote
          title="No projects"
          body={query ? `Nothing matches “${query.trim()}”.` : 'Add a project or import a CSV.'}
        />
      ) : (
        <ul className="space-y-1">
          {visible.map((project) => (
            <li key={project.id}>
              <DeskLink
                href={`/projects/${project.id}`}
                className="flex items-center gap-3 rounded-lg px-1 py-2 hover:bg-muted"
              >
                <span
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-medium',
                    toneClass[toneForStatus(project.status)],
                  )}
                >
                  {projectMark(project.name)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{project.name}</span>
                  <span className="block text-xs text-muted-foreground">Due {formatDue(project.due)}</span>
                </span>
              </DeskLink>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}
