# Faculty

A responsive faculty page in the USC palette: charcoal page, light panel, cardinal banner, and a publications list with BibTeX. The sample professor is Dr. Alexandra J. Martinez.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app

```bash
npx create-next-app@latest my-faculty \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/faculty"
```

### Option B — create-tawny CLI

```bash
npx create-tawny@latest faculty my-faculty
```

Then:

```bash
cd my-faculty
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize these files

| File | What to change |
|------|----------------|
| `components/site-frame.tsx` | Name, titles, and navigation |
| `app/page.tsx` | Biography, news, and contact details |
| `lib/publications.ts` | Sample BibTeX entries |
