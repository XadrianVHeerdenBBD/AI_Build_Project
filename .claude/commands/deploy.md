# Deploy

Deploy this Next.js Observer Pattern Learning Platform to Vercel.

## Pre-flight Checks

Before deploying, verify the following. **Stop and report any failure** — do not proceed to deployment with unresolved blockers.

1. **Build succeeds locally**
   ```bash
   npm run build
   ```
   Report any errors (TypeScript errors are warnings due to `ignoreBuildErrors: true`, but runtime errors matter).

2. **Lint passes**
   ```bash
   npm run lint
   ```
   Flag any errors (warnings are acceptable).

3. **Environment variables are defined**
   Confirm the user has set the following in their Vercel project (or prompt them to do so):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (if `lib/supabase/admin.ts` is used in API routes — check usage)

4. **No secrets in source**
   Quick scan: grep for any hardcoded keys or `.env` values accidentally committed.
   ```bash
   grep -r "eyJ" --include="*.ts" --include="*.tsx" --include="*.js" . --exclude-dir=node_modules
   ```

## Deployment Steps

### Option A — Vercel CLI (recommended)
```bash
# Install Vercel CLI if not present
npm i -g vercel

# Login (opens browser)
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Option B — GitHub Integration
The project repo is: https://github.com/XadrianVHeerdenBBD/AI_Build_Project

1. Push to the `main` branch: `git push origin main`
2. Vercel auto-deploys on push (if connected — link at https://vercel.com/new by importing the repo above)
3. Monitor build at https://vercel.com/dashboard

## Post-Deployment Verification

After deployment completes, verify:

1. **Auth flow** — visit the deployed URL, attempt login with a test student and educator account
2. **Student route** — confirm `/student` redirects unauthenticated users to `/`
3. **Educator route** — confirm `/educator/dashboard` is accessible only to educators
4. **API routes** — confirm at least one API call succeeds (check browser network tab)
5. **Environment** — confirm no `NEXT_PUBLIC_` variables are missing (check browser console for errors)

## Rollback

If the deployment is broken:
```bash
# List recent deployments
vercel ls

# Promote a previous deployment to production
vercel promote <deployment-url>
```

## Report

Output a summary with:
- Pre-flight check results (pass/fail for each)
- Deployment URL (preview and production)
- Any warnings or follow-up actions required
