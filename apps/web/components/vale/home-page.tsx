import Image from 'next/image'
import { site } from '@/lib/vale/content'
import { CollectionBrowser } from '@/components/vale/collection-browser'
import { Emblem } from '@/components/vale/emblem'
import { ValeLink } from '@/components/vale/vale-link'

export function HomePage() {
  return (
    <>
      <section className="vale-intro">
        <Emblem />
        <h1 className="vale-hero-type">{site.hero.title}</h1>
        <p>{site.hero.body}</p>
      </section>
      <CollectionBrowser />
      <section className="vale-feature">
        <div className="vale-feature-copy">
          <p className="vale-kicker vale-ui">{site.featured.kicker}</p>
          <h2 className="vale-display">{site.featured.title}</h2>
          <p>{site.featured.body}</p>
          <ValeLink href={site.featured.href} className="vale-text-link vale-ui">
            {site.featured.linkLabel}
          </ValeLink>
        </div>
        <div className="vale-feature-media">
          <div className="vale-feature-photo">
            <Image
              src={site.featured.image}
              alt={site.featured.imageAlt}
              fill
              sizes="(max-width: 999px) 100vw, 60vw"
            />
          </div>
        </div>
      </section>
      <section className="vale-statement">
        <h2 className="vale-hero-type">{site.statement.title}</h2>
        <p>{site.statement.body}</p>
      </section>
    </>
  )
}
