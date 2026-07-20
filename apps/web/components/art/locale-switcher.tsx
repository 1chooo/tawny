'use client'

import NextLink from 'next/link'
import { usePathname as useNextPathname } from 'next/navigation'
import clsx from 'clsx'
import { artHref, stripArtLocalePrefix } from '@/lib/art/navigation'
import {
  ART_MOUNTS,
  artBaseFromPathname,
  artLocales,
  type ArtLocale,
} from '@/lib/art/routing'

function localeFromPath(pathname: string): ArtLocale {
  for (const base of ART_MOUNTS) {
    const match = pathname.match(new RegExp(`^${base}/(en|zh)(?:/|$)`))
    if (match?.[1] === 'zh') return 'zh'
    if (match?.[1] === 'en') return 'en'
  }
  return 'en'
}

export function LocaleSwitcher() {
  const fullPath = useNextPathname()
  const pathname = stripArtLocalePrefix(fullPath)
  const locale = localeFromPath(fullPath)
  const base = artBaseFromPathname(fullPath)

  return (
    <div
      className="border-art-bento-ink flex gap-0 border-2 text-xs font-bold uppercase"
      role="group"
      aria-label="Language"
    >
      {artLocales.map((loc) => (
        <NextLink
          key={loc}
          href={artHref(loc, pathname, base)}
          hrefLang={loc === 'zh' ? 'zh-Hant' : 'en'}
          className={clsx(
            'px-2 py-1 transition-colors',
            locale === loc
              ? 'bg-art-bento-ink text-art-bento-bg'
              : 'hover:bg-art-bento-ink/10 text-art-bento-ink',
          )}
        >
          {loc === 'zh' ? '中' : 'EN'}
        </NextLink>
      ))}
    </div>
  )
}
