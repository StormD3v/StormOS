# Accessibility Documentation

## Overview

StormOS is committed to ensuring accessibility for all users, regardless of ability or assistive technology. This document specifies all accessibility requirements, implementation guidelines, and testing procedures to ensure WCAG 2.1 AA compliance as a minimum, with AAA compliance where feasible.

## Accessibility Principles

1. **Perceivable:** Information and UI components must be presentable to users in ways they can perceive
2. **Operable:** UI components and navigation must be operable by all users
3. **Understandable:** Information and UI operation must be understandable
4. **Robust:** Content must be robust enough to be interpreted by assistive technologies

## WCAG Compliance Targets

### Level AA (Minimum Requirement)

- **Perceivable:**
  - Text alternatives for non-text content
  - Captions and alternatives for multimedia
  - Content can be presented in different ways
  - Content is easier to see and hear

- **Operable:**
  - All functionality available from keyboard
  - Enough time to read and use content
  - No content that causes seizures
  - Navigable and findable

- **Understandable:**
  - Text is readable and understandable
  - Content appears and operates in predictable ways
  - Input assistance helps avoid and correct mistakes

- **Robust:**
  - Compatible with current and future assistive technologies

### Level AAA (Where Feasible)

- Enhanced contrast ratios
- No background audio
- Context and orientation help
- Error identification and suggestions
- Consistent identification
- Location of information

---

## Semantic HTML

### Document Structure

**Proper Heading Hierarchy:**
- Single h1 per page (page title)
- Headings used in order (h1 → h2 → h3 → h4)
- No skipping heading levels
- Headings describe content, not appearance

**Example:**
```html
<h1>StormOS - Building Digital Worlds</h1>
<h2>About</h2>
<h3>My Philosophy</h3>
<h3>Background</h3>
<h2>Projects</h2>
<h3>WorldForge</h3>
<h3>Other Projects</h2>
```

**Landmark Roles:**
- `role="banner"` for header
- `role="navigation"` for navigation
- `role="main"` for main content
- `role="complementary"` for sidebar/aside
- `role="contentinfo"` for footer
- `role="search"` for search functionality

**Example:**
```html
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <!-- Navigation -->
  </nav>
</header>

<main role="main">
  <!-- Main content -->
</main>

<aside role="complementary">
  <!-- Sidebar content -->
</aside>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>
```

### Lists

**Use Semantic List Elements:**
- `<ul>` for unordered lists
- `<ol>` for ordered lists
- `<dl>` for definition lists
- Never use divs styled as lists

**Example:**
```html
<ul>
  <li>React</li>
  <li>TypeScript</li>
  <li>Node.js</li>
</ul>
```

### Tables

**Proper Table Structure:**
- `<th>` for headers with `scope="col"` or `scope="row"`
- `<caption>` for table description
- Proper association between headers and data

**Example:**
```html
<table>
  <caption>Project timeline with key milestones</caption>
  <thead>
    <tr>
      <th scope="col">Year</th>
      <th scope="col">Project</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2024</td>
      <td>WorldForge</td>
      <td>Lead Developer</td>
    </tr>
  </tbody>
</table>
```

---

## Keyboard Accessibility

### Tab Order

**Logical Tab Order:**
- Follow visual layout (left to right, top to bottom)
- Skip to content link as first focusable element
- Focusable elements in logical sequence
- No keyboard traps

**Skip to Content Link:**
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-storm-blue);
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>
```

### Focus Management

**Focus Visible:**
- Always show focus indicator on keyboard navigation
- 2px solid outline, offset by 2px
- Color: `--color-storm-blue` (#0A84FF)
- Never remove focus outline

**Implementation:**
```css
*:focus-visible {
  outline: 2px solid var(--color-storm-blue);
  outline-offset: 2px;
}

/* Optional: Hide outline on mouse-only focus */
:focus:not(:focus-visible) {
  outline: none;
}
```

**Focus Trap in Modals:**
- Trap focus inside modal when open
- Return focus to trigger when closed
- Manage focus for dynamic content

**Implementation:**
```typescript
import { useEffect } from 'react';

function useFocusTrap(isOpen: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    firstElement.focus();

    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen, containerRef]);
}
```

### Keyboard Shortcuts

**Standard Shortcuts:**
- `Tab` / `Shift+Tab`: Navigate forward/backward
- `Enter` / `Space`: Activate buttons, links
- `Escape`: Close modals, dropdowns, dismiss overlays
- `Arrow Keys`: Navigate lists, grids, menus
- `Home` / `End`: Navigate to start/end of lists
- `Page Up` / `Page Down`: Scroll by page

**Custom Shortcuts (Documented):**
- Document any custom keyboard shortcuts
- Provide way to disable custom shortcuts
- Don't override browser shortcuts

**Implementation:**
```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

---

## Screen Reader Support

### ARIA Labels

**Descriptive Labels:**
- All interactive elements have descriptive labels
- Icons without text have `aria-label`
- Buttons with icons have `aria-label` describing action
- Links have descriptive text (not "click here")

**Examples:**
```html
<!-- Icon button -->
<button aria-label="Close modal">
  <XIcon />
</button>

<!-- Icon link -->
<a href="/github" aria-label="View GitHub profile">
  <GitHubIcon />
</a>

<!-- Descriptive link text -->
<a href="/projects">View my projects</a>
<!-- NOT -->
<a href="/projects">Click here</a>
```

### ARIA Roles

**When to Use ARIA Roles:**
- When semantic HTML is insufficient
- When custom components mimic standard UI elements
- When landmark roles are needed

**Common Roles:**
- `role="button"` for non-button elements acting as buttons
- `role="dialog"` for modals
- `role="alert"` for dynamic alerts
- `role="status"` for status updates
- `role="progressbar"` for progress indicators

**Example:**
```html
<div 
  role="button" 
  tabindex="0" 
  aria-label="Delete item"
  onClick={handleDelete}
  onKeyDown={(e) => e.key === 'Enter' && handleDelete()}
>
  <TrashIcon />
</div>
```

### ARIA States and Properties

**Common ARIA Attributes:**
- `aria-expanded`: For expandable/collapsible content
- `aria-selected`: For selected items in lists
- `aria-checked`: For checkboxes and radio buttons
- `aria-disabled`: For disabled elements
- `aria-hidden`: To hide content from screen readers
- `aria-live`: For dynamic content updates
- `aria-atomic`: For complete updates
- `aria-busy`: For loading states
- `aria-invalid`: For invalid form fields
- `aria-describedby`: For additional descriptions
- `aria-labelledby`: For element labels

**Examples:**
```html
<!-- Expandable content -->
<button 
  aria-expanded={isOpen} 
  aria-controls="content-id"
  onClick={toggle}
>
  Toggle
</button>
<div id="content-id" hidden={!isOpen}>
  Content
</div>

<!-- Form validation -->
<input 
  aria-invalid={hasError}
  aria-describedby="error-message"
/>
<div id="error-message" role="alert">
  Error message
</div>

<!-- Live region -->
<div aria-live="polite" aria-atomic="true">
  {notification}
</div>
```

### Live Regions

**When to Use Live Regions:**
- Dynamic content updates
- Form validation feedback
- Notification toasts
- Loading status updates

**Live Region Politeness Levels:**
- `aria-live="off"`: Not announced (default)
- `aria-live="polite"`: Announced when user is idle
- `aria-live="assertive"`: Announced immediately

**Example:**
```html
<!-- Polite notification -->
<div aria-live="polite" aria-atomic="true">
  {successMessage}
</div>

<!-- Assertive error -->
<div aria-live="assertive" aria-atomic="true" role="alert">
  {errorMessage}
</div>
```

---

## Color and Contrast

### Contrast Ratios

**WCAG AA Requirements:**
- Normal text: 4.5:1 minimum
- Large text (18px+ or 14px+ bold): 3:1 minimum
- UI components: 3:1 minimum
- Graphical objects: 3:1 minimum

**WCAG AAA Requirements:**
- Normal text: 7:1 minimum
- Large text: 4.5:1 minimum

**StormOS Color Contrast:**
- Storm Light on Storm Dark: 7:1 (AAA)
- Storm Light on Gray 800: 6.8:1 (AA)
- Storm Blue on white: 4.5:1 (AA)
- Success on Storm Dark: 4.8:1 (AA)
- Warning on Storm Dark: 4.2:1 (AA)
- Error on Storm Dark: 4.5:1 (AA)

### Color Independence

**Don't Rely on Color Alone:**
- Use additional indicators besides color
- Icons, text labels, patterns
- Ensure meaning is clear without color

**Examples:**
```html
<!-- Good: Color + icon + text -->
<span style="color: var(--color-success)">
  <CheckIcon /> Success
</span>

<!-- Good: Color + pattern -->
<div style="background: repeating-linear-gradient(...)">
  Error state
</div>

<!-- Bad: Color only -->
<span style="color: red">Error</span>
```

### Color Blindness

**Color Blindness Considerations:**
- Test with color blindness simulators
- Avoid red/green for critical distinctions
- Use blue/orange or other high-contrast pairs
- Provide text labels for color-coded information

**Testing Tools:**
- Chrome DevTools: Emulate vision deficiencies
- Online simulators: Toptal, Stark
- Real user testing with color blind users

---

## Typography and Readability

### Font Sizing

**Relative Units:**
- Use `rem` for font sizes
- Allow user font size preferences
- Minimum font size: 16px for body text

**Implementation:**
```css
html {
  font-size: 16px;
}

body {
  font-size: 1rem; /* 16px */
}

h1 {
  font-size: 2.25rem; /* 36px */
}
```

### Line Height

**Readable Line Height:**
- Body text: 1.5 to 1.8
- Headings: 1.1 to 1.3
- Line spacing improves readability

**Implementation:**
```css
body {
  line-height: 1.6;
}

h1 {
  line-height: 1.2;
}
```

### Text Spacing

**Letter Spacing:**
- Use sparingly for emphasis
- Don't reduce letter spacing below default
- Increased spacing for uppercase text

**Word Spacing:**
- Maintain default word spacing
- Don't reduce for visual effect

**Implementation:**
```css
.uppercase {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## Images and Media

### Alt Text

**Descriptive Alt Text:**
- Describe image content and function
- Keep concise (125 characters recommended)
- Decorative images: `alt=""` with `aria-hidden="true"`
- Complex images: Use longdesc or detailed description

**Examples:**
```html
<!-- Informative image -->
<img 
  src="storm-profile.jpg" 
  alt="Storm, software engineer, smiling in front of computer"
/>

<!-- Decorative image -->
<img 
  src="decoration.png" 
  alt="" 
  aria-hidden="true"
/>

<!-- Complex image -->
<img 
  src="architecture-diagram.png" 
  alt="System architecture diagram showing frontend, backend, and database layers"
/>
```

### Image Text

**Avoid Text in Images:**
- Use real text instead of images of text
- If unavoidable, provide alt text with same content
- Exception: Logos when text cannot be replicated

### Video and Audio

**Captions for Video:**
- Provide captions for all video content
- Captions should include dialogue and sounds
- Use WebVTT format
- Allow caption toggling

**Audio Descriptions:**
- Provide audio descriptions for visual content
- Describe important visual information
- Sync with video timing

**Transcripts:**
- Provide transcripts for audio content
- Include speaker identification
- Include descriptions of sounds

**Example:**
```html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
</video>

<a href="transcript.html">Video transcript</a>
```

---

## Forms

### Form Labels

**Visible Labels:**
- Every form input has visible label
- Use `<label>` element with `for` attribute
- Labels positioned close to inputs
- Never use placeholder as label

**Example:**
```html
<label for="email">Email address</label>
<input 
  type="email" 
  id="email" 
  name="email"
  required
/>
```

### Form Validation

**Inline Error Messages:**
- Show errors inline with inputs
- Associate errors with inputs using `aria-describedby`
- Clear error messages with specific guidance
- Don't clear errors until user corrects

**Example:**
```html
<label for="email">Email address</label>
<input 
  type="email" 
  id="email" 
  name="email"
  aria-invalid={hasError}
  aria-describedby="email-error"
/>
<div id="email-error" role="alert">
  {hasError && "Please enter a valid email address"}
</div>
```

### Required Fields

**Indicate Required Fields:**
- Use `required` attribute
- Visually indicate with asterisk or text
- Explain required indicator in form instructions

**Example:**
```html
<fieldset>
  <legend>
    Contact form (fields marked with * are required)
  </legend>
  
  <label for="name">Name *</label>
  <input type="text" id="name" name="name" required />
</fieldset>
```

### Form Instructions

**Provide Instructions:**
- Explain form purpose
- Provide formatting requirements
- Explain error indicators
- Keep instructions concise and clear

**Example:**
```html
<form aria-labelledby="form-title">
  <h2 id="form-title">Contact Me</h2>
  <p>All fields are required unless marked optional.</p>
  
  <!-- Form fields -->
</form>
```

---

## Responsive Design

### Responsive Breakpoints

**Mobile-First Approach:**
- Design for mobile first
- Enhance for larger screens
- Test on actual devices

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Touch Targets

**Minimum Touch Target Size:**
- 44x44px minimum for touch targets
- 48x48px recommended
- Adequate spacing between targets

**Implementation:**
```css
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}
```

### Orientation

**Support Both Orientations:**
- Portrait and landscape
- Content accessible in both
- No horizontal scrolling on mobile

---

## Animation and Motion

### Respect Motion Preferences

**Reduced Motion Support:**
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
  // Provide static alternatives
}
```

### No Seizure-Inducing Content

**Avoid Flashing Content:**
- No more than 3 flashes per second
- Flashing area < 25% of screen
- Avoid red flash patterns

**Implementation:**
- Test with seizure-safe tools
- Provide warning if unavoidable
- Allow users to disable animations

---

## Error Handling

### Error Messages

**Clear Error Messages:**
- Describe what went wrong
- Explain how to fix it
- Use simple, clear language
- Position near error source

**Example:**
```html
<div role="alert" aria-live="assertive">
  <h3>Error</h3>
  <p>Your email address is invalid. Please check the format and try again.</p>
</div>
```

### Error Recovery

**Provide Recovery Options:**
- Clear way to fix errors
- Don't clear form data on error
- Highlight invalid fields
- Provide specific guidance

---

## Accessibility Testing

### Automated Testing

**Tools:**
- axe DevTools (Chrome extension)
- Lighthouse (built into Chrome)
- WAVE (browser extension)
- pa11y (command line)

**Integration:**
```typescript
// Example: axe-core integration
import axe from '@axe-core/react';

function App() {
  useEffect(() => {
    axe(React, ReactDOM, 1000);
  }, []);

  return <YourApp />;
}
```

### Manual Testing

**Keyboard Navigation:**
- Navigate entire site with keyboard only
- Test all interactive elements
- Verify focus order is logical
- Check focus indicators are visible

**Screen Reader Testing:**
- Test with NVDA (Windows)
- Test with VoiceOver (Mac)
- Test with JAWS (Windows)
- Verify all content is announced

**Color Contrast Testing:**
- Use contrast checker tools
- Test with color blindness simulators
- Verify all text meets WCAG requirements

### User Testing

**Include Users with Disabilities:**
- Screen reader users
- Keyboard-only users
- Users with low vision
- Users with color blindness
- Users with motor impairments

**Testing Scenarios:**
- Complete key user flows
- Test on various devices
- Test with assistive technologies
- Gather feedback on experience

---

## Accessibility Checklist

### Perceivable
- [ ] All images have alt text
- [ ] All videos have captions
- [ ] Color contrast meets WCAG AA
- [ ] Text can be resized to 200%
- [ ] No content relies on color alone
- [ ] Audio content has transcripts

### Operable
- [ ] All functionality available from keyboard
- [ ] Focus order is logical
- [ ] Focus indicators are visible
- [ ] No keyboard traps
- [ ] Skip to content link provided
- [ ] No flashing content (>3Hz)

### Understandable
- [ ] Page language identified
- [ ] Headings used in order
- [ ] Form inputs have labels
- [ ] Error messages are clear
- [ ] Navigation is consistent
- [ ] Instructions are provided

### Robust
- [ ] Valid HTML
- [ ] ARIA attributes correct
- [ ] Name, role, value provided
- [ ] Compatible with screen readers
- [ ] Compatible with assistive technologies
- [ ] No deprecated features

---

## Accessibility Resources

### Guidelines and Standards
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- WebAIM: https://webaim.org/

### Tools
- axe DevTools: https://www.deque.com/axe/
- WAVE: https://wave.webaim.org/
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Contrast Checker: https://webaim.org/resources/contrastchecker/

### Learning
- WebAIM Articles: https://webaim.org/articles/
- A11y Project: https://www.a11yproject.com/
- Inclusive Components: https://inclusive-components.design/

---

**Next:** [WorldForge Integration Documentation](../07-worldforge-integration/README.md)
