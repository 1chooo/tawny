# Desk

A project desk you can click through: dashboard, tasks, calendar, analytics, team, settings, and help. Add a project or import a CSV. Edits stay in the browser tab. The signed-in account is Ada Cole.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app

```bash
npx create-next-app@latest my-desk \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/desk"
```

### Option B — create-tawny CLI

```bash
npx create-tawny@latest desk my-desk
```

Then:

```bash
cd my-desk
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize these files

| File | What to change |
|------|----------------|
| `lib/model.ts` | Sample projects, tasks, people, and events |
| `components/desk-shell.tsx` | Sidebar and header |
| `app/layout.tsx` | Site title |

## Stack

- Next.js 16 App Router & React
- Tailwind CSS v4
- Recharts
- Geist and Instrument Serif

## License

MIT — see [LICENSE](./LICENSE).
