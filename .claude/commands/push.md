# Push

Push the current branch to GitHub.

## Repo
`https://github.com/XadrianVHeerdenBBD/AI_Build_Project.git`

## Steps

### 1. Check state
```bash
git branch --show-current
git status
git log origin/$(git branch --show-current)..HEAD --oneline 2>/dev/null || git log --oneline -5
```

If there are **no commits ahead of the remote**, report that and stop.

If there are **uncommitted changes**, tell the user to run `/commit` first.

### 2. Check remote exists
```bash
git remote -v
```
If no remote named `origin`, add it:
```bash
git remote add origin https://github.com/XadrianVHeerdenBBD/AI_Build_Project.git
```

### 3. Push
```bash
git push -u origin $(git branch --show-current) 2>&1
```

If push fails with "remote contains work":
```bash
git pull --rebase origin $(git branch --show-current) 2>&1
git push origin $(git branch --show-current) 2>&1
```

If push fails with auth error, tell the user:
```
Run: /c/Program\ Files/GitHub\ CLI/gh.exe auth login
Choose: GitHub.com → HTTPS → Login with a web browser
Then retry /push
```

### 4. Confirm
```bash
git log --oneline -3
```
Report the branch name, number of commits pushed, and the GitHub URL:
`https://github.com/XadrianVHeerdenBBD/AI_Build_Project/tree/<branch-name>`

### Notes
- Never force-push `main`
- Force-pushing a feature branch is acceptable only if the user explicitly requests it
