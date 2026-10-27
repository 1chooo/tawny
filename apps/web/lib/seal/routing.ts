export const SEAL_BASE = '/designs/seal'
export const SEAL_VIEW_BASE = '/view/seal'

/** Resolve which Seal mount the current pathname is under. */
export function sealBaseFromPathname(pathname: string): string {
  if (pathname === SEAL_VIEW_BASE || pathname.startsWith(`${SEAL_VIEW_BASE}/`)) {
    return SEAL_VIEW_BASE
  }
  return SEAL_BASE
}

/** Prefix an in-app path for the active mount. Leaves external and hash links alone. */
export function sealHref(pathname: string, href: string): string {
  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('http://') ||
    href.startsWith('https://')
  ) {
    return href
  }

  const base = sealBaseFromPathname(pathname)
  if (href.startsWith('/#')) return `${base}#${href.slice(2)}`
  if (href === '/') return base
  return `${base}${href}`
}
