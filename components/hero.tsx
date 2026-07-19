import { ArrowRight, Sparkles } from 'lucide-react'

const stats = [
  { value: '40+', label: 'Designs' },
  { value: '120+', label: 'Components' },
  { value: '8k+', label: 'Downloads' },
]

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex items-center justify-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-muted text-brand text-xs font-medium border border-brand/20">
            <Sparkles size={12} />
            Handcrafted web designs & components
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center font-bold text-5xl md:text-7xl leading-[1.08] tracking-tight text-foreground text-balance mx-auto max-w-4xl">
          Designs that make{' '}
          <span className="text-brand">your projects</span>{' '}
          stand out
        </h1>

        <p className="mt-6 text-center text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
          A curated collection of premium web templates and reusable UI components.
          Free to explore, ready to ship.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#designs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity"
          >
            Browse Designs
            <ArrowRight size={15} />
          </a>
          <a
            href="#components"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
          >
            View Components
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex items-center justify-center gap-12 md:gap-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Divider marker */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            Selected Works
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
      </div>
    </section>
  )
}
