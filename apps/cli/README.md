# create-tawny

Interactive CLI to scaffold a [Tawny](https://github.com/1chooo/tawny) design template with Next.js and MDX.

## Usage

```bash
npx create-tawny@latest dev my-blog
npx create-tawny@latest art my-journal
npx create-tawny@latest link my-links
npx create-tawny@latest ocean my-ocean-studio
npx create-tawny@latest board my-board
npx create-tawny@latest vcard my-vcard
npx create-tawny@latest cobalt my-cobalt
npx create-tawny@latest atelier my-atelier
npx create-tawny@latest admin my-admin
npx create-tawny@latest desk my-desk
npx create-tawny@latest usc my-usc
npx create-tawny@latest seal my-seal

# skip prompts (coding agents) — uses placeholder author details
npx create-tawny@latest art my-journal --yes

# or omit the template / name to get interactive prompts
npx create-tawny@latest
```

Available templates:

| id    | Description                                            | Source                                     |
| ----- | -------------------------------------------------------| ------------------------------------------- |
| `dev` | Minimal mono developer blog — MDX essays + demos        | [`templates/dev`](../../templates/dev)     |
| `art` | Bilingual bento journal — MDX notes, projects, i18n     | [`templates/art`](../../templates/art)     |
| `link` | Personal link-in-bio page — profile + social links      | [`templates/link`](../../templates/link)   |
| `ocean` | WebGL particle landing page — scroll-morphing sea creatures | [`templates/ocean`](../../templates/ocean) |
| `board` | Issue dashboard — sidebar, toolbar, and a 4px list | [`templates/board`](../../templates/board) |
| `vcard` | Personal vcard — profile sidebar, work, and notes | [`templates/vcard`](../../templates/vcard) |
| `cobalt` | Cobalt — ceramics studio with a home, sign-in, and a sales dashboard | [`templates/cobalt`](../../templates/cobalt) |
| `atelier` | Atelier — white editorial ceramics studio | [`templates/atelier`](../../templates/atelier) |
| `admin` | Ceramics studio dashboard — revenue, restock, and customers | [`templates/admin`](../../templates/admin) |
| `desk` | Project desk — sidebar, weekly chart, and a timer | [`templates/desk`](../../templates/desk) |
| `usc` | USC researcher page — cardinal banner and publications | [`templates/usc`](../../templates/usc) |
| `seal` | Seal — paper editorial portfolio with vertical Chinese titles | [`templates/seal`](../../templates/seal) |

Under the hood it downloads the `templates/<id>` subdirectory straight from the [`1chooo/tawny`](https://github.com/1chooo/tawny) GitHub tarball (no `create-next-app`/`npx` involved, so there's no interactive "ok to install" prompt to hang on), sets the `package.json` name, replaces the `{{AUTHOR_NAME}}` / `{{AUTHOR_EMAIL}}` / `{{GITHUB_USERNAME}}` / `{{CITY_NAME}}` placeholders, and runs any template-specific setup (e.g. `art` strips the Chinese locale and seeds `.env` when you opt into English-only).

## Development

```bash
pnpm install
node apps/cli/bin.mjs dev my-test-blog
```

## Publishing

Published as [`create-tawny`](https://www.npmjs.com/package/create-tawny) on npm. To ship a new version:

```bash
npm login
pnpm --filter create-tawny publish --access public
```

Bump `version` in [`package.json`](./package.json) first for any subsequent release.
