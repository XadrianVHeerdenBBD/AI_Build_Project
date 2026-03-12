# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Observer Pattern Learning Platform** — a Next.js 16+ app (App Router) for teaching the Observer design pattern. Two user roles: **Student** and **Educator**. Backed by Supabase (PostgreSQL + Auth).

## Commands

```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Production build (TypeScript errors are ignored — see next.config.mjs)
npm run lint       # Run ESLint
npm start          # Start production server
```

Environment variables required (create `.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Architecture

### Routing (App Router)
- `/` — Auth entry point (login/signup/forgot-password/reset-password rendered as client-side state machine)
- `/student` — Student learning flow (server component, requires auth, redirects to `/` if unauthenticated)
- `/educator/dashboard` — Educator analytics dashboard
- `/app/api/` — Next.js API routes for auth, quizzes, patterns, reflections, results

### Student Learning Flow
`StudentDashboard` (`components/dashboards/student-dashboard.tsx`) manages a client-side page state machine:
`pattern-selection` → `self-reflection` → `instructions` → `practice` → `practice-feedback` → `uml-builder` → `quiz` → `results`

### Data Layer
- **RTK Query** (`api/store.ts` + `api/services/`) — used for educator dashboard and final quiz data fetching directly from Supabase via `fakeBaseQuery`
- **Direct Supabase calls** — used in API routes and some components via `lib/supabase/server.ts` (server-side) and `lib/supebase.ts` (client-side — note typo in filename)
- **`lib/supabase/`** — `client.ts` (browser), `server.ts` (SSR/RSC), `admin.ts` (service role), `types.ts` (empty placeholder)

### Key Database Tables
`users` (id, first_name, last_name, role, email), `question_content`, `question`, `quiz_type`, `question_quiz_type`, `quiz_attempt`, `bloom_level`, `difficulty_level`, `question_format`, `sections`

### Lookup Values
- `bloom_level`: Remember, Understand, Apply, Analyze, Evaluate, Create
- `question_format`: multiple-choice, select-multiple, fill-in-blank, identify-error, uml-interactive, drag-drop
- `quiz_type`: Practice Quiz, Final Quiz
- `sections`: Theory & Concepts, Code Implementation, Pattern Participants/Relationships, UML Diagrams

### UI Stack
- **shadcn/ui** (Radix UI primitives) + **Tailwind CSS v4**
- **Recharts** for educator dashboard charts
- **@xyflow/react** for UML builder drag-and-drop
- **Framer Motion** for animations
- Primary color: Teal (`#0D9488`); Font: Poppins

### Auth Flow
Login POSTs to `/api/auth/login` → Supabase `signInWithPassword` → fetches `users` table for role → redirects to `/student` or `/educator/dashboard` based on role. Session managed via Supabase SSR cookies.

### Important Notes
- `next.config.mjs` has `typescript: { ignoreBuildErrors: true }` — TypeScript errors won't fail the build
- The client-side Supabase import is `lib/supebase.ts` (typo — missing 'a'), while server-side uses `lib/supabase/server.ts`
- Redux `Provider` is in `app/providers.tsx` wrapping the entire app
