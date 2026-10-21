export interface Design {
  id: string
  title: string
  description: string
  /** Longer explanation shown below the live demo */
  longDescription: string[]
  category: string
  price: number | 'free'
  tags: string[]
  /** Live demo path inside Tawny (ProductFrame + docs) */
  demoPath: string
  /** Full-site preview path (new tab, no Tawny chrome) */
  viewPath: string
  /** npm create package name (may be mock / unpublished) */
  packageName: string
  /** Paths relative to templates/<id>/ shown in the source viewer */
  sourceFiles: string[]
  /** Generated screenshot shown on catalog/landing cards instead of the inert mock, once captured */
  thumbnail?: string
  /** Route to screenshot when it differs from viewPath (e.g. a locale-prefixed route); falls back to viewPath */
  screenshotPath?: string
  /** Design ships its own in-demo theme toggle, independent of Tawny's global theme */
  hasThemeSwitch?: boolean
}

export const designs: Design[] = [
  {
    id: 'art',
    title: 'Art',
    description:
      'A bilingual bento journal with MDX notes, projects, and interactive demos — open the live showcase.',
    longDescription: [
      'Art is a bilingual personal journal built around a brutalist bento home grid. It ships with MDX notes and projects, next-intl for English and Chinese, and interactive tiles — weather, location globe, image and tag carousels.',
      'Use the live demo above to explore the full experience inside Tawny. When you are ready to start from the same foundation, scaffold a copy with the create command below, then replace the placeholder author details and sample content.',
    ],
    category: 'Journal',
    price: 'free',
    tags: ['Next.js', 'MDX', 'Bento', 'i18n'],
    demoPath: '/designs/art',
    viewPath: '/view/art',
    screenshotPath: '/view/art/en',
    packageName: 'create-tawny',
    sourceFiles: ['package.json', 'README.md', 'app/[locale]/page.tsx'],
    thumbnail: '/thumbnails/designs/art.webp',
  },
  {
    id: 'dev',
    title: 'Dev',
    description:
      'A minimal mono developer blog with MDX essays and interactive CS demos — open the live showcase.',
    longDescription: [
      'Dev is a minimal mono developer blog focused on readable essays and interactive demos. It uses MDX for content, Shiki for syntax highlighting, and a tight typographic system inspired by classic engineer personal sites.',
      'Navigate the live demo above to read sample posts and try the demos. Scaffold your own copy with the create command below, then swap in your name, social links, and writing.',
    ],
    category: 'Blog',
    price: 'free',
    tags: ['Next.js', 'MDX', 'Mono', 'Demos'],
    demoPath: '/designs/dev',
    viewPath: '/view/dev',
    packageName: 'create-tawny',
    sourceFiles: ['package.json', 'README.md', 'app/page.tsx'],
    thumbnail: '/thumbnails/designs/dev.webp',
    hasThemeSwitch: true,
  },
  {
    id: 'link',
    title: 'Link',
    description:
      'A minimal personal link-in-bio page with profile, social links, and a short tagline — open the live showcase.',
    longDescription: [
      'Link is a single-page link-in-bio template inspired by classic personal link pages. It ships with a profile avatar popup, serif link buttons, and a short italic tagline — ready to customize with your own name, bio, and URLs.',
      'Use the live demo above to try the interactions inside Tawny. When you are ready to start from the same foundation, scaffold a copy with the create command below, then swap in your links and profile details.',
    ],
    category: 'Links',
    price: 'free',
    tags: ['Next.js', 'Linktree', 'Minimal'],
    demoPath: '/designs/link',
    viewPath: '/view/link',
    packageName: 'create-tawny',
    sourceFiles: ['package.json', 'README.md', 'app/page.tsx'],
    thumbnail: '/thumbnails/designs/link.webp',
  },
  {
    id: 'ocean',
    title: 'Ocean',
    description:
      'A scroll-driven WebGL landing page where a particle whale, sea turtle, jellyfish, and manta ray morph into one another — open the live showcase.',
    longDescription: [
      'Ocean is a single-page studio landing built around a Three.js particle field. Each creature is a glTF model sampled into the same number of points, and a custom shader morphs between them as you scroll, with ocean currents, bioluminescent shimmer, and a cursor ripple layered on top.',
      'Scroll the live demo above to dive through all four creatures. Scaffold your own copy with the create command below, then swap in your studio copy — or drop in your own glTF models and tune their pose in lib/content.ts.',
    ],
    category: 'Landing',
    price: 'free',
    tags: ['Next.js', 'Three.js', 'GSAP', 'WebGL'],
    demoPath: '/designs/ocean',
    viewPath: '/view/ocean',
    packageName: 'create-tawny',
    sourceFiles: [
      'package.json',
      'README.md',
      'lib/particles/scene.ts',
      'lib/particles/shaders.ts',
    ],
    thumbnail: '/thumbnails/designs/ocean.webp',
  },
  {
    id: 'board',
    title: 'Board',
    description:
      'An issue dashboard on a 4px grid — 16px icons, labels and ids on the left, numbers and dates on the right.',
    longDescription: [
      'Board is a single-page issue dashboard you can use. Sidebar views filter the list, Filter narrows by status, and Display switches between the aligned list and a three-column board.',
      'Select a row to change its status, or create an issue from the button and the command palette. Scaffold a copy with the create command below, then replace the sample issues with your own.',
    ],
    category: 'Dashboard',
    price: 'free',
    tags: ['Next.js', 'Dashboard', 'Issues'],
    demoPath: '/designs/board',
    viewPath: '/view/board',
    packageName: 'create-tawny',
    sourceFiles: ['package.json', 'README.md', 'app/page.tsx'],
  },
  {
    id: 'vcard',
    title: 'VCard',
    description:
      'A dark personal vcard with a profile sidebar, selected work, and short notes — open the live showcase.',
    longDescription: [
      'VCard is a single-page personal site: a sticky profile card, an about article, three project covers, and two writing notes. The dark sidebar and gold accent follow the classic vcard portfolio layout.',
      'Use the live demo above to open Resume, Project, and Blog, then a detail page from a card. Scaffold a copy with the create command below, then replace the name, contacts, and sample pages in lib/profile.ts.',
    ],
    category: 'Portfolio',
    price: 'free',
    tags: ['Next.js', 'Portfolio', 'Sidebar'],
    demoPath: '/designs/vcard',
    viewPath: '/view/vcard',
    packageName: 'create-tawny',
    sourceFiles: ['package.json', 'README.md', 'app/page.tsx', 'lib/profile.ts'],
  },
  {
    id: 'mug',
    title: 'Mug',
    description:
      'A ceramics studio for Jane Mug — home, sign-in, and a sales dashboard. Open the live showcase.',
    longDescription: [
      'Mug is a small-batch ceramics studio. The home introduces Jane, the sign-in keeps the kiln photograph, and the sales board shows revenue, restock, and customers.',
      'Open the bag, sign in, or visit the studio admin from the page. The same dashboard is also listed on its own as Admin. Scaffold a copy with the create command below, then replace the photos and the sample sales.',
    ],
    category: 'Shop',
    price: 'free',
    tags: ['Next.js', 'Shop', 'Dashboard'],
    demoPath: '/designs/mug',
    viewPath: '/view/mug',
    packageName: 'create-tawny',
    sourceFiles: ['package.json', 'README.md', 'app/page.tsx'],
  },
  {
    id: 'admin',
    title: 'Admin',
    description:
      'The Jane Mug sales dashboard — revenue, restock, coupons, and customers. Open the live showcase.',
    longDescription: [
      'Admin is the studio sales view from Mug, listed on its own so it is easy to find. Jane is already signed in. The charts stay still, and the page scrolls through restock, coupons, and customers.',
      'Mug still includes this screen at /admin. Scaffold a copy of just the dashboard with the create command below, then replace the sample numbers in lib/sales.ts.',
    ],
    category: 'Dashboard',
    price: 'free',
    tags: ['Next.js', 'Dashboard', 'Shop'],
    demoPath: '/designs/admin',
    viewPath: '/view/admin',
    packageName: 'create-tawny',
    sourceFiles: ['package.json', 'README.md', 'lib/sales.ts'],
  },
]

/** Large pin, then the two compact slots. Home and `/designs` share this list. */
export const pinnedDesignIds = ['art', 'ocean', 'vcard'] as const

export function pinnedDesigns() {
  return pinnedDesignIds.flatMap((id) => {
    const design = designs.find((entry) => entry.id === id)
    return design ? [design] : []
  })
}

export const designCategories = [
  'All',
  'Journal',
  'Blog',
  'Links',
  'Landing',
  'Dashboard',
  'Portfolio',
  'Shop',
] as const

export function getDesign(id: string) {
  return designs.find((d) => d.id === id)
}
