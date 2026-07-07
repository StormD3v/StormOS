# Animation and Motion Design

## Overview

The StormOS animation system enhances the user experience by communicating state changes, guiding attention, and creating emotional engagement. Every animation serves a specific purpose and follows established principles to maintain professionalism while adding delight.

## Animation Principles

1. **Purpose First:** Every animation must communicate something meaningful
2. **Performance:** Animations must run at 60fps on target devices
3. **Subtlety:** Animations should enhance, not overwhelm
4. **Consistency:** Similar interactions use similar animations
5. **Accessibility:** Respect user's motion preferences
6. **Intention:** Animations guide user attention and understanding

---

## Animation Timing

### Duration Scale

Standard animation durations for consistency across the application.

#### Duration 1: Instant (150ms)
- **Purpose:** Micro-interactions, immediate feedback
- **Usage:** Button hover states, link color changes, focus states
- **Easing:** ease-out
- **Example:** Button color change on hover

#### Duration 2: Fast (200ms)
- **Purpose:** Quick transitions, state changes
- **Usage:** Dropdown open/close, tooltip appearance, checkbox toggle
- **Easing:** ease-out
- **Example:** Dropdown menu sliding down

#### Duration 3: Medium (300ms)
- **Purpose:** Standard transitions, moderate state changes
- **Usage:** Modal open/close, page transitions, card expansion
- **Easing:** ease-out
- **Example:** Modal scaling in from 0.95 to 1

#### Duration 4: Slow (500ms)
- **Purpose:** Complex animations, major state changes
- **Usage:** Hero section animations, complex transitions, loading states
- **Easing:** ease-in-out
- **Example:** Hero content staggering in

#### Duration 5: Very Slow (1000ms)
- **Purpose:** Ambient animations, background effects
- **Usage:** Particle effects, gradient animations, ambient motion
- **Easing:** linear or ease-in-out
- **Example:** Subtle background gradient shift

### Duration Guidelines

1. **Match importance:** More important changes get longer durations
2. **User control:** User-triggered animations can be longer
3. **System events:** System-triggered animations should be faster
4. **Context aware:** Adjust duration based on screen size (faster on mobile)

---

## Easing Functions

### Easing Library

Standard easing functions for natural-feeling motion.

#### Ease Out (Default)
- **CSS:** `cubic-bezier(0.215, 0.61, 0.355, 1)`
- **Purpose:** Most animations, natural deceleration
- **Usage:** Default for most transitions
- **Feel:** Fast start, slow finish, natural

#### Ease In Out
- **CSS:** `cubic-bezier(0.645, 0.045, 0.355, 1)`
- **Purpose:** Bidirectional animations, smooth returns
- **Usage:** Modal close, toggle switches, accordion
- **Feel:** Smooth acceleration and deceleration

#### Ease Out Back
- **CSS:** `cubic-bezier(0.175, 0.885, 0.32, 1.275)`
- **Purpose:** Playful elements, attention-grabbing
- **Usage:** Success toasts, achievement unlocks, easter eggs
- **Feel:** Overshoots slightly, playful

#### Ease Out Elastic
- **CSS:** `cubic-bezier(0.68, -0.55, 0.265, 1.55)`
- **Purpose:** Bouncy effects, energetic interactions
- **Usage:** Rare, specific playful moments
- **Feel:** Bouncy, energetic

#### Linear
- **CSS:** `linear`
- **Purpose:** Continuous motion, loading states
- **Usage:** Loading spinners, progress bars, ambient animations
- **Feel:** Constant speed

### Easing Guidelines

1. **Default to ease-out:** Most natural for user interactions
2. **Match context:** Playful contexts get playful easing
3. **Avoid ease-in:** Rarely used alone (feels unnatural)
4. **Consistent usage:** Same interaction uses same easing

---

## Animation Categories

### Entry Animations

Animations that introduce elements to the screen.

#### Fade In
- **Duration:** 300ms
- **Easing:** ease-out
- **Properties:** opacity 0 → 1
- **Usage:** General element appearance
- **Implementation:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Fade Up
- **Duration:** 400ms
- **Easing:** ease-out
- **Properties:** opacity 0 → 1, translateY 20px → 0
- **Usage:** Content sections, cards, text blocks
- **Implementation:**
```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Slide Down
- **Duration:** 300ms
- **Easing:** ease-out
- **Properties:** height 0 → auto, opacity 0 → 1
- **Usage:** Dropdowns, accordions, expandable content
- **Implementation:**
```css
@keyframes slideDown {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: auto;
    opacity: 1;
  }
}
```

#### Scale In
- **Duration:** 300ms
- **Easing:** ease-out-back
- **Properties:** scale 0.95 → 1, opacity 0 → 1
- **Usage:** Modals, popovers, tooltips
- **Implementation:**
```css
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

### Exit Animations

Animations that remove elements from the screen.

#### Fade Out
- **Duration:** 200ms
- **Easing:** ease-in
- **Properties:** opacity 1 → 0
- **Usage:** General element disappearance
- **Implementation:**
```css
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

#### Fade Down
- **Duration:** 200ms
- **Easing:** ease-in
- **Properties:** opacity 1 → 0, translateY 0 → 20px
- **Usage:** Removed elements, dismissed items
- **Implementation:**
```css
@keyframes fadeDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
```

#### Slide Up
- **Duration:** 200ms
- **Easing:** ease-in
- **Properties:** height auto → 0, opacity 1 → 0
- **Usage:** Dropdowns closing, accordions collapsing
- **Implementation:**
```css
@keyframes slideUp {
  from {
    height: auto;
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}
```

#### Scale Out
- **Duration:** 200ms
- **Easing:** ease-in
- **Properties:** scale 1 → 0.95, opacity 1 → 0
- **Usage:** Modals closing, popovers dismissing
- **Implementation:**
```css
@keyframes scaleOut {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.95);
    opacity: 0;
  }
}
```

### Hover Animations

Animations that respond to user hover.

#### Elevate
- **Duration:** 150ms
- **Easing:** ease-out
- **Properties:** translateY 0 → -4px, shadow increase
- **Usage:** Cards, buttons, interactive elements
- **Implementation:**
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-3);
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}
```

#### Scale Down
- **Duration:** 150ms
- **Easing:** ease-out
- **Properties:** scale 1 → 0.98
- **Usage:** Buttons on active/click
- **Implementation:**
```css
.button:active {
  transform: scale(0.98);
  transition: transform 150ms ease-out;
}
```

#### Brighten
- **Duration:** 150ms
- **Easing:** ease-out
- **Properties:** filter brightness 1 → 1.1 or color lighten
- **Usage:** Icons, badges, small elements
- **Implementation:**
```css
.icon:hover {
  filter: brightness(1.1);
  transition: filter 150ms ease-out;
}
```

### Loading Animations

Animations that indicate loading or processing.

#### Spinner
- **Duration:** 1000ms
- **Easing:** linear
- **Properties:** rotate 0deg → 360deg
- **Usage:** Loading states, processing indicators
- **Implementation:**
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1000ms linear infinite;
}
```

#### Pulse
- **Duration:** 2000ms
- **Easing:** ease-in-out
- **Properties:** scale 1 → 1.05 → 1, opacity 1 → 0.7 → 1
- **Usage:** Loading states, attention indicators
- **Implementation:**
```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
}

.pulse {
  animation: pulse 2000ms ease-in-out infinite;
}
```

#### Skeleton Loading
- **Duration:** 1500ms
- **Easing:** ease-in-out
- **Properties:** background-position shift
- **Usage:** Content placeholders while loading
- **Implementation:**
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, var(--color-gray-800) 25%, var(--color-gray-700) 50%, var(--color-gray-800) 75%);
  background-size: 200% 100%;
  animation: shimmer 1500ms ease-in-out infinite;
}
```

### Ambient Animations

Subtle background animations that add life without distraction.

#### Gradient Shift
- **Duration:** 10000ms
- **Easing:** ease-in-out
- **Properties:** background-position shift
- **Usage:** Hero backgrounds, section dividers
- **Implementation:**
```css
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.gradient-bg {
  background: linear-gradient(45deg, var(--color-storm-dark), var(--color-gray-800), var(--color-storm-dark));
  background-size: 200% 200%;
  animation: gradientShift 10000ms ease-in-out infinite;
}
```

#### Float
- **Duration:** 6000ms
- **Easing:** ease-in-out
- **Properties:** translateY 0 → -10px → 0
- **Usage:** Decorative elements, illustrations
- **Implementation:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.float {
  animation: float 6000ms ease-in-out infinite;
}
```

---

## Component-Specific Animations

### Navigation

#### Navigation Entry
- **Trigger:** Page load
- **Animation:** Slide down from top
- **Duration:** 500ms (200-500ms staggered)
- **Easing:** ease-out-back
- **Sequence:**
  1. Background fades in (0-200ms)
  2. Logo slides down (200-400ms)
  3. Navigation items stagger in (300-500ms)
- **Implementation:** Framer Motion staggered children

#### Mobile Menu Toggle
- **Trigger:** Hamburger click
- **Animation:** Icon morph (hamburger → X)
- **Duration:** 300ms
- **Easing:** ease-in-out
- **Properties:** SVG path morph
- **Implementation:** Framer Motion path animation

#### Mobile Menu Open
- **Trigger:** Menu toggle
- **Animation:** Slide down from top
- **Duration:** 300ms
- **Easing:** ease-out
- **Properties:** height 0 → auto, opacity 0 → 1
- **Implementation:** Framer Motion height animation

### Buttons

#### Button Hover
- **Trigger:** Mouse enter
- **Animation:** Shadow increase, slight scale
- **Duration:** 150ms
- **Easing:** ease-out
- **Properties:** shadow level +1, scale 1 → 1.02
- **Implementation:** CSS transition

#### Button Active
- **Trigger:** Mouse down
- **Animation:** Scale down
- **Duration:** 150ms
- **Easing:** ease-out
- **Properties:** scale 1 → 0.98
- **Implementation:** CSS transition

#### Button Loading
- **Trigger:** Form submission
- **Animation:** Content fade out, spinner fade in
- **Duration:** 200ms
- **Easing:** ease-out
- **Properties:** opacity transition, spinner animation
- **Implementation:** CSS transition + keyframe animation

### Cards

#### Card Hover
- **Trigger:** Mouse enter
- **Animation:** Elevate, shadow increase
- **Duration:** 200ms
- **Easing:** ease-out
- **Properties:** translateY 0 → -4px, shadow level +1
- **Implementation:** CSS transition

#### Card Entry
- **Trigger:** Scroll into view
- **Animation:** Fade up
- **Duration:** 400ms
- **Easing:** ease-out
- **Properties:** opacity 0 → 1, translateY 20px → 0
- **Implementation:** Intersection Observer + CSS animation

### Modals

#### Modal Open
- **Trigger:** Modal trigger click
- **Animation:** Scale in with overlay fade
- **Duration:** 300ms
- **Easing:** ease-out
- **Sequence:**
  1. Overlay fades in (0-300ms)
  2. Modal scales from 0.95 to 1 (100-400ms)
- **Implementation:** Framer Motion animate prop

#### Modal Close
- **Trigger:** Close button/overlay click/Escape
- **Animation:** Scale out with overlay fade
- **Duration:** 200ms
- **Easing:** ease-in
- **Sequence:**
  1. Modal scales to 0.95 (0-200ms)
  2. Overlay fades out (0-200ms)
- **Implementation:** Framer Motion exit prop

### Forms

#### Input Focus
- **Trigger:** Input focus
- **Animation:** Border color change, shadow appear
- **Duration:** 150ms
- **Easing:** ease-out
- **Properties:** border-color, box-shadow
- **Implementation:** CSS transition

#### Input Error
- **Trigger:** Validation error
- **Animation:** Shake
- **Duration:** 300ms
- **Easing:** ease-out
- **Properties:** translateX shake
- **Implementation:**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.input-error {
  animation: shake 300ms ease-out;
}
```

#### Form Success
- **Trigger:** Successful submission
- **Animation:** Checkmark draw
- **Duration:** 500ms
- **Easing:** ease-out
- **Properties:** SVG stroke-dashoffset
- **Implementation:** CSS stroke animation

### Toasts

#### Toast Entry
- **Trigger:** Toast trigger
- **Animation:** Slide in from right
- **Duration:** 300ms
- **Easing:** ease-out-back
- **Properties:** translateX 100% → 0, opacity 0 → 1
- **Implementation:** Framer Motion slide animation

#### Toast Exit
- **Trigger:** Auto-dismiss or manual dismiss
- **Animation:** Slide out to right
- **Duration:** 300ms
- **Easing:** ease-in
- **Properties:** translateX 0 → 100%, opacity 1 → 0
- **Implementation:** Framer Motion exit animation

### Scroll Animations

#### Scroll Reveal
- **Trigger:** Element enters viewport
- **Animation:** Fade up
- **Duration:** 400ms
- **Easing:** ease-out
- **Properties:** opacity 0 → 1, translateY 20px → 0
- **Implementation:** Intersection Observer with 20% threshold

#### Scroll Progress
- **Trigger:** Page scroll
- **Animation:** Width change
- **Duration:** 100ms (throttled)
- **Easing:** linear
- **Properties:** width 0% → scroll percentage
- **Implementation:** Scroll event listener with throttle

---

## Page Transitions

### Initial Load

#### Hero Animation Sequence
- **Total Duration:** 1200ms
- **Sequence:**
  1. Background fade in (0-300ms, ease-in)
  2. Navigation slide down (200-500ms, ease-out-back)
  3. Hero headline fade up (400-800ms, ease-out)
  4. Hero subheadline fade up (500-900ms, ease-out)
  5. CTA buttons fade up (600-1000ms, ease-out)
  6. Secondary elements fade in (800-1200ms, ease-out)
- **Implementation:** Framer Motion staggered children with delay

### Route Transitions

#### Page Transition
- **Duration:** 300ms
- **Easing:** ease-in-out
- **Animation:** Fade out → Fade in
- **Sequence:**
  1. Old page fades out (0-150ms)
  2. New page fades in (150-300ms)
- **Implementation:** Next.js transition component or Framer Motion AnimatePresence

#### Smooth Scroll
- **Duration:** 300ms
- **Easing:** ease-out
- **Animation:** Scroll to target
- **Properties:** scrollTop
- **Implementation:** window.scrollTo with behavior: 'smooth'

---

## Special Animations

### Easter Egg Animation

#### Konami Code Trigger
- **Trigger:** ↑↑↓↓←→←→BA key sequence
- **Animation:** Particle explosion with logo
- **Duration:** 3000ms
- **Easing:** ease-out
- **Sequence:**
  1. Logo scales up (0-500ms)
  2. Particles explode (500-2000ms)
  3. Everything fades out (2000-3000ms)
- **Implementation:** Canvas or CSS particle system

### WorldForge Teaser

#### Pulse Effect
- **Trigger:** Continuous (ambient)
- **Duration:** 2000ms
- **Easing:** ease-in-out
- **Animation:** Scale and opacity pulse
- **Properties:** scale 1 → 1.05 → 1, opacity 1 → 0.8 → 1
- **Implementation:** CSS keyframe animation

### Counter Animation

#### Number Count Up
- **Trigger:** Section enters viewport
- **Duration:** 2000ms
- **Easing:** ease-out
- **Animation:** Number increments from 0 to final value
- **Implementation:** JavaScript requestAnimationFrame

```typescript
function animateCounter(element: HTMLElement, target: number, duration: number) {
  let start = 0;
  const startTime = performance.now();
  
  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out
    const current = Math.floor(eased * target);
    
    element.textContent = current.toString();
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}
```

---

## Performance Guidelines

### Animation Performance

**Preferred Properties:**
- transform: translate, scale, rotate
- opacity
- filter (with caution)

**Avoid Properties:**
- width, height (causes layout reflow)
- left, top, right, bottom (causes layout reflow)
- margin, padding (causes layout reflow)
- box-shadow (expensive on some devices)

**Implementation Tips:**
- Use will-change sparingly
- Use transform instead of position changes
- Use opacity instead of visibility
- Test on low-end devices

### GPU Acceleration

**When to Use:**
- Complex animations
- Continuous animations (spinners, ambient)
- Mobile devices

**Implementation:**
```css
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}
```

### Reduced Motion

**Respect Preferences:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**JavaScript Detection:**
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable animations
}
```

---

## Animation Library

### Framer Motion Configuration

**Default Animation Props:**
```typescript
const defaultTransition = {
  duration: 0.3,
  ease: [0.215, 0.61, 0.355, 1], // ease-out
};

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
```

**Common Animation Patterns:**

**Fade Up:**
```typescript
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }
  },
};
```

**Staggered Children:**
```typescript
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

### CSS Animation Library

**Custom Animation Classes:**
```css
/* Entry animations */
.animate-fade-in {
  animation: fadeIn 300ms ease-out;
}

.animate-fade-up {
  animation: fadeUp 400ms ease-out;
}

.animate-scale-in {
  animation: scaleIn 300ms ease-out-back;
}

/* Hover animations */
.hover-elevate {
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

.hover-elevate:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-3);
}

/* Loading animations */
.animate-spin {
  animation: spin 1000ms linear infinite;
}

.animate-pulse {
  animation: pulse 2000ms ease-in-out infinite;
}
```

---

## Animation Testing

### Performance Testing

**Lighthouse:**
- Ensure animations don't affect performance score
- Check for layout thrashing
- Verify GPU acceleration

**Chrome DevTools:**
- Use Performance tab to analyze animations
- Check for forced reflows
- Monitor frame rate (target 60fps)

### Visual Testing

**Manual Testing:**
- Test on various devices
- Test with reduced motion preference
- Test on slow connections
- Test with hardware acceleration disabled

**Automated Testing:**
- Visual regression tests for animations
- Performance regression tests
- Cross-browser testing

---

## Animation Documentation

When adding new animations:

1. **Document purpose:** Explain what the animation communicates
2. **Specify timing:** Duration and easing function
3. **Provide implementation:** Code example
4. **Note performance:** Any performance considerations
5. **Update this document:** Add to appropriate section

---

**Next:** [Accessibility Documentation](../06-accessibility/README.md)
