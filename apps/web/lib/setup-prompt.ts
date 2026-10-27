/** CLI default project names — keep in sync with `apps/cli` templates. */
export const DEFAULT_PROJECT_NAMES: Record<string, string> = {
  art: 'my-journal',
  dev: 'my-blog',
  link: 'my-links',
  ocean: 'my-ocean-studio',
  board: 'my-board',
  vcard: 'my-vcard',
  cobalt: 'my-cobalt',
  'atelier': 'my-atelier',
  admin: 'my-admin',
  desk: 'my-desk',
  usc: 'my-usc',
}

const SETUP_BLURBS: Record<string, string> = {
  art: 'the bilingual bento journal',
  dev: 'the minimal mono developer blog',
  link: 'the personal link-in-bio page',
  ocean: 'the scroll-driven WebGL particle landing page',
  board: 'the issue dashboard',
  vcard: 'the personal vcard with a profile sidebar',
  cobalt: 'Cobalt, the ceramics studio with a home, sign-in, and sales dashboard',
  'atelier': 'Atelier, the editorial ceramics studio with a shop, sign-in, and sales dashboard',
  admin: 'the ceramics studio sales dashboard',
  desk: 'the project desk dashboard',
  usc: 'the USC researcher page',
}

export type SetupPromptInput = {
  id: string
  title: string
}

/** Live demo path an agent should open. Art is locale-prefixed. */
export function designShowcasePath(id: string): string {
  return id === 'art' ? '/designs/art/en' : `/designs/${id}`
}

export function setupCommand(id: string): string {
  const name = DEFAULT_PROJECT_NAMES[id] ?? 'my-app'
  return `npx create-tawny@latest ${id} ${name} --yes`
}

/**
 * Short instruction to paste into a coding agent (Cursor, Claude, etc.)
 * so it scaffolds the template instead of rebuilding the layout.
 */
export function buildSetupPrompt(input: SetupPromptInput, origin: string): string {
  const showcase = `${origin}${designShowcasePath(input.id)}`
  const docs = `${origin}/components/create-tawny`
  const blurb = SETUP_BLURBS[input.id] ?? 'this design'
  const localeLine =
    input.id === 'art'
      ? 'Keep English + Chinese so it matches the live showcase.\n'
      : ''

  return [
    `Set up a local copy of the Tawny ${input.title} template — ${blurb}`,
    `shown at ${showcase}.`,
    '',
    'In an empty directory, run:',
    setupCommand(input.id),
    '',
    'Then cd into the project, install if needed, and start the Next.js dev server.',
    localeLine + `Read ${docs} if anything is unclear.`,
    '',
    'Do not rebuild the layout from scratch. Scaffold with create-tawny, then',
    'customize author details and content.',
  ].join('\n')
}
