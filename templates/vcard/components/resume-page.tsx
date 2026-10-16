import Image from 'next/image'
import { Briefcase, GraduationCap } from 'lucide-react'
import { VcardLink } from '@/components/link'
import { VcardShell } from '@/components/shell'
import {
  profile,
  resume,
  resumeSections,
  type VcardResume,
} from '@/lib/profile'

const SECTION_ICONS = {
  Education: GraduationCap,
  Experience: Briefcase,
} as const

export function VcardResumePage() {
  return (
    <VcardShell title="Resume">
      <div className="vcard-timeline">
        {resumeSections().map((section) => {
          const Icon = SECTION_ICONS[section.id]
          return (
            <section key={section.id}>
              <div className="vcard-timeline-heading">
                <span className="vcard-icon-box">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3>{section.title}</h3>
              </div>
              <ol className="vcard-timeline-list">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <ResumeCard item={item} />
                  </li>
                ))}
              </ol>
            </section>
          )
        })}
      </div>
    </VcardShell>
  )
}

function ResumeCard({ item }: { item: VcardResume }) {
  return (
    <VcardLink href={`/resume/${item.slug}`} className="vcard-resume-card">
      <span className="vcard-resume-card-inner">
        <span className="vcard-resume-logo">
          <Image
            src={item.image}
            alt=""
            width={40}
            height={40}
            className="vcard-avatar-img"
          />
        </span>
        <span className="vcard-resume-copy">
          <span className="vcard-resume-institution">{item.institution}</span>
          <span className="vcard-resume-role">{item.title}</span>
          <span className="vcard-tech">
            {item.tags.map((tag) => (
              <span key={tag} className="vcard-tag">
                {tag}
              </span>
            ))}
          </span>
        </span>
      </span>
    </VcardLink>
  )
}

export function VcardResumeDetail({ item }: { item: VcardResume }) {
  return (
    <VcardShell
      title={
        <VcardLink href="/resume" className="vcard-back">
          ← Back to Resume
        </VcardLink>
      }
    >
      <p className="vcard-detail-kicker">{item.section}</p>
      <h1 className="vcard-detail-title">{item.institution}</h1>
      <p className="vcard-detail-meta">
        {item.title}
        <span className="vcard-writing-dot" aria-hidden="true" />
        {item.period}
      </p>
      <div className="vcard-tech">
        {item.tags.map((tag) => (
          <span key={tag} className="vcard-tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="vcard-detail-body">
        {item.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="vcard-detail-byline">{profile.name}</p>
    </VcardShell>
  )
}

export function getResume(slug: string) {
  return resume.find((item) => item.slug === slug)
}
