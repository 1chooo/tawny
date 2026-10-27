# Mug v2

A white, editorial ceramics site for Jane Mug: home, shop, piece pages, sign-in, and the sales dashboard. The bag keeps a few sample pieces in the browser. The dashboard numbers are sample data.

This preview has no phone, street address, opening hours, or social profiles. Testimonial cards are marked Sample. Policy pages say the policy is not written yet.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app

```bash
npx create-next-app@latest my-mug-v2 \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/mug-v2"
```

### Option B — create-tawny CLI

```bash
npx create-tawny@latest mug-v2 my-mug-v2
```

Then:

```bash
cd my-mug-v2
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The shop is `/shop`. Sign in is `/login`. Studio admin is `/admin`.

## Customize these files

| File | What to change |
|------|----------------|
| `lib/content.ts` | Nav, contact, hero, story, categories, process, sample quotes, footer, and policies. Set `visible` to false, or leave a list empty, to hide that section. |
| `lib/products.ts` | Piece names, prices, photos, and stock |
| `lib/sales.ts` | Revenue, restock, coupons, and customers |
| `app/layout.tsx` | Site title and metadata |

There is no phone, address, or social link in the sample. Add them in `lib/content.ts` when you have them. Delete the sample quotes, or set `testimonials.visible` to false, before treating the carousel as real reviews.

## Stack

- Next.js 16 App Router & React
- Tailwind CSS v4
- Recharts
- Geist

## License

MIT — see [LICENSE](./LICENSE).
