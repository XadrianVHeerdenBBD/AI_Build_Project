# Document

Generate comprehensive documentation for this Next.js Observer Pattern Learning Platform.

## Steps

1. **Scan the codebase** — read key files: `CLAUDE.md`, `README.md`, `package.json`, `next.config.mjs`, and the main source directories (`app/`, `components/`, `lib/`, `api/`).

2. **Generate or update the following docs** (create files only if they don't exist, otherwise update):

### `docs/ARCHITECTURE.md`
Document:
- High-level system architecture diagram (ASCII or Mermaid)
- App Router route structure with purpose of each route
- Student learning flow state machine (`pattern-selection` → `self-reflection` → `instructions` → `practice` → `practice-feedback` → `uml-builder` → `quiz` → `results`)
- Data layer: RTK Query vs direct Supabase calls — when each is used and why
- Key database tables and their relationships
- Auth flow (login → role check → redirect)

### `docs/COMPONENTS.md`
For each major component in `components/`:
- Component name and file path
- Purpose / responsibility
- Props interface
- Key state and side effects
- Which other components it renders or depends on

### `docs/API.md`
For each route in `app/api/`:
- HTTP method and path
- Request body / query params
- Response shape
- Auth requirements
- Which Supabase tables it reads/writes

### `docs/DATABASE.md`
Document all known tables from `CLAUDE.md` and any additional ones discovered:
- Table name
- Columns with types (infer from usage if schema file not present)
- Relationships / foreign keys
- Lookup values (bloom_level, question_format, quiz_type, sections)

### `docs/SETUP.md`
Step-by-step local development setup:
- Prerequisites (Node version, pnpm)
- Clone and install
- `.env.local` variables required
- Supabase project setup
- Running dev server and available commands

3. **Update `README.md`** — ensure it has a brief project description, links to the docs above, and the quick-start commands.

4. **Report** — list every file created or updated with a one-line summary of changes made.
