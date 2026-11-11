'use client'

import { useState } from 'react'
import { site } from '@/lib/content'
import { NewsletterDialog } from '@/components/newsletter-dialog'
import { ValeLink } from '@/components/vale-link'

export function SiteFooter() {
  const [open, setOpen] = useState(false)

  return (
    <footer className="vale-footer">
      <div className="vale-footer-inner">
        <div className="vale-footer-brand">
          <p className="vale-footer-name vale-ui">{site.name}</p>
          <p>{site.tagline}</p>
          <p>Based in {site.city}</p>
        </div>
        <div className="vale-footer-col vale-footer-contact">
          <p className="vale-footer-label vale-ui">Contact</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div className="vale-footer-col vale-footer-follow">
          <p className="vale-footer-label vale-ui">Follow</p>
          {site.social.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="vale-footer-col vale-footer-info">
          <p className="vale-footer-label vale-ui">Information</p>
          <ValeLink href="/faq">FAQ</ValeLink>
          <ValeLink href="/shipping">Shipping & returns</ValeLink>
          <ValeLink href="/information">Studio</ValeLink>
        </div>
        <div className="vale-footer-base">
          <p>
            © {site.year} {site.name}
          </p>
          <button
            type="button"
            className="vale-footer-mail vale-ui"
            onClick={() => setOpen(true)}
          >
            {site.newsletter.title}
          </button>
        </div>
      </div>
      <NewsletterDialog open={open} onClose={() => setOpen(false)} />
    </footer>
  )
}
