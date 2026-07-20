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
import { ART_BASE, type ArtLocale } from "@/lib/art/routing"

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  href: string
  locale?: string
}

export function artHref(locale: string, href: string): string {
  const path = href === '/' ? '' : href.startsWith('/') ? href : `/${href}`
  return `${ART_BASE}/${locale}${path}`
}

export function stripArtLocalePrefix(pathname: string): string {
  const match = pathname.match(new RegExp(`^${ART_BASE}/(en|zh)(/.*)?$`))
  if (!match) return '/'
  return match[2] || '/'
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function ArtLink({ href, locale: localeProp, ...rest }, ref) {
    const fullPath = useNextPathname()
    const intlLocale = useLocale() as ArtLocale
    const urlLocale = fullPath.match(/^\/designs\/art\/(en|zh)(?:\/|$)/)?.[1] as
      | ArtLocale
      | undefined
    const locale = (localeProp as ArtLocale | undefined) ?? urlLocale ?? intlLocale
    return <NextLink ref={ref} href={artHref(locale, href)} {...rest} />
  },
)

export function usePathname(): string {
  return stripArtLocalePrefix(useNextPathname())
}

export function useRouter() {
  const router = useNextRouter()
  const locale = useLocale() as ArtLocale

  return {
    push(href: string) {
      router.push(artHref(locale, href))
    },
    replace(href: string) {
      router.replace(artHref(locale, href))
    },
    prefetch(href: string) {
      router.prefetch(artHref(locale, href))
    },
    back: router.back.bind(router),
    forward: router.forward.bind(router),
    refresh: router.refresh.bind(router),
  }
}

export type { MouseEventHandler }
