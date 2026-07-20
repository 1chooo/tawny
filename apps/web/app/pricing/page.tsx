import { Check, ArrowUpRight } from 'lucide-react'
import { BlurFade } from '@tawny/ui/components/blur-fade'
import { BorderBeam } from '@tawny/ui/components/border-beam'
import { NoiseTexture } from '@tawny/ui/components/noise-texture'
import { ShimmerButton } from '@tawny/ui/components/shimmer-button'
import { cn } from '@tawny/ui/lib/utils'

interface PricingTier {
  id: string
  name: string
  price: number | 'Free'
  period: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
}

const tiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Great for exploring and personal projects.',
    features: [
      '6 free design templates',
      '3 free component sets',
      'Community license',
      'MIT licensed code',
      'Next.js + Tailwind',
    ],
    cta: 'Get started free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    period: 'one-time',
    description: 'Everything you need to ship production-ready projects.',
    features: [
      'All 40+ design templates',
      'All 120+ components',
      'Commercial license',
      'Figma source files',
      'Lifetime updates',
      'Priority support',
    ],
    cta: 'Get Pro',
    highlighted: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: 249,
    period: 'one-time',
    description: 'For agencies and teams shipping multiple projects.',
    features: [
      'Everything in Pro',
      'Up to 10 developers',
      'Extended team license',
      'White-label rights',
      'Slack community access',
      'Custom component requests',
    ],
    cta: 'Get Team',
  },
]

const faqs = [
  {
    q: 'Is the license perpetual?',
    a: 'Yes. All purchases are one-time with lifetime access to the version you buy, plus all future updates at no additional cost.',
  },
  {
    q: 'Can I use these in client projects?',
    a: 'Pro and Team licenses include a commercial license, so you can use them in any number of client projects.',
  },
  {
    q: 'What stack do the templates use?',
    a: 'All templates are built with Next.js 15+, Tailwind CSS v4, TypeScript, and shadcn/ui. Figma source files are included with Pro.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Yes. If you are not satisfied within 14 days of purchase, we will issue a full refund, no questions asked.',
  },
]

export default function PricingPage() {
  return (
    <div className="relative min-h-screen px-6 pt-28 pb-24">
      <NoiseTexture opacity={0.025} />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <BlurFade delay={0.05}>
          <div className="mb-16 text-center">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.15em] mb-3">Pricing</p>
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl text-balance">
              Simple, one-time pricing
            </h1>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto text-pretty leading-relaxed">
              No subscriptions, no recurring fees. Pay once, own it forever.
            </p>
          </div>
        </BlurFade>

        {/* Tiers */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <BlurFade key={tier.id} delay={0.1 + i * 0.08} inView>
              <div
                className={cn(
                  'relative flex flex-col rounded-2xl border overflow-hidden h-full',
                  tier.highlighted
                    ? 'border-white/20 bg-white/[0.06]'
                    : 'border-white/8 bg-white/[0.03]'
                )}
              >
                {tier.highlighted && (
                  <>
                    <BorderBeam size={180} duration={10} colorFrom="rgba(255,255,255,0.5)" colorTo="transparent" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-foreground text-background text-[11px] font-semibold uppercase tracking-wider">
                      Most popular
                    </div>
                  </>
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* Tier name + price */}
                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">{tier.name}</p>
                    <div className="flex items-end gap-1.5">
                      {tier.price === 'Free' ? (
                        <span className="text-4xl font-semibold tracking-tight text-foreground">Free</span>
                      ) : (
                        <>
                          <span className="text-4xl font-semibold tracking-tight text-foreground">${tier.price}</span>
                          <span className="text-sm text-muted-foreground mb-1">{tier.period}</span>
                        </>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tier.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 flex-1 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <Check size={14} className="mt-0.5 shrink-0 text-foreground/50" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {tier.highlighted ? (
                    <ShimmerButton
                      background="rgba(255,255,255,1)"
                      shimmerColor="rgba(0,0,0,0.12)"
                      className="w-full justify-center !text-black text-sm font-medium"
                    >
                      {tier.cta}
                      <ArrowUpRight size={14} />
                    </ShimmerButton>
                  ) : (
                    <button className="w-full rounded-full border border-white/10 py-2.5 text-sm font-medium text-foreground/70 transition-all hover:border-white/20 hover:text-foreground">
                      {tier.cta}
                    </button>
                  )}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* FAQ */}
        <BlurFade delay={0.4} inView>
          <div className="mt-24">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-8 text-center">Frequently asked questions</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-white/8 bg-white/[0.03] p-6">
                  <h3 className="text-sm font-medium text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  )
}
