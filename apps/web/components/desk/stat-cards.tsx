'use client'

import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@tawny/ui/lib/utils'
import { useDesk } from '@/components/desk/desk-store'
import { projectStats, type ProjectStatus } from '@/lib/desk/model'
import { deskHref } from '@/lib/desk/routing'

export function StatCards() {
  const { projects, setProjectStatus, projectStatus } = useDesk()
  const pathname = usePathname()
  const router = useRouter()
  const stats = projectStats(projects)

  function select(id: string) {
    const next = id === 'total' ? 'all' : (id as ProjectStatus)
    setProjectStatus(projectStatus === next ? 'all' : next)
    router.push(deskHref(pathname, '/'))
  }

  return (
    <div className="grid grid-cols-1 gap-3 @sm:grid-cols-2 @lg:grid-cols-4">
      {stats.map((stat) => {
        const selected = (stat.id === 'total' ? 'all' : stat.id) === projectStatus && projectStatus !== 'all'
          ? stat.id !== 'total'
          : stat.id === 'total' && projectStatus === 'all'
        return (
          <button
            key={stat.id}
            type="button"
            onClick={() => select(stat.id)}
            aria-pressed={stat.id === 'total' ? projectStatus === 'all' : projectStatus === stat.id}
            className={cn(
              'flex flex-col gap-3 rounded-lg border p-4 text-left',
              stat.ink
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground',
              selected && !stat.ink ? 'ring-2 ring-foreground' : '',
            )}
          >
            <span className="flex items-start justify-between gap-3">
              <span className="text-xs font-medium">{stat.label}</span>
              <span
                className={cn(
                  'flex size-6 items-center justify-center rounded-full',
                  stat.ink ? 'bg-primary-foreground/15 text-primary-foreground' : 'bg-primary text-primary-foreground',
                )}
              >
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </span>
            <span className="desk-num text-4xl leading-none tracking-tight">{stat.value}</span>
            <span
              className={cn(
                'flex items-center gap-1.5 text-xs',
                stat.ink ? 'text-primary-foreground/75' : 'text-muted-foreground',
              )}
            >
              {stat.id === 'pending' ? null : <TrendingUp className="size-3 shrink-0" aria-hidden="true" />}
              <span>{stat.note}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
