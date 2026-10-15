import { coverImages } from '@/lib/vcard/content'

export type VcardLifestyle = {
  title: string
  text: string
  icon: 'pencil' | 'camera'
}

export type VcardPhoto = {
  src: string
  title: string
  alt: string
}

export type VcardTestimonial = {
  id: number
  name: string
  image: string
  date: string
  text: string
}

export const lifestyles: VcardLifestyle[] = [
  {
    title: 'Field notes',
    text: 'Short writeups from weekend builds, kept as a running log.',
    icon: 'pencil',
  },
  {
    title: 'Walks',
    text: 'A camera comes along for ridgelines, campuses, and city blocks.',
    icon: 'camera',
  },
]

export const photos: VcardPhoto[] = [
  {
    src: coverImages.one,
    title: 'Courtyard',
    alt: 'Cover crop titled Courtyard',
  },
  {
    src: coverImages.two,
    title: 'Studio',
    alt: 'Cover crop titled Studio',
  },
  {
    src: coverImages.three,
    title: 'Paper',
    alt: 'Cover crop titled Paper',
  },
  {
    src: coverImages.one,
    title: 'Evening',
    alt: 'Cover crop titled Evening',
  },
  {
    src: coverImages.two,
    title: 'Shelf',
    alt: 'Cover crop titled Shelf',
  },
]

export const testimonials: VcardTestimonial[] = [
  {
    id: 1,
    name: 'Mina Ortiz',
    image: coverImages.one,
    date: '12 March, 2024',
    text: 'A short quote so the card can show the clamped excerpt and open the detail view when someone wants the rest of the sentence.',
  },
  {
    id: 2,
    name: 'Jules Park',
    image: coverImages.two,
    date: '4 January, 2024',
    text: 'A second card sits beside the first and keeps the row from looking empty. The full note stays in the dialog.',
  },
  {
    id: 3,
    name: 'Sam Adeyemi',
    image: coverImages.three,
    date: '18 November, 2023',
    text: 'A third card runs past the edge so the horizontal scrollbar has somewhere to go, and the modal can show this whole paragraph.',
  },
]
