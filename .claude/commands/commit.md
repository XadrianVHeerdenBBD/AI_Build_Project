# Commit

Stage and commit changes to the local repo with a well-structured commit message.

## Repo
`https://github.com/XadrianVHeerdenBBD/AI_Build_Project.git`

## Steps

1. **Check current state**
   ```bash
   git status
   git diff --stat
   ```
   If there is nothing to commit, report that and stop.

2. **Review what changed**
   Read the diff to understand the nature of the changes:
   ```bash
   git diff
   git diff --cached
   ```

3. **Stage files**
   Stage specific files by name — never use `git add -A` or `git add .` blindly.
   - Skip: `.env*`, `*.key`, `*.pem`, any file with secrets
   - Skip: build artefacts (`/.next/`, `/node_modules/`)
   - Include: source files in `app/`, `components/`, `lib/`, `api/`, `styles/`, config files, docs

4. **Write the commit message**
   Follow this format:
   ```
   <type>(<scope>): <short summary>

   <optional body — what changed and why, not how>
   ```
   Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`
   Scope: area of the app (e.g. `auth`, `student-dashboard`, `quiz`, `educator`, `api`, `db`, `ci`)

   Examples:
   - `feat(quiz): add drag-drop question format support`
   - `fix(auth): redirect unauthenticated users before page render`
   - `docs(setup): add Supabase RLS configuration steps`

5. **Commit**
   ```bash
   git commit -m "$(cat <<'EOF'
   <type>(<scope>): <summary>

   <body if needed>

   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   EOF
   )"
   ```

6. **Confirm**
   Run `git log --oneline -5` and show the user the latest commits so they can verify.

## Safety Rules
- NEVER amend a commit that has already been pushed
- NEVER use `--no-verify` to skip hooks
- NEVER commit to `main` directly — see `/pr` to open a pull request instead
- If a pre-commit hook fails, fix the underlying issue and create a new commit
