'use client'

import NextLink from 'next/link'
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
} from 'next/navigation'
import { useLocale } from 'next-intl'
import {
  forwardRef,
  type ComponentProps,
  type MouseEventHandler,
} from 'react'
import {
  ART_BASE,
  ART_MOUNTS,
  artBaseFromPathname,
  type ArtLocale,
} from '@/lib/art/routing'

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  href: string
  locale?: string
}

export function artHref(
  locale: string,
  href: string,
  base: string = ART_BASE,
): string {
  const path = href === '/' ? '' : href.startsWith('/') ? href : `/${href}`
  return `${base}/${locale}${path}`
}

export function stripArtLocalePrefix(pathname: string): string {
  for (const base of ART_MOUNTS) {
    const match = pathname.match(new RegExp(`^${base}/(en|zh)(/.*)?$`))
    if (match) return match[2] || '/'
  }
  return '/'
}

function localeFromPathname(pathname: string): ArtLocale | undefined {
  for (const base of ART_MOUNTS) {
    const match = pathname.match(new RegExp(`^${base}/(en|zh)(?:/|$)`))
    if (match?.[1] === 'en' || match?.[1] === 'zh') {
      return match[1]
    }
  }
  return undefined
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function ArtLink({ href, locale: localeProp, ...rest }, ref) {
    const fullPath = useNextPathname()
    const intlLocale = useLocale() as ArtLocale
    const urlLocale = localeFromPathname(fullPath)
    const locale = (localeProp as ArtLocale | undefined) ?? urlLocale ?? intlLocale
    const base = artBaseFromPathname(fullPath)
    return <NextLink ref={ref} href={artHref(locale, href, base)} {...rest} />
  },
)

export function usePathname(): string {
  return stripArtLocalePrefix(useNextPathname())
}

export function useRouter() {
  const router = useNextRouter()
  const locale = useLocale() as ArtLocale
  const fullPath = useNextPathname()
  const base = artBaseFromPathname(fullPath)

  return {
    push(href: string) {
      router.push(artHref(locale, href, base))
    },
    replace(href: string) {
      router.replace(artHref(locale, href, base))
    },
    prefetch(href: string) {
      router.prefetch(artHref(locale, href, base))
    },
    back: router.back.bind(router),
    forward: router.forward.bind(router),
    refresh: router.refresh.bind(router),
  }
}

export type { MouseEventHandler }
