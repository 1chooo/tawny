const PAGES = ['/', '/research', '/students', '/teaching', '/publications'] as const

export type USCPath = (typeof PAGES)[number]

/** Mount for the live demo, the full preview, or a scaffolded template. */
export function uscBase(pathname: string) {
  if (pathname === '/view/usc' || pathname.startsWith('/view/usc/')) {
    return '/view/usc'
  }
  if (pathname === '/designs/usc' || pathname.startsWith('/designs/usc/')) {
    return '/designs/usc'
  }
  return ''
}

export function uscHref(pathname: string, path: string) {
  const base = uscBase(pathname)
  if (path === '/' || path === '') return base || '/'
  return `${base}${path}`
}

export function uscPage(pathname: string): USCPath | string {
  const rest = pathname.slice(uscBase(pathname).length)
  if (!rest || rest === '/') return '/'
  return rest
}
