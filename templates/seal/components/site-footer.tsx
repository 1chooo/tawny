import { site } from '@/lib/content'

export function SiteFooter() {
  return (
    <footer className="seal-footer">
      <p>
        {site.name}
        <span className="seal-footer-mark" lang="zh-Hant">
          {site.mark}
        </span>
      </p>
      <a href={`mailto:${site.email}`}>{site.email}</a>
    </footer>
  )
}
