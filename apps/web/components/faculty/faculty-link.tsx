'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'
import { facultyHref } from '@/lib/faculty/routing'

export const facultyTextLink =
  'font-semibold text-[#990000] underline underline-offset-2 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#990000]'

export function FacultyLink({
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & { href: string }) {
  const pathname = usePathname()
  return <Link href={facultyHref(pathname, href)} {...props} />
}
