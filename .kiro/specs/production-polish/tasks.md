# Implementation Plan: Production Polish & Final Quality Pass

## Overview

This plan converts the StormOS v0.9 codebase to v1.0 by executing the design in six dependency-ordered work areas: foundation (content, validation, hooks), core layout polish, UI component upgrades, section component rewrites, page-level polish, tests, and documentation sync. Every task builds directly on prior steps with no orphaned code.

**Changes from initial draft:**
- Removed `hooks/use-reduced-motion.ts` wrapper — `useReducedMotion` imported from `framer-motion` directly per component.
- Removed `components/features/` directory — forms and grid live in `components/sections/` where they belong.
- Descoped About page server-component conversion (Req 15.1) — Framer Motion requires `'use client'`; bundle cost is negligible.
- `useScrollProgress` returns `number | null` to support static bar on reduced motion (fixes Req 14.3).
- Removed PBT for hero stagger delays (trivial arithmetic) and replaced ARIA PBT with example tests.
- Fixed task ordering: WaitlistForm creation now precedes WorldForge wiring.

---

## Tasks

- [ ] 1. Foundation — Content files, validation schemas, and hooks
  - [ ] 1.1 Populate `content/projects.ts` with placeholder-marked entries and JSDoc
    - Add at least one representative `Project` entry (all fields per the `Project` type) with `[PLACEHOLDER]` JSDoc comments on fields needing real data
    - Add JSDoc block at the top of the file explaining the data structure and placeholder convention
    - _Requirements: 1.6, 18.4_

  - [ ] 1.2 Populate `content/skills.ts` with placeholder-marked entries and JSDoc
    - Add representative `Skill` entries covering at minimum Frontend, Backend, and Tools & DevOps categories with `proficiency` values 0–100
    - Add JSDoc block explaining the structure and `[PLACEHOLDER]` convention
    - _Requirements: 1.7, 18.4_

  - [ ] 1.3 Populate `content/social-links.ts` with placeholder-marked entries and JSDoc
    - Add GitHub, LinkedIn, Twitter entries with `[PLACEHOLDER: replace with real URL]` comments on `url` fields
    - Export matches `SocialLink[]` type; add JSDoc block
    - _Requirements: 1.5, 1.8, 12.1, 18.4_

  - [ ] 1.4 Create `lib/validations.ts` with Zod schemas for contact and waitlist forms
    - Export `contactFormSchema`: `name` min 2, `email` valid email, `subject` optional, `message` min 10
    - Export `waitlistSchema`: `email` valid email
    - Export inferred types `ContactFormData` and `WaitlistFormData`
    - _Requirements: 10.1–10.3, 9.4_

  - [ ] 1.5 Create `hooks/use-scroll-progress.ts`
    - Returns `number | null`: `null` when `prefers-reduced-motion` is active (no scroll listener attached); a clamped `number` in `[0, 1]` otherwise
    - Throttled via `requestAnimationFrame`; debounces to ~100ms
    - Calculation: `scrollY / (scrollHeight - viewportHeight)`, clamped to `[0, 1]`
    - Edge case: if `scrollHeight === viewportHeight`, returns `0` (no division by zero)
    - Export `calculateScrollProgress(scrollY, scrollHeight, viewportHeight): number` as a named pure function for testability
    - _Requirements: 14.1, 14.2, 14.3_

- [ ] 2. Core layout — `page-wrapper.tsx`, `navigation.tsx`, `footer.tsx`
  - [ ] 2.1 Update `components/layout/page-wrapper.tsx`: add `id="main-content"` and `role="main"` to `<main>`
    - Add `id="main-content"` and `role="main"` to the `<main>` element
    - Add skip link as the first child of the root `<div>`: visually hidden (`sr-only focus:not-sr-only`) anchor pointing to `#main-content` with text "Skip to main content"
    - _Requirements: 3.1, 4.1_

  - [ ] 2.2 Update `components/layout/navigation.tsx`: accessibility, focus trap, active indicator, timing
    - Add `aria-label="Main navigation"` to the `<nav>` element
    - Add active link bottom border: `border-b-2 border-storm-blue` applied only when `pathname === link.href` (both desktop and mobile variants)
    - Change `transition-colors duration-300` to `duration-[150ms]` on all nav links
    - Add body scroll lock (`document.body.style.overflow = 'hidden'`) when mobile menu opens; restore on close
    - Add focus trap within mobile menu: when menu is open, Tab/Shift+Tab cycle only through menu items; Escape closes menu AND returns focus to the hamburger button
    - Verify `aria-expanded` on the hamburger button correctly reflects the `isOpen` state (already present — confirm correctness)
    - Add `role="menu"` to the mobile nav container and `role="menuitem"` to each mobile nav `<Link>`
    - Apply global focus ring `focus:ring-2 focus:ring-storm-blue focus:ring-offset-2` to nav links (desktop)
    - _Requirements: 3.1–3.8, 4.2, 16.3, 16.7_

  - [ ] 2.3 Update `components/layout/footer.tsx`: wire to `content/social-links.ts`, add semantics and tagline
    - Add `role="contentinfo"` to the `<footer>` element
    - Replace hardcoded social icon JSX with `socialLinks.map()` importing from `@/content/social-links`
    - Update social icon aria-labels to "View {platform} profile" format (e.g., "View GitHub profile")
    - Add tagline beneath "StormOS" in the brand section: e.g., "Engineering exceptional digital experiences." (placeholder-marked)
    - Preserve dynamic copyright year (`new Date().getFullYear()`)
    - Add `[PLACEHOLDER]` comment for the legal/privacy link in the footer
    - Verify all footer nav links match the Navigation link set (Home, About, Projects, WorldForge, Contact)
    - _Requirements: 1.4, 1.5, 4.3, 12.1–12.5, 16.4, 16.6_

- [ ] 3. Checkpoint — Foundation and layout complete
  - Run `npx tsc --noEmit`. Ask the user if any questions arise before proceeding.

- [ ] 4. UI components — `button.tsx`, `card.tsx`, `badge.tsx`, `input.tsx`, `textarea.tsx`
  - [ ] 4.1 Update `components/ui/button.tsx`: min-height, hover/active scale, focus ring, transition timing
    - Change `duration-300` to `duration-[150ms]` on the base transition class
    - Add `focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950` (already partially present — verify complete)
    - Add `hover:scale-[1.02] active:scale-[0.98]` using Tailwind transform classes on the button element
    - Verify `lg` size class `py-3 text-lg` produces at minimum 44px rendered height; if not, add `min-h-[44px]` explicitly to the `lg` sizeClass entry
    - _Requirements: 2.8, 5.4, 6.1–6.4_

  - [ ] 4.2 Update `components/ui/card.tsx`: hover elevation animation, interactive keyboard support
    - Add `hover:-translate-y-1 hover:shadow-lg transition-all duration-[200ms]` to both `elevated` and `interactive` variant classes
    - Add `role="button"` and `tabIndex={0}` to the `interactive` variant
    - Add `onKeyDown` handler to `interactive` variant: trigger `onClick` on Enter and Space key events
    - _Requirements: 5.3, 6.6_

  - [ ] 4.3 Update `components/ui/badge.tsx`: add `role="status"` for status variants, `asStatus` prop
    - Add optional `asStatus?: boolean` prop to `BadgeProps`
    - When `asStatus` is true OR `variant` is `success | warning | error`, add `role="status"` to the `<span>`
    - _Requirements: 6.5_

  - [ ] 4.4 Update `components/ui/input.tsx`: ARIA error attributes, focus shadow, id propagation
    - Ensure the error paragraph uses `id={props.id ? \`${props.id}-error\` : undefined}`
    - Add `aria-invalid={!!error}` to the `<input>` element
    - Add `aria-describedby={error && props.id ? \`${props.id}-error\` : undefined}` to the `<input>` element
    - Add focus shadow: append `focus:shadow-[0_0_0_3px_rgba(10,132,255,0.2)]` to the input's className string
    - _Requirements: 6.7, 6.9, 10.4_

  - [ ] 4.5 Update `components/ui/textarea.tsx`: min-height, resize, ARIA error attributes
    - Replace `resize-vertical` with `resize-y`
    - Add `min-h-[120px]` to the textarea's className
    - Apply same ARIA error pattern as `input.tsx`: `aria-invalid`, `aria-describedby`, error `id` on the paragraph
    - _Requirements: 6.8, 6.9, 10.4_

- [ ] 5. Checkpoint — UI components complete
  - Run `npx tsc --noEmit` and `npx eslint components/ui/`. Ask the user if questions arise before proceeding.

- [ ] 6. Section components — hero, projects, skills, worldforge, contact
  - [ ] 6.1 Update `components/sections/hero.tsx`: headline, CTAs, stagger, reduced-motion compliance
    - Change `<h1>` content to "Building Digital Worlds"
    - Change tagline to "Software Engineer • AI Engineer • Product Builder"
    - Change CTA buttons to "Explore My Work" (primary, `href="#projects"`) and "View WorldForge" (secondary, `href="/worldforge"`)
    - Fix stagger delays: greeting = `delay: 0`, headline = `delay: 0.1`, subheadline = `delay: 0.2`, CTA row = `delay: 0.3` — all at 600ms duration with `ease: [0.215, 0.61, 0.355, 1]`
    - Import `useReducedMotion` from `framer-motion`; when true: remove `animate` prop from the ambient glow `<motion.div>` (static opacity/scale) and remove the scroll indicator bob `animate` prop
    - Use `text-[64px]` (or `text-7xl` as fallback) for the `<h1>` display size on desktop
    - _Requirements: 1.2, 2.1–2.8, 13.1_

  - [ ] 6.2 Update `components/sections/projects.tsx`: wire to content file, empty state, tag truncation, status badge
    - Remove the hardcoded `projects` array
    - Import `{ projects }` from `@/content/projects`
    - Add empty state: when `projects.length === 0`, render a centered "Projects coming soon" inside a `Card variant="elevated"` — no project cards rendered
    - Implement tag truncation using the exported `truncateTags` utility from `lib/utils.ts` (add this utility during this task): render at most 3 `<Badge>` tags; if `tags.length > 3` render `+{N-3} more`
    - Add status badge: `completed` → `<Badge variant="success" asStatus>`, `in-progress` → `<Badge variant="warning" asStatus>`; unknown status omits badge silently
    - _Requirements: 8.1, 8.3, 8.4, 8.5_

  - [ ] 6.3 Update `components/sections/skills.tsx`: wire to content file, group by category, empty state, heading fix
    - Remove the hardcoded `skillCategories` array
    - Import `{ skills }` from `@/content/skills`
    - Derive categories: `const categories = [...new Set(skills.map(s => s.category))]`
    - Add empty state: when `skills.length === 0`, render a centered "Skills coming soon" message
    - Verify category headings are `<h3>` (already in current implementation — confirm no regression)
    - _Requirements: 7.1, 7.2, 7.4_

  - [ ] 6.4 Create `components/sections/waitlist-form.tsx`
    - Use `react-hook-form` with `zodResolver(waitlistSchema)` from `@/lib/validations`
    - Render: email `<Input id="waitlist-email">` + submit `<Button>` with loading spinner while pending
    - On valid submit: POST to `/api/waitlist`; on success: show success Toast "You're on the list! We'll keep you updated." and call `reset()`; on API/network error: show error Toast, do NOT call `reset()`
    - On invalid email: `<Input>` receives `error={errors.email?.message}` so ARIA attributes flow through automatically
    - _Requirements: 9.2–9.5_

  - [ ] 6.5 Update `components/sections/worldforge.tsx`: wire WaitlistForm, verify branding, fix pulse animation
    - Import `WaitlistForm` from `@/components/sections/waitlist-form`
    - Replace `<Button size="lg" ...>Join the Waitlist</Button>` and its paragraph with `<WaitlistForm />`
    - Verify all WorldForge-branded elements (heading, badge, card borders, icon) use `accent-purple` not `storm-blue`
    - Import `useReducedMotion` from `framer-motion`; when true, omit `animate` prop from the badge pulse `<motion.div>`
    - _Requirements: 9.1, 9.2, 5.9_

  - [ ] 6.6 Create `components/sections/contact-form.tsx` and wire into `components/sections/contact.tsx`
    - Create `components/sections/contact-form.tsx`:
      - Use `react-hook-form` with `zodResolver(contactFormSchema)` from `@/lib/validations`
      - Fields: `name` (min 2), `email` (valid email), `message` (min 10)
      - Each `<Input>` / `<Textarea>` receives `id`, `error={errors.field?.message}`, and is associated with `<label htmlFor={id}>`
      - Disable submit button and show loading spinner (`loading` prop on Button) while submitting
      - On success: show success Toast, call `reset()`
      - On API/network error: show error Toast, do NOT call `reset()`
    - In `components/sections/contact.tsx`: replace the uncontrolled `<form>` block with `<ContactForm />`; add `{/* [PLACEHOLDER: replace with real email] */}` comment on the `hello@example.com` link
    - _Requirements: 10.1–10.8, 1.4_

- [ ] 7. Checkpoint — All section components complete
  - Run `npx tsc --noEmit`. Confirm no type errors in `components/sections/`. Ask the user if questions arise.

- [ ] 8. Page-level work — Projects page, About page, 404, error, loading, scroll progress
  - [ ] 8.1 Create `components/ui/scroll-progress.tsx` and add to root layout
    - Create `components/ui/scroll-progress.tsx` (client component):
      - Call `useScrollProgress()` from `@/hooks/use-scroll-progress`
      - When `progress === null` (reduced motion): render `<div style={{ width: '100%' }} className="fixed top-0 left-0 h-[2px] bg-storm-blue z-[9999]" />` — no CSS transition
      - When `progress` is a number: render `<div style={{ width: \`${progress * 100}%\` }} className="fixed top-0 left-0 h-[2px] bg-storm-blue z-[9999] transition-[width] duration-100" />`
    - Add `<ScrollProgress />` as the first child inside `<body>` in `app/layout.tsx`
    - _Requirements: 14.1, 14.3, 14.4_

  - [ ] 8.2 Update `app/about/page.tsx`: fix placeholder text and heading hierarchy
    - Mark "years of experience" and "millions of people" with `{/* [PLACEHOLDER] */}` comments
    - Verify the page `<h1>` is correct (already `<h1>` — confirm no regression)
    - Card section headings use `<h2>` (already the case — confirm no regression)
    - Keep `'use client'` and Framer Motion entrance animation unchanged
    - _Requirements: 1.3, 4.4, 4.6_

  - [ ] 8.3 Update `app/projects/page.tsx`: split into server header + client grid; wire to content file
    - Create `components/sections/projects-grid.tsx` as a client component (`'use client'`):
      - Imports `{ projects }` from `@/content/projects`
      - Renders the full project list with animated cards and same empty state logic as the homepage section
    - Convert `app/projects/page.tsx` to a server component (remove `'use client'`): renders page `<h1>`, description, and `<ProjectsGrid />`
    - _Requirements: 8.1, 8.2, 15.2_

  - [ ] 8.4 Update `app/not-found.tsx`: render inside PageWrapper with navigation, add home link
    - Import and render within `<PageWrapper>` so Navigation and Footer are visible
    - Add paragraph "The page you're looking for doesn't exist." and a `<Button>` linking to `/` labeled "Go Home"
    - Ensure the "404" is wrapped in an `<h1>`
    - _Requirements: 11.1, 11.2, 4.6_

  - [ ] 8.5 Update `app/error.tsx`: use Card component, design tokens, add "Go Home" link
    - Import `Card` from `@/components/ui/card` and `Link` from `next/link`
    - Wrap error content in `<Card variant="elevated">` within the existing `bg-neutral-950` background
    - Add a "Go Home" `<Link href="/">` styled as a secondary button alongside the existing "Try again" button
    - Use design token classes throughout (no raw hex values)
    - _Requirements: 11.2, 11.3, 11.5_

  - [ ] 8.6 Update `app/loading.tsx`: add StormOS logo mark above spinner
    - Add `<p className="text-storm-blue font-bold text-xl">StormOS</p>` above the spinner `<div>`
    - Preserve the existing `border-storm-blue border-t-transparent` spinner styling
    - _Requirements: 11.4_

- [ ] 9. Checkpoint — Page-level polish complete
  - Run `npx tsc --noEmit`. Ask the user if questions arise before proceeding.

- [ ] 10. Tests
  - [ ] 10.1 Set up fast-check and test infrastructure
    - Install `fast-check` as a dev dependency: `npm install --save-dev fast-check`
    - Confirm existing Jest/Vitest setup (check `jest.config.*` or `vitest.config.*`)
    - Create `__tests__/pbt/` directory for property-based tests
    - Create `__tests__/unit/` directory for example-based tests
    - _Requirements: Design testing strategy_

  - [ ]* 10.2 Write property tests for form validation (Properties 2, 3)
    - **Property 2: Email Validation Rejects All Invalid Inputs**
    - **Property 3: Contact Form Field Length Validation**
    - **Validates: Requirements 9.4, 10.1, 10.2, 10.3**
    - File: `__tests__/pbt/validations.test.ts`
    - Use `fc.string()` filtered to exclude valid email patterns; assert both schemas return `success: false`
    - Use `fc.string({ maxLength: 1 })` for name and `fc.string({ maxLength: 9 })` for message; assert `contactFormSchema` returns `success: false`
    - Minimum 100 runs per property (`numRuns: 100`)

  - [ ]* 10.3 Write property test for tag truncation invariant (Property 4)
    - **Property 4: Project Tag Truncation Invariant**
    - **Validates: Requirements 8.5**
    - File: `__tests__/pbt/tag-truncation.test.ts`
    - Use `fc.array(fc.string(), { minLength: 0, maxLength: 20 })` to generate arbitrary tag arrays
    - Assert: `truncateTags(tags).visible.length === Math.min(tags.length, 3)` and `truncateTags(tags).overflow === Math.max(0, tags.length - 3)`

  - [ ]* 10.4 Write property test for scroll progress calculation (Property 5)
    - **Property 5: Scroll Progress Percentage Calculation**
    - **Validates: Requirements 14.1, 14.2**
    - File: `__tests__/pbt/scroll-progress.test.ts`
    - Use `fc.integer({ min: 0 })`, `fc.integer({ min: 1 })`, `fc.integer({ min: 1 })` to generate scroll states
    - Assert: result is always in `[0, 1]`; at `scrollY = 0` result is `0`; at `scrollY = scrollHeight - viewportHeight` result is `1`; no division-by-zero when `scrollHeight === viewportHeight`

  - [ ]* 10.5 Write example-based unit tests for Input and Textarea ARIA error attributes
    - **Validates: Requirements 6.9, 10.4**
    - File: `__tests__/unit/aria-error.test.tsx`
    - For `Input`: render with `error="Test error"` and `id="test-field"`; assert `aria-invalid="true"`, `aria-describedby="test-field-error"`, and element with `id="test-field-error"` contains "Test error"
    - For `Textarea`: identical assertions
    - Two example-based tests — no fast-check needed

  - [ ]* 10.6 Write property test for projects empty state consistency (Property 6)
    - **Property 6: Projects Empty State Consistency**
    - **Validates: Requirements 8.3**
    - File: `__tests__/pbt/projects-empty-state.test.ts`
    - Use `fc.array(fc.record({ id: fc.string(), title: fc.string(), description: fc.string(), tags: fc.array(fc.string()), status: fc.constantFrom('completed', 'in-progress'), featured: fc.boolean() }))` with `minLength: 0`
    - When array is empty: assert empty state text present, no project card elements rendered
    - When array is non-empty: assert project cards present, no empty state text rendered

  - [ ]* 10.7 Write property test for project status badge variant mapping (Property 7)
    - **Property 7: Project Status Badge Variant Mapping**
    - **Validates: Requirements 8.4**
    - File: `__tests__/pbt/project-status-badge.test.ts`
    - Use `fc.record({ status: fc.constantFrom('completed', 'in-progress'), title: fc.string(), description: fc.string(), tags: fc.array(fc.string(), { maxLength: 3 }) })`
    - Assert: `completed` → badge has class containing `success`; `in-progress` → badge has class containing `warning`

  - [ ]* 10.8 Write property test for form response state consistency (Property 8)
    - **Property 8: Form Response State Consistency**
    - **Validates: Requirements 10.6**
    - File: `__tests__/pbt/form-response-state.test.ts`
    - Mock the fetch response as success or error using `fc.boolean()` across 100 runs
    - On success: assert `reset()` called AND success Toast shown; verify no error Toast
    - On error: assert `reset()` NOT called AND error Toast shown; verify no success Toast

- [ ] 11. Checkpoint — All tests written
  - Run `npx jest --passWithNoTests` (or `npx vitest run`). Ask the user if questions arise.

- [ ] 12. Documentation sync
  - [ ] 12.1 Create `docs/CHANGELOG.md` with v1.0 entry
    - Document all improvements from the production polish phase in Keep-a-Changelog format
    - _Requirements: 18.2_

  - [ ] 12.2 Create `docs/TECH_DEBT.md` listing remaining placeholders and known gaps
    - List all `[PLACEHOLDER]` items requiring real user data (email, social URLs, project descriptions, bio specifics)
    - Note: About page server-component conversion descoped (Framer Motion requires 'use client')
    - _Requirements: 18.1_

  - [ ] 12.3 Update `AI_GUIDELINES.md` and docs to reflect actual implemented token names
    - Replace any references to `gray-*` with `neutral-*` throughout documentation
    - Update any CSS custom property names that diverge from actual `globals.css` values
    - _Requirements: 17.1, 18.3, 18.5_

- [ ] 13. Final checkpoint — Build and lint pass
  - Run `npx tsc --noEmit` and `npx eslint . --max-warnings=0`
  - Confirm the build passes with `npx next build`
  - Ask the user if any questions arise before declaring v1.0 complete

---

## Notes

- Tasks marked `*` are optional (tests) and can be skipped for a faster v1.0. The implementation tasks alone bring the codebase to v1.0 quality.
- `truncateTags(tags)` and `calculateScrollProgress(...)` are pure utility functions added to `lib/utils.ts` during tasks 6.2 and 1.5 respectively — extracted for testability.
- Task 6.4 (create WaitlistForm) must be complete before task 6.5 (wire into WorldForge).
- No `components/features/` directory is created. All new components live in `components/sections/` or `components/ui/`.
- `hooks/use-reduced-motion.ts` is NOT created. Import `useReducedMotion` from `framer-motion` directly in each component.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "4.1", "4.2", "4.3", "4.4", "4.5"] },
    { "id": 2, "tasks": ["6.1", "6.2", "6.3", "6.4", "8.6", "10.1"] },
    { "id": 3, "tasks": ["6.5", "6.6", "8.1", "8.2", "8.3", "8.4", "8.5"] },
    { "id": 4, "tasks": ["10.2", "10.3", "10.4", "10.5", "10.6", "10.7", "10.8"] },
    { "id": 5, "tasks": ["12.1", "12.2", "12.3"] }
  ]
}
```
