'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { site } from '@/lib/content'
import { SealLink } from '@/components/seal-link'

export function SiteHeader() {
  const pathname = usePathname()
  const [active, setActive] = useState('')
  const onWork = pathname.includes('/work/')
  const current = onWork ? 'work' : active

  useEffect(() => {
    const nodes = site.nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null)
    if (nodes.length === 0) return

    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best = ''
        let score = 0
        for (const [id, ratio] of visible) {
          if (ratio > score) {
            best = id
            score = ratio
          }
        }
        setActive(best)
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.15, 0.4, 0.75] },
    )

    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="seal-header">
      <a href="#main" className="seal-skip">
        Skip to main content
      </a>
      <div className="seal-bar">
        <SealLink href="/" className="seal-wordmark">
          <img src="/images/seal-wax.png" alt="" className="seal-wordmark-dot" />
          {site.name}
        </SealLink>
        <nav aria-label="Sections">
          <div className="seal-nav">
            {site.nav.map((item) => (
              <SealLink
                key={item.id}
                href={item.href}
                className={current === item.id ? 'is-active' : undefined}
                aria-current={current === item.id ? 'true' : undefined}
              >
                {item.label}
                <span className="seal-nav-dot" aria-hidden="true" />
              </SealLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
