import Image from 'next/image'
import { ArrowUpRight, Eye } from 'lucide-react'
import { VcardNav } from '@/components/vcard/nav'
import {
  VcardMobileContacts,
  VcardSidebar,
} from '@/components/vcard/sidebar'
import { profile, projects, writings } from '@/lib/vcard/content'

export function VcardAbout() {
  return (
    <main className="vcard-main">
      <VcardSidebar />
      <div className="vcard-content">
        <article id="about" className="vcard-article vcard-anchor">
          <VcardNav />
          <h2 className="vcard-page-title">About Me</h2>
          <div className="vcard-bio">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <section id="work" className="vcard-anchor">
            <h2 className="vcard-section-title">Selected work</h2>
            <ul className="vcard-projects">
              {projects.map((project) => (
                <li key={project.title} className="vcard-project">
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
                </li>
              ))}
            </ul>
          </section>

          <section id="writing" className="vcard-anchor">
            <h2 className="vcard-section-title">Writing</h2>
            <ul className="vcard-writings">
              {writings.map((post) => (
                <li
                  key={post.title}
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
                </li>
              ))}
            </ul>
          </section>
        </article>
        <VcardMobileContacts />
      </div>
    </main>
  )
}
