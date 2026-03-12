# Setup Vercel

Connect this project to Vercel and configure it for auto-deploy from GitHub.

## Repo
`https://github.com/XadrianVHeerdenBBD/AI_Build_Project.git`

## Steps

### 1. Check Node / npm
```bash
node --version
npm --version
```
Confirm Node 18+ is installed (required by Vercel).

### 2. Install Vercel CLI (if not present)
```bash
npx vercel --version 2>&1
```
If not found: `npm i -g vercel`

### 3. Login to Vercel
```bash
npx vercel login
```
This opens a browser — sign in with GitHub using the `XadrianVHeerdenBBD` account so the repo is visible.

After login, confirm:
```bash
npx vercel whoami
```

### 4. Link the project
```bash
cd c:/Users/bbdnet3018/Downloads/02_Build && npx vercel link
```
When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → Your personal account
- **Link to existing project?** → No (create new)
- **Project name?** → `ai-build-project` (or accept default)
- **Directory?** → `./` (current directory)

This creates `.vercel/project.json` — do NOT commit this file (it's already in `.gitignore` via `.vercel`).

### 5. Set environment variables on Vercel
```bash
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
```
When prompted, paste the value from your `.env.local` file. Set for: **Production, Preview, Development**.

```bash
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Same — paste from `.env.local`, all environments.

```bash
npx vercel env add SUPABASE_SERVICE_ROLE_KEY
```
Get this from Supabase dashboard → Project Settings → API → service_role key.
Set for: **Production and Preview only** (not Development).

Verify all vars are set:
```bash
npx vercel env ls
```

### 6. Connect GitHub for auto-deploy
Tell the user:
> Go to https://vercel.com/dashboard → select your project → Settings → Git
> Under "Connected Git Repository", click Connect and select:
> `XadrianVHeerdenBBD/AI_Build_Project`
> Set Production Branch to: `main`
> Click Save.

After this, every `git push origin main` will trigger an automatic Vercel deployment.

### 7. Trigger first deployment
```bash
npx vercel --prod
```

### 8. Confirm
Report:
- Vercel account connected ✓/✗
- Project linked ✓/✗
- Environment variables set: list which ones ✓/✗
- GitHub auto-deploy connected ✓/✗
- First deploy URL

### Next steps
Once setup is complete, use `/deploy` for all future deployments.
