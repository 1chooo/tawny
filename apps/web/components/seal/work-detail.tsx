import type { SealProject } from '@/lib/seal/content'
import { Motif } from '@/components/seal/motif'
import { SealLink } from '@/components/seal/seal-link'
import { SiteShell } from '@/components/seal/site-shell'

export function WorkDetail({ project }: { project: SealProject }) {
  return (
    <SiteShell>
      <article className="seal-poster seal-detail">
        <div>
          <SealLink href="/#work" className="seal-back">
            Work
          </SealLink>
          <p className="seal-kicker">
            <span className="seal-kicker-num">{project.year}</span>
            {project.kind}
          </p>
          <div className="seal-poster-title">
            <h1 className="seal-title" lang="zh-Hant">
              {project.mark}
            </h1>
            <Motif
              name={project.motif}
              filled={project.motifFilled}
              className="seal-motif-side"
            />
          </div>
        </div>
        <div className="seal-poster-copy">
          <p className="seal-project-name">{project.title}</p>
          <p>{project.summary}</p>
          {project.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <blockquote className="seal-frame">
            <p>{project.frame}</p>
          </blockquote>
        </div>
      </article>
    </SiteShell>
  )
}
