import { projects, site } from '@/lib/seal/content'
import { ContactForm } from '@/components/seal/contact-form'
import { Motif } from '@/components/seal/motif'
import { SealLink } from '@/components/seal/seal-link'
import { SiteShell } from '@/components/seal/site-shell'

function Kicker({ number, children }: { number?: string; children: string }) {
  return (
    <p className="seal-kicker">
      {number ? <span className="seal-kicker-num">{number}</span> : null}
      {children}
    </p>
  )
}

export function HomePage() {
  return (
    <SiteShell>
      <section className="seal-poster seal-hero seal-reveal">
        <div>
          <Kicker>{site.hero.eyebrow}</Kicker>
          <div className="seal-poster-title">
            <h1 className="seal-title" lang="zh-Hant">
              {site.hero.title}
            </h1>
            <Motif name="disc" className="seal-motif-hero" />
          </div>
        </div>
        <div className="seal-poster-copy">
          <p>{site.hero.body}</p>
          <SealLink href={site.hero.cta.href} className="seal-action">
            <span className="seal-action-dot" aria-hidden="true" />
            {site.hero.cta.label}
          </SealLink>
        </div>
      </section>

      <section id={site.studio.id} className="seal-poster seal-reveal" aria-labelledby="studio-title">
        <div>
          <Kicker number={site.studio.number}>{site.studio.eyebrow}</Kicker>
          <div className="seal-poster-title">
            <h2 id="studio-title" className="seal-title" lang="zh-Hant">
              {site.studio.title}
            </h2>
            <Motif name="half" className="seal-motif-side" />
          </div>
        </div>
        <div className="seal-poster-copy">
          {site.studio.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <blockquote className="seal-frame">
            <p>{site.studio.frame}</p>
          </blockquote>
        </div>
      </section>

      <section id={site.practice.id} className="seal-poster seal-reveal" aria-labelledby="practice-title">
        <div>
          <Kicker number={site.practice.number}>{site.practice.eyebrow}</Kicker>
          <div className="seal-poster-title">
            <h2 id="practice-title" className="seal-title" lang="zh-Hant">
              {site.practice.title}
            </h2>
            <Motif name="dots" filled={1} className="seal-motif-side" />
          </div>
        </div>
        <div className="seal-poster-copy">
        <ol className="seal-offerings">
          {site.practice.items.map((item) => (
            <li key={item.index}>
              <p className="seal-index">{item.index}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
        </div>
      </section>

      <section id={site.process.id} className="seal-poster seal-reveal" aria-labelledby="process-title">
        <div>
          <Kicker number={site.process.number}>{site.process.eyebrow}</Kicker>
          <div className="seal-poster-title">
            <h2 id="process-title" className="seal-title" lang="zh-Hant">
              {site.process.title}
            </h2>
            <Motif name="rule" className="seal-motif-side" />
          </div>
        </div>
        <ol className="seal-steps seal-poster-copy">
          {site.process.steps.map((step) => (
            <li key={step.index} className="seal-step">
              <p className="seal-index">{step.index}</p>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id={site.work.id} className="seal-poster seal-reveal" aria-labelledby="work-title">
        <div>
          <Kicker number={site.work.number}>{site.work.eyebrow}</Kicker>
          <div className="seal-poster-title">
            <h2 id="work-title" className="seal-title" lang="zh-Hant">
              {site.work.title}
            </h2>
            <Motif name="overlap" className="seal-motif-side" />
          </div>
        </div>
        <div className="seal-poster-copy seal-work-list">
          {projects.map((project) => (
            <SealLink key={project.slug} href={`/work/${project.slug}`} className="seal-plate">
              <span className="seal-plate-mark" lang="zh-Hant">
                {project.mark}
              </span>
              <div>
                <p className="seal-index">
                  {project.year} · {project.kind}
                </p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
            </SealLink>
          ))}
        </div>
      </section>

      <section id={site.contact.id} className="seal-poster seal-reveal" aria-labelledby="contact-title">
        <div>
          <Kicker number={site.contact.number}>{site.contact.eyebrow}</Kicker>
          <div className="seal-poster-title">
            <h2 id="contact-title" className="seal-title" lang="zh-Hant">
              {site.contact.title}
            </h2>
            <Motif name="ring" className="seal-motif-side" />
          </div>
        </div>
        <div className="seal-poster-copy">
          <blockquote className="seal-frame">
            <p>{site.contact.frame}</p>
          </blockquote>
          <p>{site.contact.body}</p>
          <ContactForm />
        </div>
      </section>

      <section className="seal-close seal-reveal" aria-label="Close">
        <Motif name="disc" className="seal-motif-close" />
        <p>{site.close.line}</p>
      </section>
    </SiteShell>
  )
}
