# VCard

A dark personal vcard — profile sidebar, selected work, and short notes.

The sidebar-and-article layout follows the [vcard personal portfolio](https://github.com/codewithsadee/vcard-personal-portfolio). Design adapted for Tawny by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app (recommended)

```bash
npx create-next-app@latest my-vcard \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/vcard"
```

### Option B — create-tawny CLI (interactive prompts)

```bash
npx create-tawny@latest vcard my-vcard
```

Then:

```bash
cd my-vcard
pnpm install   # or npm / yarn / bun
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize these files

| File | What to change |
|------|----------------|
| `lib/profile.ts` | Name, city, email, GitHub, bio, projects, and notes |
| `public/images/` | Avatar and project covers |
| `app/layout.tsx` | Site title and metadata |
| `app/page.tsx` | Page composition (usually leave as-is) |

### Placeholders

Search for `{{AUTHOR_NAME}}`, `{{AUTHOR_EMAIL}}`, `{{GITHUB_USERNAME}}`, and `{{CITY_NAME}}` across the project and replace them, or use Option B which does this automatically.

## Stack

- Next.js 16 App Router & React
- Tailwind CSS v4
- Layout adapted from the vcard personal portfolio

## License

MIT — see [LICENSE](./LICENSE).
