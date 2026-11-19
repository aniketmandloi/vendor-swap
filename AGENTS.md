<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# VendorSwap

VendorSwap gives solo dental practices a neutral verdict on every vendor in their software stack. Each verdict is "replace now", "replace with caveats", or "keep". `idea.md` describes the product. GitHub issue #1 is the roadmap. Build M0, the validation landing page, first. Start M1, the MVP, only after the page passes the validation gate in #1.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Installs dependencies. CI uses `npm ci`. |
| `npm run lint` | Runs ESLint with the `eslint-config-next` rules. |
| `npm run typecheck` | Generates Next route types, then runs `tsc --noEmit`. Plain `tsc` fails on a fresh checkout. |
| `npm test` | Runs Vitest once. |
| `npm run build` | Builds the production app. |
| `npm run db:schema` | Applies `db/schema.sql` to the database in `DATABASE_URL`, read from the environment or `.env.local`. Safe to rerun. |

CI (`.github/workflows/ci.yml`) runs lint, typecheck, and test on every push and pull request. Run all three, plus `npm run build`, before you open a PR.

Do not start the dev server. The owner starts it and checks pages by hand. When a change is visible, list what the owner should check on screen.

## Stack

- Next.js 16 with the App Router, TypeScript in strict mode, and the `src/` directory. Import from `src` with `@/`.
- `cacheComponents` is on in `next.config.ts`. Read the caching guide in `node_modules/next/dist/docs/` before you write code that reads data or request state.
- Tailwind CSS 4, loaded through the `@tailwindcss/turbopack` loader. There is no `tailwind.config` file. Theme tokens live in `src/app/globals.css`.
- Vitest with no config file. Put each test next to its source as `*.test.ts` or `*.test.tsx`. Render server components with `renderToStaticMarkup` from `react-dom/server`, and assert on the markup.
- Planned for M1 are Postgres on Neon through the Vercel Marketplace, and hosting on Vercel. Do not add a dependency without asking the owner.

## Product rules the code must keep

- **One report model.** The sample report on the landing page and the real MVP report render from one typed model and one component. Do not fork the model.
- **Deterministic verdicts.** A rules table over a curated vendor catalog picks every verdict. An LLM may only read bills and suggest a practice function for an unknown vendor. The same inputs always give the same report.
- **No patient data.** Never store raw bills. Keep only the confirmed vendor lines, the workflow answers, and the report.
- **Stay in scope.** The out-of-scope list in `idea.md` and #1 is binding. Examples are human review, install management, integrations, payments, and email alerts.

## Workflow

1. Take the lowest-numbered open issue whose dependencies in #1 are done.
2. Work in a git worktree off `origin/main`, on a branch named `<type>/<short-topic>`, for example `chore/scaffold-nextjs`.
3. Commit each verified logical change on its own. Commit subjects use Conventional Commits, `type(scope): subject`, in the imperative.
4. Open a PR to `main` with the sections `## Why`, `## What changed`, `## Scope`, and `## Verification`, and put `Closes #N` in the body.
5. Wait for CI to pass. Then merge with a merge commit (`gh pr merge --merge`), not a squash, so the atomic commits stay on `main`.
6. Keep the branch, locally and on GitHub. Remove the worktree only after `git status` shows it is clean. Pull `main`.
7. Confirm the issue closed. If it did not, close it with a comment that links the PR.

## Model preference

Pick the subagent model by the kind of work. This keeps cost low without lowering quality where judgment matters.

| Work | Model |
| --- | --- |
| Mechanical work, for example scaffolding, CLI and `gh` runs, bulk file edits, searches, and running checks | Claude Haiku 5.5 at high effort |
| Feature and bug-fix code, design, code review, and prose such as docs, PR descriptions, and reports | Claude Opus 5.5 at high effort |

In Claude Code, pass `model: "haiku"` and `effort: "high"` on the Agent call for mechanical work. When a subagent does the work, the parent agent still reviews the diff and reruns the checks before it commits or opens a PR.
