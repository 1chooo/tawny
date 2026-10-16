'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { vcardHref } from '@/lib/vcard/routing'

type VcardLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

/** In-app VCard link. Prefixes `/designs/vcard` or `/view/vcard` from the current URL. */
export function VcardLink({ href, ...props }: VcardLinkProps) {
  const pathname = usePathname()
  return <Link href={vcardHref(pathname, href)} {...props} />
}
