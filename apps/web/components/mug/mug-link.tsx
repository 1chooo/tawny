'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mugHref } from '@/lib/mug/routing'

type MugLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

/** In-app Mug link. Prefixes `/designs/mug` or `/view/mug` from the current URL. */
export function MugLink({ href, ...props }: MugLinkProps) {
  const pathname = usePathname()
  return <Link href={mugHref(pathname, href)} {...props} />
}
