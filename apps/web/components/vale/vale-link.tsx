'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { valeHref } from '@/lib/vale/routing'

type ValeLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

/** In-app Vale link. Prefixes `/designs/vale` or `/view/vale` from the current URL. */
export function ValeLink({ href, ...props }: ValeLinkProps) {
  const pathname = usePathname()
  return <Link href={valeHref(pathname, href)} {...props} />
}
