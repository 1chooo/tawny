export const artLocales = ['en', 'zh'] as const
export type ArtLocale = (typeof artLocales)[number]

export const artDefaultLocale: ArtLocale = 'en'
export const ART_BASE = '/designs/art'

export function isArtLocale(value: string): value is ArtLocale {
  return (artLocales as readonly string[]).includes(value)
}
