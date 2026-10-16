'use client'

import Image from 'next/image'
import { Eye, Mail, MapPin } from 'lucide-react'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { GithubIcon } from '@/components/vcard/github-icon'
import { profile, projects } from '@/lib/vcard/content'
import { cn } from '@tawny/ui/lib/utils'

const NAV = ['About', 'Resume', 'Project', 'Blog']

/**
 * Desktop crop of the vcard home. Same chrome as the live page, with no
 * links, so the landing and catalog previews cannot navigate away.
 * The canvas is wider than 1200px so the centered page margin stays visible.
 */
function VcardPreviewSurface() {
  return (
    <div className="vcard-root h-full overflow-hidden">
      <main className="vcard-main">
        <aside className="vcard-sidebar">
          <div className="vcard-identity">
            <div className="vcard-avatar">
              <Image
                src={profile.avatar}
                alt=""
                width={150}
                height={150}
                className="vcard-avatar-img"
              />
            </div>
            <div>
              <p className="vcard-name">{profile.name}</p>
              <p className="vcard-status">{profile.status}</p>
            </div>
          </div>
          <div className="vcard-sidebar-more">
            <div className="vcard-separator" />
            <ul className="vcard-contacts">
              <li className="vcard-contact">
                <span className="vcard-icon-box">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <div className="vcard-contact-copy">
                  <p className="vcard-contact-label">Location</p>
                  <p className="vcard-contact-value">{profile.city}</p>
                </div>
              </li>
              <li className="vcard-contact">
                <span className="vcard-icon-box">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <div className="vcard-contact-copy">
                  <p className="vcard-contact-label">Email</p>
                  <p className="vcard-contact-value">{profile.email}</p>
                </div>
              </li>
              <li className="vcard-contact">
                <span className="vcard-icon-box">
                  <GithubIcon />
                </span>
                <div className="vcard-contact-copy">
                  <p className="vcard-contact-label">GitHub</p>
                  <p className="vcard-contact-value">{profile.github}</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        <div className="vcard-content">
          <article className="vcard-article">
            <nav className="vcard-nav" aria-hidden="true">
              <ul className="vcard-nav-list">
                {NAV.map((label) => (
                  <li key={label}>
                    <span
                      className={cn(
                        'vcard-nav-link',
                        label === 'About' && 'is-active',
                      )}
                    >
                      {label}
                      {label === 'About' ? (
                        <span className="vcard-nav-line" />
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
            <h2 className="vcard-page-title">About Me</h2>
            <div className="vcard-bio">
              {profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <section>
              <h2 className="vcard-section-title">Selected work</h2>
              <ul className="vcard-projects">
                {projects.map((project) => (
                  <li key={project.title} className="vcard-project">
                    <div className="vcard-project-media">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="240px"
                      />
                      <span className="vcard-project-shade" />
                      <span className="vcard-project-eye">
                        <Eye size={20} />
                      </span>
                    </div>
                    <h3 className="vcard-project-title">{project.title}</h3>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </main>
    </div>
  )
}

type VcardPreviewMockProps = {
  className?: string
}

export function VcardPreviewMock({ className }: VcardPreviewMockProps) {
  return (
    <div
      role="img"
      aria-label="VCard design preview"
      className={cn('h-full select-none', className)}
      onClick={(event) => event.preventDefault()}
      onKeyDown={(event) => event.preventDefault()}
    >
      <ScaledDesignCanvas width={1440} height={810}>
        <VcardPreviewSurface />
      </ScaledDesignCanvas>
    </div>
  )
}
