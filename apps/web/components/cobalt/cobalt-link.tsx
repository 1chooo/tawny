'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cobaltHref } from '@/lib/cobalt/routing'

type CobaltLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

/** In-app Cobalt link. Prefixes `/designs/cobalt` or `/view/cobalt` from the current URL. */
export function CobaltLink({ href, ...props }: CobaltLinkProps) {
  const pathname = usePathname()
  return <Link href={cobaltHref(pathname, href)} {...props} />
}
