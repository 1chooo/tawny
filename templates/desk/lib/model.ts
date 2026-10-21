export type ProjectStatus = 'running' | 'ended' | 'pending'
export type TaskStatus = 'todo' | 'progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'
export type Tone = 'ink' | 'tawny' | 'stone'

export type Member = {
  id: string
  name: string
  email: string
  initials: string
  role: string
}

export type Project = {
  id: string
  name: string
  summary: string
  due: string
  status: ProjectStatus
  ownerId: string
}

export type Task = {
  id: string
  title: string
  projectId: string
  assigneeId: string
  status: TaskStatus
  priority: Priority
  due: string
}

export type DeskEvent = {
  id: string
  title: string
  date: string
  time: string
  duration: string
  projectId?: string
  started?: boolean
}

export type DeskNotice = {
  id: string
  kind: 'mail' | 'bell'
  text: string
  read: boolean
}

export type Profile = {
  name: string
  email: string
  mailAlerts: boolean
  bellAlerts: boolean
}

export type WeekPoint = {
  id: string
  day: string
  label: string
  value: number
  emphasis?: boolean
}

export const STATUS_LABEL = {
  running: 'Running',
  ended: 'Ended',
  pending: 'Pending',
  todo: 'To do',
  progress: 'In progress',
  done: 'Done',
} as const

export const PRIORITY_LABEL = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
} as const

export const WEEK: WeekPoint[] = [
  { id: 'sun', day: 'S', label: 'Sunday', value: 45 },
  { id: 'mon', day: 'M', label: 'Monday', value: 75 },
  { id: 'tue', day: 'T', label: 'Tuesday', value: 74 },
  { id: 'wed', day: 'W', label: 'Wednesday', value: 92, emphasis: true },
  { id: 'thu', day: 'T', label: 'Thursday', value: 35 },
  { id: 'fri', day: 'F', label: 'Friday', value: 60 },
  { id: 'sat', day: 'S', label: 'Saturday', value: 50 },
]

export function weekSummary(points: WeekPoint[] = WEEK) {
  const total = points.reduce((sum, point) => sum + point.value, 0)
  const average = Math.round(total / points.length)
  const peak = Math.max(...points.map((point) => point.value))
  return { average, peak }
}

export const PHONE = {
  title: 'Desk on your phone',
  note: 'The same board, in a pocket.',
}

export const TIMER_START = 24 * 3600 + 8

export const DEMO_TODAY = '2026-10-21'

export const MEMBERS: Member[] = [
  { id: 'ada', name: 'Ada Cole', email: 'ada@example.com', initials: 'AC', role: 'Owner' },
  { id: 'mira', name: 'Mira Chen', email: 'mira@example.com', initials: 'MC', role: 'Engineering' },
  { id: 'leo', name: 'Leo Park', email: 'leo@example.com', initials: 'LP', role: 'Product' },
  { id: 'noor', name: 'Noor Shah', email: 'noor@example.com', initials: 'NS', role: 'Design' },
  { id: 'sam', name: 'Sam Ortiz', email: 'sam@example.com', initials: 'SO', role: 'Engineering' },
]

export const PROJECTS: Project[] = [
  {
    id: 'api',
    name: 'API routes',
    summary: 'Ship the desk endpoints for projects, tasks, and import.',
    due: '2026-11-26',
    status: 'running',
    ownerId: 'mira',
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    summary: 'First-run checklist for a new workspace.',
    due: '2026-11-28',
    status: 'running',
    ownerId: 'leo',
  },
  {
    id: 'home',
    name: 'Desk home',
    summary: 'The dashboard layout: stats, week, and the project list.',
    due: '2026-11-30',
    status: 'pending',
    ownerId: 'sam',
  },
  {
    id: 'weight',
    name: 'Page weight',
    summary: 'Cut the dashboard payload before the next release.',
    due: '2026-12-05',
    status: 'ended',
    ownerId: 'noor',
  },
  {
    id: 'browser',
    name: 'Browser pass',
    summary: 'Walk the main flows in a desktop and a phone window.',
    due: '2026-12-06',
    status: 'running',
    ownerId: 'ada',
  },
  {
    id: 'search',
    name: 'Search filters',
    summary: 'Filter tasks by status, project, and the header search.',
    due: '2026-12-09',
    status: 'pending',
    ownerId: 'noor',
  },
  {
    id: 'billing',
    name: 'Billing notes',
    summary: 'Write down how sample invoices should read.',
    due: '2026-11-18',
    status: 'ended',
    ownerId: 'mira',
  },
  {
    id: 'signin',
    name: 'Sign-in flow',
    summary: 'Keep the signed-in profile on the desk header.',
    due: '2026-12-02',
    status: 'ended',
    ownerId: 'leo',
  },
]

export const TASKS: Task[] = [
  { id: 't1', title: 'List project routes', projectId: 'api', assigneeId: 'mira', status: 'progress', priority: 'high', due: '2026-10-22' },
  { id: 't2', title: 'Reject a bad import file', projectId: 'api', assigneeId: 'sam', status: 'todo', priority: 'medium', due: '2026-10-24' },
  { id: 't3', title: 'Draft the empty checklist', projectId: 'onboarding', assigneeId: 'leo', status: 'progress', priority: 'high', due: '2026-10-23' },
  { id: 't4', title: 'Write the welcome note', projectId: 'onboarding', assigneeId: 'ada', status: 'todo', priority: 'low', due: '2026-10-27' },
  { id: 't5', title: 'Place the stat row', projectId: 'home', assigneeId: 'sam', status: 'todo', priority: 'medium', due: '2026-10-28' },
  { id: 't6', title: 'Match the week chart to ink and tawny', projectId: 'home', assigneeId: 'noor', status: 'done', priority: 'medium', due: '2026-10-16' },
  { id: 't7', title: 'Drop unused chart code', projectId: 'weight', assigneeId: 'noor', status: 'done', priority: 'low', due: '2026-10-12' },
  { id: 't8', title: 'Check the phone layout', projectId: 'browser', assigneeId: 'ada', status: 'progress', priority: 'high', due: '2026-10-21' },
  { id: 't9', title: 'Filter tasks by project', projectId: 'search', assigneeId: 'noor', status: 'todo', priority: 'medium', due: '2026-10-29' },
  { id: 't10', title: 'Note the invoice fields', projectId: 'billing', assigneeId: 'mira', status: 'done', priority: 'low', due: '2026-10-09' },
  { id: 't11', title: 'Keep the profile on the header', projectId: 'signin', assigneeId: 'leo', status: 'done', priority: 'medium', due: '2026-10-14' },
  { id: 't12', title: 'Review with Northwind', projectId: 'browser', assigneeId: 'ada', status: 'todo', priority: 'high', due: '2026-10-21' },
]

export const EVENTS: DeskEvent[] = [
  { id: 'e1', title: 'Review with Northwind', date: '2026-10-21', time: '2:00 pm', duration: '2 hr', projectId: 'browser' },
  { id: 'e2', title: 'Desk standup', date: '2026-10-22', time: '9:30 am', duration: '30 min', projectId: 'home' },
  { id: 'e3', title: 'Import format review', date: '2026-10-24', time: '11:00 am', duration: '45 min', projectId: 'api' },
  { id: 'e4', title: 'Onboarding critique', date: '2026-10-28', time: '3:00 pm', duration: '1 hr', projectId: 'onboarding' },
  { id: 'e5', title: 'Browser pass', date: '2026-11-04', time: '1:00 pm', duration: '1 hr', projectId: 'browser' },
]

export const NOTICES: DeskNotice[] = [
  { id: 'n1', kind: 'mail', text: 'Mira sent notes on the API routes.', read: false },
  { id: 'n2', kind: 'mail', text: 'Leo shared the onboarding checklist.', read: true },
  { id: 'n3', kind: 'bell', text: 'Review with Northwind is today at 2:00 pm.', read: false },
  { id: 'n4', kind: 'bell', text: 'Page weight moved to Ended.', read: true },
]

export const PROFILE: Profile = {
  name: 'Ada Cole',
  email: 'ada@example.com',
  mailAlerts: true,
  bellAlerts: true,
}

export const HELP = [
  {
    id: 'add',
    title: 'Add a project',
    body: 'Use + Add project on the dashboard. Name and due date are required. The project shows up in the list, the sidebar, tasks, and the stat row.',
  },
  {
    id: 'import',
    title: 'Import a file',
    body: 'Import data accepts a CSV or JSON file. CSV needs a header row: name, due, status, owner. Dates are YYYY-MM-DD. Status is running, ended, or pending. JSON is an array of those same fields.',
  },
  {
    id: 'search',
    title: 'Search and filter',
    body: 'The header search matches projects, tasks, and people. Tasks can also be filtered by status and project. Stat cards filter the project list.',
  },
  {
    id: 'session',
    title: 'What stays saved',
    body: 'Edits stay in this browser tab. Closing the tab clears them. Log out only hides the desk until you sign back in.',
  },
]

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const letters = (parts[0]?.[0] ?? 'N') + (parts[1]?.[0] ?? '')
  return letters.toUpperCase()
}

export function formatDue(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  if (!year || !month || !day) return iso
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

export function projectMark(name: string) {
  const letter = name.trim().match(/[A-Za-z0-9]/)?.[0] ?? 'N'
  return letter.toUpperCase()
}

export function toneForStatus(status: ProjectStatus): Tone {
  if (status === 'ended') return 'tawny'
  if (status === 'pending') return 'stone'
  return 'ink'
}

export function memberById(members: Member[], id: string) {
  return members.find((member) => member.id === id)
}

export function projectById(projects: Project[], id: string) {
  return projects.find((project) => project.id === id)
}

export function projectStats(projects: Project[]) {
  const ended = projects.filter((project) => project.status === 'ended').length
  const running = projects.filter((project) => project.status === 'running').length
  const pending = projects.filter((project) => project.status === 'pending').length
  return [
    { id: 'total', label: 'Total projects', value: String(projects.length), note: 'On the desk', ink: true },
    { id: 'ended', label: 'Ended', value: String(ended), note: 'Finished', ink: false },
    { id: 'running', label: 'Running', value: String(running), note: 'In motion', ink: false },
    { id: 'pending', label: 'Pending', value: String(pending), note: 'In discussion', ink: false },
  ]
}

export function endedShare(projects: Project[]) {
  if (projects.length === 0) return 0
  const ended = projects.filter((project) => project.status === 'ended').length
  return Math.round((ended / projects.length) * 100)
}

export function openTaskCount(tasks: Task[]) {
  return tasks.filter((task) => task.status !== 'done').length
}

export function focusFor(memberId: string, tasks: Task[], projects: Project[]) {
  const open = tasks.filter((task) => task.assigneeId === memberId && task.status !== 'done')
  const current = open.find((task) => task.status === 'progress') ?? open[0]
  if (!current) return { label: 'Nothing open', status: 'done' as const }
  const project = projectById(projects, current.projectId)
  return {
    label: project?.name ?? current.title,
    status: current.status === 'progress' ? ('progress' as const) : ('pending' as const),
  }
}

export function nextId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}

export function matches(query: string, ...parts: string[]) {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return parts.join(' ').toLowerCase().includes(needle)
}
