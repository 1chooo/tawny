import { SiteShell } from '@/components/site-shell'
import { SealLink } from '@/components/seal-link'

export function SealMissing() {
  return (
    <SiteShell>
      <section className="seal-poster seal-missing">
        <p className="seal-kicker">Missing</p>
        <h1 className="seal-title" lang="zh-Hant">
          找不到
        </h1>
        <SealLink href="/" className="seal-action">
          <span className="seal-action-dot" aria-hidden="true" />
          Back to Seal
        </SealLink>
      </section>
    </SiteShell>
  )
}
