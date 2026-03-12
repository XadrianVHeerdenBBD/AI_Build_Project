# Commit

Stage and commit changes. If on `main`, automatically creates a hotfix branch, commits there, opens a PR, and pushes — never commits directly to main.

## Repo
`https://github.com/XadrianVHeerdenBBD/AI_Build_Project.git`

## Steps

### 1. Check current state
```bash
git status
git diff --stat
```
If nothing to commit, report and stop.

### 2. Check the branch
```bash
git branch --show-current
```

**If on `main`:** Do NOT commit here. Instead:
1. Stash any uncommitted changes: `git stash push -m "hotfix-stash"`
2. Create a hotfix branch: `git checkout -b hotfix/<short-description>` (derive description from the changes)
3. Pop the stash: `git stash pop`
4. Continue with steps 3–5 below on the hotfix branch
5. After committing, run the `/pr` skill automatically to open a PR for this hotfix

**If on a feature/hotfix branch:** Continue normally.

### 3. Review the diff
```bash
git diff
git diff --cached
```
Read the changes to understand what's being committed.

### 4. Stage files selectively
- **Include:** `app/`, `components/`, `lib/`, `api/`, `styles/`, `hooks/`, `middleware/`, config files, `.claude/`, docs
- **Skip:** `.env*`, `*.key`, `*.pem`, `node_modules/`, `.next/`, `.DS_Store`, `tsconfig.zip`, `.trunk/`

### 5. Write the commit message
Format:
```
<type>(<scope>): <short summary>

<optional body>
```
Types: `feat`, `fix`, `hotfix`, `refactor`, `docs`, `style`, `test`, `chore`
Scopes: `auth`, `quiz`, `student`, `educator`, `api`, `db`, `ci`, `security`

### 6. Commit
```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <summary>

<body if needed>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

### 7. If this was a hotfix from main
Immediately run the `/pr` skill to:
- Push the hotfix branch
- Open a PR against `main`
- Show the PR URL for review

### 8. Confirm
```bash
git log --oneline -5
```

## Safety Rules
- NEVER commit `.env*` files
- NEVER use `--no-verify`
- NEVER commit directly to `main` — hotfix branch + PR always
- If pre-commit hook fails, fix the issue and create a NEW commit (never --amend a pushed commit)
