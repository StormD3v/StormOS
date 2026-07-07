# AI Guidelines for StormOS

This document serves as permanent instructions for any AI agent working on StormOS. All AI agents must follow these guidelines to maintain consistency, quality, and alignment with the project vision.

---

## Project Philosophy

### Preserve Documented Vision

- StormOS is a premium portfolio operating system, not a dashboard, template, or landing page
- Every interaction should reinforce precision, confidence, craftsmanship, immersion, intelligence, and responsiveness
- Users should feel like they are exploring a beautifully engineered operating system
- Documentation is the single source of truth - never deviate from documented decisions without explicit reason

### Documentation is Source of Truth

- All design tokens, component specifications, and interaction patterns are documented in `docs/`
- Before making any decision, search the relevant documentation
- If documentation conflicts with your understanding, follow the documentation
- Document any deviations with clear reasoning
- Never implement features or changes that contradict documentation

### Consistency Over Creativity

- Use documented design tokens only (colors, typography, spacing, etc.)
- Follow established patterns for similar components
- Maintain consistent naming conventions
- Reuse existing components before creating new ones
- Avoid introducing unnecessary complexity

### Never Introduce Unnecessary Complexity

- Prefer simple solutions over clever ones
- Avoid over-engineering
- Don't add features not documented
- Keep component hierarchies shallow (max 4-5 levels)
- Minimize dependencies

---

## Code Conventions

### Folder Structure

Follow the documented project structure from `docs/04-technical-architecture/README.md`:

```
stormos/
├── app/                          # Next.js App Router
├── components/                    # React components
│   ├── ui/                       # UI components (buttons, inputs, etc.)
│   ├── layout/                   # Layout components
│   ├── sections/                 # Page sections
│   └── features/                 # Feature-specific components
├── lib/                          # Utility functions
├── hooks/                        # Custom React hooks
├── store/                        # Zustand stores
├── types/                        # TypeScript types
├── styles/                       # Additional styles
├── public/                       # Static assets
├── content/                      # Content data
└── docs/                         # Documentation
```

### Naming Conventions

**Files:**
- Use kebab-case for file names: `project-card.tsx`, `use-scroll.ts`
- Use PascalCase for React components: `Button.tsx`, `Navigation.tsx`
- Use camelCase for utilities and hooks: `utils.ts`, `useScroll.ts`

**Variables and Functions:**
- Use camelCase: `userName`, `handleSubmit`, `isLoading`
- Use PascalCase for React components: `Button`, `Modal`
- Use UPPER_SNAKE_CASE for constants: `MAX_WIDTH`, `API_URL`

**Types and Interfaces:**
- Use PascalCase: `Project`, `UserProps`
- Prefix interfaces with `I` only if necessary: `IUserData` (prefer `UserData`)
- Use descriptive names: `ProjectCardProps` instead of `Props`

### Component Organization

**Component Structure:**
```typescript
// 1. Imports
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 2. Types
interface ComponentProps {
  // Props definition
}

// 3. Constants
const DEFAULT_VALUE = 'default';

// 4. Component
export const Component: React.FC<ComponentProps> = ({
  prop1,
  prop2 = DEFAULT_VALUE,
}) => {
  // 5. Hooks
  const [state, setState] = useState();

  // 6. Handlers
  const handleClick = () => {
    // Handler logic
  };

  // 7. Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // 8. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### Hooks

**Custom Hooks:**
- Prefix with `use`: `useScroll`, `useMediaQuery`, `useAnimation`
- Place in `hooks/` directory
- Export as named exports
- Document with JSDoc comments

**Example:**
```typescript
/**
 * Hook for detecting scroll position
 * @returns {number} Current scroll position
 */
export function useScroll(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
```

### Utilities

**Utility Functions:**
- Place in `lib/utils.ts`
- Export as named exports
- Keep functions pure when possible
- Document with JSDoc comments

**Example:**
```typescript
/**
 * Format a date to a readable string
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date);
}
```

### Constants

**Constants:**
- Place in `lib/constants.ts`
- Use UPPER_SNAKE_CASE
- Group related constants
- Document with comments

**Example:**
```typescript
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  MEDIUM: 300,
  SLOW: 500,
} as const;
```

### Imports

**Import Order:**
1. React and Next.js imports
2. Third-party library imports
3. Internal imports (components, hooks, lib)
4. Type imports
5. CSS imports

**Example:**
```typescript
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useScroll } from '@/hooks/use-scroll';
import { formatDate } from '@/lib/utils';
import type { Project } from '@/types';
import './component.css';
```

**Import Paths:**
- Use `@/` alias for root imports: `@/components/ui/button`
- Use relative imports for same-directory: `./sibling-component`
- Use absolute imports for cross-directory: `@/lib/utils`

### Exports

**Default Exports:**
- Avoid default exports for components
- Use named exports: `export const Button = ...`
- Use default exports only for pages and layouts

**Named Exports:**
- Prefer named exports for components
- Export types separately: `export type { ProjectProps }`
- Group related exports

---

## Architecture Rules

### Composition Over Inheritance

- Build complex components from simple ones
- Use children prop for flexibility
- Avoid deep component hierarchies
- Prefer composition patterns

**Example:**
```typescript
// Good: Composition
<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Description</p>
  </CardContent>
</Card>

// Avoid: Deep inheritance
class ProjectCard extends BaseCard extends BaseComponent
```

### Reusable Components

- Make components reusable through props
- Avoid hard-coding values
- Use variants for different styles
- Keep components focused

**Example:**
```typescript
// Good: Reusable with props
<Button variant="primary" size="large">
  Click me
</Button>

// Avoid: Hard-coded
<PrimaryLargeButton>Click me</PrimaryLargeButton>
```

### Avoid Duplication

- Extract repeated code into utilities
- Create shared components for common patterns
- Use constants for repeated values
- DRY principle

### Feature Boundaries

- Organize by feature, not by file type
- Keep related code together
- Use feature folders for complex features
- Maintain clear boundaries

**Example:**
```
components/
├── ui/                    # Generic UI components
├── layout/                # Layout components
└── features/
    ├── project-card/      # Project feature
    │   ├── ProjectCard.tsx
    │   ├── ProjectCard.test.tsx
    │   └── index.ts
    └── skill-grid/        # Skill feature
        ├── SkillGrid.tsx
        └── index.ts
```

### Separation of Concerns

- Keep UI separate from business logic
- Use hooks for state management
- Use utilities for data transformation
- Use components for rendering

---

## Styling Rules

### Use Documented Design Tokens Only

- All colors must use documented design tokens
- All typography must use documented type scale
- All spacing must use documented spacing scale
- All border radius must use documented radius scale
- All shadows must use documented shadow scale

**Color scale:** The implementation uses `neutral-*` Tailwind classes (e.g., `bg-neutral-950`, `text-neutral-400`), not `gray-*`. The `tailwind.config.ts` defines the full `neutral-*` palette from `neutral-50` through `neutral-950`. Always use `neutral-*` — never `gray-*`.

**Transition duration:** Use `duration-fast` (150ms) for interactions, `duration-base` (300ms) for standard transitions. These are defined as custom tokens in `tailwind.config.ts` under `transitionDuration`.

**Example:**
```typescript
// Good: Use design tokens
<div className="text-storm-blue bg-neutral-900">
  Text
</div>

// Avoid: Arbitrary values or gray-* scale
<div style={{ color: '#0A84FF' }} className="bg-gray-900">
  Text
</div>
```

### No Arbitrary Values Unless Documented

- Never use arbitrary pixel values
- Never use arbitrary colors
- Never use arbitrary spacing
- If you need a new value, document it first

### Mobile-First

- Design for mobile first
- Use min-width breakpoints
- Enhance for larger screens
- Test on actual devices

**Example:**
```css
/* Mobile first */
.component {
  padding: 16px;
}

@media (min-width: 768px) {
  .component {
    padding: 24px;
  }
}
```

### Responsive by Default

- Make all components responsive
- Use Tailwind responsive prefixes
- Test on multiple viewports
- Ensure touch targets are adequate

---

## Accessibility Rules

### WCAG 2.1 AA Minimum

- All features must meet WCAG 2.1 AA
- Aim for AAA where feasible
- Test with accessibility tools
- Fix all accessibility issues

### Semantic HTML

- Use proper HTML elements
- Use heading hierarchy (h1-h6)
- Use landmark roles
- Use list elements for lists

**Example:**
```html
<!-- Good: Semantic HTML -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- Avoid: Non-semantic -->
<div class="navigation">
  <div class="nav-item">About</div>
</div>
```

### Keyboard Accessibility

- All functionality available from keyboard
- Logical tab order
- Visible focus indicators
- No keyboard traps

### ARIA When Necessary

- Use ARIA labels for icons
- Use ARIA roles for custom components
- Use live regions for dynamic content
- Don't overuse ARIA

### Reduced-Motion Support

- Respect `prefers-reduced-motion`
- Disable animations when requested
- Provide static alternatives
- Test with reduced motion enabled

---

## Animation Rules

### Every Animation Communicates

- Every animation must have a purpose
- Document the purpose
- Remove decorative animations
- Use animations to guide attention

### Avoid Decorative Animation

- Don't animate for decoration
- Don't animate without purpose
- Keep animations subtle
- Respect user preferences

### Use Documented Easing

- Use documented easing functions
- Use documented timing
- Don't invent new easing
- Keep animations consistent

**Example:**
```typescript
// Good: Documented easing
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
/>

// Avoid: Arbitrary easing
<motion.div
  transition={{ duration: 0.5, ease: 'easeInOut' }}
/>
```

### Use Documented Timing

- Use documented duration scale
- Match duration to importance
- Keep animations short
- Test on low-end devices

### Prioritize Performance

- Use transform and opacity
- Avoid layout properties
- Use will-change sparingly
- Test at 60fps

---

## Performance Rules

### Lazy Loading

- Lazy load below-fold components
- Use React.lazy for route splitting
- Use dynamic imports for heavy components
- Lazy load images

**Example:**
```typescript
const WorldForgeSection = dynamic(
  () => import('@/components/sections/worldforge'),
  { loading: () => <SectionSkeleton /> }
);
```

### Code Splitting

- Use Next.js automatic code splitting
- Split by route
- Split by feature
- Avoid large bundles

### Optimize Bundle Size

- Use tree-shaking
- Remove unused dependencies
- Use lightweight alternatives
- Analyze bundle size regularly

### Optimize Images

- Use next/image for all images
- Provide appropriate sizes
- Use WebP/AVIF format
- Lazy load images

### Avoid Unnecessary Re-renders

- Use React.memo for components
- Use useMemo for expensive calculations
- Use useCallback for callbacks
- Profile performance regularly

---

## Git Workflow

### Logical Commits

- Make logical commits
- Commit related changes together
- Don't mix unrelated changes
- Keep commits focused

### Descriptive Messages

- Use conventional commits format
- Describe what and why
- Keep messages concise
- Reference issues when applicable

**Example:**
```
feat(components): add button component with variants

- Add primary, secondary, and ghost variants
- Implement hover and active states
- Add accessibility attributes
- Document component usage

Closes #123
```

### Never Mix Unrelated Changes

- One feature per commit
- Separate bug fixes from features
- Separate refactoring from features
- Keep commit history clean

---

## AI Behavior

### When Uncertain

#### Search Documentation First
- Search the `docs/` directory
- Read relevant documentation
- Follow documented patterns
- Don't guess

#### Prefer Existing Patterns
- Look for similar components
- Copy existing patterns
- Maintain consistency
- Don't reinvent

#### Document Assumptions
- Document any assumptions made
- Explain reasoning
- Note uncertainties
- Ask for clarification if needed

#### Ask Only When Absolutely Necessary
- Try to solve independently first
- Search for solutions
- Document the blocker
- Ask only when genuinely blocked

### Decision Making

#### Document Decisions
- Explain why a decision was made
- Reference documentation
- Consider alternatives
- Note trade-offs

#### Update Documentation
- Update documentation when patterns change
- Document new patterns
- Keep docs in sync with code
- Note breaking changes

#### Communicate Clearly
- When blocked, explain the blocker
- Propose solutions
- Recommend the best solution
- Wait for user input if needed

---

## Quality Standards

### Code Quality

- Write clean, readable code
- Follow TypeScript best practices
- Use proper error handling
- Add appropriate comments

### Testing

- Write tests for components
- Write tests for hooks
- Write tests for utilities
- Maintain test coverage

### Documentation

- Document complex logic
- Document component props
- Document utility functions
- Keep documentation current

### Review Process

- Review code before committing
- Check for accessibility
- Check for performance
- Check for consistency

---

## Continuous Improvement

### Learn from Documentation

- Read documentation regularly
- Understand the vision
- Follow the patterns
- Suggest improvements

### Update Guidelines

- Update this document as needed
- Document new patterns
- Remove outdated information
- Keep guidelines current

### Share Knowledge

- Document lessons learned
- Share best practices
- Help others understand
- Contribute to documentation

---

## Emergency Procedures

### If Documentation is Incomplete

1. Search for similar patterns in the codebase
2. Follow the closest documented pattern
3. Document the decision made
4. Update documentation with the new pattern

### If Conflicts Exist

1. Identify the conflict
2. Explain both sides
3. Recommend a resolution
4. Wait for user approval

### If Blocked by Technical Limitation

1. Explain the limitation
2. Propose workarounds
3. Document the blocker
4. Ask for guidance

---

**Remember:** The documentation is the single source of truth. When in doubt, follow the documentation. When documentation is incomplete, document your decisions and update the documentation.
