# Link

A minimal personal link-in-bio page — profile, social links, and a short tagline.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app (recommended)

```bash
npx create-next-app@latest my-links \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/link"
```

### Option B — create-tawny CLI (interactive prompts)

```bash
npx create-tawny@latest link my-links
```

Then:

```bash
cd my-links
pnpm install   # or npm / yarn / bun
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize these files

| File | What to change |
|------|----------------|
| `lib/links.ts` | Profile name, bio, avatar, tagline, and link list |
| `app/layout.tsx` | Site title and metadata |
| `app/page.tsx` | Page composition (usually leave as-is) |

### Placeholders

Search for `{{AUTHOR_NAME}}`, `{{AUTHOR_EMAIL}}`, `{{GITHUB_USERNAME}}`, and `{{CITY_NAME}}` across the project and replace them, or use Option B which does this automatically.

## Stack

- Next.js 16 App Router & React
- Tailwind CSS v4
- Typography inspired by [1chooo.com](https://1chooo.com)

## License

MIT — see [LICENSE](./LICENSE).
