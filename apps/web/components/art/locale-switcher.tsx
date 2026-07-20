'use client'

import NextLink from 'next/link'
import { usePathname as useNextPathname } from 'next/navigation'
import clsx from 'clsx'
import { artHref, stripArtLocalePrefix } from '@/lib/art/navigation'
import { artLocales, type ArtLocale } from '@/lib/art/routing'

function localeFromPath(pathname: string): ArtLocale {
  const match = pathname.match(/^\/designs\/art\/(en|zh)(?:\/|$)/)
  return match?.[1] === 'zh' ? 'zh' : 'en'
}

export function LocaleSwitcher() {
  const fullPath = useNextPathname()
  const pathname = stripArtLocalePrefix(fullPath)
  const locale = localeFromPath(fullPath)

  return (
    <div
      className="border-art-bento-ink flex gap-0 border-2 text-xs font-bold uppercase"
      role="group"
      aria-label="Language"
    >
      {artLocales.map((loc) => (
        <NextLink
          key={loc}
          href={artHref(loc, pathname)}
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
