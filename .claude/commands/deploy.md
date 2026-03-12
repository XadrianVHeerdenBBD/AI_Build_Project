# Deploy

Deploy this Next.js Observer Pattern Learning Platform to Vercel.

## Repo
`https://github.com/XadrianVHeerdenBBD/AI_Build_Project.git`

## Steps

### 1. Run pre-flight checks (execute all of these)

**Build check:**
```bash
cd c:/Users/bbdnet3018/Downloads/02_Build && npm run build 2>&1
```
Report PASS or FAIL. If FAIL, show the errors and stop — do not deploy.

**Lint check:**
```bash
npm run lint 2>&1
```
Report PASS or FAIL. Errors block deploy; warnings are acceptable.

**Secrets scan:**
```bash
grep -r "eyJ" --include="*.ts" --include="*.tsx" --include="*.js" . --exclude-dir=node_modules --exclude-dir=.next -l 2>/dev/null
```
If any files found, list them and stop — do not deploy.

**Git state check:**
```bash
git status
git log --oneline -3
```
Confirm the latest changes are committed.

### 2. Check Vercel connection
```bash
npx vercel whoami 2>&1
```

- If **logged in**: continue to step 3
- If **not logged in**: tell the user to run `/setup-vercel` first, then come back to `/deploy`

### 3. Check if project is linked
```bash
npx vercel project ls 2>&1
cat .vercel/project.json 2>/dev/null || echo "not linked"
```

- If **linked**: skip to step 4
- If **not linked**: run `npx vercel link` and follow prompts, then continue

### 4. Deploy

**Preview deploy (safe — does not affect production):**
```bash
npx vercel 2>&1
```

**Production deploy:**
```bash
npx vercel --prod 2>&1
```

Ask the user which they want before running production.

### 5. Post-deploy verification
After deployment report the URL and ask the user to verify:
- Auth flow works (login + role redirect)
- `/student` redirects unauthenticated users to `/`
- `/educator/dashboard` requires educator role
- No console errors about missing env vars

### 6. Rollback if broken
```bash
npx vercel ls 2>&1
# Then promote previous deployment:
npx vercel promote <deployment-url> 2>&1
```

## Report output
Summarise:
- Pre-flight: build ✓/✗, lint ✓/✗, secrets ✓/✗
- Deploy URL (preview + production)
- Any follow-up actions needed
