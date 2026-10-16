import Image from 'next/image'
import { ArrowUpRight, Eye, Zap } from 'lucide-react'
import { VcardLink } from '@/components/link'
import { VcardShell } from '@/components/shell'
import { posts, profile, projects, techStacks } from '@/lib/profile'

export function VcardAbout() {
  return (
    <VcardShell title="About Me">
      <div className="vcard-bio">
        {profile.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section>
        <h2 className="vcard-section-title">Selected work</h2>
        <ul className="vcard-projects">
          {projects.map((project) => (
            <li key={project.slug} className="vcard-project">
              <VcardLink
                href={`/project/${project.slug}`}
                className="vcard-project-link"
              >
                <div className="vcard-project-media">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 960px) 240px, 100vw"
                  />
                  <span className="vcard-project-shade" aria-hidden="true" />
                  <span className="vcard-project-eye" aria-hidden="true">
                    <Eye size={20} />
                  </span>
                </div>
                <h3 className="vcard-project-title">{project.title}</h3>
              </VcardLink>
            </li>
          ))}
        </ul>
        <p className="vcard-see-more">
          <VcardLink href="/project" className="vcard-see-more-pill">
            See More Projects
            <ArrowUpRight size={14} aria-hidden="true" />
          </VcardLink>
        </p>
      </section>

      <section>
        <h2 className="vcard-section-title">Writing</h2>
        <div className="vcard-writings-row">
          <div className="vcard-writings-column">
            <ul className="vcard-writings">
            {posts.slice(0, 2).map((post) => (
              <li key={post.slug}>
                <VcardLink
                  href={`/blog/${post.slug}`}
                  className="vcard-writing vcard-gradient-card"
                >
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
                </VcardLink>
              </li>
            ))}
          </ul>
          <p className="vcard-see-more">
            <VcardLink href="/blog" className="vcard-see-more-pill">
              ✨ View All My Writings
              <ArrowUpRight size={14} aria-hidden="true" />
            </VcardLink>
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
    </VcardShell>
  )
}
