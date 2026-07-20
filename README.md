# Tawny

Handcrafted web designs and UI components. Built with [Next.js](https://nextjs.org).

## Monorepo layout

```
apps/
  web/     # the Next.js site (Tawny)
  cli/     # create-tawny — scaffolds the templates in apps/web/templates
packages/
  ui/      # @tawny/ui — shared UI primitives used by apps/web
```

Managed as a [pnpm workspace](https://pnpm.io/workspaces) (see `pnpm-workspace.yaml`). Run everything from the repo root — `pnpm install` links all three packages together.

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_g3E4XebCYBN8xMza9cOb6tkrGXPF)

**Note:** since the Next.js app now lives in `apps/web` instead of the repo root, the v0 / Vercel project's **Root Directory** setting needs to be updated to `apps/web` in the dashboard for deploys to keep working.

## Getting Started

First, run the development server:

```bash
pnpm install
pnpm dev
```

This proxies to `apps/web`'s `next dev`. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `apps/web/app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
