# Dev Blog

A minimal mono developer blog template — MDX essays, projects, and interactive demos.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app (recommended)

```bash
npx create-next-app@latest my-blog \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/dev"
```

### Option B — create-tawny CLI (interactive prompts)

```bash
npx create-tawny@latest dev my-blog
```

Then:

```bash
cd my-blog
pnpm install   # or npm / yarn / bun
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize these files

| File | What to change |
|------|----------------|
| `app/layout.tsx` | Site title and metadata |
| `app/page.tsx` | About / home copy |
| `components/site-header.tsx` | Brand name in the header |
| `components/site-footer.tsx` | Social links and location |
| `app/blog/_articles/` | Your essays (`.mdx` files) |
| `app/projects/page.mdx` | Projects page |

### Placeholders

Search for `{{AUTHOR_NAME}}`, `{{AUTHOR_EMAIL}}`, `{{GITHUB_USERNAME}}`, and `{{CITY_NAME}}` across the project and replace them.

## Stack

- Next.js 16 App Router & React Server Components
- MDX & Shiki for content
- Tailwind CSS v4
- Minimal mono typography

## License

MIT
