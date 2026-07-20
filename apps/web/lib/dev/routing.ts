export const DEV_BASE = '/designs/dev'
export const DEV_VIEW_BASE = '/view/dev'

export const DEV_MOUNTS = [DEV_BASE, DEV_VIEW_BASE] as const

/** Resolve which Dev mount the current pathname is under. Defaults to showcase. */
export function devBaseFromPathname(pathname: string): string {
  if (pathname === DEV_VIEW_BASE || pathname.startsWith(`${DEV_VIEW_BASE}/`)) {
    return DEV_VIEW_BASE
  }
  return DEV_BASE
}
