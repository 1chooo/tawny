# Landing

A ceramics studio home page — hero, a latest firing, the making process, and a studio note. The bag keeps a few sample pieces in the browser.

The studio name in the sample copy is Jane.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app

```bash
npx create-next-app@latest my-landing \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/landing"
```

### Option B — create-tawny CLI

```bash
npx create-tawny@latest landing my-landing
```

Then:

```bash
cd my-landing
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize these files

| File | What to change |
|------|----------------|
| `lib/products.ts` | Piece names, prices, and photos |
| `components/studio-note.tsx` | The studio introduction |
| `components/hero.tsx` | Headline and hero photo |
| `app/layout.tsx` | Site title and metadata |

Sign-in, account, and studio admin are separate templates (`login` and `admin`). On this page those controls stay on the landing page.

## Stack

- Next.js 16 App Router & React
- Tailwind CSS v4
- Geist and Space Grotesk

## License

MIT — see [LICENSE](./LICENSE).
