# Dependency Management

Best practices for managing dependencies in a Turborepo monorepo.

## Core Principle: Install Where Used

Dependencies belong in the package that uses them, not the root.

```bash
# Good: Install in specific package
cd packages/ui && bun add react
cd apps/web && bun add next

# Avoid: Installing in root
bun add react -w  # Only for repo-level tools!
```

## Benefits of Local Installation

### 1. Clarity

Each package's `package.json` lists exactly what it needs:

```json
// packages/ui/package.json
{
  "dependencies": {
    "react": "^18.0.0",
    "class-variance-authority": "^0.7.0"
  }
}
```

### 2. Flexibility

Different packages can use different versions when needed:

```json
// packages/legacy-ui/package.json
{ "dependencies": { "react": "^17.0.0" } }

// packages/ui/package.json
{ "dependencies": { "react": "^18.0.0" } }
```

### 3. Better Caching

Installing in root changes workspace lockfile, invalidating all caches.

### 4. Pruning Support

`turbo prune` can remove unused dependencies for Docker images.

## What Belongs in Root

Only repository-level tools:

```json
// Root package.json
{
  "devDependencies": {
    "turbo": "latest",
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0"
  }
}
```

**NOT** application dependencies:

- react, next, express
- lodash, axios, zod
- Testing libraries (unless truly repo-wide)

## Installing Dependencies

### Single Package

```bash
cd packages/utils && bun add lodash
```

### Multiple Packages

```bash
cd packages/ui && bun add jest --dev
cd apps/web && bun add jest --dev
```

### Internal Packages

Add the internal package to the consuming package's `package.json`:

```json
{
  "dependencies": {
    "@repo/ui": "*"
  }
}
```

Then run install from the workspace root:

```bash
bun install
```

## Keeping Versions in Sync

### Option 1: Tooling

```bash
# syncpack - Check and fix version mismatches
bunx syncpack list-mismatches
bunx syncpack fix-mismatches

# manypkg - Similar functionality
bunx @manypkg/cli check
bunx @manypkg/cli fix

# sherif - Rust-based, very fast
bunx sherif
```

### Option 2: Manual Update

```bash
# Update a dependency across all packages that use it
# Edit each package.json, then:
bun install
```

## Internal vs External Dependencies

### Internal (Workspace)

```json
{ "@repo/ui": "*" }
```

Turborepo understands these relationships and orders builds accordingly.

### External (Registry)

```json
{ "lodash": "^4.17.21" }
```

Standard semver versioning from the registry.

## Peer Dependencies

For library packages that expect the consumer to provide dependencies:

```json
// packages/ui/package.json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

## Common Issues

### "Module not found"

1. Check the dependency is installed in the right package
2. Run `bun install` to update the lockfile
3. Check exports are defined in the package

### Version Conflicts

Packages can use different versions - this is a feature, not a bug. But if you need consistency:

1. Use tooling (syncpack, manypkg)
2. Create a lint rule

### Hoisting Issues

Some tools expect dependencies in specific locations. Use `.bunfig.toml` or the `install` configuration in `package.json` to adjust behavior if needed.

## Lockfile

**Required** for:

- Reproducible builds
- Turborepo dependency analysis
- Cache correctness

```bash
# Commit your lockfile!
git add bun.lock
```
