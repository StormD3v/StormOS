# Changelog

All notable changes to StormOS are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — Production Polish & Final Quality Pass

### Added
- **Scroll progress indicator** — 2px fixed bar at top of viewport tracking page scroll depth; static on `prefers-reduced-motion`
- **Skip link** — visually hidden "Skip to main content" anchor as first focusable element in DOM; reveals on focus
- **Waitlist form** (`components/sections/waitlist-form.tsx`) — functional email form wired to `/api/waitlist` with Zod validation, loading state, success/error feedback
- **Contact form** (`components/sections/contact-form.tsx`) — react-hook-form + Zod validated form wired to `/api/contact`; preserves values on error, clears on success
- **`lib/validations.ts`** — shared Zod schemas (`contactFormSchema`, `waitlistSchema`) for both client and API
- **`hooks/use-scroll-progress.ts`** — `calculateScrollProgress` pure function + `useScrollProgress` hook; returns `null` on reduced motion
- **`truncateTags` utility** in `lib/utils.ts` — caps tag display at 3, returns overflow count
- **ProjectsGrid** (`components/sections/projects-grid.tsx`) — extracted client component enabling server-rendered projects page header
- **StormOS logo mark** on loading page for brand reinforcement during navigation transitions

### Changed
- **Hero section** — headline updated to "Building Digital Worlds"; subheadline to "Software Engineer • AI Engineer • Product Builder"; CTAs to "Explore My Work" / "View WorldForge"; stagger delays corrected to 0/100/200/300ms; ambient glow and scroll indicator respect `useReducedMotion`
- **Navigation** — added `aria-label="Main navigation"`, active link bottom border indicator, `duration-fast` (150ms) transitions, body scroll lock on mobile menu open, focus trap with Escape→return-focus, `role="menu"` / `role="menuitem"` on mobile menu
- **Page wrapper** — `<main>` now carries `id="main-content"` and `role="main"`
- **Footer** — driven by `content/social-links.ts`; `role="contentinfo"` added; aria-labels updated to "View {Platform} profile"; tagline added
- **Button** — `duration-fast` transition, `hover:scale-[1.02]` / `active:scale-[0.98]`, `min-h-[44px]` on `lg` size
- **Card** — `rounded-xl`, `hover:-translate-y-1 hover:shadow-lg` on `elevated` and `interactive` variants; `role="button"` + keyboard activation on `interactive`
- **Badge** — `role="status"` when `asStatus` prop is set or variant is `success | warning | error`
- **Input** — `aria-invalid`, `aria-describedby`, error element `id`, enhanced focus shadow
- **Textarea** — `resize-y`, `min-h-[120px]`, same ARIA error pattern as Input
- **Projects section** — reads from `content/projects.ts`; empty state; tag truncation; status badges
- **Skills section** — reads from `content/skills.ts`; empty state; `role="progressbar"` on bars; heading hierarchy confirmed `h3`
- **WorldForge section** — non-functional "Join the Waitlist" button replaced with `<WaitlistForm />`; badge pulse respects `useReducedMotion`
- **Contact section** — uncontrolled form replaced with `<ContactForm />`
- **About page** — placeholder text marked with `[PLACEHOLDER]` comments
- **Projects page** — converted to server component; interactive grid extracted to `ProjectsGrid` client component
- **404 page** — rendered inside `PageWrapper` with navigation; descriptive message; "Go Home" button
- **Error page** — wrapped in `Card`; design tokens throughout; "Go Home" + "Try again" actions
- **Loading page** — StormOS logo mark added above spinner
- **`content/projects.ts`** — populated with representative placeholder entry; JSDoc added
- **`content/skills.ts`** — populated with representative placeholder entries across 3 categories; JSDoc added
- **`content/social-links.ts`** — populated with GitHub, LinkedIn, Twitter placeholder entries; JSDoc added

### Removed
- Hardcoded inline project arrays from `components/sections/projects.tsx` and `app/projects/page.tsx`
- Hardcoded inline skill categories from `components/sections/skills.tsx`
- Hardcoded social link JSX from `components/layout/footer.tsx`
- Non-functional "Join the Waitlist" button from `components/sections/worldforge.tsx`
- Uncontrolled form from `components/sections/contact.tsx`

### Architecture notes
- No `components/features/` directory introduced — new components live in `components/sections/` or `components/ui/`
- No `hooks/use-reduced-motion.ts` wrapper — `useReducedMotion` imported directly from `framer-motion` per component
- `useScrollProgress` returns `number | null` to distinguish "reduced motion, show static bar" from "progress = 0"
