'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { VcardLink } from '@/components/vcard/link'
import { vcardBaseFromPathname } from '@/lib/vcard/routing'

const LINKS = [
  { href: '/', label: 'About', match: 'exact' },
  { href: '/resume', label: 'Resume', match: 'prefix' },
  { href: '/project', label: 'Project', match: 'prefix' },
  { href: '/blog', label: 'Blog', match: 'prefix' },
] as const

export function VcardNav() {
  const pathname = usePathname()
  const base = vcardBaseFromPathname(pathname)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <nav className="vcard-nav" aria-label="Sections">
      <ul className="vcard-nav-list">
        {LINKS.map((link) => {
          const path = link.href === '/' ? base : `${base}${link.href}`
          const isActive =
            link.match === 'exact'
              ? pathname === base || pathname === `${base}/`
              : pathname === path || pathname.startsWith(`${path}/`)
          const isHovered = hovered === link.href
          return (
            <li key={link.href}>
              <VcardLink
                href={link.href}
                className={isActive ? 'is-active' : undefined}
                aria-current={isActive ? 'page' : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onMouseLeave={() => setHovered(null)}
              >
                {isHovered ? (
                  <span className="vcard-nav-hover" aria-hidden="true" />
                ) : null}
                {link.label}
                {isActive ? (
                  <span className="vcard-nav-line" aria-hidden="true" />
                ) : null}
                {isHovered && !isActive ? (
                  <span className="vcard-nav-hover-line" aria-hidden="true" />
                ) : null}
              </VcardLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
