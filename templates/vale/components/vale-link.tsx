import type { ComponentProps } from 'react'
import Link from 'next/link'

type ValeLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
}

export function ValeLink({ href, ...props }: ValeLinkProps) {
  return <Link href={href} {...props} />
}
