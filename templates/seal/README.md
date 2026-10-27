# Seal

A paper portfolio for a one-person editorial studio. Vertical Traditional Chinese headlines, vermilion seal motifs, and a short list of work. The contact form keeps its confirmation in the browser.

This preview has no street address. The projects are sample pieces.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app

```bash
npx create-next-app@latest my-seal \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/seal"
```

### Option B — create-tawny CLI

```bash
npx create-tawny@latest seal my-seal
```

Then:

```bash
cd my-seal
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). A piece lives at `/work/field-guide`.

## Customize these files

| File | What to change |
|------|----------------|
| `lib/content.ts` | Studio name, email, chapter copy, and the three projects |
| `app/layout.tsx` | Site title and metadata |

Keep vertical headlines at eight characters or fewer so they still read on a phone, where they switch to horizontal.

## Stack

- Next.js 16 App Router & React
- Tailwind CSS v4
- Noto Serif TC and Source Serif 4

## License

MIT — see [LICENSE](./LICENSE).
