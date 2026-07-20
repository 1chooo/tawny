# create-tawny

Interactive CLI to scaffold a [Tawny](https://github.com/1chooo/tawny) design template with Next.js and MDX. Consolidates what used to be two separate, unpublished packages (`create-tawny-dev-blog`, `create-bento-journal`) into one.

## Usage

```bash
npx create-tawny@latest dev my-blog
npx create-tawny@latest art my-journal

# or omit the template / name to get interactive prompts
npx create-tawny@latest
```

Available templates:

| id    | Description                                            | Source                                     |
| ----- | -------------------------------------------------------| ------------------------------------------- |
| `dev` | Minimal mono developer blog — MDX essays + demos        | [`templates/dev`](../../templates/dev)     |
| `art` | Bilingual bento journal — MDX notes, projects, i18n     | [`templates/art`](../../templates/art)     |

Under the hood it shells out to `create-next-app --example https://github.com/1chooo/tawny --example-path templates/<id>`, then replaces the `{{AUTHOR_NAME}}` / `{{AUTHOR_EMAIL}}` / `{{GITHUB_USERNAME}}` / `{{CITY_NAME}}` placeholders and runs any template-specific setup (e.g. `art` strips the Chinese locale and seeds `.env` when you opt into English-only).

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
