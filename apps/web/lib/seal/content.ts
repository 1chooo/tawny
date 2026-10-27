export type SealMotif = 'disc' | 'ring' | 'overlap' | 'half' | 'rule' | 'dots'

export type SealLinkItem = {
  id: string
  label: string
  href: string
}

export type SealOffering = {
  index: string
  title: string
  body: string
}

export type SealStep = {
  index: string
  title: string
  body: string
}

export type SealProject = {
  slug: string
  title: string
  mark: string
  kind: string
  year: string
  summary: string
  body: string[]
  frame: string
  motif: SealMotif
  motifFilled?: number
}

/**
 * Sample studio copy for the Seal portfolio.
 * Replace the names, projects, and email in this file.
 */
export const site = {
  name: 'Seal',
  mark: '朱印',
  email: 'hello@example.com',
  nav: [
    { id: 'studio', label: 'Studio', href: '/#studio' },
    { id: 'practice', label: 'Practice', href: '/#practice' },
    { id: 'work', label: 'Work', href: '/#work' },
    { id: 'contact', label: 'Contact', href: '/#contact' },
  ] as SealLinkItem[],
  hero: {
    eyebrow: 'Editorial studio',
    title: '讓紙面留白',
    body: 'Seal is a one-person studio for books, marks, and posters. The sheet stays mostly empty. Red appears once.',
    cta: { label: 'See the work', href: '/#work' },
  },
  studio: {
    id: 'studio',
    number: '01',
    eyebrow: 'Studio',
    title: '一個人的社',
    body: [
      'Work starts on paper: a margin, a column, and a red that has to earn its place. The desk holds one piece at a time.',
      'Commissions stay small. A book, a mark, or a short run of posters, then a pause.',
    ],
    frame: 'The red is used once.',
  },
  practice: {
    id: 'practice',
    number: '02',
    eyebrow: 'Practice',
    title: '三件事情',
    items: [
      {
        index: '01',
        title: 'Books',
        body: 'Small publications, from a single signature to a short monograph. Type, grid, and the order of the pages.',
      },
      {
        index: '02',
        title: 'Marks',
        body: 'A name, a seal, and the few places it has to live. Stationery before a system.',
      },
      {
        index: '03',
        title: 'Posters',
        body: 'A short run of printed sheets. One idea, held still long enough to read.',
      },
    ] as SealOffering[],
  },
  process: {
    id: 'process',
    number: '03',
    eyebrow: 'Process',
    title: '四步成印',
    steps: [
      {
        index: '01',
        title: 'Listen',
        body: 'A conversation and a sentence that says what the piece is for.',
      },
      {
        index: '02',
        title: 'Compose',
        body: 'Type, margins, and a red used with intent. Most of the sheet stays empty.',
      },
      {
        index: '03',
        title: 'Proof',
        body: 'A printed proof on the desk. One change, then another look.',
      },
      {
        index: '04',
        title: 'Print',
        body: 'A short run. The file is the record. The sheet is the work.',
      },
    ] as SealStep[],
  },
  work: {
    id: 'work',
    number: '04',
    eyebrow: 'Selected work',
    title: '選定的作品',
  },
  contact: {
    id: 'contact',
    number: '05',
    eyebrow: 'Contact',
    title: '寫一封信',
    frame: 'A letter is enough.',
    body: 'Write with the piece you have in mind. A paragraph is enough to begin.',
    received: '已收到',
    receivedBody: 'Received. A reply will follow.',
  },
  close: {
    line: 'Print less. Mean it.',
  },
}

export const projects: SealProject[] = [
  {
    slug: 'field-guide',
    title: 'Field guide',
    mark: '田野筆記',
    kind: 'Book',
    year: '2024',
    summary: 'A pocket book for a walking club. Twelve plates, one map, and no photographs.',
    body: [
      'The club wanted a guide that could live in a coat pocket. Each plate is one walk, set in the same column, with the place name in the margin.',
      'The only color is a disc on the title page. Inside, the ink is charcoal.',
    ],
    frame: 'Twelve plates. One red.',
    motif: 'overlap',
  },
  {
    slug: 'harbor-mark',
    title: 'Harbor mark',
    mark: '港口印記',
    kind: 'Mark',
    year: '2025',
    summary: 'An identity for a small ferry. The mark is a circle cut by a wake.',
    body: [
      'The ferry needed a name that could be stamped, sewn, and printed on a ticket. The circle is the boat. The missing half is the water.',
      'Stationery came first: a card, a ticket, a stamp. The rest of the system can wait.',
    ],
    frame: 'The circle is the boat.',
    motif: 'half',
  },
  {
    slug: 'night-posters',
    title: 'Night posters',
    mark: '夜間海報',
    kind: 'Posters',
    year: '2025',
    summary: 'Three posters for a reading series. The column stays. The disc moves.',
    body: [
      'Each evening has its own sheet. The title runs down the left edge. A red disc marks the hour, lower each week.',
      'They were printed short. The series ended when the third sheet was on the wall.',
    ],
    frame: 'Same column. The disc moves.',
    motif: 'dots',
    motifFilled: 2,
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

/**
 * Characters baked into the subsetted Noto Serif TC file
 * (`fonts/noto-serif-tc-subset.woff2`). Regenerate that file when this set changes.
 */
export const sealDisplayCharacters =
  '一三不事人件作信個到印口品四報夜定寫封已情成找收朱步海港田留白的社筆紙記讓選野間面'

/** Chapter titles and project marks set in vertical type. */
export function verticalTitles() {
  return [
    site.hero.title,
    site.studio.title,
    site.practice.title,
    site.process.title,
    site.work.title,
    site.contact.title,
    site.contact.received,
    ...projects.map((project) => project.mark),
  ]
}
