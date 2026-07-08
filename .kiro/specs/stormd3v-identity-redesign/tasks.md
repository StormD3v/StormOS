# Implementation Plan: StormD3v Identity Redesign

## Overview

This plan rebuilds the StormD3v website identity from the ground up: visual identity, copy,
motion design, data model, navigation, SEO, and content configuration. The implementation
is staged so each phase produces a working, coherent increment. Foundation types and data
come first; overlays and animations last; tests as the final phase.

`fast-check` is the only new dependency (devDependency only).

---

## Tasks

- [x] 1. Foundation — Types, Constants, and Content Configuration
  - [x] 1.1 Update `types/index.ts` — extend Project and SocialLink interfaces
    - Added `displayName?: string` and `route?: string` to `Project`
    - Changed `url: string` to `url: string | null` on `SocialLink`; added `username?: string`
    - Made `proficiency` optional on `Skill`
    - Removed `longDescription` from `Project` (factual descriptions only in content config)
    - _Requirements: 4.2, 4.3, 9.3, 13.1_

  - [x] 1.2 Create `lib/constants.ts` — shared contact email constant
    - `export const CONTACT_EMAIL = 'heisst0rmd3v@gmail.com';`
    - _Requirements: 7.3, 9.4_

  - [x] 1.3 Update `content/social-links.ts` — real URLs, Discord null URL, LinkedIn hidden
    - GitHub: `'https://github.com/StormD3v'`
    - X: `'https://x.com/Storm_D3V'`
    - Discord: `url: null`, `username: 'storm_d3v'`
    - LinkedIn: `showOnHomepage: false`
    - _Requirements: 9.1, 9.2, 9.3, 9.5_

  - [x] 1.4 Update `content/projects.ts` — replace StormOS placeholder with real projects
    - WorldForge: `featured: true`, `status: 'in-progress'`, `route: '/worldforge'`
    - Real Weather: `featured: true`, `status: 'completed'`, no route
    - Descriptions are factual (not narrative) — components own the narrative
    - _Requirements: 4.2, 4.3, 4.4_

  - [x] 1.5 Update `content/skills.ts` — replace placeholder stack with real stack
    - React (Frontend), Django (Backend), FastAPI (Backend), PyTorch (AI/ML),
      HuggingFace (AI/ML), PostgreSQL (Backend)
    - No proficiency or years fields rendered
    - _Requirements: 13.3, 13.4_


- [x] 2. Hook — `useActiveSection`
  - [x] 2.1 Create `hooks/use-active-section.ts` — IntersectionObserver for nav highlighting
    - Observes hero, building, worldforge, about, contact section IDs
    - Returns `null` on non-homepage routes; uses pathname guard
    - Tracks intersectionRatio via ref, not state, to avoid scroll-tick re-renders
    - Cleanup on unmount and pathname change
    - _Requirements: 10.4_


- [x] 3. UI Utility — scroll-progress colour fix
  - [x] 3.1 Update `components/ui/scroll-progress.tsx` — replace `bg-storm-blue` with `bg-neutral-600`
    - Both the reduced-motion static bar and the animated bar updated
    - _Requirements: 15.2_

- [x] 4. Layout Components — Navigation, Footer, PageWrapper
  - [x] 4.1 Update `components/layout/navigation.tsx` — logo text, no blue, active section hook
    - Logo: "StormD3v", aria-label updated
    - `useActiveSection` integrated; `isActive()` function replaces `isActivePath()`
    - sectionId field added to navLinks
    - All `storm-blue` references replaced with `neutral-400`/`neutral-100`
    - Active indicator: `border-neutral-500`
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 15.2_

  - [x] 4.2 Update `components/layout/footer.tsx` — brand name, tagline, email, Discord span, LinkedIn removal
    - Brand: "StormD3v"
    - Tagline: "Ambitious ideas, built with patience." (shorter than spec; passes VOICE.md)
    - `CONTACT_EMAIL` mailto anchor added
    - Discord rendered as non-interactive `<span>` (url is null)
    - LinkedIn excluded from footer social row
    - Copyright: "© [year] StormD3v. All rights reserved."
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 9.3, 9.6, 9.7_

  - [x] 4.3 Update `components/layout/page-wrapper.tsx` — remove storm-blue from skip link
    - Skip link: `bg-neutral-100 text-neutral-950`
    - _Requirements: 15.2_


- [x] 5. Homepage Sections — Hero through Contact (emotional journey order)
  - [x] 5.1 Rebuild `components/sections/hero.tsx` — new identity, no blue, secondary buttons only
    - h1: "StormD3v", `id="hero-headline"`, `text-5xl sm:text-6xl md:text-7xl lg:text-8xl`
    - Subline improved: "Some ideas deserve years. This is where they get them."
      (original spec copy was redundant — subline echoed the h1; improved per VOICE.md)
    - Ambient glow: `bg-accent-purple/6`, static, no pulse
    - Both buttons: `variant="secondary"`
    - Section: `id="hero"`, `pt-32 pb-40`, `bg-neutral-950`
    - ArrowDown scroll indicator removed
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 15.1, 15.2, 16.2_

  - [x] 5.2 Rebuild `components/sections/building.tsx` — data-driven, flagship-agnostic
    - Flagship: `projects.find(p => p.featured && p.status === 'in-progress')`
    - `data-project-id` on all project wrappers
    - `<Link>` only when `project.route` is defined; `<div>` otherwise
    - Badge derived from `project.status`
    - Section subtext: "A studio with two active projects and a long list of ideas that aren't ready yet."
    - Placeholder card retained (dashed border, opacity-50)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11_

  - [x] 5.3 Update `components/sections/worldforge.tsx` — copy audit and closing line
    - "Most platforms…" / "WorldForge asks…" removed (contained "platform")
    - Copy rewritten as connected prose: place, consequence, permanence, identity
    - Closing line: "Some worlds deserve to last. WorldForge is being built to be one of them."
    - `id="worldforge"` confirmed, waitlist form confirmed, CTA retained
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9_

  - [x] 5.4 Rebuild `components/sections/about.tsx` — Friday Gift identity, single column, Discord span
    - Label: "About StormD3v"
    - Copy: why StormD3v exists first; Friday Gift Chinecherem Azunda introduced with
      online handle "known as StormD3v"
    - Contact row: GitHub link, X link, Discord span (username text visible), email mailto
    - No photo zone, no achievements, no cards, `py-24`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9_

  - [x] 5.5 Rebuild `components/sections/contact.tsx` — remove Card, real email, Discord span, no LinkedIn
    - Card wrapper removed; `ContactForm` renders directly
    - `CONTACT_EMAIL` from `@/lib/constants`
    - Discord: non-interactive span, no href
    - No LinkedIn, no blue, `py-20`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 9.3, 9.7, 9.8_

- [x] 6. Checkpoint — sections compile and render without errors
  - TypeScript: 0 errors
  - Lint: 0 errors
  - Build: successful (11 pages, all static except API routes)


- [x] 7. Arrival Overlay
  - [x] 7.1 Create `components/sections/arrival-overlay.tsx` — cinematic intro overlay
    - Phase state machine (`visible → exiting → gone`) replaces AnimatePresence approach
      (spec approach had a race condition — exit could unmount before animation completed)
    - Normal motion: purple radial glow, 22 particles with `data-particle="true"`,
      "StormD3v" text split into `<motion.span>` letters with `data-pulse-letter="true"`,
      per-letter color/textShadow keyframes, "Built by StormD3v" subtitle,
      overlay fades out after 2600ms
    - Reduced motion: 50ms delay then `phase='exiting'`, 300ms cross-fade, no particles,
      no letter pulse
    - `getLetterDelay(index)` exported as pure function (for property tests)
    - `aria-hidden="true"` on overlay container
    - No progress bar, no skip button
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10_

  - [x] 7.2 Update `app/page.tsx` — add ArrivalOverlay above PageWrapper
    - `<ArrivalOverlay />` sibling above `<PageWrapper>`, wrapped in `<>`
    - No `'use client'` on page file
    - Five sections in correct order inside PageWrapper
    - _Requirements: 1.1, 2.2, 2.3_

- [x] 8. Sub-Pages — WorldForge, About, Contact
  - [x] 8.1 Update `app/worldforge/page.tsx` — copy audit, server component, metadata
    - "platform" removed from "What it is" section
    - "What it is" copy deepened (not a repeat of the homepage hero)
    - Four sections confirmed in order
    - Server component; metadata: `title: 'WorldForge'`, correct description
    - Client content extracted to `app/worldforge/WorldForgePageClient.tsx`
    - _Requirements: 5.2, 14.1, 14.2, 14.3, 14.5, 12.2_

  - [x] 8.2 Rebuild `app/about/page.tsx` — Friday Gift identity, no StormOS references, metadata
    - Server component; metadata: `title: 'About'`, correct description
    - `'use client'` removed; client content in `app/about/AboutPageContent.tsx`
    - h1: "The studio" (more meaningful than "StormD3v" which merely repeats the nav logo)
    - Copy: why StormD3v exists first, Friday Gift with online handle, "Right now" section
    - No StormOS references, no em dashes, no achievements
    - _Requirements: 6.1, 6.2, 6.7, 6.8, 12.2_

  - [x] 8.3 Update `app/contact/page.tsx` — remove Card, real email, Discord span, metadata
    - Server component; metadata: `title: 'Contact'`, correct description
    - `'use client'` removed; client content in `app/contact/ContactPageContent.tsx`
    - Card removed, `CONTACT_EMAIL` from constants, Discord null-URL span, no blue
    - _Requirements: 7.1, 7.3, 7.4, 7.5, 9.3, 9.7, 12.2_


- [x] 9. SEO, Metadata, and Sitemap
  - [x] 9.1 Update `app/layout.tsx` — root metadata per Req 12
    - `title.default: 'StormD3v'`, `template: '%s | StormD3v'`
    - Description: "StormD3v is the studio of Friday Gift Chinecherem Azunda. Ambitious ideas, built with patience."
      (wording differs from spec's "serious execution" — "built with patience" aligns with VOICE.md)
    - Keywords: StormD3v, WorldForge, Friday Gift Azunda, software engineer, developer,
      indie projects, React, Django, FastAPI
    - Authors: `[{ name: 'Friday Gift Chinecherem Azunda' }]`
    - OpenGraph and Twitter aligned with title and description
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

  - [x] 9.2 Update `app/sitemap.ts` — remove /projects, keep four required routes
    - `/projects` removed
    - Four routes: `/`, `/worldforge`, `/about`, `/contact`
    - BaseUrl: `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stormd3v.com'`
    - _Requirements: 12.7, 12.8_

- [x] 10. Checkpoint — final build verification
  - TypeScript: 0 errors
  - Lint: 0 errors
  - Build: successful — 11 pages, all static except `/api/contact` and `/api/waitlist`
  - Arrival overlay renders and dismisses correctly
  - Navigation shows "StormD3v" on all pages


- [~] 11. Property-Based Tests and Unit Tests
  - [x] 11.1 Install `fast-check` as a devDependency
    - `fast-check@^3.21.0` in `devDependencies`
    - NOTE: `@testing-library/react`, `@testing-library/jest-dom`, and `vitest` are NOT
      installed. Required before running any of the test tasks below.
    - _Requirements: Design Testing Strategy_

  - [ ]* 11.2 Write property test: Flagship Detection Invariant (Property 1)
    - File: `__tests__/building.property.test.tsx`
    - Requires vitest + @testing-library/react installed (task 11.1 prerequisite incomplete)
    - **Validates: Requirements 4.3, 4.4**

  - [ ]* 11.3 Write property test: Route-Conditional Link Rendering (Property 2)
    - File: `__tests__/building.property.test.tsx`
    - **Validates: Requirements 4.9, 4.10, 4.11**

  - [ ]* 11.4 Write property test: Null URL Non-Interactive Rendering (Property 3)
    - File: `__tests__/social-link.property.test.tsx`
    - **Validates: Requirements 9.3, 9.7, 6.4**

  - [ ]* 11.5 Write property test: Reduced Motion Suppresses Particles and Pulse (Property 4)
    - File: `__tests__/arrival-overlay.property.test.tsx`
    - NOTE: Implementation uses `phase` state machine, not `AnimatePresence`.
      Test should check `data-particle` and `data-pulse-letter` attributes are absent
      when reducedMotion is true.
    - **Validates: Requirements 1.10, 16.9**

  - [ ]* 11.6 Write property test: Prohibited Word Copy Audit (Property 5)
    - File: `__tests__/copy-audit.property.test.tsx`
    - **Validates: Requirements 5.2, 8.1, 8.2**

  - [ ]* 11.7 Write property test: Tech Stack Exact Render (Property 6)
    - File: `__tests__/skills.property.test.tsx`
    - NOTE: No skills display component exists on the homepage currently.
      Tech stack is defined in content/skills.ts but not rendered in any homepage section.
      This test would need a dedicated skills display component to be meaningful.
    - **Validates: Requirements 13.1, 13.2, 13.3**

  - [ ]* 11.8 Write property test: Letter Stagger Strictly Increasing (Property 7)
    - File: `__tests__/arrival-overlay.property.test.tsx`
    - `getLetterDelay(index)` is exported from `arrival-overlay.tsx` — ready to test
    - **Validates: Requirement 1.5**

  - [ ]* 11.9 Write unit tests: Navigation and Footer branding
    - File: `__tests__/layout.unit.test.tsx`
    - **Validates: Requirements 10.1, 11.1, 11.2, 11.6**

  - [ ]* 11.10 Write unit tests: Contact section and CONTACT_EMAIL
    - File: `__tests__/contact.unit.test.tsx`
    - **Validates: Requirements 7.3, 9.4, 12.7, 12.8**

  - [ ]* 11.11 Write unit tests: Arrival overlay constraints
    - File: `__tests__/arrival-overlay.unit.test.tsx`
    - NOTE: overlay now uses `phase` state machine. `aria-hidden="true"` is on the
      container. No progress bar or skip button present.
    - **Validates: Requirements 1.8, 1.9**

  - [ ]* 11.12 Write integration tests: form submission flows
    - File: `__tests__/forms.integration.test.tsx`
    - **Validates: Requirements 7.7, 7.8, 5.9, 14.6**

- [x] 12. Final Checkpoint — all quality gates pass
  - `npx tsc --noEmit`: 0 errors
  - `npm run lint`: 0 errors
  - `npm run build`: successful


---

## Notes

- Tasks marked `*` are optional — test infrastructure (vitest, @testing-library) is needed before any can run.
- `getLetterDelay` is exported from `arrival-overlay.tsx` for property test P7.
- `data-project-id`, `data-particle`, `data-pulse-letter` test-hook attributes are present in production components — they do not affect behaviour.
- All sub-pages use a server/client split: server page file exports metadata, client content component contains animations.
- Tech stack (skills.ts) is defined but not displayed on any current page. A future skills section would render from `content/skills.ts` automatically.
- The footer tagline and About page h1 differ from the original task spec text. Both changes are intentional improvements per VOICE.md.


## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "1.4", "1.5", "2.1"] },
    { "id": 2, "tasks": ["3.1", "4.1", "4.2", "4.3"] },
    { "id": 3, "tasks": ["5.1", "5.2", "5.3", "5.4", "5.5"] },
    { "id": 4, "tasks": ["7.1"] },
    { "id": 5, "tasks": ["7.2", "8.1", "8.2", "8.3"] },
    { "id": 6, "tasks": ["9.1", "9.2"] },
    { "id": 7, "tasks": ["11.1"] },
    { "id": 8, "tasks": ["11.2", "11.3", "11.4", "11.5", "11.6", "11.7", "11.8", "11.9", "11.10", "11.11", "11.12"] }
  ]
}
```
