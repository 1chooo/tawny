export const MUG_V2_BASE = '/designs/mug-v2'
export const MUG_V2_VIEW_BASE = '/view/mug-v2'

/** Resolve which Mug v2 mount the current pathname is under. */
export function mugV2BaseFromPathname(pathname: string): string {
  if (
    pathname === MUG_V2_VIEW_BASE ||
    pathname.startsWith(`${MUG_V2_VIEW_BASE}/`)
  ) {
    return MUG_V2_VIEW_BASE
  }
  return MUG_V2_BASE
}

/** Prefix an in-app path for the active mount. Leaves external and hash links alone. */
export function mugV2Href(pathname: string, href: string): string {
  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('http://') ||
    href.startsWith('https://')
  ) {
    return href
  }

  const base = mugV2BaseFromPathname(pathname)
  if (href.startsWith('/#')) return `${base}#${href.slice(2)}`
  if (href === '/') return base
  return `${base}${href}`
}
