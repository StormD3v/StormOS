# Design Document — Production Polish & Final Quality Pass

## Overview

This document defines the technical design for elevating StormOS from v0.9 to v1.0. The goal is not to add new features but to make every existing element feel intentional, cohesive, and premium — meeting the quality bar established by the design system and documentation.

The 18 requirements map to 9 design areas:

| Area | Requirements |
|---|---|
| Content & placeholders | 1, 12 |
| Hero & landing | 2, 13, 14 |
| Navigation & layout | 3, 4 |
| Animation system | 5 |
| Component quality | 6 |
| Content architecture (Skills/Projects) | 7, 8 |
| WorldForge & waitlist | 9 |
| Contact form | 10 |
| Error/loading/404 states | 11 |
| Performance (server components) | 15 |
| Accessibility audit | 16 |
| Documentation sync | 17, 18 |

---

## Architecture

### Overall Structure

StormOS is a Next.js 14 App Router application with file-based routing. The production polish pass does not change this architecture — it refines implementations within it.

```
app/
  layout.tsx           ← root layout (server component)
  page.tsx             ← homepage (server component with animated children)
  loading.tsx          ← global loading state
  error.tsx            ← global error boundary
  not-found.tsx        ← 404 page
  about/page.tsx       ← fix placeholder text + heading hierarchy only (keeps 'use client')
  projects/page.tsx    → split into server header + client grid
  worldforge/page.tsx  ← remains client (Framer Motion throughout)
  contact/page.tsx     ← client (form)
  api/contact/         ← existing route (minor schema fix)
  api/waitlist/        ← existing route (no changes needed)

components/
  layout/
    navigation.tsx     ← add skip link, focus trap, ARIA
    footer.tsx         ← wire to content/social-links.ts
    page-wrapper.tsx   ← add id="main-content" role="main"
  sections/
    hero.tsx           ← headline, stagger, reduced-motion
    about.tsx          ← no changes (content is in app/about/page.tsx)
    projects.tsx       ← wire to content/projects.ts, empty state
    projects-grid.tsx  ← NEW: client component for app/projects/page.tsx split
    skills.tsx         ← wire to content/skills.ts, empty state
    worldforge.tsx     ← add <WaitlistForm /> inline
    waitlist-form.tsx  ← NEW: email form for WorldForge
    contact.tsx        ← replace uncontrolled form with <ContactForm />
    contact-form.tsx   ← NEW: validated contact form component
  ui/
    button.tsx         ← hover/active scale, 44px min-height
    card.tsx           ← hover elevation animation
    badge.tsx          ← role="status" when used as status
    input.tsx          ← aria-invalid, aria-describedby, focus ring
    textarea.tsx       ← resize-y, min-height 120px
    scroll-progress.tsx ← NEW: fixed progress bar

content/
  projects.ts          ← populate with placeholder-marked entries
  skills.ts            ← populate with placeholder-marked entries
  social-links.ts      ← populate with placeholder-marked entries

hooks/
  use-scroll-progress.ts   ← NEW: scroll percentage calculation
```

### Key Design Decisions

**Single source of truth for content.** All projects, skills, and social links are defined exclusively in `content/*.ts`. Section components import this data directly. This eliminates the duplicate hardcoded arrays currently in `components/sections/projects.tsx` and `app/projects/page.tsx`.

**Scroll progress as a lightweight hook returning `number | null`.** The `useScrollProgress` hook returns `null` when `prefers-reduced-motion` is active (so the `ScrollProgress` component can render a static full-width bar, keeping it visible per Req 14.3), and a `number` in `[0, 1]` during normal scroll. The indicator is a fixed `<div>` positioned above the navigation, throttled to ~100ms via `requestAnimationFrame`.

**Reduced motion handled directly per component.** Each animated component imports `useReducedMotion` from `framer-motion` directly — no wrapper hook, no `AnimatedElement` abstraction. The call is one line per component. This keeps the dependency surface minimal and avoids indirection that adds no value.

**Forms as sibling section components, not a separate `features/` directory.** `WaitlistForm` lives at `components/sections/waitlist-form.tsx` and `ContactForm` at `components/sections/contact-form.tsx`. They are section-scoped and used in exactly one place each. The `components/features/` directory is not created.

**Form integration via react-hook-form + zod.** Both the contact form and the WorldForge waitlist form use `react-hook-form` with a Zod resolver. Validation schemas are defined once in `lib/validations.ts` and shared between the API routes and the client-side forms.

---

## Components and Interfaces

### New Components

#### `hooks/use-scroll-progress.ts`

```typescript
export function useScrollProgress(): number | null
// Returns null when prefers-reduced-motion is active — ScrollProgress renders static full-width bar.
// Returns a number in [0, 1] representing scroll depth during normal operation.
// Updates on scroll events, throttled to ~100ms via requestAnimationFrame.
// Edge case: returns 0 (not null) when scrollHeight === viewportHeight (no scrollable content).
```

#### `components/ui/scroll-progress.tsx`

```typescript
interface ScrollProgressProps {
  className?: string;
}
// Fixed-position bar at top of viewport, z-index above navigation.
// When progress is null (reduced motion): width: '100%', no CSS transition — static visible bar.
// When progress is number: width: `${progress * 100}%`, bg-storm-blue, h-[2px].
```

#### `components/sections/waitlist-form.tsx`

```typescript
interface WaitlistFormProps {
  className?: string;
}
// Email input + submit button.
// Wired to POST /api/waitlist.
// Shows Toast on success/error.
// Inline error on invalid email.
```

#### `components/sections/contact-form.tsx`

```typescript
// Replaces the uncontrolled form in components/sections/contact.tsx.
// Uses react-hook-form + contactFormSchema from lib/validations.ts.
// Fields: name (min 2), email (valid), message (min 10).
// Shows Toast on success/error, clears on success, preserves on error.
```

#### `components/sections/projects-grid.tsx`

```typescript
// Client component ('use client') — extracted from app/projects/page.tsx.
// Imports projects from @/content/projects.
// Renders full project list with same empty state logic as homepage section.
// Allows app/projects/page.tsx to be a server component.
```

### Modified Components

#### `components/layout/page-wrapper.tsx`

```typescript
// Add to <main>: id="main-content" role="main"
// Add skip link as first child of the root div.
```

#### `components/layout/navigation.tsx`

```typescript
// Add: Skip_Link as first focusable element (visually hidden until focused).
// Add: aria-label="Main navigation" on <nav>.
// Add: aria-expanded on mobile button (already present, verify correctness).
// Add: focus trap in mobile menu using useFocusTrap hook.
// Add: body scroll lock when mobile menu is open.
// Fix: active link indicator — bottom border 2px storm-blue, only on active route.
// Change: transition-colors duration from 300ms to 150ms.
```

#### `components/layout/footer.tsx`

```typescript
// Replace hardcoded social link JSX with socialLinks.map() from content/social-links.ts.
// Add: role="contentinfo" to <footer> element.
// Add: tagline under "StormOS" brand section.
// Keep: dynamic copyright year (already correct).
```

#### `components/sections/hero.tsx`

```typescript
// Change: headline to "Building Digital Worlds" (from bare name "Storm").
// Change: subheadline to "Software Engineer • AI Engineer • Product Builder".
// Change: CTA buttons to "Explore My Work" (primary) + "View WorldForge" (secondary).
// Fix: stagger delays — 0ms, 100ms, 200ms, 300ms per documented sequence.
// Fix: import useReducedMotion from 'framer-motion' directly; when true: remove animate
//      prop from ambient glow motion.div and scroll indicator bob animation.
// Fix: ensure Display 1 size (64px desktop) via text-[64px] or text-7xl (72px fallback).
```

#### `components/sections/projects.tsx`

```typescript
// Remove: hardcoded projects array.
// Add: import { projects } from '@/content/projects'.
// Add: empty state when projects.length === 0.
// Fix: tag truncation — max 3 visible, "+N more" for overflow.
// Fix: status Badge mapping (completed → success, in-progress → warning).
```

#### `components/sections/skills.tsx`

```typescript
// Remove: hardcoded skillCategories array.
// Add: import { skills } from '@/content/skills'.
// Add: group skills by category client-side.
// Add: empty state when skills.length === 0.
// Fix: category headings to <h3> for correct heading hierarchy.
```

#### `components/sections/worldforge.tsx`

```typescript
// Add: import <WaitlistForm /> from '@/components/sections/waitlist-form'.
// Replace the non-functional <Button>Join the Waitlist</Button> with <WaitlistForm />.
// Verify: all WorldForge-branded elements use accent-purple, not storm-blue.
// Fix: badge pulse animation — import useReducedMotion from 'framer-motion'; when true, omit animate prop.
```

#### `components/ui/button.tsx`

```typescript
// Add: hover:scale-[1.02] and active:scale-[0.98] Tailwind classes or Framer Motion whileHover/whileTap.
// Fix: transition duration to 150ms (duration-[150ms]).
// Verify: lg size produces min-h-[44px].
```

#### `components/ui/card.tsx`

```typescript
// Add to interactive variant: role="button", tabindex="0", onKeyDown Enter/Space handler.
// Add to elevated/interactive variants: hover:translate-y-[-4px] hover:shadow-lg at 200ms.
```

#### `components/ui/badge.tsx`

```typescript
// Add: role="status" to the span element when variant indicates a status.
// Consider adding a `asStatus` boolean prop or inferring from variant.
```

#### `components/ui/input.tsx`

```typescript
// Add: aria-invalid={!!error} to the <input>.
// Add: aria-describedby={error ? `${id}-error` : undefined}.
// Ensure error paragraph has id={`${id}-error`}.
// Add: custom focus shadow: focus:shadow-[0_0_0_3px_rgba(10,132,255,0.2)].
```

#### `components/ui/textarea.tsx`

```typescript
// Add: resize-y class.
// Add: min-h-[120px] class.
// Add: aria-invalid, aria-describedby (same pattern as Input).
```

---

## Data Models

### Content Types (existing, in `types/index.ts`)

The content files reference these types. The `Project`, `Skill`, and `SocialLink` types must be populated with placeholder-marked representative entries:

```typescript
// Project entry structure (content/projects.ts)
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];           // max 3 shown in card, +N for overflow
  technologies: string[];
  links: {
    live?: string;
    github?: string;
  };
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
}

// Skill entry structure (content/skills.ts)
interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools & DevOps' | 'AI/ML' | string;
  proficiency: number;  // 0–100
  years?: number;
}

// SocialLink entry structure (content/social-links.ts)
interface SocialLink {
  platform: string;
  url: string;
  icon: string;  // lucide icon name
}
```

### Validation Schemas (`lib/validations.ts`)

```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required').optional().default(''),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type WaitlistFormData = z.infer<typeof waitlistSchema>;
```

### Scroll Progress State

```typescript
// Internal to useScrollProgress hook.
// Output: number | null
//   null  → prefers-reduced-motion is active; ScrollProgress renders static full-width bar
//   0..1  → clamped scroll progress percentage
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature is predominantly UI polish, content wiring, and configuration work. Several areas contain pure functions or universal behavioral invariants well-suited to property-based testing: form validation logic, tag truncation logic, scroll progress calculation, form response handling, and empty-state consistency.

**Removed from PBT:** Hero stagger delay (trivial arithmetic, verified by code review) and ARIA error association (deterministic component behavior, better as example tests — see Testing Strategy).

---

### Property 1: Interactive Element Minimum Touch Target

*For any* Button component with `size="lg"`, the rendered height must be at least 44px regardless of the button's text content or icon configuration.

**Validates: Requirements 2.8, 6.1**

---

### Property 2: Email Validation Rejects All Invalid Inputs

*For any* string that is not a syntactically valid email address (empty string, missing `@`, missing domain, whitespace-only, special characters in wrong positions), the `waitlistSchema` and `contactFormSchema` parsers must both return a `ZodError` rather than a valid parse result.

**Validates: Requirements 9.4, 10.2**

---

### Property 3: Contact Form Field Length Validation

*For any* name string of length less than 2, and *for any* message string of length less than 10, parsing with `contactFormSchema` must return a `ZodError` — this must hold for all strings in those length ranges, not just empty strings.

**Validates: Requirements 10.1, 10.3**

---

### Property 4: Project Tag Truncation Invariant

*For any* array of tags of length `N`, the project card renderer must display exactly `min(N, 3)` tag badges, and if `N > 3`, must display a "+{N-3} more" indicator — this property must hold for any tag array regardless of tag content.

**Validates: Requirements 8.5**

---

### Property 5: Scroll Progress Percentage Calculation

*For any* valid scroll state `(scrollY, documentScrollHeight, viewportHeight)` where `documentScrollHeight > viewportHeight`, the `calculateScrollProgress` pure function must return `scrollY / (documentScrollHeight - viewportHeight)`, clamped to `[0, 1]`. At `scrollY = 0`, the result must be exactly `0`. At `scrollY = documentScrollHeight - viewportHeight`, the result must be exactly `1`. When `scrollHeight === viewportHeight`, returns `0` (no division by zero).

**Validates: Requirements 14.1, 14.2**

---

### Property 6: Projects Empty State Consistency

*For any* projects array passed to the Projects section, if the array is empty then the empty state message must render and no project cards must render; if the array is non-empty then project cards must render and no empty state message must render — these two conditions are mutually exclusive and exhaustive for any array input.

**Validates: Requirements 8.3**

---

### Property 7: Project Status Badge Variant Mapping

*For any* `Project` object with `status = 'completed'`, the rendered card must include a Badge with the `success` variant; *for any* `Project` with `status = 'in-progress'`, the Badge must use the `warning` variant. This mapping must hold for any project content (title, description, tags, links are irrelevant to the badge variant).

**Validates: Requirements 8.4**

---

### Property 8: Form Response State Consistency

*For any* contact form submission result (API success response or API error response), the form state transitions must be internally consistent: a success response always clears all field values AND shows a success Toast; an error response always preserves all field values AND shows an error Toast — no cross-state combination is ever valid.

**Validates: Requirements 10.6**

---

## Error Handling

### Form Error Handling

**Validation errors** are caught client-side by Zod before any API call. The react-hook-form error state populates inline error messages adjacent to each field. No network request is made for invalid input.

**API errors** from `/api/contact` or `/api/waitlist` are caught in the `onSubmit` handler's catch block. An error Toast is displayed. Form field values are preserved in the react-hook-form state (not cleared).

**Network errors** (fetch fails entirely) are treated identically to API errors — error Toast, preserve form data.

**The error Toast must only appear on error; the success Toast must only appear on success.** These are mutually exclusive per Property 10.

### Component Error Handling

**Project card badge:** If `project.status` is undefined or an unexpected value, the Badge component is omitted rather than throwing. The card renders without a status badge (graceful degradation per Requirement 8.4).

**Empty content arrays:** If `content/projects.ts` or `content/skills.ts` export empty arrays, the sections render their empty states. This is expected during development.

**Scroll progress edge case:** If `document.documentElement.scrollHeight === window.innerHeight` (page fits in viewport with no scroll), the progress value is `0` and the bar remains invisible (0px width). No division by zero.

### API Route Error Handling (existing, verified)

Both `/api/contact` and `/api/waitlist` already handle:
- Zod validation errors → 400 with `details`
- Unexpected errors → 500

The contact API route's Zod schema should be updated to match the stricter client-side rules: `name.min(2)` and `message.min(10)`.

---

## Testing Strategy

This feature is primarily UI composition and content wiring. The testing approach is:

1. **Property-based tests** for pure logic: validation schemas, tag truncation, scroll progress calculation, stagger delay calculation, form response state machine, ARIA attribute invariants.
2. **Example-based unit tests** for specific component behaviors: empty states, specific animation values, ARIA roles, heading hierarchy, focus trap behavior.
3. **Integration tests** (manual or Playwright) for: full contact form submit flow, waitlist form submit flow, keyboard navigation through the full page, Lighthouse accessibility audit.

**Property-Based Testing Library:** [fast-check](https://fast-check.dev/) for TypeScript/Jest. Minimum 100 iterations per property.

Each property test references its design document property with a comment:
```typescript
// Feature: production-polish, Property N: <property title>
```

### Unit Test Coverage Targets

| Area | Approach |
|---|---|
| `contactFormSchema` validation | PBT — Properties 2, 3 |
| `waitlistSchema` validation | PBT — Property 2 |
| Tag truncation function | PBT — Property 4 |
| `calculateScrollProgress` function | PBT — Property 5 |
| Projects section empty/non-empty | PBT — Property 6 |
| Project status Badge variant | PBT — Property 7 |
| Contact form response state | PBT — Property 8 |
| Button lg height | Example — Property 1 |
| Input ARIA attributes with error | Example |
| Textarea ARIA attributes with error | Example |
| Navigation skip link presence | Example |
| Navigation active indicator | Example |
| Mobile menu focus trap | Example |
| WorldForge accent-purple branding | Example |
| Loading page StormOS logo mark | Example |
| Error page Card + navigation | Example |
| 404 page within PageWrapper | Example |
| Footer social links from content file | Smoke |
| Skills reads from content file | Smoke |

**Note on ARIA example tests:** `Input` and `Textarea` ARIA attribute correctness is verified by two deterministic example-based tests (one per component). The behavior is a direct prop-to-attribute mapping with no edge cases that benefit from arbitrary input generation — PBT adds no value here.

### Property Test Configuration

```typescript
// fast-check configuration
import * as fc from 'fast-check';

// Minimum runs per test
const RUN_COUNT = 100;

// Example: Property 3 — email validation
it('rejects all invalid email strings', () => {
  // Feature: production-polish, Property 3: Email Validation Rejects All Invalid Inputs
  fc.assert(
    fc.property(fc.emailAddress().filter(e => !e.includes('@')), (invalidEmail) => {
      const result = waitlistSchema.safeParse({ email: invalidEmail });
      expect(result.success).toBe(false);
    }),
    { numRuns: RUN_COUNT }
  );
});
```

### Integration Test Scenarios (Manual / Playwright)

1. Submit contact form with valid data → success Toast → form cleared
2. Submit contact form with invalid data → inline errors → no API call
3. Submit waitlist form with valid email → success Toast → input cleared
4. Navigate full homepage with keyboard only → all elements reachable
5. Run Lighthouse accessibility audit on homepage → score ≥ 90
6. Enable `prefers-reduced-motion` → no animations running
7. Scroll to bottom of homepage → progress bar reaches 100%
8. Navigate to `/worldforge` → all headings purple, no storm-blue leakage
9. Navigate to non-existent route → 404 page with navigation visible
10. Trigger error boundary → error page with Card + "Go Home" link

### Why PBT Does Not Apply to All Requirements

The following areas are explicitly excluded from property-based testing:

- **Hero stagger delays** (Req 2.4): The delay formula `i * 0.1` is trivial arithmetic. PBT would test JavaScript's multiplication operator, not application behavior. Verified by code review.
- **ARIA attribute mapping on Input/Textarea** (Req 6.9): Deterministic prop-to-attribute mapping. Two example-based tests cover this completely — arbitrary string generation adds nothing.
- **Content placeholder marking** (Req 1): Code comment convention — not a runtime assertion.
- **Animation visual style** (Req 5.3, 5.5, 5.6): CSS/Framer Motion prop values — better verified by visual regression or snapshot.
- **About page server component** (Req 15.1): Descoped. The About page keeps `'use client'` — Framer Motion requires it, and the bundle cost is negligible since Framer Motion is already loaded by `hero.tsx`. The server/client split for a single-animation page adds architectural complexity without meaningful savings.
- **Server component architecture broadly** (Req 15): Build-time concern — checked by Next.js static analysis and bundle inspection.
- **Documentation sync** (Req 17, 18): Process requirement — code review, not automated test.
- **Lighthouse score** (Req 16.1): Integration-level audit tool, not a unit-testable property.
- **Typography pixel values** (Req 13): CSS computed style — example tests or visual regression.
