# Ship

Full autonomous pipeline: read the task → branch → code → security check → build → commit → push → PR → self-review → report.

You are an autonomous agent. Work through every phase in order. Stop and ask the user ONLY if you hit a blocker you cannot resolve.

## Usage
```
/ship <task description>
```
Examples:
- `/ship fix the reflection form endpoint to require authentication`
- `/ship add loading skeleton to the student dashboard pattern selection page`
- `/ship update the educator dashboard to show quiz attempt counts per student`

---

## PHASE 1 — Understand the task

1. Parse the task description to identify:
   - **Type**: `feat`, `fix`, `hotfix`, `refactor`, `security`, `docs`
   - **Scope**: which part of the app is affected (`auth`, `quiz`, `student`, `educator`, `api`, `db`, `ui`)
   - **Files likely affected**: based on the CLAUDE.md architecture and task description

2. Read all files that will be touched before writing a single line of code:
   - Read the target files in full
   - Read any files they import from that are relevant
   - Understand the existing pattern before changing anything

3. State your plan in one short paragraph before proceeding. Do not ask for approval — just state it and continue.

---

## PHASE 2 — Branch

Check current branch:
```bash
git branch --show-current
git status
```

- If on `main` or if there are unrelated uncommitted changes: create a new branch
- Branch naming: `<type>/<scope>-<short-description>` e.g. `fix/auth-reflection-form-guard`
```bash
git checkout -b <branch-name>
```

- If already on a clean feature branch that matches the task: use it
- Never work directly on `main`

---

## PHASE 3 — Implement

Make the code changes required to complete the task.

Rules:
- Read each file fully before editing it
- Make the minimum change needed — don't refactor unrelated code
- Follow existing patterns in the file (same import style, same error handling pattern, same naming)
- Never add `console.log` statements
- Never add comments to code you didn't change
- If the task requires a new API route, follow the existing route pattern in `app/api/`
- If the task touches auth, always use `getUser()` from `lib/auth/get-user.ts`
- If the task touches Supabase on the server, use `createServerSupabase()` from `lib/supabase/server.ts`
- Never import `supabaseAdmin` in any component or client-side code

---

## PHASE 4 — Security check (focused)

After implementing, scan only the files you changed:

1. **Auth guard** — does every new/modified API route call `getUser()` and return 401 if null?
2. **Ownership check** — does any query fetch data that should be scoped to the authenticated user?
3. **Hardcoded secrets** — any keys, tokens, or URLs hardcoded?
4. **Input validation** — are new request body fields validated before use?
5. **XSS** — any new `dangerouslySetInnerHTML` with unsanitised input?

If you find a security issue: fix it immediately before continuing. Do not ship insecure code.

---

## PHASE 5 — Build and lint

```bash
cd c:/Users/bbdnet3018/Downloads/02_Build && npm run build 2>&1 | tail -30
```

```bash
npm run lint 2>&1 | tail -20
```

- **Build FAIL** → fix the errors, then re-run. If you cannot fix after 2 attempts, stop and explain the blocker to the user.
- **Lint errors** → fix them. Lint warnings are acceptable.
- **Build PASS + lint clean** → continue.

---

## PHASE 6 — Commit

Stage only the files you changed (never `git add .`):
```bash
git add <file1> <file2> ...
```

Verify nothing sensitive is staged:
```bash
git diff --cached --name-only | grep -i env
```
If any `.env*` file appears: `git restore --staged <file>` immediately.

Commit with a conventional message:
```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <short summary of what changed>

<1-2 sentences on WHY this change was made>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## PHASE 7 — Push

```bash
git push -u origin $(git branch --show-current) 2>&1
```

If push fails with auth error:
- Stop and tell the user: "GitHub auth needed. Run: `/c/Program\ Files/GitHub\ CLI/gh.exe auth login` then retry `/ship`"

---

## PHASE 8 — Open PR

Create the PR using `gh`:
```bash
gh pr create \
  --repo XadrianVHeerdenBBD/AI_Build_Project \
  --base main \
  --title "<type>(<scope>): <summary>" \
  --body "$(cat <<'EOF'
## What changed
<1-3 bullet points describing the change>

## Why
<reason — bug fix, security issue, feature request, etc.>

## Files changed
<list the key files>

## Security
- [ ] Auth guards verified on all modified API routes
- [ ] No secrets committed
- [ ] Input validation present on new fields

## Test plan
- [ ] `npm run build` — PASS
- [ ] `npm run lint` — PASS
- [ ] Manually verified: <describe what to test>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

If `gh` is not authenticated:
- Build the PR URL manually and give it to the user:
  `https://github.com/XadrianVHeerdenBBD/AI_Build_Project/compare/main...<branch-name>`

---

## PHASE 9 — Self-review

After the PR is created, read your own diff critically:

```bash
git diff origin/main...HEAD
```

Check for:
- Anything you would flag in a code review of someone else's work
- Logic errors or edge cases not handled
- Inconsistency with the surrounding code style
- Any TODO or incomplete code left in

If you find issues: fix them, commit with `fix: address self-review feedback`, push again.

---

## PHASE 10 — Final report

Output a clean summary:

```
====================================
  SHIP COMPLETE
====================================

TASK:    <original task description>
BRANCH:  <branch name>
PR:      <PR URL>

PHASES
  ✓ Understood task
  ✓ Branched: <branch>
  ✓ Implemented: <N files changed>
  ✓ Security: clean
  ✓ Build: PASS
  ✓ Lint: PASS
  ✓ Committed: <commit hash>
  ✓ Pushed
  ✓ PR opened
  ✓ Self-reviewed

CHANGES MADE
<bullet list of every file modified with one-line description>

NEXT STEP
Review the PR at <URL> and merge when ready.
If issues are found, run: /ship fix <description>
====================================
```

---

## Hard stops — always pause and ask the user before continuing if:
- Build fails after 2 fix attempts
- A security issue is found that you don't know how to fix safely
- The task description is ambiguous about which component/route to change and there are 2+ plausible options
- The task would require a database schema change (new table, new column, migration)
- `gh auth` is not set up and the PR cannot be created
