'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'
import { uscHref } from '@/lib/usc/routing'

export const uscTextLink =
  'font-semibold text-[#990000] underline underline-offset-2 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#990000]'

export function USCLink({
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & { href: string }) {
  const pathname = usePathname()
  return <Link href={uscHref(pathname, href)} {...props} />
}
