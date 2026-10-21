'use client'

import { WeekChart } from '@/components/desk/week-chart'
import { useDesk } from '@/components/desk/desk-store'
import { PageHeading } from '@/components/desk/views/page-heading'
import { STATUS_LABEL, endedShare, openTaskCount, type ProjectStatus } from '@/lib/desk/model'

export function AnalyticsView() {
  const { projects, tasks } = useDesk()
  const total = projects.length || 1
  const rows: { id: ProjectStatus; count: number }[] = [
    { id: 'running', count: projects.filter((project) => project.status === 'running').length },
    { id: 'ended', count: projects.filter((project) => project.status === 'ended').length },
    { id: 'pending', count: projects.filter((project) => project.status === 'pending').length },
  ]
  const done = tasks.filter((task) => task.status === 'done').length

  return (
    <div className="space-y-4">
      <PageHeading
        title="Analytics"
        description="Counts follow the projects and tasks in this session. The week chart is sample hours."
      />
      <div className="grid grid-cols-1 gap-3 @md:grid-cols-3">
        <article className="rounded-lg border border-primary bg-primary p-4 text-primary-foreground">
          <p className="text-xs">Open tasks</p>
          <p className="desk-num mt-2 text-4xl">{openTaskCount(tasks)}</p>
        </article>
        <article className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Tasks done</p>
          <p className="desk-num mt-2 text-4xl">{done}</p>
        </article>
        <article className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Projects ended</p>
          <p className="desk-num mt-2 text-4xl">{endedShare(projects)}%</p>
        </article>
      </div>
      <section className="rounded-lg border border-border bg-card p-4">
        <h2 className="mb-4 font-medium">Projects by status</h2>
        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">Add or import a project to fill this chart.</p>
        ) : (
          <ul className="space-y-3">
            {rows.map((row) => (
              <li key={row.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{STATUS_LABEL[row.id]}</span>
                  <span className="text-muted-foreground">{row.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={row.id === 'ended' ? 'h-full bg-tawny' : 'h-full bg-foreground'}
                    style={{ width: `${Math.round((row.count / total) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <WeekChart />
    </div>
  )
}
