'use client'

import Image from 'next/image'
import { ArrowUpRight, Eye, Mail, MapPin, Zap } from 'lucide-react'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { GithubIcon } from '@/components/vcard/github-icon'
import { posts, profile, projects, techStacks } from '@/lib/vcard/content'
import { cn } from '@tawny/ui/lib/utils'

const NAV = ['About', 'Resume', 'Project', 'Blog']

function LinkedinIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.84v2.12h.05c.53-1.01 1.84-2.12 3.79-2.12 4.06 0 4.81 2.67 4.81 6.15V24h-4v-6.86c0-1.64-.03-3.75-2.28-3.75-2.28 0-2.63 1.78-2.63 3.62V24h-4V8.5z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-4.71-6.23-5.4 6.23H2.74l7.73-8.84L2.25 2.25h6.83l4.25 5.62 4.91-5.62zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
    </svg>
  )
}

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
              <li className="vcard-contact">
                <span className="vcard-icon-box">
                  <LinkedinIcon />
                </span>
                <div className="vcard-contact-copy">
                  <p className="vcard-contact-label">LinkedIn</p>
                  <p className="vcard-contact-value">{profile.github}</p>
                </div>
              </li>
              <li className="vcard-contact">
                <span className="vcard-icon-box">
                  <XIcon />
                </span>
                <div className="vcard-contact-copy">
                  <p className="vcard-contact-label">Twitter</p>
                  <p className="vcard-contact-value">@{profile.github}</p>
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
              <p className="vcard-see-more">
                <span className="vcard-see-more-pill">
                  See More Projects
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </p>
            </section>
            <section>
              <h2 className="vcard-section-title">Writing</h2>
              <div className="vcard-writings-row">
                <div className="vcard-writings-column">
                  <ul className="vcard-writings">
                    {posts.slice(0, 2).map((post) => (
                      <li key={post.slug}>
                        <div className="vcard-writing vcard-gradient-card">
                          <div className="vcard-writing-body">
                            <h3 className="vcard-writing-title">
                              {post.title}
                              <svg
                                className="vcard-writing-arrow"
                                viewBox="0 0 13 15"
                                aria-hidden="true"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline
                                    className="vcard-writing-arrow-head"
                                    points="6 2.3 11.5 7.8 6 13.3"
                                  />
                                  <line
                                    className="vcard-writing-arrow-line"
                                    x1="11.5"
                                    y1="7.8"
                                    x2="1.5"
                                    y2="7.5"
                                  />
                                </g>
                              </svg>
                            </h3>
                            <p className="vcard-writing-excerpt">{post.excerpt}</p>
                            <p className="vcard-writing-meta">
                              <span>{post.date}</span>
                              <span className="vcard-writing-dot" aria-hidden="true" />
                              <span>{post.readingTime}</span>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="vcard-see-more">
                    <span className="vcard-see-more-pill">
                      ✨ View All My Writings
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </p>
                </div>
                <ul className="vcard-stacks">
                  {techStacks.map((group) => (
                    <li key={group.title} className="vcard-gradient-card">
                      <h3 className="vcard-stack-title">
                        <Zap size={16} aria-hidden="true" />
                        {group.title}
                      </h3>
                      <div className="vcard-tech">
                        {group.items.map((item) => (
                          <span key={item} className="vcard-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
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
