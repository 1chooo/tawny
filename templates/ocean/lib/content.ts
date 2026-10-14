export type CreatureId = 'whale' | 'turtle' | 'jellyfish' | 'manta'

export interface Pose {
  /** Fraction of the visible half-width: -1 is the left edge, 1 the right */
  x: number
  /** Fraction of the visible half-height: -1 is the bottom edge, 1 the top */
  y: number
  scale: number
}

export interface Creature {
  id: CreatureId
  label: string
  model: string
  /** Euler XYZ (radians) baked into the sampled points; every model is authored facing +Z, up +Y */
  rotation: [number, number, number]
  /** Longest edge of the normalized point cloud, in world units */
  size: number
  /** Trailing strands added under the model, sharing `share` of the particles */
  tentacles?: { strands: number; share: number; length: number }
  pose: { desktop: Pose; mobile: Pose }
}

export const creatures: Creature[] = [
  {
    id: 'whale',
    label: 'Humpback whale',
    model: 'whale.glb',
    rotation: [0.32, -Math.PI / 2 + 0.35, 0.08],
    size: 6.2,
    pose: {
      desktop: { x: 0.46, y: 0.03, scale: 1 },
      mobile: { x: 0, y: 0.3, scale: 0.5 },
    },
  },
  {
    id: 'turtle',
    label: 'Sea turtle',
    model: 'turtle.glb',
    rotation: [1.0, Math.PI - 0.5, 0.15],
    size: 4.2,
    pose: {
      desktop: { x: -0.42, y: 0, scale: 1 },
      mobile: { x: 0, y: 0.32, scale: 0.65 },
    },
  },
  {
    id: 'jellyfish',
    label: 'Moon jellyfish',
    model: 'jellyfish.glb',
    rotation: [0.3, 0.4, 0],
    size: 2.6,
    tentacles: { strands: 12, share: 0.38, length: 2.6 },
    pose: {
      desktop: { x: 0.42, y: 0.03, scale: 1 },
      mobile: { x: 0, y: 0.3, scale: 0.7 },
    },
  },
  {
    id: 'manta',
    label: 'Manta ray',
    model: 'manta.glb',
    rotation: [1.05, Math.PI + 0.35, -0.2],
    size: 6.4,
    pose: {
      desktop: { x: 0, y: 0.15, scale: 1 },
      mobile: { x: 0, y: 0.32, scale: 0.55 },
    },
  },
]

export const site = {
  name: 'Abyssal',
  tagline: 'Ocean storytelling studio',
  email: '{{AUTHOR_EMAIL}}',
  nav: [
    { label: 'Studio', href: '#studio' },
    { label: 'Work', href: '#work' },
    { label: 'Craft', href: '#craft' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    kicker: 'Ocean storytelling studio',
    title: 'Into the deep',
    description:
      'We turn marine science into films, exhibits, and interactive worlds that make people care about the 95% of the ocean nobody has seen.',
  },
  studio: {
    kicker: '01 — Studio',
    title: 'Born below the surface',
    body: [
      'Abyssal is a small crew of divers, researchers, and designers. We spend as much time on research vessels as we do in the edit suite.',
      'Every project starts with the animal — how it moves, where it migrates, what threatens it — and ends with a story people carry back to land.',
    ],
    stats: [
      { value: '42', label: 'expeditions' },
      { value: '11', label: 'species tracked' },
      { value: '3.8M', label: 'people reached' },
    ],
  },
  work: {
    kicker: '02 — Work',
    title: 'Drifting between science and wonder',
    items: [
      {
        title: 'Bloom',
        body: 'A projection-mapped exhibit that pulses with live jellyfish telemetry from the Monterey canyon.',
      },
      {
        title: 'Long Way Home',
        body: 'A feature documentary following three loggerheads across 12,000 km of open Pacific.',
      },
      {
        title: 'Night Shift',
        body: 'A WebGL field guide to bioluminescent life, built with the Deep Sea Research Institute.',
      },
    ],
  },
  craft: {
    kicker: '03 — Craft',
    marquee: 'Research · Film · Conservation · Interactive · ',
    columns: [
      {
        title: 'Research',
        items: ['Field expeditions', 'Species tracking', 'Data storytelling'],
      },
      {
        title: 'Film',
        items: ['Documentary', 'Underwater cinematography', 'Sound design'],
      },
      {
        title: 'Conservation',
        items: ['Campaign strategy', 'NGO partnerships', 'Impact reports'],
      },
      {
        title: 'Interactive',
        items: ['WebGL experiences', 'Museum installations', 'XR dives'],
      },
    ],
  },
  contact: {
    kicker: '04 — Contact',
    title: 'Dive in with us',
    body: 'Have a species, a dataset, or a stretch of coastline that needs a story? Drop us a line.',
  },
  credits: [
    {
      label: 'Whale & manta ray by Quaternius (CC0)',
      href: 'https://poly.pizza/u/Quaternius',
    },
    {
      label: 'Sea turtle by Poly by Google (CC-BY 3.0)',
      href: 'https://poly.pizza/m/fklSEvGm1Q8',
    },
    {
      label: 'Jellyfish by Gobkit (CC0)',
      href: 'https://gobkit.itch.io/gobkit-free-animal-pack',
    },
  ],
}
