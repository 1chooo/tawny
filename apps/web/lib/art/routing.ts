export const artLocales = ['en', 'zh'] as const
export type ArtLocale = (typeof artLocales)[number]

export const artDefaultLocale: ArtLocale = 'en'

/** Showcase mount (ProductFrame + docs) */
export const ART_BASE = '/designs/art'
/** Full-site mount (new-tab /view preview) */
export const ART_VIEW_BASE = '/view/art'

export const ART_MOUNTS = [ART_BASE, ART_VIEW_BASE] as const

export function isArtLocale(value: string): value is ArtLocale {
  return (artLocales as readonly string[]).includes(value)
}

/** Resolve which Art mount the current pathname is under. Defaults to showcase. */
export function artBaseFromPathname(pathname: string): string {
  if (pathname === ART_VIEW_BASE || pathname.startsWith(`${ART_VIEW_BASE}/`)) {
    return ART_VIEW_BASE
  }
  return ART_BASE
}
