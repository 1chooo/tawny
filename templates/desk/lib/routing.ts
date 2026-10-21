export type DeskSection =
  | 'dashboard'
  | 'tasks'
  | 'calendar'
  | 'analytics'
  | 'team'
  | 'settings'
  | 'help'
  | 'logout'
  | 'project'

const SECTIONS = new Set<DeskSection>([
  'tasks',
  'calendar',
  'analytics',
  'team',
  'settings',
  'help',
  'logout',
])

/** Mount for the live demo, the full preview, or a scaffolded template. */
export function deskBase(pathname: string) {
  if (pathname === '/view/desk' || pathname.startsWith('/view/desk/')) return '/view/desk'
  if (pathname === '/designs/desk' || pathname.startsWith('/designs/desk/')) return '/designs/desk'
  return ''
}

export function deskHref(pathname: string, path: string) {
  const base = deskBase(pathname)
  if (path === '/' || path === '') return base || '/'
  return `${base}${path}`
}

export function deskSection(pathname: string): DeskSection {
  const rest = pathname.slice(deskBase(pathname).length)
  const [head] = rest.split('/').filter(Boolean)
  if (head === 'projects') return 'project'
  if (head && SECTIONS.has(head as DeskSection)) return head as DeskSection
  return 'dashboard'
}
