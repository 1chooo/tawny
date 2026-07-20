'use client'

import NextLink from 'next/link'
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
} from 'next/navigation'
import { forwardRef, type ComponentProps } from 'react'
import { DEV_BASE } from '@/lib/dev/routing'

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  href: string
}

export function devHref(href: string): string {
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) {
    return href
  }
  const path = href === '/' ? '' : href.startsWith('/') ? href : `/${href}`
  return `${DEV_BASE}${path}`
}

export function stripDevPrefix(pathname: string): string {
  if (pathname === DEV_BASE || pathname === `${DEV_BASE}/`) return '/'
  if (pathname.startsWith(`${DEV_BASE}/`)) {
    return pathname.slice(DEV_BASE.length) || '/'
  }
  return pathname
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function DevLink({ href, ...rest }, ref) {
    return <NextLink ref={ref} href={devHref(href)} {...rest} />
  },
)

export function usePathname(): string {
  return stripDevPrefix(useNextPathname())
}

export function useRouter() {
  const router = useNextRouter()

  return {
    push(href: string) {
      router.push(devHref(href))
    },
    replace(href: string) {
      router.replace(devHref(href))
    },
    prefetch(href: string) {
      router.prefetch(devHref(href))
    },
    back: router.back.bind(router),
    forward: router.forward.bind(router),
    refresh: router.refresh.bind(router),
  }
}
