# Technical Debt & Known Gaps

This document tracks items that require real user data, known architectural trade-offs, and deferred work.

---

## Placeholder Content — Must Replace Before Launch

All items below are marked with `[PLACEHOLDER]` comments in the codebase.

| File | Field | Action required |
|---|---|---|
| `content/projects.ts` | `id`, `title`, `description`, `longDescription`, `tags`, `technologies`, `links.github` | Replace with real project data |
| `content/skills.ts` | All `name`, `category`, `proficiency`, `years` values | Update with real skill levels |
| `content/social-links.ts` | All `url` fields | Replace with real profile URLs (github.com/username, etc.) |
| `components/sections/contact.tsx` | `CONTACT_EMAIL`, `GITHUB_URL`, `LINKEDIN_URL`, `TWITTER_URL` | Replace with real URLs |
| `components/layout/footer.tsx` | Tagline text | Replace with real value-proposition copy |
| `app/layout.tsx` | `metadata.description`, `openGraph.*`, `twitter.*` | Replace with real SEO copy |
| `docs/` | Any documentation referencing "Storm" as a placeholder name | Replace with real name/brand |

---

## Known Trade-offs

### About page keeps `'use client'`
The `app/about/page.tsx` remains a client component because it uses Framer Motion entrance animations. A server/client split would require extracting the animated wrapper into a dedicated client component for a negligible bundle saving (Framer Motion is already loaded by `hero.tsx`). Revisit if the About page grows significantly in static content.

### Contact section social links are duplicated
`components/sections/contact.tsx` has its own hardcoded social URLs (as named constants) separate from `content/social-links.ts`. The footer reads from the content file correctly. The contact section's "Follow Me" card should be updated to read from `content/social-links.ts` as a follow-up.

### No toast context / global notification system
Both `waitlist-form.tsx` and `contact-form.tsx` manage their own inline status messages (using `useState`) rather than a shared Toast system. This is intentional for simplicity — the `components/ui/toast.tsx` component exists but integrating a full toast provider was deferred. If more forms are added, extract a shared `useFormFeedback` hook or wire up the existing Toast component.

### No test runner configured
`package.json` has no Jest or Vitest setup. The optional PBT tasks (10.2–10.8) require test infrastructure to be set up first (task 10.1). This is explicitly deferred — the implementation tasks alone constitute v1.0.

### WorldForge page (`app/worldforge/page.tsx`)
The dedicated WorldForge page was not modified during the production polish pass. It may still reference the old non-functional waitlist button rather than `<WaitlistForm />`. Verify and update as a follow-up.

---

## Security Notes

- The `/api/contact` and `/api/waitlist` routes do not persist data — they need a real email service (Resend, SendGrid, etc.) or database integration before production.
- No rate limiting on the API routes. Add before public launch.
- `console.error(error)` in `app/error.tsx` is intentional for debugging; consider removing or sending to a logging service in production.
