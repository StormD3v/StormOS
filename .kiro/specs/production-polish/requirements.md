# Requirements Document

## Introduction

StormOS is a premium portfolio operating system for a software engineer named Storm. The project has reached a functional MVP (v0.9) — it builds, passes TypeScript and ESLint checks, and renders all pages. However, the implementation is still far from the documented vision of a world-class, flagship-quality digital experience.

This Production Polish & Final Quality Pass spec defines the complete requirements for elevating StormOS from v0.9 to v1.0. The goal is not to build new features but to make every existing element feel intentional, premium, and cohesive — meeting or exceeding the quality bar set by products like Linear, Vercel, Framer, and Stripe.

The audit of the current implementation reveals several categories of issues: placeholder content throughout, missing design system implementation details, animation and motion gaps, accessibility deficiencies, component quality issues, performance opportunities, and documentation/implementation divergence. Every requirement below addresses a real, observed problem in the current codebase.

---

## Glossary

- **StormOS**: The portfolio operating system application being polished
- **Design_System**: The documented design tokens, typography, spacing, and visual language defined in `docs/01-design-system/README.md`
- **Component_Library**: The documented component specifications defined in `docs/02-component-library/README.md`
- **User_Journey**: The documented 10-stage emotional progression defined in `docs/03-user-journey/README.md`
- **Motion_System**: The documented animation timing, easing, and component-specific animation specifications in `docs/05-animation-motion/README.md`
- **Navigation**: The fixed top navigation component
- **Hero**: The full-screen landing section of the homepage
- **Skip_Link**: A visually hidden link that becomes visible on focus, allowing keyboard users to skip navigation
- **Page_Wrapper**: The layout component wrapping all pages with Navigation and Footer
- **prefers-reduced-motion**: A CSS media feature and JavaScript API for detecting user motion preferences
- **WCAG_AA**: Web Content Accessibility Guidelines 2.1 Level AA compliance target
- **Focus_Indicator**: The visible ring shown around an element when it receives keyboard focus
- **Toast**: A temporary notification component that slides in and auto-dismisses
- **WorldForge**: Storm's flagship project with distinct purple (#BF5AF2) branding
- **Placeholder_Content**: Hardcoded example text, generic descriptions, or example.com links that must be replaced with real content
- **Content_File**: TypeScript files under `content/` directory that store structured data (projects, skills, social links)
- **Scroll_Reveal**: An animation that fades and translates elements into view as they enter the viewport via Intersection Observer

---

## Requirements

---

### Requirement 1: Placeholder Content Identification and Replacement

**User Story:** As a visitor to StormOS, I want to see real, specific information about Storm rather than generic placeholder text, so that I can evaluate Storm's actual capabilities and decide whether to get in touch.

#### Acceptance Criteria

1. THE StormOS SHALL clearly mark every instance of placeholder content with a `[PLACEHOLDER]` prefix in code comments so that real content can be identified and replaced without ambiguity.

2. WHEN a visitor reads the hero section, THE Hero SHALL display a tagline that communicates Storm's specific engineering identity rather than the generic string "Software Engineer crafting exceptional digital experiences".

3. WHEN a visitor reads the About section, THE About SHALL not contain the phrases "years of experience" or "millions of people" without specific, real numbers replacing them.

4. WHEN a visitor views the contact section or footer, THE StormOS SHALL not display placeholder email addresses such as "hello@example.com" — all email links must either be real or explicitly commented as `[PLACEHOLDER: replace with real email]`.

5. WHEN a visitor views the footer social links, THE Footer SHALL not link to root domains such as "https://github.com" without a real username path — all social links must be either real or explicitly marked as placeholder.

6. THE Content_File at `content/projects.ts` SHALL contain at minimum one real or representative project entry following the documented `Project` type structure, or all project displays must show a purposeful "coming soon" empty state rather than generic hardcoded examples in section components.

7. THE Content_File at `content/skills.ts` SHALL contain at minimum one real or representative skill entry following the documented `Skill` type structure, or the skills section must read from the content file rather than maintaining a hardcoded inline list.

8. THE Content_File at `content/social-links.ts` SHALL contain at minimum one social link entry following the documented `SocialLink` type structure, or social link displays must be fed from the content file rather than hardcoded directly in components.

---

### Requirement 2: Hero Section — Documentation Compliance and Visual Polish

**User Story:** As a visitor arriving at StormOS for the first time, I want the hero section to create an immediate strong first impression through precise typography, purposeful animation, and clear calls to action, so that I am compelled to explore further.

#### Acceptance Criteria

1. THE Hero SHALL display a primary headline matching the documented User Journey headline "Building Digital Worlds" (or an equivalent brand-specific statement) rather than the bare name "Storm" as a headline.

2. THE Hero SHALL display a subheadline matching the documented format "Software Engineer • AI Engineer • Product Builder" (or equivalent real values) as per the User Journey documentation Stage 1.

3. THE Hero SHALL contain a primary CTA button labeled "Explore My Work" and a secondary CTA button labeled "View WorldForge", matching the documented User Journey Stage 1 behavioral specifications.

4. WHEN the hero section loads, THE Hero SHALL animate its elements in a staggered sequence: greeting/badge first (0ms delay), headline second (100ms delay), subheadline third (200ms delay), CTA buttons fourth (300ms delay), all using the documented ease-out curve `[0.215, 0.61, 0.355, 1]` at 600ms duration per element.

5. WHILE a user has not set `prefers-reduced-motion: reduce`, THE Hero SHALL display the ambient glow animation on the background element using Framer Motion's `animate` prop with a scale and opacity loop at 8-second duration, applied only once the hero section has fully loaded.

6. IF a user has set `prefers-reduced-motion: reduce`, THEN THE Hero SHALL replace the looping ambient glow animation with a static version (fixed opacity and scale) so the visual element remains present without any motion.

7. WHEN the hero section begins to render, THE Hero staggered entrance animations SHALL be deferred until the section DOM is fully mounted, preventing animations from running against incomplete content.

7. THE Hero scroll indicator SHALL animate with a vertical bobbing motion on a 2-second infinite loop, communicating that scrolling is available, and SHALL stop this animation when `prefers-reduced-motion` is detected.

8. THE Hero CTA buttons SHALL each have a minimum height of 44px to meet WCAG touch target requirements.

---

### Requirement 3: Navigation — Quality, Accessibility, and Scroll Behavior

**User Story:** As a visitor navigating StormOS, I want the navigation to feel premium and respond correctly to my position on the page, so that I always know where I am and can move freely between sections.

#### Acceptance Criteria

1. THE Navigation SHALL include a "skip to main content" Skip_Link as the first focusable element in the DOM, visually hidden until focused, linking to `#main-content` with the landmark id applied to the `<main>` element in Page_Wrapper.

2. THE Navigation logo text "StormOS" SHALL be implemented as an `<h1>` equivalent in terms of landmark prominence — it must not be a heading tag but SHALL have `aria-label` set appropriately so screen readers announce it as the site identity.

3. WHEN a user keyboard-focuses a navigation link, THE Navigation SHALL display a Focus_Indicator of 2px solid `#0A84FF` (storm-blue) with 2px offset, conforming to WCAG_AA focus visibility requirements.

4. WHEN the mobile menu is open, THE Navigation SHALL set `aria-expanded="true"` on the hamburger button and SHALL prevent body scroll so content behind the menu does not shift.

5. WHEN the mobile menu opens, THE Navigation SHALL trap focus within the menu so Tab and Shift+Tab cycle only through menu items; pressing Escape SHALL both close the menu AND return focus to the hamburger button simultaneously, ensuring both behaviors succeed together.

6. WHEN a navigation link is active (current page), THE Navigation SHALL apply both `text-storm-blue` color AND a visible bottom border indicator of 2px solid storm-blue strictly tied to the active route state — these indicators SHALL never appear on inactive links and SHALL always appear when the link matches the current pathname.

7. THE Navigation backdrop-blur SHALL be applied alongside a background opacity that ensures the navigation content remains readable when content scrolls behind it, specifically `bg-neutral-950/80 backdrop-blur-md` as currently implemented.

8. THE Navigation transition duration for color changes SHALL be 150ms ease-out, matching the documented Duration 1 (Instant) timing from the Design_System.

---

### Requirement 4: Page-Level Layout and Semantic Structure

**User Story:** As a screen reader user or keyboard-only user navigating StormOS, I want the page structure to use correct semantic HTML landmarks so that I can navigate directly to sections of interest without traversing the entire page.

#### Acceptance Criteria

1. THE Page_Wrapper SHALL render the `<main>` element with `id="main-content"` and `role="main"` so that the Skip_Link target exists and landmark navigation works correctly.

2. THE Page_Wrapper `<nav>` element in Navigation SHALL have `aria-label="Main navigation"` to distinguish it from any other navigation elements on the page.

3. THE Footer SHALL be wrapped in a `<footer>` element with `role="contentinfo"` matching the documented Accessibility spec landmark requirements.

4. WHEN a page renders, THE StormOS SHALL have exactly one `<h1>` element per page AND heading levels must not skip (h1 → h2 → h3 in order without gaps) — if either condition is violated, the implementation must be corrected before it is considered compliant.

5. THE homepage sections (About, Projects, Skills, WorldForge, Contact) SHALL each use `<h2>` for their section titles, ensuring correct document outline hierarchy below the `<h1>` in the Hero.

6. THE About, Projects, WorldForge, and Contact pages SHALL each have their page-level title rendered as `<h1>` (not as a styled `<div>`), with subsequent section headings as `<h2>` and card/subsection headings as `<h3>`.

---

### Requirement 5: Animation System — Documentation Compliance and Motion Purpose

**User Story:** As a visitor to StormOS, I want every animation to feel intentional and purposeful, communicating state, hierarchy, or delight, so that the experience feels premium rather than generic.

#### Acceptance Criteria

1. THE StormOS scroll-reveal animations SHALL respect a global `scroll_animations_active` toggle, activating only when both the toggle is enabled and the Intersection Observer fires — the toggle defaults to enabled for all users who do not have `prefers-reduced-motion` set.

2. WHEN multiple items in a list or grid animate into view simultaneously, THE StormOS SHALL stagger their animations with 100ms delay between each child, as documented in the Framer Motion staggered children pattern.

3. WHEN a user hovers over an interactive Card component, THE Card SHALL apply `translateY(-4px)` and increase shadow level by one step (from `shadow-md` to `shadow-lg`) at 200ms ease-out, matching the documented "Elevate" hover animation.

4. WHEN a user hovers over a Button, THE Button SHALL apply a subtle scale of 1.02 and increase shadow at 150ms ease-out; WHEN a user activates (presses) a Button, THE Button SHALL apply scale 0.98 at 150ms ease-out.

5. WHEN a Toast notification appears, THE Toast SHALL slide in from the right (translateX 100%→0, opacity 0→1) at 300ms with ease-out-back easing `[0.175, 0.885, 0.32, 1.275]`, matching the documented Toast Entry animation.

6. WHEN a Toast notification exits, THE Toast SHALL slide out to the right (translateX 0→100%, opacity 1→0) at 300ms with ease-in easing.

7. THE Motion_System SHALL NOT include any animation whose sole purpose is decorative without communicating hierarchy, state change, navigation, or delight — purely decorative motion SHALL be removed.

8. IF a user has `prefers-reduced-motion: reduce` set, THEN THE StormOS SHALL disable all Framer Motion animations — including pulse animations such as the WorldForge badge pulse, scroll-reveal animations, ambient glow loops, and hero entrance animations — by checking `useReducedMotion()` and applying instant or static alternatives; no animation of any kind shall continue to run when this preference is active.

9. THE WorldForge "Coming Soon" badge SHALL have a subtle pulse animation (scale 1→1.05→1, opacity 1→0.8→1) at 2-second duration, infinite, ease-in-out — this is classified as communicating "active/coming soon" state, not decoration.

---

### Requirement 6: Component Quality — Button, Card, Badge, and Form Elements

**User Story:** As a developer maintaining StormOS or a visitor interacting with its UI, I want all components to behave predictably, display correctly across all states, and conform to the documented specifications so that the experience is consistent and trustworthy.

#### Acceptance Criteria

1. THE Button SHALL render with minimum height 44px for the `lg` size variant to meet the documented 44x44px minimum touch target requirement — the current `px-6 py-3 text-lg` sizing must be verified to produce at least 44px height.

2. THE Button `primary` variant SHALL use `hover:bg-storm-blue-dark` (mapped to `#0056D6`) rather than the undocumented `hover:bg-storm-blue-dark` class, and SHALL confirm the Tailwind config `storm-blue-dark` token maps to `#0056D6` as documented.

3. THE Button SHALL apply `focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 focus:ring-offset-neutral-950` for a visible Focus_Indicator on keyboard navigation.

4. THE Button `transition-colors` duration SHALL be updated from the generic `duration-300` to the documented `duration-fast` (150ms) matching the Design_System Duration 1 spec.

5. THE Badge component SHALL render with the `role="status"` attribute when used for status indicators so screen readers announce badge content appropriately.

6. THE Card `interactive` variant SHALL include `role="button"` and `tabindex="0"` when used as a clickable card, with keyboard activation via Enter and Space keys, as documented in the Component Library.

7. THE Input component SHALL display a visible focus ring matching `focus:ring-storm-blue` with a shadow of `0 0 0 3px rgba(10, 132, 255, 0.2)` when focused, as documented in the Component Library.

8. THE Textarea component SHALL resize vertically only (`resize-y`) and SHALL have a minimum height of 120px matching the documented Textarea specification.

9. IF a form field has a validation error, THEN THE Input or Textarea SHALL apply `aria-invalid="true"` and `aria-describedby` pointing to the error message element's id.

---

### Requirement 7: Skills Section — Content Architecture

**User Story:** As a visitor interested in Storm's technical capabilities, I want the skills section to display real skills from the content file rather than hardcoded placeholder data, so that the information is maintainable and reflects Storm's actual expertise.

#### Acceptance Criteria

1. THE Skills section SHALL read skill data from `content/skills.ts` rather than maintaining a hardcoded inline array, so that content updates require changes in only one location.

2. WHEN the skills array in `content/skills.ts` is empty, THE Skills section SHALL display a purposeful empty state rather than rendering an empty grid.

3. THE Skills section skill progress bars SHALL animate their width from 0 to the target percentage WHEN the section enters the viewport using Intersection Observer, NOT on initial page load, as currently partially implemented but needing verification.

4. THE Skills section category headings SHALL use `<h3>` elements (since the section title is `<h2>`), maintaining correct document heading hierarchy as required by Requirement 4.

---

### Requirement 8: Projects Section — Content Architecture and Empty State

**User Story:** As a visitor exploring Storm's work, I want to see either real projects or a well-designed empty state, rather than hardcoded generic placeholder projects that suggest the portfolio is incomplete.

#### Acceptance Criteria

1. THE Projects section on the homepage SHALL read project data from `content/projects.ts` rather than maintaining a hardcoded inline array of placeholder projects.

2. THE Projects page at `/projects` SHALL also read from `content/projects.ts` rather than a separate hardcoded array, ensuring content is defined in exactly one place.

3. WHEN the projects content file is empty or contains no featured projects, THE Projects section SHALL render a purposeful empty state with a message such as "Projects coming soon" styled consistently with the design system — it SHALL NOT render placeholder project cards; WHEN actual projects exist, THE Projects section SHALL not display any empty state messaging.

4. WHEN a project card is rendered, THE Card SHOULD display a project status indicator using the Badge component — "completed" maps to a success-toned badge, "in-progress" maps to a warning-toned badge; IF the Badge component fails to render, THE Card SHALL still render the project content without a status badge rather than failing entirely.

5. WHEN project tags are displayed, THE Card SHALL show a maximum of 3 tags and truncate additional tags with a "+N more" indicator, as documented in the User Journey Stage 2 content preview spec.

---

### Requirement 9: WorldForge Section — Brand Consistency and Functional Waitlist

**User Story:** As a visitor excited by WorldForge, I want to be able to join the waitlist through a functional form, and I want the WorldForge visual identity to be consistently applied throughout the section and dedicated page, so the flagship project feels distinctive and polished.

#### Acceptance Criteria

1. THE WorldForge section and `/worldforge` page SHALL consistently apply Accent Purple (`#BF5AF2`) to all WorldForge-specific headings, badges, icons, and CTAs — IF any WorldForge-branded element renders with Storm Blue instead of Accent Purple, THE system SHALL treat this as a brand consistency failure requiring correction before the component is considered compliant.

2. THE WorldForge waitlist CTA SHALL link to or render an actual email input form rather than a non-functional button, with the form wired to the existing `/api/waitlist` endpoint.

3. WHEN a user submits the waitlist form with a valid email address, THE Waitlist_Form SHALL display a success Toast notification reading "You're on the list! We'll keep you updated." as documented in the User Journey Stage 7, and SHALL clear the email input field on successful submission.

4. IF a user submits the waitlist form with an invalid or empty email address, THEN THE Waitlist_Form SHALL display an inline validation error below the email input without submitting to the API.

5. IF the `/api/waitlist` endpoint returns an error response, THEN THE Waitlist_Form SHALL display an error Toast notification and keep the form data intact (email input value preserved).

6. THE WorldForge section background SHALL include a subtle purple gradient (`from-accent-purple/10 via-transparent to-transparent`) as currently partially implemented, ensuring the purple identity is subtly present in the environment.

---

### Requirement 10: Contact Form — Functionality and Validation

**User Story:** As a visitor who wants to reach out to Storm, I want the contact form to validate my input and provide clear feedback on submission, so that I know my message was received or understand what I need to fix.

#### Acceptance Criteria

1. THE Contact_Form SHALL validate that the name field is at minimum 2 characters before allowing submission.

2. THE Contact_Form SHALL validate that the email field is non-empty AND contains a syntactically valid email address before allowing submission — both conditions must be satisfied for the field to be considered valid.

3. THE Contact_Form SHALL validate that the message field contains at minimum 10 characters before allowing submission.

4. WHEN validation fails on any field, THE Contact_Form SHALL display an inline error message adjacent to the failing field using `aria-describedby` to associate the error with the input.

5. WHEN a user submits the contact form with valid data, THE Contact_Form SHALL disable the submit button and display a loading spinner, preventing duplicate submissions.

6. WHEN the `/api/contact` endpoint returns a success response, THE Contact_Form SHALL display a success Toast notification and clear the form fields; WHEN the `/api/contact` endpoint returns an error response, THE Contact_Form SHALL display an error Toast notification (and only an error toast, never a success toast for error responses) while preserving all form field values.

8. THE Contact_Form SHALL use `react-hook-form` and `zod` validation, as these libraries are already installed and documented in the Technical Architecture.

---

### Requirement 11: Error, Loading, and Not-Found States — Polish and Brand Consistency

**User Story:** As a visitor who encounters an error or navigates to a non-existent page, I want to see a polished, on-brand experience that helps me recover, rather than a bare minimal error state that breaks the StormOS aesthetic.

#### Acceptance Criteria

1. THE not-found page SHALL render within the Page_Wrapper so the Navigation and Footer are visible, allowing users to navigate back without using the browser back button.

2. THE not-found page SHALL include a link back to the homepage and a descriptive message explaining the page does not exist, rather than only displaying "404" and "Page not found"; THE error page SHALL also include a "Go Home" navigation link alongside any "Try again" button so users on all error-like pages (404 and error boundary) can navigate to a working state.

3. THE error page SHALL display the error using all three required styling elements together: the Card component for the error container, design tokens for all color and spacing values, and the dark theme `bg-neutral-950` background — partial compliance (e.g., dark background without Card, or Card without design tokens) does not meet this requirement.

4. THE loading page SHALL use the StormOS branded spinner styling (`border-storm-blue border-t-transparent`) as currently implemented, but SHALL also display the "StormOS" logo mark above the spinner for brand reinforcement during loading.

5. WHEN the error boundary catches an error, THE Error_Page SHALL provide both a "Go Home" navigation link and a "Try again" button.

---

### Requirement 12: Footer — Completeness and Real Content

**User Story:** As a visitor completing their tour of StormOS, I want the footer to contain real, clickable links and a professional closing statement, so the last thing I see before leaving reinforces the quality of the experience.

#### Acceptance Criteria

1. THE Footer social links SHALL be fed from `content/social-links.ts` rather than hardcoded directly in the footer component, ensuring a single source of truth for social link data.

2. THE Footer SHALL include a brief tagline beneath "StormOS" that communicates Storm's value proposition, matching the documented content strategy for the footer brand section.

3. THE Footer navigation links SHALL all point to their respective pages correctly and SHALL match the Navigation links set (Home, About, Projects, WorldForge, Contact).

4. THE Footer copyright year SHALL be dynamically generated using `new Date().getFullYear()` as currently implemented — this is correct and SHALL be preserved.

5. THE Footer SHALL include a legal/privacy section with a real link or a clearly marked `[PLACEHOLDER]` comment — unmarked placeholder links in the legal section SHALL not be deployed to production; WHEN real legal links exist, they SHALL appear without placeholder markings.

---

### Requirement 13: Typography — Design System Compliance

**User Story:** As a visitor or designer evaluating StormOS, I want the typography to follow the documented type scale precisely so that visual hierarchy is clear, consistent, and communicates professionalism.

#### Acceptance Criteria

1. THE Hero headline SHALL use the documented Display 1 (64px on desktop, responsive down for mobile) rather than the current `text-6xl md:text-7xl lg:text-8xl` which approximates but does not precisely match the documented 64px/72px line-height Display 1 spec.

2. THE Hero subheadline SHALL use Body Large (18px, line-height 28px) as documented, corresponding to `text-lg` or `text-xl` in Tailwind.

3. THE section titles (About, Projects, Skills, etc.) SHALL use Display 2 (48px) on desktop, corresponding to `text-5xl` in the Tailwind config — the current `text-4xl md:text-5xl` is acceptable but SHALL be verified to reach 48px at the md breakpoint.

4. THE body text in Cards and sections SHALL use a minimum `text-base` (16px) to meet the documented minimum font size requirement, and SHALL maintain line-height of at least 1.5 for readability.

5. THE Navigation link font SHALL be `text-sm font-medium` (14px, weight 500) as currently implemented — this matches the documented 14-16px navigation item specification.

---

### Requirement 14: Scroll Progress Indicator

**User Story:** As a visitor reading through the long homepage, I want a visual indicator showing how far down the page I've scrolled, so that I have a sense of progress and am encouraged to continue reading.

#### Acceptance Criteria

1. THE StormOS homepage SHALL display a scroll progress bar fixed at the top of the viewport, 2px in height, storm-blue color, spanning from left to right as the user scrolls from top to bottom.

2. THE Scroll_Progress bar SHALL update its width based on scroll percentage using a throttled scroll event listener (100ms throttle), as documented in the User Journey scroll interactions.

3. WHILE a user has `prefers-reduced-motion: reduce` set, THE Scroll_Progress bar SHALL remain visible as a static element but SHALL not animate its width — it may show full width or be hidden entirely.

4. THE Scroll_Progress bar SHALL have `z-index` above the Navigation (`z-fixed` or higher) so it appears in front of all content.

---

### Requirement 15: Performance — Client Component Minimization

**User Story:** As a developer maintaining StormOS, I want server components to be used wherever possible and client components to be used only where interactivity or browser APIs are required, so that the bundle size is minimized and pages load faster.

#### Acceptance Criteria

1. THE About page SHALL be converted from a client component (`'use client'`) to a server component by removing the `'use client'` directive, since it contains no interactive state or browser API usage — only static content and Framer Motion animations that can be triggered via CSS or viewport-aware client children.

2. THE Projects page at `/projects` SHALL separate the static page header (server component) from the interactive project grid (client component), following the documented pattern of using `React.lazy` or separating server/client boundaries.

3. THE WorldForge page SHALL remain a client component where Framer Motion animations require it — WHERE static sections such as vision text are tightly coupled with animated siblings on the same page, THE StormOS SHALL allow them to remain in a shared client component rather than forcing a server/client split that complicates the architecture.

4. WHEN a page uses Framer Motion animations, THE StormOS SHALL encapsulate the animated portion in a dedicated client component rather than marking the entire page as `'use client'`, following Next.js App Router best practices.

5. THE `components/sections/*.tsx` files SHALL each declare `'use client'` only if they contain hooks, event handlers, or browser APIs — purely presentational sections receiving data via props SHALL be server components.

---

### Requirement 16: Accessibility — Comprehensive Audit and Remediation

**User Story:** As a user with a disability navigating StormOS with assistive technology, I want all interactive elements to be keyboard accessible, all content to be screen reader accessible, and all visual information to meet contrast requirements, so that I can use the portfolio without barriers.

#### Acceptance Criteria

1. THE StormOS SHALL achieve a Lighthouse accessibility score of at least 90 on the homepage when audited, as a baseline measure of automated accessibility compliance.

2. WHEN a user navigates to StormOS using keyboard only (Tab key), THE StormOS SHALL allow them to reach every interactive element including Navigation links, Hero CTAs, section anchor links, project cards, contact form fields, and submit buttons.

3. THE Contact form SHALL have each input explicitly associated with its label via `htmlFor`/`id` pairing — the current implementation partially does this but must be verified complete with subject field included.

4. THE Footer social media icon links SHALL have descriptive `aria-label` attributes (e.g., "View GitHub profile", "View LinkedIn profile") rather than the current short "GitHub", "LinkedIn" labels.

5. THE WorldForge "Join the Waitlist" button and hero CTA buttons SHALL have descriptive `aria-label` attributes that communicate their purpose beyond the visible text where the visible text alone is ambiguous.

6. WHEN a user focuses on a social media icon link in the footer or contact section, THE Focus_Indicator SHALL be visible at 2px solid storm-blue as per the global focus style defined in `globals.css`.

7. THE Mobile navigation menu SHALL have `role="menu"` on its container and `role="menuitem"` on each navigation link when the menu is open, as documented in the Component Library mobile navigation spec.

8. THE page `<html>` element SHALL have `lang="en"` as currently implemented — this is correct and SHALL be preserved.

---

### Requirement 17: Visual Consistency — Design Token Enforcement

**User Story:** As a developer or designer reviewing StormOS, I want every color, spacing, border radius, and shadow value to be drawn from the documented Design System tokens rather than arbitrary values, so that the visual system is coherent and maintainable.

#### Acceptance Criteria

1. THE StormOS SHALL not contain any hardcoded hex color values directly in `className` strings or `style` props — all colors must use Tailwind's token classes (`text-storm-blue`, `bg-neutral-900`, etc.) or CSS custom properties.

2. THE Card components SHALL use `rounded-xl` (12px, `--radius-3`) or `rounded-lg` (8px, `--radius-2`) border radius values consistently — no mixing of radius values within the same component context.

3. THE shadow values on elevated Card components SHALL use `shadow-md` as the default base state and SHALL upgrade to `shadow-lg` on hover — the reverse pattern (stronger shadow base reducing on hover) SHALL not be used for Card elevation.

4. THE spacing between section content (padding-top and padding-bottom for sections) SHALL consistently use `py-24` (6rem = 96px, approximating Space 9) to maintain visual rhythm across all sections.

5. WHEN a new color, spacing, or radius value is introduced that is not in the documented Design System, THE StormOS SHALL document the new token with its purpose and value before implementation, following the documented Design System Maintenance process — no documentation update is required when exclusively using existing tokens.

---

### Requirement 18: Documentation — Implementation Sync

**User Story:** As an engineer maintaining StormOS after launch, I want the documentation to accurately reflect the implemented state of the system so that decisions are made with correct information.

#### Acceptance Criteria

1. THE `docs/TECH_DEBT.md` SHALL be updated to reflect new items discovered during the production polish phase, including all placeholder content that was identified but could not be replaced without user input.

2. THE `docs/CHANGELOG.md` SHALL include a v1.0 entry listing all improvements made during the production polish phase.

3. WHEN an implementation diverges from documentation (for example, the Tailwind color naming using `neutral-*` instead of `gray-*` as documented), THE documentation SHALL be updated to reflect the actual implemented token names so they remain accurate.

4. THE `content/projects.ts`, `content/skills.ts`, and `content/social-links.ts` files SHALL each contain JSDoc comments explaining the data structure and noting `[PLACEHOLDER]` where real data is needed.

5. THE `AI_GUIDELINES.md` reference to the gray color scale SHALL be updated to match the actual implementation using `neutral-*` Tailwind classes and the actual CSS custom property names defined in `globals.css`.
