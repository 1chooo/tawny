export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  company: string
  /** Illustrated placeholder portrait. Not a photograph. */
  avatar: string
  /** Monochrome mark placeholder. Not a customer logo. */
  companyLogo: string
}

/**
 * Original Tawny quotes. Portraits and marks are drawn placeholders in
 * `public/images/testimonials/`, not photos or real company logos.
 */
export const testimonialCarousel: Testimonial[] = [
  {
    id: 'atelier',
    quote:
      'Tawny gave us a homepage that felt finished on the first day. We shipped the journal, swapped in our own copy, and spent the week on the work.',
    name: 'Maya Chen',
    role: 'Design lead',
    company: 'Atelier North',
    avatar: '/images/testimonials/maya-chen.svg',
    companyLogo: '/images/testimonials/atelier-north.svg',
  },
  {
    id: 'harbor',
    quote:
      'The components stay quiet in the best way. Lists, headers, and frames sit in one system, so a new page does not look like a different product.',
    name: 'Jonah Ellis',
    role: 'Founder',
    company: 'Harbor & Co',
    avatar: '/images/testimonials/jonah-ellis.svg',
    companyLogo: '/images/testimonials/harbor-and-co.svg',
  },
  {
    id: 'fieldnote',
    quote:
      'We replaced three one-off marketing pages with Tawny designs and kept our own content model intact. The type, the spacing, and the motion already agreed with each other, which is the part that usually takes a sprint of restyling. Our team reviews the live demo, scaffolds a copy, and edits the words from there. The frame stays put, even when a quote needs another line or two to finish the thought.',
    name: 'Priya Raman',
    role: 'Staff engineer',
    company: 'Fieldnote',
    avatar: '/images/testimonials/priya-raman.svg',
    companyLogo: '/images/testimonials/fieldnote.svg',
  },
  {
    id: 'kiln',
    quote:
      'I wanted a shop that still felt like a studio. Cobalt was the closest thing to handing someone a finished storefront and saying, start here.',
    name: 'Leo Park',
    role: 'Creative director',
    company: 'Kiln Studio',
    avatar: '/images/testimonials/leo-park.svg',
    companyLogo: '/images/testimonials/kiln-studio.svg',
  },
  {
    id: 'paper',
    quote:
      'The previews are the actual layouts, not screenshots of them. That saved us a round of asking whether the live page would really look like the picture.',
    name: 'Amira Solano',
    role: 'Product designer',
    company: 'Paper Route',
    avatar: '/images/testimonials/amira-solano.svg',
    companyLogo: '/images/testimonials/paper-route.svg',
  },
  {
    id: 'lumen',
    quote:
      'Desk was the first dashboard we did not have to reskin before a stakeholder meeting. We changed the sample data and left the frame alone.',
    name: 'Chris Adelayo',
    role: 'Engineering manager',
    company: 'Lumen Desk',
    avatar: '/images/testimonials/chris-adelayo.svg',
    companyLogo: '/images/testimonials/lumen-desk.svg',
  },
]

export const TESTIMONIAL_AUTOPLAY_MS = 7000
export const TESTIMONIAL_MOVE_MS = 700
export const TESTIMONIAL_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/** Card, hairline, and ink. Resolved on the element so light and dark both apply. */
export const testimonialThemeVars = {
  '--t-card': 'var(--accent)',
  '--t-line': 'color-mix(in srgb, var(--foreground) 12%, transparent)',
  '--t-fill': 'color-mix(in srgb, var(--foreground) 58%, transparent)',
  '--t-soft': 'color-mix(in srgb, var(--foreground) 58%, transparent)',
  '--t-body': 'color-mix(in srgb, var(--foreground) 80%, transparent)',
  '--t-dot': 'color-mix(in srgb, var(--foreground) 22%, transparent)',
} as const

export function wrapIndex(index: number, count: number) {
  return ((index % count) + count) % count
}

/** Signed distance from the active slide, wrapped so the short way wins. */
export function slideOffset(index: number, active: number, count: number) {
  let offset = (index - active + count) % count
  if (offset > count / 2) offset -= count
  return offset
}

/** Signed distance, unwrapped. The ends stay on the long side of zero. */
export function rawOffset(index: number, active: number) {
  return index - active
}

export type SlideMotion = {
  transform: string
  opacity: number
  zIndex: number
  pointerEvents: 'auto' | 'none'
}

/** Where a card sits for a signed offset. The live carousel uses these poses. */
export function slideMotion(offset: number): SlideMotion {
  if (offset === 0) {
    return {
      transform: 'translateX(0) scale(1)',
      opacity: 1,
      zIndex: 2,
      pointerEvents: 'auto',
    }
  }
  if (offset === 1) {
    return {
      transform: 'translateX(102.564%) scale(0.97)',
      opacity: 1,
      zIndex: 1,
      pointerEvents: 'auto',
    }
  }
  if (offset === -1) {
    return {
      transform: 'translateX(-33.333%) scale(0.97)',
      opacity: 0,
      zIndex: 1,
      pointerEvents: 'none',
    }
  }
  if (offset > 1) {
    return {
      transform: 'translateX(133.333%) scale(0.97)',
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }
  }
  return {
    transform: 'translateX(-40%) scale(0.97)',
    opacity: 0,
    zIndex: 0,
    pointerEvents: 'none',
  }
}

/** 1 moves to the next quote, −1 to the previous. Null is a scroll or a tap. */
export function swipeDirection(dx: number, dy: number): -1 | 1 | null {
  if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return null
  return dx < 0 ? 1 : -1
}
