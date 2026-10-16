import Image from 'next/image'
import { VcardLink } from '@/components/link'
import { VcardShell } from '@/components/shell'
import { profile, projects, type VcardProject } from '@/lib/profile'

export function VcardProjectDetail({ project }: { project: VcardProject }) {
  return (
    <VcardShell
      title={
        <VcardLink href="/project" className="vcard-back">
          ← Back to Project
        </VcardLink>
      }
    >
      <p className="vcard-detail-kicker">{project.category}</p>
      <h1 className="vcard-detail-title">{project.title}</h1>
      <div className="vcard-detail-author">
        <span className="vcard-detail-avatar">
          <Image
            src={profile.avatar}
            alt=""
            width={40}
            height={40}
            className="vcard-avatar-img"
          />
        </span>
        <span>
          {profile.name}
          <span className="vcard-detail-period">
            {project.start} — {project.end}
          </span>
        </span>
      </div>
      <div className="vcard-detail-cover">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(min-width: 960px) 720px, 100vw"
          priority
        />
      </div>
      <div className="vcard-detail-body">
        {project.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="vcard-detail-links">
        {project.links.map((link) => (
          <a
            key={link.label}
            className="vcard-detail-link"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </VcardShell>
  )
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
