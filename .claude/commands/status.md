# Status

Project health dashboard — run this to see everything at a glance.

## Steps

Run ALL of the following and compile a single report.

### 1. Git state
```bash
cd c:/Users/bbdnet3018/Downloads/02_Build
git branch --show-current
git status --short
git log --oneline -5
git log origin/main..HEAD --oneline 2>/dev/null
```

### 2. Unpushed / untracked files
```bash
git diff --stat HEAD 2>/dev/null
git stash list
```

### 3. Build health
```bash
npm run build 2>&1 | tail -20
```

### 4. Lint health
```bash
npm run lint 2>&1 | tail -20
```

### 5. Secrets check
```bash
ls -la .env* 2>/dev/null
grep -r "eyJ" --include="*.ts" --include="*.tsx" --include="*.js" . --exclude-dir=node_modules --exclude-dir=.next -l 2>/dev/null || echo "no hardcoded keys found"
```

### 6. Vercel connection
```bash
npx vercel whoami 2>&1
cat .vercel/project.json 2>/dev/null || echo "project not linked to Vercel"
```

### 7. Dependencies
```bash
npm audit --audit-level=high 2>&1 | tail -10
```

## Report Format

Output a clean dashboard like this:

```
====================================
  PROJECT STATUS — AI Build Project
====================================

GIT
  Branch:        <branch name>
  Uncommitted:   <count> files / none
  Unpushed:      <count> commits / none
  Last commit:   <hash> <message>

BUILD        ✓ PASS / ✗ FAIL
LINT         ✓ PASS / ✗ FAIL (N warnings)
SECRETS      ✓ clean / ✗ found in: <files>
ENV FILE     ✓ .env.local present / ✗ missing

VERCEL
  Logged in:     yes (<email>) / no → run /setup-vercel
  Project linked: yes (<project>) / no → run /setup-vercel

DEPENDENCIES  ✓ no high CVEs / ✗ N high, M critical

SUGGESTED NEXT ACTION: <one clear recommendation>
====================================
```

Always end with one suggested next action based on the state (e.g. "run /push to push 2 unpushed commits", "run /setup-vercel to connect Vercel", "fix 3 lint errors before deploying").
