# zuki.dev

Repository for the [zuki.dev](https://zuki.dev)

Next.js with static export, deployed to GitHub Pages.

## Requirements

- [mise](https://mise.jdx.dev/)

## Setup

1. Install Node.js via mise: `mise install`
1. Enable Corepack so the pinned pnpm is used: `corepack enable`
1. Install packages: `pnpm install --frozen-lockfile`

## Run

1. Run server: `pnpm dev`
1. Open [localhost:3000](http://localhost:3000)

## Checks

These are the same commands CI runs.

- Lint: `pnpm lint` (`pnpm lint:fix` to apply)
- Format: `pnpm format:check` (`pnpm format` to apply)
- Build: `pnpm build`
