# Login

A split sign-in page for a ceramics studio. The photograph sits on the left, and the form stays on the right. Submitting the form does not open a session.

The studio name in the sample copy is Jane.

Design by [Hugo Lin](https://1chooo.com).

## Quick start

### Option A — create-next-app

```bash
npx create-next-app@latest my-login \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/login"
```

### Option B — create-tawny CLI

```bash
npx create-tawny@latest login my-login
```

Then:

```bash
cd my-login
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Add `?next=/admin` to switch the heading to the studio account.

## Customize these files

| File | What to change |
|------|----------------|
| `components/sign-in-form.tsx` | Fields, submit behavior, and helper copy |
| `components/split-shell.tsx` | Wordmark and the side photograph |
| `app/layout.tsx` | Site title and metadata |

## Stack

- Next.js 16 App Router & React
- Tailwind CSS v4
- Geist and Space Grotesk

## License

MIT — see [LICENSE](./LICENSE).
