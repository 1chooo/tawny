'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { atelierHref } from '@/lib/atelier/routing'

type AtelierLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

/** In-app Atelier link. Prefixes `/designs/atelier` or `/view/atelier`. */
export function AtelierLink({ href, ...props }: AtelierLinkProps) {
  const pathname = usePathname()
  return <Link href={atelierHref(pathname, href)} {...props} />
}
