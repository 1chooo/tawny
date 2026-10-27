export const COBALT_BASE = '/designs/cobalt'
export const COBALT_VIEW_BASE = '/view/cobalt'

/** Resolve which Cobalt mount the current pathname is under. */
export function cobaltBaseFromPathname(pathname: string): string {
  if (pathname === COBALT_VIEW_BASE || pathname.startsWith(`${COBALT_VIEW_BASE}/`)) {
    return COBALT_VIEW_BASE
  }
  return COBALT_BASE
}

/** Prefix an in-app path (`/login`, `/admin`) for the active mount. */
export function cobaltHref(pathname: string, href: string): string {
  if (href.startsWith('#')) return href
  const base = cobaltBaseFromPathname(pathname)
  if (href === '/') return base
  return `${base}${href}`
}

/** Wordmark and Sales targets for Cobalt's admin page, or the standalone Admin design. */
export function studioHrefs(pathname: string): { home: string; sales: string } {
  if (pathname === '/view/admin' || pathname.startsWith('/view/admin/')) {
    return { home: '/view/admin', sales: '/view/admin' }
  }
  if (pathname === '/designs/admin' || pathname.startsWith('/designs/admin/')) {
    return { home: '/designs/admin', sales: '/designs/admin' }
  }
  return { home: cobaltHref(pathname, '/'), sales: cobaltHref(pathname, '/admin') }
}
