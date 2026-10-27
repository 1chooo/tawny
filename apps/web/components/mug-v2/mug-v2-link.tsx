'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mugV2Href } from '@/lib/mug-v2/routing'

type MugV2LinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

/** In-app Mug v2 link. Prefixes `/designs/mug-v2` or `/view/mug-v2`. */
export function MugV2Link({ href, ...props }: MugV2LinkProps) {
  const pathname = usePathname()
  return <Link href={mugV2Href(pathname, href)} {...props} />
}
