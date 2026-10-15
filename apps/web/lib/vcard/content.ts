export type VcardProfile = {
  name: string
  status: string
  city: string
  email: string
  github: string
  avatar: string
  bio: string[]
}

export type VcardProject = {
  title: string
  image: string
  alt: string
}

export type VcardWriting = {
  title: string
  excerpt: string
  date: string
  readingTime: string
}

export const coverImages = {
  one: '/images/art-gallery/cover-1.png',
  two: '/images/art-gallery/cover-2.png',
  three: '/images/art-gallery/cover-3.png',
} as const

export const profile: VcardProfile = {
  name: 'Avery Chen',
  status: 'Open to work',
  city: 'Portland, OR',
  email: 'avery@example.com',
  github: 'averychen',
  avatar: coverImages.one,
  bio: [
    'Avery Chen builds quiet web tools and keeps a short log of how they came together.',
    'Most weeks split between a studio project and a walk with a camera. The notes below are the ones worth keeping.',
  ],
}

export const projects: VcardProject[] = [
  {
    title: 'Field notes',
    image: coverImages.one,
    alt: 'Cover image for Field notes',
  },
  {
    title: 'Night studio',
    image: coverImages.two,
    alt: 'Cover image for Night studio',
  },
  {
    title: 'Paper trail',
    image: coverImages.three,
    alt: 'Cover image for Paper trail',
  },
]

export const writings: VcardWriting[] = [
  {
    title: 'A notebook that stays out of the way',
    excerpt:
      'How a small writing layout keeps the title, the date, and one paragraph in view.',
    date: 'Mar 12, 2024',
    readingTime: '4 min read',
  },
  {
    title: 'Trails, typed up after the fact',
    excerpt:
      'A second card so the list can show spacing, hover, and the date row.',
    date: 'Jan 4, 2024',
    readingTime: '6 min read',
  },
]
