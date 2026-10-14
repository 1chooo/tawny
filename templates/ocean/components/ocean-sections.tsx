import type { MouseEvent } from 'react'
import { site } from '@/lib/content'
import { Marquee } from './marquee'

export function OceanNav({
  onNavigate,
}: {
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <header className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10">
      <a
        href="#top"
        onClick={onNavigate}
        className="ocean-display text-2xl tracking-wide text-(--ocean-ink)"
      >
        {site.name}
      </a>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-5 text-sm text-(--ocean-muted) md:gap-8">
          {site.nav.map((item) => (
            <li key={item.href} className="hidden sm:block">
              <a
                href={item.href}
                onClick={onNavigate}
                className="transition-colors hover:text-(--ocean-ink)"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={onNavigate}
              className="rounded-full border border-(--ocean-faint) px-4 py-1.5 text-(--ocean-ink) transition-colors hover:border-(--ocean-accent) hover:text-(--ocean-accent)"
            >
              Say hello
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

function Kicker({ children }: { children: string }) {
  return (
    <p
      data-reveal
      className="mb-6 font-mono text-xs tracking-[0.25em] text-(--ocean-accent) uppercase"
    >
      {children}
    </p>
  )
}

export function OceanSections() {
  return (
    <main className="relative z-10">
      <section
        id="top"
        data-creature="0"
        className="ocean-section flex items-end px-6 pt-32 pb-16 md:px-10 md:pb-24"
      >
        <div className="mx-auto w-full max-w-7xl">
          <p
            data-hero-kicker
            className="mb-6 font-mono text-xs tracking-[0.25em] text-(--ocean-accent) uppercase"
          >
            {site.hero.kicker}
          </p>
          <h1
            data-hero-title
            className="ocean-display ocean-text-shadow max-w-[9ch] text-[clamp(3.5rem,14cqw,11rem)]"
          >
            {site.hero.title}
          </h1>
          <p
            data-hero-description
            className="ocean-text-shadow mt-8 max-w-md text-base leading-relaxed text-(--ocean-muted) md:text-lg"
          >
            {site.hero.description}
          </p>
        </div>
      </section>

      <section
        id="studio"
        data-creature="1"
        className="ocean-section flex items-center px-6 py-24 md:px-10"
      >
        <div className="mx-auto grid w-full max-w-7xl md:grid-cols-2">
          <div className="md:col-start-2">
            <Kicker>{site.studio.kicker}</Kicker>
            <h2
              data-split
              className="ocean-display ocean-text-shadow text-[clamp(2.75rem,7cqw,6rem)]"
            >
              {site.studio.title}
            </h2>
            {site.studio.body.map((paragraph) => (
              <p
                key={paragraph}
                data-reveal
                className="ocean-text-shadow mt-6 max-w-lg leading-relaxed text-(--ocean-muted)"
              >
                {paragraph}
              </p>
            ))}
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-(--ocean-faint) pt-8">
              {site.studio.stats.map((stat) => (
                <div key={stat.label} data-reveal>
                  <dt className="text-xs tracking-widest text-(--ocean-muted) uppercase">
                    {stat.label}
                  </dt>
                  <dd className="ocean-display mt-2 text-4xl text-(--ocean-ink) md:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        id="work"
        data-creature="2"
        className="ocean-section flex items-center px-6 py-24 md:px-10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-xl">
            <Kicker>{site.work.kicker}</Kicker>
            <h2
              data-split
              className="ocean-display ocean-text-shadow text-[clamp(2.75rem,7cqw,6rem)]"
            >
              {site.work.title}
            </h2>
            <ol className="mt-12 flex flex-col">
              {site.work.items.map((item, i) => (
                <li
                  key={item.title}
                  data-reveal
                  className="grid grid-cols-[3rem_1fr] gap-4 border-t border-(--ocean-faint) py-6"
                >
                  <span className="font-mono text-xs text-(--ocean-accent)">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-2xl font-medium text-(--ocean-ink)">
                      {item.title}
                    </h3>
                    <p className="ocean-text-shadow mt-2 leading-relaxed text-(--ocean-muted)">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        id="craft"
        data-creature="2"
        className="ocean-section flex flex-col justify-center py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <Kicker>{site.craft.kicker}</Kicker>
        </div>
        <p className="sr-only">{site.craft.marquee}</p>
        <div aria-hidden="true" className="flex flex-col gap-4">
          <Marquee
            text={site.craft.marquee}
            duration={46}
            className="ocean-display text-[clamp(3rem,11cqw,9rem)] text-(--ocean-ink)"
          />
          <Marquee
            text={site.craft.marquee}
            duration={52}
            reverse
            className="ocean-display text-[clamp(3rem,11cqw,9rem)] text-transparent [-webkit-text-stroke:1px_var(--ocean-muted)]"
          />
        </div>
        <div className="mx-auto mt-20 grid w-full max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4 md:px-10">
          {site.craft.columns.map((column) => (
            <div key={column.title} data-reveal>
              <h3 className="mb-4 border-b border-(--ocean-faint) pb-4 text-2xl font-medium">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2 text-(--ocean-muted)">
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        data-creature="3"
        className="ocean-section mb-0! flex items-end px-6 pt-24 pb-16 md:px-10"
      >
        <div className="mx-auto w-full max-w-7xl text-center">
          <Kicker>{site.contact.kicker}</Kicker>
          <h2
            data-split
            className="ocean-display ocean-text-shadow text-[clamp(3rem,10cqw,8.5rem)]"
          >
            {site.contact.title}
          </h2>
          <p
            data-reveal
            className="ocean-text-shadow mx-auto mt-6 max-w-md leading-relaxed text-(--ocean-muted)"
          >
            {site.contact.body}
          </p>
          <a
            data-reveal
            href={`mailto:${site.email}`}
            className="group mt-10 inline-flex items-center gap-3 text-[clamp(1.5rem,4cqw,3rem)] font-light text-(--ocean-ink) transition-colors hover:text-(--ocean-accent)"
          >
            {site.email}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[0.8em] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  )
}

export function OceanFooter() {
  return (
    <footer className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 border-t border-(--ocean-faint) px-6 py-8 text-xs text-(--ocean-muted) md:flex-row md:items-center md:justify-between md:px-10">
      <p>
        © {new Date().getFullYear()} {site.name} — {site.tagline}
      </p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {site.credits.map((credit) => (
          <li key={credit.href}>
            <a
              href={credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-(--ocean-ink) hover:underline"
            >
              {credit.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
