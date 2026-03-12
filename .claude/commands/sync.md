# Sync

Pull the latest changes from `main` into the current branch and resolve any conflicts.

## Repo
`https://github.com/XadrianVHeerdenBBD/AI_Build_Project.git`

## Steps

1. **Check current state**
   ```bash
   git status
   git branch --show-current
   ```
   If there are uncommitted changes, stash them first:
   ```bash
   git stash push -m "pre-sync stash"
   ```

2. **Fetch latest from remote**
   ```bash
   git fetch origin
   ```
   Show what's new on `main`:
   ```bash
   git log HEAD..origin/main --oneline
   ```

3. **Update the current branch**

   - If on `main`:
     ```bash
     git pull origin main
     ```
   - If on a feature branch, rebase onto latest `main` (preferred over merge to keep history clean):
     ```bash
     git rebase origin/main
     ```

4. **Handle conflicts (if any)**
   - List conflicted files: `git status`
   - For each conflict, read the file and resolve it — prefer the feature branch changes unless `main` has intentional structural changes
   - After resolving: `git add <file>` then `git rebase --continue`
   - If resolution is too complex, abort and inform the user: `git rebase --abort`

5. **Restore stash (if stashed in step 1)**
   ```bash
   git stash pop
   ```
   Resolve any stash conflicts the same way.

6. **Verify**
   ```bash
   git log --oneline -10
   npm run build
   ```
   Report build result and whether sync was clean or had conflicts.

## Safety Rules
- Never use `git reset --hard` without explicit user approval
- Never force-push to `main`
- If a rebase produces unexpected results, `git rebase --abort` and explain what happened
