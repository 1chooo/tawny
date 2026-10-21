# Mug

A ceramics studio in three pages: the home, a split sign-in, and a sales dashboard. The bag keeps a few sample pieces in the browser. The dashboard numbers are sample data.

The studio name in the sample copy is Jane. Studio admin lives at `/admin`, and the same dashboard is also its own template, `admin`.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app

```bash
npx create-next-app@latest my-mug \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/mug"
```

### Option B — create-tawny CLI

```bash
npx create-tawny@latest mug my-mug
```

Then:

```bash
cd my-mug
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in is `/login`. Studio admin is `/admin`.

## Customize these files

| File | What to change |
|------|----------------|
| `lib/products.ts` | Piece names, prices, and photos |
| `lib/sales.ts` | Revenue, restock, coupons, and customers |
| `components/studio-note.tsx` | The studio introduction |
| `components/hero.tsx` | Headline and hero photo |
| `app/layout.tsx` | Site title and metadata |

## Stack

- Next.js 16 App Router & React
- Tailwind CSS v4
- Recharts
- Geist and Space Grotesk

## License

MIT — see [LICENSE](./LICENSE).
