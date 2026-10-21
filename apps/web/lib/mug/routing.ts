export const MUG_BASE = '/designs/mug'
export const MUG_VIEW_BASE = '/view/mug'

/** Resolve which Mug mount the current pathname is under. */
export function mugBaseFromPathname(pathname: string): string {
  if (pathname === MUG_VIEW_BASE || pathname.startsWith(`${MUG_VIEW_BASE}/`)) {
    return MUG_VIEW_BASE
  }
  return MUG_BASE
}

/** Prefix an in-app path (`/login`, `/admin`) for the active mount. */
export function mugHref(pathname: string, href: string): string {
  if (href.startsWith('#')) return href
  const base = mugBaseFromPathname(pathname)
  if (href === '/') return base
  return `${base}${href}`
}
