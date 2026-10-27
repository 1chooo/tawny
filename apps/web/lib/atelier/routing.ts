export const ATELIER_BASE = '/designs/atelier'
export const ATELIER_VIEW_BASE = '/view/atelier'

/** Resolve which Atelier mount the current pathname is under. */
export function atelierBaseFromPathname(pathname: string): string {
  if (
    pathname === ATELIER_VIEW_BASE ||
    pathname.startsWith(`${ATELIER_VIEW_BASE}/`)
  ) {
    return ATELIER_VIEW_BASE
  }
  return ATELIER_BASE
}

/** Prefix an in-app path for the active mount. Leaves external and hash links alone. */
export function atelierHref(pathname: string, href: string): string {
  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('http://') ||
    href.startsWith('https://')
  ) {
    return href
  }

  const base = atelierBaseFromPathname(pathname)
  if (href.startsWith('/#')) return `${base}#${href.slice(2)}`
  if (href === '/') return base
  return `${base}${href}`
}
