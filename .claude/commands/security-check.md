# Security Check

Perform a thorough security audit of this Next.js + Supabase application.

## Scope

Check all files in `app/`, `api/`, `components/`, `lib/`, `middleware/`, and config files.

## Checks to Perform

### 1. Authentication & Authorization
- Verify every API route in `app/api/` validates the user session before processing requests
- Check that the Supabase service-role key (`lib/supabase/admin.ts`) is NEVER imported in client components or exposed to the browser
- Confirm `middleware.ts` protects `/student` and `/educator/dashboard` routes from unauthenticated access
- Check role-based access: students should not be able to access educator endpoints and vice versa

### 2. Environment Variables & Secrets
- Scan all source files for hardcoded secrets, API keys, passwords, or connection strings
- Verify `NEXT_PUBLIC_` prefix is only used for variables safe to expose to the browser
- Check `.env*` files are in `.gitignore`
- Flag any `supabaseAdmin` client usage that could be bundled client-side

### 3. Input Validation & Injection
- Check all API routes for missing input validation on request body/query params
- Look for SQL injection risks (raw query string concatenation with Supabase)
- Check for XSS risks: `dangerouslySetInnerHTML`, unsanitized user content rendered in JSX
- Verify form inputs are validated before submission

### 4. OWASP Top 10 (relevant to this stack)
- **A01 Broken Access Control** — unauthenticated data access, missing RLS checks
- **A02 Cryptographic Failures** — tokens or sensitive data logged or stored insecurely
- **A03 Injection** — SQL, NoSQL, command injection
- **A05 Security Misconfiguration** — debug mode in prod, permissive CORS, exposed stack traces
- **A07 Auth Failures** — weak session management, missing logout, token not invalidated
- **A09 Logging** — sensitive data (passwords, tokens) appearing in `console.log`

### 5. Next.js / Supabase Specific
- Confirm `createServerClient` (SSR) is used for server components, not the browser client
- Check that Row Level Security (RLS) is referenced/relied upon correctly
- Verify no Supabase anon key operations bypass intended RLS policies
- Check `next.config.mjs` for dangerous settings (e.g., disabling CSP, overly permissive headers)
- Look for missing `cache: 'no-store'` on sensitive server fetches

### 6. Dependency Vulnerabilities
- Run `npm audit` and report any high/critical CVEs
- Flag any packages with known security issues

## Output Format

Produce a report with three sections:

### CRITICAL (fix immediately)
Issues that could lead to data breach, auth bypass, or privilege escalation.

### WARNING (fix before production)
Issues that weaken the security posture but have mitigating factors.

### INFO (best-practice improvements)
Low-risk findings and hardening suggestions.

For each finding include:
- **File**: path and line number
- **Issue**: description of the vulnerability
- **Impact**: what an attacker could do
- **Fix**: concrete code change or configuration to resolve it
