# Philagora Monorepo

This repository is a Bun + Turborepo monorepo with:

- `apps/mobile` (Expo / React Native client)
- `apps/server` (local Supabase backend tooling)
- shared packages in `packages/*`

## Prerequisites

Install these before first run:

1. Node.js 18+
2. Bun `1.3.9`
3. Docker Desktop (required for local Supabase)
4. Dotenvx CLI
5. Turborepo CLI (optional globally, already in repo devDependencies)

### Install commands

```bash
# Bun
curl -fsSL https://bun.sh/install | bash

# Dotenvx
brew install dotenvx/brew/dotenvx

# Turborepo (optional global)
bun add -g turbo

# Verify
bun --version
dotenvx --version
turbo --version
```

## Environment setup

This repo uses Dotenvx for env management.

For first-time setup, make sure the `.env.keys` file exists at the repository root:

```bash
./.env.keys
```

If you don’t have `.env.keys`, ask a maintainer.

## Supabase local development setup

Supabase config lives in `apps/server/supabase`.

Start development from the repository root:

```bash
bun run start
```

This starts both:

- mobile app development session
- local Supabase development services

Useful follow-ups:

```bash
# optional: manage Supabase directly
cd apps/server
bunx supabase stop

# status
bunx supabase status
```

## First-time monorepo install

From the repo root:

```bash
bun install
```

## Development session

From the repo root, run in this order:

```bash
bun install
bun build
bun start
```

What these do:

- `bun install`: installs all workspace dependencies
- `bun build`: runs Turbo build pipeline with `.env.development`
- `bun start`: starts the mobile app target (`@repo/mobile#start`) with `.env.development`

## Helpful scripts

From repo root:

```bash
bun run lint         # turbo run lint
bun run check-types  # turbo run check-types
bun run clean        # clean node_modules + turbo artifacts
```

## Troubleshooting

- Supabase won’t start: ensure Docker Desktop is running.
- Env-related failures: confirm `.env.development` exists or run Dotenvx decrypt.
- Port conflicts: stop existing Expo/Metro or Supabase instances before restarting.
