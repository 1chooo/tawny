'use client'

import { cn } from '@tawny/ui/lib/utils'
import {
  Calendar,
  ChartColumn,
  CircleQuestionMark,
  LayoutDashboard,
  LogOut,
  Settings,
  SquareCheck,
  Users,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { DeskLink } from '@/components/desk-link'
import { useDesk } from '@/components/desk-store'
import { formatDue, openTaskCount, projectMark, toneForStatus } from '@/lib/model'
import { deskSection, type DeskSection } from '@/lib/routing'

const toneClass = {
  ink: 'bg-primary text-primary-foreground',
  tawny: 'bg-tawny text-tawny-foreground',
  stone: 'bg-muted text-foreground',
}

const MENU: { id: DeskSection; label: string; icon: LucideIcon; href: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { id: 'tasks', label: 'Tasks', icon: SquareCheck, href: '/tasks' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, href: '/calendar' },
  { id: 'analytics', label: 'Analytics', icon: ChartColumn, href: '/analytics' },
  { id: 'team', label: 'Team', icon: Users, href: '/team' },
]

const GENERAL: { id: DeskSection; label: string; icon: LucideIcon; href: string }[] = [
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  { id: 'help', label: 'Help', icon: CircleQuestionMark, href: '/help' },
  { id: 'logout', label: 'Logout', icon: LogOut, href: '/logout' },
]

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const section = deskSection(pathname)
  const { tasks, projects } = useDesk()
  const openTasks = openTaskCount(tasks)

  return (
    <aside
      className={cn(
        'absolute inset-y-0 left-0 z-20 flex w-64 shrink-0 flex-col border-r border-border bg-card',
        '@lg:static',
        open ? 'flex' : 'hidden',
        '@lg:flex',
      )}
    >
      <div className="flex items-center justify-between gap-2 p-4 pb-2">
        <DeskLink href="/" className="flex items-center gap-2" onClick={onClose}>
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="desk-serif text-lg leading-none">D</span>
          </span>
          <span className="text-lg font-semibold tracking-tight">Desk</span>
        </DeskLink>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground @lg:hidden"
          aria-label="Close menu"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 pb-4">
        <nav aria-label="Menu" className="space-y-1">
          <p className="px-2.5 pb-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            Menu
          </p>
          {MENU.map((item) => {
            const current = section === item.id
            const Icon = item.icon
            return (
              <DeskLink
                key={item.id}
                href={item.href}
                onClick={onClose}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm',
                  current
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
                {item.id === 'tasks' ? (
                  <span
                    className={cn(
                      'ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                      current
                        ? 'bg-primary-foreground/15 text-primary-foreground'
                        : 'bg-tawny text-tawny-foreground',
                    )}
                  >
                    {openTasks}
                  </span>
                ) : null}
              </DeskLink>
            )
          })}
        </nav>

        <div>
          <p className="px-2.5 pb-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            Projects
          </p>
          {projects.length === 0 ? (
            <p className="px-2.5 py-2 text-xs text-muted-foreground">No projects yet.</p>
          ) : (
            <ul className="space-y-0.5">
              {projects.slice(0, 6).map((project) => (
                <li key={project.id}>
                  <DeskLink
                    href={`/projects/${project.id}`}
                    onClick={onClose}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-foreground hover:bg-muted"
                  >
                    <span
                      className={cn(
                        'flex size-6 shrink-0 items-center justify-center rounded-md text-[11px] font-medium',
                        toneClass[toneForStatus(project.status)],
                      )}
                    >
                      {projectMark(project.name)}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{project.name}</span>
                    <span className="text-[10px] text-muted-foreground">{formatDue(project.due)}</span>
                  </DeskLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="General" className="space-y-1">
          <p className="px-2.5 pb-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            General
          </p>
          {GENERAL.map((item) => {
            const current = section === item.id
            const Icon = item.icon
            return (
              <DeskLink
                key={item.id}
                href={item.href}
                onClick={onClose}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm',
                  current
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </DeskLink>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
