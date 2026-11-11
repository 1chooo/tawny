import Image from 'next/image'
import { faqItems, site, studioPage } from '@/lib/content'

export function StudioPage() {
  return (
    <article className="vale-info">
      <div className="vale-info-text">
        <h1 className="vale-display">Information</h1>
        <div className="vale-prose">
          {studioPage.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
      <div className="vale-info-art">
        <Image
          src={studioPage.image}
          alt={studioPage.imageAlt}
          fill
          sizes="(max-width: 999px) 100vw, 50vw"
        />
      </div>
    </article>
  )
}

export function FaqPage() {
  return (
    <article className="vale-faq">
      <h1 className="vale-display">FAQ</h1>
      <div className="vale-faq-list">
        {faqItems.map((item) => (
          <section key={item.question}>
            <h2 className="vale-display">{item.question}</h2>
            <p>{item.answer}</p>
          </section>
        ))}
      </div>
    </article>
  )
}

export function ShippingPage() {
  return (
    <article className="vale-doc">
      <h1 className="vale-display">{site.shipping.title}</h1>
      <div className="vale-prose">
        <h2 className="vale-display">{site.shipping.shippingTitle}</h2>
        {site.shipping.shipping.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h2 className="vale-display">{site.shipping.returnsTitle}</h2>
        {site.shipping.returns.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
