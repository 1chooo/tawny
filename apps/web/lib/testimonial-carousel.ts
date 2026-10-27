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
