'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sealHref } from '@/lib/seal/routing'

type SealLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

/** In-app Seal link. Prefixes `/designs/seal` or `/view/seal` from the current URL. */
export function SealLink({ href, ...props }: SealLinkProps) {
  const pathname = usePathname()
  return <Link href={sealHref(pathname, href)} {...props} />
}
