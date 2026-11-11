# Vale

An editorial storefront for Studio Vale. A white gallery grid, condensed category names, and a client-side cart. There is no account, no backend, and no payment.

Photographs are from Unsplash, used under the [Unsplash License](https://unsplash.com/license). The studio, prices, and policies are sample copy.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app

```bash
npx create-next-app@latest my-vale \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/vale"
```

### Option B — create-tawny CLI

```bash
npx create-tawny@latest vale my-vale
```

Then:

```bash
cd my-vale
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). A piece lives at `/products/speckled-cup`. The cart stays in this browser.

## Customize these files

| File | What to change |
|------|----------------|
| `lib/content.ts` | Studio name, email, city, social links, categories, and products |
| `components/emblem.tsx` | The mark above the homepage headline. `site.emblem` selects it |
| `app/layout.tsx` | Site title and metadata |
| `public/images/vale` | Product and studio photographs |

## Stack

- Next.js 16 App Router & React
- Tailwind CSS v4
- Fraunces, Archivo, and Inter

## License

MIT — see [LICENSE](./LICENSE).
