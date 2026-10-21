# Admin

A studio sales dashboard: revenue, a restock queue, coupon use, and a short customer list. The numbers are sample data. Products, orders, coupons, and the shop are labels in the nav — this page is the sales view.

The studio account in the sample is Jane (`jane@example.com`).

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app

```bash
npx create-next-app@latest my-admin \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/admin"
```

### Option B — create-tawny CLI

```bash
npx create-tawny@latest admin my-admin
```

Then:

```bash
cd my-admin
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize these files

| File | What to change |
|------|----------------|
| `lib/sales.ts` | Revenue series, pieces, coupons, and customers |
| `components/sales-board.tsx` | Dashboard layout |
| `app/layout.tsx` | Site title and the signed-in email |

## Stack

- Next.js 16 App Router & React
- Tailwind CSS v4
- Recharts
- Geist and Space Grotesk

## License

MIT — see [LICENSE](./LICENSE).
