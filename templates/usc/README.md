# USC

A responsive USC researcher page: charcoal page, light panel, cardinal banner, and a publications list with BibTeX. The sample researcher is Dr. Alexandra J. Martinez.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app

```bash
npx create-next-app@latest my-usc \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/usc"
```

### Option B — create-tawny CLI

```bash
npx create-tawny@latest usc my-usc
```

Then:

```bash
cd my-usc
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
