# CLAUDE.md — Philagora Monorepo

AI context file for Claude Code and other AI assistants.

---

## Repository overview

**Philagora** is a mobile-first monorepo built with Bun + Turborepo.

```
philagora/
├── apps/
│   ├── mobile/     # Expo + React Native client (primary app)
│   └── server/     # Local Supabase tooling (no source code)
└── packages/
    ├── configs/    # Shared PostCSS, TypeScript, and CSS configs
    ├── typings/    # Shared TypeScript interfaces (@repo/typings)
    ├── ui/         # Shared UI components (@repo/ui)
    └── utils/      # Pure utility functions (@repo/utils)
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Mobile framework | React Native 0.81.5 + Expo 54 |
| Routing | Expo Router ~6 (file-based) |
| State management | Zustand 5 + Immer 11 |
| Backend / DB | Supabase (local dev via Docker) |
| Authentication | Supabase Auth + Expo Auth Session + Apple Sign-in |
| Real-time video | Stream.io WebRTC SDK |
| UI library | HeroUI Native ^1.0.0-rc.2 |
| Styling | Uniwind (Tailwind CSS for React Native) via PostCSS |
| Icons | Iconsax React Native + Expo Vector Icons |
| Animations | React Native Reanimated ~4.1.1 |
| Gestures | React Native Gesture Handler ~2.28.0 |
| Bottom sheets | @gorhom/bottom-sheet ^5 |
| Local storage | AsyncStorage ^3 + Expo SQLite |
| Language | TypeScript 5.9 (strict) |
| Testing | Jest 29 + Testing Library |
| Linting | ESLint (expo/flat config) in mobile; Biome in `@repo/ui` |
| Build | Turborepo 2.8 |
| Package manager | **Bun 1.3.9** (always use `bun`, never `npm` or `yarn`) |
| Env management | Dotenvx (encrypted `.env.*` files) |

---

## Package manager rules

- **Always use `bun`** — this repo uses Bun workspaces.
- Never use `npm install`, `yarn`, or `pnpm`.
- Add dependencies: `bun add <pkg>` inside the relevant app/package directory.
- Catalog versions (defined in root `package.json` under `catalog`) must be referenced as `catalog:<name>` in `package.json` files, not pinned directly.

---

## Common commands

Run all from the **repo root** unless noted:

```bash
bun install           # install all workspace deps
bun build             # turbo build pipeline (requires .env.development)
bun start             # start mobile app + local Supabase concurrently
bun run lint          # ESLint + Biome across workspace
bun run check-types   # TypeScript validation across workspace
bun run clean         # remove node_modules + Turbo cache
bun run cache:clear   # reset Watchman watch (use when Metro hangs)
```

Supabase-specific (from repo root or `apps/server`):

```bash
bunx supabase status  # check local Supabase services
bunx supabase stop    # stop local Supabase
```

---

## Mobile app (`apps/mobile`)

### Directory structure

```
apps/mobile/
├── app/                    # Expo Router file-based routes
│   ├── _layout.tsx         # Root layout (providers: HeroUI, GestureHandler, Keyboard)
│   └── (public)/           # Route group for unauthenticated screens
│       └── (tabs)/         # Tab-based layout (home, explore, calendar, profile)
├── components/
│   ├── atoms/              # Basic UI elements
│   └── molecules/          # Composed components (carousel, sheet-button, password input)
├── constants/              # App-wide constants
├── features/               # Feature modules (each has component.tsx, store.ts, test.ts)
│   ├── authentication/     # signup, login, reset-password, logout
│   └── debate/             # like feature
├── hooks/                  # Custom React hooks
│   ├── use-supabase-auth.ts
│   ├── use-supabase-db.ts
│   ├── use-validation.ts
│   └── use-color.ts
├── stores/                 # Zustand stores
│   ├── user.ts
│   ├── session.ts
│   └── sheet.ts
├── types/                  # Local TypeScript types + Uniwind type declarations
├── utils/                  # App utils (Supabase client init)
└── global.css              # Tailwind + Uniwind + HeroUI imports
```

### Architectural patterns

**Feature module pattern** — each feature lives in `features/<name>/` with:
- `component.tsx` — UI component
- `store.ts` — Zustand store (feature-scoped state)
- `test.ts` — Jest test

**Component hierarchy:**
- `atoms/` — primitive, single-responsibility UI elements
- `molecules/` — composed from atoms, may have local state

**State management:**
- Global state via Zustand stores in `stores/`
- Feature-local state in `features/<name>/store.ts`
- Use Immer for immutable state updates inside Zustand

**Supabase client:**
- Initialized once in `utils/` — import from there, do not re-instantiate

### Styling

- Use **Uniwind** (Tailwind CSS utility classes for React Native) for all styles.
- HeroUI Native components are the primary UI building blocks.
- Global CSS entry: `apps/mobile/global.css`
- Auto-generated Uniwind types: `apps/mobile/types/uniwind-types.d.ts` — do not edit manually.
- `tailwind-variants` (`tv()`) and `tailwind-merge` (`twMerge`) are available for conditional/merged class logic.

### Path aliases

`@/*` maps to the root of `apps/mobile/`. Use `@/` for all internal imports:

```ts
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
```

### Testing

- Pattern: `**/test.ts`
- Jest preset: `jest-expo` (node preset)
- Run: `bun test` inside `apps/mobile`

---

## Shared packages

### `@repo/typings`

Shared TypeScript interfaces. Import in any workspace package:

```ts
import type { IUser } from "@repo/typings/user";
import type { IAuthState } from "@repo/typings/auth";
```

Key types:
- `IUser` — `{ id, email, name, avatarUrl, roles }`
- `IUserState` — state + actions for user store
- `IAuthState` — token, login/logout methods
- `IAuthPayload` — legacy auth payload (backwards compat)

### `@repo/ui`

Shared React components for web (not mobile). Uses Biome for linting.

Export pattern: `@repo/ui/<ComponentName>` (glob export `./src/*.tsx`).

### `@repo/utils`

Pure utility functions with no side effects:
- `formatDate`, `formatCurrency`, `slugify`

### `@repo/configs`

Shared configuration files:
- `@repo/configs/postcss` — PostCSS config with Tailwind v4
- `@repo/configs/typescript/base` — base TS config
- `@repo/configs/typescript/react` — React TS config

---

## TypeScript rules

- Strict mode is enabled everywhere (`strict: true`).
- `noUncheckedIndexedAccess: true` — always check array/object access results.
- `moduleDetection: force` — all files are treated as modules.
- Do not disable strict flags or add `@ts-ignore` without a comment explaining why.
- Target: ES2022; Module: NodeNext.

---

## Environment variables

- Managed by **Dotenvx** with encrypted `.env.*` files.
- Decryption key lives in `.env.keys` (not committed, ask a maintainer).
- Active env file for dev: `.env.development`
- Turbo pipelines declare `.env.development` as a global dependency.
- Never commit plaintext secrets. Always use `bun run encrypt` after editing env files.

---

## Supabase local setup

Config: `apps/server/supabase/config.toml`

| Service | Port |
|---|---|
| API (PostgREST) | 54321 |
| PostgreSQL | 54322 |
| Studio | 54323 |
| Inbucket (test email) | 54324 |
| Analytics | 54327 |

- Requires **Docker Desktop** running.
- Auth: email signup + anonymous sign-ins enabled, JWT expiry 3600s.
- Storage: 50 MiB limit, S3 protocol enabled.
- Realtime: enabled.
- Edge functions: Deno v2 runtime.

---

## Turborepo pipeline

Key tasks defined in `turbo.json`:

| Task | Behavior |
|---|---|
| `build` | Depends on `^build` (deps build first); no cache |
| `check-types` | Depends on `^check-types`; cached |
| `clean` | No cache |
| `start` (mobile) | Persistent, interactive; co-runs with `@repo/server#start` |
| `prebuild` (mobile) | Generates iOS/Android native code |

Use `--filter` to scope runs:

```bash
bunx turbo build --filter=@repo/mobile
bunx turbo check-types --filter=@repo/typings
```

---

## Linting

- **Mobile app**: ESLint with `eslint-config-expo/flat` (flat config format).
- **`@repo/ui`**: Biome (`biome check`).
- Run all: `bun run lint` from repo root.
- No Prettier — do not add it. Use editor defaults consistent with Biome/ESLint rules.

---

## Key conventions

1. **Imports**: use `@/` alias for mobile-internal imports; use workspace package names (`@repo/*`) for cross-package imports.
2. **Feature modules**: new features go in `features/<name>/` with the `component / store / test` structure.
3. **No `npm` or `yarn`**: always `bun`.
4. **No manual Uniwind types**: the types file is auto-generated by Metro.
5. **Supabase client**: one instance, imported from `utils/`.
6. **State**: Zustand + Immer. Keep stores focused; feature stores stay in their feature folder.
7. **Styling**: Uniwind utility classes only — no inline `StyleSheet.create` unless Reanimated animated styles require it.
8. **SVGs**: import as React components via `react-native-svg-transformer`.
9. **Environment**: never hardcode env values; reference via `process.env.*`.
10. **Commits**: follow conventional commits (feat, fix, chore, refactor, docs, etc.).

---

## Prerequisites (new dev setup)

```bash
# Bun
curl -fsSL https://bun.sh/install | bash

# Dotenvx
brew install dotenvx/brew/dotenvx

# Docker Desktop — required for Supabase
# Download from https://www.docker.com/products/docker-desktop/

# First run
bun install
bun build
bun start
```

Obtain `.env.keys` from a maintainer before running.
