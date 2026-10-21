'use client'

import { useEffect, useRef, useState } from 'react'
import { Bell, Mail, Menu, Search } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Sidebar } from '@/components/desk/sidebar'
import { EventForm, ImportDialog, MemberForm, ProjectForm, TaskForm } from '@/components/desk/desk-forms'
import { DeskLink } from '@/components/desk/desk-link'
import { useDesk } from '@/components/desk/desk-store'
import { initials, matches, projectById } from '@/lib/desk/model'
import { deskHref } from '@/lib/desk/routing'
import type { ReactNode } from 'react'

export function DeskAppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const desk = useDesk()
  const [menuOpen, setMenuOpen] = useState(false)
  const [panel, setPanel] = useState<'mail' | 'bell' | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'f') return
      if (!rootRef.current || rootRef.current.closest('[inert]')) return
      event.preventDefault()
      searchRef.current?.focus()
      setSearchOpen(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const query = desk.query.trim()
  const projectHits = query
    ? desk.projects.filter((project) => matches(query, project.name, project.summary)).slice(0, 4)
    : []
  const taskHits = query
    ? desk.tasks.filter((task) => matches(query, task.title)).slice(0, 4)
    : []
  const peopleHits = query
    ? desk.members.filter((member) => matches(query, member.name, member.role, member.email)).slice(0, 4)
    : []
  const showSearch = searchOpen && query.length > 0
  const unreadMail = desk.notices.some((notice) => notice.kind === 'mail' && !notice.read)
  const unreadBell = desk.notices.some((notice) => notice.kind === 'bell' && !notice.read)
  const profileInitials = initials(desk.profile.name)

  function go(path: string) {
    setSearchOpen(false)
    desk.setQuery('')
    router.push(deskHref(pathname, path))
  }

  return (
    <div ref={rootRef} className="@container relative flex min-h-0 flex-1 bg-background text-foreground">
      {menuOpen ? (
        <button
          type="button"
          className="absolute inset-0 z-10 bg-foreground/20 @lg:hidden"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="min-w-0 flex-1 overflow-y-auto p-3 @md:p-4 @lg:p-5">
        {desk.flash ? (
          <p
            role="status"
            className={
              desk.flash.tone === 'err'
                ? 'mb-3 rounded-lg border border-tawny bg-card px-3 py-2 text-sm'
                : 'mb-3 flex items-center justify-between gap-3 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground'
            }
          >
            <span>{desk.flash.text}</span>
            <button type="button" className="text-xs underline" onClick={desk.dismissFlash}>
              Dismiss
            </button>
          </p>
        ) : null}

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 text-foreground hover:bg-muted @lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
            <div className="relative min-w-0 max-w-md flex-1">
              <label className="relative block">
                <span className="sr-only">Search the desk</span>
                <Search
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  ref={searchRef}
                  type="search"
                  value={desk.query}
                  placeholder="Search the desk"
                  onChange={(event) => {
                    desk.setQuery(event.target.value)
                    setSearchOpen(true)
                  }}
                  onFocus={() => setSearchOpen(true)}
                  className="h-9 w-full rounded-lg border border-border bg-card pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground @md:pr-14"
                />
                <kbd className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground @md:inline">
                  ⌘F
                </kbd>
              </label>
              {showSearch ? (
                <div className="absolute top-11 z-20 w-full rounded-lg border border-border bg-card p-2 text-sm shadow-sm">
                  {projectHits.length + taskHits.length + peopleHits.length === 0 ? (
                    <p className="px-2 py-3 text-muted-foreground">No matches for “{query}”.</p>
                  ) : (
                    <div className="space-y-2">
                      {projectHits.length > 0 ? (
                        <SearchGroup label="Projects">
                          {projectHits.map((project) => (
                            <button key={project.id} type="button" className="block w-full rounded-md px-2 py-1.5 text-left hover:bg-muted" onClick={() => go(`/projects/${project.id}`)}>
                              {project.name}
                            </button>
                          ))}
                        </SearchGroup>
                      ) : null}
                      {taskHits.length > 0 ? (
                        <SearchGroup label="Tasks">
                          {taskHits.map((task) => (
                            <button key={task.id} type="button" className="block w-full rounded-md px-2 py-1.5 text-left hover:bg-muted" onClick={() => go(`/tasks/${task.id}`)}>
                              {task.title}
                              <span className="ml-2 text-xs text-muted-foreground">
                                {projectById(desk.projects, task.projectId)?.name}
                              </span>
                            </button>
                          ))}
                        </SearchGroup>
                      ) : null}
                      {peopleHits.length > 0 ? (
                        <SearchGroup label="Team">
                          {peopleHits.map((member) => (
                            <button key={member.id} type="button" className="block w-full rounded-md px-2 py-1.5 text-left hover:bg-muted" onClick={() => go(`/team/${member.id}`)}>
                              {member.name}
                            </button>
                          ))}
                        </SearchGroup>
                      ) : null}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-1.5 @md:gap-2">
            <button
              type="button"
              className="relative rounded-lg p-2 text-foreground hover:bg-muted"
              aria-label="Mail"
              aria-expanded={panel === 'mail'}
              onClick={() => setPanel((current) => (current === 'mail' ? null : 'mail'))}
            >
              <Mail className="size-4" aria-hidden="true" />
              {unreadMail && desk.profile.mailAlerts ? (
                <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-tawny" />
              ) : null}
            </button>
            <button
              type="button"
              className="relative rounded-lg p-2 text-foreground hover:bg-muted"
              aria-label="Notifications"
              aria-expanded={panel === 'bell'}
              onClick={() => setPanel((current) => (current === 'bell' ? null : 'bell'))}
            >
              <Bell className="size-4" aria-hidden="true" />
              {unreadBell && desk.profile.bellAlerts ? (
                <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-tawny" />
              ) : null}
            </button>
            <DeskLink href="/settings" className="flex items-center gap-2 border-l border-border pl-2 @md:pl-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-[11px] font-medium text-primary-foreground">
                {profileInitials}
              </span>
              <span className="hidden text-xs @sm:block">
                <span className="block font-medium">{desk.profile.name}</span>
                <span className="block text-[10px] text-muted-foreground">{desk.profile.email}</span>
              </span>
            </DeskLink>
          </div>
        </div>

        {panel ? (
          <NoticePanel
            kind={panel}
            onClose={() => setPanel(null)}
          />
        ) : null}

        {desk.signedIn ? children : <SignedOut />}
      </main>

      {desk.dialog === 'project' ? <ProjectForm /> : null}
      {desk.dialog === 'import' ? <ImportDialog /> : null}
      {desk.dialog === 'member' ? <MemberForm /> : null}
      {desk.dialog === 'task' ? <TaskForm /> : null}
      {desk.dialog === 'event' ? <EventForm /> : null}
    </div>
  )
}

function SearchGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="px-2 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">{label}</p>
      {children}
    </div>
  )
}

function NoticePanel({ kind, onClose }: { kind: 'mail' | 'bell'; onClose: () => void }) {
  const { notices, markNotice, markKindRead } = useDesk()
  const items = notices.filter((notice) => notice.kind === kind)
  return (
    <section className="mb-4 rounded-lg border border-border bg-card p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium">{kind === 'mail' ? 'Mail' : 'Notifications'}</h2>
        <div className="flex gap-3 text-xs">
          <button type="button" className="underline" onClick={() => markKindRead(kind)}>
            Mark read
          </button>
          <button type="button" className="underline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing here.</p>
      ) : (
        <ul className="space-y-1">
          {items.map((notice) => (
            <li key={notice.id}>
              <button
                type="button"
                onClick={() => markNotice(notice.id)}
                className="flex w-full items-start justify-between gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-muted"
              >
                <span>{notice.text}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{notice.read ? 'Read' : 'New'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function SignedOut() {
  const { signIn, profile } = useDesk()
  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border border-border bg-card p-6 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Signed out</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {profile.name} is signed out of this demo. Projects and tasks are still in the tab.
      </p>
      <button
        type="button"
        onClick={signIn}
        className="mt-5 h-9 rounded-lg bg-primary px-3 text-sm text-primary-foreground"
      >
        Sign back in
      </button>
    </div>
  )
}
