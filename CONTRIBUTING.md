# Contributing to the SEI Design System

Thank you for your interest in contributing to the SEI Design System (`@cmu-sei/sei-design-system`). This document describes how to set up your development environment, follow our coding standards, and submit changes.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Creating a New Component](#creating-a-new-component)
- [Coding Standards](#coding-standards)
- [Writing Tests](#writing-tests)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Branch Strategy](#branch-strategy)
- [Release Process](#release-process)

---

## Getting Started

### Prerequisites

- **Node.js** `LTS` (use [nvm](https://github.com/nvm-sh/nvm) to manage versions; the exact version is pinned in `.nvmrc`)
- **npm** (bundled with Node.js)
- **Git**

### Setup

```bash
# Clone the repository
git clone https://github.com/cmu-sei/sei-design-system.git
cd sei-design-system

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server runs the internal documentation and demo app at `http://localhost:5173`. It does **not** reflect the published library build — use `npm run build` for that.

---

## Development Workflow

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with hot module replacement |
| `npm run build` | Build the library and run a typecheck |
| `npm test` | Run all unit tests once |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:clean` | Run tests and update snapshots |
| `npm run coverage` | Run tests and generate a coverage report |
| `npm run lint` | Lint all files |
| `npm run lint:fix` | Lint and auto-fix violations |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run storybook` | Start the Storybook dev server on port 6006 |
| `npm run bundle:release` | Run the full verification pipeline: lint → test → build → type declarations → Volar types |

---

## Creating a New Component

Use the scaffolding script to generate the correct file structure:

```bash
npm run create-component
```

You will be prompted for a component name and description. The script creates the following files inside `src/components/<ComponentName>/`:

| File | Purpose |
|---|---|
| `ComponentName.vue` | Component implementation |
| `ComponentName.spec.ts` | Unit tests |
| `ComponentName.stories.js` | Storybook stories |
| `index.ts` | Component export and global registration |

After scaffolding, add the new component to `src/components/index.ts` for it to be included in the published library.

Refer to `.github/skills/components-guidelines/SKILL.md` for detailed component authoring standards.

---

## Coding Standards

### TypeScript

All source files use TypeScript with `strict: true`. Key rules (see `.github/instructions/typescript.instructions.md` for the full list):

- **No `any` or `unknown`** — always provide explicit types.
- **No `enum`** — use `const` objects or maps instead.
- **No classes** — prefer composition and plain functions.
- Use `is`/`has`/`can` prefixes for boolean variables.
- Add JSDoc comments on all public/exported APIs with `@param` and `@returns`.
- Avoid type assertions (`as` or `!`).

### Vue Components

- All components use `<script setup lang="ts">` with the Composition API.
- All components declare `defineOptions({ name: 'Sds<ComponentName>' })`.
- Components must accept `class` and `style` attributes via `v-bind="$attrs"`.
- Refer to `.github/skills/components-guidelines/SKILL.md` for full authoring conventions.

### Linting

ESLint is enforced in CI. Run `npm run lint:fix` before committing to resolve auto-fixable violations.

---

## Writing Tests

Tests are written with [Vitest](https://vitest.dev/) and [@vue/test-utils](https://test-utils.vuejs.org/). Each component must include:

- Snapshot tests covering default and key variant states.
- Behavioral tests for all props, emits, slots, and user interactions.
- Accessibility checks using [`axe-core`](https://github.com/dequelabs/axe-core).

Tests live alongside the component in `ComponentName.spec.ts`. Refer to `.github/skills/unit-testing-guidelines/SKILL.md` for patterns and examples.

Before opening a pull request, run the full verification pipeline to confirm everything passes end-to-end:

```bash
npm run bundle:release
```

This runs lint, all unit tests, the library build, TypeScript declaration generation, and Volar type generation in sequence — the same steps CI will execute.

---

## Submitting a Pull Request

1. **Fork** the repository and create a branch from `develop`.
2. Keep changes focused — one feature or fix per pull request.
3. Ensure all tests pass and no lint errors exist.
4. Update or add Storybook stories for any visual or behavioral changes.
5. Update snapshots if the component output changed: `npm run test:clean`.
6. Open a pull request against the `develop` branch with a clear description of what changed and why.

Pull requests to `main` are reserved for releases and must go through the release process described below.

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code; source of truth for releases |
| `develop` | Active development; auto-publishes beta releases on push |

- All feature work and bug fixes target `develop`.
- Merging `develop` → `main` is the first step of a production release.
- Beta packages are auto-published to GitHub Packages with the `--tag beta` flag on every push to `develop` (version format: `4.x.x-beta.<shortSHA>`).

---

## Release Process

Releases are managed by maintainers. See [RELEASE.md](RELEASE.md) for the full release procedure.
