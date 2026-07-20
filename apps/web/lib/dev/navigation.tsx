'use client'

import NextLink from 'next/link'
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
} from 'next/navigation'
import { forwardRef, type ComponentProps } from 'react'
import {
  DEV_BASE,
  DEV_MOUNTS,
  devBaseFromPathname,
} from '@/lib/dev/routing'

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  href: string
}

export function devHref(href: string, base: string = DEV_BASE): string {
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('#')
  ) {
    return href
  }
  const path = href === '/' ? '' : href.startsWith('/') ? href : `/${href}`
  return `${base}${path}`
}

export function stripDevPrefix(pathname: string): string {
  for (const base of DEV_MOUNTS) {
    if (pathname === base || pathname === `${base}/`) return '/'
    if (pathname.startsWith(`${base}/`)) {
      return pathname.slice(base.length) || '/'
    }
  }
  return pathname
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function DevLink({ href, ...rest }, ref) {
    const base = devBaseFromPathname(useNextPathname())
    return <NextLink ref={ref} href={devHref(href, base)} {...rest} />
  },
)

export function usePathname(): string {
  return stripDevPrefix(useNextPathname())
}

export function useRouter() {
  const router = useNextRouter()
  const base = devBaseFromPathname(useNextPathname())

  return {
    push(href: string) {
      router.push(devHref(href, base))
    },
    replace(href: string) {
      router.replace(devHref(href, base))
    },
    prefetch(href: string) {
      router.prefetch(devHref(href, base))
    },
    back: router.back.bind(router),
    forward: router.forward.bind(router),
    refresh: router.refresh.bind(router),
  }
}
