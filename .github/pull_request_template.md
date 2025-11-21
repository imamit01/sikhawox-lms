# Pull Request

## What Changed
<!-- Brief description of changes -->

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Security improvement

## How to Test (Staging)

### Build & Lint
- [ ] `npm ci` - Clean install
- [ ] `npm run build` - Build passes
- [ ] `npm run lint` - No errors (warnings acceptable)

### Authentication
- [ ] Student login: PASS
- [ ] Instructor login: PASS
- [ ] Admin login: PASS
- [ ] Logout functionality: PASS

### Dashboards
- [ ] Student dashboard loads: PASS
- [ ] Instructor dashboard loads: PASS
- [ ] Admin dashboard loads: PASS
- [ ] No console errors: PASS

### Core Features
- [ ] Course creation (instructor): PASS
- [ ] User management (admin): PASS
- [ ] Marketplace loads: PASS
- [ ] Navigation works: PASS

## Environment Variables Required

### Required
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Optional
- `MUX_TOKEN_ID` (video streaming)
- `MUX_TOKEN_SECRET` (video streaming)
- `RAPIDAPI_KEY` (code execution)
- `RAPIDAPI_HOST` (code execution)
- `RESEND_API_KEY` (email)
- `SEED_PASSWORD` (user creation)

## Security Checklist
- [ ] No secrets committed to repository
- [ ] No hardcoded passwords in code
- [ ] Environment variables documented
- [ ] Database queries use RLS
- [ ] API routes validate authentication

## Screenshots
<!-- Add screenshots if applicable -->

## Related Issues
<!-- Link to related issues -->

## Deployment Notes
<!-- Any special deployment instructions -->

## Rollback Plan
<!-- How to rollback if this causes issues -->

---

## Reviewer Checklist
- [ ] Code follows project conventions
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No security vulnerabilities introduced
- [ ] Performance impact considered
