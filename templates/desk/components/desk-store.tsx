'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  EVENTS,
  MEMBERS,
  NOTICES,
  PROFILE,
  PROJECTS,
  TASKS,
  initials,
  memberById,
  nextId,
  type DeskEvent,
  type DeskNotice,
  type Member,
  type Profile,
  type Project,
  type ProjectStatus,
  type Task,
  type TaskStatus,
} from '@/lib/model'
import type { ImportRow } from '@/lib/import-data'

const STORAGE_KEY = 'tawny-desk-demo'

type DialogKind = 'project' | 'import' | 'member' | 'event' | 'task' | null
type StatusFilter = 'all' | ProjectStatus
type TaskFilter = 'all' | TaskStatus

type Snapshot = {
  projects: Project[]
  tasks: Task[]
  members: Member[]
  events: DeskEvent[]
  notices: DeskNotice[]
  profile: Profile
  signedIn: boolean
}

type Flash = { text: string; tone: 'ok' | 'err' } | null

type DeskContextValue = Snapshot & {
  ready: boolean
  query: string
  projectStatus: StatusFilter
  taskStatus: TaskFilter
  taskProjectId: string
  flash: Flash
  dialog: DialogKind
  setQuery: (query: string) => void
  setProjectStatus: (status: StatusFilter) => void
  setTaskStatus: (status: TaskFilter) => void
  setTaskProjectId: (id: string) => void
  openDialog: (dialog: Exclude<DialogKind, null>) => void
  closeDialog: () => void
  dismissFlash: () => void
  notify: (text: string, tone?: 'ok' | 'err') => void
  addProject: (input: Omit<Project, 'id'>) => string
  updateProject: (id: string, patch: Partial<Omit<Project, 'id'>>) => void
  removeProject: (id: string) => void
  addTask: (input: Omit<Task, 'id'>) => string
  updateTask: (id: string, patch: Partial<Omit<Task, 'id'>>) => void
  removeTask: (id: string) => void
  addMember: (input: { name: string; email: string; role: string }) => string
  updateMember: (id: string, patch: Partial<Omit<Member, 'id'>>) => void
  addEvent: (input: Omit<DeskEvent, 'id'>) => void
  removeEvent: (id: string) => void
  startEvent: (id: string) => void
  importRows: (rows: ImportRow[]) => { added: number; owners: number }
  markNotice: (id: string) => void
  markKindRead: (kind: DeskNotice['kind']) => void
  updateProfile: (patch: Partial<Profile>) => void
  signOut: () => void
  signIn: () => void
}

const seed = (): Snapshot => ({
  projects: PROJECTS,
  tasks: TASKS,
  members: MEMBERS,
  events: EVENTS,
  notices: NOTICES,
  profile: PROFILE,
  signedIn: true,
})

const DeskContext = createContext<DeskContextValue | null>(null)

function isSnapshot(value: unknown): value is Snapshot {
  if (!value || typeof value !== 'object') return false
  const record = value as Snapshot
  return Array.isArray(record.projects) && Array.isArray(record.tasks) && Array.isArray(record.members)
}

export function DeskProvider({
  children,
  persist = true,
}: {
  children: ReactNode
  persist?: boolean
}) {
  const [data, setData] = useState<Snapshot>(seed)
  const [ready, setReady] = useState(!persist)
  const [query, setQuery] = useState('')
  const [projectStatus, setProjectStatus] = useState<StatusFilter>('all')
  const [taskStatus, setTaskStatus] = useState<TaskFilter>('all')
  const [taskProjectId, setTaskProjectId] = useState('all')
  const [flash, setFlash] = useState<Flash>(null)
  const [dialog, setDialog] = useState<DialogKind>(null)

  useEffect(() => {
    if (!persist) return
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as unknown
        if (isSnapshot(parsed)) setData(parsed)
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY)
    }
    setReady(true)
  }, [persist])

  useEffect(() => {
    if (!persist || !ready) return
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data, persist, ready])

  const value = useMemo<DeskContextValue>(() => {
    function say(text: string, tone: 'ok' | 'err' = 'ok') {
      setFlash({ text, tone })
    }

    return {
      ...data,
      ready,
      query,
      projectStatus,
      taskStatus,
      taskProjectId,
      flash,
      dialog,
      setQuery,
      setProjectStatus,
      setTaskStatus,
      setTaskProjectId,
      openDialog: (next) => setDialog(next),
      closeDialog: () => setDialog(null),
      dismissFlash: () => setFlash(null),
      notify: (text, tone = 'ok') => say(text, tone),
      addProject: (input) => {
        const id = nextId('project')
        setData((current) => ({ ...current, projects: [{ ...input, id }, ...current.projects] }))
        setDialog(null)
        say(`${input.name} is on the desk.`)
        return id
      },
      updateProject: (id, patch) => {
        setData((current) => ({
          ...current,
          projects: current.projects.map((project) => (project.id === id ? { ...project, ...patch } : project)),
        }))
        say('Project saved.')
      },
      removeProject: (id) => {
        const name = data.projects.find((project) => project.id === id)?.name ?? 'Project'
        setData((current) => ({
          ...current,
          projects: current.projects.filter((project) => project.id !== id),
          tasks: current.tasks.filter((task) => task.projectId !== id),
          events: current.events.map((event) =>
            event.projectId === id ? { ...event, projectId: undefined } : event,
          ),
        }))
        say(`${name} was removed.`)
      },
      addTask: (input) => {
        const id = nextId('task')
        setData((current) => ({ ...current, tasks: [{ ...input, id }, ...current.tasks] }))
        setDialog(null)
        say('Task added.')
        return id
      },
      updateTask: (id, patch) => {
        setData((current) => ({
          ...current,
          tasks: current.tasks.map((task) => (task.id === id ? { ...task, ...patch } : task)),
        }))
        say('Task saved.')
      },
      removeTask: (id) => {
        setData((current) => ({ ...current, tasks: current.tasks.filter((task) => task.id !== id) }))
        say('Task removed.')
      },
      addMember: (input) => {
        const id = nextId('member')
        const member: Member = { id, ...input, initials: initials(input.name) }
        setData((current) => ({ ...current, members: [...current.members, member] }))
        setDialog(null)
        say(`${input.name} joined the team.`)
        return id
      },
      updateMember: (id, patch) => {
        setData((current) => ({
          ...current,
          members: current.members.map((member) => {
            if (member.id !== id) return member
            const next = { ...member, ...patch }
            if (patch.name) next.initials = initials(patch.name)
            return next
          }),
        }))
        say('Teammate saved.')
      },
      addEvent: (input) => {
        setData((current) => ({ ...current, events: [...current.events, { ...input, id: nextId('event') }] }))
        setDialog(null)
        say('Event added to the calendar.')
      },
      removeEvent: (id) => {
        setData((current) => ({ ...current, events: current.events.filter((event) => event.id !== id) }))
        say('Event removed.')
      },
      startEvent: (id) => {
        setData((current) => ({
          ...current,
          events: current.events.map((event) => (event.id === id ? { ...event, started: true } : event)),
        }))
        const title = data.events.find((event) => event.id === id)?.title ?? 'Meeting'
        say(`${title} is underway.`)
      },
      importRows: (rows) => {
        let owners = 0
        const projects = rows.map((row) => {
          const owner = data.members.find((member) => member.name.toLowerCase() === row.owner.toLowerCase())
          if (!owner) owners += 1
          return {
            id: nextId('project'),
            name: row.name,
            summary: 'Imported into this demo.',
            due: row.due,
            status: row.status,
            ownerId: owner?.id ?? data.profile.email,
          } satisfies Project
        })
        // ownerId fallback: if no match, use Ada (first member) so the row still has a person
        const fallback = data.members[0]?.id ?? 'ada'
        const normalized = projects.map((project) =>
          memberById(data.members, project.ownerId) ? project : { ...project, ownerId: fallback },
        )
        setData((current) => ({ ...current, projects: [...normalized, ...current.projects] }))
        setDialog(null)
        say(
          owners
            ? `Imported ${normalized.length}. ${owners} unknown owner${owners === 1 ? '' : 's'} assigned to ${data.members[0]?.name ?? 'the owner'}.`
            : `Imported ${normalized.length} project${normalized.length === 1 ? '' : 's'}.`,
        )
        return { added: normalized.length, owners }
      },
      markNotice: (id) => {
        setData((current) => ({
          ...current,
          notices: current.notices.map((notice) => (notice.id === id ? { ...notice, read: true } : notice)),
        }))
      },
      markKindRead: (kind) => {
        setData((current) => ({
          ...current,
          notices: current.notices.map((notice) => (notice.kind === kind ? { ...notice, read: true } : notice)),
        }))
      },
      updateProfile: (patch) => {
        setData((current) => ({ ...current, profile: { ...current.profile, ...patch } }))
        say('Settings saved.')
      },
      signOut: () => {
        setData((current) => ({ ...current, signedIn: false }))
        setDialog(null)
        say('Signed out. The desk is still in this tab.')
      },
      signIn: () => {
        setData((current) => ({ ...current, signedIn: true }))
        say(`Welcome back, ${data.profile.name.split(' ')[0]}.`)
      },
    }
  }, [data, dialog, flash, projectStatus, query, ready, taskProjectId, taskStatus])

  if (!ready) {
    return <div className="min-h-0 flex-1 bg-background" />
  }

  return <DeskContext.Provider value={value}>{children}</DeskContext.Provider>
}

export function useDesk() {
  const value = useContext(DeskContext)
  if (!value) throw new Error('useDesk must be used inside DeskProvider')
  return value
}
