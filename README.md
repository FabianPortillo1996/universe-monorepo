# universe-monorepo

A TypeScript-based [Turborepo](https://turborepo.dev) monorepo with Next.js 16, Storybook 10, and a shared React component library. All code is written in TypeScript with ESLint 9 and Prettier for code quality.

**Last Updated:** 2026-02-20 | **Node:** >=18 | **pnpm:** 9.0.0 | **Turbo:** ^2.8.10

## What's Inside

### Apps

- **`apps/web`** — Main Next.js 16 application (port 3000)
  - App Router with TypeScript
  - Tailwind CSS 4 styling
  - Uses `@repo/ui` component library
  - Scripts: `dev`, `build`, `start`, `lint`, `check-types`

- **`apps/docs-web`** — Storybook 10 component documentation & testing (port 6006)
  - Displays components from `packages/ui`
  - Vitest + Playwright browser testing for component interactions
  - Chromatic integration for visual regression testing
  - Scripts: `dev`, `build`, `storybook:build`, `chromatic`, `lint`, `check-types`

### Packages

- **`@repo/ui`** — React component library with Tailwind CSS
  - Atomic design: atoms, molecules, organisms, templates
  - Currently includes `Button` atom with stories and tests
  - Exports: See `packages/ui/src/index.ts`
  - Storybook integration for development & testing
  - Scripts: `build`, `lint`, `check-types`

- **`@repo/eslint-config`** — Shared ESLint configurations
  - Exports: `base`, `next`, `react-library`, `react-native`
  - ESLint 9 with TypeScript support
  - Includes security, import ordering, and code quality rules

- **`@repo/typescript-config`** — Shared TypeScript configurations
  - Exports: `base`, `next`, `react-library`, `react-native`
  - Base, app-specific, and library configurations

## Quick Start

### Prerequisites

- **Node.js** >=18
- **pnpm** 9.0.0 (or higher)

### Setup

```bash
# Install dependencies
pnpm install

# Start all dev servers (web on :3000, docs on :6006)
pnpm dev

# Or start a specific app
pnpm dev --filter=web
pnpm dev --filter=docs-web
```

### Available Scripts

**Root-level commands** (run from monorepo root):

```bash
pnpm dev              # Start all dev servers (Next.js + Storybook)
pnpm build            # Build all apps & packages
pnpm start            # Start Next.js production server
pnpm lint             # ESLint all code (zero warnings)
pnpm check-types      # TypeScript type checking
pnpm storybook:build  # Build Storybook static site
pnpm format           # Format code with Prettier
pnpm commit           # Conventional commit with commitizen
```

**Workspace-specific** (use `--filter` flag):

```bash
pnpm dev --filter=web              # Start Next.js dev server
pnpm dev --filter=docs-web         # Start Storybook dev server
pnpm build --filter=@repo/ui       # Build UI package
pnpm lint --filter=web             # Lint only web app
```

## Architecture

```
universe-monorepo
├── apps/
│   ├── web                    Next.js 16 application
│   │   ├── app/               App Router
│   │   ├── public/            Static assets
│   │   └── package.json       ESLint config: @repo/eslint-config/next
│   │
│   └── docs-web               Storybook documentation
│       ├── .storybook/        Storybook configuration
│       ├── vitest.config.ts   Vitest + Playwright config
│       └── package.json       Includes Chromatic token
│
├── packages/
│   ├── ui/                    React component library
│   │   ├── src/
│   │   │   ├── atoms/         Buttons, inputs, etc.
│   │   │   ├── molecules/     Component combinations
│   │   │   ├── organisms/     Complex components
│   │   │   └── index.ts       Public exports
│   │   └── dist/              Compiled TypeScript
│   │
│   ├── eslint-config/         ESLint configurations
│   │   ├── base.mjs           Base rules (all projects)
│   │   ├── next.mjs           Next.js rules
│   │   ├── react-library.mjs  React library rules
│   │   └── react-native.mjs   React Native (unused)
│   │
│   └── typescript-config/     TypeScript configurations
│       ├── base.json          Base tsconfig
│       ├── next.json          Next.js tsconfig
│       ├── react-library.json React library tsconfig
│       └── react-native.json  React Native (unused)
│
├── .husky/                Git hooks
├── turbo.json             Turbo task definitions
├── pnpm-workspace.yaml    Workspace declaration
└── package.json           Root dependencies & scripts
```

## Task Orchestration (Turbo)

Turbo caches outputs and intelligently re-runs tasks based on dependencies:

| Task              | Cached | Dependencies              | Files                  |
| ----------------- | ------ | ------------------------- | ---------------------- |
| `build`           | ✓      | Runs after `^build`       | `.next/**`, `dist/**`  |
| `dev`             | ✗      | None                      | (persistent, no cache) |
| `lint`            | ✓      | Runs after `^lint`        | (default inputs)       |
| `check-types`     | ✓      | Runs after `^check-types` | (default inputs)       |
| `storybook:build` | ✓      | None                      | `storybook-static/**`  |

Configuration: See `turbo.json`

## Testing

### Component Stories (Storybook + Vitest)

Component stories are in `packages/ui/src/**/*.stories.tsx`. Each story has:

1. **Interaction Tests** — User flows (click, keyboard, focus)
2. **Visual Tests** — CSS classes and variants
3. **State Tests** — Props and edge cases
4. **Integration Tests** — Component logic + UI

Example story with tests:

```typescript
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./button";

export const ClickFires: Story = {
  args: { onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
```

Run tests with Vitest in browser:

```bash
cd apps/docs-web
pnpm dev          # Run Storybook in dev mode
# Tests run automatically in browser via Playwright
```

## Linting & Type Checking

### ESLint

ESLint 9 configuration per workspace:

```bash
# Lint all code
pnpm lint

# Lint specific workspace
pnpm lint --filter=web

# Fix auto-fixable issues
pnpm lint -- --fix
```

**Rules include:**

- TypeScript best practices
- Import ordering and validation
- React hooks rules
- Security checks
- Code quality (SonarJS, Unicorn)
- Tailwind CSS class organization

### Type Checking

TypeScript 5.9.3 with strict mode:

```bash
pnpm check-types        # Type check all code
pnpm check-types --filter=web   # Specific workspace
```

### Code Formatting

Prettier 3.8.1 auto-formatting:

```bash
pnpm format             # Format all code (*.ts, *.tsx, *.md)
```

## Development Workflow

### 1. Create a New Component

```bash
# Add to packages/ui/src/atoms/[component-name]/
mkdir packages/ui/src/atoms/my-component
cd packages/ui/src/atoms/my-component

# Create files:
# - my-component.tsx       (component)
# - my-component.types.ts  (prop types)
# - my-component.classes.ts (Tailwind classes)
# - my-component.stories.tsx (Storybook + tests)
# - my-component.test.stories.tsx (additional test stories)
# - index.ts              (export)
```

### 2. Test in Storybook

```bash
pnpm dev --filter=docs-web   # Start Storybook
# Open http://localhost:6006
# Stories auto-hot-reload
```

### 3. Test Interactions

Add `play` function to stories:

```typescript
import { expect, userEvent, within } from "storybook/test";

export const InteractionStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Test user interactions
  },
};
```

### 4. Lint & Type Check

```bash
pnpm lint --filter=@repo/ui
pnpm check-types --filter=@repo/ui
```

### 5. Build

```bash
pnpm build                  # Build all
# or
pnpm build --filter=@repo/ui
```

## Git & Commits

### Conventional Commits

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>
```

**Types:** `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`

**Examples:**

```bash
feat(ui): add Button component
fix(web): resolve navigation bug
chore(deps): update to Node 20
```

### Using Commitizen

```bash
pnpm commit    # Interactive commit prompt
```

Or commit normally (hooks will validate):

```bash
git commit -m "feat(ui): add Button component"
```

## CI/CD Setup

Configured workflows in `.github/workflows/` (if present):

- **Lint & Type Check** — Run on PR
- **Storybook Build** — Build for visual regression testing
- **Chromatic** — Visual testing via Chromatic service
- **Deploy** — Production deployment (Next.js to Vercel, Storybook to Chromatic)

Environment variables required (in `.env` or `.env.local`):

- `CHROMATIC_PROJECT_TOKEN` — For visual regression testing (see `apps/docs-web/chromatic.config.json`)

## Dependencies

### Core

- **turborepo** ^2.8.10 — Task orchestration
- **pnpm** 9.0.0 — Package manager
- **TypeScript** 5.9.3 — Language & type system

### Frontend

- **Next.js** 16.1.6 — React framework (web app)
- **React** ^19.2.4 — UI library
- **Tailwind CSS** ^4.2.0 — Utility CSS framework
- **Storybook** ^10.2.10 — Component documentation
- **Vite** ^7.3.1 — Build tool (Storybook)

### Testing

- **Vitest** ^4.0.18 — Unit & component tests
- **Playwright** ^1.58.2 — E2E & browser testing
- **@vitest/browser-playwright** — Browser testing integration

### Code Quality

- **ESLint** ^9.39.3 — Linting
- **Prettier** ^3.8.1 — Code formatting
- **typescript-eslint** ^8.56.0 — TypeScript linting
- **commitlint** ^20.4.2 — Commit validation

### Utilities

- **clsx** ^2.1.1 — Conditional class names
- **husky** ^9.1.7 — Git hooks

## Updating Dependencies

```bash
# Update all dependencies to latest
pnpm update -r

# Update specific package
pnpm update @storybook/react-vite@latest -r

# Check for outdated packages
pnpm outdated
```

## Troubleshooting

### Port Already in Use

If port 3000 or 6006 is in use:

```bash
# Next.js (web) on custom port
cd apps/web && pnpm dev -- --port 3001

# Storybook (docs-web) on custom port
cd apps/docs-web && pnpm dev -- -p 6007
```

### Module Not Found Errors

Ensure all workspace dependencies are correctly declared:

```bash
# Check workspace integrity
pnpm install

# Verify TypeScript paths
pnpm check-types
```

### ESLint Errors

```bash
# Fix auto-fixable issues
pnpm lint -- --fix

# Check specific file
pnpm lint -- apps/web/app/page.tsx
```

### Storybook Build Fails

```bash
# Clean cache and rebuild
rm -rf apps/docs-web/storybook-static
pnpm storybook:build --filter=docs-web
```

## Remote Caching (Vercel)

Optional: Configure Turbo Remote Caching for team collaboration:

```bash
# Authenticate with Vercel
pnpm dlx turbo@latest login

# Link to remote cache
turbo link

# Remote cache is now active for all turbo commands
```

See [Turbo Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) for details.

## Useful Links

- **Turborepo Docs** — https://turborepo.dev/docs
- **Storybook Testing** — https://storybook.js.org/docs/testing/vitest
- **ESLint 9 Migration** — https://eslint.org/docs/latest/use/migrate-to-9.0.0
- **TypeScript 5.9** — https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html
- **Next.js 16** — https://nextjs.org/docs
- **Tailwind CSS 4** — https://tailwindcss.com/docs
- **pnpm** — https://pnpm.io/

## License

MIT
