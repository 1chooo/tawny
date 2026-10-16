import Image from 'next/image'
import { ArrowUpRight, Eye } from 'lucide-react'
import { VcardLink } from '@/components/link'
import { VcardShell } from '@/components/shell'
import { posts, profile, projects } from '@/lib/profile'

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
      </section>

      <section>
        <h2 className="vcard-section-title">Writing</h2>
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
                    <ArrowUpRight
                      className="vcard-writing-arrow"
                      size={14}
                      aria-hidden="true"
                    />
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
      </section>
    </VcardShell>
  )
}
