# PR

Create a pull request against `XadrianVHeerdenBBD/AI_Build_Project` on GitHub.

## Repo
`https://github.com/XadrianVHeerdenBBD/AI_Build_Project.git`
Base branch: `main`

## Steps

1. **Verify there are commits to PR**
   ```bash
   git status
   git log origin/main..HEAD --oneline
   ```
   If there are no commits ahead of `main`, report that and stop.

2. **Ensure the branch is pushed**
   ```bash
   git push -u origin <current-branch>
   ```
   If currently on `main`, stop and tell the user to create a feature branch first:
   ```bash
   git checkout -b feat/<description>
   ```

3. **Summarise all commits in the PR** (not just the latest — read ALL commits since diverging from `main`)
   ```bash
   git log origin/main..HEAD --format="%s%n%b"
   git diff origin/main...HEAD --stat
   ```

4. **Draft PR title and body**

   Title (under 70 chars): concise summary of the overall change.

   Body format:
   ```markdown
   ## Summary
   - <bullet 1>
   - <bullet 2>
   - <bullet 3>

   ## Changes
   - **Files changed**: list key files
   - **Database**: any schema changes or new tables?
   - **Env vars**: any new variables required?

   ## Test plan
   - [ ] Ran `npm run build` — no errors
   - [ ] Ran `npm run lint` — no errors
   - [ ] Tested auth flow (login, redirect by role)
   - [ ] Tested affected feature manually
   - [ ] No secrets committed

   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   ```

5. **Create the PR**
   ```bash
   gh pr create \
     --repo XadrianVHeerdenBBD/AI_Build_Project \
     --base main \
     --title "<title>" \
     --body "$(cat <<'EOF'
   <body>
   EOF
   )"
   ```

6. **Return the PR URL** to the user.

## Safety Rules
- Never force-push to `main`
- Never close or merge a PR without explicit user instruction
- If `gh` CLI is not installed, provide the manual GitHub URL to open the PR in the browser
