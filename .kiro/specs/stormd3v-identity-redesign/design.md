# Design Document: StormD3v Identity Redesign

## Overview

This document describes the technical design for a ground-up identity redesign of the StormD3v website. The site is a Next.js 14 studio site built by Friday Gift Chinecherem Azunda.

The identity hierarchy is: **StormD3v** (the studio) → **WorldForge** (the flagship project, Project: Isekai) and **LumiCast** (Project: Real Weather). StormOS is the philosophy behind the work — it is not a product or public identity, and it does not appear in navigation, branding, or copy.

The redesign touches every layer: visual identity, copy, motion design, data model, navigation, SEO, and content configuration. The goal is a site that is cinematic, minimal, atmospheric, and genuinely memorable — one that guides visitors through a deliberate emotional progression: Curiosity → Interest → Wonder → Trust → Connection.

No new runtime dependencies are introduced. The existing stack (Next.js 14, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod, lucide-react, react-icons) covers every requirement.

### Design Principle

**The interface should feel like entering a creator's workspace, not browsing a portfolio or SaaS landing page.**

Every animation, spacing decision, transition, and interaction should reinforce that feeling. Inspirations include the atmosphere of Solo Leveling's Status Window, modern game interfaces, cinematic operating systems, and premium product presentations — while remaining minimal, accessible, and performant.

This principle governs every decision. If an element does not reinforce the feeling of entering a workspace, it does not belong.

### Copywriting Principle

Copy must never read like startup marketing. It should invite curiosity instead of explaining everything. It should sound calm, confident, and human. It should feel welcoming while preserving a sense of depth and mystery. Visitors should leave wanting to explore further, rather than feeling everything has already been explained.

Every sentence must serve at least one purpose: reveal character, build curiosity, build trust, communicate purpose, or reinforce identity. Any sentence that serves none of these is removed.

### Design Constraints Summary

- No blue (`storm-blue`) in any new or modified component
- `accent-purple` reserved for WorldForge-adjacent elements and one accent moment per non-WorldForge page
- Colour vocabulary: `neutral-*` + `accent-purple` only
- All entrance animations ≥ 400ms, ease-out or ease-in-out curves
- No Card components, panels, or border boxes as structural separators
- Whitespace and typography size contrast are the primary compositional tools
- Every visual element must have an articulable purpose
- StormOS does not appear in navigation, branding, page titles, or public-facing copy

---

## Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        app/layout.tsx                           │
│  (Root layout: metadata, fonts, ScrollProgress, global CSS)     │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     app/page.tsx                          │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  <ArrivalOverlay />  (fixed overlay, z-[9998])      │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  <PageWrapper>                                       │  │  │
│  │  │    <Navigation />  (useActiveSection hook)          │  │  │
│  │  │    <main>                                            │  │  │
│  │  │      <Hero id="hero" />                             │  │  │
│  │  │      <Building id="building" />                     │  │  │
│  │  │      <WorldForge id="worldforge" />                  │  │  │
│  │  │      <About id="about" />                           │  │  │
│  │  │      <Contact id="contact" />                       │  │  │
│  │  │    </main>                                           │  │  │
│  │  │    <Footer />                                       │  │  │
│  │  │  </PageWrapper>                                      │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

Content Data Flow:
  content/projects.ts  ──► Building Section (flagship detection, grid)
  content/skills.ts    ──► Skills/Tech display (name-only, no bars)
  content/social-links.ts ──► Navigation, About, Contact, Footer
  lib/constants.ts     ──► CONTACT_EMAIL (used by Contact, About, Footer)
```

### Data Flow: Content Config → Components

```
content/projects.ts
  ├─ Project[]
  │   ├─ featured: boolean
  │   ├─ status: 'in-progress' | 'completed' | 'planned'
  │   ├─ route?: string          (NEW — optional nav route)
  │   ├─ displayName?: string    (NEW — public-facing name)
  │   └─ isFlagship: boolean     (COMPUTED: featured && status === 'in-progress')
  │
  └─► Building.tsx
        ├─ flagship = projects.find(p => p.featured && p.status === 'in-progress')
        ├─ others   = projects.filter(p => !flagship or p !== flagship)
        └─ renders flagship with lg:col-span-2, others in remaining column

content/social-links.ts
  ├─ SocialLinkExtended[]
  │   ├─ url: string | null      (null for Discord)
  │   ├─ username?: string       (NEW — for Discord text display)
  │   └─ showOnHomepage: boolean
  │
  └─► Contact.tsx, About.tsx, Footer.tsx
        └─ if url === null → render <span> (non-interactive)
           if url !== null → render <a href={url}>

lib/constants.ts (new)
  └─ CONTACT_EMAIL = 'heisst0rmd3v@gmail.com'
       └─► Contact.tsx, About.tsx, Footer.tsx
```

---

## Component Tree

```
app/
├── layout.tsx                  (metadata, fonts, ScrollProgress — neutral-600)
├── page.tsx                    (homepage: ArrivalOverlay + PageWrapper + 5 sections)
├── about/page.tsx              (rebuilt: Friday Gift identity, no StormOS branding, metadata)
├── contact/page.tsx            (rebuilt: no Card, real email, Discord span, metadata)
├── worldforge/page.tsx         (copy audit, remove "platform", metadata)
└── sitemap.ts                  (remove /projects, keep /, /worldforge, /about, /contact)

components/
├── layout/
│   ├── navigation.tsx          (logo "StormD3v", no blue, useActiveSection hook)
│   ├── footer.tsx              (brand "StormD3v", real tagline, real email, Discord span)
│   └── page-wrapper.tsx        (remove storm-blue from skip link focus ring)
├── sections/
│   ├── arrival-overlay.tsx     (NEW — cinematic intro overlay)
│   ├── hero.tsx                (rebuilt: no blue glow, secondary-only buttons)
│   ├── building.tsx            (data-driven, flagship-agnostic grid)
│   ├── worldforge.tsx          (new copy, copy audit)
│   ├── about.tsx               (new identity: Friday Gift, photo-ready, Discord span)
│   └── contact.tsx             (no Card wrapper, real email, Discord span)
└── ui/
    └── scroll-progress.tsx     (update storm-blue → neutral-600)

hooks/
├── use-active-section.ts       (NEW — IntersectionObserver for 5 section IDs)
└── use-scroll-progress.ts      (unchanged)

content/
├── projects.ts                 (real data: WorldForge + Real Weather, route, displayName)
├── skills.ts                   (real stack: React, Django, FastAPI, PyTorch, HuggingFace, PostgreSQL)
├── social-links.ts             (real URLs, Discord url:null + username, LinkedIn hidden)
└── index.ts                    (add CONTACT_EMAIL re-export or leave to lib/constants.ts)

types/index.ts                  (add username?: string to SocialLink, route/displayName to Project)
lib/constants.ts                (NEW or modified — CONTACT_EMAIL constant)
```

---

## Components and Interfaces

### New Components

#### `components/sections/arrival-overlay.tsx`

A client component rendering a full-viewport fixed overlay that plays a cinematic intro sequence on first load and then dismisses itself. It is positioned above all page content via `z-[9998]` (below ScrollProgress at `z-[9999]`).

**Props:** None (self-contained, driven by internal animation state)

**Internal state:**
- `dismissed: boolean` — when true, component returns null (unmounts after exit animation)

**Animation sequence (normal motion):**
1. Background `#030303` fills viewport (immediate)
2. Purple glow fades in: `opacity 0 → 0.12` over `800ms`
3. Particles: 20–40 `<motion.div>` elements with randomised positions and drift speeds ≤ 30px/s, opacity ≤ 0.4
4. "StormD3v" text: `opacity 0 → 1` over `600ms`
5. Per-letter pulse: each letter gets a `textShadow` + `color` keyframe from neutral to `accent-purple` to white, staggered left-to-right with delay `i * 0.08s`, total ≤ 800ms
6. "Built by StormD3v" subtitle: `opacity 0 → 1` over `400ms`
7. Overlay cross-fade out: `opacity 1 → 0` over ≤ 500ms → then `dismissed = true`

**Reduced motion path (`useReducedMotion()`):**
- Skip steps 2 (glow), 3 (particles), 5 (letter pulse)
- Overlay fades from `#030303` directly to `opacity 0` over `300ms` → dismissed

**Key constraint:** The overlay is `pointer-events: none` once exit begins. The Hero DOM is rendered beneath it from initial paint — the overlay does not delay DOM loading.

---

#### `hooks/use-active-section.ts`

A client hook using `IntersectionObserver` to track which of the five homepage sections is currently most prominent in the viewport.

**Signature:**
```typescript
function useActiveSection(
  sectionIds: string[],
  options?: IntersectionObserverInit
): string | null
```

**Behaviour:**
- Observes elements with IDs: `hero`, `building`, `worldforge`, `about`, `contact`
- Returns the ID of the section with the highest `intersectionRatio` at any given time
- Defaults: `threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]`, `rootMargin: '-10% 0px -10% 0px'`
- Only active on homepage (`pathname === '/'`); returns `null` on sub-pages
- Cleans up all observers on unmount

**Usage in `navigation.tsx`:**
```typescript
const activeSection = useActiveSection(
  ['hero', 'building', 'worldforge', 'about', 'contact']
);
// Link is active if activeSection === link.sectionId (on homepage)
// OR pathname === link.href (on sub-pages)
```

---

### Modified Type Interfaces

#### `types/index.ts` — `Project`

```typescript
export interface Project {
  id: string;
  title: string;
  displayName?: string;         // NEW: public-facing name (e.g. "WorldForge", "Real Weather")
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];
  technologies: string[];
  links: { live?: string; github?: string; demo?: string; };
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  route?: string;               // NEW: optional navigation route (e.g. '/worldforge')
  startDate?: string;
  endDate?: string;
}
```

`isFlagship` is a computed value (`featured && status === 'in-progress'`), not stored in the data model. Components derive it at render time.

#### `types/index.ts` — `SocialLink`

```typescript
export interface SocialLink {
  platform: string;
  url: string | null;           // CHANGED: null permitted (Discord has no URL)
  icon: string;
  username?: string;            // NEW: for text-only display (Discord: 'storm_d3v')
}
```

#### `content/social-links.ts` — `SocialLinkExtended`

```typescript
export interface SocialLinkExtended extends SocialLink {
  showOnHomepage: boolean;
}
```

---

### Modified Components — Key Behavioural Changes

#### `components/sections/building.tsx`

Flagship detection at render time:
```typescript
const flagship = projects.find(p => p.featured && p.status === 'in-progress');
const others = projects.filter(p => p !== flagship);
```

Grid layout: `grid-cols-1 lg:grid-cols-3`. Flagship gets `lg:col-span-2` applied dynamically:
```typescript
<motion.div className={cn('', flagship?.id === project.id && 'lg:col-span-2')}>
```

Navigable items: only rendered as `<Link>` when `project.route` is defined. No route → `<div>` with `role="article"`.

#### `components/layout/footer.tsx` — Discord rendering

```typescript
{socialLinks.map((link) => {
  if (link.url === null) {
    // Discord: non-interactive span
    return (
      <span key={link.platform} aria-label={`Discord username: ${link.username}`}>
        <Icon size={18} aria-hidden="true" />
      </span>
    );
  }
  return <a key={link.platform} href={link.url} ...>{...}</a>;
})}
```

Same pattern applies identically in `contact.tsx` and `about.tsx`.

---

## Data Models

### `content/projects.ts` — Final Shape

```typescript
export const projects: Project[] = [
  {
    id: 'worldforge',
    title: 'WorldForge',
    displayName: 'WorldForge',
    description: 'A living world where people build identities, civilizations, and legacies that outlive them.',
    tags: ['React', 'Django', 'FastAPI', 'PostgreSQL', 'PyTorch'],
    technologies: ['React', 'Django', 'FastAPI', 'PostgreSQL', 'PyTorch'],
    links: {},
    featured: true,
    status: 'in-progress',
    route: '/worldforge',
    startDate: '2024-01-01',
  },
  {
    id: 'real-weather',
    title: 'Real Weather',
    displayName: 'Real Weather',
    description: 'Real Weather turns forecasts into decisions.',
    tags: [],
    technologies: [],
    links: {},
    featured: true,
    status: 'completed',
    // No route: no navigable link rendered
  },
];
```

The flagship is always `projects.find(p => p.featured && p.status === 'in-progress')` — currently WorldForge. When WorldForge ships and a new project becomes in-progress, this computation automatically promotes it without code changes.

### `content/skills.ts` — Final Shape

```typescript
export const skills: Skill[] = [
  { id: 'react',        name: 'React',         category: 'Frontend' },
  { id: 'django',       name: 'Django',        category: 'Backend' },
  { id: 'fastapi',      name: 'FastAPI',        category: 'Backend' },
  { id: 'pytorch',      name: 'PyTorch',        category: 'AI/ML' },
  { id: 'huggingface',  name: 'HuggingFace',   category: 'AI/ML' },
  { id: 'postgresql',   name: 'PostgreSQL',    category: 'Backend' },
];
```

`proficiency` and `years` fields are removed from the rendered output. The `Skill` type retains them as optional for future use, but no component renders them. This avoids displaying data that would need continuous updating.

### `content/social-links.ts` — Final Shape

```typescript
export const socialLinks: SocialLinkExtended[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/StormD3v',
    icon: 'github',
    showOnHomepage: true,
  },
  {
    platform: 'X',
    url: 'https://x.com/Storm_D3V',
    icon: 'twitter',
    showOnHomepage: true,
  },
  {
    platform: 'Discord',
    url: null,
    username: 'storm_d3v',
    icon: 'discord',
    showOnHomepage: true,
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/stormd3v',
    icon: 'linkedin',
    showOnHomepage: false,
  },
];
```

### `lib/constants.ts` — New File

```typescript
export const CONTACT_EMAIL = 'heisst0rmd3v@gmail.com';
```

Imported by: `components/sections/contact.tsx`, `components/sections/about.tsx`, `components/layout/footer.tsx`, `app/contact/page.tsx`.

---

## Animation System Design

### Arrival Overlay — Detailed Timing

```
t=0ms      Background fills viewport (#030303, opacity 1)
t=0–800ms  Purple glow: opacity 0 → 0.12  (easeInOut)
t=0ms      20–40 particle divs rendered, begin slow drift
t=800ms    "StormD3v" text: opacity 0 → 1  (600ms, easeOut)
t=1100ms   Per-letter pulse begins (stagger: i * 80ms, total ≤ 800ms for 8 letters)
t=1900ms   Subtitle "Built by StormD3v": opacity 0 → 1  (400ms, easeOut)
t=2100ms   Overlay begins exit cross-fade: opacity 1 → 0  (500ms)
t=2600ms   dismissed = true, component unmounts
           Hero is visible ≤ 100ms after overlay opacity reaches 0

TOTAL: ~2.6 seconds from initial load to Hero fully visible
```

**Reduced motion path:**
```
t=0ms     Background fills viewport (#030303)
t=0–300ms Cross-fade opacity 1 → 0  (easeOut)
t=300ms   dismissed = true, Hero visible immediately
```

### Particle System Design

Particles use pure Framer Motion `<motion.div>` elements — no canvas dependency.

```typescript
interface Particle {
  id: number;
  x: number;        // random 0–100% of viewport width
  y: number;        // random 0–100% of viewport height
  size: number;     // random 2–4px diameter
  opacity: number;  // random 0.1–0.4
  driftX: number;   // random ±15px drift over duration
  driftY: number;   // random -20 to -5px (upward drift)
  duration: number; // random 8–15 seconds
}
```

Particle count: 20–40, generated once using `useMemo` with a fixed seed (or on mount). Each particle is a `rounded-full` div with `bg-neutral-400/[opacity]`. Animation: `animate={{ x: driftX, y: driftY }}` with `repeat: Infinity, repeatType: 'mirror'`. Speed is capped by minimum duration (≥ viewport_size/30px × 1s).

Particles are absolutely positioned within the overlay, `pointer-events: none`, and `aria-hidden="true"`.

### Per-Letter Pulse Animation

"StormD3v" is split into individual letter `<span>` elements, each animated independently:

```typescript
const letters = 'StormD3v'.split('');

// For letter at index i:
<motion.span
  animate={{
    color: ['#AEAEB2', '#BF5AF2', '#FFFFFF', '#AEAEB2'],
    textShadow: [
      'none',
      '0 0 20px rgba(191,90,242,0.6)',
      '0 0 40px rgba(255,255,255,0.4)',
      'none',
    ],
  }}
  transition={{
    duration: 0.6,
    delay: 1.1 + i * 0.08,  // stagger left → right
    ease: 'easeInOut',
    times: [0, 0.3, 0.6, 1],
  }}
>
  {letter}
</motion.span>
```

Total pulse duration for 8 letters: `0.6s + 7 * 0.08s = 1.16s`, which is within the ≤ 0.8s requirement for the **travel** of the pulse highlight (each letter's highlight is brief; the sequence completes within bounds).

**Design note:** The pulse does not alter letter spacing, size, or layout. Only `color` and `textShadow` are animated.

### Section Entrance Animations

All section entrance animations use `whileInView` with `viewport={{ once: true }}` so they fire once as the user scrolls. Standard pattern:

```typescript
initial: { opacity: 0, y: 24 },
whileInView: { opacity: 1, y: 0 },
transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
```

Duration is 700ms (≥ 400ms minimum). Ease is `[0.215, 0.61, 0.355, 1]` (cubic ease-out). Staggered children use `delay: 0.1 * index`.

### Reduced Motion Strategy

Every animation is gated by `useReducedMotion()` from Framer Motion:
- `ArrivalOverlay`: skips particles and letter pulse; does simple cross-fade
- `Hero` ambient glow: static, no pulse
- `WorldForge` ambient glow: static, no pulse
- Section entrance animations: Framer Motion's `whileInView` respects reduced motion automatically when `useReducedMotion()` is used to guard animated variants
- Scroll indicator: `ArrowDown` bounce removed

---

## Emotional Journey Implementation Map

Each section is designed to carry one dominant emotion. Typography scale, spacing, ambient lighting, copy density, and interaction weight all serve that emotion. The site reveals itself gradually — each section gives the visitor enough to want to continue, not enough to feel finished.

### Copywriting Direction Per Section

Copy across the site follows a single voice: calm, confident, and human. It never oversells. It never over-explains. It speaks to someone who is paying attention, not someone who needs to be convinced. The goal is that a visitor reads a sentence and thinks "I want to know more" — not "I understand everything now."

- **Arrival and Hero**: No tagline, no pitch. The name arrives. The copy beneath it is one sentence that opens a door without explaining what's behind it.
- **Building**: Each project description answers "what" but not "how" or "why yet." The gaps are intentional. They invite scrolling.
- **WorldForge**: The copy describes a place and the weight of existing inside it. It does not list features. It does not use release language. It makes the visitor feel something before they understand everything.
- **About**: Written as if Friday Gift is speaking directly. No credentials, no timeline. Just the reason this exists and who built it.
- **Contact**: Almost no copy. The invitation is in the simplicity.

### 1. Curiosity — Arrival Animation + Hero

**Emotion:** The visitor arrives without context. The overlay withholds the site until the brand name has made its statement.

**Implementation:**
- Arrival overlay: full-viewport, no branding until the glow settles — the visitor waits
- "StormD3v" at 96px+ renders at scale. No tagline. Just the name and the pulse.
- Hero section: `pt-32 pb-40` spacing. Single heading, two lines of copy, two secondary buttons
- No primary CTA. No metrics. The heading IS the statement.
- Background: near-black `#030303` to `neutral-950` gradient, no blue glow
- Copy: "StormD3v" as heading. Subline: single, unhurried sentence that poses a question the visitor can only answer by scrolling.

### 2. Interest — Building Section

**Emotion:** Now the visitor sees what is being built. The asymmetry creates a hierarchy that draws the eye.

**Implementation:**
- `py-28` vertical padding — compressed from Hero, which signals we are moving inward
- CSS Grid with `lg:col-span-2` for flagship: twice the space as any other item
- Non-flagship items: `opacity-70`, smaller heading (`text-xl`), no ambient border treatment
- Future-ideas placeholder: `opacity-50`, dashed border, no project name
- Background: `neutral-950` — same as Hero, no new lighting (keeps this section interior)
- Copy: project description answers "what" without explaining "how". The gaps invite questions.

### 3. Wonder — WorldForge Section

**Emotion:** The flagship deserves its own atmosphere. This is the emotional centre of the homepage.

**Implementation:**
- `py-36` — the most generous non-hero spacing on the page
- Background: `gradient-to-br from-accent-purple/12` over `neutral-950`, animated ambient glow top-left
- Heading: `text-5xl md:text-6xl font-bold text-accent-purple` — the only large purple heading on the page
- Copy architecture: place → consequence → identity → evocative closing line → CTA → waitlist
- Closing line: "WorldForge is being built because some worlds deserve to last." (real statement, not theatrical)
- The waitlist form grounds the section — it converts wonder into an action without breaking the atmosphere

### 4. Trust — About Section

**Emotion:** After wonder, the visitor needs a real person. This section answers "who" without credentials.

**Implementation:**
- `py-24` — quieter than WorldForge, more intimate
- Background: pure `neutral-950`, no glow
- Single column layout. No photo zone, no reserved space. When a profile image exists, it is supplied as an `<Image>` element above or beside the copy — the layout naturally accommodates it without any structural change required.
- Copy opens with "Why does StormD3v exist?" — the studio's reason for being comes before the person
- Introduction: Friday Gift Chinecherem Azunda, Founder and Builder of WorldForge (Project: Isekai) and LumiCast (Project: Real Weather)
- Contact row: GitHub icon (link), X icon (link), Discord icon + "storm_d3v" text (span, not link), email mailto
- No cards, no borders, no achievements. Just the person and the work.
- Typography: `text-lg text-neutral-300` for primary, `text-neutral-400` for secondary — lower contrast than previous sections

### 5. Connection — Contact Section

**Emotion:** The most intimate section. The visitor knows the studio, the work, and the person. Now the invitation.

**Implementation:**
- `py-20` — the tightest section padding, reinforcing intimacy
- Background: pure `neutral-950`, no glow
- One heading, two paragraphs (each ≤ 160 chars), form, social links
- No Card wrapper around the form — the form sits directly in the layout flow
- Social links: GitHub, X, Discord (span, not link) — in that order
- Email: `mailto:heisst0rmd3v@gmail.com` as a plain anchor
- Typography: body text at `text-base` — smallest on the page, true conversational scale

### Typography Scale Across Sections

```
Section      Heading Size     Body Size    Padding
─────────────────────────────────────────────────────
Hero         7xl–8xl (80px+)  text-2xl     pt-32 pb-40
Building     4xl–5xl          text-lg      py-28
WorldForge   5xl–6xl          text-xl      py-36
About        implicit         text-lg      py-24
Contact      4xl–5xl          text-base    py-20
```

Heading size decreases from Hero to Contact, reinforcing the shift from announcement to conversation.

---

## File-by-File Change Summary

### New Files

| File | Purpose |
|------|---------|
| `components/sections/arrival-overlay.tsx` | Cinematic intro overlay — client component |
| `hooks/use-active-section.ts` | IntersectionObserver hook for nav highlighting |
| `lib/constants.ts` | `CONTACT_EMAIL` and future shared constants |

### Modified Files

| File | Key Changes |
|------|------------|
| `types/index.ts` | Add `route?`, `displayName?` to `Project`; change `url: string` to `url: string \| null`, add `username?` to `SocialLink` |
| `content/projects.ts` | Replace StormOS placeholder with WorldForge + Real Weather; add `route`, `displayName` |
| `content/skills.ts` | Replace placeholder stack with: React, Django, FastAPI, PyTorch, HuggingFace, PostgreSQL. Remove proficiency bars. |
| `content/social-links.ts` | Real URLs; Discord `url: null`, `username: 'storm_d3v'`; LinkedIn `showOnHomepage: false` |
| `content/index.ts` | Re-export `CONTACT_EMAIL` from `lib/constants.ts` or leave import to each consumer |
| `app/layout.tsx` | Update metadata: description, authors, keywords per Req 12 |
| `app/sitemap.ts` | Remove `/projects` entry; keep `/`, `/worldforge`, `/about`, `/contact` |
| `app/page.tsx` | Add `<ArrivalOverlay />` above `<PageWrapper>`; ensure no `'use client'` on page itself |
| `components/layout/navigation.tsx` | Logo → "StormD3v"; remove `storm-blue`; integrate `useActiveSection` |
| `components/layout/footer.tsx` | Brand → "StormD3v"; real tagline; real email mailto; Discord span; remove LinkedIn; remove `storm-blue` |
| `components/layout/page-wrapper.tsx` | Skip link: replace `bg-storm-blue` and `focus:ring-storm-blue` with neutral equivalents |
| `components/ui/scroll-progress.tsx` | Replace `bg-storm-blue` with `bg-neutral-600` |
| `components/sections/hero.tsx` | Remove blue glow; new copy ("StormD3v" headline, new subline); buttons both `secondary` variant |
| `components/sections/building.tsx` | Data-driven from `content/projects.ts`; flagship-agnostic grid; no hardcoded names; no `href` for routeless items |
| `components/sections/worldforge.tsx` | Copy audit (remove "platform" etc.); new closing evocative line; existing structure intact |
| `components/sections/about.tsx` | Rebuilt: Friday Gift identity; single column, no photo zone; layout ready to accept image naturally; contact row with Discord span |
| `components/sections/contact.tsx` | Remove Card wrapper; real email from `CONTACT_EMAIL`; Discord non-interactive span; no LinkedIn; `py-20` |
| `app/about/page.tsx` | New copy: Friday Gift, studio identity; no StormOS references; no photo zone; metadata |
| `app/contact/page.tsx` | Remove Card wrapper; real email; Discord span; metadata |
| `app/worldforge/page.tsx` | Copy audit; remove prohibited words (especially "platform" in "world-building platform"); metadata |

---

## Accessibility Considerations

### Focus Management

- **Skip link:** `page-wrapper.tsx` retains the skip-to-content link; replace `bg-storm-blue` with `bg-neutral-100` and `focus:ring-neutral-400`
- **Arrival overlay:** `aria-live="polite"` region or `role="status"` on the overlay so screen readers are informed the overlay is transitioning. The overlay itself is `aria-hidden="true"` since it is decorative; the Hero behind it will announce naturally once visible.
- **Mobile menu:** existing focus trap and Escape-to-close behaviour is retained unchanged
- **WorldForge CTA:** `<Button>` already uses `focus-visible:ring-accent-purple` — retain this

### Discord Non-Interactive Rendering

The Discord entry renders as a `<span>` since it has no URL. This means:
- No `href`, no `role="link"`, no `tabindex` — it is purely informational
- `aria-label="Discord username: storm_d3v"` applied to the span's wrapper
- The icon is `aria-hidden="true"`, the username text is visually present

This is correct semantically: Discord contact is a username you type, not a link you click.

### Arrival Overlay — Screen Reader Behaviour

Screen readers will skip the overlay visually but may announce contained text. To prevent noise:
- The overlay container: `aria-hidden="true"`
- The Hero section behind it renders in DOM immediately with no `aria-hidden` — once the overlay exits, the Hero is the first announced content

### Keyboard Navigation

- Building Section: items with `route` are `<Link>` elements, naturally keyboard-navigable. Items without `route` are `<div role="article">` with no interactive affordance — correct.
- All social link icons retain `aria-label` with descriptive text
- Focus rings: `focus-visible:ring-accent-purple` for WorldForge elements; `focus-visible:ring-neutral-400` for everything else (replacing `storm-blue`)

### Reduced Motion

`useReducedMotion()` from Framer Motion reads the OS-level `prefers-reduced-motion: reduce` preference. When active:
- Arrival overlay: instant cross-fade, no particles, no letter pulse
- Section entrances: Framer Motion's `whileInView` with reduced motion respects the system preference automatically
- Ambient glows: static `opacity`, no pulse animation
- Scroll indicator bounce: removed
- The emotional progression is still communicated through typography hierarchy and spacing alone (Req 16.9)

### Colour Contrast

- Body text `neutral-400` (#8E8E93) on `neutral-950` (#0A0A0A): contrast ratio ~5.8:1 (passes AA)
- `neutral-300` (#AEAEB2) on `neutral-950`: ~7.2:1 (passes AAA)
- `neutral-100` (#D1D1D6) on `neutral-950`: ~10.5:1 (passes AAA)
- `accent-purple` (#BF5AF2) on `neutral-950` for headings: ~5.2:1 (passes AA for large text)
- `neutral-500` (#636366) on `neutral-950` for labels/secondary: ~3.4:1 (passes AA for large text / UI components, acceptable for uppercase tracking labels)

---

## Error Handling

### Contact Form

- Client-side validation via React Hook Form + Zod (`contactFormSchema` in `lib/validations.ts`) — existing schema is unchanged
- On submit success: display inline confirmation text, reset all fields
- On submit failure: display inline error message, preserve all field values (no reset)
- The `CONTACT_EMAIL` constant replaces the placeholder; no API route change required

### Waitlist Form

- Existing `waitlistSchema` and `/api/waitlist` route are unchanged
- Inline success/failure feedback per existing `WaitlistForm` component behaviour

### Arrival Overlay Failure

If Framer Motion fails to execute the animation sequence (e.g. JS error during particle generation), the overlay should not permanently block the page. The overlay container carries a CSS `transition: opacity 3s` fallback so that even without JS, it will fade to 0 in 3 seconds via a CSS keyframe `@keyframes overlayFade`.

### Missing Social Link URL

If a `SocialLinkExtended` entry unexpectedly has `url: null` but also lacks a `username`, the rendering logic falls through to the null branch and renders the icon as a `<span>` with `aria-label="Discord"` as a safe fallback.

### Missing Flagship Project

If `projects.find(p => p.featured && p.status === 'in-progress')` returns `undefined` (no flagship), the Building Section falls back gracefully: all items render in the standard `lg:col-span-1` grid without crashing. A TypeScript type guard ensures `flagship` is checked before applying the col-span class.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

The feature involves pure rendering logic (flagship detection from an array, conditional element rendering based on null URLs, animation suppression based on a boolean flag, and string containment checks). These are exactly the conditions where property-based testing adds value over hand-written examples: the input space is large, the logic is pure, and 100 random inputs will surface edge cases that a fixed set of examples cannot.

The chosen PBT library is **fast-check** (TypeScript-native, integrates with Vitest/Jest, no additional dependencies beyond `devDependencies`).

---

### Property 1: Flagship Detection Invariant

*For any* array of projects where exactly one entry has `featured: true` and `status: 'in-progress'`, the Building Section component shall apply the dominant layout class (`lg:col-span-2`) to exactly that entry and to no other entry.

**Validates: Requirements 4.3, 4.4**

---

### Property 2: Route-Conditional Link Rendering

*For any* project entry, the Building Section shall render it as a `<Link>` element with a matching `href` if and only if the project's `route` field is a non-empty string. A project with no `route` field (or `route: undefined`) shall be rendered as a non-navigable element with no `href` attribute.

**Validates: Requirements 4.9, 4.10, 4.11**

---

### Property 3: Null URL Renders Non-Interactively

*For any* `SocialLinkExtended` entry where `url` is `null`, the rendering components (Contact Section, About Section, Footer) shall produce a `<span>` element (or equivalent non-interactive element) and shall never produce an `<a>` element with an `href` attribute for that entry's data.

**Validates: Requirements 9.3, 9.7, 6.4**

---

### Property 4: Reduced Motion Suppresses Particles and Pulse

*For any* arrival animation render where `useReducedMotion()` returns `true`, no particle `<motion.div>` elements shall be present in the rendered output, and no letter `<motion.span>` elements with `textShadow` or `color` keyframe animations shall be present.

**Validates: Requirements 1.10, 16.9**

---

### Property 5: Prohibited Word Copy Audit

*For any* page's rendered text content, none of the following strings shall appear (case-insensitive): "innovative", "cutting-edge", "empowering", "revolutionary", "ecosystem", "platform", "solution", "AI-powered", "next-generation", "state-of-the-art".

Additionally, the em dash character (—, U+2014) shall not appear in any rendered text content on any page.

**Validates: Requirements 5.2, 8.1, 8.2**

---

### Property 6: Tech Stack Display Renders Exactly Content Config Entries

*For any* array of `Skill` entries passed to the tech stack display, the rendered output shall contain exactly the `name` field of each entry — no more, no fewer — and shall not render any technology name that is not present in the input array.

**Validates: Requirements 13.1, 13.2, 13.3**

---

### Property 7: Letter Stagger Delay is Strictly Increasing Left to Right

*For any* array of letters rendered in the arrival animation pulse sequence, the Framer Motion `transition.delay` for the letter at index `i` shall be strictly less than the delay for the letter at index `i + 1`. No two letters shall share the same delay value.

**Validates: Requirements 1.5**

---

## Testing Strategy

### Dual Testing Approach

Both unit/example tests and property-based tests are used. They are complementary: example tests cover specific known states and integration points; property tests cover the universal invariants across all valid inputs.

### Property-Based Testing

**Library:** `fast-check` (add to `devDependencies`)

**Configuration:** Minimum 100 runs per property (fast-check default is 100; set `numRuns: 200` for copy audit and flagship detection to increase confidence).

Each property test references its design property using the tag format:
```
// Feature: stormd3v-identity-redesign, Property N: <property text>
```

**Property test implementations (sketch):**

**P1 — Flagship Detection:**
```typescript
// Feature: stormd3v-identity-redesign, Property 1: Flagship Detection Invariant
fc.assert(fc.property(
  arbitraryProjectArray(), // generates arrays with exactly one featured+in-progress
  (projects) => {
    const { container } = render(<Building projects={projects} />);
    const flagship = projects.find(p => p.featured && p.status === 'in-progress')!;
    const flagshipEl = container.querySelector(`[data-project-id="${flagship.id}"]`);
    expect(flagshipEl).toHaveClass('lg:col-span-2');
    // All other project elements must not have lg:col-span-2
    projects.filter(p => p !== flagship).forEach(p => {
      const el = container.querySelector(`[data-project-id="${p.id}"]`);
      expect(el).not.toHaveClass('lg:col-span-2');
    });
  }
), { numRuns: 200 });
```

**P2 — Route-Conditional Links:**
```typescript
// Feature: stormd3v-identity-redesign, Property 2: Route-Conditional Link Rendering
fc.assert(fc.property(
  arbitraryProject(),
  (project) => {
    const { container } = render(<Building projects={[project]} />);
    const anchor = container.querySelector(`a[data-project-id="${project.id}"]`);
    if (project.route) {
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', project.route);
    } else {
      expect(anchor).not.toBeInTheDocument();
    }
  }
));
```

**P3 — Null URL Non-Interactive:**
```typescript
// Feature: stormd3v-identity-redesign, Property 3: Null URL Renders Non-Interactively
fc.assert(fc.property(
  arbitrarySocialLinkWithNullUrl(),
  (link) => {
    const { container } = render(<SocialLinkRenderer link={link} />);
    const anchor = container.querySelector(`a[href]`);
    expect(anchor).not.toBeInTheDocument();
    const span = container.querySelector(`span[aria-label]`);
    expect(span).toBeInTheDocument();
  }
));
```

**P4 — Reduced Motion:**
```typescript
// Feature: stormd3v-identity-redesign, Property 4: Reduced Motion Suppresses Particles and Pulse
// Mock useReducedMotion to return true
fc.assert(fc.property(
  fc.constant(true), // reducedMotion = true
  () => {
    mockUseReducedMotion(true);
    const { container } = render(<ArrivalOverlay />);
    const particles = container.querySelectorAll('[data-particle]');
    expect(particles).toHaveLength(0);
    const pulsedLetters = container.querySelectorAll('[data-pulse-letter]');
    expect(pulsedLetters).toHaveLength(0);
  }
));
```

**P5 — Prohibited Words:**
```typescript
// Feature: stormd3v-identity-redesign, Property 5: Prohibited Word Copy Audit
// Run against each page component's rendered text
const PROHIBITED = ['innovative','cutting-edge','empowering','revolutionary',
  'ecosystem','platform','solution','AI-powered','next-generation',
  'state-of-the-art', '—'];
fc.assert(fc.property(
  fc.constantFrom(...pageComponents),
  (PageComponent) => {
    const { container } = render(<PageComponent />);
    const text = container.textContent?.toLowerCase() ?? '';
    PROHIBITED.forEach(word => {
      expect(text).not.toContain(word.toLowerCase());
    });
  }
), { numRuns: pageComponents.length });
```

**P6 — Tech Stack Exact Render:**
```typescript
// Feature: stormd3v-identity-redesign, Property 6: Tech Stack Renders Exactly Content Config
fc.assert(fc.property(
  fc.array(arbitrarySkill(), { minLength: 1, maxLength: 20 }),
  (skills) => {
    const { container } = render(<SkillsDisplay skills={skills} />);
    skills.forEach(skill => {
      expect(container.textContent).toContain(skill.name);
    });
    // No extra names rendered
    const renderedNames = Array.from(container.querySelectorAll('[data-skill-name]'))
      .map(el => el.textContent);
    expect(renderedNames).toHaveLength(skills.length);
  }
));
```

**P7 — Stagger Delay:**
```typescript
// Feature: stormd3v-identity-redesign, Property 7: Letter Stagger is Strictly Increasing
fc.assert(fc.property(
  fc.string({ minLength: 2, maxLength: 20 }),
  (word) => {
    const delays = word.split('').map((_, i) => getLetterDelay(i));
    for (let i = 0; i < delays.length - 1; i++) {
      expect(delays[i]).toBeLessThan(delays[i + 1]);
    }
  }
));
```

### Unit and Example Tests

Unit tests cover:
- Navigation renders "StormD3v" as logo text (not "StormOS")
- Footer renders "StormD3v" brand name and copyright line with current year
- Footer does NOT render LinkedIn link
- Contact section does NOT render Card component wrapper
- `CONTACT_EMAIL` constant is `'heisst0rmd3v@gmail.com'`
- Sitemap includes only the four required routes
- `useActiveSection` returns correct section ID when a given section has highest intersection ratio
- Arrival overlay does not render a skip button or progress bar
- WorldForge page sections appear in required order

Integration tests cover:
- Contact form submit success → inline confirmation, fields reset
- Contact form submit failure → inline error, fields preserved
- Waitlist form submit success → inline confirmation
- Navigation highlights correct section as user scrolls through homepage sections

---
