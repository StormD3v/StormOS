# Requirements Document

## Introduction

This document defines the requirements for a ground-up identity redesign of the StormD3v website — a Next.js 14 portfolio and studio site. This is not a cosmetic refresh. It covers visual identity, copy, section structure, motion design, and overall experience.

The owner is Friday Gift Chinecherem Azunda, working under the studio name StormD3v. He is the Founder and Builder of WorldForge (Project: Isekai) and LumiCast (Project: Real Weather). The identity hierarchy is: StormD3v (the studio), WorldForge (the flagship project), and StormOS (the philosophy). The design direction is cinematic, minimal, atmospheric, mysterious, welcoming, and timeless. It is not startup, SaaS, or portfolio-generic.

The central bar for success: would someone remember this website a week later?

Every sentence on the site must satisfy at least one of these five purposes: reveal character, build curiosity, build trust, communicate purpose, or reinforce identity. If a sentence does none of those things, it should not exist. The homepage should guide visitors through a deliberate emotional progression: Curiosity, Interest, Wonder, Trust, Connection. Typography, spacing, motion, lighting, and copy all serve this progression. The site reveals itself gradually rather than presenting everything at once.

---

## Glossary

- **StormD3v**: The studio. The overarching brand identity for all work by Friday Gift Chinecherem Azunda.
- **WorldForge** (Project: Isekai): The flagship project under StormD3v. An ambitious world-building experience built around permanence, identity, and legacy.
- **StormOS**: The philosophy behind the work. Not a product. Only referenced where it meaningfully represents that philosophy.
- **Arrival Animation**: A full-screen cinematic intro overlay that plays automatically when the visitor lands on the homepage. It is not a DOM section — it is a positioned overlay that dismisses itself after ~1.5 seconds.
- **The First Crossing**: The name for the initial group of people who will enter WorldForge before it opens publicly.
- **LumiCast** (Project: Real Weather): A secondary project by StormD3v, currently available. Public-facing name is Real Weather.
- **Flagship Product**: The project that currently occupies the primary visual position in the Building Section. At present this is WorldForge. This designation may change as the studio grows.
- **Animator**: The Framer Motion animation layer used throughout the site.
- **Navigation**: The top navigation bar persistent across all pages.
- **Footer**: The bottom section persistent across all pages.
- **Hero**: The first visible homepage section, revealed after the Arrival Animation dismisses.
- **Building Section**: Homepage section showing active and upcoming projects (previously labelled "Products").
- **WorldForge Section**: Homepage section dedicated to WorldForge as the emotional centre of the site.
- **About Section**: Homepage section answering "Why does StormD3v exist?" and introducing Friday Gift naturally.
- **Contact Section**: Homepage section with a minimal form, social links, and email.
- **Copy Rules**: The set of language constraints that govern all written content on the site.
- **SEO Metadata**: Structured data including page titles, descriptions, Open Graph tags, Twitter cards, and sitemap entries.
- **Content Configuration**: The data layer in `content/` that serves as the single source of truth for all projects, technologies, and social links displayed on the site.

---

## Requirements

### Requirement 1: Arrival Animation

**User Story:** As a first-time visitor, I want to experience a cinematic arrival sequence when I land on the homepage, so that the brand makes an immediate and lasting impression.

#### Acceptance Criteria

1. WHEN the homepage loads, THE Animator SHALL render a full-viewport overlay beginning at background color `#030303` (near-black) with all underlying page content hidden behind it.
2. WHEN the homepage loads, THE Animator SHALL fade in a faint purple atmospheric glow over 0.8 seconds (opacity 0 to 0.12).
3. WHEN the homepage loads, THE Animator SHALL render between 20 and 40 particles drifting across the background at a speed no greater than 30px per second, each at opacity no greater than 0.4, without occluding any text elements.
4. WHEN the atmospheric glow reaches full opacity, THE Animator SHALL fade in the text "StormD3v" at a typographic scale of at least 96px on desktop (at least 60px on mobile), using an opacity transition of 0 to 1 over 0.6 seconds.
5. WHEN "StormD3v" reaches full opacity, THE Animator SHALL play a soft glow pulse that travels across the letters left to right exactly once, completing in no more than 0.8 seconds, using a subtle colour shift (e.g. `accent-purple` to `white`) without altering letter spacing or position.
6. WHEN the electrical pulse completes, THE Animator SHALL fade in the text "Built by StormD3v" below the main text using an opacity transition of 0 to 1 over 0.4 seconds.
7. WHEN the subtitle "Built by StormD3v" is fully visible, THE Animator SHALL begin a cross-fade transition to the full Hero section. The cross-fade SHALL overlap no more than 0.5 seconds and SHALL complete no later than 1.5 seconds after the initial page load.
8. THE Arrival Animation SHALL NOT include a loading progress bar at any point during its sequence.
9. THE Arrival Animation SHALL NOT include a skip button or any interactive dismissal control.
10. WHERE a visitor has indicated a preference for reduced motion via `prefers-reduced-motion: reduce`, THE Animator SHALL skip particle effects and the letter pulse, and SHALL instead cross-fade directly from the near-black overlay to the Hero section using a 0.3 second opacity transition.

---

### Requirement 2: Homepage Structure — Five Moments

**User Story:** As a visitor, I want the homepage to feel like a deliberate journey through five distinct moments, so that each section has its own weight and purpose.

#### Acceptance Criteria

1. THE Homepage DOM SHALL contain exactly five persistent sections rendered in this order: Hero, Building, WorldForge, About, Contact.
2. THE Arrival Animation SHALL be implemented as a full-viewport positioned overlay, not as a sixth DOM section inserted into the page flow.
3. WHEN the Arrival Animation overlay is dismissed, THE Hero section SHALL be the first visible section within 100ms of the overlay completing its exit transition.
4. EACH of the five homepage sections SHALL carry a unique HTML `id` attribute matching its name in lowercase: `hero`, `building`, `worldforge`, `about`, `contact`.
5. THE five sections SHALL appear in the DOM order stated in criterion 1, with no intervening full-width separator sections or interstitial components between them.

---

### Requirement 3: Hero Section

**User Story:** As a visitor who has just experienced the Arrival Animation, I want to see a Hero section that communicates confidence through restraint, so that the brand feels assured rather than promotional.

#### Acceptance Criteria

1. THE Hero section SHALL display the primary heading "StormD3v" at a font size of no less than 72px (4.5rem) on viewports wider than 1024px, and no less than 48px (3rem) on narrower viewports.
2. THE Hero section SHALL contain no more than two lines of supporting copy, each line no longer than 80 characters.
3. THE Hero section SHALL NOT use a card, panel, or box-shadow container as a layout wrapper around its content.
4. THE Hero section SHALL apply a minimum of 64px vertical padding above and below its primary content on all viewport sizes.
5. WHERE buttons are present in the Hero section, EACH button SHALL use the `secondary` or `ghost` variant as defined in `components/ui/button.tsx`, and SHALL NOT use the `primary` variant.
6. THE Hero section SHALL NOT render an achievements list, metrics counter, year-of-experience display, or credential enumeration in any form.

---

### Requirement 4: Building Section (Discovery)

**User Story:** As a visitor exploring the site, I want to understand what StormD3v is working on without being presented with a startup-style product grid, so that the work feels real and considered rather than marketed.

#### Acceptance Criteria

1. THE Building Section SHALL use the heading text "What I'm Building" in the visible section heading, in the navigation anchor label, and in the HTML `id` attribute `building`.
2. THE Building Section SHALL read its project list from the Content Configuration (`content/projects.ts`) as the single source of truth. No project name, description, or status SHALL be hardcoded in the component.
3. THE Building Section SHALL designate the project whose `featured: true` and `status: 'in-progress'` fields mark it as the current flagship as the visually dominant item. On viewports wider than 1024px, that item SHALL occupy at least twice the horizontal layout area of any other single item.
4. WHEN the flagship designation changes in the Content Configuration, THE Building Section SHALL automatically reflect the new dominant item without requiring any component code change.
5. THE Building Section SHALL render non-flagship items at a reduced typographic scale and reduced opacity compared to the flagship item, making their visual weight clearly subordinate without removing them from the layout.
6. THE Building Section SHALL render a future-ideas placeholder item using reduced opacity (at most 0.5), a dashed border style, and no project name, to convey quiet presence without announcing specific unannounced work.
7. THE Building Section SHALL NOT render all project items at equal size, equal border weight, or equal typographic scale.
8. THE Building Section SHALL NOT use solid borders as the primary structural separator between items; whitespace and size contrast SHALL be the dominant compositional tools.
9. WHEN a visitor clicks a project item that has a defined route, THE Building Section SHALL navigate to that route.
10. WHEN a visitor focuses a navigable project item via keyboard and activates it with Enter or Space, THE Building Section SHALL navigate to that route.
11. A project item with no defined route SHALL NOT be a navigable link and SHALL NOT include an `href` attribute or `onClick` navigation handler.

---

### Requirement 5: WorldForge Section (Emotional Centre)

**User Story:** As a visitor, I want the WorldForge section on the homepage to feel like an encounter with something serious and alive, so that curiosity grows from understanding rather than deliberate obscurity.

#### Acceptance Criteria

1. THE WorldForge Section SHALL NOT render feature grids, roadmap cards, or bullet-point lists of capabilities.
2. THE WorldForge Section SHALL NOT contain any of the following words or phrases: "platform", "solution", "ecosystem", "AI-powered", "next-generation", "state-of-the-art", "innovative", "cutting-edge", "empowering", "revolutionary".
3. EACH paragraph of the WorldForge Section's primary body copy SHALL contain at least one word or phrase from the following thematic set: identity, history, legacy, belonging, permanence, memory, consequence, living worlds.
4. THE WorldForge Section's body copy SHALL describe WorldForge in terms of place, people, and consequence, and SHALL NOT enumerate features, capabilities, or product attributes.
5. THE WorldForge Section's copy SHALL answer enough for visitors to understand the vision of WorldForge, while leaving them genuinely curious to learn more. It SHALL NOT deliberately withhold information as a stylistic device.
6. THE WorldForge Section SHALL end its primary copy block with an open or evocative statement that communicates something real about the world, not a declarative product summary.
7. THE WorldForge Section SHALL include a call to action that is keyboard-focusable and, when activated, navigates to `/worldforge`.
8. THE WorldForge Section SHALL include the waitlist form containing at minimum an email input field and a submission control.
9. WHEN a visitor submits the waitlist form, THE WorldForge Section SHALL display inline feedback indicating success or failure without a full page reload.

---

### Requirement 6: About Section

**User Story:** As a visitor, I want the About section to answer "Why does StormD3v exist?" and introduce the person behind it, so that trust is built through authenticity rather than credentials.

#### Acceptance Criteria

1. THE About Section SHALL identify the studio's creator as "Friday Gift Chinecherem Azunda" and introduce him as the Founder and Builder of WorldForge (Project: Isekai) and LumiCast (Project: Real Weather).
2. THE About Section's primary copy SHALL answer the question "Why does StormD3v exist?" as its first and dominant purpose, before any biographical detail.
3. THE About Section SHALL include a link to GitHub (https://github.com/StormD3v) and a link to X (https://x.com/Storm_D3V).
4. THE About Section SHALL display the Discord username "storm_d3v" as plain text contact information, naturally integrated into the copy or contact row. It SHALL NOT include an outbound link, a fabricated URL, or an inferred profile link of any kind.
5. THE About Section SHALL include the email heisst0rmd3v@gmail.com as a `mailto:` anchor.
6. THE About Section SHALL NOT render a profile photograph, avatar image, or image placeholder. The layout SHALL be designed to accommodate a future photograph without requiring structural changes when one becomes available.
7. THE About Section SHALL NOT include an achievements list, awards list, years-of-experience figure, timeline, or résumé-style content of any kind.
8. THE About Section SHALL NOT contain the em dash character (—) in any rendered copy.
9. THE About Section's copy SHALL convey voice and authenticity without using social proof, testimonials, or engagement metrics.

---

### Requirement 7: Contact Section

**User Story:** As a visitor who wants to reach out, I want to encounter a minimal contact section that feels intentional rather than generic, so that the act of reaching out feels considered.

#### Acceptance Criteria

1. THE Contact Section SHALL contain exactly one heading, at most two paragraphs of framing copy (each no longer than 160 characters), a contact form with name, email, and message fields, and a set of social links.
2. THE Contact Section SHALL NOT use Card components, feature panels, or decorative `border` styles as primary compositional elements between its main parts.
3. THE Contact Section SHALL display a `mailto:heisst0rmd3v@gmail.com` anchor as the direct email contact option.
4. THE Contact Section SHALL display social links for GitHub, X, and Discord in that order, each opening in a new tab for GitHub and X.
5. THE Contact Section SHALL NOT display a LinkedIn link.
6. THE Contact Section SHALL use margin, padding, and vertical rhythm as the primary compositional tool, without fills, dividers, or border lines separating the heading, form, and social link groups.
7. WHEN a visitor submits the contact form successfully, THE Contact Section SHALL display inline confirmation feedback and reset all form fields.
8. WHEN a contact form submission fails, THE Contact Section SHALL display an inline error message and SHALL NOT reset the form fields, preserving the visitor's input.

---

### Requirement 8: Copy Rules

**User Story:** As the site owner, I want all written content to sound natural, confident, and distinctive, so that the voice of StormD3v is immediately recognisable and cannot be confused with generic software marketing.

#### Acceptance Criteria

1. THE Copy Rules SHALL prohibit use of the following words and phrases across all pages: "innovative", "cutting-edge", "empowering", "revolutionary", "ecosystem", "platform", "solution", "AI-powered", "next-generation", "state-of-the-art".
2. THE Copy Rules SHALL prohibit the em dash character (—) in any rendered copy across all pages.
3. THE Copy Rules SHALL require that every sentence serves at least one of these five purposes: reveal character, build curiosity, build trust, communicate purpose, or reinforce identity. A sentence that serves none of these purposes SHALL be removed.
4. THE Copy Rules SHALL prohibit artificially splitting a single idea across multiple one-sentence paragraphs. Related thoughts SHALL be written as connected prose.
5. THE Copy Rules SHALL require that copy sounds natural, thoughtful, and confident. The tone is restrained and precise, not theatrical or hyperbolic.
6. THE Copy Rules SHALL require that copy be welcoming without over-explaining.
7. WHEN new copy is authored for any section, THE Copy Rules SHALL apply to all surface areas including navigation labels, footer taglines, button text, and metadata descriptions.

---

### Requirement 9: Social Links and Contact Information

**User Story:** As a visitor or collaborator, I want accurate and consistent social links across the site, so that I can find and reach Friday Gift through the right channels.

#### Acceptance Criteria

1. THE Social Links data SHALL set the GitHub entry URL to `https://github.com/StormD3v`.
2. THE Social Links data SHALL set the X entry URL to `https://x.com/Storm_D3V`.
3. THE Social Links data SHALL represent Discord with platform name "storm_d3v", a `null` or absent URL field (not a placeholder string), and icon identifier "discord", so that no outbound href is associated with the entry.
4. THE Social Links data SHALL set the contact email to `heisst0rmd3v@gmail.com`.
5. THE Social Links data SHALL mark LinkedIn with `showOnHomepage: false`, and LinkedIn SHALL be excluded from both the homepage Contact Section and the Footer social link row.
6. THE Footer SHALL render GitHub, X, and Discord icons as social links, and SHALL render `heisst0rmd3v@gmail.com` as a `mailto:` anchor.
7. IF the Discord entry has a null or absent URL field, THEN the Footer and Contact sections SHALL render the Discord icon as a non-interactive element with no `href` attribute, with an `aria-label` that includes the text "storm_d3v" and the word "username".
8. WHEN the Contact Section renders social icons, THE Contact Section SHALL exclude any social link entry whose `showOnHomepage` value is `false`.

---

### Requirement 10: Navigation

**User Story:** As a visitor navigating the site, I want the navigation to reflect the actual structure and naming of the site, so that wayfinding is clear and consistent with the identity.

#### Acceptance Criteria

1. THE Navigation SHALL display the logo text as "StormD3v".
2. THE Navigation links SHALL use these names in this order: "What I'm Building", "WorldForge", "About", "Contact".
3. THE Navigation SHALL NOT include "StormOS" as a navigation link unless it has its own dedicated page.
4. WHEN a visitor is on the homepage, THE Navigation SHALL correctly highlight the active section as the visitor scrolls.
5. WHEN a visitor opens the mobile menu, THE Navigation SHALL display the same link names as the desktop version.

---

### Requirement 11: Footer

**User Story:** As a visitor who reaches the bottom of any page, I want the footer to reinforce the StormD3v brand naturally, so that the brand identity is consistent end-to-end.

#### Acceptance Criteria

1. THE Footer SHALL display the brand name as "StormD3v".
2. THE Footer SHALL NOT display "StormOS" as the brand name.
3. THE Footer SHALL include a short, natural tagline that does not use any Copy Rules prohibited words.
4. THE Footer SHALL display navigation links matching the Navigation links: "What I'm Building", "WorldForge", "About", "Contact".
5. THE Footer SHALL display social icons for GitHub, X, Discord, and a `mailto:` email link for `heisst0rmd3v@gmail.com`.
6. THE Footer SHALL display the copyright line as "© [current year] StormD3v. All rights reserved."

---

### Requirement 12: SEO and Metadata

**User Story:** As the site owner, I want metadata, Open Graph tags, and the sitemap to accurately represent the StormD3v brand and each page's content, so that search engines and link previews communicate the right identity.

#### Acceptance Criteria

1. THE SEO Metadata SHALL set the default site title to "StormD3v".
2. THE SEO Metadata SHALL use the title template `%s | StormD3v` for all sub-pages, and each sub-page SHALL export its own unique title string to populate the `%s` token.
3. THE SEO Metadata SHALL set the site description to a string of no more than 160 characters that reflects the StormD3v identity and contains none of the Copy Rules prohibited words.
4. THE SEO Metadata SHALL set Open Graph `og:title` and Twitter `twitter:title` to match the page's resolved title, and `og:description` and `twitter:description` to match the page's resolved description.
5. THE SEO Metadata SHALL update the `authors` field to `Friday Gift Chinecherem Azunda`.
6. THE SEO Metadata SHALL set keywords to exactly: "StormD3v", "WorldForge", "Friday Gift Azunda", "software engineer", "developer", "indie projects", "React", "Django", "FastAPI".
7. THE Sitemap SHALL include entries for these routes only: `/` (homepage), `/worldforge`, `/about`, `/contact`.
8. IF the Sitemap currently includes a route that is no longer in the active navigation (such as `/projects`), THAT route entry SHALL be removed from the sitemap.

---

### Requirement 13: Tech Stack Display

**User Story:** As a visitor reading about StormD3v, I want to see the owner's actual technology stack sourced from a central configuration, so that it stays accurate as the stack evolves.

#### Acceptance Criteria

1. THE Tech Stack Display SHALL read technology entries exclusively from the Content Configuration (`content/skills.ts`). No technology name SHALL be hardcoded in any UI component.
2. WHEN the Content Configuration is updated to add, remove, or rename a technology, THE Tech Stack Display SHALL automatically reflect that change without any component code modification.
3. THE Tech Stack Display SHALL present the technologies that are currently defined in the Content Configuration as the owner's real stack: React, Django, FastAPI, PyTorch, HuggingFace, PostgreSQL.
4. THE Tech Stack Display SHALL NOT present Next.js, Tailwind CSS, or Framer Motion as the owner's primary technology identity.
5. WHERE a skills or technology section exists, THE Tech Stack Display SHALL render only what is in the Content Configuration, without adding or inferring unlisted technologies.

---

### Requirement 14: WorldForge Dedicated Page (/worldforge)

**User Story:** As a visitor who wants to learn more about WorldForge, I want the /worldforge page to continue the emotional direction of the homepage section without reverting to feature marketing, so that the experience remains cohesive.

#### Acceptance Criteria

1. THE WorldForge page SHALL contain these four sections in order: "What it is", "Where it is now", "The First Crossing", "Follow development".
2. THE WorldForge page SHALL NOT include feature marketing language, bullet-point capability lists, or startup-style roadmap cards.
3. THE WorldForge page's copy SHALL draw from the same thematic set as the homepage WorldForge Section: identity, history, legacy, permanence, consequence.
4. THE WorldForge page SHALL include the waitlist form for the First Crossing, containing at minimum an email input field and a submission control.
5. THE WorldForge page's "Follow development" section SHALL direct visitors to the contact page rather than a newsletter or external subscription service.
6. WHEN a visitor submits the waitlist form, THE WorldForge page SHALL display inline success or error feedback without a full page reload.

---

### Requirement 15: Design System — Visual Identity

**User Story:** As a developer implementing the redesign, I want clear visual identity constraints defined, so that all UI decisions consistently serve the cinematic, minimal, atmospheric direction.

#### Acceptance Criteria

1. THE Design System SHALL limit `accent-purple` usage to WorldForge-related elements and at most one accent moment per non-WorldForge page; any additional purple instance on a given page SHALL be considered a violation.
2. THE Design System SHALL NOT use blue (`storm-blue` or equivalent) as a brand, action, or highlight colour in any newly created or modified UI component.
3. THE Design System SHALL use a font weight of 700 or greater for all primary statement headings, with a minimum vertical section padding of 64px (4rem) on all full-width sections.
4. WHEN a layout section requires visual separation, THE Design System SHALL achieve it using vertical whitespace alone, and SHALL NOT introduce solid border lines, fill panels, or Card components as separators.
5. THE Design System SHALL set all entrance animation durations to at least 400ms and SHALL use an ease-out or ease-in-out easing curve; durations below 400ms SHALL be considered a violation for entrance animations.
6. WHEN a new UI component is introduced, THE component SHALL pass all of these checks: it uses no card or border-box structure as its primary container; its colour palette is limited to neutral and `accent-purple`; it contains no SaaS-style layout conventions such as pricing rows, feature checklists, or metric counters.

---

### Requirement 16: Emotional Journey

**User Story:** As a visitor moving through the homepage, I want the experience to guide me through a deliberate emotional progression, so that by the time I reach the contact section I feel genuinely connected rather than simply informed.

#### Acceptance Criteria

1. THE Homepage SHALL be designed to guide visitors through the following emotional progression in order: Curiosity (Arrival and Hero), Interest (Building Section), Wonder (WorldForge Section), Trust (About Section), Connection (Contact Section).
2. THE Hero section SHALL create Curiosity through restraint: large typography, minimal copy, and deliberate whitespace that makes the visitor want to know more.
3. THE Building Section SHALL create Interest by revealing the work without explaining everything, presenting projects at unequal weight so the dominant one draws the eye.
4. THE WorldForge Section SHALL create Wonder by describing a place and its consequences in language that is vivid but not exhaustive, leaving the visitor with a genuine desire to understand more.
5. THE About Section SHALL create Trust by introducing Friday Gift as a real person with a clear reason for building, without credentials, achievements, or promotional framing.
6. THE Contact Section SHALL create Connection through simplicity: one heading, one paragraph, a form, and ways to reach out directly. No friction, no unnecessary structure.
7. THE typography scale SHALL decrease gradually from the Hero (largest) to the Contact section (smallest body text), reinforcing the transition from announcement to conversation.
8. THE background lighting (ambient glows, particle density) SHALL be most intense in the Arrival and WorldForge moments and quietest in the About and Contact moments.
9. WHEN a visitor with `prefers-reduced-motion: reduce` enabled loads the page, THE emotional progression SHALL be communicated through typography and spacing alone, without relying on motion to carry meaning.

---

### Requirement 17: StormD3v Design Principle

**User Story:** As a developer or designer working on the site, I want a single governing principle to evaluate every design decision, so that the site remains memorable and purposeful rather than accumulating decoration.

#### Acceptance Criteria

1. EVERY design decision SHALL be evaluated against this question: "Does this make StormD3v more memorable?" If the answer is no, the element SHALL be removed or not added.
2. WHERE a choice exists between whitespace and decoration, THE Design System SHALL choose whitespace.
3. WHERE a choice exists between typography and a graphic element, THE Design System SHALL choose typography unless the graphic element provides information that text cannot.
4. EVERY motion effect SHALL communicate a clear intention (entrance, transition, emphasis, or atmosphere). Motion that exists solely because animation is possible SHALL be removed.
5. THE Design System SHALL treat the `neutral-*` colour scale and `accent-purple` as the complete colour vocabulary for new components. No additional colours SHALL be introduced without explicit justification.
6. WHEN reviewing a completed page or section, a developer SHALL be able to identify a specific purpose for every visual element present. Any element whose purpose cannot be articulated SHALL be removed.
