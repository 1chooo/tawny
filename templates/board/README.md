# Board

An issue dashboard. Sidebar, toolbar, and a 4px list: 16px icons on the text line, labels and ids on the left, numbers and dates on the right.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app

```bash
npx create-next-app@latest my-board \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/board"
```

### Option B — create-tawny CLI

```bash
npx create-tawny@latest board my-board
```

Then:

```bash
cd my-board
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize these files

| File | What to change |
|------|----------------|
| `lib/issues.ts` | Sample issues |
| `components/dashboard.tsx` | Sidebar, toolbar, and list |
| `app/layout.tsx` | Site title and metadata |

### Placeholders

Search for `{{AUTHOR_NAME}}`, `{{AUTHOR_EMAIL}}`, `{{GITHUB_USERNAME}}`, and `{{CITY_NAME}}` across the project and replace them, or use Option B which does this automatically.

## Stack

- Next.js 16 App Router & React
- Tailwind CSS v4

## License

MIT — see [LICENSE](./LICENSE).
