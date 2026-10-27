import type { ComponentProps } from 'react'
import Link from 'next/link'

type SealLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

export function SealLink({ href, ...props }: SealLinkProps) {
  return <Link href={href} {...props} />
}
