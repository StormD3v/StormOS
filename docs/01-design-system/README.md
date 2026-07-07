# Design System

## Overview

The StormOS Design System provides the visual foundation for the entire experience. All design decisions are intentional, supporting the emotional journey from arrival to action while maintaining professionalism and usability.

This system is implementation-ready with exact values for all design tokens.

## Design Philosophy

The design system balances three competing requirements:

1. **Professional credibility** - Must appeal to investors, developers, and collaborators
2. **Immersive fantasy** - Must feel like entering a digital world, not a website
3. **Functional clarity** - Must never sacrifice usability for visual effect

Every design token serves these requirements.

---

## Color System

### Primary Palette

The primary palette establishes the StormOS identity while maintaining professional credibility.

#### Storm Blue (Primary)
- **Purpose:** Brand identity, primary actions, key interactive elements
- **Hex:** `#0A84FF`
- **RGB:** `rgb(10, 132, 255)`
- **HSL:** `hsl(211, 92%, 52%)`
- **Usage:** Primary buttons, navigation highlights, key interactive elements
- **Accessibility:** WCAG AA compliant for text on white backgrounds (4.5:1 contrast ratio)

#### Storm Dark (Surface)
- **Purpose:** Primary surface backgrounds, creating depth and hierarchy
- **Hex:** `#1C1C1E`
- **RGB:** `rgb(28, 28, 30)`
- **HSL:** `hsl(240, 3%, 11%)`
- **Usage:** Main background, card surfaces, modal backgrounds
- **Rationale:** Dark enough to create contrast but not pure black (reduces eye strain)

#### Storm Light (Text)
- **Purpose:** Primary text, headings, body content
- **Hex:** `#F5F5F7`
- **RGB:** `rgb(245, 245, 247)`
- **HSL:** `hsl(240, 7%, 96%)`
- **Usage:** All primary text content
- **Accessibility:** WCAG AAA compliant on dark backgrounds (7:1 contrast ratio)

### Secondary Palette

Secondary colors support the primary palette while adding visual interest.

#### Accent Cyan
- **Purpose:** Highlights, success states, positive feedback
- **Hex:** `#32ADE6`
- **RGB:** `rgb(50, 173, 230)`
- **HSL:** `hsl(199, 78%, 55%)`
- **Usage:** Success indicators, active states, subtle highlights
- **Rationale:** Complements Storm Blue while maintaining cool color temperature

#### Accent Purple
- **Purpose:** Creative elements, WorldForge references, fantasy elements
- **Hex:** `#BF5AF2`
- **RGB:** `rgb(191, 90, 242)`
- **HSL:** `hsl(276, 86%, 65%)`
- **Usage:** WorldForge branding, creative sections, imaginative elements
- **Rationale:** Introduces fantasy without breaking professional credibility

#### Accent Amber
- **Purpose:** Warnings, attention states, exploration cues
- **Hex:** `#FFD60A`
- **RGB:** `rgb(255, 214, 10)`
- **HSL:** `hsl(48, 100%, 52%)`
- **Usage:** Warning states, attention-grabbing elements, exploration hints
- **Accessibility:** WCAG AA compliant for large text on dark backgrounds

### Neutral Palette

Neutral colors provide hierarchy and separation without adding visual noise.

#### Gray 900 (Darkest)
- **Hex:** `#2C2C2E`
- **RGB:** `rgb(44, 44, 46)`
- **Usage:** Borders, dividers, subtle separation

#### Gray 800
- **Hex:** `#3A3A3C`
- **RGB:** `rgb(58, 58, 60)`
- **Usage:** Secondary surfaces, elevated cards

#### Gray 700
- **Hex:** `#48484A`
- **RGB:** `rgb(72, 72, 74)`
- **Usage:** Tertiary surfaces, hover states

#### Gray 600
- **Hex:** `#636366`
- **RGB:** `rgb(99, 99, 102)`
- **Usage:** Secondary text, metadata, timestamps

#### Gray 500
- **Hex:** `#8E8E93`
- **RGB:** `rgb(142, 142, 147)`
- **Usage:** Disabled text, placeholder text

#### Gray 400
- **Hex:** `#AEAEB2`
- **RGB:** `rgb(174, 174, 178)`
- **Usage:** Disabled borders, inactive states

#### Gray 300
- **Hex:** `#C7C7CC`
- **RGB:** `rgb(199, 199, 204)`
- **Usage:** Subtle dividers, low-priority separation

### Semantic Colors

Semantic colors communicate state and meaning.

#### Success
- **Hex:** `#30D158`
- **RGB:** `rgb(48, 209, 88)`
- **Usage:** Success messages, completion states, positive feedback

#### Warning
- **Hex:** `#FFD60A`
- **RGB:** `rgb(255, 214, 10)`
- **Usage:** Warning messages, attention required states

#### Error
- **Hex:** `#FF453A`
- **RGB:** `rgb(255, 69, 58)`
- **Usage:** Error messages, destructive actions, critical states

#### Info
- **Hex:** `#0A84FF`
- **RGB:** `rgb(10, 132, 255)`
- **Usage:** Informational messages, help text, tooltips

### Color Usage Guidelines

1. **60-30-10 Rule:** 60% neutral, 30% primary, 10% accent
2. **Limit accent colors:** Use maximum 2 accent colors per screen
3. **Maintain contrast:** All text must meet WCAG AA (4.5:1) or AAA (7:1) standards
4. **Semantic consistency:** Always use semantic colors for their intended purpose
5. **Dark mode default:** StormOS is dark-first; light mode is not supported

---

## Typography System

### Type Scale

The type scale uses a modular scale with a ratio of 1.25 (major third) for harmonious proportions.

#### Display 1
- **Size:** 64px
- **Line Height:** 72px (1.125)
- **Weight:** 700 (Bold)
- **Letter Spacing:** -0.02em
- **Usage:** Hero headlines, main section titles
- **Font Family:** Inter, system-ui

#### Display 2
- **Size:** 48px
- **Line Height:** 56px (1.167)
- **Weight:** 700 (Bold)
- **Letter Spacing:** -0.01em
- **Usage:** Section headers, major headings
- **Font Family:** Inter, system-ui

#### Heading 1
- **Size:** 36px
- **Line Height:** 44px (1.222)
- **Weight:** 600 (Semi Bold)
- **Letter Spacing:** 0em
- **Usage:** Page titles, card headers
- **Font Family:** Inter, system-ui

#### Heading 2
- **Size:** 28px
- **Line Height:** 36px (1.286)
- **Weight:** 600 (Semi Bold)
- **Letter Spacing:** 0em
- **Usage:** Subsection headers, card titles
- **Font Family:** Inter, system-ui

#### Heading 3
- **Size:** 22px
- **Line Height:** 28px (1.273)
- **Weight:** 600 (Semi Bold)
- **Letter Spacing:** 0em
- **Usage:** List headers, group titles
- **Font Family:** Inter, system-ui

#### Body Large
- **Size:** 18px
- **Line Height:** 28px (1.556)
- **Weight:** 400 (Regular)
- **Letter Spacing:** 0em
- **Usage:** Lead paragraphs, emphasized body text
- **Font Family:** Inter, system-ui

#### Body
- **Size:** 16px
- **Line Height:** 24px (1.5)
- **Weight:** 400 (Regular)
- **Letter Spacing:** 0em
- **Usage:** Standard body text, descriptions
- **Font Family:** Inter, system-ui

#### Body Small
- **Size:** 14px
- **Line Height:** 20px (1.429)
- **Weight:** 400 (Regular)
- **Letter Spacing:** 0em
- **Usage:** Secondary text, captions, metadata
- **Font Family:** Inter, system-ui

#### Caption
- **Size:** 12px
- **Line Height:** 16px (1.333)
- **Weight:** 400 (Regular)
- **Letter Spacing:** 0.02em
- **Usage:** Labels, tags, tiny text
- **Font Family:** Inter, system-ui

### Font Families

#### Primary: Inter
- **Weights:** 400, 500, 600, 700
- **Fallback:** system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Rationale:** Inter provides excellent readability at all sizes, modern aesthetic, and strong technical credibility
- **Implementation:** Load via CDN or self-host with WOFF2 format

#### Monospace: JetBrains Mono
- **Weights:** 400, 500
- **Fallback:** 'Fira Code', 'Consolas', 'Monaco', monospace
- **Usage:** Code snippets, technical terms, keyboard shortcuts
- **Rationale:** JetBrains Mono has excellent ligature support and readability for code

### Typography Guidelines

1. **Hierarchy first:** Use type scale to establish clear visual hierarchy
2. **Line height matters:** Never reduce line height below specified values
3. **Limit weights:** Use maximum 2 weights per component
4. **Avoid all caps:** Use sentence case except for acronyms
5. **Text truncation:** Implement ellipsis for overflow text with max-width

---

## Spacing System

### Spacing Scale

The spacing scale uses an 8px base unit for consistency and rhythm.

#### Space 0
- **Value:** 0px
- **Usage:** No spacing, tight grouping

#### Space 1
- **Value:** 4px
- **Usage:** Tight spacing between related elements, icon padding

#### Space 2
- **Value:** 8px
- **Usage:** Default spacing between closely related elements

#### Space 3
- **Value:** 12px
- **Usage:** Spacing between elements with loose relationship

#### Space 4
- **Value:** 16px
- **Usage:** Standard spacing between distinct elements

#### Space 5
- **Value:** 24px
- **Usage:** Section spacing, component grouping

#### Space 6
- **Value:** 32px
- **Usage:** Major section separation

#### Space 7
- **Value:** 48px
- **Usage:** Large section gaps, page margins

#### Space 8
- **Value:** 64px
- **Usage:** Hero section spacing, major page divisions

#### Space 9
- **Value:** 96px
- **Usage:** Full-page section breaks

#### Space 10
- **Value:** 128px
- **Usage:** Maximum spacing, dramatic separation

### Spacing Guidelines

1. **Stick to the scale:** Never use arbitrary spacing values
2. **Consistent rhythm:** Use same spacing value for similar relationships
3. **Padding vs margin:** Use padding for internal spacing, margin for external
4. **Responsive spacing:** Reduce spacing on smaller screens (multiply by 0.75 on mobile)

---

## Border Radius

### Radius Scale

Border radius values for consistent softness across components.

#### Radius 0
- **Value:** 0px
- **Usage:** Sharp edges, technical elements, code blocks

#### Radius 1
- **Value:** 4px
- **Usage:** Small elements, tags, badges

#### Radius 2
- **Value:** 8px
- **Usage:** Default buttons, cards, inputs

#### Radius 3
- **Value:** 12px
- **Usage:** Large cards, modals, panels

#### Radius 4
- **Value:** 16px
- **Usage:** Hero elements, major containers

#### Radius Full
- **Value:** 9999px
- **Usage:** Circular elements, avatars, pills

### Border Radius Guidelines

1. **Consistent grouping:** Use same radius for related components
2. **Context appropriate:** Smaller radius for technical elements, larger for creative
3. **Avoid mixing:** Don't use multiple radius values in single component

---

## Shadows

### Shadow Scale

Shadows create depth and hierarchy without overwhelming the design.

#### Shadow 1 (Subtle)
- **CSS:** `0 1px 2px rgba(0, 0, 0, 0.05)`
- **Usage:** Hover states, subtle elevation

#### Shadow 2 (Default)
- **CSS:** `0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)`
- **Usage:** Cards, elevated surfaces

#### Shadow 3 (Medium)
- **CSS:** `0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)`
- **Usage:** Modals, dropdowns, floating elements

#### Shadow 4 (Large)
- **CSS:** `0 20px 25px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.04)`
- **Usage:** Hero elements, major containers

#### Shadow 5 (Dramatic)
- **CSS:** `0 25px 50px rgba(0, 0, 0, 0.25)`
- **Usage:** Focused elements, active states

### Shadow Guidelines

1. **Subtle first:** Default to lighter shadows
2. **Depth hierarchy:** Use shadow intensity to indicate elevation
3. **Color consistency:** Always use black with varying opacity
4. **Performance:** Use box-shadow efficiently, avoid excessive layers

---

## Z-Index Scale

### Z-Index Values

Z-index values for consistent layering across the application.

#### Z-Index 0
- **Value:** 0
- **Usage:** Default layer, base content

#### Z-Index 1
- **Value:** 10
- **Usage:** Sticky headers, fixed elements

#### Z-Index 2
- **Value:** 20
- **Usage:** Dropdowns, tooltips

#### Z-Index 3
- **Value:** 30
- **Usage:** Modals, overlays

#### Z-Index 4
- **Value:** 40
- **Usage:** Toast notifications

#### Z-Index 5
- **Value:** 50
- **Usage:** Critical overlays, loading states

### Z-Index Guidelines

1. **Use scale values:** Never use arbitrary z-index values
2. **Document exceptions:** If custom z-index needed, document reason
3. **Avoid conflicts:** Keep z-index values sparse to prevent conflicts

---

## Transitions

### Transition Timing

Standard transition timings for consistent motion.

#### Duration 1 (Instant)
- **Value:** 150ms
- **Usage:** Micro-interactions, hover states

#### Duration 2 (Fast)
- **Value:** 200ms
- **Usage:** Standard transitions, state changes

#### Duration 3 (Medium)
- **Value:** 300ms
- **Usage:** Modal open/close, page transitions

#### Duration 4 (Slow)
- **Value:** 500ms
- **Usage:** Complex animations, major state changes

### Easing Functions

#### Ease Out
- **CSS:** `cubic-bezier(0.215, 0.61, 0.355, 1)`
- **Usage:** Default easing, natural feel

#### Ease In Out
- **CSS:** `cubic-bezier(0.645, 0.045, 0.355, 1)`
- **Usage:** Bidirectional animations, smooth returns

#### Ease Out Back
- **CSS:** `cubic-bezier(0.175, 0.885, 0.32, 1.275)`
- **Usage:** Playful elements, attention-grabbing states

#### Linear
- **CSS:** `linear`
- **Usage:** Loading states, continuous motion

### Transition Guidelines

1. **Default to ease-out:** Most natural-feeling for user interactions
2. **Match duration to importance:** Longer duration for more important changes
3. **Consistent properties:** Always transition same properties together
4. **Performance:** Prefer transform and opacity over layout properties

---

## Design Token Implementation

### CSS Custom Properties

Implement design tokens as CSS custom properties for consistency and maintainability.

```css
:root {
  /* Colors */
  --color-storm-blue: #0A84FF;
  --color-storm-dark: #1C1C1E;
  --color-storm-light: #F5F5F7;
  --color-accent-cyan: #32ADE6;
  --color-accent-purple: #BF5AF2;
  --color-accent-amber: #FFD60A;
  --color-gray-900: #2C2C2E;
  --color-gray-800: #3A3A3C;
  --color-gray-700: #48484A;
  --color-gray-600: #636366;
  --color-gray-500: #8E8E93;
  --color-gray-400: #AEAEB2;
  --color-gray-300: #C7C7CC;
  --color-success: #30D158;
  --color-warning: #FFD60A;
  --color-error: #FF453A;
  --color-info: #0A84FF;

  /* Typography */
  --font-family-primary: 'Inter', system-ui, -apple-system, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  --font-size-display-1: 64px;
  --font-size-display-2: 48px;
  --font-size-heading-1: 36px;
  --font-size-heading-2: 28px;
  --font-size-heading-3: 22px;
  --font-size-body-large: 18px;
  --font-size-body: 16px;
  --font-size-body-small: 14px;
  --font-size-caption: 12px;

  /* Spacing */
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;

  /* Border Radius */
  --radius-0: 0px;
  --radius-1: 4px;
  --radius-2: 8px;
  --radius-3: 12px;
  --radius-4: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-2: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-3: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-4: 0 20px 25px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.04);
  --shadow-5: 0 25px 50px rgba(0, 0, 0, 0.25);

  /* Z-Index */
  --z-index-0: 0;
  --z-index-1: 10;
  --z-index-2: 20;
  --z-index-3: 30;
  --z-index-4: 40;
  --z-index-5: 50;

  /* Transitions */
  --duration-1: 150ms;
  --duration-2: 200ms;
  --duration-3: 300ms;
  --duration-4: 500ms;
  --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --linear: linear;
}
```

---

## Design System Maintenance

### Version Control

- Design tokens are versioned with the project
- Changes require documentation update
- Breaking changes require semver version bump

### Token Documentation

When adding new tokens:
1. Define purpose and rationale
2. Specify exact values
3. Provide usage examples
4. Document accessibility implications
5. Update this README

### Token Deprecation

When deprecating tokens:
1. Mark as deprecated in documentation
2. Provide migration path
3. Keep in codebase for 2 versions
4. Remove after migration period

---

**Next:** [Component Library Documentation](../02-component-library/README.md)
