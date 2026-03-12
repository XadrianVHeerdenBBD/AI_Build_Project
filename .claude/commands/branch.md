# Branch

Create, switch, or clean up branches in the repo.

## Repo
`https://github.com/XadrianVHeerdenBBD/AI_Build_Project.git`

## Usage

Tell me what you want to do, e.g.:
- "create a branch for the quiz feature"
- "switch to main"
- "delete merged branches"
- "list all branches"

## Branch Naming Convention

Use kebab-case with a type prefix:

| Type | When to use | Example |
|------|-------------|---------|
| `feat/` | New feature | `feat/uml-builder-export` |
| `fix/` | Bug fix | `fix/auth-redirect-loop` |
| `refactor/` | Code restructure | `refactor/rtk-query-cleanup` |
| `docs/` | Documentation only | `docs/api-endpoints` |
| `chore/` | Config, deps, CI | `chore/update-dependencies` |

## Actions

### Create and switch to a new branch
```bash
git checkout -b <type>/<description>
git push -u origin <type>/<description>
```

### Switch to an existing branch
```bash
git fetch origin
git checkout <branch-name>
```

### List all branches (local + remote)
```bash
git branch -a
```

### Delete a branch that has been merged into main
```bash
# Local
git branch -d <branch-name>
# Remote
git push origin --delete <branch-name>
```

### Clean up all merged branches at once
```bash
git fetch --prune
git branch --merged main | grep -v "^\* main" | xargs git branch -d
```

## Safety Rules
- Never delete `main`
- Use `-d` (safe delete) not `-D` (force delete) unless the user explicitly asks
- Always check `git branch --merged main` before bulk-deleting to avoid losing unmerged work
