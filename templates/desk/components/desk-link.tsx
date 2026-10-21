'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'
import { deskHref } from '@/lib/routing'

export function DeskLink({
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & { href: string }) {
  const pathname = usePathname()
  return <Link href={deskHref(pathname, href)} {...props} />
}
