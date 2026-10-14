'use client'

import { useMemo, useState } from 'react'
import { Bell } from 'lucide-react'

type Status = 'todo' | 'progress' | 'done'
type View = 'inbox' | 'mine' | 'issues' | 'backlog'

type Issue = {
  id: string
  title: string
  status: Status
  label: string
  assignee: string
  date: string
  inbox?: boolean
}

const STARTER: Issue[] = [
  { id: 'NOR-140', title: 'Fix focus ring on command palette', status: 'progress', label: 'Bug', assignee: 'SC', date: 'Sep 1', inbox: true },
  { id: 'NOR-141', title: 'Migrate billing webhooks to v2', status: 'progress', label: 'Infra', assignee: 'MK', date: 'Sep 1', inbox: true },
  { id: 'NOR-142', title: 'Empty state for archived projects', status: 'todo', label: 'Design', assignee: 'JR', date: 'Sep 2' },
  { id: 'NOR-143', title: 'Keyboard shortcut cheat sheet', status: 'todo', label: 'Feature', assignee: 'AL', date: 'Sep 2' },
  { id: 'NOR-144', title: 'Onboarding checklist drop-off', status: 'progress', label: 'Design', assignee: 'TP', date: 'Sep 3' },
  { id: 'NOR-145', title: 'Rate limit on search endpoint', status: 'todo', label: 'Infra', assignee: 'MK', date: 'Sep 3' },
  { id: 'NOR-146', title: 'Dark mode contrast on badges', status: 'done', label: 'Bug', assignee: 'SC', date: 'Sep 4' },
  { id: 'NOR-147', title: 'Bulk edit for labels', status: 'todo', label: 'Feature', assignee: 'AL', date: 'Sep 4' },
  { id: 'NOR-148', title: 'Sidebar collapse animation jank', status: 'progress', label: 'Bug', assignee: 'JR', date: 'Sep 5', inbox: true },
  { id: 'NOR-149', title: 'Export issues to CSV', status: 'todo', label: 'Feature', assignee: 'TP', date: 'Sep 5' },
  { id: 'NOR-150', title: 'Retry failed webhook deliveries', status: 'done', label: 'Infra', assignee: 'MK', date: 'Sep 6' },
  { id: 'NOR-151', title: 'Mobile row height too tall', status: 'todo', label: 'Bug', assignee: 'SC', date: 'Sep 6' },
  { id: 'NOR-152', title: 'Snooze notifications', status: 'todo', label: 'Feature', assignee: 'AL', date: 'Sep 7' },
  { id: 'NOR-153', title: 'Cycle burndown rounding bug', status: 'done', label: 'Bug', assignee: 'JR', date: 'Sep 7' },
]

const VIEWS: { id: View; label: string }[] = [
  { id: 'inbox', label: 'Inbox' },
  { id: 'mine', label: 'My issues' },
  { id: 'issues', label: 'Issues' },
  { id: 'backlog', label: 'Backlog' },
]

const STATUSES: { id: Status; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'progress', label: 'In progress' },
  { id: 'done', label: 'Done' },
]

type Notice = { id: string; text: string; read: boolean }

const STARTER_NOTICES: Notice[] = [
  { id: 'mention', text: 'MK mentioned you on NOR-141', read: false },
  { id: 'done', text: 'NOR-146 moved to Done', read: false },
]

const ME = 'SC'

function nextId(issues: Issue[]) {
  const max = issues.reduce((n, issue) => {
    const value = Number(issue.id.replace('NOR-', ''))
    return Number.isFinite(value) ? Math.max(n, value) : n
  }, 140)
  return `NOR-${max + 1}`
}

function StatusIcon({ status }: { status: Status }) {
  const color = 'var(--muted-foreground)'
  if (status === 'done') {
    return (
      <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M5 8.2 7.1 10.2 11 6.1" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (status === 'progress') {
    return (
      <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M8 2.2a5.8 5.8 0 0 1 0 11.6Z" fill={color} />
      </svg>
    )
  }
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-foreground/5 px-1 text-[10px] leading-none text-muted-foreground">
      {children}
    </kbd>
  )
}

export function BoardDashboard() {
  const [issues, setIssues] = useState<Issue[]>(STARTER)
  const [view, setView] = useState<View>('issues')
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')
  const [display, setDisplay] = useState<'list' | 'board'>('list')
  const [selectedId, setSelectedId] = useState<string | null>('NOR-142')
  const [sidebar, setSidebar] = useState(true)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [paletteQuery, setPaletteQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [displayOpen, setDisplayOpen] = useState(false)
  const [bellOpen, setBellOpen] = useState(false)
  const [notices, setNotices] = useState(STARTER_NOTICES)
  const [creating, setCreating] = useState(false)
  const [statusMenu, setStatusMenu] = useState(false)
  const [draft, setDraft] = useState('')

  const visible = useMemo(() => {
    return issues.filter((issue) => {
      if (view === 'inbox' && !issue.inbox) return false
      if (view === 'mine' && issue.assignee !== ME) return false
      if (view === 'issues' && issue.status === 'done') return false
      if (view === 'backlog' && issue.status !== 'todo') return false
      if (statusFilter !== 'all' && issue.status !== statusFilter) return false
      if (query.trim() && !`${issue.title} ${issue.id}`.toLowerCase().includes(query.trim().toLowerCase())) {
        return false
      }
      return true
    })
  }, [issues, view, statusFilter, query])

  const selected = issues.find((issue) => issue.id === selectedId) ?? null
  const unread = notices.filter((notice) => !notice.read).length

  function markNoticeRead(id: string) {
    setNotices((current) =>
      current.map((notice) => (notice.id === id ? { ...notice, read: true } : notice)),
    )
  }

  function updateSelected(patch: Partial<Issue>) {
    if (!selectedId) return
    setIssues((current) =>
      current.map((issue) => (issue.id === selectedId ? { ...issue, ...patch } : issue)),
    )
  }

  function createIssue() {
    const title = draft.trim()
    if (!title) return
    const issue: Issue = {
      id: nextId(issues),
      title,
      status: 'todo',
      label: 'Feature',
      assignee: ME,
      date: 'Oct 14',
    }
    setIssues((current) => [issue, ...current])
    setSelectedId(issue.id)
    setDraft('')
    setCreating(false)
    setPaletteOpen(false)
    setView('issues')
    setStatusFilter('all')
  }

  function runCommand(name: string) {
    if (name === 'Create issue') {
      setCreating(true)
      setPaletteOpen(false)
      return
    }
    if (name === 'Assign to me') {
      updateSelected({ assignee: ME })
      setPaletteOpen(false)
      return
    }
    if (name === 'Search') {
      setPaletteOpen(false)
      return
    }
    if (name === 'Toggle sidebar') {
      setSidebar((open) => !open)
      setPaletteOpen(false)
    }
  }

  const commands = [
    { name: 'Create issue', shortcut: 'C' },
    { name: 'Assign to me', shortcut: 'I' },
    { name: 'Search', shortcut: '/' },
    { name: 'Toggle sidebar', shortcut: '⌘B' },
  ].filter((command) =>
    command.name.toLowerCase().includes(paletteQuery.trim().toLowerCase()),
  )

  return (
    <div
      className="flex h-full min-h-144 bg-background text-[13px] text-foreground"
      onKeyDown={(event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
          event.preventDefault()
          setPaletteQuery('')
          setPaletteOpen((open) => !open)
        }
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'b') {
          event.preventDefault()
          setSidebar((open) => !open)
        }
        if (event.key === 'Escape') {
          setPaletteOpen(false)
          setFilterOpen(false)
          setDisplayOpen(false)
          setBellOpen(false)
          setStatusMenu(false)
          setCreating(false)
        }
      }}
    >
      {sidebar ? (
        <aside className="flex w-44 shrink-0 flex-col border-r border-border">
          <div className="flex items-center gap-2 px-3 py-3">
            <span className="flex size-5 items-center justify-center rounded bg-foreground/8 text-[10px] font-semibold">N</span>
            <span className="truncate text-xs">Northstar</span>
          </div>
          <nav className="flex flex-col gap-0.5 px-2">
            {VIEWS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={
                  view === item.id
                    ? 'rounded-md bg-accent px-2 py-1 text-left text-foreground'
                    : 'rounded-md px-2 py-1 text-left text-muted-foreground hover:bg-accent/60'
                }
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-2 px-3 py-3 text-[11px] text-muted-foreground">
            <span className="flex size-5 items-center justify-center rounded-full bg-foreground/8 text-[9px] text-foreground">SC</span>
            Sarah Chen
          </div>
        </aside>
      ) : null}

      <div className="relative flex min-w-0 flex-1 flex-col bg-card">
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
          <div className="flex items-center gap-2">
            {VIEWS.find((item) => item.id === view)?.label}
            <span className="rounded bg-foreground/8 px-1.5 text-[11px] text-muted-foreground">{visible.length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-expanded={paletteOpen}
              onClick={() => {
                setPaletteQuery('')
                setPaletteOpen((open) => !open)
              }}
              className="inline-flex items-center rounded-md border border-border px-1.5 py-1 text-[11px]"
            >
              Search
              <Kbd>⌘K</Kbd>
            </button>
            <button
              type="button"
              aria-label={unread > 0 ? `Notices, ${unread} unread` : 'Notices'}
              aria-expanded={bellOpen}
              onClick={() => {
                setBellOpen((open) => !open)
                setFilterOpen(false)
                setDisplayOpen(false)
              }}
              className="relative inline-flex size-7 items-center justify-center rounded-md border border-border text-muted-foreground"
            >
              <Bell size={14} aria-hidden="true" />
              {unread > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-tawny px-0.5 text-[9px] font-medium leading-none text-tawny-foreground">
                  {unread}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-expanded={filterOpen}
              onClick={() => {
                setFilterOpen((open) => !open)
                setDisplayOpen(false)
                setBellOpen(false)
              }}
              className="inline-flex items-center rounded-md border border-border px-2 py-1"
            >
              Filter
              {statusFilter !== 'all' ? <span className="ml-1 text-muted-foreground">{statusFilter}</span> : null}
            </button>
            <button
              type="button"
              aria-expanded={displayOpen}
              onClick={() => {
                setDisplayOpen((open) => !open)
                setFilterOpen(false)
                setBellOpen(false)
              }}
              className="inline-flex items-center rounded-md border border-border px-2 py-1"
            >
              Display
              <span className="ml-1 text-muted-foreground">{display}</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="inline-flex items-center rounded-md bg-tawny px-2.5 py-1 font-medium text-tawny-foreground"
          >
            + New issue
            <Kbd>C</Kbd>
          </button>
        </div>

        {filterOpen ? (
          <div className="mx-3 mb-2 flex gap-1 rounded-md border border-border p-1">
            <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>
              All
            </FilterChip>
            {STATUSES.map((status) => (
              <FilterChip
                key={status.id}
                active={statusFilter === status.id}
                onClick={() => setStatusFilter(status.id)}
              >
                {status.label}
              </FilterChip>
            ))}
          </div>
        ) : null}

        {displayOpen ? (
          <div className="mx-3 mb-2 flex gap-1 rounded-md border border-border p-1">
            <FilterChip active={display === 'list'} onClick={() => setDisplay('list')}>
              List
            </FilterChip>
            <FilterChip active={display === 'board'} onClick={() => setDisplay('board')}>
              Board
            </FilterChip>
          </div>
        ) : null}

        {creating ? (
          <form
            className="mx-3 mb-2 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              createIssue()
            }}
          >
            <input
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Issue title"
              aria-label="Issue title"
              className="h-8 min-w-0 flex-1 rounded-md border border-border bg-background px-2 text-[13px] outline-none"
            />
            <button type="submit" className="rounded-md bg-tawny px-3 text-tawny-foreground">
              Add
            </button>
          </form>
        ) : null}

        <label className="mx-3 mb-2 block">
          <span className="sr-only">Search issues</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search titles"
            className="h-8 w-full rounded-md border border-border bg-background px-2 text-[13px] outline-none"
          />
        </label>

        <div className="flex min-h-0 flex-1">
          <div className="min-w-0 flex-1 overflow-auto">
            {display === 'list' ? (
              <div role="listbox" aria-label="Issues">
                {visible.map((issue) => (
                  <button
                    key={issue.id}
                    type="button"
                    role="option"
                    aria-selected={issue.id === selectedId}
                    onClick={() => setSelectedId(issue.id)}
                    className="grid w-full grid-cols-[16px_3.5rem_minmax(0,1fr)_auto_auto_auto] items-center gap-2 px-2 text-left tracking-[-0.01em]"
                    style={{
                      height: 32,
                      background:
                        issue.id === selectedId
                          ? 'color-mix(in srgb, var(--tawny) 28%, transparent)'
                          : 'transparent',
                      boxShadow: issue.id === selectedId ? 'inset 2px 0 0 var(--tawny)' : undefined,
                    }}
                  >
                    <StatusIcon status={issue.status} />
                    <span className="text-muted-foreground">{issue.id}</span>
                    <span className="truncate">{issue.title}</span>
                    <span className="w-14 text-right text-muted-foreground">{issue.label}</span>
                    <span className="w-6 text-right text-muted-foreground">{issue.assignee}</span>
                    <span className="w-10 text-right text-muted-foreground tabular-nums">{issue.date}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid h-full grid-cols-3 gap-2 p-2">
                {STATUSES.map((status) => (
                  <section key={status.id} className="min-w-0 rounded-md border border-border bg-background p-2">
                    <h3 className="mb-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                      {status.label}
                    </h3>
                    <div className="flex flex-col gap-1.5">
                      {visible
                        .filter((issue) => issue.status === status.id)
                        .map((issue) => (
                          <button
                            key={issue.id}
                            type="button"
                            onClick={() => setSelectedId(issue.id)}
                            className={
                              issue.id === selectedId
                                ? 'rounded-md border border-tawny/50 bg-tawny/15 px-2 py-1.5 text-left'
                                : 'rounded-md border border-border px-2 py-1.5 text-left hover:bg-accent'
                            }
                          >
                            <div className="truncate">{issue.title}</div>
                            <div className="text-[11px] text-muted-foreground">{issue.id}</div>
                          </button>
                        ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>

          {selected ? (
            <aside className="w-56 shrink-0 border-l border-border p-3">
              <p className="text-[11px] text-muted-foreground">{selected.id}</p>
              <h2 className="mt-1 text-base font-semibold tracking-tight">{selected.title}</h2>
              <div className="relative mt-4">
                <p className="text-[11px] text-muted-foreground">Status</p>
                <button
                  type="button"
                  aria-expanded={statusMenu}
                  aria-haspopup="listbox"
                  onClick={() => setStatusMenu((open) => !open)}
                  className="mt-1 flex h-8 w-full items-center gap-2 rounded-md border border-border bg-background px-2 text-left text-[13px] text-foreground"
                >
                  <StatusIcon status={selected.status} />
                  <span className="min-w-0 flex-1 truncate">
                    {STATUSES.find((status) => status.id === selected.status)?.label}
                  </span>
                </button>
                {statusMenu ? (
                  <ul
                    role="listbox"
                    aria-label="Status"
                    className="absolute bottom-full z-10 mb-1 w-full overflow-hidden rounded-md border border-border bg-popover py-1 shadow-sm"
                  >
                    {STATUSES.map((status) => {
                      const active = status.id === selected.status
                      return (
                        <li key={status.id}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={active}
                            onClick={() => {
                              updateSelected({ status: status.id })
                              setStatusMenu(false)
                            }}
                            className={
                              active
                                ? 'flex w-full items-center gap-2 bg-tawny/15 px-2 py-1.5 text-left text-foreground'
                                : 'flex w-full items-center gap-2 px-2 py-1.5 text-left text-foreground hover:bg-accent'
                            }
                          >
                            <StatusIcon status={status.id} />
                            {status.label}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
              </div>
              <p className="mt-3 text-[12px] text-muted-foreground">Label · {selected.label}</p>
              <p className="mt-1 text-[12px] text-muted-foreground">Assignee · {selected.assignee}</p>
              <p className="mt-1 text-[12px] text-muted-foreground">Date · {selected.date}</p>
            </aside>
          ) : null}
        </div>

        {paletteOpen ? (
          <div className="absolute inset-x-3 top-12 z-10 overflow-hidden rounded-lg border border-border bg-popover">
            <ul className="py-1">
              {commands.length === 0 ? (
                <li className="px-3 py-2 text-muted-foreground">No matches</li>
              ) : (
                commands.map((command) => (
                  <li key={command.name}>
                    <button
                      type="button"
                      onClick={() => runCommand(command.name)}
                      className="flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-accent"
                    >
                      {command.name}
                      <Kbd>{command.shortcut}</Kbd>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : null}

        {bellOpen ? (
          <div className="absolute top-12 right-3 z-10 w-64 rounded-lg border border-border bg-popover p-2">
            <p className="px-1 pb-1 text-[11px] text-muted-foreground">
              {unread > 0 ? `${unread} unread` : 'All read'}
            </p>
            <ul>
              {notices.map((notice) => (
                <li key={notice.id}>
                  <button
                    type="button"
                    onClick={() => markNoticeRead(notice.id)}
                    className={
                      notice.read
                        ? 'flex w-full items-start gap-2 rounded-md px-1 py-1.5 text-left text-muted-foreground'
                        : 'flex w-full items-start gap-2 rounded-md px-1 py-1.5 text-left text-foreground hover:bg-accent'
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={
                        notice.read
                          ? 'mt-1.5 size-1.5 shrink-0 rounded-full bg-transparent'
                          : 'mt-1.5 size-1.5 shrink-0 rounded-full bg-tawny'
                      }
                    />
                    <span>{notice.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-md bg-foreground px-2 py-1 text-[12px] text-background'
          : 'rounded-md px-2 py-1 text-[12px] text-muted-foreground'
      }
    >
      {children}
    </button>
  )
}
