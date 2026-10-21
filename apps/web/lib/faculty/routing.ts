const PAGES = ['/', '/research', '/students', '/teaching', '/publications'] as const

export type FacultyPath = (typeof PAGES)[number]

/** Mount for the live demo, the full preview, or a scaffolded template. */
export function facultyBase(pathname: string) {
  if (pathname === '/view/faculty' || pathname.startsWith('/view/faculty/')) {
    return '/view/faculty'
  }
  if (pathname === '/designs/faculty' || pathname.startsWith('/designs/faculty/')) {
    return '/designs/faculty'
  }
  return ''
}

export function facultyHref(pathname: string, path: string) {
  const base = facultyBase(pathname)
  if (path === '/' || path === '') return base || '/'
  return `${base}${path}`
}

export function facultyPage(pathname: string): FacultyPath | string {
  const rest = pathname.slice(facultyBase(pathname).length)
  if (!rest || rest === '/') return '/'
  return rest
}
