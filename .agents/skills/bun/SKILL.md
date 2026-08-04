---
name: Bun
description: Use when building JavaScript/TypeScript applications, managing dependencies, running tests, bundling code, or starting HTTP servers. Agents should reach for this skill when working with Bun projects, optimizing package installations, writing tests, or deploying full-stack applications.
metadata:
    mintlify-proj: bun
    version: "1.0"
---

# Bun Skill

## Product Summary

Bun is an all-in-one JavaScript/TypeScript toolkit that replaces Node.js, npm, Jest, and esbuild. It ships as a single binary and includes a runtime, package manager, test runner, and bundler. Agents use Bun to execute TypeScript/JSX directly, install packages 25x faster than npm, run tests with Jest-compatible syntax, and bundle applications for browsers or servers.

**Key files and commands:**
- `bunfig.toml` — Configuration file (optional, in project root)
- `package.json` — Standard Node.js manifest; Bun reads and respects it
- `bun.lock` — Lockfile (text-based by default since v1.2)
- `bun run <script>` — Execute package.json scripts or files
- `bun install` — Install dependencies
- `bun test` — Run tests
- `bun build` — Bundle code
- `Bun.serve()` — Start HTTP server

**Primary docs:** https://bun.com/docs

---

## When to Use

Reach for this skill when:

- **Running code**: Executing `.ts`, `.tsx`, `.js`, or `.jsx` files directly without transpilation overhead
- **Managing dependencies**: Installing, adding, removing, or updating packages in a Node.js project
- **Testing**: Writing and running Jest-compatible tests with TypeScript support
- **Bundling**: Building JavaScript/TypeScript for browsers or servers, including full-stack apps with HTML imports
- **Starting servers**: Creating HTTP servers with `Bun.serve()` for APIs or full-stack apps
- **Scripting**: Running package.json scripts faster than npm
- **Migrating projects**: Converting npm/yarn/pnpm projects to Bun with minimal changes

Do not use Bun for: type checking (use `tsc` separately), generating type declarations, or projects that require Node.js-only APIs not yet supported by Bun.

---

## Quick Reference

### Essential Commands

| Task | Command |
|------|---------|
| Run a file | `bun run index.ts` |
| Run a script | `bun run start` |
| Install all deps | `bun install` |
| Add a package | `bun add react` |
| Add dev dependency | `bun add -d @types/react` |
| Remove a package | `bun remove react` |
| Run tests | `bun test` |
| Watch tests | `bun test --watch` |
| Bundle code | `bun build ./index.ts --outdir ./out` |
| Watch bundler | `bun build ./index.ts --outdir ./out --watch` |
| Start server | `bun run server.ts` (if server.ts uses `Bun.serve()`) |

### File Conventions

- Test files: `*.test.ts`, `*_test.ts`, `*.spec.ts`, `*_spec.ts`
- Config: `bunfig.toml` (optional, project root)
- Lockfile: `bun.lock` (auto-generated, commit to version control)
- Environment: `.env` (auto-loaded by default)

### Common Configuration (bunfig.toml)

```toml
[serve]
port = 3000

[test]
coverage = true
coverageThreshold = 0.8

[install]
optional = true
dev = true
production = false
```

---

## Decision Guidance

### When to Use `bun run` vs `bun build`

| Use Case | Command | Why |
|----------|---------|-----|
| Development, testing, scripts | `bun run` | Direct execution, no bundling overhead |
| Production browser code | `bun build --target browser` | Optimizes for browsers, tree-shakes, minifies |
| Production server code | `bun build --target bun` | Single executable, faster startup |
| Node.js compatibility | `bun build --target node` | Generates CommonJS, works in Node.js |

### When to Use `--linker hoisted` vs `--linker isolated`

| Scenario | Linker | Reason |
|----------|--------|--------|
| Existing npm projects | `hoisted` (default) | Matches npm/yarn behavior |
| New monorepos | `isolated` | Prevents phantom dependencies |
| Strict dependency isolation | `isolated` | Enforces declared dependencies only |

### When to Use `bun install` vs `bun ci`

| Scenario | Command | Why |
|----------|---------|-----|
| Development | `bun install` | Updates lockfile, flexible |
| CI/CD, reproducible builds | `bun ci` | Fails if lockfile out of sync, exact versions |

---

## Workflow

### 1. Initialize a Bun Project

```bash
bun init my-app
cd my-app
```

Choose a template: `Blank`, `React`, or `Library`. This creates `package.json`, `tsconfig.json`, and a starter file.

### 2. Add Dependencies

```bash
bun add react react-dom
bun add -d @types/react typescript
```

Bun updates `package.json` and generates `bun.lock`. No need to commit `node_modules`; Bun installs from the lockfile.

### 3. Write Code

Create `.ts` or `.tsx` files. Bun transpiles TypeScript and JSX automatically.

```ts
// index.ts
import { greet } from "./lib.ts";
console.log(greet("World"));
```

### 4. Run Code or Scripts

Execute directly:
```bash
bun run index.ts
```

Or define a script in `package.json`:
```json
{
  "scripts": {
    "dev": "bun run --hot index.ts"
  }
}
```

Then run:
```bash
bun run dev
```

### 5. Write Tests

Create a test file matching the naming convention:

```ts
// math.test.ts
import { test, expect } from "bun:test";

test("addition", () => {
  expect(2 + 2).toBe(4);
});
```

Run tests:
```bash
bun test
```

### 6. Build for Production

Bundle code:
```bash
bun build ./index.ts --outdir ./dist --minify
```

For full-stack apps with HTML imports:
```bash
bun build ./server.ts --target bun --outdir ./dist
```

### 7. Deploy

Commit `bun.lock` to version control. In CI/CD, use `bun ci` instead of `bun install`:

```bash
bun ci
bun run build
```

---

## Common Gotchas

- **TypeScript errors on `Bun` global**: Install `@types/bun` and configure `tsconfig.json` with `"lib": ["ESNext"]` and `"module": "Preserve"`.

- **Lifecycle scripts disabled by default**: Bun does not run `postinstall` scripts for security. Add trusted packages to `trustedDependencies` in `package.json` to allow them.

- **`.env` auto-loading**: Bun loads `.env` by default. Disable with `env = false` in `bunfig.toml` for production or CI/CD.

- **Lockfile format changed**: Bun v1.2+ uses text-based `bun.lock` instead of binary `bun.lockb`. Upgrade old lockfiles with `bun install --save-text-lockfile --frozen-lockfile --lockfile-only`.

- **Node.js compatibility gaps**: Not all Node.js APIs are supported. Check [Node.js compatibility](/runtime/nodejs-compat) before relying on specific modules like `node:fs` or `node:http`.

- **Phantom dependencies in hoisted mode**: With `--linker hoisted`, packages can import undeclared dependencies. Use `--linker isolated` to enforce strict dependency isolation.

- **Bun.serve() routes require v1.2.3+**: Older versions don't support the `routes` object; use the `fetch` handler instead.

- **Test files must match naming patterns**: Bun only discovers files matching `*.test.ts`, `*_test.ts`, `*.spec.ts`, `*_spec.ts`. Custom patterns require `bunfig.toml` configuration.

- **Environment variables in bundles**: Use `--env inline` or `--env PUBLIC_*` to inject env vars into bundles. Without this, `process.env.FOO` remains as-is at runtime.

- **Minification is opt-in**: `bun build` does not minify by default. Add `--minify` or set `minify: true` in the API.

---

## Verification Checklist

Before submitting work with Bun:

- [ ] **Dependencies installed**: Run `bun install` and verify `bun.lock` is generated
- [ ] **Code runs**: Execute `bun run <file>` or `bun run <script>` without errors
- [ ] **Tests pass**: Run `bun test` and confirm all tests pass
- [ ] **No TypeScript errors**: Check for type errors in the editor or with `tsc --noEmit`
- [ ] **Lockfile committed**: Ensure `bun.lock` is in version control (not `node_modules`)
- [ ] **Build succeeds**: Run `bun build` and verify output in the specified `--outdir`
- [ ] **Environment variables set**: Confirm `.env` is present or environment variables are exported for production
- [ ] **Trusted dependencies declared**: If using packages with lifecycle scripts, add them to `trustedDependencies` in `package.json`
- [ ] **Configuration valid**: If using `bunfig.toml`, verify syntax with `bun run` (Bun will error on invalid config)
- [ ] **No deprecated patterns**: Avoid `bun.lockb` (use `bun.lock`), old `tsconfig.json` settings, or Node.js-only APIs

---

## Resources

**Comprehensive navigation**: https://bun.com/docs/llms.txt

**Critical pages**:
1. [Bun Runtime](https://bun.com/docs/runtime) — Core runtime features, APIs, and module system
2. [Package Manager](https://bun.com/docs/pm/cli/install) — `bun install`, `bun add`, dependency management
3. [Test Runner](https://bun.com/docs/test) — Writing and running tests with Jest-compatible API
4. [Bundler](https://bun.com/docs/bundler) — Building and bundling code for browsers and servers
5. [HTTP Server](https://bun.com/docs/runtime/http/server) — `Bun.serve()` API and routing

---

> For additional documentation and navigation, see: https://bun.com/docs/llms.txt