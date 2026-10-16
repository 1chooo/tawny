export const VCARD_BASE = '/designs/vcard'
export const VCARD_VIEW_BASE = '/view/vcard'

/** Resolve which VCard mount the current pathname is under. */
export function vcardBaseFromPathname(pathname: string): string {
  if (
    pathname === VCARD_VIEW_BASE ||
    pathname.startsWith(`${VCARD_VIEW_BASE}/`)
  ) {
    return VCARD_VIEW_BASE
  }
  return VCARD_BASE
}

/** Prefix an in-app path (`/resume`, `/project/field-notes`) for the active mount. */
export function vcardHref(pathname: string, href: string): string {
  const base = vcardBaseFromPathname(pathname)
  if (href === '/') return base
  return `${base}${href}`
}
